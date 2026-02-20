
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGallery } from "@/hooks/useSupabaseData";
import { FiX, FiChevronLeft, FiChevronRight, FiLoader } from "react-icons/fi";

const GalleryPage = () => {
  const { data: gallery = [], isLoading } = useGallery();
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  return (
    <div className="page-container py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="section-title mb-2">Photo <span className="text-gradient">Gallery</span></h1>
        <p className="section-subtitle">Moments from our sporting events</p>
      </motion.div>

      {isLoading ? (
        <div className="flex justify-center py-12"><FiLoader className="w-6 h-6 animate-spin text-primary" /></div>
      ) : (
        <div className="columns-2 md:columns-3 gap-4 mt-8">
          {gallery.map((img: any, i: number) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="break-inside-avoid mb-4 cursor-pointer group"
              onClick={() => setLightboxIdx(i)}
            >
              <div className="relative rounded-xl overflow-hidden">
                <img src={img.url} alt={img.caption} className="w-full rounded-xl group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-primary-foreground text-sm font-medium">{img.caption}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-4"
            onClick={() => setLightboxIdx(null)}
          >
            <button onClick={() => setLightboxIdx(null)} className="absolute top-4 right-4 p-2 text-primary-foreground hover:bg-primary-foreground/10 rounded-lg z-10">
              <FiX className="w-6 h-6" />
            </button>
            <button
              onClick={e => { e.stopPropagation(); setLightboxIdx(Math.max(0, lightboxIdx - 1)); }}
              className="absolute left-4 p-2 text-primary-foreground hover:bg-primary-foreground/10 rounded-lg"
            >
              <FiChevronLeft className="w-8 h-8" />
            </button>
            <motion.img
              key={lightboxIdx}
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              src={(gallery[lightboxIdx] as any)?.url}
              alt={(gallery[lightboxIdx] as any)?.caption}
              className="max-h-[80vh] max-w-[90vw] rounded-xl object-contain"
              onClick={e => e.stopPropagation()}
            />
            <button
              onClick={e => { e.stopPropagation(); setLightboxIdx(Math.min(gallery.length - 1, lightboxIdx + 1)); }}
              className="absolute right-4 p-2 text-primary-foreground hover:bg-primary-foreground/10 rounded-lg"
            >
              <FiChevronRight className="w-8 h-8" />
            </button>
            <p className="absolute bottom-6 text-primary-foreground text-center text-sm font-medium">{(gallery[lightboxIdx] as any)?.caption}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryPage;
