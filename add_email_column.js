import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_KEY; // Need the secret role key for alter table

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env file");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function addEmailColumn() {
  // We use rpc if there's a custom function, or just run a direct SQL query through the API
  // However, Supabase JS client doesn't support raw SQL data definition language (DDL) directly.
  // We will instead try to add it via a standard insert to see if the column exists, 
  // or we need to advise the user to add it in their dashboard.
  console.log("Please run the following SQL command in your Supabase SQL Editor:");
  console.log("ALTER TABLE players ADD COLUMN IF NOT EXISTS email TEXT;");
}

addEmailColumn();
