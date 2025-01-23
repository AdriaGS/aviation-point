import { Suspense } from 'react'
import FlightHistoryChecker from './FlightHistoryChecker'
import { fetchFlightHistory } from '@/lib/api'
import { FlightHistoryData } from '@/types/flightHistory'

export default async function FlightHistoryPage({
  searchParams,
}: {
  searchParams: { flightCode?: string }
}) {
  const flightCode = searchParams?.flightCode
  let flightHistory: FlightHistoryData[] | null = null
  let error: string | null = null

  if (flightCode) {
    try {
      flightHistory = await fetchFlightHistory(flightCode)
    } catch (e) {
      error = 'Failed to fetch flight history. Please try again.'
    }
  }

  return (
    <div className='min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200'>
      <div className='py-12 px-4 sm:px-6 lg:px-8'>
        <Suspense fallback={<div>Loading...</div>}>
          <FlightHistoryChecker initialFlightHistory={flightHistory} initialError={error} />
        </Suspense>
      </div>
    </div>
  )
}