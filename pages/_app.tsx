import "../styles/globals.css";
import Layout from "../components/layout";
import type { AppProps } from "next/app";
import React from "react";
/**
 *
 * This is the App page
 * @return {JSX.Element}: The JSX Code for home page.
 */
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      {" "}
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
