import './globals.css'
import type { Metadata } from 'next'
import { Roboto_Flex as Roboto } from 'next/font/google'
import Topo from '@/components/Topo/Topo'
const roboto = Roboto({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'To.do',
  description: 'Seu organizador de tarefas',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className={`${roboto.className} text-white bg-stone-800`}>
          <Topo/>
          {children}
          </body>
    </html>
  )
}
