import { Airport } from '@/models/Airport';
import { connectToDatabase } from '../db';

export const findClosestAirports = async (
  latitude: number,
  longitude: number
) => {
  await connectToDatabase();

  const airports = await Airport.aggregate([
    {
      $addFields: {
        distance: {
          $sqrt: {
            $add: [
              { $pow: [{ $subtract: ['$latitude', latitude] }, 2] },
              { $pow: [{ $subtract: ['$longitude', longitude] }, 2] },
            ],
          },
        },
      },
    },
    { $sort: { distance: 1 } },
    { $limit: 4 },
  ]);

  return airports;
};
