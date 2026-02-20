
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCommittee } from "@/hooks/useSupabaseData";
import { FiX, FiLoader } from "react-icons/fi";

const CommitteePage = () => {
  const { data: committee = [], isLoading } = useCommittee();
  const [selected, setSelected] = useState<string | null>(null);
  const member = committee.find((m: any) => m.id === selected) as any;

  return (
    <div className="page-container py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="section-title mb-2">Our <span className="text-gradient">Committee</span></h1>
        <p className="section-subtitle">The leaders behind JCSAM</p>
      </motion.div>

      {isLoading ? (
        <div className="flex justify-center py-12"><FiLoader className="w-6 h-6 animate-spin text-primary" /></div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
          {committee.map((m: any, i: number) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelected(m.id)}
              className="admin-card text-center cursor-pointer group"
            >
              {m.image ? (
                <img src={m.image} alt={m.name} className="w-24 h-24 rounded-full object-cover mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 border-4 border-primary/20" />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary mx-auto mb-4 flex items-center justify-center text-primary-foreground text-2xl font-bold group-hover:scale-110 transition-transform duration-300">
                  {m.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                </div>
              )}
              <h3 className="font-semibold text-foreground">{m.name}</h3>
              <p className="text-sm font-medium text-secondary">{m.designation}</p>
              <p className="text-xs text-muted-foreground mt-1">{m.role}</p>
              <p className="text-xs text-muted-foreground">{m.institution}</p>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {member && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 backdrop-blur-sm p-4" onClick={() => setSelected(null)}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
              className="bg-card rounded-xl shadow-2xl w-full max-w-sm p-8 text-center relative"
              onClick={e => e.stopPropagation()}
            >
              <button onClick={() => setSelected(null)} className="absolute top-4 right-4 p-2 rounded-lg hover:bg-muted"><FiX /></button>
              {member.image ? (
                <img src={member.image} alt={member.name} className="w-32 h-32 rounded-full object-cover mx-auto mb-6 border-4 border-primary/20" />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-secondary mx-auto mb-6 flex items-center justify-center text-primary-foreground text-4xl font-bold">
                  {member.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                </div>
              )}
              <h2 className="text-xl font-display font-bold text-foreground mb-1">{member.name}</h2>
              <p className="text-secondary font-semibold">{member.designation}</p>
              <p className="text-sm text-muted-foreground mt-2">{member.role}</p>
              <p className="text-sm text-muted-foreground">{member.institution}</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CommitteePage;
