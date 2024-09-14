import { Suspense } from 'react'
import FlightHistoryChecker from './FlightHistoryChecker'
import { fetchFlightHistory } from '@/lib/api'
import { FlightHistoryData } from '@/types/flightHistory'
import { Title } from '@/components/ui/title'

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
        <Title size='xl' as='h1' className='mb-6'>Flight History Checker</Title>
        <Suspense fallback={<div>Loading...</div>}>
          <FlightHistoryChecker initialFlightHistory={flightHistory} initialError={error} />
        </Suspense>
      </div>
    </div>
  )
}