import type { Metadata } from 'next'
import { Playfair_Display, Lora, Raleway } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })
const lora = Lora({ subsets: ['latin'], variable: '--font-lora' })
const raleway = Raleway({ subsets: ['latin'], variable: '--font-raleway' })

export const metadata: Metadata = {
  title: 'TheDesk | Clarity. Authority. Truth.',
  description: 'AI-native broadsheet news platform.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${lora.variable} ${raleway.variable}`}>
      <body>{children}</body>
    </html>
  )
}
