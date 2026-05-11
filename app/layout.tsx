import type { Metadata } from 'next'
import { DM_Serif_Display, Inter } from 'next/font/google'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Script from 'next/script'
import ThemeProvider from '@/components/ThemeProvider'
import './globals.css'

const dmSerifDisplay = DM_Serif_Display({
  weight: ['400'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-serif',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Flourish - Investing Education for UK Students',
  description: 'Free investing education for UK students. Learn ISAs, ETFs, index funds and more through bite-sized lessons, live simulations and real tools.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSerifDisplay.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-NY4LGTS8ST" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-NY4LGTS8ST');
        `}</Script>
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider>
          {children}
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  )
}
