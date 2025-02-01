import {
    Title,
    Table,
    Group,
    Avatar,
    Anchor,
    Paper,
    NumberFormatter,
} from "@mantine/core";
import Link from "next/link";
import { useEffect, useState } from "react";
import AvatarIcon from "../components/AvatarIcon";

const data = [
    {
        symbol: "AAPL",
        name: "Apple Inc.",
        price: 145.86,
        quantity: 10,
    },
    {
        symbol: "GOOGL",
        name: "Alphabet Inc.",
        price: 2767.39,
        quantity: 5,
    },
    {
        symbol: "MSFT",
        name: "Microsoft Corporation",
        price: 289.67,
        quantity: 8,
    },
];

export default function Portfolio() {
    const rows = data.map((stock) => {
        return (
            <Table.Tr>
                <Table.Td>
                    <Group>
                        <AvatarIcon
                            src={"/api/stock?symbol=" + stock.symbol}
                            id="logo"
                            name={stock.name}
                        />
                        {stock.name}
                    </Group>
                </Table.Td>
                <Table.Td>
                    <Anchor component={Link} href={"/stock/" + stock.symbol}>
                        {stock.symbol}
                    </Anchor>
                </Table.Td>
                <Table.Td>
                    <NumberFormatter
                        prefix="$ "
                        value={stock.price}
                        thousandSeparator
                        decimalScale={2}
                    />
                </Table.Td>
                <Table.Td>{stock.quantity}</Table.Td>
                <Table.Td>
                    <NumberFormatter
                        prefix="$ "
                        value={stock.price * stock.quantity}
                        thousandSeparator
                        decimalScale={2}
                    />
                </Table.Td>
            </Table.Tr>
        );
    });

    return (
        <>
            <Title>Your stock portfolio</Title>
            <Paper shadow="md" radius="md" withBorder p="xl" w={800}>
                <Table>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Name</Table.Th>
                            <Table.Th>Symbol</Table.Th>
                            <Table.Th>Price</Table.Th>
                            <Table.Th>Quantity</Table.Th>
                            <Table.Th>Total market value</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </Paper>
        </>
    );
}
