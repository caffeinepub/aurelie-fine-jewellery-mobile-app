import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Film, Shield, Trash2, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { ExternalBlob } from "../../backend";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Skeleton } from "../../components/ui/skeleton";
import {
  useGetAllCategories,
  useIsCallerAdmin,
  useUpdateCategoryVideo,
} from "../../hooks/useQueries";

interface VideoCategoryConfig {
  slug: string;
  title: string;
}

const FOR_HER_CATEGORIES: VideoCategoryConfig[] = [
  { slug: "necklace", title: "Necklace" },
  { slug: "earrings", title: "Earrings" },
  { slug: "rings", title: "Rings" },
  { slug: "anklets", title: "Anklets" },
  { slug: "lab-diamonds-jewellery", title: "Lab Diamonds" },
  { slug: "bridal-jewellery", title: "Bridal Jewellery" },
];

const FOR_HIM_CATEGORIES: VideoCategoryConfig[] = [
  { slug: "boys-chains", title: "Chains" },
  { slug: "boys-bracelet", title: "Bracelet" },
  { slug: "boys-rings", title: "Rings" },
  { slug: "boys-lab-diamonds", title: "Lab Diamonds" },
];

interface CategoryVideoCardProps {
  config: VideoCategoryConfig;
  videoUrl?: string;
}

function CategoryVideoCard({ config, videoUrl }: CategoryVideoCardProps) {
  const updateVideo = useUpdateCategoryVideo();
  const videoInputRef = useRef<HTMLInputElement>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("video/")) {
      toast.error("Please select a valid video file");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) =>
        setUploadProgress(pct),
      );

      await updateVideo.mutateAsync({ name: config.slug, video: blob });
      toast.success(`Video uploaded for ${config.title}`);
    } catch (error: any) {
      console.error("Failed to upload video:", error);
      toast.error(error.message || "Failed to upload video");
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      if (videoInputRef.current) videoInputRef.current.value = "";
    }
  };

  const handleRemove = async () => {
    try {
      await updateVideo.mutateAsync({ name: config.slug, video: null });
      toast.success(`Video removed for ${config.title}`);
    } catch (error: any) {
      console.error("Failed to remove video:", error);
      toast.error(error.message || "Failed to remove video");
    }
  };

  return (
    <Card
      className="border border-[#B5860D]/30 bg-[#F7E7CE]/60 backdrop-blur-sm"
      data-ocid="page_videos.card"
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-serif text-[#033500] flex items-center gap-2">
          <Film className="w-4 h-4 text-[#B5860D]" />
          {config.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {videoUrl ? (
          <div className="space-y-3">
            <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-[#B5860D]/30 bg-black/10">
              {/* biome-ignore lint/a11y/useMediaCaption: admin preview video */}
              <video
                src={videoUrl}
                controls
                className="w-full h-full object-cover"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRemove}
              disabled={updateVideo.isPending}
              className="border-red-400/50 text-red-600 hover:bg-red-50 hover:text-red-700 w-full"
              data-ocid="page_videos.delete_button"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              {updateVideo.isPending ? "Removing..." : "Remove Video"}
            </Button>
          </div>
        ) : (
          <div className="w-full aspect-video rounded-lg border-2 border-dashed border-[#B5860D]/30 flex items-center justify-center bg-[#B5860D]/5">
            <div className="text-center">
              <Film className="w-8 h-8 text-[#B5860D]/40 mx-auto mb-2" />
              <p className="text-xs text-[#033500]/60">No video uploaded</p>
            </div>
          </div>
        )}

        <input
          ref={videoInputRef}
          type="file"
          accept="video/*"
          onChange={handleUpload}
          className="hidden"
          id={`video-upload-${config.slug}`}
        />
        <Button
          variant="outline"
          size="sm"
          onClick={() => videoInputRef.current?.click()}
          disabled={isUploading}
          className="border-[#B5860D]/40 text-[#033500] hover:border-[#B5860D] hover:bg-[#B5860D]/10 w-full"
          data-ocid="page_videos.upload_button"
        >
          <Upload className="h-4 w-4 mr-2" />
          {isUploading
            ? `Uploading… ${uploadProgress}%`
            : videoUrl
              ? "Replace Video"
              : "Upload Video"}
        </Button>

        {isUploading && (
          <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
            <div
              className="h-full bg-[#B5860D] transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function PageVideosAdminPage() {
  const navigate = useNavigate();
  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();
  const { data: allCategories, isLoading: categoriesLoading } =
    useGetAllCategories();

  // Build video URL map from categories data
  const videoMap = new Map<string, string>();
  if (allCategories) {
    for (const cat of allCategories) {
      if (cat.video) {
        videoMap.set(cat.name, cat.video.getDirectURL());
      }
    }
  }

  if (adminLoading || categoriesLoading) {
    return (
      <div className="container px-4 py-8 bg-transparent">
        <Skeleton className="h-10 w-48 mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-48 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-transparent">
        <div className="text-center">
          <Shield className="w-16 h-16 text-[#B5860D] mx-auto mb-4" />
          <h2 className="text-2xl font-serif text-[#033500] mb-2">
            Access Denied
          </h2>
          <p className="text-[#033500]/70">You do not have admin privileges.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Back button */}
        <Button
          variant="ghost"
          onClick={() => navigate({ to: "/admin" })}
          className="mb-6 text-[#033500] hover:text-[#B5860D]"
          data-ocid="page_videos.back_button"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Admin
        </Button>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <Film className="w-7 h-7 text-[#B5860D]" />
            <h1 className="font-serif text-3xl text-[#033500]">Page Videos</h1>
          </div>
          <p className="text-[#033500]/70 text-sm">
            Upload background videos for For Him and For Her category pages.
            Videos auto-play muted and looped behind the category circles.
          </p>
          <div className="w-20 h-0.5 bg-[#B5860D] mt-4" />
        </div>

        {/* For Her section */}
        <section className="mb-12" data-ocid="page_videos.section">
          <h2 className="font-serif text-xl text-[#033500] mb-1 flex items-center gap-2">
            <span className="text-[#B5860D]">✦</span> For Her
          </h2>
          <p className="text-sm text-[#033500]/60 mb-5">
            Videos for each sub-category under the For Her section
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FOR_HER_CATEGORIES.map((cat) => (
              <CategoryVideoCard
                key={cat.slug}
                config={cat}
                videoUrl={videoMap.get(cat.slug)}
              />
            ))}
          </div>
        </section>

        {/* For Him section */}
        <section data-ocid="page_videos.section">
          <h2 className="font-serif text-xl text-[#033500] mb-1 flex items-center gap-2">
            <span className="text-[#B5860D]">✦</span> For Him
          </h2>
          <p className="text-sm text-[#033500]/60 mb-5">
            Videos for each sub-category under the For Him section
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FOR_HIM_CATEGORIES.map((cat) => (
              <CategoryVideoCard
                key={cat.slug}
                config={cat}
                videoUrl={videoMap.get(cat.slug)}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
