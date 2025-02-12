import { Suspense } from 'react'
import FlightHistory from './FlightHistory'
import { getFlightHistory } from '@/lib/flights'
import { FlightData } from '@/types/flightHistory'

export default async function FlightHistoryPage({
  searchParams,
}: {
  searchParams: { flightCode?: string }
}) {
  const flightCode = searchParams?.flightCode
  let flightHistory: FlightData[] | null = null
  let error: string | null = null

  if (flightCode) {
    try {
      flightHistory = await getFlightHistory(flightCode)
    } catch (e) {
      error = 'Failed to fetch flight history. Please try again.'
    }
  }

  return (
    <div className='min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200'>
      <div className='py-12 px-4 sm:px-6 lg:px-8'>
        <Suspense fallback={<div>Loading...</div>}>
          <FlightHistory initialFlightHistory={flightHistory} initialError={error} />
        </Suspense>
      </div>
    </div>
  )
}