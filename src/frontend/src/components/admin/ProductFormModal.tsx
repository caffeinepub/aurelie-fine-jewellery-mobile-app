import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Switch } from '../ui/switch';
import { useAddProduct, useUpdateProduct } from '../../hooks/useQueries';
import { toast } from 'sonner';
import { ExternalBlob, type Product, type ProductCreate } from '../../backend';
import { Upload, Image as ImageIcon, Video, X } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';

interface ProductFormModalProps {
  open: boolean;
  onClose: () => void;
  product?: Product | null;
}

export default function ProductFormModal({ open, onClose, product }: ProductFormModalProps) {
  const addProduct = useAddProduct();
  const updateProduct = useUpdateProduct();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [inStock, setInStock] = useState(true);
  
  // Media state
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string>('');
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [existingVideo, setExistingVideo] = useState<ExternalBlob | null>(null);
  const [existingImages, setExistingImages] = useState<ExternalBlob[]>([]);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice((Number(product.priceInCents) / 100).toFixed(0));
      setInStock(product.inStock);
      
      // Set existing media
      setExistingVideo(product.media.video || null);
      setExistingImages(product.media.images);
      
      // Set previews
      if (product.media.video) {
        setVideoPreview(product.media.video.getDirectURL());
      }
      setImagePreviews(product.media.images.map(img => img.getDirectURL()));
      
      // Clear new uploads
      setVideoFile(null);
      setImageFiles([]);
    } else {
      // Reset all fields for new product
      setName('');
      setDescription('');
      setPrice('');
      setInStock(true);
      setVideoFile(null);
      setVideoPreview('');
      setImageFiles([]);
      setImagePreviews([]);
      setExistingVideo(null);
      setExistingImages([]);
    }
  }, [product, open]);

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      setExistingVideo(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setVideoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveVideo = () => {
    setVideoFile(null);
    setVideoPreview('');
    setExistingVideo(null);
  };

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const totalImages = imageFiles.length + existingImages.length + files.length;
    
    if (totalImages > 5) {
      toast.error('Maximum 5 images allowed per product');
      return;
    }

    const newImageFiles = [...imageFiles, ...files].slice(0, 5 - existingImages.length);
    setImageFiles(newImageFiles);

    // Generate previews for new files
    const newPreviews: string[] = [];
    let loadedCount = 0;

    newImageFiles.forEach((file, index) => {
      if (index >= imageFiles.length) {
        const reader = new FileReader();
        reader.onloadend = () => {
          newPreviews.push(reader.result as string);
          loadedCount++;
          if (loadedCount === newImageFiles.length - imageFiles.length) {
            setImagePreviews([...imagePreviews, ...newPreviews]);
          }
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleRemoveImage = (index: number) => {
    const totalExisting = existingImages.length;
    
    if (index < totalExisting) {
      // Remove from existing images
      setExistingImages(existingImages.filter((_, i) => i !== index));
      setImagePreviews(imagePreviews.filter((_, i) => i !== index));
    } else {
      // Remove from new image files
      const newIndex = index - totalExisting;
      setImageFiles(imageFiles.filter((_, i) => i !== newIndex));
      setImagePreviews(imagePreviews.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !description.trim() || !price) {
      toast.error('Please fill in all fields');
      return;
    }

    const totalImages = existingImages.length + imageFiles.length;
    if (totalImages === 0) {
      toast.error('Please add at least one image');
      return;
    }

    try {
      const priceInCents = Math.round(parseFloat(price) * 100);
      
      // Handle video
      let videoBlob: ExternalBlob | undefined = undefined;
      if (videoFile) {
        const arrayBuffer = await videoFile.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        videoBlob = ExternalBlob.fromBytes(uint8Array);
      } else if (existingVideo) {
        videoBlob = existingVideo;
      }

      // Handle images
      const imageBlobs: ExternalBlob[] = [...existingImages];
      for (const file of imageFiles) {
        const arrayBuffer = await file.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        imageBlobs.push(ExternalBlob.fromBytes(uint8Array));
      }

      const productData: ProductCreate = {
        id: product?.id || `product_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: name.trim(),
        description: description.trim(),
        priceInCents: BigInt(priceInCents),
        inStock,
        media: {
          video: videoBlob,
          images: imageBlobs,
        },
      };

      if (product) {
        await updateProduct.mutateAsync(productData);
        toast.success('Product updated successfully');
      } else {
        await addProduct.mutateAsync(productData);
        toast.success('Product added successfully');
      }

      onClose();
    } catch (error: any) {
      console.error('Failed to save product:', error);
      toast.error(error.message || 'Failed to save product');
    }
  };

  const totalImages = existingImages.length + imageFiles.length;
  const canAddMoreImages = totalImages < 5;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-hidden gold-border bg-card/95 backdrop-blur">
        <DialogHeader>
          <DialogTitle className="gold-text font-serif text-2xl">
            {product ? 'Edit Product' : 'Add New Product'}
          </DialogTitle>
          <DialogDescription className="gold-text opacity-70">
            {product ? 'Update product details and media' : 'Create a new jewellery product with up to 5 images and 1 video'}
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="max-h-[calc(90vh-120px)] pr-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="gold-text">Product Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Diamond Ring"
                className="border-gold-medium/30 gold-text"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="gold-text">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the product..."
                rows={4}
                className="border-gold-medium/30 gold-text"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price" className="gold-text">Price (₹ INR)</Label>
              <Input
                id="price"
                type="number"
                step="1"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0"
                className="border-gold-medium/30 gold-text"
              />
              {price && (
                <p className="text-xs gold-text opacity-70">
                  Display price: {new Intl.NumberFormat('en-IN', {
                    style: 'currency',
                    currency: 'INR',
                    minimumFractionDigits: 0,
                  }).format(parseFloat(price))}
                </p>
              )}
            </div>

            {/* Video Upload Section */}
            <div className="space-y-2">
              <Label className="gold-text">Product Video (Optional)</Label>
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('video')?.click()}
                  className="gap-2 border-gold-medium gold-text hover:bg-gold-medium/20"
                  disabled={!!videoFile || !!existingVideo}
                >
                  <Video className="h-4 w-4" />
                  {videoFile || existingVideo ? 'Video Added' : 'Upload Video'}
                </Button>
                <input
                  id="video"
                  type="file"
                  accept="video/*"
                  onChange={handleVideoChange}
                  className="hidden"
                />
              </div>
              {videoPreview && (
                <div className="relative mt-2">
                  <video
                    src={videoPreview}
                    controls
                    className="w-full max-h-48 rounded border-2 border-gold-medium/30"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={handleRemoveVideo}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            {/* Images Upload Section */}
            <div className="space-y-2">
              <Label className="gold-text">Product Images ({totalImages}/5)</Label>
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('images')?.click()}
                  className="gap-2 border-gold-medium gold-text hover:bg-gold-medium/20"
                  disabled={!canAddMoreImages}
                >
                  <Upload className="h-4 w-4" />
                  {totalImages > 0 ? 'Add More Images' : 'Upload Images'}
                </Button>
                <input
                  id="images"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImagesChange}
                  className="hidden"
                />
                <span className="text-xs gold-text opacity-70">
                  {canAddMoreImages ? `${5 - totalImages} more allowed` : 'Maximum reached'}
                </span>
              </div>
              
              {imagePreviews.length > 0 ? (
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded border-2 border-gold-medium/30"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                      <div className="absolute bottom-1 left-1 bg-black/50 text-white text-xs px-1 rounded">
                        {index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-2 h-24 flex items-center justify-center border-2 border-dashed border-gold-medium/30 rounded">
                  <ImageIcon className="h-8 w-8 text-gold-medium opacity-50" />
                </div>
              )}
            </div>

            <div className="flex items-center justify-between p-4 border border-gold-medium/30 rounded-lg">
              <div>
                <Label htmlFor="inStock" className="gold-text font-medium">In Stock</Label>
                <p className="text-xs gold-text opacity-70 mt-1">
                  Toggle product availability status
                </p>
              </div>
              <Switch id="inStock" checked={inStock} onCheckedChange={setInStock} />
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1 border-gold-medium gold-text">
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 gold-gradient text-secondary shadow-gold"
                disabled={addProduct.isPending || updateProduct.isPending}
              >
                {addProduct.isPending || updateProduct.isPending
                  ? 'Saving...'
                  : product
                  ? 'Update Product'
                  : 'Add Product'}
              </Button>
            </div>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
