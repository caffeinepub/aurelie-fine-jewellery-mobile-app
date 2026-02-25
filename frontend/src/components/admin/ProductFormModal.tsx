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
import { ExternalBlob, type Product, type ProductCreate, Gender } from '../../backend';
import { Upload, Image as ImageIcon, Video, X } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';
import { optimizeImage, optimizeVideo } from '../../utils/mediaOptimization';
import { GIRLS_CATEGORIES, BOYS_CATEGORIES } from '../../utils/productCategories';

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
  const [gender, setGender] = useState<'boys' | 'girls'>('girls');

  // Media state
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string>('');
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [existingVideo, setExistingVideo] = useState<ExternalBlob | null>(null);
  const [existingImages, setExistingImages] = useState<ExternalBlob[]>([]);
  const [isOptimizing, setIsOptimizing] = useState(false);

  // Determine categories based on selected gender
  const availableCategories = gender === 'boys' ? BOYS_CATEGORIES : GIRLS_CATEGORIES;

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice((Number(product.priceInCents) / 100).toFixed(0));
      setInStock(product.inStock);
      setCategory(product.category || '');

      // Set gender from product
      const productGender = (product.gender as any).__kind__ ?? (product.gender as unknown as string);
      setGender(productGender === 'boys' ? 'boys' : 'girls');

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
      setGender('girls');
      setVideoFile(null);
      setVideoPreview('');
      setImageFiles([]);
      setImagePreviews([]);
      setExistingVideo(null);
      setExistingImages([]);
    }
  }, [product, open]);

  // Reset category when gender changes
  const handleGenderChange = (newGender: 'boys' | 'girls') => {
    setGender(newGender);
    setCategory('');
  };

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
      setExistingImages(existingImages.filter((_, i) => i !== index));
      setImagePreviews(imagePreviews.filter((_, i) => i !== index));
    } else {
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

      // Build gender value matching backend enum
      const genderValue = gender === 'boys'
        ? { __kind__: 'boys' as const, boys: null }
        : { __kind__: 'girls' as const, girls: null };

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
        gender: genderValue as any,
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

            {/* Gender / Section Selector */}
            <div className="space-y-2">
              <Label htmlFor="gender" className="admin-label-text">Section</Label>
              <Select value={gender} onValueChange={(v) => handleGenderChange(v as 'boys' | 'girls')}>
                <SelectTrigger className="border-gold-medium/30 text-bottle-green-dark">
                  <SelectValue placeholder="Select section" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="girls">Girls</SelectItem>
                  <SelectItem value="boys">Boys</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Category Selector - changes based on gender */}
            <div className="space-y-2">
              <Label htmlFor="category" className="admin-label-text">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="border-gold-medium/30 text-bottle-green-dark">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {availableCategories.map((cat) => (
                    <SelectItem key={cat.slug} value={cat.slug}>
                      {cat.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price" className="admin-label-text">Price (₹)</Label>
                <Input
                  id="price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="e.g., 5000"
                  min="0"
                  step="1"
                  className="border-gold-medium/30 text-bottle-green-dark"
                />
              </div>

              <div className="space-y-2">
                <Label className="admin-label-text">In Stock</Label>
                <div className="flex items-center gap-2 pt-2">
                  <Switch
                    checked={inStock}
                    onCheckedChange={setInStock}
                  />
                  <span className="text-sm text-bottle-green-medium">
                    {inStock ? 'Available' : 'Out of Stock'}
                  </span>
                </div>
              </div>
            </div>

            {/* Video Upload */}
            <div className="space-y-2">
              <Label className="admin-label-text">Product Video (optional)</Label>
              {videoPreview ? (
                <div className="relative">
                  <video
                    src={videoPreview}
                    controls
                    className="w-full rounded-lg border border-gold-medium/30 max-h-48"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={handleRemoveVideo}
                    className="absolute top-2 right-2 bg-background/80 hover:bg-background"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gold-medium/30 rounded-lg p-4 text-center">
                  <Video className="h-8 w-8 mx-auto mb-2 text-gold-medium/60" />
                  <Input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoChange}
                    className="border-gold-medium/30"
                    disabled={isOptimizing}
                  />
                  <p className="text-xs text-bottle-green-medium mt-1">MP4, MOV up to 50MB</p>
                </div>
              )}
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <Label className="admin-label-text">
                Product Images ({totalImages}/5)
              </Label>

              {/* Image Previews */}
              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mb-2">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative aspect-square">
                      <img
                        src={preview}
                        alt={`Product image ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg border border-gold-medium/30"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-1 right-1 h-6 w-6 bg-background/80 hover:bg-background"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                      {index === 0 && (
                        <span className="absolute bottom-1 left-1 text-xs bg-gold-medium text-secondary px-1 rounded">
                          Main
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {canAddMoreImages && (
                <div className="border-2 border-dashed border-gold-medium/30 rounded-lg p-4 text-center">
                  <ImageIcon className="h-8 w-8 mx-auto mb-2 text-gold-medium/60" />
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImagesChange}
                    className="border-gold-medium/30"
                    disabled={isOptimizing}
                  />
                  <p className="text-xs text-bottle-green-medium mt-1">
                    {isOptimizing ? 'Optimizing images...' : `Add up to ${5 - totalImages} more image(s)`}
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 border-gold-medium/30"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={addProduct.isPending || updateProduct.isPending || isOptimizing}
                className="flex-1 bg-gold-medium hover:bg-gold-dark text-secondary"
              >
                {(addProduct.isPending || updateProduct.isPending) ? (
                  <>
                    <Upload className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  product ? 'Update Product' : 'Add Product'
                )}
              </Button>
            </div>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
