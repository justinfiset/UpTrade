import { getFinnhubClient } from "../../lib/finnhubClient";

export default async function handler(req, res) {
    const finnhubClient = getFinnhubClient();

    finnhubClient.stockCandles(req.query.symbol, req.query.resolution, req.query.from, req.query.to, (error, data, response) => {
        if (error) {
            return res.status(500).json({ error: "Error fetching data from Finnhub" });
        }

        const candleData = data.map((candle) => {
            const date = new Date(candle.t * 1000).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
            });

            return {
                date: date,
                priec: candle.c,
            };
        });
        return res.status(200).json(data);
    });
}