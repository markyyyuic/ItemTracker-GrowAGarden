import { GiPlantRoots as RawGiPlantRoots } from "react-icons/gi";
import React, { ComponentType } from "react";

// ✅ Cast the icon to a valid React component type
const GiPlantRoots = RawGiPlantRoots as ComponentType<{ className?: string }>;

export const Header = () => {
  return (
    <header className="bg-gradient-to-r from-green-400 to-lime-400 text-white p-6 shadow-lg flex flex-col items-center gap-2 rounded-b-3xl">
      <div className="flex items-center gap-3">
        <GiPlantRoots className="text-4xl drop-shadow-lg animate-float" />
        <h1 className="text-3xl font-extrabold tracking-tight drop-shadow-lg">
          Grow a Garden Tracker
        </h1>
      </div>
      <p className="text-base font-medium italic text-green-900/90">
        🌱 Tracks Grow A Garden items, weather, and events in real time!
      </p>
    </header>
  );
};

