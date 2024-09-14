'use client'

import { useState, useEffect, createContext, useContext } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2, Sun, Moon } from 'lucide-react'
import { FlightHistoryData } from '@/types/flightHistory'

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  toggleTheme: () => {},
})

function ThemeToggle() {
  const { isDark, toggleTheme } = useContext(ThemeContext)

  return (
    <Button
      variant='outline'
      size='icon'
      onClick={toggleTheme}
      className='fixed top-4 right-4 bg-white dark:bg-gray-800'
    >
      {isDark ? <Sun className='h-[1.2rem] w-[1.2rem]' /> : <Moon className='h-[1.2rem] w-[1.2rem]' />}
      <span className='sr-only'>Toggle theme</span>
    </Button>
  )
}

interface FlightHistoryProps {
  initialFlightHistory: FlightHistoryData[] | null;
  initialError: string | null;
}

export default function FlightHistoryChecker({ initialFlightHistory, initialError }: FlightHistoryProps) {
  const [flightCode, setFlightCode] = useState<string>('')
  const [flightHistory, setFlightHistory] = useState<FlightHistoryData[] | null>(initialFlightHistory)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(initialError)
  const [isDark, setIsDark] = useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    setIsDark(savedTheme === 'dark')
  }, [])

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  useEffect(() => {
    setFlightHistory(initialFlightHistory)
    setError(initialError)
    setLoading(false)
  }, [initialFlightHistory, initialError])

  const toggleTheme = () => {
    setIsDark(prev => !prev)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setFlightHistory(null)

    router.push(`/flight-history?flightCode=${flightCode}`)
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <div className='max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden md:max-w-2xl'>
        <ThemeToggle />
        <div className='p-8 w-full'>
          <form onSubmit={handleSubmit} className='mt-6'>
            <div className='flex items-center border-b border-indigo-500 dark:border-indigo-400 py-2'>
              <Input
                type='text'
                placeholder='Enter flight code'
                className='appearance-none bg-transparent border-none w-full text-gray-700 dark:text-gray-300 mr-3 py-1 px-2 leading-tight focus:outline-none'
                value={flightCode}
                onChange={(e) => setFlightCode(e.target.value)}
                required
              />
              <Button type='submit' disabled={loading} className='bg-indigo-500 hover:bg-indigo-600 text-white'>
                {loading ? (
                  <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    Checking
                  </>
                ) : (
                  'Check'
                )}
              </Button>
            </div>
          </form>

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
                            <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              flight.status === 'Delayed' 
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
    </ThemeContext.Provider>
  )
}