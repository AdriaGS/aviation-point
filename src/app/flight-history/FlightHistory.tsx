'use client'

import { useState, useEffect } from 'react'
import SearchBar from '@/components/SearchBar'
import { FlightHistoryData } from '@/types/flightHistory'
import { FlightScore } from '@/components/FlightScore';
import { FlightInfo } from '@/components/FlightInfo';

interface FlightHistoryProps {
  initialFlightHistory: FlightHistoryData[] | null;
  initialError: string | null;
}

export default function FlightHistory({ initialFlightHistory, initialError }: FlightHistoryProps) {
  const [flightHistory, setFlightHistory] = useState<FlightHistoryData[] | null>(initialFlightHistory)
  const [, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(initialError)

  useEffect(() => {
    setFlightHistory(initialFlightHistory)
    setError(initialError)
    setLoading(false)
  }, [initialFlightHistory, initialError])

  return (
    <div className='max-w-7xl mx-auto'>
      <div className='p-8 w-full'>
        <SearchBar onLoadingChange={setLoading} />

        {error && (
          <div className='mt-4 text-red-500 dark:text-red-400'>{error}</div>
        )}

        {flightHistory && flightHistory.length > 0 && (
          <div className='mt-6'>
            <h2 className='text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4'>Flight History</h2>
            <FlightScore flightHistory={flightHistory} />
            {flightHistory.map((flight, index) => (
              <FlightInfo key={index} flightData={flight} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
