
import { motion } from "framer-motion";
import { useDashboardStats } from "@/hooks/useSupabaseData";
import StatCounter from "@/components/StatCounter";
import { FiUsers, FiCalendar, FiBell, FiUserCheck, FiLoader } from "react-icons/fi";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const COLORS = ["hsl(216,85%,30%)", "hsl(27,100%,50%)", "hsl(142,71%,45%)", "hsl(38,92%,50%)", "hsl(0,84%,60%)"];

const AdminDashboard = () => {
  const { data: stats, isLoading } = useDashboardStats();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <FiLoader className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const colleges = stats?.colleges ?? [];
  const players = stats?.players ?? [];
  const schedules = stats?.schedules ?? [];
  const notices = stats?.notices ?? [];
  const sports = stats?.sports ?? [];

  const upcomingCount = schedules.filter((s: any) => s.status === "upcoming").length;

  const sportChartData = sports.slice(0, 8).map((sport: any) => ({
    name: sport.name.length > 8 ? sport.name.slice(0, 8) + "…" : sport.name,
    players: players.filter((p: any) => p.sport_id === sport.id).length,
  }));

  const statusData = [
    { name: "Upcoming", value: schedules.filter((s: any) => s.status === "upcoming").length },
    { name: "Completed", value: schedules.filter((s: any) => s.status === "completed").length },
    { name: "Cancelled", value: schedules.filter((s: any) => s.status === "cancelled").length },
  ].filter(d => d.value > 0);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h2 className="text-2xl font-display font-bold mb-6">Dashboard Overview</h2>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCounter end={colleges.length} label="Colleges" icon={<FiUsers className="w-6 h-6" />} />
        <StatCounter end={players.length} label="Players" icon={<FiUserCheck className="w-6 h-6" />} delay={100} />
        <StatCounter end={upcomingCount} label="Upcoming Matches" icon={<FiCalendar className="w-6 h-6" />} delay={200} />
        <StatCounter end={notices.length} label="Notices" icon={<FiBell className="w-6 h-6" />} delay={300} />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="admin-card">
          <h3 className="font-display font-bold text-lg mb-4">Players by Sport</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={sportChartData}>
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="players" fill="hsl(216,85%,30%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="admin-card">
          <h3 className="font-display font-bold text-lg mb-4">Match Status</h3>
          {statusData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={statusData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={5} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                  {statusData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[250px] text-muted-foreground text-sm">No schedule data yet</div>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="admin-card">
        <h3 className="font-display font-bold text-lg mb-4">Recent Scheduled Matches</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-4 py-2 text-muted-foreground">Event</th>
                <th className="text-left px-4 py-2 text-muted-foreground">Date</th>
                <th className="text-left px-4 py-2 text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {schedules.slice(0, 5).map((s: any) => (
                <tr key={s.id} className="border-b border-border/50">
                  <td className="px-4 py-3">{s.title}</td>
                  <td className="px-4 py-3">{s.date}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                      s.status === "upcoming" ? "bg-primary/10 text-primary" :
                      s.status === "completed" ? "bg-success/10 text-success" :
                      "bg-destructive/10 text-destructive"
                    }`}>{s.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
