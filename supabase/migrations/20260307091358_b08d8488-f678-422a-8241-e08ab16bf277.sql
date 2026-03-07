
-- Fix existing college data that violates phone constraint
UPDATE public.colleges SET phone = '' WHERE phone !~ '^\d{10}$' AND phone != '';

-- Now add constraints
ALTER TABLE public.colleges
  ADD CONSTRAINT chk_colleges_email CHECK (email = '' OR email ~* '^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$'),
  ADD CONSTRAINT chk_colleges_phone CHECK (phone = '' OR phone ~ '^\d{10}$'),
  ADD CONSTRAINT chk_colleges_name_length CHECK (char_length(name) <= 300);

ALTER TABLE public.notices
  ADD CONSTRAINT chk_notices_title_length CHECK (char_length(title) <= 500);

ALTER TABLE public.sports
  ADD CONSTRAINT chk_sports_name_length CHECK (char_length(name) <= 200),
  ADD CONSTRAINT chk_sports_slug_length CHECK (char_length(slug) <= 200);

ALTER TABLE public.committee_members
  ADD CONSTRAINT chk_committee_name_length CHECK (char_length(name) <= 200);

-- is_admin function
CREATE OR REPLACE FUNCTION public.is_admin(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_profiles WHERE id = _user_id
  )
$$;

-- SPORTS write policies -> admin only
DROP POLICY IF EXISTS "Auth users can insert sports" ON public.sports;
DROP POLICY IF EXISTS "Auth users can update sports" ON public.sports;
DROP POLICY IF EXISTS "Auth users can delete sports" ON public.sports;
CREATE POLICY "Admins can insert sports" ON public.sports FOR INSERT TO authenticated WITH CHECK (public.is_admin(auth.uid()));
CREATE POLICY "Admins can update sports" ON public.sports FOR UPDATE TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins can delete sports" ON public.sports FOR DELETE TO authenticated USING (public.is_admin(auth.uid()));

-- GALLERY
DROP POLICY IF EXISTS "Auth users can insert gallery" ON public.gallery;
DROP POLICY IF EXISTS "Auth users can update gallery" ON public.gallery;
DROP POLICY IF EXISTS "Auth users can delete gallery" ON public.gallery;
CREATE POLICY "Admins can insert gallery" ON public.gallery FOR INSERT TO authenticated WITH CHECK (public.is_admin(auth.uid()));
CREATE POLICY "Admins can update gallery" ON public.gallery FOR UPDATE TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins can delete gallery" ON public.gallery FOR DELETE TO authenticated USING (public.is_admin(auth.uid()));

-- NOTICES
DROP POLICY IF EXISTS "Auth users can insert notices" ON public.notices;
DROP POLICY IF EXISTS "Auth users can update notices" ON public.notices;
DROP POLICY IF EXISTS "Auth users can delete notices" ON public.notices;
CREATE POLICY "Admins can insert notices" ON public.notices FOR INSERT TO authenticated WITH CHECK (public.is_admin(auth.uid()));
CREATE POLICY "Admins can update notices" ON public.notices FOR UPDATE TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins can delete notices" ON public.notices FOR DELETE TO authenticated USING (public.is_admin(auth.uid()));

-- COMMITTEE
DROP POLICY IF EXISTS "Auth users can insert committee" ON public.committee_members;
DROP POLICY IF EXISTS "Auth users can update committee" ON public.committee_members;
DROP POLICY IF EXISTS "Auth users can delete committee" ON public.committee_members;
CREATE POLICY "Admins can insert committee" ON public.committee_members FOR INSERT TO authenticated WITH CHECK (public.is_admin(auth.uid()));
CREATE POLICY "Admins can update committee" ON public.committee_members FOR UPDATE TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins can delete committee" ON public.committee_members FOR DELETE TO authenticated USING (public.is_admin(auth.uid()));

-- COLLEGES - admin write, keep public registration insert
DROP POLICY IF EXISTS "Auth users can insert colleges" ON public.colleges;
DROP POLICY IF EXISTS "Auth users can update colleges" ON public.colleges;
DROP POLICY IF EXISTS "Auth users can delete colleges" ON public.colleges;
CREATE POLICY "Admins can insert colleges" ON public.colleges FOR INSERT TO authenticated WITH CHECK (public.is_admin(auth.uid()));
CREATE POLICY "Admins can update colleges" ON public.colleges FOR UPDATE TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins can delete colleges" ON public.colleges FOR DELETE TO authenticated USING (public.is_admin(auth.uid()));

-- PLAYERS - keep public insert, admin-only update/delete
DROP POLICY IF EXISTS "Auth users can insert players" ON public.players;
DROP POLICY IF EXISTS "Auth users can update players" ON public.players;
DROP POLICY IF EXISTS "Auth users can delete players" ON public.players;
CREATE POLICY "Admins can update players" ON public.players FOR UPDATE TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins can delete players" ON public.players FOR DELETE TO authenticated USING (public.is_admin(auth.uid()));

-- RESULTS
DROP POLICY IF EXISTS "Auth users can insert results" ON public.results;
DROP POLICY IF EXISTS "Auth users can update results" ON public.results;
DROP POLICY IF EXISTS "Auth users can delete results" ON public.results;
CREATE POLICY "Admins can insert results" ON public.results FOR INSERT TO authenticated WITH CHECK (public.is_admin(auth.uid()));
CREATE POLICY "Admins can update results" ON public.results FOR UPDATE TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins can delete results" ON public.results FOR DELETE TO authenticated USING (public.is_admin(auth.uid()));

-- SCHEDULES
DROP POLICY IF EXISTS "Auth users can insert schedules" ON public.schedules;
DROP POLICY IF EXISTS "Auth users can update schedules" ON public.schedules;
DROP POLICY IF EXISTS "Auth users can delete schedules" ON public.schedules;
CREATE POLICY "Admins can insert schedules" ON public.schedules FOR INSERT TO authenticated WITH CHECK (public.is_admin(auth.uid()));
CREATE POLICY "Admins can update schedules" ON public.schedules FOR UPDATE TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins can delete schedules" ON public.schedules FOR DELETE TO authenticated USING (public.is_admin(auth.uid()));

-- SPORT_IMAGES
DROP POLICY IF EXISTS "Auth users can insert sport_images" ON public.sport_images;
DROP POLICY IF EXISTS "Auth users can update sport_images" ON public.sport_images;
DROP POLICY IF EXISTS "Auth users can delete sport_images" ON public.sport_images;
CREATE POLICY "Admins can insert sport_images" ON public.sport_images FOR INSERT TO authenticated WITH CHECK (public.is_admin(auth.uid()));
CREATE POLICY "Admins can update sport_images" ON public.sport_images FOR UPDATE TO authenticated USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins can delete sport_images" ON public.sport_images FOR DELETE TO authenticated USING (public.is_admin(auth.uid()));

-- FIX 3: Make player-docs private
UPDATE storage.buckets SET public = false WHERE id = 'player-docs';
DROP POLICY IF EXISTS "Public can view player docs" ON storage.objects;
CREATE POLICY "Admins can view player docs" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'player-docs' AND public.is_admin(auth.uid()));
