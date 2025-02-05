import { Breadcrumbs, Anchor, Text } from "@mantine/core";
import Link from "next/link";
import { usePathname } from "next/navigation";

function DynamicBreadcrumbs() {
    const pathSegments = usePathname().split("?")[0].split("/").filter(Boolean);

    const items = pathSegments.map((segment, index) => {
        const ref = "/" + pathSegments.slice(0, index + 1).join("/");
        const title = decodeURIComponent(segment.replace(/-/g, " "));

        const Component = index == pathSegments.length - 1 ? Text : Anchor
        return (
            <Component component={Link} href={ref} key={ref}>
                {title.charAt(0).toUpperCase() + title.slice(1)}
            </Component>
        );
    });

    const Component = (pathSegments.length == 0) ? Text : Anchor;
    items.unshift(
        <Component component={Link} href="/">
            Home
        </Component>
    );
    
    return (
        <>
            <Breadcrumbs>{items}</Breadcrumbs>
        </>
    );
}

export default DynamicBreadcrumbs;
