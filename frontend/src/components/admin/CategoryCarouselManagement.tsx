import { useState, useEffect } from 'react';
import { useGetCategoryCarouselImages, useUpdateCategoryCarouselImages, useGetCarouselRedirect, useUpdateCarouselRedirect } from '../../hooks/useCategoryCarouselQueries';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Skeleton } from '../ui/skeleton';
import { Image as ImageIcon, Save, X, Link as LinkIcon, ArrowUp, ArrowDown } from 'lucide-react';
import { toast } from 'sonner';
import { ExternalBlob } from '../../backend';
import { optimizeImage } from '../../utils/mediaOptimization';

interface CategoryCarouselManagementProps {
  categorySlug: string;
  carouselIndex: 1 | 2;
  title: string;
}

export default function CategoryCarouselManagement({ categorySlug, carouselIndex, title }: CategoryCarouselManagementProps) {
  const { data: images, isLoading } = useGetCategoryCarouselImages(categorySlug, carouselIndex);
  const { data: redirectUrl, isLoading: redirectLoading } = useGetCarouselRedirect(categorySlug);
  const updateImages = useUpdateCategoryCarouselImages(categorySlug, carouselIndex);
  const updateRedirect = useUpdateCarouselRedirect(categorySlug);

  const [localImages, setLocalImages] = useState<ExternalBlob[]>([]);
  const [newImages, setNewImages] = useState<{ file: File; index: number }[]>([]);
  const [uploadProgress, setUploadProgress] = useState<Record<number, number>>({});
  const [redirectUrlInput, setRedirectUrlInput] = useState('');

  useEffect(() => {
    if (images) {
      setLocalImages(images);
    }
  }, [images]);

  useEffect(() => {
    if (redirectUrl !== undefined && redirectUrl !== null) {
      setRedirectUrlInput(redirectUrl);
    }
  }, [redirectUrl]);

  const handleImageUpload = async (file: File) => {
    if (localImages.length + newImages.length >= 5) {
      toast.error('Maximum of 5 images allowed');
      return;
    }

    const newIndex = localImages.length + newImages.length;
    setNewImages(prev => [...prev, { file, index: newIndex }]);
  };

  const handleRemoveExisting = (index: number) => {
    setLocalImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleRemoveNew = (index: number) => {
    setNewImages(prev => prev.filter(img => img.index !== index));
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    setLocalImages(prev => {
      const newArr = [...prev];
      [newArr[index - 1], newArr[index]] = [newArr[index], newArr[index - 1]];
      return newArr;
    });
  };

  const handleMoveDown = (index: number) => {
    if (index === localImages.length - 1) return;
    setLocalImages(prev => {
      const newArr = [...prev];
      [newArr[index], newArr[index + 1]] = [newArr[index + 1], newArr[index]];
      return newArr;
    });
  };

  const handleSaveImages = async () => {
    try {
      const finalImages: ExternalBlob[] = [...localImages];

      for (const { file, index } of newImages) {
        const optimized = await optimizeImage(file, 1200, 0.85);
        const arrayBuffer = await optimized.file.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        const imageBlob = ExternalBlob.fromBytes(uint8Array).withUploadProgress((percentage) => {
          setUploadProgress(prev => ({ ...prev, [index]: percentage }));
        });
        finalImages.push(imageBlob);
      }

      await updateImages.mutateAsync(finalImages);
      setNewImages([]);
      setUploadProgress({});
      toast.success('Carousel images saved successfully');
    } catch (error: any) {
      console.error('Failed to save carousel images:', error);
      toast.error(error.message || 'Failed to save carousel images');
    }
  };

  const handleSaveRedirectUrl = async () => {
    try {
      await updateRedirect.mutateAsync(redirectUrlInput.trim());
      toast.success('Redirect URL saved successfully');
    } catch (error: any) {
      console.error('Failed to save redirect URL:', error);
      toast.error(error.message || 'Failed to save redirect URL');
    }
  };

  if (isLoading) {
    return (
      <Card className="bg-navy-dark border-gold-medium/30 mb-6">
        <CardHeader>
          <CardTitle className="text-gold-medium">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="aspect-video rounded-lg" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const hasChanges = newImages.length > 0 || localImages.length !== (images?.length || 0);
  const hasRedirectChange = redirectUrl !== redirectUrlInput.trim();

  return (
    <Card className="bg-navy-dark border-gold-medium/30 mb-6">
      <CardHeader>
        <CardTitle className="text-gold-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Redirect URL Configuration */}
        <div className="space-y-2">
          <Label htmlFor={`redirect-${categorySlug}-${carouselIndex}`} className="text-gold-medium flex items-center gap-2">
            <LinkIcon className="h-4 w-4" />
            Redirect URL (optional)
          </Label>
          <div className="flex gap-2">
            <Input
              id={`redirect-${categorySlug}-${carouselIndex}`}
              type="url"
              placeholder="https://example.com/category"
              value={redirectUrlInput}
              onChange={(e) => setRedirectUrlInput(e.target.value)}
              className="bg-navy-medium border-gold-medium/30 text-beige-champagne placeholder:text-beige-champagne/50"
              disabled={redirectLoading || updateRedirect.isPending}
            />
            <Button
              onClick={handleSaveRedirectUrl}
              disabled={!hasRedirectChange || redirectLoading || updateRedirect.isPending}
              className="bg-gold-medium hover:bg-gold-dark text-navy-dark"
            >
              <Save className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-beige-champagne/70">
            When set, clicking the carousel will navigate to this URL
          </p>
        </div>

        {/* Image Management */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {localImages.map((image, index) => (
            <div key={`existing-${index}`} className="relative group">
              <div className="aspect-video border-2 border-gold-medium/30 rounded-lg overflow-hidden bg-navy-medium">
                <img
                  src={image.getDirectURL()}
                  alt={`Slot ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="icon"
                  variant="destructive"
                  className="h-6 w-6"
                  onClick={() => handleRemoveExisting(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
              <div className="absolute bottom-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-6 w-6"
                  onClick={() => handleMoveUp(index)}
                  disabled={index === 0}
                >
                  <ArrowUp className="h-3 w-3" />
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-6 w-6"
                  onClick={() => handleMoveDown(index)}
                  disabled={index === localImages.length - 1}
                >
                  <ArrowDown className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}

          {newImages.map(({ file, index }) => (
            <div key={`new-${index}`} className="relative">
              <div className="aspect-video border-2 border-gold-medium rounded-lg overflow-hidden bg-navy-medium">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`New ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                {uploadProgress[index] > 0 && uploadProgress[index] < 100 && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <div className="text-gold-medium text-sm">{uploadProgress[index]}%</div>
                  </div>
                )}
              </div>
              <Button
                size="icon"
                variant="destructive"
                className="absolute top-1 right-1 h-6 w-6"
                onClick={() => handleRemoveNew(index)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}

          {localImages.length + newImages.length < 5 && (
            <div className="aspect-video border-2 border-dashed border-gold-medium/30 rounded-lg overflow-hidden bg-navy-medium hover:border-gold-medium/50 transition-colors">
              <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                <ImageIcon className="h-8 w-8 text-gold-medium/50 mb-2" />
                <span className="text-xs text-gold-medium/70">Add Image</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload(file);
                  }}
                />
              </label>
            </div>
          )}
        </div>

        {hasChanges && (
          <div className="flex justify-end">
            <Button
              onClick={handleSaveImages}
              disabled={updateImages.isPending}
              className="bg-gold-medium hover:bg-gold-dark text-navy-dark"
            >
              <Save className="h-4 w-4 mr-2" />
              {updateImages.isPending ? 'Saving...' : 'Save All Images'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
