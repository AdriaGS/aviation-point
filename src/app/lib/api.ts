import { FlightHistoryData } from '@/types/flightHistory';

const generateFakeData = (flightCode: string): FlightHistoryData[] => {
  console.log(flightCode);
  const today = new Date();
  return Array.from({ length: 5 }, (_, index) => {
    const date = new Date(today);
    date.setDate(date.getDate() - index);
    const isDelayed = Math.random() > 0.5;
    return {
      date: date.toISOString().split('T')[0],
      delay: isDelayed ? Math.floor(Math.random() * 120) + 1 : 0,
      status: isDelayed ? 'Delayed' : 'On Time',
    };
  });
};

export async function fetchFlightHistory(
  flightCode: string
): Promise<FlightHistoryData[]> {
  try {
    const apiKey = process.env.AVIATION_STACK_API_KEY;

    const response = await fetch(
      `http://api.aviationstack.com/v1/flights?access_key=${apiKey}&flight_iata=${flightCode}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch flight data for ${flightCode}`);
    }

    const data = await response.json();

    // Transform the data into the FlightHistoryData[] format
    const flightHistory: FlightHistoryData[] = data.data.map((flight: any) => ({
      date: flight.flight_date,
      delay: flight.departure.delay || 0,
      status: flight.departure.delay > 0 ? 'Delayed' : 'On Time',
    }));

    return flightHistory;
  } catch (error) {
    console.error('Error fetching flight history:', error);
    console.log('Returning fake data due to API failure');
    return generateFakeData(flightCode);
  }
}
