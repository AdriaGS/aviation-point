import { WeatherData } from '@/types/weather';
import { checkNotNull } from './extensions/checkNotNull';
import { ApiWeatherResponse } from '@/types/openWeather';

const OPENWEATHER_KEY = checkNotNull(process.env.OPENWEATHER_API_KEY);

export async function getWeatherAtLocation(
  lat: number,
  lng: number
): Promise<WeatherData> {
  const url = new URL('https://api.openweathermap.org/data/2.5/weather');
  url.searchParams.set('appid', OPENWEATHER_KEY);
  url.searchParams.set('lat', lat.toString());
  url.searchParams.set('lng', lng.toString());
  url.searchParams.set('units', 'metric');

  try {
    const response = await fetch(url.href);
    if (!response.ok) {
      throw new Error(`Failed to fetch weather for lat: ${lat}, lng: ${lng}.`);
    }

    const data = await (response.json() as Promise<ApiWeatherResponse>);
    return {
      weatherGroup: data.weather[0].main,
      weatherDescription: data.weather[0].description,
      temperature: data.main.temp,
      feelsLike: data.main.feels_like,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      windDirection: data.wind.deg,
      pressure: data.main.pressure,
      visibility: data.visibility,
    };
  } catch (error) {
    console.error('Error fetching weather:', error);
    throw error;
  }
}
