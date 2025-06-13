const API_BASE_URL = 'https://growagardenapi.vercel.app/api';

const handleFetch = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
};

export const fetchStock = () => handleFetch(`${API_BASE_URL}/stock/GetStock`);
export const fetchWeather = () => handleFetch(`${API_BASE_URL}/GetWeather`);
export const fetchItemInfo = () => handleFetch(`${API_BASE_URL}/Item-Info`);
export const fetchRestockTime = () => handleFetch(`${API_BASE_URL}/stock/Restock-Time`);