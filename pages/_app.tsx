import "../styles/globals.scss";
import Layout from "../components/layout/layout";
import type { AppProps } from "next/app";
import React from "react";
import { Provider } from "react-redux";
import { store, pStore } from "../Store/Store";
import { PersistGate } from "redux-persist/integration/react";
import { supabase } from "../SupaBase/supabase";
/**
 *
 * This is the App page
 * @return {JSX.Element}: The JSX Code for home page.
 */
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={pStore}>
        <Layout>
          {" "}
          <Component {...pageProps} />
        </Layout>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
