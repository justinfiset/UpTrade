export default function handler(req, res) {
    const finnhub = require("finnhub");

    // Vérification de l'API Key
    const apiKey = process.env.FINNHUB_API_KEY;
    console.log("API Key utilisée:", apiKey);

    if (!apiKey) {
        return res.status(500).json({ error: "API Key non définie dans .env.local" });
    }

    const api_key = finnhub.ApiClient.instance.authentications["api_key"];
    api_key.apiKey = apiKey;

    const finnhubClient = new finnhub.DefaultApi();

    // TEST avec une requête plus simple (quote au lieu de stockCandles)
    finnhubClient.quote("AAPL", (error, data, response) => {
        if (error) {
            console.error("Erreur Finnhub:", error);
            return res.status(500).json({ error: "Erreur Finnhub", details: error });
        }
        res.status(200).json(data);
    });
}