import { NextApiRequest, NextApiResponse } from 'next';
import { stockApiClient } from '@/lib/axios';
import stockData from '@/stock-data.json';

type StockData = {
  [key: string]: {
    times: number[];
    prices: number[];
  };
};

const typedStockData: StockData = stockData;

const alphaVantageApiKey = process.env.ALPHA_VANTAGE_API_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { symbol } = req.query;

    if (!symbol || typeof symbol !== 'string') {
      res.status(400).json({ error: 'Invalid or missing symbol parameter' });
      return;
    }

    // Due to Alpha Vantage's rate limits, mock data is being served. Comment out the following lines to test with the real API.
    const mockData = typedStockData[symbol];
    if (!mockData) {
      res.status(404).json({ error: `No data found for symbol: ${symbol}` });
      return;
    }
    res.status(200).json(mockData);
    //

    const response = await stockApiClient.get(
      `/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${alphaVantageApiKey}`
    );
    const data = response.data;

    if (data['Information']) {
      res.status(429).json({ error: data['Information'] });
      return;
    }

    if (data['Note']) {
      res.status(429).json({ error: data['Note'] });
      return;
    }

    if (data['Error Message']) {
      res.status(400).json({ error: data['Error Message'] });
      return;
    }

    const timeSeries = data['Time Series (5min)'];
    const times = Object.keys(timeSeries).reverse();
    const prices = times.map((time) => parseFloat(timeSeries[time]['1. open']));

    res.status(200).json({
      times: times.map((time) => new Date(time).getTime() / 1000), // Convert to epoch time
      prices,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stock data' });
  }
}
