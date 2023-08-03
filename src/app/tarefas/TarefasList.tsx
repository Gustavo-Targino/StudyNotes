'use client'

import { ITarefas } from '@/types/ITarefa'
import { FetchException } from '@/TarefasService/TarefasService'
import AddTarefa from './AddTarefa'
import FetchError from '@/components/FetchError/FetchError'

interface IProps{
    props: ITarefas[] | FetchException
}

export default function TarefasList({props}:IProps) {
   
    return (
        <>

{'length' in props ? 

<AddTarefa props={props}/>

:

<FetchError/>


}



        </>
    )
}