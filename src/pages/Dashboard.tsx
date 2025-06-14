// pages/Dashboard.tsx
import { StockTable } from "../components/StockTable";
import { WeatherCard } from "../components/WeatherCard";

export const Dashboard = () => (
  <div className="max-w-6xl mx-auto p-6 space-y-6">
    <WeatherCard />
    <StockTable />

  </div>
);