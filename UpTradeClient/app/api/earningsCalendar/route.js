import { getFinnhubClient } from "@/lib/finnhubClient";

export async function GET() {
    const finnhubClient = getFinnhubClient();
    
    finnhubClient.earningsCalendar(req.query, (error, data, response) => {
        if (error) {
            return res.status(500).json({ error: "Error fetching data from Finnhub" });
        }

        return res.status(200).json(data);
    });
}