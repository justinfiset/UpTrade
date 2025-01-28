import { createTheme, MantineProvider } from "@mantine/core";
import { ColorSchemeScript } from "@mantine/core";

import Dashboard from "../pages/Dashboard";
import Head from "next/head";

import AppNav from "../components/AppNav";

import "@mantine/core/styles.css";
import "../styles/global.css";

const darkTheme = true;

export default function Home() {
  return (
    <>
      <Head>
        <ColorSchemeScript />
      </Head>
      <MantineProvider defaultColorScheme={darkTheme ? "dark" : "light"}>
        <AppNav>
          <Dashboard />
        </AppNav>
      </MantineProvider>
    </>
  );
}
