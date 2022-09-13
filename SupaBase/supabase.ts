import { createClient } from "@supabase/supabase-js";

const supabaseKey = process.env.NEXT_PUBLIC_API_PUBLIC_KEY as string;
const supabaseUrl = process.env.NEXT_PUBLIC_PROJECT_URL as string;

const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };
