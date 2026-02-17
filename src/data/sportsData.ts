export interface Sport {
  id: string;
  name: string;
  slug: string;
  description: string;
  rules: string;
  icon: string;
  bannerColor: string;
}

export const sportsData: Sport[] = [
  { id: "1", name: "Cross Country", slug: "cross-country", description: "Cross country running is a sport in which teams and individuals run a race on open-air courses over natural terrain such as dirt or grass.", rules: "Teams of 5-7 runners compete. The team with the lowest cumulative score wins. Course distance: 5-8 km.", icon: "🏃", bannerColor: "from-green-600 to-green-800" },
  { id: "2", name: "Carrom", slug: "carrom", description: "Carrom is a tabletop game of South Asian origin. The objective is to use a striker disk to pocket nine of one's own pieces.", rules: "Best of 3 boards. Standard ICF rules apply. Time limit: 45 minutes per board.", icon: "🎯", bannerColor: "from-amber-600 to-amber-800" },
  { id: "3", name: "Chess", slug: "chess", description: "Chess is a two-player strategy board game played on a checkered board with 64 squares arranged in an 8×8 grid.", rules: "Swiss system tournament. Time control: 15+10. FIDE rules apply.", icon: "♟️", bannerColor: "from-gray-700 to-gray-900" },
  { id: "4", name: "Table Tennis", slug: "table-tennis", description: "Table tennis is a sport in which two or four players hit a lightweight ball back and forth across a table using small rackets.", rules: "Best of 5 games. Each game to 11 points. ITTF rules apply.", icon: "🏓", bannerColor: "from-blue-500 to-blue-700" },
  { id: "5", name: "Badminton", slug: "badminton", description: "Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.", rules: "Best of 3 games. Each game to 21 points. BWF rules apply.", icon: "🏸", bannerColor: "from-teal-500 to-teal-700" },
  { id: "6", name: "Judo", slug: "judo", description: "Judo is a modern Japanese martial art and Olympic sport. The objective is to throw, pin, or submit the opponent.", rules: "Weight categories as per IJF. Match duration: 4 minutes. Golden score for ties.", icon: "🥋", bannerColor: "from-red-600 to-red-800" },
  { id: "7", name: "Boxing", slug: "boxing", description: "Boxing is a combat sport in which two people throw punches at each other for a predetermined amount of time in a boxing ring.", rules: "3 rounds of 3 minutes each. AIBA rules apply. Weight categories enforced.", icon: "🥊", bannerColor: "from-red-700 to-red-900" },
  { id: "8", name: "Kabaddi", slug: "kabaddi", description: "Kabaddi is a contact team sport played between two teams of seven players each on a rectangular court.", rules: "Two halves of 20 minutes. Standard Amateur Kabaddi Federation rules.", icon: "🤼", bannerColor: "from-orange-500 to-orange-700" },
  { id: "9", name: "Basketball", slug: "basketball", description: "Basketball is a team sport in which two teams of five players try to score by shooting a ball through a hoop.", rules: "4 quarters of 10 minutes. FIBA rules apply. 24-second shot clock.", icon: "🏀", bannerColor: "from-orange-600 to-orange-800" },
  { id: "10", name: "Kho Kho", slug: "kho-kho", description: "Kho Kho is a traditional Indian sport and one of the oldest outdoor sports, played by teams of twelve players.", rules: "Two innings of 9 minutes each. KKFI rules apply.", icon: "🏃‍♂️", bannerColor: "from-yellow-500 to-yellow-700" },
  { id: "11", name: "Athletics", slug: "athletics", description: "Athletics is a group of sporting events that involves competitive running, jumping, throwing, and walking.", rules: "Events include 100m, 200m, 400m, 800m, 1500m, relay, long jump, high jump, shot put, discus, javelin.", icon: "🏅", bannerColor: "from-blue-600 to-blue-800" },
  { id: "12", name: "Football", slug: "football", description: "Football is a team sport played between two teams of eleven players with a spherical ball.", rules: "Two halves of 35 minutes. FIFA rules apply. Knockout format.", icon: "⚽", bannerColor: "from-green-500 to-green-700" },
  { id: "13", name: "Volleyball", slug: "volleyball", description: "Volleyball is a team sport in which two teams of six players are separated by a net.", rules: "Best of 5 sets. Sets to 25 points (15 for deciding set). FIVB rules.", icon: "🏐", bannerColor: "from-indigo-500 to-indigo-700" },
  { id: "14", name: "Cricket", slug: "cricket", description: "Cricket is a bat-and-ball game played between two teams of eleven players on a field.", rules: "T20 format. 20 overs per side. ICC rules apply.", icon: "🏏", bannerColor: "from-emerald-600 to-emerald-800" },
  { id: "15", name: "Throwball", slug: "throwball", description: "Throwball is a non-contact ball sport played across a net between two teams of seven players.", rules: "Best of 3 sets. Each set to 25 points. TFI rules apply.", icon: "🤾", bannerColor: "from-pink-500 to-pink-700" },
];
