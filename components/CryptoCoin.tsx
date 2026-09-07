"use client";

import useSWR from "swr";
import { CoinInfo } from "@/types";
import { cn } from "@/utils/utils";

const fetcher = (url: string): Promise<CoinInfo> =>
  fetch(url).then((r) => {
    if (!r.ok) throw new Error("Network error");
    return r.json();
  });

export default function CryptoCoin() {
  const { data, error, isLoading } = useSWR(`/api/ticker`, fetcher, {
    refreshInterval: 60_000,
    keepPreviousData: true,
  });

  if (error) return <div className="text-red-500">Failed to load ticker.</div>;
  if (isLoading) return <div>Loading real-time price</div>;
  if (!data) return <div>No active tickers found.</div>;

  const coin = data.symbol.slice(0, 3);
  const last_price = parseFloat(data.lastPrice).toFixed(2);
  const low_price = parseFloat(data.lowPrice).toFixed(2);
  const high_price = parseFloat(data.highPrice).toFixed(2);
  const changePercent = parseFloat(data.priceChangePercent).toFixed(2);
  const isNegative = +changePercent < 0;

  return (
    <div className="group relative mx-auto w-full">
      <div
        className={cn(
          "absolute -inset-0.5 rounded-2xl opacity-10 blur-xl transition duration-500",
          "group-hover:opacity-20",
          `${isNegative ? "bg-red-500" : "bg-emerald-500"}`,
        )}
      />
      <div className="relative rounded-2xl bg-[#171717] p-5 shadow-2xl transition-all duration-300 hover:border-zinc-800">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="font-mono text-3xl font-black tracking-tight text-zinc-100">
              {coin}
            </span>

            <span className="font-mono text-[10px] tracking-wider text-zinc-500 uppercase">
              / USD
            </span>
          </div>

          <span
            className={`rounded-lg border px-2.5 py-1 font-mono text-xs font-bold ${
              isNegative
                ? "border-red-500/10 bg-red-500/5 text-red-400"
                : "border-emerald-500/10 bg-emerald-500/5 text-emerald-400"
            }`}
          >
            {isNegative ? "" : "+"}
            {changePercent}%
          </span>
        </div>

        <div className="mb-4">
          <div className="font-mono text-3xl font-bold tracking-tight text-white">
            ${last_price}
          </div>
        </div>

        {/* High/Low Progress Indicator Graphic Divider */}
        <div className="mb-4 flex h-1.5 w-full overflow-hidden rounded-full bg-zinc-900">
          <div className="h-full w-1/3 bg-zinc-800" />
          <div
            className={`h-full w-2/5 rounded-full ${isNegative ? "bg-red-500/40" : "bg-emerald-500/40"}`}
          />
        </div>

        {/* Bottom Metadata Matrix */}
        <div className="grid grid-cols-2 gap-4 border-t border-zinc-900 pt-1 font-mono text-xs">
          <div>
            <span className="mb-0.5 block text-[10px] tracking-wider text-zinc-600 uppercase">
              24h Low
            </span>
            <span className="font-medium text-zinc-400">${low_price}</span>
          </div>

          <div className="text-right">
            <span className="mb-0.5 block text-[10px] tracking-wider text-zinc-600 uppercase">
              24h High
            </span>
            <span className="font-medium text-zinc-400">${high_price}</span>
          </div>
        </div>

        <div className="mt-4 border-t border-zinc-900/40 pt-2 text-center">
          <span className="font-mono text-[9px] text-zinc-600">
            Synced: Binance
          </span>
        </div>
      </div>
    </div>
  );
}
