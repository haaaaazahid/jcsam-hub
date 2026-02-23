import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiCheckCircle } from "react-icons/fi";

const fadeUp = (delay = 0) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay, duration: 0.5 } });

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="page-container py-12">
      <motion.div {...fadeUp()}>
        <h1 className="section-title mb-2">Contact <span className="text-gradient">Us</span></h1>
        <p className="section-subtitle">Get in touch with JCSAM</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 mt-8">
        <div className="space-y-6">
          <motion.div {...fadeUp(0.1)} className="admin-card flex items-start gap-4">
            <FiMapPin className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-foreground mb-1">Address</h3>
              <p className="text-sm text-muted-foreground">C/o. The D.G. Ruparel College of Arts, Science and Commerce, Mahim, Mumbai – 400016</p>
            </div>
          </motion.div>
          <motion.div {...fadeUp(0.2)} className="admin-card flex items-start gap-4">
            <FiMail className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-foreground mb-1">Email</h3>
              <p className="text-sm text-muted-foreground">info@jcsam.org</p>
            </div>
          </motion.div>
          <motion.div {...fadeUp(0.3)} className="admin-card flex items-start gap-4">
            <FiPhone className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-foreground mb-1">Phone</h3>
              <p className="text-sm text-muted-foreground">+91 22 2444 0861</p>
            </div>
          </motion.div>

          <motion.div {...fadeUp(0.4)} className="rounded-xl overflow-hidden h-64">
            <iframe
              title="JCSAM Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.869!2d72.8402!3d19.0424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c91eaa4ef507%3A0x7e4cb15c3fae6d33!2sD.G.%20Ruparel%20College!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </motion.div>
        </div>

        <motion.div {...fadeUp(0.2)}>
          {submitted && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 rounded-lg bg-success/10 border border-success text-success flex items-center gap-2">
              <FiCheckCircle /> Message sent successfully!
            </motion.div>
          )}
          <form onSubmit={handleSubmit} className="admin-card space-y-4">
            <h3 className="font-display font-bold text-xl text-foreground mb-4">Send us a message</h3>
            <div>
              <label className="block text-sm font-medium mb-1">Name *</label>
              <input required type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email *</label>
              <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Subject *</label>
              <input required type="text" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Message *</label>
              <textarea required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary min-h-[120px]" />
            </div>
            <button type="submit" className="btn-secondary w-full">Send Message</button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
