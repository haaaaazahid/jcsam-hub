import { useState } from "react";
import { motion } from "framer-motion";
import { useSports, useColleges, useCreatePlayer, useCreateCollege } from "@/hooks/useSupabaseData";
import { FiCheckCircle } from "react-icons/fi";
import { toast } from "sonner";

const RegistrationPage = () => {
  const { data: sports = [] } = useSports();
  const { data: colleges = [] } = useColleges();
  const createPlayer = useCreatePlayer();
  const createCollege = useCreateCollege();
  const [tab, setTab] = useState<"player" | "college">("player");
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tab === "player") {
      // Validate 10-digit phone
      const phone = form.contact?.replace(/\D/g, "");
      if (!phone || phone.length !== 10) {
        toast.error("Please enter a valid 10-digit phone number");
        return;
      }
      createPlayer.mutate({
        name: form.name,
        college_id: form.college || null,
        sport_id: form.sport || null,
        age: Number(form.age),
        contact: phone,
        status: "pending",
      } as any);
    } else {
      const phone = form.phone?.replace(/\D/g, "");
      if (!phone || phone.length !== 10) {
        toast.error("Please enter a valid 10-digit phone number");
        return;
      }
      createCollege.mutate({
        name: form.collegeName,
        address: form.address,
        contact_person: form.contactPerson,
        email: form.email,
        phone: phone,
        status: "active",
      } as any);
    }
    setSubmitted(true);
    setForm({});
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="page-container py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="section-title mb-2"><span className="text-gradient">Registration</span></h1>
        <p className="section-subtitle">Register your college or players for JCSAM events</p>
      </motion.div>

      <div className="flex gap-2 mb-8">
        <button onClick={() => setTab("player")} className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${tab === "player" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
          Player Registration
        </button>
        <button onClick={() => setTab("college")} className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${tab === "college" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
          College Registration
        </button>
      </div>

      {submitted && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 rounded-lg bg-success/10 border border-success text-success flex items-center gap-2">
          <FiCheckCircle /> Registration submitted successfully! Awaiting admin approval.
        </motion.div>
      )}

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="admin-card max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          {tab === "player" ? (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">Full Name *</label>
                <input required type="text" value={form.name || ""} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">College *</label>
                <select required value={form.college || ""} onChange={e => setForm({ ...form, college: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="">Select College</option>
                  {colleges.filter((c: any) => c.status === "active").map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Sport *</label>
                <select required value={form.sport || ""} onChange={e => setForm({ ...form, sport: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="">Select Sport</option>
                  {sports.map((s: any) => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Age *</label>
                  <input required type="number" min="14" max="25" value={form.age || ""} onChange={e => setForm({ ...form, age: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone (+91) *</label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-lg bg-muted border border-r-0 border-border text-sm text-muted-foreground">+91</span>
                    <input required type="tel" maxLength={10} pattern="[0-9]{10}" placeholder="9876543210" value={form.contact || ""} onChange={e => setForm({ ...form, contact: e.target.value.replace(/\D/g, "").slice(0, 10) })} className="w-full px-3 py-2 rounded-r-lg bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">College Name *</label>
                <input required type="text" value={form.collegeName || ""} onChange={e => setForm({ ...form, collegeName: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Address *</label>
                <textarea required value={form.address || ""} onChange={e => setForm({ ...form, address: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary min-h-[60px]" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Contact Person *</label>
                <input required type="text" value={form.contactPerson || ""} onChange={e => setForm({ ...form, contactPerson: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Email *</label>
                  <input required type="email" value={form.email || ""} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone (+91) *</label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-lg bg-muted border border-r-0 border-border text-sm text-muted-foreground">+91</span>
                    <input required type="tel" maxLength={10} pattern="[0-9]{10}" placeholder="9876543210" value={form.phone || ""} onChange={e => setForm({ ...form, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })} className="w-full px-3 py-2 rounded-r-lg bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                </div>
              </div>
            </>
          )}
          <button type="submit" className="btn-secondary w-full mt-4">Submit Registration</button>
        </form>
      </motion.div>
    </div>
  );
};

export default RegistrationPage;
