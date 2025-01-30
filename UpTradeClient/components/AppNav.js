import {
    AppShell,
    Burger,
    Flex,
    Group,
    Menu,
    MenuDivider,
    NavLink,
    Text,
    Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import {
    IconDashboard,
    IconWallet,
    IconUser,
    IconDoorExit,
    IconDoor,
    IconDoorOff,
    IconDoorEnter,
    IconSettings,
    IconSearch,
} from "@tabler/icons-react";

import Link from "next/link";
import styles from "./AppNav.module.css";

import Image from "next/image";

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
                        <Link href="/">
                        <Image
                                src="/images/uptrade-logo.png"
                                alt="logo"
                                height={50}
                                width={50}
                            />
                        </Link>
                    </Group>
                    <Menu trigger="hover">
                        <Menu.Target>
                            <IconUser />
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Label>User</Menu.Label>
                            <Menu.Item leftSection={<IconSettings />}>
                                Settings
                            </Menu.Item>
                            <MenuDivider />
                            <Menu.Item
                                color="red"
                                leftSection={<IconDoorEnter />}
                            >
                                Logout
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
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
                <NavLink
                    component={Link}
                    href="/browse"
                    label="Browse Stocks"
                    leftSection={<IconSearch />}
                />
            </AppShell.Navbar>

            <AppShell.Main>{props.children}</AppShell.Main>
        </AppShell>
    );
}
