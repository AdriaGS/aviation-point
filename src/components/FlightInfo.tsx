import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FlightHistoryData } from '@/types/flightHistory'

interface FlightInfoProps {
  flightData: FlightHistoryData
}

export function FlightInfo({ flightData }: FlightInfoProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getDepartureDelay = () => {
    const delay = flightData.departure.delay || 0
    return delay > 0 ? `${delay} minutes` : 'On time'
  }

  const getArrivalDelay = () => {
    const delay = flightData.arrival.delay || 0
    return delay > 0 ? `${delay} minutes` : 'On time'
  }

  return (
    <Card className='w-full mb-4'>
      <CardHeader>
        <CardTitle className='flex justify-between items-center'>
          <span>Flight {flightData.flight.iata}</span>
          <Button variant='ghost' size='sm' onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <ChevronUp className='h-4 w-4' /> : <ChevronDown className='h-4 w-4' />}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <p className='text-sm font-medium'>Departure</p>
            <p className='text-xs text-muted-foreground'>
              {flightData.departure.airport} ({flightData.departure.iata})
            </p>
            <p className='text-xs'>Scheduled: {formatDate(flightData.departure.scheduled)}</p>
            <p className='text-xs'>
              Actual: {formatDate(flightData.departure.actual)}
            </p>
            <p className='text-xs font-medium'>Delay: {getDepartureDelay()}</p>
          </div>
          <div>
            <p className='text-sm font-medium'>Arrival</p>
            <p className='text-xs text-muted-foreground'>
              {flightData.arrival.airport} ({flightData.arrival.iata})
            </p>
            <p className='text-xs'>Scheduled: {formatDate(flightData.arrival.scheduled)}</p>
            <p className='text-xs'>Actual: {formatDate(flightData.arrival.actual || flightData.arrival.scheduled)}</p>
            <p className='text-xs font-medium'>Delay: {getArrivalDelay()}</p>
          </div>
        </div>
        {isExpanded && (
          <div className='mt-4 border-t pt-4'>
            <h4 className='text-sm font-medium mb-2'>Additional Information</h4>
            <div className='grid grid-cols-2 gap-4 text-xs'>
              <div>
                <p>
                  <span className='font-medium'>Airline:</span> {flightData.airline.name}
                </p>
                <p>
                  <span className='font-medium'>Aircraft:</span> {flightData.aircraft?.iata}
                </p>
                <p>
                  <span className='font-medium'>Departure Terminal:</span> {flightData.departure.terminal}
                </p>
                <p>
                  <span className='font-medium'>Departure Gate:</span> {flightData.departure.gate}
                </p>
              </div>
              <div>
                <p>
                  <span className='font-medium'>Flight Status:</span> {flightData.flight_status}
                </p>
                <p>
                  <span className='font-medium'>Arrival Terminal:</span> {flightData.arrival.terminal}
                </p>
                <p>
                  <span className='font-medium'>Arrival Gate:</span> {flightData.arrival.gate}
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

