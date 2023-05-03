import { createClient } from "@supabase/supabase-js";
import { Database } from "./schema";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";

// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabase = createBrowserSupabaseClient<Database>({options:{}});
export { supabase };
