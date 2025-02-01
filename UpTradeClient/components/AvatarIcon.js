import { Avatar } from "@mantine/core";
import { useEffect, useState } from "react";

export default function AvatarIcon(props) {
    const [logo, setLogo] = useState(null);
    const [logoError, setLogoError] = useState(false);

    useEffect(() => {
        async function fetchStockLogo() {
            try {
                const response = await fetch(props.src);
                const data = await response.json();
                if (data.logo) {
                    setLogo(data.logo);
                } else {
                    setLogoError(true);
                }
            } catch (error) {
                setLogoError(true);
            }
        }
        fetchStockLogo();
    });

    return (
        <>
            {logoError ? (
                <Avatar
                    color="initials"
                    name={props.name}
                    onError={() => setLogoError(true)}
                />
            ) : (
                <Avatar src={logo}></Avatar>
            )}
        </>
    );
}
