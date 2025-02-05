import { getFinnhubClient } from "@/lib/finnhubClient";

export async function GET(request) {
    const finnhubClient = getFinnhubClient();

    const { searchParams } = new URL(request.url);
    const symbol = searchParams.get("symbol");
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    return new Promise((resolve) => {
        finnhubClient.earningsCalendar({ from, to, symbol }, (error, data) => {
            if (error) {
                resolve(
                    new Response(
                        JSON.stringify({
                            error: "Error fetching earnings calendar data from Finnhub",
                        }),
                        {
                            status: 500,
                            headers: { "Content-Type": "application/json" },
                            z,
                        }
                    )
                );
            } else {
                resolve(
                    new Response(JSON.stringify(data), {
                        status: 200,
                        headers: { "Content-Type": "application/json" },
                    })
                );
            }
        });
    });
}
