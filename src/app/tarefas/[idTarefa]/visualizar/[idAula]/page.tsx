import { TarefasService } from "@/TarefasService/TarefasService";
import AulaPage from "./AulaPage";
import FetchError from "@/components/FetchError/FetchError";

interface IParams {
    params: {
        idAula:string,
        idTarefa:string
    },
}

export default async function VisualizarTarefa({params}:IParams) {

    const getData = async()=> {

       const response = await TarefasService.getById(params.idTarefa)

        if('id' in response) {
          return response
        } else {
            return null
        }
    
    }

    const data = await getData()

return (
   <>
   
    {data!=null ?
   <AulaPage data={data} aula={data.aulas[parseInt(params.idAula) -1 ]} params={{idAula: params.idAula, idTarefa:params.idTarefa}} />
    :
    <div className='w-full'>
        <FetchError/>
    </div>
}
   </>
)

}