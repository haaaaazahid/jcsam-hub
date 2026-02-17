import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useData } from "@/context/DataContext";
import StatCounter from "@/components/StatCounter";
import { FiCalendar, FiUsers, FiAward, FiArrowRight } from "react-icons/fi";
import { MdSportsCricket } from "react-icons/md";

const Index = () => {
  const { sports, colleges, players, schedules, notices } = useData();
  const upcomingMatches = schedules.filter(s => s.status === "upcoming").slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center gradient-hero overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-secondary blur-[100px]" />
          <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-primary blur-[120px]" />
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
              className="inline-block px-4 py-1.5 rounded-full bg-secondary/20 text-secondary text-sm font-semibold mb-6"
            >
              🏆 Season 2025-26 Now Live
            </motion.div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-primary-foreground leading-tight mb-6">
              Junior College<br />
              <span className="text-secondary">Sports Association</span><br />
              of Mumbai
            </h1>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-xl">
              Empowering junior college athletes across Mumbai through competitive sports, teamwork, and excellence.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/sports" className="btn-secondary text-base flex items-center gap-2">
                Explore Sports <FiArrowRight />
              </Link>
              <Link to="/registration" className="btn-primary text-base !bg-primary-foreground/10 hover:!bg-primary-foreground/20 border border-primary-foreground/30">
                Register Now
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="page-container -mt-16 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCounter end={sports.length} label="Sports" icon={<MdSportsCricket className="w-8 h-8" />} />
          <StatCounter end={colleges.length} label="Colleges" icon={<FiUsers className="w-8 h-8" />} delay={200} />
          <StatCounter end={players.length} label="Players" icon={<FiAward className="w-8 h-8" />} delay={400} suffix="+" />
          <StatCounter end={schedules.length} label="Matches" icon={<FiCalendar className="w-8 h-8" />} delay={600} />
        </div>
      </section>

      {/* Sports Grid */}
      <section className="page-container py-16">
        <div className="text-center mb-12">
          <h2 className="section-title">Our <span className="text-gradient">Sports</span></h2>
          <p className="section-subtitle">15 competitive sports across Mumbai's junior colleges</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {sports.map((sport, i) => (
            <motion.div
              key={sport.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
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
          <div className="text-center mb-12">
            <h2 className="section-title">Upcoming <span className="text-gradient">Matches</span></h2>
            <p className="section-subtitle">Don't miss the action</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {upcomingMatches.map((match, i) => {
              const sport = sports.find(s => s.id === match.sportId);
              return (
                <motion.div
                  key={match.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="admin-card group"
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
          </div>
          <div className="text-center mt-8">
            <Link to="/schedule" className="btn-primary text-sm">View Full Schedule</Link>
          </div>
        </div>
      </section>

      {/* Latest Notices */}
      <section className="page-container py-16">
        <div className="text-center mb-12">
          <h2 className="section-title">Latest <span className="text-gradient">Notices</span></h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {notices.slice(0, 4).map((notice, i) => (
            <motion.div
              key={notice.id}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
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
        <div className="text-center mt-8">
          <Link to="/notices" className="btn-secondary text-sm">All Notices</Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
