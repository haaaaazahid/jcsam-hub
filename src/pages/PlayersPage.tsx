import { motion } from "framer-motion";
import { usePlayers, useColleges, useSports } from "@/hooks/useSupabaseData";
import { FiUsers, FiLoader, FiSearch } from "react-icons/fi";
import { useState } from "react";

const PlayersPage = () => {
  const { data: allPlayers = [], isLoading } = usePlayers();
  const { data: colleges = [] } = useColleges();
  const { data: sports = [] } = useSports();
  const [search, setSearch] = useState("");
  const [selectedSport, setSelectedSport] = useState("");

  // Only show approved players on the public page
  const approvedPlayers = allPlayers.filter((p: any) => p.status === "approved");

  const filtered = approvedPlayers.filter((p: any) => {
    const collegeName = (p as any).colleges?.name || colleges.find((c: any) => c.id === p.college_id)?.name || "";
    const sportName = (p as any).sports?.name || sports.find((s: any) => s.id === p.sport_id)?.name || "";
    const matchesSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      collegeName.toLowerCase().includes(search.toLowerCase());
    const matchesSport = !selectedSport || p.sport_id === selectedSport;
    return matchesSearch && matchesSport;
  });

  return (
    <div className="page-container py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-2">
          <FiUsers className="text-primary w-8 h-8" />
          <h1 className="section-title mb-0">
            <span className="text-gradient">Registered Players</span>
          </h1>
        </div>
        <p className="section-subtitle mb-8">
          Approved participants for JCSAM events
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-3 mb-8"
      >
        <div className="relative flex-1 max-w-sm">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input
            type="text"
            placeholder="Search by name or college…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <select
          value={selectedSport}
          onChange={(e) => setSelectedSport(e.target.value)}
          className="px-3 py-2 rounded-lg bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">All Sports</option>
          {sports.map((s: any) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
      </motion.div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <FiLoader className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : filtered.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20 text-muted-foreground"
        >
          <FiUsers className="w-12 h-12 mx-auto mb-4 opacity-20" />
          <p className="text-lg font-medium">No approved players found</p>
          <p className="text-sm mt-1">
            {approvedPlayers.length === 0
              ? "No players have been approved yet."
              : "Try adjusting your filters."}
          </p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="overflow-x-auto admin-card"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-lg">
              {filtered.length} Player{filtered.length !== 1 ? "s" : ""}
            </h2>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-4 py-3 text-muted-foreground font-medium">#</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-medium">Name</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-medium">College</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-medium">Sport</th>
                <th className="text-left px-4 py-3 text-muted-foreground font-medium">Age</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p: any, index: number) => {
                const collegeName =
                  (p as any).colleges?.name ||
                  colleges.find((c: any) => c.id === p.college_id)?.name ||
                  "—";
                const sportName =
                  (p as any).sports?.name ||
                  sports.find((s: any) => s.id === p.sport_id)?.name ||
                  "—";
                return (
                  <motion.tr
                    key={p.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-4 py-3 text-muted-foreground">{index + 1}</td>
                    <td className="px-4 py-3 font-semibold">{p.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{collegeName}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium">
                        {sportName}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{p.age}</td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  );
};

export default PlayersPage;
