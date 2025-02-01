import { ArrowUpIcon, ArrowDownIcon } from '@radix-ui/react-icons';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: string;
}

export function StatCard({ title, value, icon, trend }: StatCardProps) {
  const isPositive = trend?.startsWith('+');

  return (
    <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700'>
      <div className='flex items-center justify-between'>
        <div>
          <p className='text-sm font-medium text-gray-500 dark:text-gray-400'>
            {title}
          </p>
          <p className='text-2xl font-bold text-gray-900 dark:text-gray-100'>
            {value}
          </p>
        </div>
        <div className='p-3 bg-indigo-400 dark:bg-indigo-900 rounded-full'>
          {icon}
        </div>
      </div>
      {trend && (
        <div
          className={`mt-2 flex items-center text-sm ${isPositive ? 'text-green-600' : 'text-red-600'
            }`}
        >
          {isPositive ? <ArrowUpIcon /> : <ArrowDownIcon />}
          <span className='ml-1'>{trend}</span>
        </div>
      )}
    </div>
  );
}