import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Image as ImageIcon, X, ArrowUp, ArrowDown, Star } from 'lucide-react';
import { toast } from 'sonner';
import { ExternalBlob } from '../../backend';
import { optimizeImage } from '../../utils/mediaOptimization';

interface CategoryImagesManagerProps {
  images: ExternalBlob[];
  primaryImage: ExternalBlob | null;
  onImagesChange: (images: ExternalBlob[]) => void;
  onPrimaryImageChange: (image: ExternalBlob) => void;
}

const MAX_IMAGES = 10;

export default function CategoryImagesManager({
  images,
  primaryImage,
  onImagesChange,
  onPrimaryImageChange,
}: CategoryImagesManagerProps) {
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleImageUpload = async (file: File) => {
    if (images.length >= MAX_IMAGES) {
      toast.error(`Maximum of ${MAX_IMAGES} images allowed`);
      return;
    }

    setUploadingIndex(images.length);
    setUploadProgress(0);

    try {
      const optimized = await optimizeImage(file, 1200, 0.85);
      const arrayBuffer = await optimized.file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      
      const imageBlob = ExternalBlob.fromBytes(uint8Array).withUploadProgress((percentage) => {
        setUploadProgress(percentage);
      });

      const newImages = [...images, imageBlob];
      onImagesChange(newImages);

      // Set as primary if it's the first image
      if (!primaryImage) {
        onPrimaryImageChange(imageBlob);
      }

      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Image upload failed:', error);
      toast.error('Failed to upload image');
    } finally {
      setUploadingIndex(null);
      setUploadProgress(0);
    }
  };

  const handleRemoveImage = (index: number) => {
    const imageToRemove = images[index];
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);

    // If removing primary image, set first remaining image as primary
    if (primaryImage === imageToRemove && newImages.length > 0) {
      onPrimaryImageChange(newImages[0]);
    }

    toast.success('Image removed');
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newImages = [...images];
    [newImages[index - 1], newImages[index]] = [newImages[index], newImages[index - 1]];
    onImagesChange(newImages);
  };

  const handleMoveDown = (index: number) => {
    if (index === images.length - 1) return;
    const newImages = [...images];
    [newImages[index], newImages[index + 1]] = [newImages[index + 1], newImages[index]];
    onImagesChange(newImages);
  };

  const handleSetPrimary = (index: number) => {
    onPrimaryImageChange(images[index]);
    toast.success('Primary image updated');
  };

  return (
    <Card className="gold-border admin-surface">
      <CardHeader>
        <CardTitle className="text-bottle-green-dark">Category Images</CardTitle>
        <p className="text-sm text-bottle-green-medium">
          Manage up to {MAX_IMAGES} images. The primary image is used as the category thumbnail.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => {
            const isPrimary = primaryImage === image;
            return (
              <div key={index} className="relative group">
                <div className={`aspect-square border-2 rounded-lg overflow-hidden ${
                  isPrimary ? 'border-gold-medium' : 'border-gold-medium/30'
                }`}>
                  <img
                    src={image.getDirectURL()}
                    alt={`Category image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {isPrimary && (
                    <div className="absolute top-2 left-2 bg-gold-medium text-navy-dark px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
                      <Star className="h-3 w-3 fill-current" />
                      Primary
                    </div>
                  )}
                </div>
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {!isPrimary && (
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-7 w-7 bg-gold-medium hover:bg-gold-dark text-navy-dark"
                      onClick={() => handleSetPrimary(index)}
                      title="Set as primary"
                    >
                      <Star className="h-3 w-3" />
                    </Button>
                  )}
                  <Button
                    size="icon"
                    variant="destructive"
                    className="h-7 w-7"
                    onClick={() => handleRemoveImage(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
                <div className="absolute bottom-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="icon"
                    variant="secondary"
                    className="h-7 w-7"
                    onClick={() => handleMoveUp(index)}
                    disabled={index === 0}
                  >
                    <ArrowUp className="h-3 w-3" />
                  </Button>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="h-7 w-7"
                    onClick={() => handleMoveDown(index)}
                    disabled={index === images.length - 1}
                  >
                    <ArrowDown className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            );
          })}

          {/* Upload Slot */}
          {images.length < MAX_IMAGES && (
            <div className="aspect-square border-2 border-dashed border-gold-medium/30 rounded-lg overflow-hidden bg-navy-medium hover:border-gold-medium/50 transition-colors">
              {uploadingIndex !== null ? (
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <div className="text-gold-medium text-sm mb-2">Uploading...</div>
                  <div className="text-gold-medium text-xs">{uploadProgress}%</div>
                </div>
              ) : (
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
              )}
            </div>
          )}
        </div>

        {images.length === 0 && (
          <div className="text-center py-8 text-bottle-green-medium">
            <ImageIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>No images yet. Upload your first image to get started.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
