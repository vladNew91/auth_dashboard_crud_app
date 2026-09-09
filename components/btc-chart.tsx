"use client";

import { useState } from "react";
import useSWR from "swr";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";
import { BTCChartSkeleton } from "./BTCChartSkeleton";

const RANGES = ["1D", "1W", "1M", "3M", "1Y"] as const;
type Range = (typeof RANGES)[number];

type Point = { time: number; price: number };
type ApiResponse = { range: string; data: Point[] };

const chartConfig = {
  price: {
    label: "BTC/USDT",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const fetcher = (url: string): Promise<ApiResponse> =>
  fetch(url).then((r) => {
    if (!r.ok) throw new Error("Network error");
    return r.json();
  });

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const usdPrecise = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

function formatTime(ms: number, range: Range) {
  const d = new Date(ms);
  if (range === "1D") {
    return d.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  if (range === "1W" || range === "1M") {
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }
  return d.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
}

export function BtcChart() {
  const [range, setRange] = useState<Range>("1M");
  const { data, error, isLoading } = useSWR(
    `/api/btc-history?range=${range}`,
    fetcher,
    { refreshInterval: 60_000, keepPreviousData: true },
  );

  if (!data) return <BTCChartSkeleton />;

  const points = data.data ?? [];
  const first = points[0].price;
  const last = points[points.length - 1].price;
  const change = first && last ? last - first : 0;
  const changePct = first ? (change / first) * 100 : 0;
  const isUp = change >= 0;

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col gap-4 border-b sm:flex-row sm:items-start sm:justify-between">
        <div className="grid gap-1">
          <CardDescription>Bitcoin · BTC/USDT · Binance</CardDescription>
          <CardTitle className="text-3xl font-semibold tabular-nums">
            {last ? usdPrecise.format(last) : "—"}
          </CardTitle>
          {!isLoading && !error && first ? (
            <div
              className={`flex items-center gap-1 text-sm font-medium ${
                isUp ? "text-chart-1" : "text-destructive"
              }`}
            >
              <span className="tabular-nums">
                {isUp ? "+" : ""}
                {usdPrecise.format(change)} ({isUp ? "+" : ""}
                {changePct.toFixed(2)}%)
              </span>
              <span className="text-muted-foreground">· {range}</span>
            </div>
          ) : (
            <div className="h-[20px]"></div>
          )}
        </div>

        <div
          role="group"
          aria-label="Select time range"
          className="bg-muted flex gap-1 rounded-lg p-1"
        >
          {RANGES.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRange(r)}
              aria-pressed={r === range}
              className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
                r === range
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        {error ? (
          <div className="text-muted-foreground flex h-[400px] items-center justify-center text-sm">
            Failed to load price data. Please try again.
          </div>
        ) : isLoading && points.length === 0 ? (
          <div className="text-muted-foreground flex h-[400px] items-center justify-center text-sm">
            Loading price history…
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="h-[400px] w-full">
            <AreaChart data={points} margin={{ left: 12, right: 12, top: 8 }}>
              <defs>
                <linearGradient id="fillPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-price)"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-price)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="time"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(v) => formatTime(v, range)}
              />
              <YAxis
                domain={["auto", "auto"]}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                width={64}
                tickFormatter={(v) => usd.format(v)}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    labelFormatter={(_, payload) =>
                      payload?.[0]
                        ? new Date(payload[0].payload.time).toLocaleString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )
                        : ""
                    }
                    formatter={(value) => (
                      <span className="tabular-nums">
                        {usdPrecise.format(Number(value))}
                      </span>
                    )}
                  />
                }
              />
              <Area
                dataKey="price"
                type="monotone"
                stroke="var(--color-price)"
                strokeWidth={2}
                fill="url(#fillPrice)"
                dot={false}
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
