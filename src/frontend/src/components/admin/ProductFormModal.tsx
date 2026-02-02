import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Switch } from '../ui/switch';
import { useAddProduct, useUpdateProduct } from '../../hooks/useQueries';
import { toast } from 'sonner';
import { ExternalBlob, type Product } from '../../backend';
import { Upload, Image as ImageIcon } from 'lucide-react';

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
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice((Number(product.priceInCents) / 100).toFixed(0));
      setInStock(product.inStock);
      setImagePreview(product.image.getDirectURL());
    } else {
      setName('');
      setDescription('');
      setPrice('');
      setInStock(true);
      setImageFile(null);
      setImagePreview('');
    }
  }, [product, open]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !description.trim() || !price) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!product && !imageFile) {
      toast.error('Please select an image');
      return;
    }

    try {
      const priceInCents = Math.round(parseFloat(price) * 100);
      
      let imageBlob: ExternalBlob;
      if (imageFile) {
        const arrayBuffer = await imageFile.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        imageBlob = ExternalBlob.fromBytes(uint8Array);
      } else if (product) {
        imageBlob = product.image;
      } else {
        throw new Error('No image available');
      }

      const productData: Product = {
        id: product?.id || `product_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: name.trim(),
        description: description.trim(),
        priceInCents: BigInt(priceInCents),
        image: imageBlob,
        inStock,
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

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto gold-border bg-card/95 backdrop-blur">
        <DialogHeader>
          <DialogTitle className="gold-text font-serif text-2xl">
            {product ? 'Edit Product' : 'Add New Product'}
          </DialogTitle>
          <DialogDescription className="gold-text opacity-70">
            {product ? 'Update product details and inventory status' : 'Create a new jewellery product for your catalog'}
          </DialogDescription>
        </DialogHeader>
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

          <div className="space-y-2">
            <Label htmlFor="image" className="gold-text">Product Image</Label>
            <div className="flex items-center gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('image')?.click()}
                className="gap-2 border-gold-medium gold-text hover:bg-gold-medium/20"
              >
                <Upload className="h-4 w-4" />
                {imageFile || product ? 'Change Image' : 'Upload Image'}
              </Button>
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-2 h-32 w-32 object-cover rounded border-2 border-gold-medium/30"
              />
            ) : (
              <div className="mt-2 h-32 w-32 flex items-center justify-center border-2 border-dashed border-gold-medium/30 rounded">
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
      </DialogContent>
    </Dialog>
  );
}
