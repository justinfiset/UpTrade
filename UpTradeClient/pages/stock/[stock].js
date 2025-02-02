import {
    Badge,
    Grid,
    Group,
    Paper,
    SimpleGrid,
    Stack,
    Table,
    Text,
    Title,
    useMantineColorScheme,
    useMantineTheme,
} from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AvatarIcon from "../../components/AvatarIcon";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

export default function Stock() {
    const [stockData, setStockData] = useState(null);
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    // Vérifie que `router` est prêt avant de récupérer la donnée
    const stockSymbol = router.isReady ? router.query.stock : null;
    useEffect(() => {
        if (!stockSymbol) return; // Ne fait rien tant que `stockSymbol` est null

        async function fetchStockData() {
            setLoading(true);

            try {
                const url = `/api/stock?symbol=${stockSymbol}`;
                const response = await fetch(url);
                const data = await response.json();
                setStockData(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        }
        fetchStockData();
    }, [stockSymbol]);

    const chartData = [
        { date: "Mar 22", Price: 100 },
        { date: "Mar 23", Price: 110 },
        { date: "Mar 24", Price: 130 },
        { date: "Mar 25", Price: 125 },
        { date: "Mar 26", Price: 120 },
        { date: "Mar 27", Price: 130 },
        { date: "Mar 28", Price: 135 },
        { date: "Mar 29", Price: 115 },
        { date: "Mar 30", Price: 105 },
    ];

    // Rechart styling
    const { colorScheme } = useMantineColorScheme();
    const isDark = colorScheme === "dark";

    const gridColor = isDark ? "#555" : "#ddd";
    const tooltipBg = isDark ? "#222" : "#fff";
    const tooltipText = isDark ? "#fff" : "#333";

    return (
        <>
            {loading ? (
                <Text>Loading stock data...</Text>
            ) : (
                <>
                    <Stack>
                        <Group>
                            <AvatarIcon
                                src={
                                    "/api/stock-logo?symbol=" +
                                    router.query.stock
                                }
                                id="logo"
                                name={router.query.stock}
                            />
                            <Title>
                                {stockData.name} - {router.query.stock}
                            </Title>
                        </Group>
                        <Group>
                            <Badge
                                size="xl"
                                variant="gradient"
                                gradient={{ from: "teal", to: "lime", deg: 90 }}
                            >
                                {stockData.country}
                            </Badge>
                            <Badge
                                size="xl"
                                variant="gradient"
                                gradient={{ from: "lime", to: "teal", deg: 90 }}
                            >
                                {stockData.exchange}
                            </Badge>
                            <Badge
                                size="xl"
                                variant="gradient"
                                gradient={{ from: "teal", to: "blue", deg: 90 }}
                            >
                                {stockData.finnhubIndustry}
                            </Badge>
                        </Group>
                    </Stack>

                    <SimpleGrid cols={{ base: 1, sm: 2 }} mt="md">
                        <Paper
                            shadow="md"
                            radius="md"
                            withBorder
                            p="lg"
                            mt="md"
                        >
                            <Text c="dimmed">Price history</Text>
                            <ResponsiveContainer width="100%" height={400}>
                                <AreaChart data={chartData}>
                                    <defs>
                                        <linearGradient
                                            id="colorPrice"
                                            x1="0"
                                            y1="0"
                                            x2="0"
                                            y2="1"
                                        >
                                            <stop
                                                offset="5%"
                                                stopColor="#00bf86"
                                                stopOpacity={0.8}
                                            />
                                            <stop
                                                offset="95%"
                                                stopColor="#00bf63"
                                                stopOpacity={0.4}
                                            />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <CartesianGrid
                                        horizontal
                                        vertical={false}
                                        strokeDasharray="1 6"
                                        stroke={gridColor}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: tooltipBg,
                                            color: tooltipText,
                                            border: "none",
                                            borderRadius: 5,
                                        }}
                                        itemStyle={{ color: tooltipText }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="Price"
                                        stroke={"#c1ff72"}
                                        fill="url(#colorPrice)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </Paper>

                        <Stack>
                            <Paper
                                shadow="md"
                                radius="md"
                                withBorder
                                p="lg"
                                mt="md"
                            >
                                <Text c="dimmed">Market informations</Text>
                                <Table>
                                    <Table.Tr>
                                        <Table.Th>Current Price</Table.Th>
                                        <Table.Td>{stockData.c} USD</Table.Td>
                                    </Table.Tr>
                                    <Table.Tr>
                                        <Table.Th>Highest</Table.Th>
                                        <Table.Td>{stockData.h} USD</Table.Td>
                                    </Table.Tr>
                                    <Table.Tr>
                                        <Table.Th>Lowest</Table.Th>
                                        <Table.Td>{stockData.l} USD</Table.Td>
                                    </Table.Tr>
                                    <Table.Tr>
                                        <Table.Th>Open price</Table.Th>
                                        <Table.Td>{stockData.o} USD</Table.Td>
                                    </Table.Tr>
                                </Table>
                            </Paper>
                            <Paper
                                shadow="md"
                                radius="md"
                                withBorder
                                p="lg"
                                mt="md"
                            >
                                <Text c="dimmed">General Informations</Text>
                                <Table>
                                    <Table.Tr>
                                        <Table.Th>
                                            Market Capitalization
                                        </Table.Th>
                                        <Table.Td>
                                            {stockData.marketCapitalization}
                                        </Table.Td>
                                    </Table.Tr>
                                    <Table.Tr>
                                        <Table.Th>Oustanding Shares</Table.Th>
                                        <Table.Td>
                                            {stockData.shareOutstanding}
                                        </Table.Td>
                                    </Table.Tr>
                                </Table>
                            </Paper>
                        </Stack>
                    </SimpleGrid>
                </>
            )}
        </>
    );
}
