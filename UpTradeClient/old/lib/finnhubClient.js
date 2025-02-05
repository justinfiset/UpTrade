export function getFinnhubClient() {
    const finnhub = require("finnhub");
    const local_key = process.env.FINNHUB_API_KEY;

    if (!local_key) {
        return res.status(500).json({ error: "API Key not defined in .env.local" });
    }

    const api_key = finnhub.ApiClient.instance.authentications["api_key"];
    api_key.apiKey = local_key;
    
    return new finnhub.DefaultApi();
}