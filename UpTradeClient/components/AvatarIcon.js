import { Avatar, Box, Center, Skeleton } from "@mantine/core";
import { useEffect, useState } from "react";

export default function AvatarIcon(props) {
    const [logo, setLogo] = useState(null);
    const [logoError, setLogoError] = useState(false);
    const [loading, setLoading] = useState(true);

    const size = props.size ? props.size : 40;

    useEffect(() => {
        async function fetchStockLogo() {
            setLoading(true);

            try {
                const response = await fetch(props.src);
                const data = await response.json();
                if (data[props.id]) {
                    setLogo(data[props.id]);
                } else {
                    setLogoError(true);
                }
                setLoading(false);
            } catch (error) {
                setLogoError(true);
                setLoading(false);
            }
        }
        fetchStockLogo();
    }, [props.src]);

    return (
        <Box style={{ position: "relative" }}>
            {loading ? (
                <Skeleton visible={true} height={size} circle />
            ) : logoError ? (
                <Avatar
                    color="initials"
                    name={props.name}
                    onError={() => setLogoError(true)}
                    size={size}
                />
            ) : (
                <Avatar src={logo} size={size} />
            )}
        </Box>
    );
}
