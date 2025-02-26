import '../globals.css';


export const metadata = {
  title: 'Tap2Get',
  description: 'Food Delivery App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        {children}
      </body>
    </html>
  )
}
