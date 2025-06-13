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

// Map weather names to icon component names
const weatherIconMap: Record<string, keyof typeof WiIcons> = {
  Sunny: "WiDaySunny",
  Rain: "WiRain",
  Cloudy: "WiCloudy",
  Thunderstorm: "WiThunderstorm",
  Snow: "WiSnow",
};

// Optional: Map animations per weather type
const weatherAnimationMap: Record<string, string> = {
  Sunny: "animate-float",
  Rain: "animate-bounce-soft",
  Cloudy: "animate-float",
  Thunderstorm: "animate-flash",
  Snow: "animate-float",
  Frost: "animate-float",
  Night: "animate-float",
  "Bloodmoon": "animate-wiggle",
  "Meteor Shower": "animate-flash",
  Bee: "animate-bounce-soft",
};

export const WeatherCard = () => {
  const [weatherData, setWeatherData] = useState<WeatherEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWeather()
      .then(res => {
        if (res.success) {
          setWeatherData(res.weather);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const activeWeather = weatherData.filter(w => w.active);

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
        <p className="text-gray-700 italic">No Active Weather </p>
      ) : (
        <ul className="list-none pl-0 space-y-2">
          {activeWeather.map(event => {
            const IconComponent = weatherIconMap[event.weather_name]
              ? (WiIcons[weatherIconMap[event.weather_name]] as React.ComponentType<{ className?: string }>)
              : undefined;

            const animationClass = weatherAnimationMap[event.weather_name] || "";

            return (
              <li key={event.weather_id} className="flex items-center gap-2">
                {IconComponent ? (
                  <IconComponent className={`inline text-2xl ${animationClass}`} />
                ) : (
                  <span className={`inline text-2xl ${animationClass}`}>🌤️</span>
                )}
                <span className="font-semibold">{event.weather_name}</span>
                <span className="text-xs text-green-700 ml-2">
                  ({formatDuration(event.duration)} left)
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

// Helper to format duration in seconds to mm:ss or hh:mm:ss
function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m < 60) return `${m}m${s > 0 ? ` ${s}s` : ''}`;
  const h = Math.floor(m / 60);
  const min = m % 60;
  return `${h}h${min > 0 ? ` ${min}m` : ''}${s > 0 ? ` ${s}s` : ''}`;
}
