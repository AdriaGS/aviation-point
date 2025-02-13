import { ApiAirportData, ApiAirportsResponse } from '@/types/aviationStack';
import { checkNotNull } from './extensions/checkNotNull';
import { isDevelopment } from './extensions/stage';
import { AirportData } from '@/types/airport';

const apiKey = checkNotNull(process.env.AVIATION_STACK_API_KEY);
const baseUrl = isDevelopment()
  ? process.env.LOCAL_AVIATION_STACK_ENDPOINT
  : process.env.AVIATION_STACK_ENDPOINT;

export async function getNearestAirports(
  lat: number,
  lng: number,
  limit: number = 4
): Promise<AirportData[]> {
  if (!lat || !lng) {
    return [];
  }

  const url = new URL(`${baseUrl}/v1/airports`);
  url.searchParams.set('access_key', apiKey);
  url.searchParams.set('lat', lat.toString());
  url.searchParams.set('lng', lng.toString());
  url.searchParams.set('limit', limit.toString());

  try {
    const response = await fetch(url.href, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(
        `Failed to fetch nearest airports for lat: ${lat}, lng: ${lng}, limit: ${limit}`
      );
    }

    const data = await (response.json() as Promise<ApiAirportsResponse>);

    // Transform the data into Airport[] format
    const airports: AirportData[] = data.data.map((airport: ApiAirportData) => {
      return {
        name: airport.airport_name,
        iataCode: airport.iata_code,
        icaoCode: airport.icao_code,
        latitude: parseFloat(airport.latitude),
        longitude: parseFloat(airport.longitude),
        cityIataCode: airport.city_iata_code,
        cityName: airport.city_name,
        website: airport.website,
      };
    });

    return airports;
  } catch (error) {
    console.error('Error fetching airport data:', error);
    throw error;
  }
}
