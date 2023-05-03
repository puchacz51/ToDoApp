import "../styles/globals.scss";
import Layout from "../components/layout/layout";
import type { AppProps } from "next/app";
import React from "react";
import { Provider } from "react-redux";
import { wrapper } from "../Store/Store";
import { setSession } from "../Store/supabaseSlice";
import { supabase } from "../SupaBase/supabase";
import {} from "@supabase/auth-helpers-react";

/**
 *
 * This is the App page
 * @return {JSX.Element}: The JSX Code for home page.
 */

function MyApp({ Component, ...pageProps }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(pageProps);

  if (typeof window === "undefined") {
    const dispath = store.dispatch;
    supabase.auth.onAuthStateChange((event, session) => {
      dispath(setSession(session));
    });
  }
  return (
    <Provider store={store}>
      <Layout>
        {" "}
        <Component />
      </Layout>
    </Provider>
  );
}

export default MyApp;
