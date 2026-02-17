import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useData } from "@/context/DataContext";
import { FiSearch, FiX, FiDownload } from "react-icons/fi";

const NoticesPage = () => {
  const { notices, sports } = useData();
  const [search, setSearch] = useState("");
  const [sportFilter, setSportFilter] = useState("all");
  const [selectedNotice, setSelectedNotice] = useState<string | null>(null);

  const filtered = notices.filter(n => {
    const matchSearch = n.title.toLowerCase().includes(search.toLowerCase()) || n.content.toLowerCase().includes(search.toLowerCase());
    const matchSport = sportFilter === "all" || (sportFilter === "general" ? !n.sportId : n.sportId === sportFilter);
    return matchSearch && matchSport;
  });

  const selected = notices.find(n => n.id === selectedNotice);

  return (
    <div className="page-container py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="section-title mb-2">Official <span className="text-gradient">Notices</span></h1>
        <p className="section-subtitle">Important announcements and updates</p>
      </motion.div>

      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search notices..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <select
          value={sportFilter}
          onChange={e => setSportFilter(e.target.value)}
          className="px-4 py-2.5 rounded-lg bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="all">All Categories</option>
          <option value="general">General</option>
          {sports.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {filtered.map((notice, i) => {
          const sport = sports.find(s => s.id === notice.sportId);
          return (
            <motion.div
              key={notice.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelectedNotice(notice.id)}
              className="notice-card cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className={notice.priority === "urgent" ? "priority-urgent" : notice.priority === "important" ? "priority-important" : "priority-normal"}>
                  {notice.priority}
                </span>
                {sport && <span className="text-xs text-secondary font-medium">{sport.icon} {sport.name}</span>}
                {!notice.sportId && <span className="text-xs text-muted-foreground">📢 General</span>}
              </div>
              <h3 className="font-semibold text-foreground mb-2">{notice.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">{notice.content}</p>
              <p className="text-xs text-muted-foreground mt-3">{notice.date}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 backdrop-blur-sm p-4" onClick={() => setSelectedNotice(null)}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-xl shadow-2xl w-full max-w-lg p-6"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <span className={selected.priority === "urgent" ? "priority-urgent" : selected.priority === "important" ? "priority-important" : "priority-normal"}>
                  {selected.priority}
                </span>
                <button onClick={() => setSelectedNotice(null)} className="p-2 rounded-lg hover:bg-muted"><FiX /></button>
              </div>
              <h2 className="text-xl font-display font-bold text-foreground mb-3">{selected.title}</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">{selected.content}</p>
              <p className="text-xs text-muted-foreground">{selected.date}</p>
              {selected.pdfUrl && (
                <button className="mt-4 btn-primary text-sm flex items-center gap-2">
                  <FiDownload /> Download PDF
                </button>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NoticesPage;
