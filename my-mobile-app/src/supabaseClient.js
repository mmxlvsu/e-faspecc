import { createClient } from "@supabase/supabase-js";

// ⚠️ Replace these with your own values from the Supabase dashboard
const SUPABASE_URL = "https://dvwiizyvfjaepuqnchwl.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2d2lpenl2ZmphZXB1cW5jaHdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY5OTI1MDgsImV4cCI6MjA3MjU2ODUwOH0.-iSZUpQPvofmvTyXLAokSAUx6jzMQeYOJjgUqKep5ew";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
