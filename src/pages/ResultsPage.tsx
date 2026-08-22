import { motion } from "framer-motion";
import { useResults } from "@/hooks/useAppData";
import { FiAward, FiLoader } from "react-icons/fi";

const medalColor = (medal: string) => {
  const m = (medal || "").toLowerCase();
  if (m.includes("gold")) return "bg-amber-500/10 text-amber-600 border-amber-500/30";
  if (m.includes("silver")) return "bg-slate-400/10 text-slate-500 border-slate-400/30";
  if (m.includes("bronze")) return "bg-orange-700/10 text-orange-700 border-orange-700/30";
  return "bg-primary/10 text-primary border-primary/30";
};

const ResultsPage = () => {
  const { data: results = [], isLoading } = useResults();

  return (
    <div className="page-container py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="section-title mb-2">Match <span className="text-gradient">Results</span></h1>
        <p className="section-subtitle">Medal winners and event results</p>
      </motion.div>

      {isLoading ? (
        <div className="flex justify-center py-12"><FiLoader className="w-6 h-6 animate-spin text-primary" /></div>
      ) : (
        <div className="space-y-4 mt-8">
          {results.map((result: any, i: number) => (
            <motion.div
              key={result.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ scale: 1.01 }}
              className="admin-card"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl border ${medalColor(result.medal)}`}>
                  <FiAward className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-secondary uppercase">{result.eventName}</span>
                    {result.medal && (
                      <span className={`px-2 py-0.5 rounded text-xs font-bold border ${medalColor(result.medal)}`}>
                        {result.medal}
                      </span>
                    )}
                    {result.position && (
                      <span className="text-xs text-muted-foreground">Position: {result.position}</span>
                    )}
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{result.studentName}</h3>
                  <p className="text-sm text-muted-foreground">{result.collegeName}</p>
                  {result.score && <p className="text-sm text-muted-foreground mt-1">Score: {result.score}</p>}
                </div>
              </div>
            </motion.div>
          ))}
          {results.length === 0 && <p className="text-center text-muted-foreground py-12">No results published yet.</p>}
        </div>
      )}
    </div>
  );
};

export default ResultsPage;
