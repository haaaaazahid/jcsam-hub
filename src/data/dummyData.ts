export interface College {
  id: string;
  name: string;
  address: string;
  contactPerson: string;
  email: string;
  phone: string;
  logo: string;
  status: "active" | "inactive";
  registrationDate: string;
}

export interface Player {
  id: string;
  name: string;
  collegeId: string;
  sportId: string;
  age: number;
  contact: string;
  idDocument: string;
  status: "pending" | "approved" | "rejected";
}

export interface Schedule {
  id: string;
  sportId: string;
  title: string;
  team1: string;
  team2: string;
  venue: string;
  date: string;
  time: string;
  status: "upcoming" | "completed" | "cancelled";
  resultId?: string;
}

export interface Result {
  id: string;
  scheduleId: string;
  sportId: string;
  winner: string;
  score: string;
  summary: string;
  date: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  sportId: string | null;
  priority: "normal" | "important" | "urgent";
  image: string;
  pdfUrl: string;
  date: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
  sportId: string;
  date: string;
}

export const collegesData: College[] = [
  { id: "c1", name: "The D.G. Ruparel College", address: "Mahim, Mumbai - 400016", contactPerson: "Dr. Sharma", email: "info@ruparel.edu", phone: "022-24440861", logo: "", status: "active", registrationDate: "2024-01-15" },
  { id: "c2", name: "R.A. Podar College", address: "Matunga, Mumbai - 400019", contactPerson: "Prof. Mehta", email: "info@podar.edu", phone: "022-24021143", logo: "", status: "active", registrationDate: "2024-01-20" },
  { id: "c3", name: "Royal College", address: "Mira Road, Mumbai", contactPerson: "Dr. Patil", email: "info@royal.edu", phone: "022-28112233", logo: "", status: "active", registrationDate: "2024-02-01" },
  { id: "c4", name: "Tolani College", address: "Andheri, Mumbai - 400058", contactPerson: "Mr. Khan", email: "info@tolani.edu", phone: "022-26281022", logo: "", status: "active", registrationDate: "2024-02-10" },
  { id: "c5", name: "Sree Narayan Guru College", address: "Chembur, Mumbai - 400071", contactPerson: "Ms. Nair", email: "info@sngcollege.edu", phone: "022-25221044", logo: "", status: "active", registrationDate: "2024-02-15" },
  { id: "c6", name: "SIWS College", address: "Wadala, Mumbai - 400031", contactPerson: "Dr. Joshi", email: "info@siws.edu", phone: "022-24131456", logo: "", status: "active", registrationDate: "2024-03-01" },
  { id: "c7", name: "M.D. College", address: "Parel, Mumbai - 400012", contactPerson: "Prof. Desai", email: "info@mdcollege.edu", phone: "022-24111567", logo: "", status: "inactive", registrationDate: "2024-03-10" },
  { id: "c8", name: "Wilson College", address: "Chowpatty, Mumbai - 400007", contactPerson: "Dr. Fernandes", email: "info@wilson.edu", phone: "022-23634001", logo: "", status: "active", registrationDate: "2024-03-15" },
];

export const playersData: Player[] = [
  { id: "p1", name: "Rahul Sharma", collegeId: "c1", sportId: "14", age: 19, contact: "9876543210", idDocument: "", status: "approved" },
  { id: "p2", name: "Priya Patel", collegeId: "c2", sportId: "5", age: 18, contact: "9876543211", idDocument: "", status: "approved" },
  { id: "p3", name: "Amit Desai", collegeId: "c3", sportId: "12", age: 20, contact: "9876543212", idDocument: "", status: "pending" },
  { id: "p4", name: "Sneha Kulkarni", collegeId: "c1", sportId: "4", age: 19, contact: "9876543213", idDocument: "", status: "approved" },
  { id: "p5", name: "Vikram Singh", collegeId: "c4", sportId: "9", age: 20, contact: "9876543214", idDocument: "", status: "approved" },
  { id: "p6", name: "Anjali Nair", collegeId: "c5", sportId: "13", age: 18, contact: "9876543215", idDocument: "", status: "pending" },
  { id: "p7", name: "Rohan Mehta", collegeId: "c2", sportId: "11", age: 19, contact: "9876543216", idDocument: "", status: "approved" },
  { id: "p8", name: "Kavita Joshi", collegeId: "c6", sportId: "15", age: 20, contact: "9876543217", idDocument: "", status: "rejected" },
  { id: "p9", name: "Arjun Reddy", collegeId: "c8", sportId: "7", age: 19, contact: "9876543218", idDocument: "", status: "approved" },
  { id: "p10", name: "Meera Gupta", collegeId: "c3", sportId: "3", age: 18, contact: "9876543219", idDocument: "", status: "approved" },
];

