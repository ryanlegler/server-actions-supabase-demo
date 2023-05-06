const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || "";
import { createClient } from "@supabase/supabase-js";
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
    throw new Error("Missing Supabase API Keys");
}
