
import { useState } from "react";
import { motion } from "framer-motion";
import { useSchedules, useSports } from "@/hooks/useSupabaseData";
import { FiCalendar, FiMapPin, FiLoader } from "react-icons/fi";

const SchedulePage = () => {
  const { data: schedules = [], isLoading } = useSchedules();
  const { data: sports = [] } = useSports();
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? schedules : schedules.filter((s: any) => s.status === filter);

  return (
    <div className="page-container py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="section-title mb-2">Match <span className="text-gradient">Schedule</span></h1>
        <p className="section-subtitle">Stay updated with all upcoming and past matches</p>
      </motion.div>

      <div className="flex gap-2 mb-8 flex-wrap">
        {["all", "upcoming", "completed", "cancelled"].map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12"><FiLoader className="w-6 h-6 animate-spin text-primary" /></div>
      ) : (
        <div className="space-y-4">
          {filtered.map((match: any, i: number) => {
            const sport = (match.sports as any) || sports.find((s: any) => s.id === match.sport_id);
            return (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="admin-card flex flex-col sm:flex-row sm:items-center gap-4"
              >
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-3xl">{sport?.icon}</span>
                  <div>
                    <span className="text-xs font-semibold text-secondary uppercase">{sport?.name}</span>
                    <h3 className="font-semibold text-foreground">{match.title}</h3>
                  </div>
                </div>
                <div className="flex-1 text-sm text-muted-foreground">
                  <p>{match.team1}{match.team2 && ` vs ${match.team2}`}</p>
                  <p className="flex items-center gap-1 mt-1"><FiMapPin className="w-3 h-3" /> {match.venue}</p>
                </div>
                <div className="text-sm text-right">
                  <p className="flex items-center gap-1 text-muted-foreground"><FiCalendar /> {match.date}</p>
                  <p className="text-muted-foreground">⏰ {match.time}</p>
                  <span className={`inline-block mt-1 px-2 py-0.5 rounded text-xs font-bold uppercase ${
                    match.status === "upcoming" ? "bg-primary/10 text-primary" :
                    match.status === "completed" ? "bg-success/10 text-success" :
                    "bg-destructive/10 text-destructive"
                  }`}>{match.status}</span>
                </div>
              </motion.div>
            );
          })}
          {filtered.length === 0 && <p className="text-center text-muted-foreground py-12">No matches found.</p>}
        </div>
      )}
    </div>
  );
};

export default SchedulePage;
