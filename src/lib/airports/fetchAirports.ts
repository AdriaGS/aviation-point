import { ApiAirportData, ApiAirportsResponse } from '@/types/aviationStack';
import { checkNotNull } from '../extensions/checkNotNull';
import { isDevelopment } from '../extensions/stage';
import { AirportData } from '@/types/airport';

const apiKey = checkNotNull(process.env.AVIATION_STACK_API_KEY);
const baseUrl = isDevelopment()
  ? process.env.LOCAL_AVIATION_STACK_ENDPOINT
  : process.env.AVIATION_STACK_ENDPOINT;

export async function fetchAirports({
  offset = 100,
  limit = 2000,
}: {
  offset: number;
  limit: number;
}): Promise<AirportData[]> {
  const airportDataPromises = Array.from(
    { length: limit / offset },
    (_, index) => {
      const url = new URL(`${baseUrl}/v1/airports`);
      url.searchParams.set('access_key', apiKey);
      url.searchParams.set('offset', (index * offset).toString());

      return getAirportData(url);
    }
  );

  return (await Promise.all(airportDataPromises)).flat();
}

async function getAirportData(url: URL): Promise<AirportData[]> {
  try {
    const response = await fetch(url.href, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(
        `Failed to fetch airport information for url ${url.href}`
      );
    }

    const data = await (response.json() as Promise<ApiAirportsResponse>);
    const airportData: AirportData[] = parseApiResponse(data);

    return airportData;
  } catch (error) {
    console.error('Error fetching airport data:', error);
    throw error;
  }
}

function parseApiResponse(apiResponse: ApiAirportsResponse): AirportData[] {
  return apiResponse.data.map((airport: ApiAirportData) => {
    return {
      name: airport.airport_name,
      iataCode: airport.iata_code,
      icaoCode: airport.icao_code,
      latitude: parseFloat(airport.latitude),
      longitude: parseFloat(airport.longitude),
      geonameId: airport.geoname_id,
      timezone: airport.timezone,
      countryName: airport.country_name,
      cityIataCode: airport.city_iata_code,
    };
  });
}
