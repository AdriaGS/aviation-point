interface Flight {
  flight: string;
  status: string;
  departure: string;
  arrival: string;
}

interface FlightBoardProps {
  flights: Flight[];
}

export function FlightBoard({ flights }: FlightBoardProps) {
  return (
    <div className='overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700'>
      <table className='min-w-full divide-y divide-gray-200 dark:divide-gray-700'>
        <thead className='bg-gray-50 dark:bg-gray-800'>
          <tr>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase'>
              Flight
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase'>
              Status
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase'>
              Departure
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase'>
              Arrival
            </th>
          </tr>
        </thead>
        <tbody className='bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700'>
          {flights.map((flight, index) => (
            <tr key={index}>
              <td className='px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100'>
                {flight.flight}
              </td>
              <td className='px-6 py-4'>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${flight.status === 'On Time'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                    }`}
                >
                  {flight.status}
                </span>
              </td>
              <td className='px-6 py-4 text-sm text-gray-500 dark:text-gray-400'>
                {flight.departure}
              </td>
              <td className='px-6 py-4 text-sm text-gray-500 dark:text-gray-400'>
                {flight.arrival}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}