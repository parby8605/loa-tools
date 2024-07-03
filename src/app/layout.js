import './globals.css'
import Header from '@/app/components/Header/Header'
import Footer from '@/app/components/Footer/Footer'

export const metadata = {
  title: 'LOA TOOLS',
  description: 'Parby PORTFOLIO',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <head>
        <meta charSet='UTF-8' />

        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <title>LOA TOOLS</title>
        <meta name='description' content='Web site created...' />
      </head>
      <body className='bg-[rgb(250,250,250)]'>
        <Header />
        <div id='root'>{children}</div>
        <Footer />
      </body>
    </html>
  )
}
