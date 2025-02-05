import Head from "next/head";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";

import "@mantine/core/styles.css";
import "../styles/global.css";
import AppNav from "@/comopnents/AppNav";

const darkTheme = true;
export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <Head>
                <ColorSchemeScript />
            </Head>
            <body>
                <MantineProvider defaultColorScheme={ darkTheme ? "dark" : "light" }>
                    <AppNav>{children}</AppNav>
                </MantineProvider>
            </body>
        </html>
    );
}
