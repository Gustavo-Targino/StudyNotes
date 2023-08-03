'use client'

import { ITarefas } from "@/types/ITarefa";
import { Modal } from "@/components/Modal";
import TableRowsIcon from '@mui/icons-material/TableRows';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import { useState, useEffect } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation'
import Toggle from "@/components/Toggle/Toggle";
import { FetchException, TarefasService } from "@/TarefasService/TarefasService";
import CircleIcon from '@mui/icons-material/Circle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import InfoIcon from '@mui/icons-material/Info';
import useClass from "@/zustand/store";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Link from "next/link";
interface IAulas {
   aula: {id: number, titulo: string, youtubeLink:string, comentario: string},
   data: ITarefas,
   params:{idTarefa:string, idAula:string}
}

export default function AulaPage({aula, data, params}:IAulas) {

    

   const classes = useClass()

   const router = useRouter()

    const[view, setView] = useState('column')

    const[modalOpen, setModalOpen] = useState(false)

    const[serverComment, setServerComment] = useState(aula.comentario)
    const[comment, setComment] = useState(aula.comentario)

    const[commentSaveOk, setCommentSaveOk] = useState(aula.comentario != '' ? true : null)


    const handleConcluded= ()=> {
    
        let dataUp = null
        let find = false

        if(classes.done.find((id_aula)=> id_aula === params.idAula)) {
            dataUp = [...classes.done].filter(id => id !== params.idAula)
            find = true
        } else {
            dataUp = [...classes.done, params.idAula]
            find = false
        }
        
        TarefasService.updateEspecific(data.id.toString(), {done:dataUp} ).then((res)=> {res instanceof FetchException ? window.alert('Erro') : upConcluded(find)})

    }

    const upConcluded = (find:boolean)=> {
    
        if(find) {
            const newDones = classes.done.filter(id => id!=params.idAula)
            classes.splitClassDone(newDones)
        } else {
            classes.addClassDone(params.idAula)
        }

    }

    const saveComment = (value:string)=> {

        const dataToUp = [...data.aulas].map((item)=> {
            if(item.id.toString() === params.idAula) {
                item.comentario = value
                return item
            } else {
                return item
            }
        }) 

        TarefasService.updateEspecific(data.id.toString(),{ aulas: dataToUp} ).then((res)=> {
            if(res instanceof FetchException) {
                setCommentSaveOk(false)
            } else {
                setCommentSaveOk(true)
                setServerComment(res.aulas[parseInt(params.idAula)-1].comentario)
            }
        })

    }

    useEffect(()=> {

        if(comment.length === 0 && serverComment.length === 0) {
            setCommentSaveOk(null)
            return
        }

        if(comment === serverComment && comment.length > 0 && serverComment.length > 0) {
            setCommentSaveOk(true)
        } else {
            setCommentSaveOk(false)
        }

    }, [comment])


    const handleCommentSave = (e:React.KeyboardEvent<HTMLTextAreaElement> | false, value:string)=> {

        if(e) {
            if (e.key === 's' && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                saveComment(e.currentTarget.value)
              }
        } else {
           saveComment(value)
        }
       
    }

    const handleEditRedirect = ()=> {
        classes.changeEditClassData({
            nomeAula: aula.titulo,
            link: aula.youtubeLink
        })
        
        router.push(`/tarefas/${params.idTarefa}/visualizar/${params.idAula}/edit`)
    }

    const handleClassDelete = ()=> {
        const newAulasArray = [...data.aulas].filter((aula) => aula.id.toString() != params.idAula)
        const newDoneArray = [...data.done].filter((idAula)=> idAula != params.idAula)

        const dataToUp = {...data, done: newDoneArray, aulas: newAulasArray}

        TarefasService.updateById(params.idTarefa, dataToUp).then((res)=> {
            if(res instanceof FetchException) {
                window.alert('Erro ao deletar tarefa!')
            } else {
                router.push('/tarefas/' + params.idTarefa)
            }
        })

    }
   

return (
    <>
    <div className='flex w-full justify-between p-3 pb-0 flex-wrap gap-4 sm:gap-0'>
    <button onClick={()=>router.push(`/tarefas/${params.idTarefa}`)} className="flex justify-center items-center gap-3 border-2 h-12 rounded p-2 m-0 text-sm"> <ArrowBackIcon sx={{fontSize:'1rem'}}/> Voltar para a lista de aulas</button>
    <div className='flex flex-col items-center ml-auto'>
     <Toggle onChange={handleConcluded} checked={classes.done.indexOf(params.idAula) != -1}/>
        <div className="flex jsutify-center items-center gap-4 mt-5">

            <span className="cursor-pointer" onClick={handleEditRedirect}>
                <EditIcon/>
            </span>
        
        <span className='cursor-pointer' onClick={()=> setModalOpen(true)}><DeleteIcon/></span>
        </div>
    </div>
    </div>
    <div className='flex flex-col sm:flex-row gap-2 sm:gap-0 justify-start sm:justify-between items-center w-full p-3 pb-0'>
    <h1 className='w-full'>
        {aula.titulo}
    </h1>

{aula.youtubeLink != '' && (
    <div className="hidden sm:flex sm:gap-4 ">
    <button className={`border-2 rounded-md p-1 ${view==='column' && 'gradient'}`} onClick={()=>setView('column')}><TableRowsIcon/></button>
    <button className={`border-2 rounded-md p-1 ${view==='row' && 'gradient'}`} onClick={()=>setView('row')}><ViewColumnIcon/></button>
    </div>
        )}

    </div>
    <div className={`flex flex-col ${view==='column' ?'sm:flex-col' : 'sm:flex-row'} gap-2 justify-start sm:justify-center items-center w-full ${aula.youtubeLink != '' ? 'h-screen' : 'h-full'}`}>

        {aula.youtubeLink != '' ? 
            <iframe src={`https://www.youtube.com/embed/${aula.youtubeLink}`} title={aula.titulo} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" className={`w-full h-1/2 sm:h-full border-0 border-none`} allowFullScreen></iframe>

            :

            <div className={`flex justify-center items-center ${view==='column' ? 'w-full' : 'w-1/3'} gap-2 my-6 opacity-50 tracking-wide`}>
                <h3>Você não adicionou um vídeo à esta aula.</h3>
                <button className='underline' onClick={handleEditRedirect}>Adicione agora</button>    
            </div>

        }
 
 <div className={`flex flex-col ${view === 'column' ? 'w-full' : 'w-1/2'} justify-start ${view==='column' ? 'h-fit' : 'h-full'}`}>

 <div className='flex justify-between items-start opacity-70 gap-2 p-2 pb-1'>
            <div className='flex justify-center items-center gap-2'>
                {commentSaveOk === null ?  <CircleIcon sx={{fontSize:'0.8rem'}}/> : commentSaveOk ? <CheckCircleOutlineIcon sx={{fontSize:'1rem'}}/> : <InfoIcon sx={{fontSize:'1rem'}}/>}
           

            <p className="text-sm tracking-wide"> 
                    {commentSaveOk === null ? 'Comece a registrar suas anotações' : commentSaveOk ? 'Alterações salvas' : 'Há alterações não salvas.'}
                    {" "}
            </p>
            </div>

              <p className="text-sm tracking-wide"> (Crtl + S para salvar ou <span className='underline cursor-pointer' onClick={()=>handleCommentSave(false, comment)}>clique aqui</span>) </p> 

        </div>

 <textarea value={comment} placeholder="Anotações" onChange={(e)=>setComment(e.target.value)} onKeyDown={(e)=>handleCommentSave(e, e.currentTarget.value)} id="message" rows={4} className={`p-2.5 w-full h-1/2 ${view==='column' ? 'sm:min-h-full sm:max-h-52' : 'h-full'} sm:w-full text-sm bg-slate-700 rounded-lg border border-gray-300 text-white`}></textarea>
     
 </div>

    </div>
        <p className={`${aula.youtubeLink != '' ? 'block' : 'hidden'} w-full text-center mt-4 text-sm tracking-wide opacity-50`}>Não esqueça de apoiar seu criador de conteúdo!</p>



        <Modal.Root open={modalOpen}>
        <Modal.Header>
            <h2 className='text-center'>Tem certeza que deseja excluir esta aula?</h2>
        </Modal.Header>

<Modal.Content>
    <div className='flex flex-col gap-4'>
    <h2 >Você perderá todos os comentários e links relacionados a esta aula.</h2>
    <h2 className='text-center font-bold'>Esta ação é irreversível.</h2>
    </div>
</Modal.Content>

    <Modal.Actions close={()=>setModalOpen(false)} action={handleClassDelete} actionText='Excluir' />

    </Modal.Root>
        </>
)

}