'use client'
import AddEditClass from "@/components/AddEditClass/AddEditClass"
import useClass from "@/zustand/store"

export default function Edit({ params }:{params:{idTarefa:string, idAula:string}}) {

    const { editClassData } = useClass()

    return (
        <AddEditClass  params={params} data={editClassData} action='edit'/>
    )


}