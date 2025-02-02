import {
    Badge,
    Grid,
    Group,
    NumberFormatter,
    Paper,
    SimpleGrid,
    Skeleton,
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
    const [earningsCalendar, setEarningsCalendar] = useState(null);

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

        async function fetchStockChartData() {
            try {
                const from = Math.floor(
                    new Date("2023-03-01").getTime() / 1000
                ); // TODO CHANGE DINAMICLY WITH USER INPUT
                const to = Math.floor(new Date("2023-03-31").getTime() / 1000); // TODO CHANGE DINAMICLY WITH USER INPUT
                const resolution = "D"; // TODO CHANGE DINAMICLY WITH USER INPUT
                const url = `/api/stock?symbol=${stockSymbol}&from=${from}&to=${to}&resolution=${resolution}`;
                const response = await fetch(url);
                const data = await response.json();
                setChartData(data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchStockChartData();

        async function fetchEarningsCalendar() {
            try {
                const response = await fetch(
                    `/api/earningsCalendar?from=2025-01-01&to=2026-01-01&symbol=${stockSymbol}`
                );
                const data = await response.json();
                setEarningsCalendar(data.earningsCalendar);
            } catch (error) {
                console.error("Error fetching earnings calendar data", error);
            }
        }
        fetchEarningsCalendar();
    }, [stockSymbol]);

    const [chartData, setChartData] = useState(null);

    // Rechart styling
    const { colorScheme } = useMantineColorScheme();
    const isDark = colorScheme === "dark";

    const gridColor = isDark ? "#555" : "#ddd";
    const tooltipBg = isDark ? "#222" : "#fff";
    const tooltipText = isDark ? "#fff" : "#333";

    const calendar = earningsCalendar ? (
        earningsCalendar.map((earnings) => {
            const today = new Date();
            const eventDate = new Date(earnings.date);
            const eventDay = eventDate;
            eventDay.setHours(0, 0, 0, 0);
            let finished = false;
            let color = "green";
            if (eventDate < today) {
                color = "#C70039";
                finished = true;
            } else if (eventDate.getTime() === today.getTime()) {
                color = "blue";
            } else {
                color = "green";
            }

            return (
                <Group mt="md">
                    <Badge size="lg" color={color}>
                        Q{earnings.quarter} - {earnings.year}
                    </Badge>
                    <Text td={finished ? "line-through" : ""}>
                        {eventDate.toLocaleDateString("en-US", {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                        })}
                    </Text>
                </Group>
            );
        })
    ) : (
        <p>Chargement des donneés...</p>
    );

    return (
        <>
            {loading ? (
                <Text>Loading stock data...</Text>
            ) : (
                <>
                    <Group>
                        <Stack>
                            <Group>
                                <AvatarIcon
                                    imgSrc={stockData.logo}
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
                                    gradient={{
                                        from: "teal",
                                        to: "lime",
                                        deg: 90,
                                    }}
                                >
                                    {stockData.country}
                                </Badge>
                                <Badge
                                    size="xl"
                                    variant="gradient"
                                    gradient={{
                                        from: "lime",
                                        to: "teal",
                                        deg: 90,
                                    }}
                                >
                                    {stockData.exchange}
                                </Badge>
                                <Badge
                                    size="xl"
                                    variant="gradient"
                                    gradient={{
                                        from: "teal",
                                        to: "blue",
                                        deg: 90,
                                    }}
                                >
                                    {stockData.finnhubIndustry}
                                </Badge>
                            </Group>
                        </Stack>
                        <Title ml="auto" mr="md">
                            <NumberFormatter
                                prefix="$ " 
                                value={stockData.price ? stockData.price : 0.001} // TODO CHANGE FROM WIGHT API CALL DATA
                                thousandSeparator
                                decimalScale={2}
                            />
                        </Title>
                    </Group>

                    <SimpleGrid cols={{ base: 1, sm: 2 }} mt="md">
                        <Stack>
                            <Paper
                                shadow="md"
                                radius="md"
                                withBorder
                                p="lg"
                                mt="md"
                            >
                                <Text c="dimmed">Price history</Text>
                                <ResponsiveContainer width="100%" height={400}>
                                    {chartData ? (
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
                                                itemStyle={{
                                                    color: tooltipText,
                                                }}
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="price"
                                                stroke={"#c1ff72"}
                                                fill="url(#colorPrice)"
                                            />
                                        </AreaChart>
                                    ) : (
                                        <></>
                                    )}
                                </ResponsiveContainer>
                            </Paper>
                            <Skeleton visible={!earningsCalendar}>
                                {earningsCalendar ? (
                                    <Paper
                                        shadow="md"
                                        radius="md"
                                        withBorder
                                        p="lg"
                                        mt="md"
                                    >
                                        <Text c="dimmed">
                                            Earnings Calendar
                                        </Text>
                                        {calendar}
                                    </Paper>
                                ) : (
                                    <p>Loading data...</p>
                                )}
                            </Skeleton>
                        </Stack>

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
