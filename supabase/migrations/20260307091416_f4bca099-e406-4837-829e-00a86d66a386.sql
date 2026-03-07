
-- Fix the overly permissive "Anyone can register" policies by scoping them properly
-- These allow anonymous inserts but should still validate

-- Replace colleges registration policy
DROP POLICY IF EXISTS "Anyone can register college" ON public.colleges;
CREATE POLICY "Anyone can register college" ON public.colleges FOR INSERT TO anon WITH CHECK (status = 'active');

-- Replace players registration policy  
DROP POLICY IF EXISTS "Anyone can register player" ON public.players;
CREATE POLICY "Anyone can register player" ON public.players FOR INSERT TO anon WITH CHECK (status = 'pending');
