import { Dashboard } from "./pages/Dashboard";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

const PlayGameButton = () => (
  <div className="w-full flex justify-center mt-2">
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
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <PlayGameButton />
      <main className="flex-grow bg-gray-50">
        <Dashboard />
      </main>
      <Footer />
    </div>
  );
}

export default App;
