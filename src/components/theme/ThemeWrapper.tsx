'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';


interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  toggleTheme: () => { },
})

function ThemeToggle() {
  const { isDark, toggleTheme } = useContext(ThemeContext)

  return (
    <Button
      variant='outline'
      size='icon'
      onClick={toggleTheme}
      className='fixed top-4 right-4 bg-white text-indigo-500 dark:bg-gray-800'
    >
      {isDark ? <Sun className='h-[1.2rem] w-[1.2rem]' /> : <Moon className='h-[1.2rem] w-[1.2rem]' />}
      <span className='sr-only'>Toggle theme</span>
    </Button>
  )
}

export default function ThemeWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isDark, setIsDark] = useState<boolean>(false);

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

  const toggleTheme = () => {
    setIsDark(prev => !prev)
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <ThemeToggle />
      {children}
    </ThemeContext.Provider>
  );
}
