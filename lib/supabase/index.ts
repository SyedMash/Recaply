import { createClient } from "@supabase/supabase-js";

export const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL,
  process.env.NEXT_PUBLIC_SUPABASE_API_KEY,
);
