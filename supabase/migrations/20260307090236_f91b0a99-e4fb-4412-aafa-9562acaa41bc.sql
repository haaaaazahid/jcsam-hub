
-- Fix ALL RLS policies from RESTRICTIVE to PERMISSIVE

-- ===== SPORTS =====
DROP POLICY IF EXISTS "Public can read sports" ON public.sports;
DROP POLICY IF EXISTS "Auth users can insert sports" ON public.sports;
DROP POLICY IF EXISTS "Auth users can update sports" ON public.sports;
DROP POLICY IF EXISTS "Auth users can delete sports" ON public.sports;

CREATE POLICY "Public can read sports" ON public.sports FOR SELECT USING (true);
CREATE POLICY "Auth users can insert sports" ON public.sports FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth users can update sports" ON public.sports FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth users can delete sports" ON public.sports FOR DELETE TO authenticated USING (true);

-- ===== NOTICES =====
DROP POLICY IF EXISTS "Public can read notices" ON public.notices;
DROP POLICY IF EXISTS "Auth users can insert notices" ON public.notices;
DROP POLICY IF EXISTS "Auth users can update notices" ON public.notices;
DROP POLICY IF EXISTS "Auth users can delete notices" ON public.notices;

CREATE POLICY "Public can read notices" ON public.notices FOR SELECT USING (true);
CREATE POLICY "Auth users can insert notices" ON public.notices FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth users can update notices" ON public.notices FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth users can delete notices" ON public.notices FOR DELETE TO authenticated USING (true);

-- ===== COMMITTEE_MEMBERS =====
DROP POLICY IF EXISTS "Public can read committee" ON public.committee_members;
DROP POLICY IF EXISTS "Auth users can insert committee" ON public.committee_members;
DROP POLICY IF EXISTS "Auth users can update committee" ON public.committee_members;
DROP POLICY IF EXISTS "Auth users can delete committee" ON public.committee_members;

CREATE POLICY "Public can read committee" ON public.committee_members FOR SELECT USING (true);
CREATE POLICY "Auth users can insert committee" ON public.committee_members FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth users can update committee" ON public.committee_members FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth users can delete committee" ON public.committee_members FOR DELETE TO authenticated USING (true);

-- ===== SCHEDULES =====
DROP POLICY IF EXISTS "Public can read schedules" ON public.schedules;
DROP POLICY IF EXISTS "Auth users can insert schedules" ON public.schedules;
DROP POLICY IF EXISTS "Auth users can update schedules" ON public.schedules;
DROP POLICY IF EXISTS "Auth users can delete schedules" ON public.schedules;

CREATE POLICY "Public can read schedules" ON public.schedules FOR SELECT USING (true);
CREATE POLICY "Auth users can insert schedules" ON public.schedules FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth users can update schedules" ON public.schedules FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth users can delete schedules" ON public.schedules FOR DELETE TO authenticated USING (true);

-- ===== GALLERY =====
DROP POLICY IF EXISTS "Public can read gallery" ON public.gallery;
DROP POLICY IF EXISTS "Auth users can insert gallery" ON public.gallery;
DROP POLICY IF EXISTS "Auth users can update gallery" ON public.gallery;
DROP POLICY IF EXISTS "Auth users can delete gallery" ON public.gallery;

CREATE POLICY "Public can read gallery" ON public.gallery FOR SELECT USING (true);
CREATE POLICY "Auth users can insert gallery" ON public.gallery FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth users can update gallery" ON public.gallery FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth users can delete gallery" ON public.gallery FOR DELETE TO authenticated USING (true);

-- ===== COLLEGES =====
DROP POLICY IF EXISTS "Public can read colleges" ON public.colleges;
DROP POLICY IF EXISTS "Auth users can insert colleges" ON public.colleges;
DROP POLICY IF EXISTS "Auth users can update colleges" ON public.colleges;
DROP POLICY IF EXISTS "Auth users can delete colleges" ON public.colleges;
DROP POLICY IF EXISTS "Anyone can register college" ON public.colleges;

CREATE POLICY "Public can read colleges" ON public.colleges FOR SELECT USING (true);
CREATE POLICY "Auth users can insert colleges" ON public.colleges FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Anyone can register college" ON public.colleges FOR INSERT WITH CHECK (true);
CREATE POLICY "Auth users can update colleges" ON public.colleges FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth users can delete colleges" ON public.colleges FOR DELETE TO authenticated USING (true);

-- ===== PLAYERS =====
DROP POLICY IF EXISTS "Public can read players" ON public.players;
DROP POLICY IF EXISTS "Auth users can insert players" ON public.players;
DROP POLICY IF EXISTS "Auth users can update players" ON public.players;
DROP POLICY IF EXISTS "Auth users can delete players" ON public.players;
DROP POLICY IF EXISTS "Anyone can register player" ON public.players;

CREATE POLICY "Public can read players" ON public.players FOR SELECT USING (true);
CREATE POLICY "Auth users can insert players" ON public.players FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Anyone can register player" ON public.players FOR INSERT WITH CHECK (true);
CREATE POLICY "Auth users can update players" ON public.players FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth users can delete players" ON public.players FOR DELETE TO authenticated USING (true);

-- ===== RESULTS =====
DROP POLICY IF EXISTS "Public can read results" ON public.results;
DROP POLICY IF EXISTS "Auth users can insert results" ON public.results;
DROP POLICY IF EXISTS "Auth users can update results" ON public.results;
DROP POLICY IF EXISTS "Auth users can delete results" ON public.results;

CREATE POLICY "Public can read results" ON public.results FOR SELECT USING (true);
CREATE POLICY "Auth users can insert results" ON public.results FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth users can update results" ON public.results FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth users can delete results" ON public.results FOR DELETE TO authenticated USING (true);

-- ===== SPORT_IMAGES =====
DROP POLICY IF EXISTS "Public can read sport_images" ON public.sport_images;
DROP POLICY IF EXISTS "Auth users can insert sport_images" ON public.sport_images;
DROP POLICY IF EXISTS "Auth users can update sport_images" ON public.sport_images;
DROP POLICY IF EXISTS "Auth users can delete sport_images" ON public.sport_images;

CREATE POLICY "Public can read sport_images" ON public.sport_images FOR SELECT USING (true);
CREATE POLICY "Auth users can insert sport_images" ON public.sport_images FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth users can update sport_images" ON public.sport_images FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth users can delete sport_images" ON public.sport_images FOR DELETE TO authenticated USING (true);

-- ===== ADMIN_PROFILES =====
DROP POLICY IF EXISTS "Admin can read own profile" ON public.admin_profiles;
DROP POLICY IF EXISTS "Admin can insert own profile" ON public.admin_profiles;
DROP POLICY IF EXISTS "Admin can update own profile" ON public.admin_profiles;

CREATE POLICY "Admin can read own profile" ON public.admin_profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Admin can insert own profile" ON public.admin_profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "Admin can update own profile" ON public.admin_profiles FOR UPDATE TO authenticated USING (auth.uid() = id);
