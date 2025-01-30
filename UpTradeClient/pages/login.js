import {
    Button,
    Checkbox,
    Container,
    Paper,
    PasswordInput,
    TextInput,
    Title,
} from "@mantine/core";

export default function LoginForm() {
    return (
        <Container size="xs" my={40}>
            <Title>Welcome back!</Title>
            <TextInput label="Email" placeholder="user@mail.com" />
            <PasswordInput label="Password" placeholder="Your password" />
            <Checkbox label="Keep me logged in" mt="xl" size="md" />
            <Button fullWidth mt="xl" size="md">Login</Button>
        </Container>
    );
}
