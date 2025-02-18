'use client'

import { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'
import Image from 'next/image';

export type AuthMode = 'login' | 'signup'

interface AuthModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialMode: AuthMode
}

export function AuthModal({ open, onOpenChange, initialMode }: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>(initialMode)

  // Sync mode with initialMode when modal opens
  useEffect(() => {
    if (open) setMode(initialMode)
  }, [open, initialMode])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg'>
        <Image src='/logo-white.png' alt='Aviation Point Logo' width={100} height={100} className='mx-auto' />
        <DialogTitle className='text-center text-2xl font-bold -mt-6'>Welcome to Aviation Point</DialogTitle>
        <div className='flex flex-col space-y-4 mt-4 mx-12'>
          <Button onClick={() => signIn('google')} className='bg-inherit relative rounded-2xl text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-gray-700'>
            <Image src='/icons/google.svg' alt='Google' width={20} height={20} className='absolute left-4' />
            Continue with Google
          </Button>
          <Button onClick={() => signIn('facebook')} className='bg-inherit relative rounded-2xl text-white dark:text-white bg-blue-700 hover:bg-blue-600 dark:hover:bg-blue-600'>
            <Image src='/icons/facebook.svg' alt='Google' width={20} height={20} className='absolute left-4 filter invert' />
            Continue with Google
          </Button>
          <p className='text-sm text-center text-gray-700'>
            {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button className='text-gray-700 fon-tbold underline' onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}>
              {mode === 'login' ? 'Sign up' : 'Log in'}
            </button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
