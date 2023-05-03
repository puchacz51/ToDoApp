import { GetServerSideProps, NextPage } from "next";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { SupabaseClient } from "@supabase/supabase-js";
import {
  createServerSupabaseClient,
  Session,
} from "@supabase/auth-helpers-nextjs";
import { supabase } from "../SupaBase/supabase";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const serverClient = createServerSupabaseClient(ctx);
  const session = await serverClient.auth.getSession();

  console.log(session);

  if (session.data.session?.access_token)
    return {
      redirect: { destination: "/", permanent: true },
    };
  return { props: {} };
};

const LoginPage: NextPage = () => {
  return (
    <>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        redirectTo="/toto"
        dark
      />
    </>
  );
};
export default LoginPage;
