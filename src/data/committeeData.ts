export interface CommitteeMember {
  id: string;
  name: string;
  designation: string;
  role: string;
  institution: string;
  image: string;
}

export const committeeData: CommitteeMember[] = [
  { id: "1", name: "Prof. Dr. Dilip Maske", designation: "President", role: "VC Principal", institution: "The D.G. Ruparel College", image: "" },
  { id: "2", name: "Maj. Madhav Gavande", designation: "Vice President", role: "Former Vice Principal", institution: "R.A. Podar College", image: "" },
  { id: "3", name: "Dr. Jitendra Amberkar", designation: "Hon. Secretary", role: "Sports Director", institution: "Royal College", image: "" },
  { id: "4", name: "Dr. Nisar Hussain", designation: "Jt. Secretary", role: "Sports Director", institution: "Tolani College", image: "" },
  { id: "5", name: "Ms. Punam Mujawar", designation: "Treasurer", role: "Sports Director", institution: "Sree Narayan Guru College", image: "" },
  { id: "6", name: "Mr. Prakash Bhamre", designation: "Executive Member", role: "Sports Director", institution: "SIWS College", image: "" },
  { id: "7", name: "Mrs. Kumud Pawar", designation: "Executive Member", role: "Physical Education Teacher", institution: "The D.G. Ruparel College", image: "" },
  { id: "8", name: "Mrs. Nikita Lad", designation: "Executive Member", role: "Physical Education Teacher", institution: "M.D. College", image: "" },
  { id: "9", name: "Mr. Vilas Kotian", designation: "Manager", role: "Manager", institution: "JCSAM", image: "" },
];
