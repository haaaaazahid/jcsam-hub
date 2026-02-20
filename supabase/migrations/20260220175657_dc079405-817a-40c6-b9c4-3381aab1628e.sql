
-- =============================================
-- JCSAM Full Database Schema
-- =============================================

-- Sports table
CREATE TABLE public.sports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL DEFAULT '',
  rules TEXT NOT NULL DEFAULT '',
  icon TEXT NOT NULL DEFAULT '🏅',
  banner_color TEXT NOT NULL DEFAULT 'from-blue-600 to-blue-800',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Sport images (multiple per sport)
CREATE TABLE public.sport_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sport_id UUID NOT NULL REFERENCES public.sports(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  caption TEXT NOT NULL DEFAULT '',
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Colleges table
CREATE TABLE public.colleges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  address TEXT NOT NULL DEFAULT '',
  contact_person TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  phone TEXT NOT NULL DEFAULT '',
  logo TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','inactive')),
  registration_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Committee members table
CREATE TABLE public.committee_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  designation TEXT NOT NULL DEFAULT '',
  role TEXT NOT NULL DEFAULT '',
  institution TEXT NOT NULL DEFAULT '',
  image TEXT NOT NULL DEFAULT '',
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Players table
CREATE TABLE public.players (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  college_id UUID REFERENCES public.colleges(id) ON DELETE SET NULL,
  sport_id UUID REFERENCES public.sports(id) ON DELETE SET NULL,
  age INT NOT NULL DEFAULT 18,
  contact TEXT NOT NULL DEFAULT '',
  id_document TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Schedules table
CREATE TABLE public.schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sport_id UUID REFERENCES public.sports(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  team1 TEXT NOT NULL DEFAULT '',
  team2 TEXT NOT NULL DEFAULT '',
  venue TEXT NOT NULL DEFAULT '',
  date DATE NOT NULL,
  time TIME NOT NULL DEFAULT '09:00',
  status TEXT NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming','completed','cancelled')),
  result_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Results table
CREATE TABLE public.results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  schedule_id UUID REFERENCES public.schedules(id) ON DELETE SET NULL,
  sport_id UUID REFERENCES public.sports(id) ON DELETE SET NULL,
  winner TEXT NOT NULL DEFAULT '',
  score TEXT NOT NULL DEFAULT '',
  summary TEXT NOT NULL DEFAULT '',
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Notices table
CREATE TABLE public.notices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL DEFAULT '',
  sport_id UUID REFERENCES public.sports(id) ON DELETE SET NULL,
  priority TEXT NOT NULL DEFAULT 'normal' CHECK (priority IN ('normal','important','urgent')),
  image TEXT NOT NULL DEFAULT '',
  pdf_url TEXT NOT NULL DEFAULT '',
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Gallery table
CREATE TABLE public.gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  url TEXT NOT NULL,
  caption TEXT NOT NULL DEFAULT '',
  sport_id UUID REFERENCES public.sports(id) ON DELETE SET NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Admin profiles table (for admin users)
CREATE TABLE public.admin_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT NOT NULL DEFAULT 'admin',
  full_name TEXT NOT NULL DEFAULT 'Administrator',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =============================================
-- Enable RLS on all tables
-- =============================================
ALTER TABLE public.sports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sport_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.colleges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.committee_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.players ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;

-- =============================================
-- RLS Policies - Public read, auth write
-- =============================================

-- Sports
CREATE POLICY "Public can read sports" ON public.sports FOR SELECT USING (true);
CREATE POLICY "Auth users can insert sports" ON public.sports FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth users can update sports" ON public.sports FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth users can delete sports" ON public.sports FOR DELETE TO authenticated USING (true);

-- Sport images
CREATE POLICY "Public can read sport_images" ON public.sport_images FOR SELECT USING (true);
CREATE POLICY "Auth users can insert sport_images" ON public.sport_images FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth users can update sport_images" ON public.sport_images FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth users can delete sport_images" ON public.sport_images FOR DELETE TO authenticated USING (true);

-- Colleges
CREATE POLICY "Public can read colleges" ON public.colleges FOR SELECT USING (true);
CREATE POLICY "Auth users can insert colleges" ON public.colleges FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth users can update colleges" ON public.colleges FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth users can delete colleges" ON public.colleges FOR DELETE TO authenticated USING (true);

-- Committee members
CREATE POLICY "Public can read committee" ON public.committee_members FOR SELECT USING (true);
CREATE POLICY "Auth users can insert committee" ON public.committee_members FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth users can update committee" ON public.committee_members FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth users can delete committee" ON public.committee_members FOR DELETE TO authenticated USING (true);

-- Players
CREATE POLICY "Public can read players" ON public.players FOR SELECT USING (true);
CREATE POLICY "Auth users can insert players" ON public.players FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth users can update players" ON public.players FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth users can delete players" ON public.players FOR DELETE TO authenticated USING (true);

-- Schedules
CREATE POLICY "Public can read schedules" ON public.schedules FOR SELECT USING (true);
CREATE POLICY "Auth users can insert schedules" ON public.schedules FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth users can update schedules" ON public.schedules FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth users can delete schedules" ON public.schedules FOR DELETE TO authenticated USING (true);

-- Results
CREATE POLICY "Public can read results" ON public.results FOR SELECT USING (true);
CREATE POLICY "Auth users can insert results" ON public.results FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth users can update results" ON public.results FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth users can delete results" ON public.results FOR DELETE TO authenticated USING (true);

-- Notices
CREATE POLICY "Public can read notices" ON public.notices FOR SELECT USING (true);
CREATE POLICY "Auth users can insert notices" ON public.notices FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth users can update notices" ON public.notices FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth users can delete notices" ON public.notices FOR DELETE TO authenticated USING (true);

-- Gallery
CREATE POLICY "Public can read gallery" ON public.gallery FOR SELECT USING (true);
CREATE POLICY "Auth users can insert gallery" ON public.gallery FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth users can update gallery" ON public.gallery FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth users can delete gallery" ON public.gallery FOR DELETE TO authenticated USING (true);

-- Admin profiles
CREATE POLICY "Admin can read own profile" ON public.admin_profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Admin can insert own profile" ON public.admin_profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "Admin can update own profile" ON public.admin_profiles FOR UPDATE TO authenticated USING (auth.uid() = id);

-- =============================================
-- Storage buckets
-- =============================================
INSERT INTO storage.buckets (id, name, public) VALUES ('sport-images', 'sport-images', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('notice-images', 'notice-images', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('committee-images', 'committee-images', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('college-logos', 'college-logos', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('gallery-images', 'gallery-images', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('notice-pdfs', 'notice-pdfs', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('player-docs', 'player-docs', true);

-- Storage policies
CREATE POLICY "Public can view sport images" ON storage.objects FOR SELECT USING (bucket_id = 'sport-images');
CREATE POLICY "Auth can upload sport images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'sport-images');
CREATE POLICY "Auth can delete sport images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'sport-images');

CREATE POLICY "Public can view notice images" ON storage.objects FOR SELECT USING (bucket_id = 'notice-images');
CREATE POLICY "Auth can upload notice images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'notice-images');
CREATE POLICY "Auth can delete notice images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'notice-images');

CREATE POLICY "Public can view committee images" ON storage.objects FOR SELECT USING (bucket_id = 'committee-images');
CREATE POLICY "Auth can upload committee images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'committee-images');
CREATE POLICY "Auth can delete committee images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'committee-images');

CREATE POLICY "Public can view college logos" ON storage.objects FOR SELECT USING (bucket_id = 'college-logos');
CREATE POLICY "Auth can upload college logos" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'college-logos');
CREATE POLICY "Auth can delete college logos" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'college-logos');

CREATE POLICY "Public can view gallery images" ON storage.objects FOR SELECT USING (bucket_id = 'gallery-images');
CREATE POLICY "Auth can upload gallery images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'gallery-images');
CREATE POLICY "Auth can delete gallery images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'gallery-images');

CREATE POLICY "Public can view notice pdfs" ON storage.objects FOR SELECT USING (bucket_id = 'notice-pdfs');
CREATE POLICY "Auth can upload notice pdfs" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'notice-pdfs');
CREATE POLICY "Auth can delete notice pdfs" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'notice-pdfs');

CREATE POLICY "Public can view player docs" ON storage.objects FOR SELECT USING (bucket_id = 'player-docs');
CREATE POLICY "Auth can upload player docs" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'player-docs');
CREATE POLICY "Auth can delete player docs" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'player-docs');

-- =============================================
-- Updated_at trigger function
-- =============================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER sports_updated_at BEFORE UPDATE ON public.sports FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER colleges_updated_at BEFORE UPDATE ON public.colleges FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER committee_updated_at BEFORE UPDATE ON public.committee_members FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER players_updated_at BEFORE UPDATE ON public.players FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER schedules_updated_at BEFORE UPDATE ON public.schedules FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER results_updated_at BEFORE UPDATE ON public.results FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER notices_updated_at BEFORE UPDATE ON public.notices FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE POLICY "Auth can update sport images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'sport-images');
CREATE POLICY "Auth can update notice images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'notice-images');
CREATE POLICY "Auth can update committee images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'committee-images');
CREATE POLICY "Auth can update college logos" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'college-logos');
CREATE POLICY "Auth can update gallery images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'gallery-images');
