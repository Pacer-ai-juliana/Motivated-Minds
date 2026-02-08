import './globals.css'

export const metadata = {
  title: 'Motivated Minds',
  description: 'A private community for people building exceptional lives.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
