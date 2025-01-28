import { useForm } from "@mantine/form";

export default function SignUp() {
    return(
        const form = useForm({
            mode: "uncontrolled",
            initialValues: {
                email: "",
                firstname: "",
                lastname: "",
                password: "",
                tos: false
            }
        })
    );
}