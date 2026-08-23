import { motion } from "framer-motion";
import { useDashboardStats, usePlayers } from "@/hooks/useAppData";
import StatCounter from "@/components/StatCounter";
import {
  FiUsers,
  FiCalendar,
  FiBell,
  FiUserCheck,
  FiLoader,
  FiClock,
} from "react-icons/fi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = [
  "hsl(216,85%,30%)",
  "hsl(27,100%,50%)",
  "hsl(142,71%,45%)",
  "hsl(38,92%,50%)",
  "hsl(0,84%,60%)",
];

// ============================================================
// SAFE ARRAY HELPER
// ============================================================

function safeArray<T = any>(value: any): T[] {
  if (Array.isArray(value)) {
    return value;
  }

  if (value && Array.isArray(value.data)) {
    return value.data;
  }

  if (value && Array.isArray(value.records)) {
    return value.records;
  }

  if (value && Array.isArray(value.rows)) {
    return value.rows;
  }

  return [];
}

// ============================================================
// ADMIN DASHBOARD
// ============================================================

const AdminDashboard = () => {
  const {
    data: stats,
    isLoading,
  } = useDashboardStats();

  const {
    data: playersResult,
    isLoading: playersLoading,
  } = usePlayers();

  if (isLoading || playersLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <FiLoader className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // ==========================================================
  // ALWAYS CONVERT API DATA TO ARRAYS
  // ==========================================================

  const colleges = safeArray(
    stats?.colleges
  );

  const players = safeArray(
    stats?.players
  );

  const schedules = safeArray(
    stats?.schedules
  );

  const notices = safeArray(
    stats?.notices
  );

  const sports = safeArray(
    stats?.sports
  );

  const allPlayers = safeArray(
    playersResult
  );

  // ==========================================================
  // DEBUG
  // ==========================================================

  console.log(
    "ADMIN DASHBOARD NORMALIZED DATA"
  );

  console.log(
    "colleges:",
    Array.isArray(colleges),
    colleges.length
  );

  console.log(
    "players:",
    Array.isArray(players),
    players.length
  );

  console.log(
    "allPlayers:",
    Array.isArray(allPlayers),
    allPlayers.length
  );

  console.log(
    "schedules:",
    Array.isArray(schedules),
    schedules.length
  );

  console.log(
    "notices:",
    Array.isArray(notices),
    notices.length
  );

  console.log(
    "sports:",
    Array.isArray(sports),
    sports.length
  );

  // ==========================================================
  // UPCOMING MATCHES
  // ==========================================================

  const upcomingCount =
    schedules.filter(
      (s: any) =>
        String(s?.status || "")
          .toLowerCase() === "upcoming"
    ).length;

  // ==========================================================
  // PLAYERS BY SPORT
  // ==========================================================

  const sportChartData =
    sports
      .slice(0, 8)
      .map((sport: any) => {
        const sportId =
          sport?.id ??
          sport?.sport_id ??
          sport?.sportId;

        const sportName =
          String(
            sport?.name ??
            sport?.sport_name ??
            "Unknown"
          );

        return {
          name:
            sportName.length > 8
              ? sportName.slice(0, 8) + "…"
              : sportName,

          players:
            players.filter(
              (p: any) => {
                const playerSportId =
                  p?.sport_id ??
                  p?.sportId;

                return (
                  String(playerSportId) ===
                  String(sportId)
                );
              }
            ).length,
        };
      });

  // ==========================================================
  // MATCH STATUS
  // ==========================================================

  const statusData = [
    {
      name: "Upcoming",
      value:
        schedules.filter(
          (s: any) =>
            String(s?.status || "")
              .toLowerCase() === "upcoming"
        ).length,
    },

    {
      name: "Completed",
      value:
        schedules.filter(
          (s: any) =>
            String(s?.status || "")
              .toLowerCase() === "completed"
        ).length,
    },

    {
      name: "Cancelled",
      value:
        schedules.filter(
          (s: any) =>
            String(s?.status || "")
              .toLowerCase() === "cancelled"
        ).length,
    },
  ].filter(
    (d) => d.value > 0
  );

  // ==========================================================
  // PENDING REGISTRATIONS
  // ==========================================================

  const pendingColleges =
    colleges.filter(
      (c: any) =>
        String(c?.status || "")
          .toLowerCase() === "pending"
    );

  const pendingPlayers =
    allPlayers.filter(
      (p: any) =>
        String(p?.status || "")
          .toLowerCase() === "pending"
    );

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div className="space-y-6">

      {/* HEADER */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2 className="text-2xl font-display font-bold mb-6">
          Dashboard Overview
        </h2>
      </motion.div>

      {/* ======================================================
          STAT CARDS
          ====================================================== */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        <StatCounter
          end={colleges.length}
          label="Colleges"
          icon={
            <FiUsers className="w-6 h-6" />
          }
        />

        <StatCounter
          end={players.length}
          label="Players"
          icon={
            <FiUserCheck className="w-6 h-6" />
          }
          delay={100}
        />

        <StatCounter
          end={upcomingCount}
          label="Upcoming Matches"
          icon={
            <FiCalendar className="w-6 h-6" />
          }
          delay={200}
        />

        <StatCounter
          end={notices.length}
          label="Notices"
          icon={
            <FiBell className="w-6 h-6" />
          }
          delay={300}
        />

      </div>

      {/* ======================================================
          CHARTS
          ====================================================== */}

      <div className="grid md:grid-cols-2 gap-6">

        {/* PLAYERS BY SPORT */}

        <div className="admin-card">

          <h3 className="font-display font-bold text-lg mb-4">
            Players by Sport
          </h3>

          {sportChartData.length > 0 ? (
            <ResponsiveContainer
              width="100%"
              height={250}
            >
              <BarChart
                data={sportChartData}
              >

                <XAxis
                  dataKey="name"
                  tick={{
                    fontSize: 11,
                  }}
                />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="players"
                  fill="hsl(216,85%,30%)"
                  radius={[
                    4,
                    4,
                    0,
                    0,
                  ]}
                />

              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[250px] text-muted-foreground text-sm">
              No sport data yet
            </div>
          )}

        </div>

        {/* MATCH STATUS */}

        <div className="admin-card">

          <h3 className="font-display font-bold text-lg mb-4">
            Match Status
          </h3>

          {statusData.length > 0 ? (
            <ResponsiveContainer
              width="100%"
              height={250}
            >

              <PieChart>

                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  label={({
                    name,
                    value,
                  }) =>
                    `${name}: ${value}`
                  }
                >

                  {statusData.map(
                    (_, i) => (
                      <Cell
                        key={i}
                        fill={
                          COLORS[
                            i %
                              COLORS.length
                          ]
                        }
                      />
                    )
                  )}

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[250px] text-muted-foreground text-sm">
              No schedule data yet
            </div>
          )}

        </div>

      </div>

      {/* ======================================================
          RECENT SCHEDULED MATCHES
          ====================================================== */}

      <div className="admin-card">

        <h3 className="font-display font-bold text-lg mb-4">
          Recent Scheduled Matches
        </h3>

        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead>

              <tr className="border-b border-border">

                <th className="text-left px-4 py-2 text-muted-foreground">
                  Event
                </th>

                <th className="text-left px-4 py-2 text-muted-foreground">
                  Date
                </th>

                <th className="text-left px-4 py-2 text-muted-foreground">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {schedules
                .slice(0, 5)
                .map((s: any) => (

                  <tr
                    key={
                      s?.id ??
                      s?.schedule_id ??
                      Math.random()
                    }
                    className="border-b border-border/50"
                  >

                    <td className="px-4 py-3">
                      {s?.title ??
                        s?.name ??
                        "-"}
                    </td>

                    <td className="px-4 py-3">
                      {s?.date ?? "-"}
                    </td>

                    <td className="px-4 py-3">

                      <span
                        className={`px-2 py-0.5 rounded text-xs font-bold ${
                          s?.status ===
                          "upcoming"
                            ? "bg-primary/10 text-primary"
                            : s?.status ===
                              "completed"
                            ? "bg-success/10 text-success"
                            : "bg-destructive/10 text-destructive"
                        }`}
                      >
                        {s?.status ??
                          "-"}
                      </span>

                    </td>

                  </tr>

                ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* ======================================================
          PENDING REGISTRATIONS
          ====================================================== */}

      <div className="grid md:grid-cols-2 gap-6">

        {/* PENDING COLLEGES */}

        <div className="admin-card">

          <div className="flex items-center gap-2 mb-4">

            <FiClock className="text-primary w-5 h-5" />

            <h3 className="font-display font-bold text-lg">
              Pending Colleges
            </h3>

          </div>

          {pendingColleges.length >
          0 ? (

            <div className="overflow-x-auto">

              <table className="w-full text-sm">

                <thead>

                  <tr className="border-b border-border">

                    <th className="text-left px-4 py-2 text-muted-foreground">
                      College Name
                    </th>

                    <th className="text-left px-4 py-2 text-muted-foreground">
                      Email
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {pendingColleges.map(
                    (c: any) => (

                      <tr
                        key={
                          c?.id ??
                          c?.college_id ??
                          Math.random()
                        }
                        className="border-b border-border/50"
                      >

                        <td className="px-4 py-3">
                          {c?.name ??
                            c?.college_name ??
                            "-"}
                        </td>

                        <td className="px-4 py-3">
                          {c?.email ?? "-"}
                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          ) : (

            <p className="text-sm text-muted-foreground py-4 text-center">
              No pending college registrations.
            </p>

          )}

        </div>

        {/* PENDING PLAYERS */}

        <div className="admin-card">

          <div className="flex items-center gap-2 mb-4">

            <FiClock className="text-primary w-5 h-5" />

            <h3 className="font-display font-bold text-lg">
              Pending Players
            </h3>

          </div>

          {pendingPlayers.length >
          0 ? (

            <div className="overflow-x-auto">

              <table className="w-full text-sm">

                <thead>

                  <tr className="border-b border-border">

                    <th className="text-left px-4 py-2 text-muted-foreground">
                      Player Name
                    </th>

                    <th className="text-left px-4 py-2 text-muted-foreground">
                      Email
                    </th>

                    <th className="text-left px-4 py-2 text-muted-foreground">
                      College
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {pendingPlayers.map(
                    (p: any) => (

                      <tr
                        key={
                          p?.id ??
                          p?.player_id ??
                          Math.random()
                        }
                        className="border-b border-border/50"
                      >

                        <td className="px-4 py-3">
                          {p?.name ??
                            p?.player_name ??
                            "-"}
                        </td>

                        <td className="px-4 py-3">
                          {p?.email ?? "-"}
                        </td>

                        <td className="px-4 py-3">
                          {p?.colleges?.name ??
                            p?.college_name ??
                            p?.college ??
                            "-"}
                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          ) : (

            <p className="text-sm text-muted-foreground py-4 text-center">
              No pending player registrations.
            </p>

          )}

        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;