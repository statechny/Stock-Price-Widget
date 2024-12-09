This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Stock Market Dashboard

This project is a real-time stock market dashboard built with Next.js, showcasing real-time stock prices and trends for selected companies like Microsoft, Apple, and Nvidia.

The dashboard features:

- Real-time polling of stock prices every minute.
- Interactive line charts for stock price trends.
- Display of current stock prices and trends (upward/downward percentage).
- Responsive design for desktop, tablet, and mobile views.
- Server-side rendering (SSR) for initial data fetching.
- Smooth client-side polling using React Query.

## Technologies Used

- Next.js: Framework for React with server-side rendering (SSR).
- React Query: For data fetching, caching, and automatic refetching.
- Recharts: For interactive and visually appealing charts.
- TailwindCSS: For styling and responsive layouts.
- Axios: For HTTP requests.
- TypeScript: To ensure type safety across the project.


## Features

1. Real-Time Stock Data:
   Fetches and updates stock prices for:
   - Microsoft (MSFT)
   - Apple (AAPL)
   - Nvidia (NVDA)
2. Dynamic Trends:
   - Displays the current price and trend percentage (upward or downward) for each stock.
3. Interactive Charts:
   - Visualizes stock price changes over time using line charts.
4. Responsive Design:
   - Optimized for desktop, tablet, and mobile devices.
5. Server-Side Rendering:
   - Stock data is pre-fetched and hydrated on the server for better performance.
6. Mock Data Support:
   - Uses mock data for development but can fetch live API data by commenting out one line of code in the API handler.

## Getting Started

### Prerequisites
Ensure you have the following installed on your system:
- Node.js: v20 or later
- npm, yarn, or pnpm

### Setup Instructions

1. Clone the repository:
```bash
git clone git@github.com:statechny/Stock-Price-Widget.git
cd Stock-Price-Widget
```
2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Create a .env.local file in the root directory and add the following environment variables:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000 # Required
ALPHA_VANTAGE_API_KEY=your-alpha-vantage-api-key  # Required For real Stock data fetching
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

### Notes

- Mock Data: The app uses a local stock-data.json file for stock data by default.
- Switch to API Data: Comment out the mocked-data logic in the pages/api/stocks.ts handler to enable live stock price fetching.


# Directory Structure
```plaintext
├── app/
│   ├── stocks/
│   │   ├── components/
│   │   │   └── stock-price-widget.tsx  # Stock widget component
│   │   ├── hooks/
│   │   │   └── use-stock-price-data.ts  # React Query hook for fetching stock data
│   │   ├── queries/
│   │   │   └── query-stock-data.ts   # Query definitions
│   └── page.tsx                      # Main dashboard page
├── components/
│   └── ui/                           # Shared UI components (Card, Chart, etc.)
├── lib/
│   ├── axios.ts                      # Axios client configuration
│   └── react-query.ts                # React Query configuration
├── public/                           # Static assets
└── README.md                         # Project documentation
```
