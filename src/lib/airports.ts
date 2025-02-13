import { ApiAirportData, ApiAirportsResponse } from '@/types/aviationStack';
import { checkNotNull } from './extensions/checkNotNull';
import { isDevelopment } from './extensions/stage';
import { AirportData } from '@/types/airport';
import { UserLocation } from './location';

const apiKey = checkNotNull(process.env.AVIATION_STACK_API_KEY);
const baseUrl = isDevelopment()
  ? process.env.LOCAL_AVIATION_STACK_ENDPOINT
  : process.env.AVIATION_STACK_ENDPOINT;

export async function getNearestAirports(
  location: UserLocation,
  limit: number = 100
): Promise<AirportData[]> {
  if (!location) {
    return [];
  }

  const { countryName, latitude, longitude } = location;

  const url = new URL(`${baseUrl}/v1/airports`);
  url.searchParams.set('access_key', apiKey);
  // url.searchParams.set('search', countryName);
  url.searchParams.set('limit', limit.toString());

  try {
    const response = await fetch(url.href, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(
        `Failed to fetch nearest airports for country ${countryName}, limit: ${limit}`
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

    const sortedAirports = airports
      .map((airport) => ({
        ...airport,
        distance: haversineDistance(
          latitude,
          longitude,
          airport.latitude,
          airport.longitude
        ),
      }))
      .sort((a, b) => a.distance - b.distance) // Sort by closest first
      .slice(0, 4); // Take the top N airports

    return sortedAirports;
  } catch (error) {
    console.error('Error fetching airport data:', error);
    throw error;
  }
}

const haversineDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const R = 6371; // Radius of the Earth in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};
