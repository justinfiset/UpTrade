export default async function handler(req, res) {
    const { symbol } = req.query;

    if (!symbol) {
        return res.status(400).json({ error: "Le symbole est requis" });
    }

    try {
        const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${process.env.FINNHUB_API_KEY}`);
        const data = await response.json();

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des données" });
    }
}