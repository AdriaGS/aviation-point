'use client'

import { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'

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
      <DialogContent className='max-w-md bg-white p-6 rounded-lg shadow-lg'>
        <DialogTitle>{mode === 'login' ? 'Log in to AviationPoint' : 'Create your account'}</DialogTitle>
        <div className='flex flex-col space-y-4 mt-4'>
          <Button onClick={() => signIn('google')} className='w-full bg-blue-500 text-white'>
            {mode === 'login' ? 'Log in' : 'Sign up'} with Google
          </Button>
          <Button onClick={() => signIn('github')} className='w-full bg-gray-900 text-white'>
            {mode === 'login' ? 'Log in' : 'Sign up'} with GitHub
          </Button>
          <p className='text-sm text-center text-gray-500'>
            {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button className='text-blue-600 underline' onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}>
              {mode === 'login' ? 'Sign up' : 'Log in'}
            </button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
