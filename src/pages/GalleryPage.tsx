
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGallery, useSports } from "@/hooks/useSupabaseData";
import { FiX, FiChevronLeft, FiChevronRight, FiLoader } from "react-icons/fi";

const GalleryPage = () => {
  const { data: gallery = [], isLoading } = useGallery();
  const { data: sports = [] } = useSports();
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [sportFilter, setSportFilter] = useState("all");

  const filtered = sportFilter === "all"
    ? gallery
    : gallery.filter((img: any) => img.sport_id === sportFilter);

  return (
    <div className="page-container py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="section-title mb-2">Photo <span className="text-gradient">Gallery</span></h1>
        <p className="section-subtitle">Moments from our sporting events</p>
      </motion.div>

      {/* Sport Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setSportFilter("all")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            sportFilter === "all" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-accent"
          }`}
        >
          All
        </button>
        {sports.map((sport: any) => (
          <button
            key={sport.id}
            onClick={() => setSportFilter(sport.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              sportFilter === sport.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-accent"
            }`}
          >
            {sport.icon} {sport.name}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12"><FiLoader className="w-6 h-6 animate-spin text-primary" /></div>
      ) : (
        <div className="columns-2 md:columns-3 gap-4">
          {filtered.map((img: any, i: number) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              whileHover={{ scale: 1.03 }}
              className="break-inside-avoid mb-4 cursor-pointer group"
              onClick={() => setLightboxIdx(filtered.indexOf(img))}
            >
              <div className="relative rounded-xl overflow-hidden">
                <img src={img.url} alt={img.caption} className="w-full rounded-xl group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div>
                    <p className="text-white text-sm font-medium">{img.caption}</p>
                    {img.sports?.name && <p className="text-white/70 text-xs">{img.sports.name}</p>}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          {filtered.length === 0 && <p className="text-center text-muted-foreground py-12 col-span-3">No photos found.</p>}
        </div>
      )}

      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightboxIdx(null)}
          >
            <button onClick={() => setLightboxIdx(null)} className="absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-lg z-10">
              <FiX className="w-6 h-6" />
            </button>
            <button
              onClick={e => { e.stopPropagation(); setLightboxIdx(Math.max(0, lightboxIdx - 1)); }}
              className="absolute left-4 p-2 text-white hover:bg-white/10 rounded-lg"
            >
              <FiChevronLeft className="w-8 h-8" />
            </button>
            <motion.img
              key={lightboxIdx}
              initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              src={filtered[lightboxIdx]?.url}
              alt={filtered[lightboxIdx]?.caption}
              className="max-h-[80vh] max-w-[90vw] rounded-xl object-contain"
              onClick={e => e.stopPropagation()}
            />
            <button
              onClick={e => { e.stopPropagation(); setLightboxIdx(Math.min(filtered.length - 1, lightboxIdx + 1)); }}
              className="absolute right-4 p-2 text-white hover:bg-white/10 rounded-lg"
            >
              <FiChevronRight className="w-8 h-8" />
            </button>
            <p className="absolute bottom-6 text-white text-center text-sm font-medium">{filtered[lightboxIdx]?.caption}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryPage;
