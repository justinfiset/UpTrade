import { AppShell, Burger, Flex, Group, NavLink } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { IconDashboard, IconWallet, IconUser } from "@tabler/icons-react";

import Link from "next/link";
import styles from "./AppNav.module.css";

export default function AppNav(props) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Flex h="100%" align="center" className={styles.header}>
          <Group h="100%" px="md">
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <div>Logo</div>
          </Group>
          <IconUser />
        </Flex>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <NavLink
          component={Link}
          href="/"
          label="Dashboard"
          leftSection={<IconDashboard />}
        />
        <NavLink
          component={Link}
          href="/portfolio"
          label="Portfolio"
          leftSection={<IconWallet />}
        />
      </AppShell.Navbar>

      <AppShell.Main>{props.children}</AppShell.Main>
    </AppShell>
  );
}
