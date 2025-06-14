import { useEffect, useState } from "react";
import { Dashboard } from "./pages/Dashboard";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { fetchWeather } from "./services/services";

interface WeatherEvent {
  weather_id: string;
  weather_name: string;
  active: boolean;
  duration: number;
  start_duration_unix: number;
  end_duration_unix: number;
}

const weatherBackgroundMap: Record<string, string> = {
  Sunny: "bg-sunny",
  Rain: "bg-rain",
  Snow: "bg-snow",
  Thunderstorm: "bg-thunderstorm",
  Night: "bg-night",
  Bloodmoon: "bg-bloodmoon",
  BeeSwarm: "bg-beeswarm",
};

const PlayGameButton = () => (
  <div className="w-full flex justify-center mt-2 z-10 relative">
    <a
      href="https://www.roblox.com/games/126884695634066/Grow-a-Garden"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block px-6 py-2 bg-gradient-to-r from-green-400 to-lime-300 text-green-900 font-bold rounded-full shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 animate-bounce"
    >
      <span className="tracking-wider animate-pulse">PLAY THE GAME NOW</span>
    </a>
  </div>
);

function App() {
  const [activeWeather, setActiveWeather] = useState<string>("Sunny");

  useEffect(() => {
    const fetchActiveWeather = async () => {
      try {
        const response = await fetchWeather();
        const weatherData: WeatherEvent[] = Array.isArray(response.weather)
          ? response.weather
          : [];
        const active = weatherData.find((w) => w.active);
        setActiveWeather(active?.weather_name || "Sunny");
      } catch (error) {
        console.error("Failed to fetch weather", error);
        setActiveWeather("Sunny");
      }
    };

    fetchActiveWeather();
    const interval = setInterval(fetchActiveWeather, 60000);
    return () => clearInterval(interval);
  }, []);

  const bgClass = weatherBackgroundMap[activeWeather] ?? "bg-sunny";

  return (
    <div className={`relative min-h-screen w-full ${bgClass} bg-cover bg-center transition-all duration-500`}>
      {/* Dark overlay behind everything */}
      <div className="absolute inset-0 bg-black/30 backdrop-brightness-90 z-0" />

      {/* All content layered on top */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <PlayGameButton />
        <main className="flex-grow">
          <Dashboard />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
