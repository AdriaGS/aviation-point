import { fetchAirports } from './fetchAirports';
import { connectToDatabase } from '../db';
import { Airport } from '@/models/Airport';

export const updateAirportsInDB = async () => {
  try {
    await connectToDatabase();
    const airports = await fetchAirports({
      offset: 100,
      limit: 100,
    });

    for (const airport of airports) {
      await Airport.findOneAndUpdate(
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

    console.log('Airport data updated successfully!');
  } catch (error) {
    console.error('Error updating airport data:', error);
  }
};
