'use client'

import { useState, useEffect } from 'react'
import SearchBar from '@/components/SearchBar'
import { FlightHistoryData } from '@/types/flightHistory'

interface FlightHistoryProps {
  initialFlightHistory: FlightHistoryData[] | null;
  initialError: string | null;
}

export default function FlightHistoryChecker({ initialFlightHistory, initialError }: FlightHistoryProps) {
  const [flightHistory, setFlightHistory] = useState<FlightHistoryData[] | null>(initialFlightHistory)
  const [, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(initialError)

  useEffect(() => {
    setFlightHistory(initialFlightHistory)
    setError(initialError)
    setLoading(false)
  }, [initialFlightHistory, initialError])

  return (
    <div className='max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden md:max-w-2xl'>
      <div className='p-8 w-full'>
        <SearchBar onLoadingChange={setLoading} />

        {error && (
          <div className='mt-4 text-red-500 dark:text-red-400'>{error}</div>
        )}

        {flightHistory && flightHistory.length > 0 && (
          <div className='mt-6'>
            <h2 className='text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2'>Flight History</h2>
            <div className='bg-white dark:bg-gray-700 shadow overflow-hidden sm:rounded-md'>
              <ul className='divide-y divide-gray-200 dark:divide-gray-600'>
                {flightHistory.map((flight, index) => (
                  <li key={index}>
                    <div className='px-4 py-4 sm:px-6'>
                      <div className='flex items-center justify-between'>
                        <p className='text-sm font-medium text-indigo-600 dark:text-indigo-400 truncate'>
                          {flight.date}
                        </p>
                        <div className='ml-2 flex-shrink-0 flex'>
                          <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${flight.status === 'Delayed'
                            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                            : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            }`}>
                            {flight.status}
                          </p>
                        </div>
                      </div>
                      <div className='mt-2 sm:flex sm:justify-between'>
                        <div className='sm:flex'>
                          <p className='flex items-center text-sm text-gray-500 dark:text-gray-400'>
                            Delay: {flight.delay} minutes
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
