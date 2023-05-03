import { supabase } from "./supabase";
export const singInWithGithub = () =>
  supabase.auth.signInWithOAuth({
    provider: "github",
  });
export const logOut = () => supabase.auth.signOut();
