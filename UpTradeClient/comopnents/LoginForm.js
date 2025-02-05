import {
    Button,
    Checkbox,
    Container,
    Modal,
    Paper,
    PasswordInput,
    TextInput,
    Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export default function LoginForm() {
    const [opened, { open, close }] = useDisclosure(true);

    return (
        <>
            <Title>Welcome back!</Title>
            <TextInput label="Email" placeholder="user@mail.com" />
            <PasswordInput label="Password" placeholder="Your password" />
            <Checkbox label="Keep me logged in" mt="xl" size="md" />
            <Button fullWidth mt="xl" size="md">
                Login
            </Button>
        </>
    );
}
