'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export default function SearchBar({ onLoadingChange }: { onLoadingChange?: (loading: boolean) => void }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [flightCode, setFlightCode] = useState(searchParams.get('flightCode') || '');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Update flightCode if it changes in the URL
    const newFlightCode = searchParams.get('flightCode')
    if (newFlightCode !== null && newFlightCode !== flightCode) {
      setFlightCode(newFlightCode)
    }
  }, [searchParams, flightCode])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!flightCode) return;

    setLoading(true);
    if (onLoadingChange) onLoadingChange(true);

    router.push(`/flight-history?flightCode=${flightCode}`);
    // Simulating a short delay for loading UI (remove this if unnecessary)
    setTimeout(() => {
      setLoading(false);
      if (onLoadingChange) onLoadingChange(false);
    }, 1000);
  };

  return (
    <div className='bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-8'>
      <form onSubmit={handleSubmit} className='flex items-center border-b border-indigo-500 dark:border-indigo-400 py-2'>
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
      </form>
    </div>
  );
}