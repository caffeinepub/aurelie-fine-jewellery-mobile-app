import { useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeft, Film, Save, Trash2, Upload } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  ExternalBlob,
  type ExternalBlob as ExternalBlobType,
} from "../../backend";
import CategoryImagesManager from "../../components/admin/CategoryImagesManager";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Skeleton } from "../../components/ui/skeleton";
import { Textarea } from "../../components/ui/textarea";
import {
  useGetCategory,
  useIsCallerAdmin,
  useUpdateCategory,
  useUpdateCategoryVideo,
} from "../../hooks/useQueries";

export default function CategoryEditPage() {
  const params = useParams({ strict: false }) as Record<
    string,
    string | undefined
  >;
  const categorySlug = params.categorySlug ?? "";
  const navigate = useNavigate();
  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();
  const { data: category, isLoading: categoryLoading } =
    useGetCategory(categorySlug);
  const updateCategory = useUpdateCategory();
  const updateCategoryVideo = useUpdateCategoryVideo();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [displayOrder, setDisplayOrder] = useState(0);
  const [images, setImages] = useState<ExternalBlobType[]>([]);
  const [primaryImage, setPrimaryImage] = useState<ExternalBlobType | null>(
    null,
  );
  const [isUploadingVideo, setIsUploadingVideo] = useState(false);
  const [videoUploadProgress, setVideoUploadProgress] = useState(0);
  const videoInputRef = useRef<HTMLInputElement>(null);

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
      toast.error("Primary image is required");
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
      toast.success("Category updated successfully");
      navigate({ to: "/admin" });
    } catch (error: any) {
      console.error("Failed to update category:", error);
      toast.error(error.message || "Failed to update category");
    }
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("video/")) {
      toast.error("Please select a valid video file");
      return;
    }

    setIsUploadingVideo(true);
    setVideoUploadProgress(0);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) =>
        setVideoUploadProgress(pct),
      );

      await updateCategoryVideo.mutateAsync({
        name: categorySlug,
        video: blob,
      });
      toast.success("Video uploaded successfully");
    } catch (error: any) {
      console.error("Failed to upload video:", error);
      toast.error(error.message || "Failed to upload video");
    } finally {
      setIsUploadingVideo(false);
      setVideoUploadProgress(0);
      if (videoInputRef.current) videoInputRef.current.value = "";
    }
  };

  const handleRemoveVideo = async () => {
    try {
      await updateCategoryVideo.mutateAsync({
        name: categorySlug,
        video: null,
      });
      toast.success("Video removed successfully");
    } catch (error: any) {
      console.error("Failed to remove video:", error);
      toast.error(error.message || "Failed to remove video");
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
          <h2 className="text-2xl font-semibold mb-2 gold-text">
            Access Denied
          </h2>
          <p className="gold-text opacity-80">
            You don't have permission to access this page.
          </p>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="container px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-2">Category Not Found</h2>
          <p className="text-muted-foreground">
            The category you're looking for doesn't exist.
          </p>
          <Button onClick={() => navigate({ to: "/admin" })} className="mt-4">
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
          onClick={() => navigate({ to: "/admin" })}
          className="mb-4 text-bottle-green-dark hover:text-gold-medium"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Admin
        </Button>
        <h1 className="font-serif text-3xl font-semibold tracking-tight mb-2 text-bottle-green-dark">
          Edit Category: {category.name}
        </h1>
        <p className="text-bottle-green-medium">
          Update category details and manage images
        </p>
      </div>

      <div className="space-y-6">
        {/* Basic Information */}
        <Card className="gold-border admin-surface">
          <CardHeader>
            <CardTitle className="text-bottle-green-dark">
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-bottle-green-dark">
                Category Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-navy-medium border-gold-medium/30 text-beige-champagne"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-bottle-green-dark">
                Description
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="bg-navy-medium border-gold-medium/30 text-beige-champagne"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="displayOrder" className="text-bottle-green-dark">
                Display Order
              </Label>
              <Input
                id="displayOrder"
                type="number"
                value={displayOrder}
                onChange={(e) =>
                  setDisplayOrder(Number.parseInt(e.target.value) || 0)
                }
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

        {/* Sub-category Video */}
        <Card className="gold-border admin-surface">
          <CardHeader>
            <CardTitle className="text-bottle-green-dark flex items-center gap-2">
              <Film className="h-5 w-5 text-gold-medium" />
              Sub-category Video
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-bottle-green-medium">
              Upload a video that will auto-play (muted, looped) at the top of
              this category's page. Recommended: 16:9 aspect ratio, MP4 format.
            </p>

            {/* Current video preview */}
            {category.video && (
              <div className="space-y-3">
                <p className="text-sm font-medium text-bottle-green-dark">
                  Current Video:
                </p>
                <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-gold-medium/30 bg-navy-dark/20">
                  {/* biome-ignore lint/a11y/useMediaCaption: admin preview video; captions not applicable */}
                  <video
                    src={category.video.getDirectURL()}
                    controls
                    className="w-full h-full object-cover"
                  />
                </div>
                <Button
                  variant="outline"
                  onClick={handleRemoveVideo}
                  disabled={updateCategoryVideo.isPending}
                  className="border-destructive/50 text-destructive hover:bg-destructive/10 hover:text-destructive"
                  data-ocid="category_edit.video_remove_button"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  {updateCategoryVideo.isPending
                    ? "Removing..."
                    : "Remove Video"}
                </Button>
              </div>
            )}

            {/* Upload video */}
            <div className="space-y-2">
              <input
                ref={videoInputRef}
                type="file"
                accept="video/*"
                onChange={handleVideoUpload}
                className="hidden"
                id="video-upload-input"
              />
              <Button
                variant="outline"
                onClick={() => videoInputRef.current?.click()}
                disabled={isUploadingVideo}
                className="border-gold-medium/40 text-bottle-green-dark hover:border-gold-medium hover:bg-gold-light/10"
                data-ocid="category_edit.video_upload_button"
              >
                <Upload className="h-4 w-4 mr-2" />
                {isUploadingVideo
                  ? `Uploading… ${videoUploadProgress}%`
                  : category.video
                    ? "Replace Video"
                    : "Upload Video"}
              </Button>

              {isUploadingVideo && (
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-gold-medium transition-all duration-300"
                    style={{ width: `${videoUploadProgress}%` }}
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={() => navigate({ to: "/admin" })}
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
            {updateCategory.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
}
