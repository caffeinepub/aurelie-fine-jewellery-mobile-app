import { useState, useEffect } from 'react';
import { useGetCategoryCarouselImages, useUpdateCategoryCarouselImages, useGetCarouselRedirect, useUpdateCarouselRedirect } from '../../hooks/useCategoryCarouselQueries';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Skeleton } from '../ui/skeleton';
import { Image as ImageIcon, Save, X, Link as LinkIcon } from 'lucide-react';
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

  const [editingImages, setEditingImages] = useState<Record<number, { file: File | null; uploadProgress: number; isOptimizing: boolean }>>({});
  const [redirectUrlInput, setRedirectUrlInput] = useState('');

  // Initialize redirect URL input when data loads
  useEffect(() => {
    if (redirectUrl !== undefined && redirectUrl !== null) {
      setRedirectUrlInput(redirectUrl);
    }
  }, [redirectUrl]);

  // Initialize 5 slots
  const imageSlots = Array.from({ length: 5 }, (_, index) => {
    return images?.[index] || null;
  });

  const handleImageUpload = async (index: number, file: File) => {
    setEditingImages(prev => ({
      ...prev,
      [index]: {
        file: null,
        uploadProgress: 0,
        isOptimizing: true,
      },
    }));

    try {
      const optimized = await optimizeImage(file, 1200, 0.85);
      setEditingImages(prev => ({
        ...prev,
        [index]: {
          ...prev[index],
          file: optimized.file,
          isOptimizing: false,
        },
      }));
    } catch (error) {
      console.error('Image optimization failed:', error);
      toast.error('Failed to optimize image');
      setEditingImages(prev => {
        const newState = { ...prev };
        delete newState[index];
        return newState;
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    setEditingImages(prev => {
      const newState = { ...prev };
      delete newState[index];
      return newState;
    });
  };

  const handleSaveImages = async () => {
    try {
      const newImages: ExternalBlob[] = [];

      for (let i = 0; i < 5; i++) {
        const editing = editingImages[i];
        const existingImage = imageSlots[i];

        if (editing?.file) {
          // Upload new image
          const arrayBuffer = await editing.file.arrayBuffer();
          const uint8Array = new Uint8Array(arrayBuffer);
          const imageBlob = ExternalBlob.fromBytes(uint8Array).withUploadProgress((percentage) => {
            setEditingImages(prev => ({
              ...prev,
              [i]: { ...prev[i], uploadProgress: percentage },
            }));
          });
          newImages.push(imageBlob);
        } else if (existingImage) {
          // Keep existing image
          newImages.push(existingImage);
        }
      }

      await updateImages.mutateAsync(newImages);
      setEditingImages({});
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

  if (isLoading || redirectLoading) {
    return (
      <Card className="gold-border bg-bottle-green-dark/10">
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-32 w-full" />
        </CardContent>
      </Card>
    );
  }

  const hasChanges = Object.keys(editingImages).length > 0;
  const isSaving = updateImages.isPending;

  return (
    <Card className="gold-border bg-bottle-green-dark/10">
      <CardHeader className="border-b border-gold-medium/20">
        <CardTitle className="gold-text flex items-center gap-2">
          <ImageIcon className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        {/* Redirect URL Input */}
        <div className="space-y-3 p-4 bg-bottle-green-dark/5 rounded-lg border border-gold-medium/20">
          <Label htmlFor={`redirect-url-${categorySlug}`} className="text-base font-semibold gold-text flex items-center gap-2">
            <LinkIcon className="h-4 w-4" />
            Redirect URL (when carousel is clicked)
          </Label>
          <div className="flex gap-2">
            <Input
              id={`redirect-url-${categorySlug}`}
              type="url"
              placeholder="https://example.com/category-page"
              value={redirectUrlInput}
              onChange={(e) => setRedirectUrlInput(e.target.value)}
              className="flex-1 border-gold-medium/30 focus:border-gold-medium bg-ivory-base/30"
            />
            <Button
              onClick={handleSaveRedirectUrl}
              disabled={updateRedirect.isPending}
              className="bg-gold-medium hover:bg-gold-dark text-white"
            >
              {updateRedirect.isPending ? (
                <>Saving...</>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-1" />
                  Save URL
                </>
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Leave empty if you don't want the carousel to be clickable
          </p>
        </div>

        {/* Image Slots */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {imageSlots.map((image, index) => {
            const editing = editingImages[index];
            const hasImage = image || editing?.file;

            return (
              <div key={index} className="space-y-2">
                <Label className="text-sm font-medium gold-text">Slot {index + 1}</Label>
                <div className="relative aspect-square border-2 border-dashed border-gold-medium/30 rounded-lg overflow-hidden bg-bottle-green-dark/5">
                  {editing?.isOptimizing ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                      <div className="text-center text-white">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2" />
                        <p className="text-xs">Optimizing...</p>
                      </div>
                    </div>
                  ) : editing?.file ? (
                    <>
                      <img
                        src={URL.createObjectURL(editing.file)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {editing.uploadProgress > 0 && editing.uploadProgress < 100 && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                          <div className="text-center text-white">
                            <p className="text-sm font-semibold">{editing.uploadProgress}%</p>
                          </div>
                        </div>
                      )}
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-8 w-8"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  ) : image ? (
                    <img
                      src={image.getDirectURL()}
                      alt={`Carousel ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <ImageIcon className="h-12 w-12 text-gold-medium/30" />
                    </div>
                  )}

                  {!editing?.file && (
                    <label className="absolute inset-0 cursor-pointer hover:bg-black/10 transition-colors flex items-center justify-center">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(index, file);
                        }}
                      />
                      {!hasImage && (
                        <span className="text-xs text-gold-medium font-medium">
                          Click to upload
                        </span>
                      )}
                    </label>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-4 border-t border-gold-medium/20">
          <Button
            onClick={handleSaveImages}
            disabled={!hasChanges || isSaving}
            className="bg-gold-medium hover:bg-gold-dark text-white"
            size="lg"
          >
            {isSaving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Saving Images...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save All Images
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
