import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useDashboardStats, useSchedules, useNotices } from "@/hooks/useSupabaseData";
import StatCounter from "@/components/StatCounter";
import { FiCalendar, FiUsers, FiAward, FiArrowRight, FiBell } from "react-icons/fi";
import { MdSportsCricket } from "react-icons/md";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { delay, duration: 0.6, ease: "easeOut" as const },
});

const Index = () => {
  const { data: stats } = useDashboardStats();
  const { data: allSchedules = [] } = useSchedules();
  const { data: notices = [] } = useNotices();
  const sports = stats?.sports ?? [];
  const colleges = stats?.colleges ?? [];
  const players = stats?.players ?? [];
  const upcomingMatches = allSchedules.filter((s: any) => s.status === "upcoming").slice(0, 3);

  return (
    <div>
      {/* Hero Section with Parallax */}
      <section className="relative min-h-[85vh] flex items-center gradient-hero overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-10 w-72 h-72 rounded-full blur-[100px]"
            style={{ background: "hsl(25 100% 50% / 0.15)" }}
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1], y: [0, -30, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-[120px]"
            style={{ background: "hsl(218 86% 31% / 0.2)" }}
          />
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full blur-[80px]"
            style={{ background: "hsl(142 71% 45% / 0.1)" }}
          />
        </div>
        <div className="page-container relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-6"
              style={{ background: "hsl(25 100% 50% / 0.2)", color: "hsl(25 100% 60%)" }}
            >
              🏆 Season 2025-26 Now Live
            </motion.div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-black text-white leading-tight mb-6">
              Junior College<br />
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                style={{ color: "hsl(25 100% 55%)" }}
              >
                Sports Association
              </motion.span><br />
              of Mumbai
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-lg text-white/70 mb-8 max-w-xl"
            >
              Empowering junior college athletes across Mumbai through competitive sports, teamwork, and excellence.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/sports" className="btn-secondary text-base flex items-center gap-2">
                Explore Sports <FiArrowRight />
              </Link>
              <Link to="/registration" className="px-6 py-3 rounded-lg font-semibold text-base text-white border border-white/30 hover:bg-white/10 transition-all duration-300">
                Register Now
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="page-container -mt-16 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCounter end={sports.length} label="Sports" icon={<MdSportsCricket className="w-8 h-8" />} />
          <StatCounter end={colleges.length} label="Colleges" icon={<FiUsers className="w-8 h-8" />} delay={200} />
          <StatCounter end={players.length} label="Players" icon={<FiAward className="w-8 h-8" />} delay={400} suffix="+" />
          <StatCounter end={allSchedules.length} label="Matches" icon={<FiCalendar className="w-8 h-8" />} delay={600} />
        </div>
      </section>

      {/* Sports Grid */}
      <section className="page-container py-16">
        <motion.div {...fadeUp()} className="text-center mb-12">
          <h2 className="section-title">Our <span className="text-gradient">Sports</span></h2>
          <p className="section-subtitle">Competitive disciplines across Mumbai's junior colleges</p>
        </motion.div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {sports.map((sport: any, i: number) => (
            <motion.div
              key={sport.id}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.05 }}
            >
              <Link to={`/sports/${sport.slug}`} className="sport-card flex flex-col items-center p-5 text-center group">
                <span className="text-4xl mb-3 group-hover:scale-125 transition-transform duration-300">{sport.icon}</span>
                <span className="text-sm font-semibold text-foreground">{sport.name}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Upcoming Matches */}
      <section className="bg-muted/50">
        <div className="page-container py-16">
          <motion.div {...fadeUp()} className="text-center mb-12">
            <h2 className="section-title">Upcoming <span className="text-gradient">Matches</span></h2>
            <p className="section-subtitle">Don't miss the action</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {upcomingMatches.map((match: any, i: number) => {
              const sport = match.sports || sports.find((s: any) => s.id === match.sport_id);
              return (
                <motion.div
                  key={match.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="glass-card p-6 group"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">{sport?.icon}</span>
                    <span className="text-xs font-semibold text-secondary uppercase">{sport?.name}</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{match.title}</h3>
                  <p className="text-sm text-muted-foreground mb-1">{match.team1} vs {match.team2}</p>
                  <p className="text-sm text-muted-foreground">{match.venue}</p>
                  <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><FiCalendar /> {match.date}</span>
                    <span>⏰ {match.time}</span>
                  </div>
                </motion.div>
              );
            })}
            {upcomingMatches.length === 0 && (
              <p className="col-span-3 text-center text-muted-foreground py-8">No upcoming matches scheduled yet.</p>
            )}
          </div>
        </div>
      </section>

      {/* Latest Notices */}
      <section className="page-container py-16">
        <motion.div {...fadeUp()} className="text-center mb-12">
          <h2 className="section-title">Latest <span className="text-gradient">Notices</span></h2>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-4">
          {notices.slice(0, 4).map((notice: any, i: number) => (
            <motion.div
              key={notice.id}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
              className="notice-card flex items-start gap-4"
            >
              <span className={notice.priority === "urgent" ? "priority-urgent" : notice.priority === "important" ? "priority-important" : "priority-normal"}>
                {notice.priority}
              </span>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground text-sm mb-1">{notice.title}</h4>
                <p className="text-xs text-muted-foreground">{notice.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div {...fadeUp(0.3)} className="text-center mt-8">
          <Link to="/notices" className="btn-secondary text-sm">All Notices</Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Index;
