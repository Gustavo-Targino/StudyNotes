export interface ITarefas {
        nome:string,
        done: string[],
        finished: boolean,
        id: number,
        criadaEm:string,
        concluidaEm: string | null,
        aulas:{id: number, titulo: string, youtubeLink:string, comentario: string}[]
}
