import {
    AppShell,
    Avatar,
    Burger,
    Flex,
    Group,
    Menu,
    MenuDivider,
    Modal,
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
    IconPencil,
} from "@tabler/icons-react";

import Link from "next/link";

import Image from "next/image";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { useState } from "react";
import AvatarIcon from "./AvatarIcon";

export default function AppNav(props) {
    const [opened, { toggle }] = useDisclosure();

    const [openedModal, { open, close }] = useDisclosure();
    const [activeModal, setActiveModal] = useState("login"); // Stocke la clé du modal actif
    const modals = {
        login: { title: "Login", content: <LoginForm /> },
        signup: { title: "Register", content: <SignupForm /> },
    };

    const openModalWithType = (type) => {
        setActiveModal(type);
        open();
    };

    const loggedInMenu = (
        <Menu.Dropdown>
            <Menu.Label>User Settings</Menu.Label>
            <Menu.Item
                component={Link}
                href="/settings"
                leftSection={<IconSettings />}
            >
                Settings
            </Menu.Item>
            <MenuDivider />
            <Menu.Item color="red" leftSection={<IconDoorEnter />}>
                Logout
            </Menu.Item>
        </Menu.Dropdown>
    );

    const loggedOutMenu = (
        <Menu.Dropdown>
            <Menu.Label>User Settings</Menu.Label>
            <Menu.Item
                onClick={() => openModalWithType("login")}
                leftSection={<IconUser />}
            >
                Login
            </Menu.Item>
            <Menu.Item
                onClick={() => openModalWithType("signup")}
                leftSection={<IconPencil />}
            >
                Sign up
            </Menu.Item>
        </Menu.Dropdown>
    );

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
                <Flex h="100%" align="center">
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

                    <Menu trigger="hover" ml={"auto"} mr={"1.5em"}>
                        <Menu.Target>
                          <Group>
                          <AvatarIcon></AvatarIcon>
                          </Group>
                        </Menu.Target>
                        {props.loggedIn ? loggedInMenu : loggedOutMenu}
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

            <AppShell.Main>
                {props.children}
                <Modal
                    centered
                    opened={openedModal}
                    onClose={close}
                    title={modals[activeModal].title}
                >
                    {modals[activeModal].content}
                </Modal>
            </AppShell.Main>
        </AppShell>
    );
}
