import { Dispatch, SetStateAction, useState } from "react"

type setState = {
    setState: Dispatch<SetStateAction<string>>
}

interface ITextInputProps {

    value?:string,
    type?:string,
    fullW?:boolean,
    placeholder?:string,
   onChange: (newValue:string)=> void,
   regex?: boolean,
   error?:boolean,
   sx?:string

}

export default function TextInput({ type='text', fullW, placeholder, onChange, regex, error, sx='', value='' }:ITextInputProps) {

    const handleRegex =(e: React.FormEvent<HTMLInputElement>)=> {
       
        console.log(e.currentTarget.value)
        onChange(e.currentTarget.value)
    }


    return ( 
        <div className='w-full'>
        <input type={type} placeholder={placeholder} value={value} onChange={ regex ? handleRegex : e=> onChange(e.target.value) } className={`border-2 rounded-md p-2 ${fullW && 'w-full'} hover:border-slate-400 ${error && 'border-red-500'} ${sx}`} />
        {error && <p className='text-sm pl-2 text-red-500'>Insira os dados.</p>}
        </div>
    )

}