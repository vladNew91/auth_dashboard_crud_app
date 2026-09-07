import { CoinInfo } from "@/types";
import { NextResponse } from "next/server";

export async function GET() {
  const url = `https://data-api.binance.vision/api/v3/ticker/24hr?symbol=ETHUSDT`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Binance API responded with ${res.status}` },
        { status: 502 },
      );
    }

    const data = (await res.json()) as CoinInfo;

    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch data from Binance" },
      { status: 500 },
    );
  }
}
