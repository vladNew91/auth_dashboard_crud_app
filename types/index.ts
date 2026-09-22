export type Post = {
  id: number;
  title: string;
  body: string;
  created_at?: number;
};

export type CoinInfo = {
  symbol: string;
  lastPrice: string;
  lowPrice: string;
  highPrice: string;
  closeTime: string;
  priceChangePercent: string;
  volume: string;
};
