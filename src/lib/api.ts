import { FlightHistoryData } from '@/types/flightHistory';
import { FlightHistory } from '@/models/FlightHistory';
import { connectToDatabase } from '@/lib/db';
import { checkNotNull } from '@/lib/extensions/checkNotNull';
import { isDevelopment } from '@/lib/extensions/stage';
import { AviationStackResponse, FlightData } from '@/types/aviationStack';

export async function fetchFlightHistoryWithCache(
  flightCode: string,
  startDate: Date = new Date(),
  offSet: number = 5
): Promise<FlightHistoryData[]> {
  await connectToDatabase();

  // Step 1: Generate the dates list to return
  const datesToReturn: string[] = [];
  for (let i = 0; i < offSet; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() - i);
    const dateString = date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    datesToReturn.push(dateString);
  }

  // Step 2: Query the database for records with these dates
  const existingRecords = await FlightHistory.find({
    flightCode,
    date: { $in: datesToReturn }, // Query with specific dates
  }).exec();

  // Extract the dates that exist in the database
  const existingDates = existingRecords.map((record) => record.date);

  // Step 3: Determine which dates are missing from the database
  const missingDates = datesToReturn.filter(
    (date) => !existingDates.includes(date)
  );

  // Step 4: Fetch missing data from the API if there are missing dates
  const newRecords: FlightHistoryData[] = [];
  for (const missingDate of missingDates) {
    const apiFlightHistory = await fetchFlightHistory(flightCode, missingDate);
    newRecords.push(...apiFlightHistory);
  }

  // Step 5: Store new data in the database
  if (newRecords.length > 0) {
    const flightHistoryDocuments = newRecords.map((history) => ({
      flightCode,
      date: history.flight_date,
      delay: history.departure.delay,
      status: history.departure.delay > 0 ? 'Delayed' : 'On Time',
    }));

    await FlightHistory.insertMany(flightHistoryDocuments);
  }

  // Step 6: Combine existing and new records, sort them by date in descending order, and return
  const combinedRecords = [...existingRecords, ...newRecords].sort(
    (a, b) =>
      new Date(b.date).getMilliseconds() - new Date(a.date).getMilliseconds()
  );

  return combinedRecords;
}

export async function fetchFlightHistory(
  flightCode: string,
  flightDate: string = new Date().toISOString().split('T')[0]
): Promise<FlightHistoryData[]> {
  try {
    const apiKey = checkNotNull(process.env.AVIATION_STACK_API_KEY);
    const baseUrl = isDevelopment()
      ? process.env.LOCAL_AVIATION_STACK_ENDPOINT
      : process.env.AVIATION_STACK_ENDPOINT;

    const url = new URL(`${baseUrl}/v1/flights`);
    url.searchParams.set('access_key', apiKey);
    url.searchParams.set('flight_iata', flightCode);

    const response = await fetch(url.href);

    if (!response.ok) {
      throw new Error(`Failed to fetch flight data for ${flightCode}`);
    }

    const data = await (response.json() as Promise<AviationStackResponse>);

    // Transform the data into the FlightHistoryData[] format
    const flightHistory: FlightHistoryData[] = data.data.map(
      (flight: FlightData) => {
        return {
          flight_date: flight.flight_date,
          flight_status: flight.flight_status,
          departure: {
            airport: flight.departure.airport,
            iata: flight.departure.iata,
            delay: flight.departure.delay || 0,
            scheduled: flight.departure.scheduled,
            actual: flight.departure.actual || '2019-12-12T04:20:00+00:00',
            terminal: flight.departure.terminal,
            gate: flight.departure.gate,
          },
          arrival: {
            airport: flight.arrival.airport,
            iata: flight.arrival.iata,
            delay: flight.arrival.delay || 0,
            scheduled: flight.arrival.scheduled,
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
      }
    );

    return flightHistory;
  } catch (error) {
    console.log(`Query parameters: ${flightCode}, ${flightDate}`);
    console.error('Error fetching flight history:', error);
    throw error;
  }
}
