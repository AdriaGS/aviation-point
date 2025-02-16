import { fetchAirports } from './fetchAirports';
import { connectToDatabase } from '../db';
import { AirportData } from '@/models/Airport';

export const updateAirportsInDB = async () => {
  try {
    await connectToDatabase();
    const airports = await fetchAirports({
      offset: 100,
      limit: 2000,
    });

    for (const airport of airports) {
      await AirportData.findOneAndUpdate(
        { iataCode: airport.iataCode },
        {
          airportName: airport.name,
          icaoCode: airport.icaoCode,
          latitude: airport.latitude,
          longitude: airport.longitude,
          geonameId: airport.geonameId,
          timezone: airport.timezone,
          countryName: airport.countryName,
          cityIataCode: airport.cityIataCode,
          lastUpdated: new Date(),
        },
        { upsert: true, new: true }
      );
    }
  } catch (error) {
    console.error('Error updating airport data:', error);
  }
};
