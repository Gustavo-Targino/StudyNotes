import { BaseUrl } from "@/constant/BaseUrl"
import { ITarefas } from "@/types/ITarefa"


export class FetchException extends Error {
    public readonly message = 'Houve um erro, tente novamente.'
    constructor(message:string) {
        super()
        this.message
    }

}

const create = async(newData:Omit<ITarefas, 'id'>):Promise<ITarefas[] | FetchException> => {
    try {
        const res = await fetch(`${BaseUrl}tarefas`,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newData)
        })
        const data = await res.json()
        return data
    } catch(error:any) {
        return new FetchException(error.message || 'Erro ao criar a tarefa.')
    }
}

const getAll = async():Promise<ITarefas[] | FetchException> => {
    try {
        const res = await fetch(`${BaseUrl}tarefas`, {cache:'no-store'})
        const data = await res.json()
        return data
    } catch(error:any) {
        return new FetchException(error.message || 'Erro na consulta.')
    }
}

const getById = async(id:string | number):Promise<ITarefas | FetchException> => {
    try {
        const res = await fetch(`${BaseUrl}tarefas/${id}`, {cache:'no-store'})
        const data = await res.json()
        return data
    } catch(error:any) {
        return new FetchException(error.message || 'Erro na busca.')
    }
}

const updateEspecific = async(id:string, dataToUpdate:any):Promise<ITarefas | FetchException> => {
    try {
        const res = await fetch(`${BaseUrl}tarefas/${id}`, {
            method:'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToUpdate)
        })
        const data = await res.json()
        return data
    } catch(error:any) {
        return new FetchException(error.message || 'Erro ao atualizar.')
    }
}

const updateById = async(id:string, dataToUpdate:ITarefas):Promise<ITarefas | FetchException> => {
    try {
        const res = await fetch(`${BaseUrl}tarefas/${id}`, {
            method:'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToUpdate)
        })
        const data = await res.json()
        return data
    } catch(error:any) {
        return new FetchException(error.message || 'Erro ao atualizar.')
    }
}

const deleteById = async(id:number):Promise<undefined | FetchException> => {
    try {
        await fetch(`${BaseUrl}tarefas/${id}`, {
            method:'DELETE'
        })
       return undefined
    } catch(error:any) {
        return new FetchException(error.message || 'Erro ao atualizar.')
    }
}

export const TarefasService = {
    create,
    getAll,
    getById,
    updateById,
    updateEspecific,
    deleteById
}