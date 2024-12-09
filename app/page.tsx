import { isAxiosError } from 'axios';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/react-query';
import { queryStockData } from '@/app/stocks/queries';
import { StockPriceWidget } from '@/app/stocks/components';

const stockSymbols = ['MSFT', 'AAPL', 'NVDA'] as const;

type StockSymbol = (typeof stockSymbols)[number];

const symbolToNameMap: Record<StockSymbol, string> = {
  MSFT: 'Microsoft',
  AAPL: 'Apple',
  NVDA: 'Nvidia',
};

export default async function Home() {
  const queryClient = getQueryClient();

  try {
    // Prefetch data for all stock symbols
    await Promise.all(
      stockSymbols.map((symbol) =>
        queryClient.fetchQuery(queryStockData(symbol))
      )
    );

    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
          <main className="grid grid-cols-1 gap-8 row-start-2 items-center w-full sm:grid-cols-2 lg:grid-cols-3">
            {stockSymbols.map((symbol) => (
              <StockPriceWidget
                key={symbol}
                symbol={symbol}
                companyName={symbolToNameMap[symbol] || symbol}
                description={symbol}
              />
            ))}
          </main>
        </div>
      </HydrationBoundary>
    );
  } catch (error) {
    const message = isAxiosError(error)
      ? error.response?.data?.error
      : 'An unexpected error occurred';

    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <h1 className="text-3xl font-bold text-destructive">
          Something went wrong
        </h1>
        <p className="mt-4 text-lg text-muted-foreground text-center">
          {message}
        </p>
      </div>
    );
  }
}
