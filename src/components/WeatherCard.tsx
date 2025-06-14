import { useEffect, useState } from "react";
import { fetchWeather } from "../services/services";
import * as WiIcons from "react-icons/wi";

interface WeatherEvent {
  weather_id: string;
  weather_name: string;
  active: boolean;
  duration: number;
  start_duration_unix: number;
  end_duration_unix: number;
}

// Updated: Only valid WiIcons or emoji
const weatherIconMap: Record<string, keyof typeof WiIcons | string> = {
  Sunny: "WiDaySunny",
  Rain: "WiRain",
  Cloudy: "WiCloudy",
  Thunderstorm: "WiThunderstorm",
  Snow: "WiSnow",
  Frost: "WiSnowflakeCold",
  Night: "WiNightClear",
  Bloodmoon: "🌕", // emoji fallback
  "Meteor Shower": "🌠", // emoji fallback
  BeeSwarm: "🐝", // emoji fallback
};

const weatherAnimationMap: Record<string, string> = {
  Sunny: "animate-float",
  Rain: "animate-bounce-soft",
  Cloudy: "animate-float",
  Thunderstorm: "animate-flash",
  Snow: "animate-float",
  Frost: "animate-float",
  Night: "animate-float",
  Bloodmoon: "animate-wiggle",
  "Meteor Shower": "animate-flash",
  BeeSwarm: "animate-bounce-soft",
};

export const WeatherCard = () => {
  const [weatherData, setWeatherData] = useState<WeatherEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    let isMounted = true;

    const getWeather = async () => {
      const res = await fetchWeather();
      if (isMounted && res.success) {
        setWeatherData(res.weather);
        setLoading(false);
      }
    };

    getWeather();

    const fetchInterval = setInterval(getWeather, 10000);
    const timeInterval = setInterval(() => setNow(Date.now()), 1000);

    return () => {
      isMounted = false;
      clearInterval(fetchInterval);
      clearInterval(timeInterval);
    };
  }, []);

  const activeWeather = weatherData.filter((w) => w.active);

  return (
    <div className="bg-gradient-to-br from-green-100 via-lime-50 to-green-200 p-6 rounded-2xl shadow-lg border border-green-200">
      <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
        <span>🌦️</span> Current Weather Events
      </h2>
      <p className="text-green-800 mb-3 text-sm">
        Weather can affect your garden growth and item spawns!
      </p>
      {loading ? (
        <p className="text-gray-500">Loading weather data...</p>
      ) : activeWeather.length === 0 ? (
        <p className="text-gray-700 italic">No Active Weather</p>
      ) : (
        <ul className="list-none pl-0 space-y-2">
          {activeWeather.map((event) => {
            const iconEntry = weatherIconMap[event.weather_name];
            const IconComponent =
              typeof iconEntry === "string" && iconEntry in WiIcons
                ? (WiIcons[iconEntry as keyof typeof WiIcons] as React.ComponentType<{ className?: string }>)
                : undefined;
            const inlineEmoji = typeof iconEntry === "string" && !(iconEntry in WiIcons) ? iconEntry : null;
            const animationClass = weatherAnimationMap[event.weather_name] || "";

            const durationLeft = Math.max(0, Math.floor(event.end_duration_unix - now / 1000));

            if (!IconComponent && !inlineEmoji) {
              console.warn(`Missing icon for weather: ${event.weather_name}`);
            }

            return (
              <li key={event.weather_id} className="flex items-center gap-2">
                {IconComponent ? (
                  <IconComponent className={`inline text-2xl ${animationClass}`} />
                ) : inlineEmoji ? (
                  <span className={`inline text-2xl ${animationClass}`}>{inlineEmoji}</span>
                ) : (
                  <span className={`inline text-2xl ${animationClass}`}>🌤️</span>
                )}
                <span className="font-semibold">{event.weather_name}</span>
                <span className="text-xs text-green-700 ml-2">
                  ({formatDuration(durationLeft)} left)
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m < 60) return `${m}m${s > 0 ? ` ${s}s` : ''}`;
  const h = Math.floor(m / 60);
  const min = m % 60;
  return `${h}h${min > 0 ? ` ${min}m` : ''}${s > 0 ? ` ${s}s` : ''}`;
}
