'use client'

import { ITarefas } from "@/types/ITarefa"

import { useState, useEffect } from 'react'
import EmptyTask from '@/components/EmptyTask/EmptyTask'
import CardTarefa from "./CardTarefa"
import { Modal } from '@/components/Modal'
import Loader from '../../components/Loader/Loader'
import { FetchException, TarefasService } from '@/TarefasService/TarefasService'
import TextInput from '@/components/Inputs/TextInput'
import { ValidaTexto } from '@/Functions/ValidaTexto'
import Alert from '@/components/Alert/Alert'
import FetchError from "@/components/FetchError/FetchError"
import React from 'react'
import { formataData } from "@/Functions/FormataData"

interface Props {
    props: ITarefas[] | FetchException,
}

export default function AddTarefa({props}:Props) {

    const [tarefas, setTarefas] = useState(props)

    useEffect(()=> {
        TarefasService.getAll().then((res)=> {
            if(res instanceof FetchException) {
                window.alert('Houve um erro ao consultar a lista de tarefas! Tente novamente')
            } else {
                setTarefas(res)
            }
        })
    }, [])


    const[open, setOpen] = useState(false)

    const[nomeTarefa, setNomeTarefa] = useState('')
    const[errorNome, setErrorNome] = useState(false)

    const[addLoading, setAddLoading] = useState(false)

    const[fetchOK, setFetchOk] = useState<boolean | null>(null)

    const handleModal = ()=> {
        setOpen(!open)
    }


    const handleAdd = ()=> {
        if(ValidaTexto(nomeTarefa)) {
            setErrorNome(true)
            return
        }
            setAddLoading(true)
            setErrorNome(false)
            const now = new Date
            TarefasService.create({
                nome: nomeTarefa,
                finished: false,
                done:[],
                aulas:[],
                concluidaEm: null,
                criadaEm: formataData(now)
            }).then(async(res)=> {
                if('id' in res) {
                    setFetchOk(true)
                   setTarefas(await TarefasService.getAll())
                   setNomeTarefa('')
                   setErrorNome(false)
                } else {
                    setFetchOk(false)
                }
            })
            
            setAddLoading(false)
            setOpen(false)

        
    }

    return (
        <>
<main className='flex flex-col justify-start items-center sm:items-start p-6 gap-5'>
    <div className='flex justify-between items-center w-full'>
        <h2 className='font-bold tracking-wider text-2xl'>Tarefas</h2>
        <div className="hidden sm:block">
    {fetchOK!=null && <Alert severity={`${fetchOK ? 'success':'error'}`}  message={`${fetchOK ? 'Tarefa criada com sucesso!' : 'Houve um erro ao criar sua tarefa.'}`}  setWaiting={setFetchOk} time={5000} />}
        </div>
        {addLoading ? 
            <Loader />
            :
        <button className='uppercase border-2 rounded p-3 text-xs font-semibold' onClick={handleModal}>Adicionar tarefa</button>
    }
    </div>
    <div className="block sm:hidden">
    {fetchOK!=null && <Alert severity={`${fetchOK ? 'success':'error'}`}  message={`${fetchOK ? 'Tarefa criada com sucesso!' : 'Houve um erro ao criar sua tarefa.'}`}  setWaiting={setFetchOk} time={5000} />}
        </div>
<section className="flex flex-col justify-center items-scretch sm:justify-start sm:items-center sm:flex-row gap-6 flex-wrap ">
{ 'length' in tarefas ? 
<>
{tarefas.length > 0 ? 

<>

{React.Children.toArray (
    tarefas.map((tarefa)=> <CardTarefa props={tarefa} />)
)}

  
</>

:

<EmptyTask/>

}

    </>

:
<FetchError/>

}


</section>
</main>

<Modal.Root open={open}>
    <Modal.Header>
        <h2 className='text-center'>Inserir nova tarefa</h2>
    </Modal.Header>
    <Modal.Content>
             <div>
                <h2 className='text-sm tracking-wider mb-2'>É simples! Insira o nome da sua tarefa e prossiga para editá-la.</h2>
                <TextInput fullW placeholder="Nome da tarefa" value={nomeTarefa} onChange={setNomeTarefa} error={errorNome}  />
            </div>
    </Modal.Content>
    <Modal.Actions close={handleModal} actionText='Enviar' action={handleAdd} />
</Modal.Root>

</>
    )



}