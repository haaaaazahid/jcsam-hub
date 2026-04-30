import { createClient } from '@supabase/supabase-js';
// No need for dotenv, using node --env-file

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env file");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const sportsData = [
  { name: "Cross Country", slug: "cross-country", description: "Cross country running is a sport in which teams and individuals run a race on open-air courses over natural terrain such as dirt or grass.", rules: "Teams of 5-7 runners compete. The team with the lowest cumulative score wins. Course distance: 5-8 km.", icon: "🏃", banner_color: "from-green-600 to-green-800" },
  { name: "Carrom", slug: "carrom", description: "Carrom is a tabletop game of South Asian origin. The objective is to use a striker disk to pocket nine of one's own pieces.", rules: "Best of 3 boards. Standard ICF rules apply. Time limit: 45 minutes per board.", icon: "🎯", banner_color: "from-amber-600 to-amber-800" },
  { name: "Chess", slug: "chess", description: "Chess is a two-player strategy board game played on a checkered board with 64 squares arranged in an 8×8 grid.", rules: "Swiss system tournament. Time control: 15+10. FIDE rules apply.", icon: "♟️", banner_color: "from-gray-700 to-gray-900" },
  { name: "Table Tennis", slug: "table-tennis", description: "Table tennis is a sport in which two or four players hit a lightweight ball back and forth across a table using small rackets.", rules: "Best of 5 games. Each game to 11 points. ITTF rules apply.", icon: "🏓", banner_color: "from-blue-500 to-blue-700" },
  { name: "Badminton", slug: "badminton", description: "Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.", rules: "Best of 3 games. Each game to 21 points. BWF rules apply.", icon: "🏸", banner_color: "from-teal-500 to-teal-700" },
  { name: "Judo", slug: "judo", description: "Judo is a modern Japanese martial art and Olympic sport. The objective is to throw, pin, or submit the opponent.", rules: "Weight categories as per IJF. Match duration: 4 minutes. Golden score for ties.", icon: "🥋", banner_color: "from-red-600 to-red-800" },
  { name: "Boxing", slug: "boxing", description: "Boxing is a combat sport in which two people throw punches at each other for a predetermined amount of time in a boxing ring.", rules: "3 rounds of 3 minutes each. AIBA rules apply. Weight categories enforced.", icon: "🥊", banner_color: "from-red-700 to-red-900" },
  { name: "Kabaddi", slug: "kabaddi", description: "Kabaddi is a contact team sport played between two teams of seven players each on a rectangular court.", rules: "Two halves of 20 minutes. Standard Amateur Kabaddi Federation rules.", icon: "🤼", banner_color: "from-orange-500 to-orange-700" },
  { name: "Basketball", slug: "basketball", description: "Basketball is a team sport in which two teams of five players try to score by shooting a ball through a hoop.", rules: "4 quarters of 10 minutes. FIBA rules apply. 24-second shot clock.", icon: "🏀", banner_color: "from-orange-600 to-orange-800" },
  { name: "Kho Kho", slug: "kho-kho", description: "Kho Kho is a traditional Indian sport and one of the oldest outdoor sports, played by teams of twelve players.", rules: "Two innings of 9 minutes each. KKFI rules apply.", icon: "🏃‍♂️", banner_color: "from-yellow-500 to-yellow-700" },
  { name: "Athletics", slug: "athletics", description: "Athletics is a group of sporting events that involves competitive running, jumping, throwing, and walking.", rules: "Events include 100m, 200m, 400m, 800m, 1500m, relay, long jump, high jump, shot put, discus, javelin.", icon: "🏅", banner_color: "from-blue-600 to-blue-800" },
  { name: "Football", slug: "football", description: "Football is a team sport played between two teams of eleven players with a spherical ball.", rules: "Two halves of 35 minutes. FIFA rules apply. Knockout format.", icon: "⚽", banner_color: "from-green-500 to-green-700" },
  { name: "Volleyball", slug: "volleyball", description: "Volleyball is a team sport in which two teams of six players are separated by a net.", rules: "Best of 5 sets. Sets to 25 points (15 for deciding set). FIVB rules.", icon: "🏐", banner_color: "from-indigo-500 to-indigo-700" },
  { name: "Cricket", slug: "cricket", description: "Cricket is a bat-and-ball game played between two teams of eleven players on a field.", rules: "T20 format. 20 overs per side. ICC rules apply.", icon: "🏏", banner_color: "from-emerald-600 to-emerald-800" },
  { name: "Throwball", slug: "throwball", description: "Throwball is a non-contact ball sport played across a net between two teams of seven players.", rules: "Best of 3 sets. Each set to 25 points. TFI rules apply.", icon: "🤾", banner_color: "from-pink-500 to-pink-700" },
];

const collegesData = [
  { name: "The D.G. Ruparel College", address: "Mahim, Mumbai - 400016", contact_person: "Dr. Sharma", email: "info@ruparel.edu", phone: "022-24440861", status: "active" },
  { name: "R.A. Podar College", address: "Matunga, Mumbai - 400019", contact_person: "Prof. Mehta", email: "info@podar.edu", phone: "022-24021143", status: "active" },
  { name: "Royal College", address: "Mira Road, Mumbai", contact_person: "Dr. Patil", email: "info@royal.edu", phone: "022-28112233", status: "active" },
  { name: "Tolani College", address: "Andheri, Mumbai - 400058", contact_person: "Mr. Khan", email: "info@tolani.edu", phone: "022-26281022", status: "active" },
  { name: "Sree Narayan Guru College", address: "Chembur, Mumbai - 400071", contact_person: "Ms. Nair", email: "info@sngcollege.edu", phone: "022-25221044", status: "active" },
  { name: "SIWS College", address: "Wadala, Mumbai - 400031", contact_person: "Dr. Joshi", email: "info@siws.edu", phone: "022-24131456", status: "active" },
  { name: "Wilson College", address: "Chowpatty, Mumbai - 400007", contact_person: "Dr. Fernandes", email: "info@wilson.edu", phone: "022-23634001", status: "active" },
];

async function seed() {
  console.log("Seeding sports...");
  for (const sport of sportsData) {
    const { data: existing, error: fetchError } = await supabase.from('sports').select('id').eq('slug', sport.slug).maybeSingle();
    if (fetchError) {
      console.error(`Error checking sport ${sport.name}:`, fetchError.message);
      continue;
    }
    if (!existing) {
      const { error } = await supabase.from('sports').insert(sport);
      if (error) console.error(`Error inserting sport ${sport.name}:`, error.message);
      else console.log(`Inserted sport: ${sport.name}`);
    } else {
        console.log(`Sport already exists: ${sport.name}`);
    }
  }

  console.log("Seeding colleges...");
  for (const college of collegesData) {
    const { data: existing, error: fetchError } = await supabase.from('colleges').select('id').eq('name', college.name).maybeSingle();
    if (fetchError) {
      console.error(`Error checking college ${college.name}:`, fetchError.message);
      continue;
    }
    if (!existing) {
      const { error } = await supabase.from('colleges').insert(college);
      if (error) console.error(`Error inserting college ${college.name}:`, error.message);
      else console.log(`Inserted college: ${college.name}`);
    } else {
        console.log(`College already exists: ${college.name}`);
    }
  }

  console.log("Seeding complete!");
}

seed().catch(err => {
  console.error("Unhandled error during seeding:", err);
  process.exit(1);
});
