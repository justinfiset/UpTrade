import { getFinnhubClient } from "@/lib/finnhubClient";

export default async function handler(req, res) {
    const finnhubClient = getFinnhubClient();

    finnhubClient.quote(req.query, (error, data) => {
        if (error) {
            console.error('Error fetching stock quote:', error);
        } else {
            console.log('Stock quote:', data);
        }
    });
}