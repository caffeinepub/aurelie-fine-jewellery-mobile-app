import { useState } from 'react';
import { useGetCarouselSlides, useUpdateCarouselSlide, useToggleCarouselSlide, useReorderCarouselSlides } from '../../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Skeleton } from '../ui/skeleton';
import { ChevronUp, ChevronDown, Save, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { ExternalBlob, type CarouselSlide } from '../../backend';
import { optimizeImage } from '../../utils/mediaOptimization';

export default function CarouselManagement() {
  const { data: slides, isLoading } = useGetCarouselSlides();
  const updateSlide = useUpdateCarouselSlide();
  const toggleSlide = useToggleCarouselSlide();
  const reorderSlides = useReorderCarouselSlides();

  const [editingSlides, setEditingSlides] = useState<Record<number, { url: string; image: File | null; uploadProgress: number; isOptimizing: boolean }>>({});

  // Initialize 5 slots
  const slideSlots = Array.from({ length: 5 }, (_, index) => {
    const existingSlide = slides?.find(s => Number(s.order) === index);
    return existingSlide || null;
  });

  const handleImageUpload = async (index: number, file: File) => {
    setEditingSlides(prev => ({
      ...prev,
      [index]: {
        url: prev[index]?.url || slideSlots[index]?.urlRedirect || '',
        image: null,
        uploadProgress: 0,
        isOptimizing: true,
      },
    }));

    try {
      const optimized = await optimizeImage(file, 1200, 0.85);
      setEditingSlides(prev => ({
        ...prev,
        [index]: {
          ...prev[index],
          image: optimized.file,
          isOptimizing: false,
        },
      }));
    } catch (error) {
      console.error('Image optimization failed:', error);
      toast.error('Failed to optimize image');
      setEditingSlides(prev => {
        const newState = { ...prev };
        delete newState[index];
        return newState;
      });
    }
  };

  const handleUrlChange = (index: number, url: string) => {
    setEditingSlides(prev => ({
      ...prev,
      [index]: {
        url,
        image: prev[index]?.image || null,
        uploadProgress: prev[index]?.uploadProgress || 0,
        isOptimizing: prev[index]?.isOptimizing || false,
      },
    }));
  };

  const handleSaveSlide = async (index: number) => {
    const editing = editingSlides[index];
    const existingSlide = slideSlots[index];

    if (!editing && !existingSlide) {
      toast.error('No changes to save');
      return;
    }

    try {
      let imageBlob: ExternalBlob;

      if (editing?.image) {
        // Upload new image
        const arrayBuffer = await editing.image.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        imageBlob = ExternalBlob.fromBytes(uint8Array).withUploadProgress((percentage) => {
          setEditingSlides(prev => ({
            ...prev,
            [index]: { ...prev[index], uploadProgress: percentage },
          }));
        });
      } else if (existingSlide) {
        // Keep existing image
        imageBlob = existingSlide.visualContent;
      } else {
        toast.error('Please upload an image');
        return;
      }

      const url = editing?.url !== undefined ? editing.url : existingSlide?.urlRedirect || '';

      const updatedSlide: CarouselSlide = {
        visualContent: imageBlob,
        urlRedirect: url,
        enabled: existingSlide?.enabled ?? true,
        order: BigInt(index),
      };

      await updateSlide.mutateAsync({ slideIndex: index, updatedSlide });
      
      // Clear editing state
      setEditingSlides(prev => {
        const newState = { ...prev };
        delete newState[index];
        return newState;
      });

      toast.success('Slide updated successfully');
    } catch (error: any) {
      console.error('Error saving slide:', error);
      toast.error(error.message || 'Failed to save slide');
    }
  };

  const handleToggle = async (index: number, enabled: boolean) => {
    try {
      await toggleSlide.mutateAsync({ slideIndex: index, enabled });
      toast.success(enabled ? 'Slide enabled' : 'Slide disabled');
    } catch (error: any) {
      console.error('Error toggling slide:', error);
      toast.error(error.message || 'Failed to toggle slide');
    }
  };

  const handleMoveUp = async (index: number) => {
    if (index === 0) return;

    const newOrder = slideSlots.map((_, i) => {
      if (i === index - 1) return index;
      if (i === index) return index - 1;
      return i;
    });

    try {
      await reorderSlides.mutateAsync(newOrder);
      toast.success('Slide moved up');
    } catch (error: any) {
      console.error('Error reordering slides:', error);
      toast.error(error.message || 'Failed to reorder slides');
    }
  };

  const handleMoveDown = async (index: number) => {
    if (index === 4) return;

    const newOrder = slideSlots.map((_, i) => {
      if (i === index) return index + 1;
      if (i === index + 1) return index;
      return i;
    });

    try {
      await reorderSlides.mutateAsync(newOrder);
      toast.success('Slide moved down');
    } catch (error: any) {
      console.error('Error reordering slides:', error);
      toast.error(error.message || 'Failed to reorder slides');
    }
  };

  if (isLoading) {
    return (
      <Card className="gold-border admin-surface backdrop-blur mb-6">
        <CardHeader>
          <CardTitle className="text-bottle-green-dark">Homepage Carousel Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="gold-border admin-surface backdrop-blur mb-6">
      <CardHeader>
        <CardTitle className="text-bottle-green-dark">Homepage Carousel Management</CardTitle>
        <p className="text-sm text-bottle-green-medium">
          Manage up to 5 carousel slides. Images are automatically optimized. Auto-rotates every 2.5 seconds on the homepage.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {slideSlots.map((slide, index) => {
          const editing = editingSlides[index];
          const hasChanges = editing !== undefined;

          return (
            <div key={index} className="border border-gold-medium/30 rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-bottle-green-dark">Slide {index + 1}</h3>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleMoveUp(index)}
                    disabled={index === 0 || !slide}
                  >
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleMoveDown(index)}
                    disabled={index === 4 || !slide}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {/* Image Preview/Upload */}
                <div className="space-y-2">
                  <Label className="admin-label-text">Image</Label>
                  {slide && !editing?.image ? (
                    <div className="relative aspect-video rounded-lg overflow-hidden border border-gold-medium/30">
                      <img
                        src={slide.visualContent.getDirectURL()}
                        alt={`Slide ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : editing?.image ? (
                    <div className="relative aspect-video rounded-lg overflow-hidden border border-gold-medium/30">
                      <img
                        src={URL.createObjectURL(editing.image)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {editing.uploadProgress > 0 && editing.uploadProgress < 100 && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <div className="text-white text-sm">Uploading: {editing.uploadProgress}%</div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="aspect-video rounded-lg border-2 border-dashed border-gold-medium/30 flex items-center justify-center">
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
                    className="border-gold-medium/30"
                    disabled={editing?.isOptimizing}
                  />
                </div>

                {/* URL and Controls */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`url-${index}`} className="admin-label-text">
                      Click URL (Product Category/Page)
                    </Label>
                    <Input
                      id={`url-${index}`}
                      type="url"
                      placeholder="https://example.com/category"
                      value={editing?.url !== undefined ? editing.url : slide?.urlRedirect || ''}
                      onChange={(e) => handleUrlChange(index, e.target.value)}
                      className="border-gold-medium/30"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor={`enabled-${index}`} className="admin-label-text">
                      Enabled
                    </Label>
                    <Switch
                      id={`enabled-${index}`}
                      checked={slide?.enabled ?? false}
                      onCheckedChange={(checked) => handleToggle(index, checked)}
                      disabled={!slide}
                    />
                  </div>

                  <Button
                    onClick={() => handleSaveSlide(index)}
                    disabled={updateSlide.isPending || (!hasChanges && !slide) || editing?.isOptimizing}
                    className="w-full gold-gradient text-secondary shadow-gold"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {updateSlide.isPending ? 'Saving...' : 'Save Slide'}
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
