export type Post = {
  id: number;
  title: string;
  body: string;
  created_at: number;
  updated_at?: string | null;
  user_id: string;
  profiles?: {
    email: string;
  } | null;
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
