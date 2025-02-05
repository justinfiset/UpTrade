import { getFinnhubClient } from "../../lib/finnhubClient";

// TODO CACHE TO PREVENT MULTIPLE USELESS REQUESTS  
export default async function handler(req, res) {
    const finnhubClient = getFinnhubClient();
    
    finnhubClient.earningsCalendar(req.query, (error, data, response) => {
        if (error) {
            return res.status(500).json({ error: "Error fetching data from Finnhub" });
        }

        return res.status(200).json(data);
    });
}