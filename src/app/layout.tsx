import type { Metadata } from 'next'
import '@/styles/globals.scss'
import BootstrapClient from '@/components/BootstrapClient'

export const metadata: Metadata = {
  title: 'MS Design System',
  description: 'Morgan Stanley design system powered by Bootstrap 5',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <BootstrapClient />
      </body>
    </html>
  )
}
