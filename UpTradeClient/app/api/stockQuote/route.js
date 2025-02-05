import { getFinnhubClient } from "@/lib/finnhubClient";
import { resolve } from "styled-jsx/css";

export async function GET(req) {
    const finnhubClient = getFinnhubClient();

    const { searchParams } = new URL(req.url);
    const symbol = searchParams.get("symbol");

    return new Promise((resolve) => {
        finnhubClient.quote(symbol, (error, data) => {
            if (error) {
                resolve(new Response(JSON.stringify(error), { status: 500 }));
                console.error("Error fetching stock quote:", error);
            } else {
                resolve(new Response(JSON.stringify(data), { status: 200 }));
            }
        });
    })
}