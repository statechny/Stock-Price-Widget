import { useSuspenseQuery } from '@tanstack/react-query';
import { queryStockData } from '@/app/stocks/queries';

type Props = {
  symbol: string;
};

export const useStockPriceData = ({ symbol }: Props) => {
  const { data } = useSuspenseQuery(queryStockData(symbol));

  const formatedData = data.prices.map((price: number, index: number) => ({
    time: new Date(data.times[index] * 1000).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
    price,
  }));

  const trend = calculatePriceTrend(data.prices);

  // Extract the latest price (current price)
  const currentPrice = formatedData?.[formatedData.length - 1]?.price || null;

  return { data: formatedData, trend, currentPrice };
};

const calculatePriceTrend = (prices: number[]) => {
  if (prices.length < 2) return 0;

  const firstPrice = prices[0];
  const lastPrice = prices[prices.length - 1];

  return ((lastPrice - firstPrice) / firstPrice) * 100;
};
