'use client'

import { useRouter } from "next/navigation"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from "react";
import Loader from "@/components/Loader/Loader";
import { FetchException, TarefasService } from "@/TarefasService/TarefasService";
import { ITarefas } from "@/types/ITarefa";
import TextInput from "@/components/Inputs/TextInput";

interface IAddEditClass {
    params:{
        idTarefa:string,
        idAula:string
    },
    data: {
        nomeAula: string,
        link: string
    },
    action: string
}

export default function AddEditClass({params, data, action}:IAddEditClass) {

    const router = useRouter()

    const[nomeAula, setNomeAula] = useState(data.nomeAula)
    const[link, setLink] = useState(data.link)

    const[error, setError] = useState(false)

    const[loading, setLoading] = useState(false)

    const handleNome = (value:string) => {
        setNomeAula(value)
        setError(false)
    }

    const handleLink = (event:React.ChangeEvent<HTMLInputElement>)=> {
       
        let value = event.currentTarget.value

        if(value.includes('&')) {
            const linkPart = value.substring(value.indexOf('watch?v='), value.indexOf('&'))
            const linkId = linkPart.substring(linkPart.indexOf('v=')).replace('v=', '')
            setLink(linkId) 
            return
        }

        setLink(value.substring(value.indexOf('v=')).replace('v=',''))
    }

    const handleAulaAdd = async()=> {

        if(nomeAula === '') {
            setError(true)
            return
        }

        setLoading(true)

        const data = await TarefasService.getById(params.idTarefa)

        if('id' in data ) {

            if(action === 'edit') {
                const newAulasArray = [...data.aulas].filter((aula)=> {
                    if(aula.id.toString() === params.idAula) {
                        aula.titulo = nomeAula,
                        aula.youtubeLink = link
                    }
                    return aula
                })
                TarefasService.updateEspecific(params.idTarefa, { aulas: newAulasArray  }).then((res=> {
                    if(res instanceof FetchException) {
                        window.alert('Erro ao atualizar tarefa! Tente novamente')
                    } else {
                        router.push('/tarefas/' + params.idTarefa)
                    }
                }))
                return
            }

            if(data.aulas.length === 0) {
                const dataUpdated = Object.assign(data, {aulas:[...data.aulas, {titulo:nomeAula, comentario:'', id:1, youtubeLink:link}]})
                TarefasService.updateById(data.id.toString(), dataUpdated).then((res)=> res instanceof FetchException ? window.alert('Erro ao adicionar a aula.') : AddAula(dataUpdated, data.id.toString()))
                
            } else {

                
                const dataUpdated = Object.assign(data, {aulas:[...data.aulas, {titulo:nomeAula, comentario:'', id:data.aulas.length+1, youtubeLink:link}]})
                
                TarefasService.updateById(data.id.toString(), dataUpdated).then((res)=> res instanceof FetchException ? window.alert('Erro ao adicionar a aula.') : AddAula(dataUpdated, data.id.toString()))
                
            }

        } else {
            window.alert('Houve um erro ao realizar a consulta, tente novamente.')
        }
    }

    const AddAula = async(dataToUpdate:ITarefas, id:string)=> {
        TarefasService.updateById(id, dataToUpdate).then((res)=> res instanceof FetchException ? window.alert('Erro ao adicionar a aula.') : router.back())
    }

    return (
        <div className="flex flex-col gap-4 justify-center items-center w-full h-full">
           
            <button onClick={()=>router.back()} className="flex justify-center items-center gap-3 border-2 rounded p-2 mr-auto"> <ArrowBackIcon/> {data.nomeAula != '' ? 'Voltar para a aula' :' Voltar para a lista de aulas'}</button>
        
            <TextInput onChange={(e)=> handleNome(e)} error={error} value={nomeAula} placeholder="Nome da aula" fullW sx="text-black" />
            <div className={`w-full ${link!='' ? 'h-screen' : 'h-max'} border-dashed p-4 border-2 rounded flex flex-col gap-4 justify-center items-center`} >

        <div className='w-full flex flex-col justify-center items-center gap-4'>


            <input className="w-full bg-transparent cursor-pointer text-center p-2" placeholder="Adicionar Link do Youtube para aula" onChange={handleLink} value={link} ></input>
          
        </div>

            {link != '' &&

            <iframe src={`https://www.youtube.com/embed/${link}`} className="w-full h-full"></iframe>

            }
            </div>

                   
            

      <button className='border-2 p-2 rounded' onClick={handleAulaAdd} disabled={loading}>
            {loading ?
            
                <Loader />

                :

                <>
                    {data.nomeAula != '' ?
                    'Editar aula'
                    :
                    'Adicionar aula'
                }
                </>
        } 
        </button>
            

        </div>
    )

}