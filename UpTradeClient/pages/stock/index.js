import { Badge, Group, Paper, Skeleton, Title, Text } from "@mantine/core";
import { useEffect, useState } from "react";

export default function BrowseStock() {
    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Ajoute un zéro si nécessaire
        const day = String(date.getDate()).padStart(2, '0');
    
        return `${year}-${month}-${day}`;
    }

    const [earningsCalendar, setEarningsCalendar] = useState(null);
    
    useEffect(() => {
        async function fetchEarningsCalendar() {
            try {
                const today = new Date();
                const eow = new Date(today);
                eow.setDate(eow.getDate() + (5 - eow.getDay() + 7) % 7);
                const from = formatDate(today);
                const to = formatDate(eow);

                const response = await fetch(`/api/earningsCalendar?from=${from}&to=${to}`);
                const data = await response.json();
                setEarningsCalendar(data.earningsCalendar);
            } catch (error) {
                console.error("Error fetching earnings calendar data", error);
            }
        }
        fetchEarningsCalendar();
    }, []);

    const earningsSchedule = earningsCalendar ? (
            earningsCalendar.toReversed().map((earnings) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const eventDate = new Date(earnings.date);
                const eventDay = eventDate;
                eventDay.setHours(0, 0, 0, 0);
                let finished = false;
                let color = "green";
                if (eventDay < today) {
                    color = "#C70039";
                    finished = true;
                } else if (eventDay.getDate() === today.getDate()) {
                    color = "blue";
                } else {
                    color = "green";
                }
    
                return (
                    <Group mt="md">
                        <Text>{earnings.symbol}</Text>
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
        <Paper>
            <Title>Browse Stocks</Title>
            <Skeleton>
                Loading earnings calendar...
            </Skeleton>
            {earningsSchedule}
        </Paper>
    );
}