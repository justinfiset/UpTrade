import { Paper, Skeleton, Title } from "@mantine/core";
import { useEffect, useState } from "react";

export default function BrowseStock() {
    const [earningsCalendar, setEarningsCalendar] = useState(null);
    
    useEffect(() => {
        async function fetchEarningsCalendar() {
            try {
                const response = await fetch('/api/earningsCalendar?from=2025-01-01&to=2025-01-31');
                const data = await response.json();
                setEarningsCalendar(data.earningsCalendar);
            } catch (error) {
                console.error("Error fetching earnings calendar data", error);
            }
        }
        fetchEarningsCalendar();
    }, []);

    const earningsSchedule = earningsCalendar ? earningsCalendar.map((earnings) => (
        <div>
          <p>{earnings.symbol}</p>
        </div>
      )) : <p>Chargement des donneés...</p>;

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