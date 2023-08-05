'use client'
import { useState } from "react";
import Link from "next/link"
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import MobileMenu from "./MobileMenu";
export default function Topo() {

    const[open, setOpen] = useState(false)

    const close = ()=> {
        setOpen(false)
    }

    return (
       <>
        <header className="w-full h-24 p-5 flex justify-around items-center relative">
            <Link href='/' className='hover:underline'>
                <h1 className="font-black tracking-widest text-xl">StudyNotes</h1>
            </Link>

            <ul className='hidden justify-center items-center gap-5 sm:flex'>
               <Link href='/' className="hover:underline"><li>Início</li></Link> 
               <Link href='/tarefas' className='hover:underline'><li>Tarefas</li></Link> 
            </ul>

            <button className="sm:hidden w-fit text-4xl" onClick={()=> setOpen(!open)}>
                
                { open ?
                    <CloseIcon/>
                    :

                    <MenuIcon/>
                }
                
                
                </button>


        
        </header>
        <MobileMenu open={open} close={close} />
                </>

    )

}