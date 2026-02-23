
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useSports } from "@/hooks/useSupabaseData";
import { FiLoader } from "react-icons/fi";

const Sports = () => {
  const { data: sports = [], isLoading } = useSports();
  return (
    <div className="page-container py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="section-title mb-2">Our <span className="text-gradient">Sports</span></h1>
        <p className="section-subtitle">Competitive disciplines across Mumbai's junior colleges</p>
      </motion.div>
      {isLoading ? (
        <div className="flex justify-center py-12"><FiLoader className="w-6 h-6 animate-spin text-primary" /></div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
          {sports.map((sport: any, i: number) => (
            <motion.div
              key={sport.id}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -10, scale: 1.03 }}
            >
              <Link to={`/sports/${sport.slug}`} className="sport-card block p-6 group">
                <motion.span
                  className="text-5xl block mb-4"
                  whileHover={{ scale: 1.3, rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.4 }}
                >
                  {sport.icon}
                </motion.span>
                <h3 className="font-display font-bold text-lg text-foreground mb-2">{sport.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{sport.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sports;
