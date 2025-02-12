import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FlightData } from '@/types/flightHistory'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../ui/button'

interface FlightScoreProps {
  flightHistory: FlightData[]
}

export function FlightScore({ flightHistory }: FlightScoreProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const calculateScore = (history: FlightData[]) => {
    if (history.length === 0) return { score: 100, onTimePercentage: 100, averageDelay: 0 }

    const totalFlights = history.length
    let onTimeFlights = 0
    let totalDelayMinutes = 0

    history.forEach((flight) => {
      const departureDelay = flight.departure.delay || 0
      const arrivalDelay = flight.arrival.delay || 0

      if (departureDelay <= 15 && arrivalDelay <= 15) {
        onTimeFlights++
      }

      totalDelayMinutes += Math.max(departureDelay, arrivalDelay)
    })

    const onTimePercentage = (onTimeFlights / totalFlights) * 100
    const averageDelay = totalDelayMinutes / totalFlights

    // Calculate score: 70% based on on-time performance, 30% based on average delay
    const score = onTimePercentage * 0.7 + Math.max(0, 100 - averageDelay) * 0.3

    return {
      score: Math.round(score),
      onTimePercentage: Math.round(onTimePercentage),
      averageDelay: Math.round(averageDelay),
    }
  }

  const { score, onTimePercentage, averageDelay } = calculateScore(flightHistory)

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 dark:text-green-400'
    if (score >= 70) return 'text-yellow-600 dark:text-yellow-400'
    return 'text-red-600 dark:text-red-400'
  }

  const scoreColor = getScoreColor(score)

  return (
    <Card className='w-full mb-4'>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-large'>Flight Score</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='flex flex-col items-center'>
          <div className={`text-4xl font-bold ${scoreColor}`}>{score}</div>
          <div className='text-xs text-muted-foreground'>out of 100</div>
          <Button variant='ghost' size='sm' onClick={() => setIsExpanded(!isExpanded)} className='mt-2'>
            {isExpanded ? (
              <>
                Hide Details
                <ChevronUp className='ml-2 h-4 w-4' />
              </>
            ) : (
              <>
                Show Details
                <ChevronDown className='ml-2 h-4 w-4' />
              </>
            )}
          </Button>
        </div>
        {isExpanded && (
          <div className='mt-4 text-sm'>
            <p className='mb-2'>
              <span className='font-medium font-semibold'>On-time Performance:</span> {onTimePercentage}%
            </p>
            <p className='mb-2'>
              <span className='font-medium font-semibold'>Average Delay:</span> {averageDelay} minutes
            </p>
            <p className='text-xs text-muted-foreground'>Based on {flightHistory.length} past flights</p>
            <p className='mt-2 text-xs italic'>Score calculation: 70% on-time performance, 30% average delay</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
