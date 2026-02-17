import { motion } from "framer-motion";
import { useData } from "@/context/DataContext";
import { FiAward } from "react-icons/fi";

const ResultsPage = () => {
  const { results, schedules, sports } = useData();

  return (
    <div className="page-container py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="section-title mb-2">Match <span className="text-gradient">Results</span></h1>
        <p className="section-subtitle">Recent match outcomes and results</p>
      </motion.div>

      <div className="space-y-4 mt-8">
        {results.map((result, i) => {
          const schedule = schedules.find(s => s.id === result.scheduleId);
          const sport = sports.find(s => s.id === result.sportId);
          return (
            <motion.div
              key={result.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="admin-card"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-secondary/10 text-secondary">
                  <FiAward className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">{sport?.icon}</span>
                    <span className="text-xs font-semibold text-secondary uppercase">{sport?.name}</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{schedule?.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{schedule?.team1} vs {schedule?.team2}</p>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-sm font-semibold text-primary">🏆 Winner: {result.winner}</p>
                    <p className="text-sm text-muted-foreground">Score: {result.score}</p>
                    <p className="text-sm text-muted-foreground mt-1">{result.summary}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{result.date}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ResultsPage;
