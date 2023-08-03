import { FetchException, TarefasService } from "@/TarefasService/TarefasService";
import { create } from "zustand";

type editData = {
    nomeAula:string,
    link: string
}

type State = {
    editClassData:editData,
    changeEditClassData:(data:editData) => void,
    done: string[],
    addClassDone: (newDone: string)=> void,
    splitClassDone: (newDone: string[]) => void,
    removeAll: ()=> void
}

const useClass = create<State>((set) => ({
    editClassData:{nomeAula:'', link:''},
    changeEditClassData: (data:editData) => {
        set( () => ({ editClassData:data }))
    },
    done: [],
    addClassDone: (newDone:string) => {
        set(state => ({ done:[...state.done, newDone] }))
    },
    splitClassDone: (newDone: string[]) => {
        set( () => ({ done: newDone  })  ) 
    },
    removeAll: ()=> {
        set(()=> ( {done:[]} ) )
    }
  }))


  export default useClass