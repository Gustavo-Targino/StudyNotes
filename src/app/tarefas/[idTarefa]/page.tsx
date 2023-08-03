import { FetchException, TarefasService } from "@/TarefasService/TarefasService"
import { ITarefas } from '@/types/ITarefa'

import FetchError from '@/components/FetchError/FetchError'
import { BaseUrl } from '@/constant/BaseUrl'
import AddModulo from './AddModulo'

interface IParams {
    params: {
        idTarefa: string
    },

}

// export async function generateStaticParams() {

//      const tarefas: Promise<ITarefas[]| FetchException> =  TarefasService.getAll()

//      const dados = await tarefas
    
//      const ok = dados instanceof FetchException

//      if(!ok) {
//          return dados.map((tarefa) => ({
//              idTarefa: tarefa.id.toString()
//           }))
//     } else {
//         return [{idTarefa:null}]
//     }
    

// }

// const dynamicParams = false;
// export { dynamicParams }

const getTarefas = async(id: string)=> {

    return TarefasService.getById(id)

}

export default async function DetalhesTarefa({ params }:IParams) {

    const { idTarefa } = params

    const data = await getTarefas(idTarefa)

    return (

     <>
     {'id' in data ? 

        <AddModulo data={data} idTarefa={idTarefa} />

        :

        <FetchError/>
        
    }
     </>
       
    )

}
