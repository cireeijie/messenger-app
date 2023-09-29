import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ToasterContext from './context/ToasterContext'
import AuthContext from './context/AuthContext'
import { LoadingProvider } from '@/app/context/LoadingContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Messenger App',
  description: 'Stay Connected, Anywhere, Anytime!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext>
          <LoadingProvider>
            <ToasterContext />
            {children}
          </LoadingProvider>
        </AuthContext>
      </body>
    </html>
  )
}
