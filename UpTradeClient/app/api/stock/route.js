import { getFinnhubClient } from "@/lib/finnhubClient";

export async function GET(req) {
    const finnhubClient = getFinnhubClient();
    const { searchParams } = new URL(req.url);
    const symbol = searchParams.get("symbol");

    if (!symbol) {
        return new Response(JSON.stringify({ error: "Missing stock symbol" }), { status: 400 });
    }

    return new Promise((resolve) => {
        finnhubClient.companyProfile2({ symbol }, (error, data) => {
            if (error) {
                console.error("Error fetching stock data:", error);
                resolve(new Response(JSON.stringify({ error: "Error fetching data from Finnhub" }), { status: 500 }));
            } else {
                resolve(new Response(JSON.stringify(data), { status: 200 }));
            }
        });
    });
}