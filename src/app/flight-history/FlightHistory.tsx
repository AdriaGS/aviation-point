'use client'

import { useState, useEffect } from 'react'
import SearchBar from '@/components/SearchBar'
import { FlightData } from '@/types/flightHistory'
import { FlightInfo } from '@/components/flight/FlightInfo';
import { FlightScore } from '@/components/flight/FlightScore';

interface FlightHistoryProps {
  initialFlightHistory: FlightData[] | null;
  initialError: string | null;
}

export default function FlightHistory({ initialFlightHistory, initialError }: FlightHistoryProps) {
  const [flightHistory, setFlightHistory] = useState<FlightData[] | null>(initialFlightHistory)
  const [, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(initialError)

  useEffect(() => {
    setFlightHistory(initialFlightHistory)
    setError(initialError)
    setLoading(false)
  }, [initialFlightHistory, initialError])

  return (
    <div className='max-w-5xl mx-auto'>
      <div className='p-8 w-full'>
        <SearchBar onLoadingChange={setLoading} />

        {error && (
          <div className='mt-4 text-red-500 dark:text-red-400'>{error}</div>
        )}

        {flightHistory && flightHistory.length > 0 && (
          <div className='mt-6'>
            <FlightScore flightHistory={flightHistory} />
            <h2 className='text-2xl text-center font-semibold text-gray-900 dark:text-gray-100 mb-4'>Flight History</h2>
            {flightHistory.map((flight, index) => (
              <FlightInfo key={index} flightData={flight} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
