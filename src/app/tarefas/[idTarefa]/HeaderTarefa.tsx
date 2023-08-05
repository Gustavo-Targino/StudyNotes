'use client'

import { useState, useEffect } from 'react' 

import { ITarefas } from "@/types/ITarefa";

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CircleIcon from '@mui/icons-material/Circle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { PerProgress } from '@/Functions/PerProgress'
import { FetchException, TarefasService } from '@/TarefasService/TarefasService';
import { ValidaTexto } from '@/Functions/ValidaTexto';
import Toggle from '@/components/Toggle/Toggle';
import { useRouter } from 'next/navigation';
import { Modal } from '@/components/Modal';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import useClass from '@/zustand/store';
import CelebrationIcon from '@mui/icons-material/Celebration';
import { formataData } from '@/Functions/FormataData';

interface ITarefaProps {
    data: ITarefas,
    children: React.ReactNode
}

export default function HeaderTarefa({data, children}:ITarefaProps) {

    const classes = useClass()

    const router = useRouter()

    const[openHeader, setOpenHeader] = useState(true)

    const[edit, setEdit] = useState(false)

    const[finished, setFinished] = useState(data.finished)

    const[nomeTarefa, setNomeTarefa] = useState(data.nome)

    const[modalContext, setModalContext] = useState('Excluir')
    const[modalOpen, setModalOpen] = useState(false)

    const handleClickEdit = ()=> {
        setEdit(!edit)    
    } 

    useEffect(()=> {
        
        TarefasService.getById(data.id).then((res)=> res instanceof FetchException ? [] : handleUpdateDoneState(res.done) )

        
        // res.map((item)=> {
        //     classes.addClassDone({idTarefa: data.id, done:item.done})
        // })
    }, [])

    const handleUpdateDoneState=(done: string[])=> {
       
        classes.splitClassDone(done)
    }
    
    useEffect(()=> {
        if(edit) {
            window.document.getElementById('taskName')?.focus()
        }
    }, [edit])

    const handleDelete = async()=> {

        TarefasService.deleteById(data.id).then((res)=> res===undefined ? router.push('/tarefas') : window.alert('Erro ao excluir esta tarefa.') )

    }

    const handleHeader = ()=> {
        setOpenHeader(!openHeader)
    }

    const handleNameEdit = async()=> {

        if(ValidaTexto(nomeTarefa)) {
            window.alert('O nome da tarefa não pode ser vazio!')
            setEdit(false)
            setNomeTarefa(data.nome)
            return
        }

        const dataToUpdate = Object.assign(data, {nome:nomeTarefa})

        TarefasService.updateById(data.id.toString(), dataToUpdate).then((res)=>'id' in res ? setEdit(false) : window.alert('Houve um erro ao atualizar o nome da tarefa.'))
    }

    const handleTaskFinished = ()=> {

        if(classes.done.length != data.aulas.length) {
            setModalContext('Pendente')
            setModalOpen(true)
        } else {
            TarefasService.updateEspecific(data.id.toString(), {finished: !finished, concluidaEm: formataData(new Date)}).then((res)=> {
                if(res instanceof FetchException) {
                    window.alert('Erro ao atualizar tarefa! Tente novamente')
                } else {
                    setFinished(res.finished)
                    if(res.finished) {
                        setModalContext('Sucesso')
                        setModalOpen(true)
                    } 
                }
            })
           
        }

       
       

    }

    return (

        <main className='flex flex-col justify-start items-start w-full p-6 gap-6'>
            <span className='mx-auto cursor-pointer' onClick={handleHeader}> {openHeader ? <ExpandLessIcon sx={{fontSize:'1.5rem'}}/> : <KeyboardArrowDownIcon sx={{fontSize:'1.5rem'}}/>} </span>
        <div className={`${openHeader ? 'flex' : 'hidden'} flex-col items-baseline w-full p-2`}>
        <div className='flex justify-between items-baseline sm:items-center w-full '>
            <div className='flex flex-col justify-start p-2 gap-1'>
            <input className='font-bold tracking-wider text-2xl bg-transparent w-full focus:outline-0' id='taskName' disabled={!edit} onChange={(e)=> setNomeTarefa(e.target.value)}  value={nomeTarefa}></input>
            {edit && <button className='border-2 rounded w-1/2' onClick={handleNameEdit}>Editar</button> } 
            </div>
       
            <div className='flex flex-col sm:flex-row gap-6 '>
                <button onClick={handleClickEdit}>
                    <EditIcon/>
                </button>
                <button onClick={()=> {setModalOpen(true); setModalContext('Excluir')}}>
                    <DeleteIcon/>
                </button>
            </div>
            
        </div>
        
        <div className='ml-auto'>
            <Toggle onChange={handleTaskFinished} checked={finished} />
        </div>

        <div className='flex gap-4 mt-4 mx-auto sm:ml-auto sm:mr-0 w-fit'>
            
          <p>Criada em {data.criadaEm}</p>
          {finished ? 
          <>
        <CheckCircleOutlineIcon sx={{color:'#059669'}} />
            <p> Concluída em {data.concluidaEm}</p>
          </>
        :

        <div className='flex justify-center items-center gap-1 '>  
             <span>{PerProgress(classes.done.length, data.aulas.length)}%</span>
            <CircleIcon sx={{fontSize:'1rem', color: PerProgress(classes.done.length, data.aulas.length)<=30 ? '#dc2626' : PerProgress(classes.done.length, data.aulas.length)<=70 ? '#eab308' : '#059669' }}/>
        </div>
}   
          </div>
</div>

    { children }

    <Modal.Root open={modalOpen}>
        
        <Modal.Header>
            <h2 className='text-center'>
                {modalContext === 'Excluir' && 'Tem certeza que deseja excluir esta tarefa?'}
                {modalContext === 'Pendente' && 'Você possui aulas em aberto.'}
                {modalContext === 'Sucesso' &&<> Parabéns! <CelebrationIcon/> </> }
            </h2>
        </Modal.Header>

<Modal.Content>
    <div className='flex flex-col gap-4'>
    <h2> 
        {modalContext === 'Excluir' && 'Você perderá todos os módulos, comentários e links relacionados a esta tarefa.'}
        {modalContext === 'Pendente' && 'Conclua as aulas restantes e tente novamente.'}
        {modalContext === 'Sucesso' && 
        <>
       Você conclucuiu {data.nome} com sucesso!
       <br></br>
       <br></br>
       Agora, aproveite esse momento para refletir sobre tudo que você aprendeu e sinta-se orgulhoso(a) das suas realizações. Lembre-se que o aprendizado é uma jornada contínua, então, há sempre novos conhecimentos!
    <br></br>
    <br></br>
       Continue aproveitando a plataforma para explorar novos cursos, aprofundar-se em temas de interesse e continuar crescendo como estudante e como pessoa.

        </>
        }
        
    </h2>
    <h2 className='text-center font-bold'>{modalContext==='Excluir' && ' Esta ação é irreversível.'}</h2>
    </div>
</Modal.Content>

    {modalContext === 'Excluir' &&   <Modal.Actions close={()=>setModalOpen(false)} action={handleDelete} actionText='Excluir' />}
    {modalContext === 'Pendente' &&   <Modal.Actions close={()=>setModalOpen(false)} />}
    {modalContext === 'Sucesso' &&   <Modal.Actions close={()=>setModalOpen(false)} />}
  

    </Modal.Root>


        </main>
    )

}