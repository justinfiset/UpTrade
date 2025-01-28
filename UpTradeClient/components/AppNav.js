import { AppShell, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

export default function AppNav({children}) {
    const [opened, { toggle }] = useDisclosure();

    return(
        <AppShell
            header={{ height: 60 }}
            navbar={{
            width: 300,
            breakpoint: 'sm',
            collapsed: { mobile: !opened },
            }}
            padding="md"
        >
            <AppShell.Header>
                <Burger
                    opened={opened}
                    onClick={toggle}
                    hiddenFrom='sm'
                    size="sm"
                />
                <div>UpTrade</div>
            </AppShell.Header>

            <AppShell.Navbar p="md"></AppShell.Navbar>

            <AppShell.Main>{children}</AppShell.Main>

        </AppShell>
    );
}