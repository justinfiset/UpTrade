export default async function handler(req, res) {
    const finnhub = require("finnhub");
    const local_key = process.env.FINNHUB_API_KEY;

    if (!local_key) {
        return res.status(500).json({ error: "API Key not defined in .env.local" });
    }

    const api_key = finnhub.ApiClient.instance.authentications["api_key"];
    api_key.apiKey = local_key;

    const finnhubClient = new finnhub.DefaultApi();

    // TEST avec une requête plus simple (quote au lieu de stockCandles)
    finnhubClient.companyProfile2(req.query, (error, data, response) => {
        if (error) {
            return res.status(500).json({ error: "Error fetching data from Finnhub" });
        }

        return res.status(200).json(data); // Envoyer uniquement les données
    });
}