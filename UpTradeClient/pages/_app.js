import Head from "next/head";
import { ColorSchemeScript } from "@mantine/core";

import "../styles/global.css";
import Layout from "./layout";

const darkTheme = true;

export default function App({Component, pageProps}) {
  return (
    <>
      <Head>
        <ColorSchemeScript />
      </Head>
      <Layout theme={darkTheme ? "dark" : "light"}>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
