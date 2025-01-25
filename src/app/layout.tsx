'use client';

import localFont from 'next/font/local';
import '@/styles/globals.css';
import { Navbar } from '@/components/Navbar';
import { createContext, useContext, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';

const geistSans = localFont({
  src: '../../public/fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: '../../public/fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

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
      className='fixed top-4 right-4 bg-white dark:bg-gray-800'
    >
      {isDark ? <Sun className='h-[1.2rem] w-[1.2rem]' /> : <Moon className='h-[1.2rem] w-[1.2rem]' />}
      <span className='sr-only'>Toggle theme</span>
    </Button>
  )
}

export default function RootLayout({
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
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
          <Navbar />
          <ThemeToggle />
          {children}
        </ThemeContext.Provider>
      </body>
    </html>
  );
}
