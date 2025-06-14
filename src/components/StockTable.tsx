import { useEffect, useState, useRef } from "react";
import { fetchStock, fetchRestockTime } from "../services/services";
import {
  GiFruitBowl,
  GiEggClutch,
  GiGardeningShears,
  GiHoneycomb,
  GiLipstick,
} from "react-icons/gi";
import React, { ComponentType } from "react";

type StockCategory = {
  name: string;
  value: number;
  image?: string;
  emoji?: string;
};

type StockData = {
  gearStock: StockCategory[];
  eggStock: StockCategory[];
  seedsStock: StockCategory[];
  honeyStock: StockCategory[];
  cosmeticsStock: StockCategory[];
};

type RestockTimes = {
  [key: string]: {
    timestamp: number;
    countdown: string;
    LastRestock: string;
    timeSinceLastRestock: string;
  };
};

const categoryIconMap: Record<string, ComponentType<{ className?: string }>> = {
  seedsStock: GiFruitBowl as ComponentType<{ className?: string }>,
  eggStock: GiEggClutch as ComponentType<{ className?: string }>,
  gearStock: GiGardeningShears as ComponentType<{ className?: string }>,
  honeyStock: GiHoneycomb as ComponentType<{ className?: string }>,
  cosmeticsStock: GiLipstick as ComponentType<{ className?: string }>,
};

export const StockTable = () => {
  const [stock, setStock] = useState<StockData | null>(null);
  const [restockTimes, setRestockTimes] = useState<RestockTimes | null>(null);
  const [now, setNow] = useState(Date.now());

  const stockRef = useRef<StockData | null>(null);
  const restockRef = useRef<RestockTimes | null>(null);

 const fetchAll = async () => {
  try {
    const [stockData, restockData] = await Promise.all([
      fetchStock(),
      fetchRestockTime(),
    ]);
    setStock(stockData);
    setRestockTimes(restockData);
    stockRef.current = stockData;
    restockRef.current = restockData;
  } catch (error) {
    console.error("Error fetching stock or restock data:", error);
  }
};

useEffect(() => {
  const nowInterval = setInterval(() => setNow(Date.now()), 10000);
  const pollInterval = setInterval(async () => {
    try {
      const [newStock, newRestock] = await Promise.all([
        fetchStock(),
        fetchRestockTime(),
      ]);

      if (JSON.stringify(newStock) !== JSON.stringify(stockRef.current)) {
        setStock(newStock);
        stockRef.current = newStock;
      }
      if (JSON.stringify(newRestock) !== JSON.stringify(restockRef.current)) {
        setRestockTimes(newRestock);
        restockRef.current = newRestock;
      }

      console.log("Stock and restock data refreshed at", new Date().toLocaleTimeString());
    } catch (error) {
      console.error("Polling error:", error);
    }
  }, 3000);

  return () => {
    clearInterval(nowInterval);
    clearInterval(pollInterval);
  };
}, []);


  const getCountdown = (timestamp?: number) => {
    if (!timestamp) return "--:--:--";
    let diff = Math.max(0, timestamp - now);
    let hours = Math.floor(diff / (1000 * 60 * 60));
    let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  if (!stock || !restockTimes) {
    return (
      <div className="bg-white shadow rounded-2xl p-6 mt-4">
        <h2 className="text-2xl font-bold mb-3">Current Stock</h2>
        <p>Loading your garden items...</p>
      </div>
    );
  }

  const categories = [
    { key: "seedsStock", label: "Fruits & Seeds", restockKey: "seeds" },
    { key: "eggStock", label: "Eggs", restockKey: "egg" },
    { key: "gearStock", label: "Garden Gear", restockKey: "gear" },
    { key: "honeyStock", label: "Bee Event", restockKey: "Event" },
    { key: "cosmeticsStock", label: "Cosmetics", restockKey: "cosmetic" },
  ];

  return (
    <div className="flex flex-wrap gap-4 mt-4 w-full justify-center">
      {categories.map((cat) => {
        const items = (stock as any)[cat.key] as StockCategory[];
        const restock = restockTimes[cat.restockKey];
        const Icon = categoryIconMap[cat.key];
        return (
          <div
            key={cat.key}
            className="bg-gradient-to-br from-lime-50 via-green-100 to-lime-200 shadow-lg rounded-2xl p-6 w-full sm:w-[48%] lg:w-[32%] border border-green-100"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3">
              <h3 className="text-xl font-bold flex items-center gap-2">
                {Icon ? <Icon className="text-xl mr-1" /> : null} {cat.label}
              </h3>
              <span className="text-sm text-green-700 mt-1 sm:mt-0">
                Next Restock:{" "}
                <span className="font-mono bg-green-200 px-2 py-1 rounded">
                  {getCountdown(restock?.timestamp)}
                </span>
              </span>
            </div>
            <div className="flex flex-col gap-3 w-full">
              {items.length === 0 ? (
                <p className="italic text-gray-400">
                  No items in stock. Check back soon!
                </p>
              ) : (
                items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between border border-green-200 rounded-xl bg-white px-4 py-2 hover:bg-green-50 transition"
                  >
                    <div className="flex items-center gap-3">
                      <ItemImageOrEmoji item={item} />
                      <span className="font-medium text-gray-800">
                        {item.name}
                      </span>
                    </div>
                    <span className="text-green-700 font-semibold">
                      Stock: {item.value}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const ItemImageOrEmoji = ({ item }: { item: StockCategory }) => {
  const [imgError, setImgError] = useState(false);
  if (!imgError && item.image) {
    return (
      <img
        src={item.image}
        alt={item.name}
        className="w-10 h-10 object-contain rounded border border-green-100 shadow"
        onError={() => setImgError(true)}
      />
    );
  }
  return item.emoji ? (
    <span className="text-3xl">{item.emoji}</span>
  ) : (
    <span className="text-2xl">🌱</span>
  );
};
