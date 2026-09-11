import { useState, useRef } from "react";
import { uploadImage as uploadImageApi } from "@/services/api";
import {
  FiUpload,
  FiTrash2,
  FiImage,
  FiLoader,
  FiVideo,
  FiFile,
} from "react-icons/fi";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

function getAdminToken(): string {
  return localStorage.getItem("jcsam_admin_token") || "";
}

/* -------------------------------------------------------
   FILE TYPES
------------------------------------------------------- */

const IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
  "image/heic",
  "image/heif",
];

const VIDEO_TYPES = [
  "video/mp4",
  "video/mov",
  "video/quicktime",
  "video/webm",
  "video/x-m4v",
];

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 MB
const IMAGE_COMPRESS_LIMIT = 2 * 1024 * 1024; // 2 MB

function isImage(file: File): boolean {
  const type = file.type.toLowerCase();

  if (IMAGE_TYPES.includes(type)) return true;

  const name = file.name.toLowerCase();

  return /\.(jpg|jpeg|png|webp|gif|svg|heic|heif)$/i.test(name);
}

function isVideo(file: File): boolean {
  const type = file.type.toLowerCase();

  if (VIDEO_TYPES.includes(type)) return true;

  const name = file.name.toLowerCase();

  return /\.(mp4|mov|webm|m4v)$/i.test(name);
}

/* -------------------------------------------------------
   IMAGE OPTIMIZER
------------------------------------------------------- */

async function optimizeImage(file: File): Promise<File> {
  // SVG/GIF/HEIC should not be blindly converted in the browser.
  const name = file.name.toLowerCase();

  if (
    name.endsWith(".svg") ||
    name.endsWith(".gif") ||
    name.endsWith(".heic") ||
    name.endsWith(".heif")
  ) {
    return file;
  }

  // Small images don't need optimization.
  if (file.size <= IMAGE_COMPRESS_LIMIT) {
    return file;
  }

  return new Promise<File>((resolve) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      const MAX_WIDTH = 1800;
      const MAX_HEIGHT = 1800;

      let width = img.naturalWidth;
      let height = img.naturalHeight;

      if (width > MAX_WIDTH || height > MAX_HEIGHT) {
        const ratio = Math.min(
          MAX_WIDTH / width,
          MAX_HEIGHT / height
        );

        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");

      if (!ctx) {
        resolve(file);
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            resolve(file);
            return;
          }

          const optimizedFile = new File(
            [blob],
            file.name.replace(/\.[^/.]+$/, ".jpg"),
            {
              type: "image/jpeg",
              lastModified: Date.now(),
            }
          );

          resolve(optimizedFile);
        },
        "image/jpeg",
        0.82
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(file);
    };

    img.src = objectUrl;
  });
}

/* -------------------------------------------------------
   UPLOAD
------------------------------------------------------- */

async function uploadToDrive(
  originalFile: File,
  bucket: string,
  onProgress?: (message: string) => void
): Promise<string> {
  const token = getAdminToken();

  if (!token) {
    throw new Error(
      "You must be logged in as admin to upload files."
    );
  }

  if (originalFile.size > MAX_FILE_SIZE) {
    throw new Error(
      "File is too large. Maximum allowed size is 50 MB."
    );
  }

  let file = originalFile;

  if (isImage(file)) {
    onProgress?.("Optimizing image...");

    file = await optimizeImage(file);
  }

  if (isVideo(file)) {
    onProgress?.("Preparing video...");
  }

  onProgress?.("Uploading to Google Drive...");

  const result: any = await uploadImageApi(file, bucket);

  console.log("JCSAM upload response:", result);

  if (!result?.success) {
    throw new Error(
      result?.error ||
        result?.message ||
        "Google Drive upload failed."
    );
  }

  const url =
    result?.url ||
    result?.imageUrl ||
    result?.viewUrl ||
    result?.data?.url ||
    result?.data?.imageUrl ||
    result?.data?.viewUrl;

  if (!url) {
    console.error("Upload succeeded but no URL returned:", result);

    throw new Error(
      "File uploaded, but the server did not return an image URL."
    );
  }

  return url;
}

/* -------------------------------------------------------
   PREVIEW COMPONENT
------------------------------------------------------- */

function MediaPreview({
  url,
  fileName = "",
  className = "",
}: {
  url: string;
  fileName?: string;
  className?: string;
}) {
  const video =
    /\.(mp4|mov|webm|m4v)(\?|$)/i.test(fileName) ||
    /\.(mp4|mov|webm|m4v)(\?|$)/i.test(url);

  if (video) {
    return (
      <video
        src={url}
        controls
        preload="metadata"
        className={`w-full h-full object-cover ${className}`}
      />
    );
  }

  return (
    <img
      src={url}
      alt="Preview"
      loading="lazy"
      className={`w-full h-full object-cover ${className}`}
      onError={(e) => {
        console.error("Media preview failed:", url);
        e.currentTarget.style.display = "none";
      }}
    />
  );
}

/* -------------------------------------------------------
   SINGLE MEDIA UPLOADER
------------------------------------------------------- */

interface ImageUploaderProps {
  bucket: string;
  currentUrl?: string;
  onUpload: (url: string) => void;
  onRemove?: () => void;
  label?: string;
  className?: string;
  accept?: string;
}

