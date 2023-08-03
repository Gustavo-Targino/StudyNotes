interface IMobileMenuProps {
    open:boolean,
    close: ()=>void
}

import Link from "next/link"

export default function MobileMenu({open, close}:IMobileMenuProps) {


    return (
        <>
        {open && 

        <nav className={`bg-slate-800 rounded-lg w-screen h-fit relative animate-openmenu sm:hidden `}>
            <div className="p-8">
                <ul className="flex flex-col gap-4 font-semibold text-xl">
                   <Link href='/' onClick={close}><li>Início</li></Link> 
                   <Link href='/tarefas' onClick={close}><li>Tarefas</li></Link> 
                </ul>
            </div>
        </nav>
    
        }
        </>
    )



}