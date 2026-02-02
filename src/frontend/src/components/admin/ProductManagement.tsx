import { useState } from 'react';
import { useGetProducts, useAddProduct, useUpdateProduct, useDeleteProduct } from '../../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Plus, Edit, Trash2, Package } from 'lucide-react';
import ProductFormModal from './ProductFormModal';
import { toast } from 'sonner';
import type { Product } from '../../backend';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';

export default function ProductManagement() {
  const { data: products, isLoading } = useGetProducts();
  const deleteProduct = useDeleteProduct();
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);

  const formatINR = (priceInCents: bigint) => {
    const amount = Number(priceInCents) / 100;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = async () => {
    if (!deletingProduct) return;

    try {
      await deleteProduct.mutateAsync(deletingProduct.id);
      toast.success('Product deleted successfully');
      setDeletingProduct(null);
    } catch (error: any) {
      console.error('Failed to delete product:', error);
      toast.error(error.message || 'Failed to delete product');
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  return (
    <>
      <Card className="gold-border bg-card/80 backdrop-blur">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="gold-text flex items-center gap-2">
                <Package className="h-5 w-5" />
                Product Inventory Management
              </CardTitle>
              <CardDescription className="gold-text opacity-70 mt-1">
                Add, edit, and manage your jewellery products
              </CardDescription>
            </div>
            <Button onClick={() => setShowForm(true)} className="gap-2 gold-gradient text-secondary shadow-gold">
              <Plus className="h-4 w-4" />
              Add Product
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">
              <p className="gold-text opacity-70">Loading products...</p>
            </div>
          ) : products && products.length > 0 ? (
            <div className="space-y-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-4 p-4 border border-gold-medium/30 rounded-lg hover:bg-emerald-light/10 transition-colors"
                >
                  <img
                    src={product.image.getDirectURL()}
                    alt={product.name}
                    className="h-20 w-20 object-cover rounded border-2 border-gold-medium/30"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold gold-text">{product.name}</h3>
                      <Badge variant={product.inStock ? 'default' : 'secondary'} className={product.inStock ? 'bg-gold-medium text-secondary' : ''}>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </Badge>
                    </div>
                    <p className="text-sm gold-text opacity-70 line-clamp-1">
                      {product.description}
                    </p>
                    <p className="text-lg font-semibold gold-text mt-1">
                      {formatINR(product.priceInCents)}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(product)}
                      className="gap-2 border-gold-medium hover:bg-gold-medium/20 gold-text"
                    >
                      <Edit className="h-4 w-4" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setDeletingProduct(product)}
                      className="gap-2"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="h-16 w-16 mx-auto mb-4 text-gold-medium opacity-50" />
              <p className="gold-text opacity-70 mb-4">No products yet. Add your first product to get started.</p>
              <Button onClick={() => setShowForm(true)} className="gap-2 gold-gradient text-secondary shadow-gold">
                <Plus className="h-4 w-4" />
                Add Your First Product
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <ProductFormModal
        open={showForm}
        onClose={handleCloseForm}
        product={editingProduct}
      />

      <AlertDialog open={!!deletingProduct} onOpenChange={() => setDeletingProduct(null)}>
        <AlertDialogContent className="gold-border bg-card/95 backdrop-blur">
          <AlertDialogHeader>
            <AlertDialogTitle className="gold-text">Delete Product</AlertDialogTitle>
            <AlertDialogDescription className="gold-text opacity-70">
              Are you sure you want to delete "{deletingProduct?.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-gold-medium gold-text">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={deleteProduct.isPending} className="bg-destructive text-destructive-foreground">
              {deleteProduct.isPending ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
