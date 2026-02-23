
import { motion } from "framer-motion";
import { useResults, useSchedules, useSports } from "@/hooks/useSupabaseData";
import { FiAward, FiLoader } from "react-icons/fi";

const ResultsPage = () => {
  const { data: results = [], isLoading } = useResults();
  const { data: schedules = [] } = useSchedules();
  const { data: sports = [] } = useSports();

  return (
    <div className="page-container py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="section-title mb-2">Match <span className="text-gradient">Results</span></h1>
        <p className="section-subtitle">Recent match outcomes and results</p>
      </motion.div>

      {isLoading ? (
        <div className="flex justify-center py-12"><FiLoader className="w-6 h-6 animate-spin text-primary" /></div>
      ) : (
        <div className="space-y-4 mt-8">
          {results.map((result: any, i: number) => {
            const schedule = (result.schedules as any) || schedules.find((s: any) => s.id === result.schedule_id);
            const sport = (result.sports as any) || sports.find((s: any) => s.id === result.sport_id);
            return (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.01 }}
                className="admin-card"
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    className="p-3 rounded-xl bg-secondary/10 text-secondary"
                  >
                    <FiAward className="w-6 h-6" />
                  </motion.div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl">{sport?.icon}</span>
                      <span className="text-xs font-semibold text-secondary uppercase">{sport?.name}</span>
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">{schedule?.title || "Match"}</h3>
                    <div className="bg-muted/50 rounded-lg p-3">
                      <p className="text-sm font-semibold text-primary">🏆 Winner: {result.winner}</p>
                      <p className="text-sm text-muted-foreground">Score: {result.score}</p>
                      {result.summary && <p className="text-sm text-muted-foreground mt-1">{result.summary}</p>}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">{result.date}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
          {results.length === 0 && <p className="text-center text-muted-foreground py-12">No results published yet.</p>}
        </div>
      )}
    </div>
  );
};

export default ResultsPage;