export const schedulesData: Schedule[] = [
  { id: "s1", sportId: "14", title: "Cricket Semi-Final 1", team1: "D.G. Ruparel College", team2: "R.A. Podar College", venue: "Wankhede Stadium Ground", date: "2026-03-15", time: "09:00", status: "upcoming" },
  { id: "s2", sportId: "12", title: "Football Quarter-Final", team1: "Royal College", team2: "Tolani College", venue: "Cooperage Ground", date: "2026-03-10", time: "14:00", status: "upcoming" },
  { id: "s3", sportId: "9", title: "Basketball Final", team1: "SIWS College", team2: "Wilson College", venue: "Andheri Sports Complex", date: "2026-03-20", time: "16:00", status: "upcoming" },
  { id: "s4", sportId: "5", title: "Badminton Singles Final", team1: "Sree Narayan Guru College", team2: "M.D. College", venue: "Mahim Sports Center", date: "2026-02-28", time: "10:00", status: "completed", resultId: "r1" },
  { id: "s5", sportId: "4", title: "Table Tennis Team Event", team1: "D.G. Ruparel College", team2: "Royal College", venue: "Podar Sports Hall", date: "2026-02-25", time: "11:00", status: "completed", resultId: "r2" },
  { id: "s6", sportId: "13", title: "Volleyball Semi-Final", team1: "R.A. Podar College", team2: "Wilson College", venue: "Shivaji Park Ground", date: "2026-03-18", time: "08:00", status: "upcoming" },
  { id: "s7", sportId: "8", title: "Kabaddi Final", team1: "Tolani College", team2: "SIWS College", venue: "Dadar Sports Complex", date: "2026-02-20", time: "15:00", status: "completed", resultId: "r3" },
  { id: "s8", sportId: "11", title: "Athletics 100m Final", team1: "All Colleges", team2: "", venue: "University Ground", date: "2026-03-25", time: "07:00", status: "upcoming" },
];

export const resultsData: Result[] = [
  { id: "r1", scheduleId: "s4", sportId: "5", winner: "Sree Narayan Guru College", score: "21-15, 21-18", summary: "Dominant performance in both sets.", date: "2026-02-28" },
  { id: "r2", scheduleId: "s5", sportId: "4", winner: "D.G. Ruparel College", score: "3-1", summary: "Ruparel won 3 out of 4 individual matches.", date: "2026-02-25" },
  { id: "r3", scheduleId: "s7", sportId: "8", winner: "Tolani College", score: "42-35", summary: "Thrilling final with Tolani College edging ahead in the last 5 minutes.", date: "2026-02-20" },
];

export const noticesData: Notice[] = [
  { id: "n1", title: "Annual Sports Day 2026 Registration Open", content: "All colleges are invited to register for the Annual Sports Day 2026. Registration closes on March 1st. Please submit all required documents.", sportId: null, priority: "urgent", image: "", pdfUrl: "", date: "2026-02-10" },
  { id: "n2", title: "Cricket Tournament Schedule Released", content: "The complete schedule for the Inter-College Cricket Tournament has been released. All matches will be played at designated venues.", sportId: "14", priority: "important", image: "", pdfUrl: "", date: "2026-02-12" },
  { id: "n3", title: "New Badminton Court Regulations", content: "Updated court regulations for badminton matches. All players must follow the new guidelines effective immediately.", sportId: "5", priority: "normal", image: "", pdfUrl: "", date: "2026-02-08" },
  { id: "n4", title: "Athletics Trials for State Selection", content: "State-level athletics trials will be conducted. Top performers from JCSAM events will be recommended.", sportId: "11", priority: "important", image: "", pdfUrl: "", date: "2026-02-14" },
  { id: "n5", title: "Updated Venue for Football Matches", content: "Due to maintenance, football matches scheduled at Cooperage Ground will be moved to Shivaji Park.", sportId: "12", priority: "urgent", image: "", pdfUrl: "", date: "2026-02-15" },
];

export const galleryData: GalleryImage[] = [
  { id: "g1", url: "https://images.unsplash.com/photo-1461896836934-bd45ba8920c4?w=600", caption: "Cricket Tournament 2025 Final", sportId: "14", date: "2025-12-15" },
  { id: "g2", url: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600", caption: "Football Championship", sportId: "12", date: "2025-11-20" },
  { id: "g3", url: "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=600", caption: "Basketball League Finals", sportId: "9", date: "2025-10-30" },
  { id: "g4", url: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=600", caption: "Athletics Day 2025", sportId: "11", date: "2025-09-15" },
  { id: "g5", url: "https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?w=600", caption: "Badminton Championship", sportId: "5", date: "2025-08-22" },
  { id: "g6", url: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600", caption: "Award Ceremony", sportId: "11", date: "2025-12-20" },
  { id: "g7", url: "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=600", caption: "Volleyball Tournament", sportId: "13", date: "2025-07-10" },
  { id: "g8", url: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600", caption: "Annual Sports Day Opening", sportId: "11", date: "2025-12-01" },
];
