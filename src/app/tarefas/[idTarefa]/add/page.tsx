'use client'
import AddEditClass from "@/components/AddEditClass/AddEditClass"

export default function Add({params}:{params:{idTarefa:string, idAula:string}}) {

    return (
        <AddEditClass params={params} data={{nomeAula:'', link:''}} action='add'/>
    )

}