'use client';

import { signOut, useSession } from 'next-auth/react';
import { AuthMode } from '../auth/AuthModal';
import { Button } from '../ui/button';

export function AuthButtons({ openModal }: { openModal: (mode: AuthMode) => void }) {
  const { data: session } = useSession()

  return !session ? (
    <>
      <Button variant='default' className='px-3 py-2 rounded-md text-base md:text-sm font-medium bg-indigo-400 text-white hover:bg-indigo-500' onClick={() => openModal('login')}>
        Log In
      </Button>
      <Button variant='ghost' className='px-3 py-2 rounded-md text-base md:text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-gray-700' onClick={() => openModal('signup')}>
        Sign Up
      </Button>
    </>
  ) : (
    <>
      <Button variant='default' className='px-3 py-2 rounded-md text-sm font-medium bg-indigo-400 text-white hover:bg-indigo-500' onClick={() => signOut({ callbackUrl: '/' })}>
        Log Out
      </Button>
    </>
  )
}
