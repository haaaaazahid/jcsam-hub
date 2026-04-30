import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePlayers, useColleges, useUpdatePlayer, useUpdateCollege, useDeletePlayer, useDeleteCollege } from "@/hooks/useSupabaseData";
import { FiCheck, FiX, FiClock, FiAlertCircle, FiLoader, FiTrash2 } from "react-icons/fi";
import { toast } from "sonner";

const Registrations = () => {
  const { data: players = [], isLoading: playersLoading } = usePlayers();
  const { data: colleges = [], isLoading: collegesLoading } = useColleges();

  const updatePlayer = useUpdatePlayer();
  const deletePlayer = useDeletePlayer();
  const updateCollege = useUpdateCollege();
  const deleteCollege = useDeleteCollege();

  const [tab, setTab] = useState<"players" | "colleges">("players");

  const isLoading = playersLoading || collegesLoading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <FiLoader className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const pendingPlayers = players.filter((p: any) => p.status === "pending");
  const rejectedPlayers = players.filter((p: any) => p.status === "rejected");
  const pendingColleges = colleges.filter((c: any) => c.status === "pending");
  const rejectedColleges = colleges.filter((c: any) => c.status === "rejected");

  // Only send plain fields to avoid Supabase errors from joined data
  const cleanPlayer = (player: any, status: string) => ({
    id: player.id,
    name: player.name,
    age: player.age,
    contact: player.contact,
    college_id: player.college_id,
    sport_id: player.sport_id,
    status,
  });

  const cleanCollege = (college: any, status: string) => ({
    id: college.id,
    name: college.name,
    address: college.address,
    contact_person: college.contact_person,
    email: college.email,
    phone: college.phone,
    status,
  });

  const handleApprovePlayer = (player: any) => {
    updatePlayer.mutate(cleanPlayer(player, "approved"), {
      onSuccess: () => toast.success(`✅ Approved ${player.name} — now visible in Players page`)
    });
  };

  const handleRejectPlayer = (player: any) => {
    updatePlayer.mutate(cleanPlayer(player, "rejected"), {
      onSuccess: () => toast.success(`Rejected ${player.name}`)
    });
  };

  const handleDeletePlayer = (id: string, name: string) => {
    if (confirm(`Are you sure you want to permanently delete ${name}?`)) {
      deletePlayer.mutate(id, {
        onSuccess: () => toast.success(`Deleted ${name}`)
      });
    }
  };

  const handleApproveCollege = (college: any) => {
    updateCollege.mutate(cleanCollege(college, "active"), {
      onSuccess: () => toast.success(`✅ Approved ${college.name}`)
    });
  };

  const handleRejectCollege = (college: any) => {
    updateCollege.mutate(cleanCollege(college, "rejected"), {
      onSuccess: () => toast.success(`Rejected ${college.name}`)
    });
  };

  const handleDeleteCollege = (id: string, name: string) => {
    if (confirm(`Are you sure you want to permanently delete ${name}?`)) {
      deleteCollege.mutate(id, {
        onSuccess: () => toast.success(`Deleted ${name}`)
      });
    }
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-between items-center bg-card p-6 rounded-2xl border border-border shadow-sm">
        <div>
          <h2 className="text-2xl font-display font-bold">Registrations</h2>
          <p className="text-sm text-muted-foreground mt-1">Review and approve pending registrations</p>
        </div>
      </motion.div>

      <div className="flex bg-card p-1 rounded-lg border border-border w-fit">
        <button
          onClick={() => setTab("players")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${tab === "players" ? "bg-primary text-primary-foreground shadow-sm" : "hover:bg-muted text-muted-foreground"
            }`}
        >
          Players
          {pendingPlayers.length > 0 && <span className="ml-2 px-1.5 py-0.5 rounded-full bg-destructive text-destructive-foreground text-[10px]">{pendingPlayers.length}</span>}
        </button>
        <button
          onClick={() => setTab("colleges")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${tab === "colleges" ? "bg-primary text-primary-foreground shadow-sm" : "hover:bg-muted text-muted-foreground"
            }`}
        >
          Colleges
          {pendingColleges.length > 0 && <span className="ml-2 px-1.5 py-0.5 rounded-full bg-destructive text-destructive-foreground text-[10px]">{pendingColleges.length}</span>}
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {tab === "players" ? (
            <div className="space-y-6">
              <div className="admin-card">
                <div className="flex items-center gap-2 mb-4">
                  <FiClock className="text-primary w-5 h-5" />
                  <h3 className="font-display font-bold text-lg">Pending Review ({pendingPlayers.length})</h3>
                </div>
                {pendingPlayers.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left px-4 py-2 text-muted-foreground">Name</th>
                          <th className="text-left px-4 py-2 text-muted-foreground">Phone</th>
                          <th className="text-left px-4 py-2 text-muted-foreground">Age</th>
                          <th className="text-left px-4 py-2 text-muted-foreground">College</th>
                          <th className="text-left px-4 py-2 text-muted-foreground">Sport</th>
                          <th className="text-right px-4 py-2 text-muted-foreground">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pendingPlayers.map((p: any) => (
                          <tr key={p.id} className="border-b border-border/50 hover:bg-muted/30">
                            <td className="px-4 py-3 font-medium">{p.name}</td>
                            <td className="px-4 py-3 text-muted-foreground">{p.contact}</td>
                            <td className="px-4 py-3 text-muted-foreground">{p.age}</td>
                            <td className="px-4 py-3">
                              <span className="px-2 py-1 rounded-md bg-muted text-xs">{p.colleges?.name || "Unknown"}</span>
                            </td>
                            <td className="px-4 py-3">
                              <span className="px-2 py-1 rounded-md bg-primary/10 text-primary text-xs">{p.sports?.name || "Unknown"}</span>
                            </td>
                            <td className="px-4 py-3 text-right">
                              <div className="flex justify-end gap-2">
                                <button
                                  onClick={() => handleApprovePlayer(p)}
                                  disabled={updatePlayer.isPending}
                                  className="p-1.5 rounded-md bg-success/10 text-success hover:bg-success/20 transition-colors disabled:opacity-50"
                                  title="Approve"
                                >
                                  <FiCheck className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleRejectPlayer(p)}
                                  disabled={updatePlayer.isPending}
                                  className="p-1.5 rounded-md bg-warning/10 text-warning hover:bg-warning/20 transition-colors disabled:opacity-50"
                                  title="Reject"
                                >
                                  <FiX className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="py-8 text-center text-muted-foreground flex flex-col items-center">
                    <FiCheck className="w-8 h-8 opacity-20 mb-2 text-success" />
                    <p>All players have been reviewed.</p>
                  </div>
                )}
              </div>

              {rejectedPlayers.length > 0 && (
                <div className="admin-card border-destructive/20">
                  <div className="flex items-center gap-2 mb-4">
                    <FiAlertCircle className="text-destructive w-5 h-5" />
                    <h3 className="font-display font-bold text-lg">Rejected Registrations</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left px-4 py-2 text-muted-foreground">Name</th>
                          <th className="text-left px-4 py-2 text-muted-foreground">College</th>
                          <th className="text-left px-4 py-2 text-muted-foreground">Sport</th>
                          <th className="text-right px-4 py-2 text-muted-foreground">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rejectedPlayers.map((p: any) => (
                          <tr key={p.id} className="border-b border-border/50">
                            <td className="px-4 py-3 font-medium">{p.name}</td>
                            <td className="px-4 py-3 text-muted-foreground">
                              <span className="px-2 py-1 rounded-md bg-muted text-xs">{p.colleges?.name || "Unknown"}</span>
                            </td>
                            <td className="px-4 py-3">
                              <span className="px-2 py-1 rounded-md bg-primary/10 text-primary text-xs">{p.sports?.name || "Unknown"}</span>
                            </td>
                            <td className="px-4 py-3 text-right">
                              <div className="flex justify-end gap-2">
                                <button onClick={() => handleApprovePlayer(p)} className="text-xs text-primary hover:underline px-2" title="Restore to approved">Restore</button>
                                <button onClick={() => handleDeletePlayer(p.id, p.name)} className="p-1.5 rounded-md text-destructive hover:bg-destructive/10 transition-colors" title="Delete Permanently">
                                  <FiTrash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="admin-card">
                <div className="flex items-center gap-2 mb-4">
                  <FiClock className="text-primary w-5 h-5" />
                  <h3 className="font-display font-bold text-lg">Pending Review ({pendingColleges.length})</h3>
                </div>
                {pendingColleges.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left px-4 py-2 text-muted-foreground">College Name</th>
                          <th className="text-left px-4 py-2 text-muted-foreground">Email</th>
                          <th className="text-left px-4 py-2 text-muted-foreground">Phone</th>
                          <th className="text-left px-4 py-2 text-muted-foreground">Contact Person</th>
                          <th className="text-right px-4 py-2 text-muted-foreground">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pendingColleges.map((c: any) => (
                          <tr key={c.id} className="border-b border-border/50 hover:bg-muted/30">
                            <td className="px-4 py-3 font-medium">{c.name}</td>
                            <td className="px-4 py-3 text-muted-foreground">{c.email}</td>
                            <td className="px-4 py-3 text-muted-foreground">{c.phone}</td>
                            <td className="px-4 py-3 text-muted-foreground">{c.contact_person}</td>
                            <td className="px-4 py-3 text-right">
                              <div className="flex justify-end gap-2">
                                <button
                                  onClick={() => handleApproveCollege(c)}
                                  disabled={updateCollege.isPending}
                                  className="p-1.5 rounded-md bg-success/10 text-success hover:bg-success/20 transition-colors disabled:opacity-50"
                                  title="Approve"
                                >
                                  <FiCheck className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleRejectCollege(c)}
                                  disabled={updateCollege.isPending}
                                  className="p-1.5 rounded-md bg-warning/10 text-warning hover:bg-warning/20 transition-colors disabled:opacity-50"
                                  title="Reject"
                                >
                                  <FiX className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="py-8 text-center text-muted-foreground flex flex-col items-center">
                    <FiCheck className="w-8 h-8 opacity-20 mb-2 text-success" />
                    <p>All colleges have been reviewed.</p>
                  </div>
                )}
              </div>

              {rejectedColleges.length > 0 && (
                <div className="admin-card border-destructive/20">
                  <div className="flex items-center gap-2 mb-4">
                    <FiAlertCircle className="text-destructive w-5 h-5" />
                    <h3 className="font-display font-bold text-lg">Rejected Registrations</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left px-4 py-2 text-muted-foreground">College Name</th>
                          <th className="text-left px-4 py-2 text-muted-foreground">Email</th>
                          <th className="text-right px-4 py-2 text-muted-foreground">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rejectedColleges.map((c: any) => (
                          <tr key={c.id} className="border-b border-border/50">
                            <td className="px-4 py-3 font-medium">{c.name}</td>
                            <td className="px-4 py-3 text-muted-foreground">{c.email}</td>
                            <td className="px-4 py-3 text-right">
                              <div className="flex justify-end gap-2">
                                <button onClick={() => handleApproveCollege(c)} className="text-xs text-primary hover:underline px-2" title="Restore back to Active">Restore</button>
                                <button onClick={() => handleDeleteCollege(c.id, c.name)} className="p-1.5 rounded-md text-destructive hover:bg-destructive/10 transition-colors" title="Delete Permanently">
                                  <FiTrash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Registrations;
