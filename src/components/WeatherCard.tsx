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

const weatherIconMap: Record<string, keyof typeof WiIcons | string> = {
  Sunny: "WiDaySunny",
  Rain: "WiRain",
  Cloudy: "WiCloudy",
  Thunderstorm: "WiThunderstorm",
  Snow: "WiSnow",
  Night: "WiNightClear",
  Bloodmoon: "🌕",
  "Meteor Shower": "🌠",
  BeeSwarm: "🐝",
};

const weatherAnimationMap: Record<string, string> = {
  Sunny: "animate-float",
  Rain: "animate-bounce-soft",
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
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <span>🌦️</span> Current Weather Events
      </h2>
      <p className="text-green-800 mb-4 text-sm">
        Weather can affect your garden growth and item spawns!
      </p>
      {loading ? (
        <p className="text-gray-500">Loading weather data...</p>
      ) : activeWeather.length === 0 ? (
        <p className="text-gray-700 italic">No Active Weather</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeWeather.map((event) => {
            const iconEntry = weatherIconMap[event.weather_name];
            const IconComponent =
              typeof iconEntry === "string" && iconEntry in WiIcons
                ? (WiIcons[iconEntry as keyof typeof WiIcons] as React.ComponentType<{ className?: string }>)
                : undefined;
            const inlineEmoji = typeof iconEntry === "string" && !(iconEntry in WiIcons) ? iconEntry : null;
            const animationClass = weatherAnimationMap[event.weather_name] || "";
            const durationLeft = Math.max(0, Math.floor(event.end_duration_unix - now / 1000));

            return (
              <div
                key={event.weather_id}
                className="bg-white rounded-xl p-6 shadow-md flex flex-col items-center text-center border border-green-300"
              >
                <h3 className="text-lg font-bold mb-2">{event.weather_name}</h3>
                {IconComponent ? (
                  <IconComponent className={`text-6xl text-green-700 mb-2 ${animationClass}`} />
                ) : inlineEmoji ? (
                  <span className={`text-6xl mb-2 ${animationClass}`}>{inlineEmoji}</span>
                ) : (
                  <span className="text-6xl mb-2">🌤️</span>
                )}
                <p className="text-sm text-green-700">
                  {formatDuration(durationLeft)} left
                </p>
              </div>
            );
          })}
        </div>
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
