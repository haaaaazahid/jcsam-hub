import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useData } from "@/context/DataContext";
import { FiCalendar, FiArrowLeft } from "react-icons/fi";

const SportDetail = () => {
  const { slug } = useParams();
  const { sports, schedules, notices } = useData();
  const sport = sports.find(s => s.slug === slug);

  if (!sport) return <div className="page-container py-12 text-center"><h2 className="text-2xl font-bold">Sport not found</h2><Link to="/sports" className="btn-primary mt-4 inline-block">Back to Sports</Link></div>;

  const sportSchedules = schedules.filter(s => s.sportId === sport.id && s.status === "upcoming");
  const sportNotices = notices.filter(n => n.sportId === sport.id);

  return (
    <div>
      {/* Banner */}
      <div className={`bg-gradient-to-r ${sport.bannerColor} py-16`}>
        <div className="page-container">
          <Link to="/sports" className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-4 text-sm">
            <FiArrowLeft /> All Sports
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-6xl block mb-4">{sport.icon}</span>
            <h1 className="text-4xl font-display font-black text-primary-foreground">{sport.name}</h1>
          </motion.div>
        </div>
      </div>

      <div className="page-container py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="admin-card">
              <h2 className="font-display font-bold text-xl mb-4 text-primary">About</h2>
              <p className="text-muted-foreground leading-relaxed">{sport.description}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="admin-card">
              <h2 className="font-display font-bold text-xl mb-4 text-primary">Rules & Regulations</h2>
              <p className="text-muted-foreground leading-relaxed">{sport.rules}</p>
            </motion.div>
          </div>

          <div className="space-y-6">
            <div className="admin-card">
              <h3 className="font-display font-bold text-lg mb-4 text-primary">Upcoming Matches</h3>
              {sportSchedules.length === 0 ? (
                <p className="text-sm text-muted-foreground">No upcoming matches.</p>
              ) : (
                <div className="space-y-3">
                  {sportSchedules.map(match => (
                    <div key={match.id} className="p-3 rounded-lg bg-muted/50">
                      <p className="text-sm font-semibold text-foreground">{match.title}</p>
                      <p className="text-xs text-muted-foreground">{match.team1} vs {match.team2}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1"><FiCalendar /> {match.date} at {match.time}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="admin-card">
              <h3 className="font-display font-bold text-lg mb-4 text-primary">Sport Notices</h3>
              {sportNotices.length === 0 ? (
                <p className="text-sm text-muted-foreground">No notices.</p>
              ) : (
                <div className="space-y-3">
                  {sportNotices.map(notice => (
                    <div key={notice.id} className="p-3 rounded-lg bg-muted/50">
                      <span className={notice.priority === "urgent" ? "priority-urgent" : notice.priority === "important" ? "priority-important" : "priority-normal"}>
                        {notice.priority}
                      </span>
                      <p className="text-sm font-semibold text-foreground mt-2">{notice.title}</p>
                      <p className="text-xs text-muted-foreground">{notice.date}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SportDetail;
