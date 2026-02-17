import { useParams, useNavigate } from '@tanstack/react-router';
import { useIsCallerAdmin, useGetCategory, useUpdateCategory } from '../../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Skeleton } from '../../components/ui/skeleton';
import { ArrowLeft, Save } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import CategoryImagesManager from '../../components/admin/CategoryImagesManager';
import { ExternalBlob } from '../../backend';

export default function CategoryEditPage() {
  const { categorySlug } = useParams({ from: '/admin/categories/$categorySlug/edit' });
  const navigate = useNavigate();
  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();
  const { data: category, isLoading: categoryLoading } = useGetCategory(categorySlug);
  const updateCategory = useUpdateCategory();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [displayOrder, setDisplayOrder] = useState(0);
  const [images, setImages] = useState<ExternalBlob[]>([]);
  const [primaryImage, setPrimaryImage] = useState<ExternalBlob | null>(null);

  useEffect(() => {
    if (category) {
      setName(category.name);
      setDescription(category.description);
      setDisplayOrder(Number(category.displayOrder));
      setImages(category.images);
      setPrimaryImage(category.primaryImage);
    }
  }, [category]);

  const handleSave = async () => {
    if (!category || !primaryImage) {
      toast.error('Primary image is required');
      return;
    }

    try {
      await updateCategory.mutateAsync({
        name: categorySlug,
        categoryInput: {
          name,
          description,
          displayOrder: BigInt(displayOrder),
          isActive: category.isActive,
          primaryImage,
          images,
        },
      });
      toast.success('Category updated successfully');
      navigate({ to: '/admin' });
    } catch (error: any) {
      console.error('Failed to update category:', error);
      toast.error(error.message || 'Failed to update category');
    }
  };

  if (adminLoading || categoryLoading) {
    return (
      <div className="container px-4 py-8">
        <Skeleton className="h-12 w-64 mb-8" />
        <div className="space-y-4">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-48" />
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="container px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-2 gold-text">Access Denied</h2>
          <p className="gold-text opacity-80">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="container px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-2">Category Not Found</h2>
          <p className="text-muted-foreground">The category you're looking for doesn't exist.</p>
          <Button onClick={() => navigate({ to: '/admin' })} className="mt-4">
            Back to Admin
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8">
      <div className="mb-8">
        <Button
          variant="ghost"
          onClick={() => navigate({ to: '/admin' })}
          className="mb-4 text-bottle-green-dark hover:text-gold-medium"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Admin
        </Button>
        <h1 className="font-serif text-3xl font-semibold tracking-tight mb-2 text-bottle-green-dark">
          Edit Category: {category.name}
        </h1>
        <p className="text-bottle-green-medium">Update category details and manage images</p>
      </div>

      <div className="space-y-6">
        {/* Basic Information */}
        <Card className="gold-border admin-surface">
          <CardHeader>
            <CardTitle className="text-bottle-green-dark">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-bottle-green-dark">Category Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-navy-medium border-gold-medium/30 text-beige-champagne"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-bottle-green-dark">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="bg-navy-medium border-gold-medium/30 text-beige-champagne"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="displayOrder" className="text-bottle-green-dark">Display Order</Label>
              <Input
                id="displayOrder"
                type="number"
                value={displayOrder}
                onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 0)}
                className="bg-navy-medium border-gold-medium/30 text-beige-champagne"
              />
              <p className="text-xs text-bottle-green-medium">
                Lower numbers appear first in category lists
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Images Management */}
        <CategoryImagesManager
          images={images}
          primaryImage={primaryImage}
          onImagesChange={setImages}
          onPrimaryImageChange={setPrimaryImage}
        />

        {/* Save Button */}
        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={() => navigate({ to: '/admin' })}
            className="border-gold-medium/30"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={updateCategory.isPending}
            className="bg-gold-medium hover:bg-gold-dark text-navy-dark"
          >
            <Save className="h-4 w-4 mr-2" />
            {updateCategory.isPending ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </div>
  );
}
