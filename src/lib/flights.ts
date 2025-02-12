import { FlightData } from '@/types/flightHistory';
import { checkNotNull } from '@/lib/extensions/checkNotNull';
import { isDevelopment } from '@/lib/extensions/stage';
import { ApiFlightsResponse, ApiFlightData } from '@/types/aviationStack';

const apiKey = checkNotNull(process.env.AVIATION_STACK_API_KEY);
const baseUrl = isDevelopment()
  ? process.env.LOCAL_AVIATION_STACK_ENDPOINT
  : process.env.AVIATION_STACK_ENDPOINT;

export async function getFlightHistory(
  flightCode: string
): Promise<FlightData[]> {
  const url = new URL(`${baseUrl}/v1/flights`);
  url.searchParams.set('access_key', apiKey);
  url.searchParams.set('flight_iata', flightCode);

  return getFlightData(url);
}

export async function getDepartingFlights(iata: string) {
  const url = new URL(`${baseUrl}/v1/flights`);
  url.searchParams.set('access_key', apiKey);
  url.searchParams.set('dep_iata', iata);
  url.searchParams.set('flight_status', 'scheduled,active');

  return getFlightData(url);
}

async function getFlightData(url: URL): Promise<FlightData[]> {
  try {
    const response = await fetch(url.href);
    if (!response.ok) {
      throw new Error(`Failed to fetch flight information for url ${url.href}`);
    }

    const data = await (response.json() as Promise<ApiFlightsResponse>);
    const flightData: FlightData[] = parseApiResponse(data);

    return flightData;
  } catch (error) {
    console.error('Error fetching flight by airport code:', error);
    throw error;
  }
}

function parseApiResponse(apiResponse: ApiFlightsResponse): FlightData[] {
  return apiResponse.data.map((flight: ApiFlightData) => {
    return {
      flightDate: flight.flight_date,
      flightStatus: flight.flight_status,
      departure: {
        airport: flight.departure.airport,
        iata: flight.departure.iata,
        delay: flight.departure.delay || 0,
        scheduled: flight.departure.scheduled,
        estimated: flight.departure.estimated || '2019-12-12T04:20:00+00:00',
        actual: flight.departure.actual || '2019-12-12T04:20:00+00:00',
        terminal: flight.departure.terminal,
        gate: flight.departure.gate,
      },
      arrival: {
        airport: flight.arrival.airport,
        iata: flight.arrival.iata,
        delay: flight.arrival.delay || 0,
        scheduled: flight.arrival.scheduled,
        estimated: flight.arrival.estimated || '2019-12-12T04:20:00+00:00',
        actual: flight.arrival.actual || '2019-12-12T04:20:00+00:00',
        terminal: flight.arrival.terminal,
        gate: flight.arrival.gate,
      },
      airline: {
        name: flight.airline.name,
      },
      flight: {
        iata: flight.flight.iata,
      },
      aircraft: {
        iata: flight.aircraft?.iata || 'N/A',
      },
    };
  });
}
