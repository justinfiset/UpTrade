import { Avatar, Group, Paper, Title } from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AvatarIcon from "../../components/AvatarIcon";

export default function Stock() {
    const [stockData, setStockData] = useState(null);
    const router = useRouter();

    // Vérifie que `router` est prêt avant de récupérer la donnée
    const stockSymbol = router.isReady ? router.query.stock : null;
    useEffect(() => {
        if (!stockSymbol) return; // Ne fait rien tant que `stockSymbol` est null

        async function fetchStockData() {
            try {
                const url = `/api/stock?symbol=${stockSymbol}`;
                const response = await fetch(url);
                const data = await response.json();
                setStockData(data);
            } catch (error) {
                console.error(
                    "Erreur lors de la récupération des données du stock:",
                    error
                );
            }
        }
        fetchStockData();
    }, [stockSymbol]);

    return (
        <>
            <Group>
                {
                    stockSymbol ? (<AvatarIcon
                        src={"/api/stock-logo?symbol=" + router.query.stock}
                        name={router.query.stock}
                    />) : (<></>)
                }
                <Title>{router.query.stock}</Title>
            </Group>

            <Paper shadow="md" radius="md" withBorder p="xl">
                {stockData ? (
                    <div>
                        <p>Prix actuel : {stockData.c} USD</p>
                        <p>Ouverture : {stockData.o} USD</p>
                        <p>Plus haut : {stockData.h} USD</p>
                        <p>Plus bas : {stockData.l} USD</p>
                    </div>
                ) : (
                    <p>Chargement des données...</p>
                )}
            </Paper>
        </>
    );
}
