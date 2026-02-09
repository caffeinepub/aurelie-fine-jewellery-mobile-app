import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Switch } from '../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useAddProduct, useUpdateProduct } from '../../hooks/useQueries';
import { toast } from 'sonner';
import { ExternalBlob, type Product, type ProductCreate } from '../../backend';
import { Upload, Image as ImageIcon, Video, X } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';
import { optimizeImage, optimizeVideo } from '../../utils/mediaOptimization';
import { PRODUCT_CATEGORIES } from '../../utils/productCategories';

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
  const [category, setCategory] = useState('');
  
  // Media state
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string>('');
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [existingVideo, setExistingVideo] = useState<ExternalBlob | null>(null);
  const [existingImages, setExistingImages] = useState<ExternalBlob[]>([]);
  const [isOptimizing, setIsOptimizing] = useState(false);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice((Number(product.priceInCents) / 100).toFixed(0));
      setInStock(product.inStock);
      setCategory(product.category || '');
      
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
      setCategory('');
      setVideoFile(null);
      setVideoPreview('');
      setImageFiles([]);
      setImagePreviews([]);
      setExistingVideo(null);
      setExistingImages([]);
    }
  }, [product, open]);

  const handleVideoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsOptimizing(true);
      try {
        const optimized = await optimizeVideo(file);
        setVideoFile(optimized.file);
        setVideoPreview(optimized.previewUrl);
        setExistingVideo(null);
      } catch (error) {
        console.error('Video optimization failed:', error);
        toast.error('Failed to process video');
      } finally {
        setIsOptimizing(false);
      }
    }
  };

  const handleRemoveVideo = () => {
    if (videoPreview && videoPreview.startsWith('blob:')) {
      URL.revokeObjectURL(videoPreview);
    }
    setVideoFile(null);
    setVideoPreview('');
    setExistingVideo(null);
  };

  const handleImagesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const totalImages = imageFiles.length + existingImages.length + files.length;
    
    if (totalImages > 5) {
      toast.error('Maximum 5 images allowed per product');
      return;
    }

    const filesToOptimize = files.slice(0, 5 - existingImages.length - imageFiles.length);
    
    setIsOptimizing(true);
    try {
      const optimizedImages = await Promise.all(
        filesToOptimize.map(file => optimizeImage(file, 1200, 0.85))
      );

      const newImageFiles = [...imageFiles, ...optimizedImages.map(opt => opt.file)];
      const newPreviews = [...imagePreviews, ...optimizedImages.map(opt => opt.previewUrl)];

      setImageFiles(newImageFiles);
      setImagePreviews(newPreviews);
    } catch (error) {
      console.error('Image optimization failed:', error);
      toast.error('Failed to process some images');
    } finally {
      setIsOptimizing(false);
    }
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
      const previewToRevoke = imagePreviews[index];
      if (previewToRevoke && previewToRevoke.startsWith('blob:')) {
        URL.revokeObjectURL(previewToRevoke);
      }
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
        category: category || 'uncategorized',
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
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-hidden gold-border admin-surface backdrop-blur">
        <DialogHeader>
          <DialogTitle className="text-bottle-green-dark font-serif text-2xl">
            {product ? 'Edit Product' : 'Add New Product'}
          </DialogTitle>
          <DialogDescription className="text-bottle-green-medium">
            {product ? 'Update product details and media' : 'Create a new jewellery product with up to 5 images and 1 video'}
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="max-h-[calc(90vh-120px)] pr-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="admin-label-text">Product Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Diamond Ring"
                className="border-gold-medium/30 text-bottle-green-dark"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="admin-label-text">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the product..."
                rows={4}
                className="border-gold-medium/30 text-bottle-green-dark"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="admin-label-text">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="border-gold-medium/30 text-bottle-green-dark">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {PRODUCT_CATEGORIES.map((cat) => (
                    <SelectItem key={cat.slug} value={cat.slug}>
                      {cat.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price" className="admin-label-text">Price (₹ INR)</Label>
              <Input
                id="price"
                type="number"
                step="1"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0"
                className="border-gold-medium/30 text-bottle-green-dark"
              />
              {price && (
                <p className="text-xs text-bottle-green-medium">
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
              <Label className="admin-label-text">Product Video (Optional)</Label>
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('video')?.click()}
                  className="gap-2 border-gold-medium text-bottle-green-dark hover:bg-gold-medium/20"
                  disabled={!!videoFile || !!existingVideo || isOptimizing}
                >
                  <Video className="h-4 w-4" />
                  {isOptimizing ? 'Processing...' : videoFile || existingVideo ? 'Video Added' : 'Upload Video'}
                </Button>
                <input
                  id="video"
                  type="file"
                  accept="video/*"
                  onChange={handleVideoChange}
                  className="hidden"
                />
                {(videoFile || existingVideo) && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleRemoveVideo}
                    className="text-destructive hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              {videoPreview && (
                <div className="relative w-full max-w-xs aspect-video rounded-lg overflow-hidden border border-gold-medium/30">
                  <video
                    src={videoPreview}
                    controls
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            {/* Images Upload Section */}
            <div className="space-y-2">
              <Label className="admin-label-text">Product Images (Max 5)</Label>
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('images')?.click()}
                  className="gap-2 border-gold-medium text-bottle-green-dark hover:bg-gold-medium/20"
                  disabled={!canAddMoreImages || isOptimizing}
                >
                  <ImageIcon className="h-4 w-4" />
                  {isOptimizing ? 'Processing...' : `Upload Images (${totalImages}/5)`}
                </Button>
                <input
                  id="images"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImagesChange}
                  className="hidden"
                />
              </div>
              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-3 gap-3">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-gold-medium/30 group">
                      <img
                        src={preview}
                        alt={`Product ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-1 right-1 bg-black/60 hover:bg-black/80 text-white opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gold-medium/30">
              <div className="flex items-center gap-2">
                <Switch
                  id="inStock"
                  checked={inStock}
                  onCheckedChange={setInStock}
                />
                <Label htmlFor="inStock" className="admin-label-text cursor-pointer">
                  In Stock
                </Label>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 border-gold-medium text-bottle-green-dark hover:bg-gold-medium/20"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={addProduct.isPending || updateProduct.isPending || isOptimizing}
                className="flex-1 admin-btn"
              >
                {addProduct.isPending || updateProduct.isPending ? 'Saving...' : product ? 'Update Product' : 'Add Product'}
              </Button>
            </div>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
