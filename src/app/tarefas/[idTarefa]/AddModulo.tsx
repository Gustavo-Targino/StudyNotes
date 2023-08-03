'use client'

import EmptyClass from "@/components/EmptyClass/EmptyClass"
import { ITarefas } from "@/types/ITarefa"
interface IAddModulo {
    data: ITarefas,
    idTarefa: string
}

import { FetchException, TarefasService } from "@/TarefasService/TarefasService"
import { useState, useEffect } from "react"
import Link from "next/link"

export default function AddModulo({data, idTarefa}:IAddModulo) {

    const[aulas, setAulas] = useState(data.aulas)

    useEffect(()=> {
        TarefasService.getById(idTarefa).then((res)=> {
            if(res instanceof FetchException) {
                window.alert('Houve um erro ao consultar os dados da tarefa! Tente novamente')
            } else {
                setAulas(res.aulas)
            }
        })
    }, [])

    return (

        <section className='flex flex-col justify-center items-scretch gap-6 w-full p-6'>

        {aulas.length > 0 ?
        
        <>
            {aulas.map((item, index)=> (
                <Link href={`${data.id}/visualizar/${item.id}`} className="w-full" key={index}>
                <button className='w-full border-2 p-4 rounded text-xl bg-stone-700 hover:bg-transparent transition-all duration-300 text-start'>{item.titulo}
                </button>
                </Link>
            ))}
        </>
           
           :

           <EmptyClass/>
           

    }

        <Link href={`${data.id}/add`}>
        <button   className='border-dashed border-2 transition-all duration-300 w-full p-6 text-xl bg-stone-700 hover:bg-transparent'>+</button>
        </Link>


        </section>



    )


}