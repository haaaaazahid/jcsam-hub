
-- 1. Fix Players Table Policies
-- Add INSERT policy for authenticated users (admins) if not already present
DROP POLICY IF EXISTS "Admins can insert players" ON public.players;
CREATE POLICY "Admins can insert players" ON public.players 
FOR INSERT TO authenticated 
WITH CHECK (public.is_admin(auth.uid()));

-- Ensure anonymous can register with 'pending' status (already exists but re-confirming)
DROP POLICY IF EXISTS "Anyone can register player" ON public.players;
CREATE POLICY "Anyone can register player" ON public.players 
FOR INSERT TO anon 
WITH CHECK (status = 'pending');

-- 2. Fix Colleges Table Policies
-- Add INSERT policy for authenticated users (admins)
DROP POLICY IF EXISTS "Admins can insert colleges" ON public.colleges;
CREATE POLICY "Admins can insert colleges" ON public.colleges 
FOR INSERT TO authenticated 
WITH CHECK (public.is_admin(auth.uid()));

-- Fix anonymous registration status mismatch (was 'active', should be 'pending')
DROP POLICY IF EXISTS "Anyone can register college" ON public.colleges;
CREATE POLICY "Anyone can register college" ON public.colleges 
FOR INSERT TO anon 
WITH CHECK (status = 'pending');
