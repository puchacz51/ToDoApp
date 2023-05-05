import { GetServerSideProps, NextPage } from "next";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa, ThemeMinimal } from "@supabase/auth-ui-shared";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { supabase } from "../SupaBase/supabase";
import styles from "../styles/loginPage.module.scss";
import { useRouter } from "next/router";
import { useAppSelector } from "../Store/Store";
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const serverClient = createServerSupabaseClient(ctx);
  const session = await serverClient.auth.getSession();
  if (session.data.session?.access_token)
    return {
      redirect: { destination: "/", permanent: true },
    };
  return { props: {} };
};

const LoginPage: NextPage = () => {
  const router = useRouter();
  const { supbaseSession } = useAppSelector((state) => state.supabase);
  if (supbaseSession?.access_token) {
    setTimeout(() => {
      router.push("/login");
    }, 500);
    return (
      <div className={styles.loginFormWrapper}>
        {" "}
        <h3 className={styles.signedInfo}>you're singed</h3>
        <p className={styles.redirectiingIngo}>redirecting to home</p>
        page
      </div>
    );
  }

  return (
    <div className={styles.loginFormWrapper}>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        redirectTo="/"
        providers={["github"]}
      />
    </div>
  );
};
export default LoginPage;
