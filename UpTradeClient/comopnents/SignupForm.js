import {
    Group,
    Title,
    Container,
    TextInput,
    PasswordInput,
    Button,
    Checkbox,
} from "@mantine/core";

export default function SignupForm() {
    return (
        <>
            <Title>Sign up</Title>
            <Group grow={true}>
                <TextInput label="Firstname" placeholder="John" />
                <TextInput label="Lastname" placeholder="Doe" />
            </Group>
            <TextInput label="Email" placeholder="user@mail.com" />
            <PasswordInput label="Password" placeholder="Your password" />
            <PasswordInput
                label="Confirm password"
                placeholder="Confirm your password"
            />
            <Checkbox
                label="I agree to the terms and conditions."
                mt="xl"
                size="md"
            />
            <Button fullWidth mt="xl" size="md">
                Register
            </Button>
        </>
    );
}
