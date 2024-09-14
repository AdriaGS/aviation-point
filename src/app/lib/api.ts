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
    const response = await fetch(
      `https://api.example.com/flight-history/${flightCode}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch flight history');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching flight history:', error);
    console.log('Returning fake data due to API failure');
    return generateFakeData(flightCode);
  }
}
