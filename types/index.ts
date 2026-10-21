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

export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: 7.17;
  rating: number;
  stock: number;
  brand: string;
  weight: number;
  reviews: [
    {
      rating: number;
      comment: string;
      date: string;
      reviewerName: string;
      reviewerEmail: string;
    },
  ];
  meta: {
    createdAt: string;
  };
  thumbnail: unknown;
  images: string[];
};
