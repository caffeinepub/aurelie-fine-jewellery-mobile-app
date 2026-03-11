async function optimizeImage(file, maxDimension = 1200, quality = 0.85) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();
    reader.onload = (e) => {
      var _a;
      img.src = (_a = e.target) == null ? void 0 : _a.result;
    };
    img.onload = () => {
      let width = img.width;
      let height = img.height;
      if (width > maxDimension || height > maxDimension) {
        if (width > height) {
          height = height / width * maxDimension;
          width = maxDimension;
        } else {
          width = width / height * maxDimension;
          height = maxDimension;
        }
      }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Failed to get canvas context"));
        return;
      }
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Failed to create blob"));
            return;
          }
          const optimizedFile = new File([blob], file.name, {
            type: "image/jpeg",
            lastModified: Date.now()
          });
          const previewUrl = URL.createObjectURL(blob);
          resolve({ file: optimizedFile, previewUrl });
        },
        "image/jpeg",
        quality
      );
    };
    img.onerror = () => {
      reject(new Error("Failed to load image"));
    };
    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };
    reader.readAsDataURL(file);
  });
}
async function optimizeVideo(file) {
  const previewUrl = URL.createObjectURL(file);
  return { file, previewUrl };
}
export {
  optimizeImage as a,
  optimizeVideo as o
};
