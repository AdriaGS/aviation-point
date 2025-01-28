import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FlightHistoryData } from '@/types/flightHistory'

interface FlightScoreProps {
  flightHistory: FlightHistoryData[]
}

export function FlightScore({ flightHistory }: FlightScoreProps) {
  const calculateScore = () => {
    if (flightHistory.length === 0) return 100

    const totalFlights = flightHistory.length
    let onTimeFlights = 0
    let totalDelayMinutes = 0

    flightHistory.forEach((flight) => {
      if (flight.departure.delay === 0 && flight.arrival.delay === 0) {
        onTimeFlights++
      }
      totalDelayMinutes += flight.departure.delay + flight.arrival.delay
    })

    const onTimePercentage = (onTimeFlights / totalFlights) * 100
    const averageDelay = totalDelayMinutes / totalFlights

    // Calculate score: 50% based on on-time percentage, 50% based on average delay
    const onTimeScore = onTimePercentage * 0.5
    const delayScore = Math.max(0, 50 - averageDelay * 2) // Lose 2 points for each minute of average delay, up to 50

    return Math.round(onTimeScore + delayScore)
  }

  const score = calculateScore()

  const getScoreColor = () => {
    if (score >= 90) return 'text-green-500'
    if (score >= 70) return 'text-yellow-500'
    return 'text-red-500'
  }

  return (
    <Card className='w-full mb-4'>
      <CardHeader>
        <CardTitle>Flight Score</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='flex items-center justify-center'>
          <div className={`text-6xl font-bold ${getScoreColor()}`}>{score}</div>
        </div>
        <p className='text-center text-sm mt-2'>Based on {flightHistory.length} past flights</p>
      </CardContent>
    </Card>
  )
}
