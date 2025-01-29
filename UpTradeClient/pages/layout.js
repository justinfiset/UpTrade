import { createTheme, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import AppNav from "../components/AppNav";

export default function Layout(props) {
    return (
        <MantineProvider defaultColorScheme={props.theme}>
        <AppNav>
          {props.children}
        </AppNav>
      </MantineProvider>
    );
}