export const ImageUploader = ({
  bucket,
  currentUrl,
  onUpload,
  onRemove,
  label = "Upload Image",
  className = "",
  accept = "image/*,video/mp4,video/quicktime,video/webm,.heic,.heif",
}: ImageUploaderProps) => {
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    console.log("JCSAM selected file:", {
      name: file.name,
      type: file.type,
      size: file.size,
    });

    if (!isImage(file) && !isVideo(file)) {
      toast.error(
        "Unsupported file. Please select JPG, PNG, WEBP, GIF, SVG, HEIC, MP4, MOV or WEBM."
      );

      e.target.value = "";
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error("File too large. Maximum size is 50 MB.");
      e.target.value = "";
      return;
    }

    setUploading(true);
    setStatus("Preparing...");

    try {
      const url = await uploadToDrive(
        file,
        bucket,
        setStatus
      );

      console.log("JCSAM uploaded URL:", url);

      onUpload(url);

      toast.success(
        isVideo(file)
          ? "Video uploaded successfully!"
          : "Image uploaded successfully!"
      );
    } catch (err: any) {
      console.error("JCSAM upload error:", err);

      toast.error(
        err?.message ||
          "Upload failed. Please check the console."
      );
    } finally {
      setUploading(false);
      setStatus("");

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {currentUrl && (
        <div className="relative group w-full h-48 rounded-lg overflow-hidden border border-border bg-muted">
          <MediaPreview url={currentUrl} />

          {onRemove && (
            <button
              type="button"
              onClick={onRemove}
              className="absolute top-2 right-2 p-1.5 rounded-lg bg-destructive text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <FiTrash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      <button
        type="button"
        disabled={uploading}
        onClick={() => inputRef.current?.click()}
        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border-2 border-dashed border-border hover:border-primary text-muted-foreground hover:text-primary transition-colors text-sm disabled:opacity-60"
      >
        {uploading ? (
          <FiLoader className="animate-spin" />
        ) : (
          <FiUpload />
        )}

        {uploading
          ? status || "Uploading..."
          : label}
      </button>

      <p className="text-[11px] text-muted-foreground text-center">
        JPG, PNG, WEBP, GIF, SVG, HEIC, MP4, MOV, WEBM • Max 50MB
      </p>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={handleUpload}
      />
    </div>
  );
};

/* -------------------------------------------------------
   MULTI MEDIA UPLOADER
------------------------------------------------------- */

interface MultiImageUploaderProps {
  bucket: string;
  images: {
    id: string;
    url: string;
    caption: string;
  }[];
  onAdd: (url: string, caption: string) => void;
  onDelete: (id: string) => void;
  onCaptionChange?: (
    id: string,
    caption: string
  ) => void;
}

export const MultiImageUploader = ({
  bucket,
  images,
  onAdd,
  onDelete,
}: MultiImageUploaderProps) => {
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState("");
  const [caption, setCaption] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!isImage(file) && !isVideo(file)) {
      toast.error(
        "Unsupported file. Use JPG, PNG, WEBP, GIF, SVG, HEIC, MP4, MOV or WEBM."
      );

      e.target.value = "";
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error("File too large. Maximum size is 50 MB.");
      e.target.value = "";
      return;
    }

    setUploading(true);
    setStatus("Preparing...");

    try {
      const url = await uploadToDrive(
        file,
        bucket,
        setStatus
      );

      onAdd(url, caption);

      setCaption("");

      toast.success(
        isVideo(file)
          ? "Video added successfully!"
          : "Image added successfully!"
      );
    } catch (err: any) {
      console.error("JCSAM multi-upload error:", err);

      toast.error(
        err?.message ||
          "Upload failed. Please check the console."
      );
    } finally {
      setUploading(false);
      setStatus("");

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <input
          type="text"
          placeholder="Caption (optional)"
          value={caption}
          onChange={(e) =>
            setCaption(e.target.value)
          }
          className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />

        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border-2 border-dashed border-border hover:border-primary text-muted-foreground hover:text-primary transition-colors text-sm font-medium disabled:opacity-60"
        >
          {uploading ? (
            <FiLoader className="animate-spin" />
          ) : (
            <FiUpload />
          )}

          {uploading
            ? status || "Uploading..."
            : "Add Image / Video"}
        </button>

        <p className="text-[11px] text-muted-foreground text-center">
          JPG, PNG, WEBP, GIF, SVG, HEIC, MP4, MOV, WEBM • Max 50MB
        </p>

        <input
          ref={inputRef}
          type="file"
          accept="image/*,video/mp4,video/quicktime,video/webm,.heic,.heif"
          className="hidden"
          onChange={handleUpload}
        />
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <AnimatePresence>
            {images.map((img) => (
              <motion.div
                key={img.id}
                initial={{
                  opacity: 0,
                  scale: 0.9,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                }}
                className="relative group rounded-lg overflow-hidden border border-border bg-muted aspect-video"
              >
                <MediaPreview
                  url={img.url}
                  fileName={img.url}
                />

                {img.caption && (
                  <div className="absolute bottom-0 inset-x-0 bg-foreground/60 text-background text-xs px-2 py-1 truncate">
                    {img.caption}
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => onDelete(img.id)}
                  className="absolute top-1.5 right-1.5 p-1.5 rounded-lg bg-destructive text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <FiTrash2 className="w-3 h-3" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {images.length === 0 && (
        <div className="flex flex-col items-center justify-center py-6 rounded-lg border border-dashed border-border text-muted-foreground text-sm gap-2">
          <div className="flex gap-2">
            <FiImage className="w-6 h-6" />
            <FiVideo className="w-6 h-6" />
          </div>

          <span>No media yet</span>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;