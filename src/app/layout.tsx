import './globals.css'
import type { Metadata } from 'next'
import { Roboto_Flex as Roboto } from 'next/font/google'
import Topo from '@/components/Topo/Topo'
import Footer from '@/components/Footer/Footer'
const roboto = Roboto({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'StudyNotes',
  description: 'Seu organizador de estudos',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className={`${roboto.className} bg-stone-800 text-white`}>
          <Topo/>

          {children}

          <Footer/>
        </body>
    </html>
  )
}
