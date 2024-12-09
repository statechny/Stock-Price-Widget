'use client';

import { TrendingUp, TrendingDown } from 'lucide-react';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useStockPriceData } from '@/app/stocks/hooks';

const chartConfig = {
  price: {
    label: 'Price',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

type Props = {
  symbol: string;
  companyName: string;
  description: string;
};

export const StockPriceWidget = ({
  symbol,
  companyName,
  description,
}: Props) => {
  const { data, trend, currentPrice } = useStockPriceData({ symbol });

  return (
    <Card>
      <CardHeader>
        <CardTitle>{companyName}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className={''}>
        <ChartContainer config={chartConfig}>
          <LineChart data={data}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="time" hide={true} />
            <YAxis domain={['dataMin', 'dataMax']} hide={true} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line dataKey="price" type="natural" strokeWidth={2} dot={false} />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="font-bold text-lg">
          ${currentPrice?.toFixed(2) ?? 'N/A'}
        </div>
        <div className="flex gap-2 font-medium leading-none">
          {trend > 0 ? (
            <>
              Trending up by {trend.toFixed(2)}%
              <TrendingUp className="h-4 w-4 text-green-500" />
            </>
          ) : trend < 0 ? (
            <>
              Trending down by {Math.abs(trend).toFixed(2)}%
              <TrendingDown className="h-4 w-4 text-red-500" />
            </>
          ) : (
            <>No significant change this period</>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};
