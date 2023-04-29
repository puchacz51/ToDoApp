import { NextPage } from "next";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../SupaBase/supabase";


const LoginPage: NextPage = () => {
  return (
    <>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
      />
    </>
  );
};
export default LoginPage;
