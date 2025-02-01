interface WeatherCardProps {
  airport: string;
  temp: number;
  condition: string;
}

export function WeatherCard({ airport, temp, condition }: WeatherCardProps) {
  return (
    <div className='bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700'>
      <div className='flex items-center justify-between'>
        <div>
          <p className='text-sm font-medium text-gray-500 dark:text-gray-400'>
            {airport}
          </p>
          <p className='text-2xl font-bold text-gray-900 dark:text-gray-100'>
            {temp}°F
          </p>
        </div>
        <div className='text-sm text-gray-500 dark:text-gray-400'>
          {condition}
        </div>
      </div>
    </div>
  );
}