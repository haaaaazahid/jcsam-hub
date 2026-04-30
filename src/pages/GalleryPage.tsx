import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGallery, useSports } from "@/hooks/useSupabaseData";
import { FiX, FiChevronLeft, FiChevronRight, FiLoader, FiArrowLeft } from "react-icons/fi";

const GalleryPage = () => {
  const { data: gallery = [], isLoading } = useGallery();
  const { data: sports = [] } = useSports();
  const [selectedSport, setSelectedSport] = useState<string | null>(null);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  // Group images by sport — show ALL sports including empty ones
  const sportGroups = sports.map((sport: any) => ({
    ...sport,
    images: gallery.filter((img: any) => img.sport_id === sport.id),
  }));

  const currentImages = selectedSport
    ? gallery.filter((img: any) => img.sport_id === selectedSport)
    : [];

  const selectedSportData = sports.find((s: any) => s.id === selectedSport) as any;

  return (
    <div className="page-container py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="section-title mb-2">Photo <span className="text-gradient">Gallery</span></h1>
        <p className="section-subtitle">Moments from our sporting events</p>
      </motion.div>

      {isLoading ? (
        <div className="flex justify-center py-12"><FiLoader className="w-6 h-6 animate-spin text-primary" /></div>
      ) : selectedSport ? (
        /* Sport-specific gallery view */
        <div>
          <button
            onClick={() => { setSelectedSport(null); setLightboxIdx(null); }}
            className="flex items-center gap-2 text-sm text-primary hover:underline mb-6"
          >
            <FiArrowLeft /> Back to All Sports
          </button>
          <h2 className="text-2xl font-display font-bold text-foreground mb-6">
            {selectedSportData?.icon} {selectedSportData?.name} Gallery
            <span className="text-sm font-normal text-muted-foreground ml-2">({currentImages.length} photos)</span>
          </h2>
          {currentImages.length > 0 ? (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
              {currentImages.map((img: any, i: number) => (
                <motion.div
                  key={img.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04, duration: 0.4 }}
                  whileHover={{ scale: 1.03 }}
                  className="break-inside-avoid mb-4 cursor-pointer group"
                  onClick={() => setLightboxIdx(i)}
                >
                  <div className="relative rounded-xl overflow-hidden">
                    <img src={img.url} alt={img.caption} className="w-full rounded-xl group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <p className="text-white text-sm font-medium">{img.caption}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
              <span className="text-8xl mb-4">{selectedSportData?.icon}</span>
              <p className="text-lg font-medium">No photos yet</p>
              <p className="text-sm">Photos will appear here once uploaded by the admin.</p>
            </div>
          )}
        </div>
      ) : (
        /* Sport folders view */
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {sportGroups.map((sport: any, i: number) => (
            <motion.div
              key={sport.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.03 }}
              onClick={() => setSelectedSport(sport.id)}
              className="cursor-pointer group"
            >
              <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-muted">
                {sport.images.length > 0 ? (
                  <div className="grid grid-cols-2 grid-rows-2 w-full h-full">
                    {sport.images.slice(0, 4).map((img: any) => (
                      <img
                        key={img.id}
                        src={img.url}
                        alt={img.caption}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ))}
                    {sport.images.length < 4 && Array.from({ length: 4 - Math.min(sport.images.length, 4) }).map((_, j) => (
                      <div key={`placeholder-${j}`} className="bg-muted" />
                    ))}
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-muted">
                    <span className="text-6xl">{sport.icon}</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent flex items-end p-4 group-hover:from-primary/80 transition-all duration-500">
                  <div>
                    <p className="text-white text-lg font-bold">{sport.icon} {sport.name}</p>
                    <p className="text-white/70 text-sm">{sport.images.length} {sport.images.length === 1 ? "photo" : "photos"}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          {sportGroups.length === 0 && (
            <p className="col-span-full text-center text-muted-foreground py-12">No sports found.</p>
          )}
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && currentImages.length > 0 && (
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
              src={currentImages[lightboxIdx]?.url}
              alt={currentImages[lightboxIdx]?.caption}
              className="max-h-[80vh] max-w-[90vw] rounded-xl object-contain"
              onClick={e => e.stopPropagation()}
            />
            <button
              onClick={e => { e.stopPropagation(); setLightboxIdx(Math.min(currentImages.length - 1, lightboxIdx + 1)); }}
              className="absolute right-4 p-2 text-white hover:bg-white/10 rounded-lg"
            >
              <FiChevronRight className="w-8 h-8" />
            </button>
            <p className="absolute bottom-6 text-white text-center text-sm font-medium">{currentImages[lightboxIdx]?.caption}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryPage;
