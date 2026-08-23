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

const asArray = <T,>(value: unknown): T[] => {
  return Array.isArray(value) ? value : [];
};

const AdminDashboard = () => {
  const { data: stats, isLoading } = useDashboardStats();
  const {
    data: allPlayers = [],
    isLoading: playersLoading,
  } = usePlayers();

  if (isLoading || playersLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <FiLoader className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  /*
   * Google Apps Script can occasionally return an object instead
   * of an array. Never allow that to crash the dashboard.
   */
  const colleges = asArray<any>(stats?.colleges);
  const players = asArray<any>(stats?.players);
  const schedules = asArray<any>(stats?.schedules);
  const notices = asArray<any>(stats?.notices);
  const sports = asArray<any>(stats?.sports);
  const safeAllPlayers = asArray<any>(allPlayers);

  const upcomingCount = schedules.filter(
    (s: any) =>
      String(s?.status ?? "").toLowerCase() === "upcoming"
  ).length;

  const sportChartData = sports
    .slice(0, 8)
    .map((sport: any) => {
      const sportName = String(
        sport?.name ??
          sport?.sport_name ??
          sport?.title ??
          "Unknown"
      );

      const sportId = String(
        sport?.id ??
          sport?.sport_id ??
          sport?.sportId ??
          ""
      );

      return {
        name:
          sportName.length > 8
            ? sportName.slice(0, 8) + "…"
            : sportName,

        players: players.filter((p: any) => {
          const playerSportId = String(
            p?.sport_id ??
              p?.sportId ??
              p?.sport ??
              ""
          );

          return (
            sportId !== "" &&
            playerSportId === sportId
          );
        }).length,
      };
    });

  const upcomingMatches = schedules.filter(
    (s: any) =>
      String(s?.status ?? "").toLowerCase() ===
      "upcoming"
  ).length;

  const completedMatches = schedules.filter(
    (s: any) =>
      String(s?.status ?? "").toLowerCase() ===
      "completed"
  ).length;

  const cancelledMatches = schedules.filter(
    (s: any) =>
      String(s?.status ?? "").toLowerCase() ===
      "cancelled"
  ).length;

  const statusData = [
    {
      name: "Upcoming",
      value: upcomingMatches,
    },
    {
      name: "Completed",
      value: completedMatches,
    },
    {
      name: "Cancelled",
      value: cancelledMatches,
    },
  ].filter((d) => d.value > 0);

  const pendingColleges = colleges.filter(
    (c: any) =>
      String(c?.status ?? "").toLowerCase() ===
      "pending"
  );

  const pendingPlayers = safeAllPlayers.filter(
    (p: any) =>
      String(p?.status ?? "").toLowerCase() ===
      "pending"
  );

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

      {/* STATS */}
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

      {/* CHARTS */}
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
              <BarChart data={sportChartData}>

                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11 }}
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

      {/* RECENT MATCHES */}
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
                .map((s: any) => {

                  const status =
                    String(
                      s?.status ?? ""
                    ).toLowerCase();

                  return (
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
                          s?.event ??
                          "-"}
                      </td>

                      <td className="px-4 py-3">
                        {s?.date ??
                          s?.match_date ??
                          "-"}
                      </td>

                      <td className="px-4 py-3">

                        <span
                          className={`px-2 py-0.5 rounded text-xs font-bold ${
                            status ===
                            "upcoming"
                              ? "bg-primary/10 text-primary"
                              : status ===
                                "completed"
                              ? "bg-success/10 text-success"
                              : "bg-destructive/10 text-destructive"
                          }`}
                        >
                          {status ||
                            "unknown"}
                        </span>

                      </td>

                    </tr>
                  );
                })}

            </tbody>

          </table>

          {schedules.length === 0 && (
            <p className="text-sm text-muted-foreground py-6 text-center">
              No scheduled matches yet.
            </p>
          )}

        </div>

      </div>

      {/* PENDING REGISTRATIONS */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* COLLEGES */}
        <div className="admin-card">

          <div className="flex items-center gap-2 mb-4">

            <FiClock className="text-primary w-5 h-5" />

            <h3 className="font-display font-bold text-lg">
              Pending Colleges
            </h3>

          </div>

          {pendingColleges.length > 0 ? (

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
                          c?.collegeId ??
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
                          {c?.email || "-"}
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

        {/* PLAYERS */}
        <div className="admin-card">

          <div className="flex items-center gap-2 mb-4">

            <FiClock className="text-primary w-5 h-5" />

            <h3 className="font-display font-bold text-lg">
              Pending Players
            </h3>

          </div>

          {pendingPlayers.length > 0 ? (

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
                          p?.playerId ??
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
                          {p?.email || "-"}
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