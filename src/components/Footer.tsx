import { ComponentType } from "react";
import { GiSunflower as GiSunflowerIcon } from "react-icons/gi";

const GiSunflower = GiSunflowerIcon as ComponentType<{ className?: string }>;

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-lime-300 to-green-200 text-green-900 p-4 text-center rounded-t-1xl shadow-inner">
      <p className="text-xs flex flex-col items-center gap-1">
        <span className="flex items-center gap-2">
          <GiSunflower className="text-lg animate-spin-slow text-yellow-600" />
          Made with ❤️ by TONYYYY
        </span>
        <span className="text-[10px] text-green-700">
          Not affiliated with Roblox or Grow a Garden
        </span>
        <span className="text-[10px] text-green-600 font-mono">
          v1.1.2
        </span>
      </p>
    </footer>
  );
};
