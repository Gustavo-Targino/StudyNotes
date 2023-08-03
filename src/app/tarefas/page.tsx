import { TarefasService } from '../../TarefasService/TarefasService'
import TarefasList from "./TarefasList";


export default async function TarefasPage() {

    const data = await TarefasService.getAll()
  
return (
    <>
   <TarefasList props={data}  />
    </>
)

}