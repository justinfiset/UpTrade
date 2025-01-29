import { Button, Container, Paper, PasswordInput, TextInput, Title } from "@mantine/core";

export default function LoginForm() {
    return(
        <Paper>
            <Title>Welcome back!</Title>
            <TextInput label="Email" placeholder="user@mail.com"/>
            <PasswordInput label="Password" placeholder="Your password"/>
            <Button>Login</Button>
        </Paper>
    );
}