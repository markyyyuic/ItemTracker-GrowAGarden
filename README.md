# Grow a Garden Tracker

A real-time web dashboard for tracking Grow a Garden (Roblox) item stocks, weather events, and restock timers.

## Features

- **Live Stock Tracking:**
  - View current stock for Fruits & Seeds, Eggs, Garden Gear, Bee Event items, and Cosmetics.
  - Auto-refreshes when any category restocks (no manual page refresh needed).
- **Weather Event Monitoring:**
  - See all active weather events that affect garden growth and item spawns.
  - Weather data auto-refreshes every 10 seconds.
- **Restock Timers:**
  - Each category displays a live countdown to the next restock.
  - Timers update every second for accuracy.
- **Modern UI:**
  - Responsive, mobile-friendly design using Tailwind CSS.
  - Custom icons and subtle animations for a playful, game-inspired look.
- **Play Now Button:**
  - Quick access to the Grow a Garden Roblox game.
- **Not Affiliated:**
  - This is a fan-made tool and is not affiliated with Roblox or the Grow a Garden game.

## Tech Stack

- **React** (with functional components and hooks)
- **TypeScript**
- **Tailwind CSS** for styling
- **react-icons** for iconography
- **Vite** or Create React App (depending on your setup)

## How It Works

- Fetches live data from the [Grow a Garden API](https://growagardenapi.vercel.app/api).
- Polls the API for stock and weather updates at regular intervals.
- Updates the UI in real time as soon as restocks or weather changes occur.

## Project Structure

```
Grow-A-Garden-ItemTracker/
├── public/
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── StockTable.tsx
│   │   └── WeatherCard.tsx
│   ├── pages/
│   │   └── Dashboard.tsx
│   ├── services/
│   │   └── services.ts
│   ├── App.tsx
│   └── index.tsx
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

## Setup & Development

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Start the development server:**
   ```sh
   npm start
   ```
3. **Build for production:**
   ```sh
   npm run build
   ```

## API Endpoints Used
- `/api/stock/GetStock` — Get current stock for all categories
- `/api/stock/Restock-Time` — Get restock timers for each category
- `/api/GetWeather` — Get current weather events
- `/api/Item-Info` — (optional, for future expansion)

## Customization
- You can easily add new categories or weather types by updating the mappings in `StockTable.tsx` and `WeatherCard.tsx`.
- Styling and icons can be customized via Tailwind and `react-icons`.

## Credits
- UI/UX, code, and concept by TONYYYY
- Icons from [react-icons](https://react-icons.github.io/react-icons/)
- Data from the Grow a Garden API (unofficial)

---

> **Disclaimer:** This project is not affiliated with Roblox or the Grow a Garden game. For entertainment and educational purposes only.
