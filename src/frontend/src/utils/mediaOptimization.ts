/**
 * Client-side media optimization utilities for images and videos.
 * Resizes and compresses media before upload to reduce file size and improve loading performance.
 */

interface OptimizedMedia {
  file: File;
  previewUrl: string;
}

/**
 * Optimizes an image by resizing to max dimension and compressing.
 * @param file - The original image file
 * @param maxDimension - Maximum width or height (default 1200px)
 * @param quality - JPEG quality 0-1 (default 0.85)
 * @returns Optimized image file and preview URL
 */
export async function optimizeImage(
  file: File,
  maxDimension: number = 1200,
  quality: number = 0.85
): Promise<OptimizedMedia> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };

    img.onload = () => {
      // Calculate new dimensions
      let width = img.width;
      let height = img.height;

      if (width > maxDimension || height > maxDimension) {
        if (width > height) {
          height = (height / width) * maxDimension;
          width = maxDimension;
        } else {
          width = (width / height) * maxDimension;
          height = maxDimension;
        }
      }

      // Create canvas and draw resized image
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);

      // Convert to blob
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Failed to create blob'));
            return;
          }

          // Create optimized file
          const optimizedFile = new File([blob], file.name, {
            type: 'image/jpeg',
            lastModified: Date.now(),
          });

          const previewUrl = URL.createObjectURL(blob);

          resolve({ file: optimizedFile, previewUrl });
        },
        'image/jpeg',
        quality
      );
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Optimizes multiple images in parallel.
 * @param files - Array of image files to optimize
 * @param maxDimension - Maximum width or height (default 1200px)
 * @param quality - JPEG quality 0-1 (default 0.85)
 * @returns Array of optimized images with preview URLs
 */
export async function optimizeImages(
  files: File[],
  maxDimension: number = 1200,
  quality: number = 0.85
): Promise<OptimizedMedia[]> {
  const promises = files.map((file) => optimizeImage(file, maxDimension, quality));
  return Promise.all(promises);
}

/**
 * Basic video optimization - currently just returns the original file with preview.
 * Future enhancement: could implement client-side video compression/transcoding.
 * @param file - The original video file
 * @returns Video file and preview URL
 */
export async function optimizeVideo(file: File): Promise<OptimizedMedia> {
  // For now, just create a preview URL without optimization
  // Client-side video compression is complex and may not be worth the trade-off
  const previewUrl = URL.createObjectURL(file);
  return { file, previewUrl };
}
