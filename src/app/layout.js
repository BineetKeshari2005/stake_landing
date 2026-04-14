import '../styles/globals.css'

export const metadata = {
  title: 'Stake – Discover High-Growth Property Investments',
  description: 'Join the CEG Equity Token batch. Start building your portfolio with fractional ownership of global assets.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
