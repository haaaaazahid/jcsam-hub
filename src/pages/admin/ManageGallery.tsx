
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGallery, useCreateGalleryItem, useDeleteGalleryItem, useSports } from "@/hooks/useSupabaseData";
import { supabase } from "@/integrations/supabase/client";
import { FiUpload, FiTrash2, FiLoader, FiImage, FiArrowLeft, FiCheckSquare, FiSquare } from "react-icons/fi";
import { toast } from "sonner";

const ManageGallery = () => {
  const { data: gallery = [], isLoading } = useGallery();
  const { data: sports = [] } = useSports();
  const createItem = useCreateGalleryItem();
  const deleteItem = useDeleteGalleryItem();

  const [selectedSport, setSelectedSport] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [deleting, setDeleting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Group images by sport
  const sportGroups = sports.map((sport: any) => ({
    ...sport,
    images: gallery.filter((img: any) => img.sport_id === sport.id),
  }));

  const currentImages = selectedSport
    ? gallery.filter((img: any) => img.sport_id === selectedSport)
    : [];

  const selectedSportData = sports.find((s: any) => s.id === selectedSport) as any;

  const handleMultiUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !selectedSport) return;

    setUploading(true);
    let successCount = 0;

    for (const file of Array.from(files)) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error(`${file.name} is too large (max 10MB)`);
        continue;
      }
      try {
        const ext = file.name.split(".").pop();
        const path = `${selectedSport}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const { error } = await supabase.storage.from("gallery-images").upload(path, file, { upsert: false });
        if (error) throw error;
        const { data } = supabase.storage.from("gallery-images").getPublicUrl(path);
        
        await createItem.mutateAsync({
          url: data.publicUrl,
          sport_id: selectedSport,
          caption: file.name.replace(/\.[^.]+$/, ""),
          date: new Date().toISOString().split("T")[0],
        });
        successCount++;
      } catch (err: any) {
        toast.error(`Failed: ${file.name}`);
      }
    }

    if (successCount > 0) toast.success(`${successCount} image(s) uploaded!`);
    setUploading(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const selectAll = () => {
    if (selectedIds.size === currentImages.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(currentImages.map((img: any) => img.id)));
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.size === 0) return;
    setDeleting(true);
    for (const id of selectedIds) {
      try {
        await deleteItem.mutateAsync(id);
      } catch {}
    }
    setSelectedIds(new Set());
    setDeleting(false);
    toast.success(`${selectedIds.size} image(s) deleted!`);
  };

  return (
    <div>
      <h1 className="text-2xl font-display font-bold text-foreground mb-6">Manage Gallery</h1>

      {selectedSport ? (
        /* Sport gallery view */
        <div>
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <button
              onClick={() => { setSelectedSport(null); setSelectedIds(new Set()); }}
              className="flex items-center gap-2 text-sm text-primary hover:underline"
            >
              <FiArrowLeft /> Back to Sports
            </button>
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold text-foreground">
                {selectedSportData?.icon} {selectedSportData?.name}
                <span className="text-sm font-normal text-muted-foreground ml-2">({currentImages.length} photos)</span>
              </h2>
            </div>
          </div>

          {/* Upload + Actions Bar */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <button
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="btn-primary flex items-center gap-2 text-sm"
            >
              {uploading ? <FiLoader className="animate-spin" /> : <FiUpload />}
              {uploading ? "Uploading..." : "Upload Images"}
            </button>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleMultiUpload}
            />

            {currentImages.length > 0 && (
              <>
                <button
                  onClick={selectAll}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border text-sm hover:bg-muted transition-colors"
                >
                  {selectedIds.size === currentImages.length ? <FiCheckSquare /> : <FiSquare />}
                  {selectedIds.size === currentImages.length ? "Deselect All" : "Select All"}
                </button>
                {selectedIds.size > 0 && (
                  <button
                    onClick={handleBulkDelete}
                    disabled={deleting}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-destructive text-destructive-foreground text-sm hover:bg-destructive/90 transition-colors"
                  >
                    {deleting ? <FiLoader className="animate-spin" /> : <FiTrash2 />}
                    Delete {selectedIds.size} Selected
                  </button>
                )}
              </>
            )}
          </div>

          {/* Images Grid */}
          {currentImages.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              <AnimatePresence>
                {currentImages.map((img: any) => (
                  <motion.div
                    key={img.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className={`relative group rounded-xl overflow-hidden border-2 aspect-square cursor-pointer transition-all ${
                      selectedIds.has(img.id) ? "border-primary ring-2 ring-primary/30" : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => toggleSelect(img.id)}
                  >
                    <img src={img.url} alt={img.caption} className="w-full h-full object-cover" loading="lazy" />
                    <div className="absolute top-2 left-2">
                      <div className={`w-6 h-6 rounded-md flex items-center justify-center transition-all ${
                        selectedIds.has(img.id) ? "bg-primary text-primary-foreground" : "bg-foreground/30 text-white opacity-0 group-hover:opacity-100"
                      }`}>
                        {selectedIds.has(img.id) ? <FiCheckSquare className="w-4 h-4" /> : <FiSquare className="w-4 h-4" />}
                      </div>
                    </div>
                    {img.caption && (
                      <div className="absolute bottom-0 inset-x-0 bg-foreground/60 text-white text-xs px-2 py-1 truncate">
                        {img.caption}
                      </div>
                    )}
                    <button
                      onClick={(e) => { e.stopPropagation(); deleteItem.mutate(img.id); }}
                      className="absolute top-2 right-2 p-1.5 rounded-lg bg-destructive text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <FiTrash2 className="w-3.5 h-3.5" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 rounded-xl border-2 border-dashed border-border text-muted-foreground gap-3">
              <FiImage className="w-12 h-12" />
              <p className="text-lg font-medium">No images yet</p>
              <p className="text-sm">Click "Upload Images" to add photos for this sport</p>
            </div>
          )}
        </div>
      ) : (
        /* Sport folders view */
        <div>
          <p className="text-muted-foreground mb-6">Select a sport to manage its gallery images.</p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {sportGroups.map((sport: any, i: number) => (
              <motion.div
                key={sport.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                whileHover={{ y: -4, scale: 1.02 }}
                onClick={() => setSelectedSport(sport.id)}
                className="admin-card cursor-pointer group text-center"
              >
                <div className="text-4xl mb-3">{sport.icon}</div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{sport.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {sport.images.length} {sport.images.length === 1 ? "photo" : "photos"}
                </p>
                {sport.images.length > 0 && (
                  <div className="flex justify-center gap-1 mt-3">
                    {sport.images.slice(0, 3).map((img: any) => (
                      <img key={img.id} src={img.url} alt="" className="w-8 h-8 rounded object-cover" />
                    ))}
                    {sport.images.length > 3 && (
                      <div className="w-8 h-8 rounded bg-muted flex items-center justify-center text-xs text-muted-foreground">
                        +{sport.images.length - 3}
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageGallery;
