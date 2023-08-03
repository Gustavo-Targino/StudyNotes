'use client'

import { useState, useEffect } from 'react';

import CircleIcon from '@mui/icons-material/Circle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { ITarefas } from '@/types/ITarefa';
import Link from 'next/link';

interface IProps{
    props: ITarefas
}

export default function CardTarefa({props}:IProps) {

    const[progress, setProgress] = useState<number>(perProgress(props.done.length, props.aulas.length))

    function perProgress(done:number, all:number) {
        
        if(done === 0) {
            return 0
        }
        const porcentagem = (done / all) * 100;
        return parseFloat(porcentagem.toFixed(1))
    }

    return (
        <Link href={`/tarefas/${props.id}`}>
    <section className="flex flex-col p-4 rounded-lg shadow-xl bg-gray-800 border-gray-700 hover:cursor-pointer hover:scale-105 max-w-md flex-wrap">
        <div className="flex justify-center items-center gap-5">
            <div className='flex flex-col'>
                <h3 className="font-bold text-xl tracking-widest">{props.nome}</h3>
                <p className='text-slate-500 text-sm'>Criada em {props.criadaEm}</p>
                <p className='text-slate-500 text-sm'>
                    
                    {props.aulas.length === 0 ?
                        'Nenhuma aula adicionada'
                        : 
                        <>
                        {props.aulas.length} {props.aulas.length > 1 ? 'aulas' : 'aula'}, {props.done.length} {props.done.length > 1 ? 'concluídas' : 'concluída'} 
                        </>
                    }    
                    
                </p>
            </div>
           
            {props.finished ? 
                <CheckCircleOutlineIcon sx={{color:'#059669'}} />

                :

                <div className='flex justify-center items-center gap-1'>  
                     <span>{progress}%</span>
                    <CircleIcon sx={{fontSize:'0.5rem', color: progress<=30 ? '#dc2626' : progress<=70 ? '#eab308' : '#059669' }}/>
                </div>
        }
        </div>
    </section>
        </Link>
    )


}