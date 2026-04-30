-- Add email column to players table
ALTER TABLE public.players ADD COLUMN IF NOT EXISTS email TEXT;

-- Update the existing anon INSERT policy to also allow email field to pass through
-- (The existing policy only checks status = 'pending' which already allows all columns)
-- No policy change needed – email is just a new nullable column.
