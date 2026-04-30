const url = 'https://nhwrbraxfymiwnwzmnqo.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5od3JicmF4ZnltaXdud3ptbnFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE2MDI4MjQsImV4cCI6MjA4NzE3ODgyNH0.mm9YNndXiUwdkhm-d7PdwPrC6cGbMV7rX6VpIJaS-OQ';

const sql = `
  ALTER TABLE public.players ADD COLUMN IF NOT EXISTS email text;
  ALTER TABLE public.players ADD COLUMN IF NOT EXISTS age integer;
  ALTER TABLE public.players ADD COLUMN IF NOT EXISTS status text DEFAULT 'pending';
  ALTER TABLE public.colleges ADD COLUMN IF NOT EXISTS status text DEFAULT 'pending';
`;

const res = await fetch(url + '/rest/v1/rpc/exec_sql', {
  method: 'POST',
  headers: {
    'apikey': key,
    'Authorization': 'Bearer ' + key,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ query: sql })
});

const data = await res.json();
console.log('Result:', JSON.stringify(data, null, 2));

