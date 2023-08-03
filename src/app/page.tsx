import WavingHandIcon from '@mui/icons-material/WavingHand';
import Link from 'next/link';
export default function Home() {
  return (
    <main className='flex justify-evenly items-center p-16 h-96 gap-5 flex-wrap'>
      <section className='flex flex-col items-start align-center gap-5'>
        <div className='flex items-center justify-center gap-3 text-5xl'>
          <h1 className="font-bold">Olá, Dev!</h1>
          <WavingHandIcon sx={{fontSize:'2rem'}}/>
        </div>
        <div>
          <p>Esta é sua aplicação de gerenciamento de estudos.</p>
          <p>Cadastre linguagens, trace metas, acompanhe o seu desenvolvimento.</p>
        </div>
        <Link href='/tarefas' className='self-center'>
        <button className='font-bold uppercase text-sm hover:underline hover:underline-offset-8'>
          <div className='rounded-md gradient p-1 hover:animate-pulse'>
            <div className='flex items-center justify-center bg-gray-800 back p-5'>
              <span className='font-bold'>Comece agora</span>
            </div>
          </div>
          </button>
        </Link>
      </section>
      
   <div className='photo_change'/>

    </main>
  )
}
