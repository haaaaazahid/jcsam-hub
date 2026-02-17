import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="page-container py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="section-title mb-2">About <span className="text-gradient">JCSAM</span></h1>
        <p className="section-subtitle">Fostering sportsmanship among Mumbai's junior colleges</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 mt-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="space-y-6">
          <div className="admin-card">
            <h3 className="font-display font-bold text-xl mb-3 text-primary">Our Mission</h3>
            <p className="text-muted-foreground leading-relaxed">
              The Junior College Sports Association of Mumbai (JCSAM) is dedicated to promoting sports culture, physical fitness, and competitive spirit among junior college students in Mumbai. We organize inter-college tournaments across 15 sports disciplines.
            </p>
          </div>
          <div className="admin-card">
            <h3 className="font-display font-bold text-xl mb-3 text-primary">Our Vision</h3>
            <p className="text-muted-foreground leading-relaxed">
              To be the premier sports governing body for junior colleges in Mumbai, nurturing young talent and providing pathways to state and national level competitions.
            </p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="space-y-6">
          <div className="admin-card">
            <h3 className="font-display font-bold text-xl mb-3 text-primary">What We Do</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2"><span className="text-secondary mt-1">●</span> Organize inter-college tournaments in 15 sports</li>
              <li className="flex items-start gap-2"><span className="text-secondary mt-1">●</span> Conduct selection trials for state/national events</li>
              <li className="flex items-start gap-2"><span className="text-secondary mt-1">●</span> Promote sports culture and physical fitness</li>
              <li className="flex items-start gap-2"><span className="text-secondary mt-1">●</span> Recognize and award outstanding sports achievements</li>
              <li className="flex items-start gap-2"><span className="text-secondary mt-1">●</span> Provide coaching and training resources</li>
            </ul>
          </div>
          <div className="admin-card">
            <h3 className="font-display font-bold text-xl mb-3 text-primary">Affiliated With</h3>
            <p className="text-muted-foreground leading-relaxed">
              JCSAM operates under the guidance of the Mumbai University Sports Board and is affiliated with the Maharashtra State Sports Association for junior colleges.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
