import { useState } from 'react';
import { useGetCategoryCarouselImages, useUpdateCategoryCarouselImages } from '../../hooks/useCategoryCarouselQueries';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Skeleton } from '../ui/skeleton';
import { Image as ImageIcon, Save, X } from 'lucide-react';
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
  const updateImages = useUpdateCategoryCarouselImages(categorySlug, carouselIndex);

  const [editingImages, setEditingImages] = useState<Record<number, { file: File | null; uploadProgress: number; isOptimizing: boolean }>>({});

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

  const handleSaveAll = async () => {
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
      
      // Clear editing state
      setEditingImages({});

      toast.success('Carousel updated successfully');
    } catch (error: any) {
      console.error('Error saving carousel:', error);
      toast.error(error.message || 'Failed to save carousel');
    }
  };

  const hasChanges = Object.keys(editingImages).length > 0;

  if (isLoading) {
    return (
      <Card className="gold-border admin-surface backdrop-blur mb-6">
        <CardHeader>
          <CardTitle className="text-bottle-green-dark">{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="gold-border admin-surface backdrop-blur mb-6">
      <CardHeader>
        <CardTitle className="text-bottle-green-dark">{title}</CardTitle>
        <p className="text-sm text-bottle-green-medium">
          Manage up to 5 carousel images. Images are automatically optimized.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {imageSlots.map((image, index) => {
            const editing = editingImages[index];

            return (
              <div key={index} className="border border-gold-medium/30 rounded-lg p-4 space-y-3">
                <h3 className="font-semibold text-bottle-green-dark text-sm">Slot {index + 1}</h3>

                {/* Image Preview/Upload */}
                <div className="space-y-2">
                  {image && !editing?.file ? (
                    <div className="relative aspect-square rounded-lg overflow-hidden border border-gold-medium/30">
                      <img
                        src={image.getDirectURL()}
                        alt={`Slot ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : editing?.file ? (
                    <div className="relative aspect-square rounded-lg overflow-hidden border border-gold-medium/30">
                      <img
                        src={URL.createObjectURL(editing.file)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {editing.uploadProgress > 0 && editing.uploadProgress < 100 && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <div className="text-white text-sm">Uploading: {editing.uploadProgress}%</div>
                        </div>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white h-8 w-8"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="aspect-square rounded-lg border-2 border-dashed border-gold-medium/30 flex items-center justify-center">
                      {editing?.isOptimizing ? (
                        <div className="text-gold-medium text-sm">Optimizing...</div>
                      ) : (
                        <ImageIcon className="h-12 w-12 text-gold-medium/50" />
                      )}
                    </div>
                  )}
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(index, file);
                    }}
                    className="border-gold-medium/30 text-sm"
                    disabled={editing?.isOptimizing}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Save Button */}
        {hasChanges && (
          <div className="flex justify-end pt-4 border-t border-gold-medium/30">
            <Button
              onClick={handleSaveAll}
              disabled={updateImages.isPending || Object.values(editingImages).some(e => e.isOptimizing)}
              className="gap-2"
            >
              <Save className="h-4 w-4" />
              {updateImages.isPending ? 'Saving...' : 'Save All Changes'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
