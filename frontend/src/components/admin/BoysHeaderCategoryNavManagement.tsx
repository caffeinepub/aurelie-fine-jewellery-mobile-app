import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { BOYS_CATEGORIES } from '../../utils/productCategories';
import { useGetAllCategoryHeaders, useSetCategoryHeader } from '../../hooks/useCategoryHeaderNav';
import { ExternalBlob } from '../../backend';
import { optimizeImage } from '../../utils/mediaOptimization';
import { toast } from 'sonner';
import { Upload, Save, Loader2 } from 'lucide-react';
import { Progress } from '../ui/progress';

interface CategoryHeaderState {
  image: ExternalBlob | null;
  redirectUrl: string;
  uploadProgress: number;
}

export default function BoysHeaderCategoryNavManagement() {
  const { data: categoryHeaders } = useGetAllCategoryHeaders();
  const setCategoryHeader = useSetCategoryHeader();

  const headersMap = new Map(categoryHeaders || []);

  const [categoryStates, setCategoryStates] = useState<Record<string, CategoryHeaderState>>(() => {
    const initial: Record<string, CategoryHeaderState> = {};
    BOYS_CATEGORIES.forEach((cat) => {
      const existing = headersMap.get(cat.slug);
      initial[cat.slug] = {
        image: existing?.image || null,
        redirectUrl: existing?.redirectUrl || '',
        uploadProgress: 0,
      };
    });
    return initial;
  });

  const [savingCategory, setSavingCategory] = useState<string | null>(null);

  const handleImageUpload = async (categorySlug: string, file: File) => {
    try {
      setCategoryStates((prev) => ({
        ...prev,
        [categorySlug]: { ...prev[categorySlug], uploadProgress: 0 },
      }));

      const optimized = await optimizeImage(file);

      const arrayBuffer = await optimized.file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);

      const blob = ExternalBlob.fromBytes(uint8Array).withUploadProgress((percentage) => {
        setCategoryStates((prev) => ({
          ...prev,
          [categorySlug]: { ...prev[categorySlug], uploadProgress: percentage },
        }));
      });

      setCategoryStates((prev) => ({
        ...prev,
        [categorySlug]: { ...prev[categorySlug], image: blob, uploadProgress: 100 },
      }));

      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Image upload error:', error);
      toast.error('Failed to upload image');
    }
  };

  const handleSave = async (categorySlug: string) => {
    const state = categoryStates[categorySlug];
    if (!state.image) {
      toast.error('Please upload an image first');
      return;
    }

    try {
      setSavingCategory(categorySlug);
      await setCategoryHeader.mutateAsync({
        categorySlug,
        header: {
          image: state.image,
          redirectUrl: state.redirectUrl.trim(),
        },
      });
      toast.success('Boys category header saved successfully');
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Failed to save category header');
    } finally {
      setSavingCategory(null);
    }
  };

  return (
    <Card className="gold-border admin-surface">
      <CardHeader>
        <CardTitle className="text-bottle-green-dark">Boys Category Navigation</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-bottle-green-medium mb-6">
          Manage circular category images and redirect URLs for the Boys section sub-categories
        </p>

        <div className="space-y-6">
          {BOYS_CATEGORIES.map((category) => {
            const state = categoryStates[category.slug];
            const existingHeader = headersMap.get(category.slug);
            const imageUrl = state.image?.getDirectURL() || existingHeader?.image?.getDirectURL();
            const isSaving = savingCategory === category.slug;

            return (
              <div key={category.slug} className="border border-gold-medium/30 rounded-lg p-4">
                <h4 className="font-semibold text-bottle-green-dark mb-4">{category.title}</h4>

                <div className="grid gap-4 md:grid-cols-2">
                  {/* Image Upload */}
                  <div>
                    <Label className="text-bottle-green-dark mb-2 block">Category Image</Label>
                    <div className="flex items-center gap-4">
                      {imageUrl && (
                        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gold-medium/30 flex-shrink-0">
                          <img
                            src={imageUrl}
                            alt={category.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleImageUpload(category.slug, file);
                          }}
                          className="border-gold-medium/30"
                        />
                        {state.uploadProgress > 0 && state.uploadProgress < 100 && (
                          <Progress value={state.uploadProgress} className="mt-2" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Redirect URL */}
                  <div>
                    <Label htmlFor={`url-boys-${category.slug}`} className="text-bottle-green-dark mb-2 block">
                      Redirect URL (optional)
                    </Label>
                    <Input
                      id={`url-boys-${category.slug}`}
                      value={state.redirectUrl}
                      onChange={(e) =>
                        setCategoryStates((prev) => ({
                          ...prev,
                          [category.slug]: { ...prev[category.slug], redirectUrl: e.target.value },
                        }))
                      }
                      placeholder={`/boys/${category.slug.replace('boys-', '')}`}
                      className="border-gold-medium/30 text-bottle-green-dark"
                    />
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <Button
                    onClick={() => handleSave(category.slug)}
                    disabled={isSaving || !state.image}
                    className="bg-gold-medium hover:bg-gold-dark text-secondary"
                    size="sm"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </>
                    )}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
