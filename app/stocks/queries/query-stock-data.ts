import { queryOptions } from '@tanstack/react-query';
import { apiClient } from '@/lib/axios';

type StockData = {
  times: number[];
  prices: number[];
};

export const fetchStockData = async (symbol: string): Promise<StockData> => {
  const response = await apiClient.get(`/api/stocks?symbol=${symbol}`);
  return response.data;
};

export const queryStockData = (symbol: string) =>
  queryOptions({
    queryKey: ['stockData', symbol],
    queryFn: async () => await fetchStockData(symbol),
    staleTime: 60000, // Cache data for 1 minute
    refetchInterval: 60000, // Poll every 1 minute
  });
