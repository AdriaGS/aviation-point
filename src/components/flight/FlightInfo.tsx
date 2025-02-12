import { useState } from 'react'
import { ChevronDown, ChevronUp, Clock, Info, Plane } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Card, CardContent } from '@/components/ui/card'
import { FlightData } from '@/types/flightHistory'
import Link from 'next/link'
import { cn } from '@/lib/extensions/cn'

interface FlightInfoProps {
  flightData: FlightData
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

  const calculateDelay = (scheduled: string, actual: string) => {
    const scheduledTime = new Date(scheduled).getTime()
    const actualTime = new Date(actual).getTime()
    const delayInMinutes = Math.round((actualTime - scheduledTime) / 60000)
    return delayInMinutes
  }

  const getDelayColor = (delay: number) => {
    if (delay <= 15) return 'text-green-600 dark:text-green-400'
    if (delay <= 60) return 'text-yellow-600 dark:text-yellow-400'
    return 'text-red-600 dark:text-red-400'
  }

  const getDelayText = (delay: number) => {
    if (delay <= 0) return 'On time'
    return `${delay} min delay`
  }

  const calculateProgress = () => {
    const now = new Date().getTime()
    const departureTime = new Date(flightData.departure.actual || flightData.departure.estimated).getTime()
    const arrivalTime = new Date(flightData.arrival.actual || flightData.arrival.estimated).getTime()

    if (now < departureTime) return 0
    if (now > arrivalTime) return 100

    return Math.round(((now - departureTime) / (arrivalTime - departureTime)) * 100)
  }

  const departureDelay = flightData.departure.delay || calculateDelay(
    flightData.departure.scheduled,
    flightData.departure.actual || flightData.departure.estimated,
  );
  const arrivalDelay = flightData.arrival.delay || calculateDelay(
    flightData.arrival.scheduled,
    flightData.arrival.actual || flightData.arrival.estimated,
  );

  return (
    <Card className='mb-4 mx-auto'>
      <CardContent className='pt-6'>
        <div className='flex justify-between items-center mb-4'>
          <div>
            <h3 className='text-lg font-bold text-primary'>
              {flightData.airline.name} - {flightData.flight.iata}
            </h3>
            <p className='text-sm text-muted-foreground'>{formatDate(flightData.flightDate)}</p>
          </div>
          <Button variant='ghost' size='sm' onClick={() => setIsExpanded(!isExpanded)} aria-expanded={isExpanded}>
            {isExpanded ? <ChevronUp className='h-4 w-4' /> : <ChevronDown className='h-4 w-4' />}
            <span className='sr-only'>{isExpanded ? 'Show less' : 'Show more'}</span>
          </Button>
        </div>

        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center'>
            <Plane className='h-6 w-6 mr-2 text-primary' />
            <Link href={`/airport/${flightData.departure.airport}`} className='text-sm font-semibold hover:underline'>
              {flightData.departure.airport}
            </Link>
          </div>
          <Progress value={calculateProgress()} className='w-1/3' />
          <div className='flex items-center'>
            <Link href={`/airport/${flightData.arrival.airport}`} className='text-sm font-semibold hover:underline'>
              {flightData.arrival.airport}
            </Link>
            <Plane className='h-6 w-6 ml-2 transform rotate-90 text-primary' />
          </div>
        </div>

        <div className='grid grid-cols-2 gap-8 mb-4'>
          <div>
            <p className='text-sm font-semibold text-primary mb-1'>Departure</p>
            <p className='text-xs font-medium'>Scheduled: {formatDate(flightData.departure.scheduled)}</p>
            <p className='text-xs'>
              Actual: {formatDate(flightData.departure.actual || flightData.departure.estimated)}
            </p>
            <div className='flex items-center mt-1'>
              <Clock className='h-4 w-4 mr-1 text-muted-foreground' />
              <p className={cn('text-xs font-semibold', getDelayColor(departureDelay))}>{getDelayText(departureDelay)}</p>
            </div>
          </div>
          <div>
            <p className='text-sm font-semibold text-primary mb-1'>Arrival</p>
            <p className='text-xs font-medium'>Scheduled: {formatDate(flightData.arrival.scheduled)}</p>
            <p className='text-xs'>Actual: {formatDate(flightData.arrival.actual || flightData.arrival.estimated)}</p>
            <div className='flex items-center mt-1'>
              <Clock className='h-4 w-4 mr-1 text-muted-foreground' />
              <p className={cn('text-xs font-semibold', getDelayColor(arrivalDelay))}>{getDelayText(arrivalDelay)}</p>
            </div>
          </div>
        </div>

        {isExpanded && (
          <div className='mt-4 pt-4 border-t border-border'>
            <h4 className='text-sm font-semibold text-primary mb-2'>Additional Information</h4>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <p className='text-xs'>
                  <span className='font-medium'>Terminal:</span> {flightData.departure.terminal}
                </p>
                <p className='text-xs'>
                  <span className='font-medium'>Gate:</span> {flightData.departure.gate}
                </p>
              </div>
              <div>
                <p className='text-xs'>
                  <span className='font-medium'>Terminal:</span> {flightData.arrival.terminal}
                </p>
                <p className='text-xs'>
                  <span className='font-medium'>Gate:</span> {flightData.arrival.gate}
                </p>
              </div>
            </div>
            <div className='mt-4 flex items-center'>
              <Link href={`/aircraft/${flightData.aircraft.iata}`} className='flex items-center hover:underline'>
                <span className='text-sm font-medium'>{flightData.aircraft.iata}</span>
              </Link>
              <Link href={`/aircraft/${flightData.aircraft.iata}`} className='ml-auto'>
                <Button variant='outline' size='sm'>
                  <Info className='h-4 w-4 mr-1' />
                  Aircraft Details
                </Button>
              </Link>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
