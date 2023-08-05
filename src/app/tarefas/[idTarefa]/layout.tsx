import { FetchException, TarefasService } from '@/TarefasService/TarefasService'
import HeaderTarefa from './HeaderTarefa'
import FetchError from '@/components/FetchError/FetchError'

const getData = async(id:string) => {
  return TarefasService.getById(id)
}

export async function generateMetadata({params}:{params:{idTarefa:string}}) {

  const { idTarefa } = params

  const data = await getData(idTarefa)

  if(data instanceof FetchException || data.nome === undefined) {
    return {
      title:'Falha na conexão'
    }
  } else {
    return {
      title:`Notes - ${data.nome}`
    }
 } 

 
  


}

export default async function Layout({
  children,
  params
}: {
  children: React.ReactNode,
  params: {idTarefa:string}
}) {


    const data = await getData(params.idTarefa)

    
  return (
<>
{'id' in data ?
<HeaderTarefa data={data}>
   {children}
   </HeaderTarefa>

:
  
  <FetchError/>

}

    </>
  )
}