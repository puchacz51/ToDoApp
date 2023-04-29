import { supabase } from "./supabase";
export const singInWithGithub = () =>
  supabase.auth.signInWithOAuth({
    provider: "github",
  });
