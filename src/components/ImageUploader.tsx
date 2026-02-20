
import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { FiUpload, FiTrash2, FiImage, FiLoader } from "react-icons/fi";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

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
  accept = "image/*",
}: ImageUploaderProps) => {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) { toast.error("File too large (max 10MB)"); return; }

    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await supabase.storage.from(bucket).upload(path, file, { upsert: false });
      if (error) throw error;
      const { data } = supabase.storage.from(bucket).getPublicUrl(path);
      onUpload(data.publicUrl);
      toast.success("Image uploaded!");
    } catch (err: any) {
      toast.error(err.message || "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {currentUrl && (
        <div className="relative group w-full rounded-lg overflow-hidden border border-border bg-muted">
          <img src={currentUrl} alt="Preview" className="w-full h-36 object-cover" />
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
        className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg border-2 border-dashed border-border hover:border-primary text-muted-foreground hover:text-primary transition-colors text-sm"
      >
        {uploading ? <FiLoader className="animate-spin" /> : <FiUpload />}
        {uploading ? "Uploading..." : label}
      </button>
      <input ref={inputRef} type="file" accept={accept} className="hidden" onChange={handleUpload} />
    </div>
  );
};

// Multi-image uploader for sports
interface MultiImageUploaderProps {
  bucket: string;
  images: { id: string; url: string; caption: string }[];
  onAdd: (url: string, caption: string) => void;
  onDelete: (id: string) => void;
  onCaptionChange?: (id: string, caption: string) => void;
}

export const MultiImageUploader = ({
  bucket,
  images,
  onAdd,
  onDelete,
}: MultiImageUploaderProps) => {
  const [uploading, setUploading] = useState(false);
  const [caption, setCaption] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) { toast.error("File too large (max 10MB)"); return; }

    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await supabase.storage.from(bucket).upload(path, file, { upsert: false });
      if (error) throw error;
      const { data } = supabase.storage.from(bucket).getPublicUrl(path);
      onAdd(data.publicUrl, caption);
      setCaption("");
    } catch (err: any) {
      toast.error(err.message || "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4">
      {/* Upload area */}
      <div className="space-y-2">
        <input
          type="text"
          placeholder="Caption (optional)"
          value={caption}
          onChange={e => setCaption(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border-2 border-dashed border-border hover:border-primary text-muted-foreground hover:text-primary transition-colors text-sm font-medium"
        >
          {uploading ? <FiLoader className="animate-spin" /> : <FiUpload />}
          {uploading ? "Uploading..." : "Add Image"}
        </button>
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
      </div>

      {/* Image grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <AnimatePresence>
            {images.map(img => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative group rounded-lg overflow-hidden border border-border bg-muted aspect-video"
              >
                <img src={img.url} alt={img.caption} className="w-full h-full object-cover" />
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
          <FiImage className="w-6 h-6" />
          <span>No images yet</span>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
