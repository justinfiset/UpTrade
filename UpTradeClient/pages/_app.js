import { createTheme, MantineProvider } from "@mantine/core";
import { ColorSchemeScript } from "@mantine/core";

import Dashboard from "../pages/Dashboard";
import Head from "next/head";

import AppNav from "../components/AppNav";

import "@mantine/core/styles.css";
import "../styles/global.css";

export default function Home() {
  return (
    <>
      <Head>
        <ColorSchemeScript />
      </Head>
      <MantineProvider defaultColorScheme="dark">
        <AppNav>
          <Dashboard />
        </AppNav>
      </MantineProvider>
    </>
  );
}
