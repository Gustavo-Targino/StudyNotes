'use client'
import { useEffect, useState } from 'react';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
interface IAlert {

    severity: string,
    message:string,
    time?:number,
    setWaiting?:(newValue:null)=>void

}

export default function Alert({severity, message, time, setWaiting}:IAlert) {

    const[openAlert, setOpen] = useState(true)

    useEffect(()=> {
        if(time && severity!='error') {

            setTimeout(handleClose, time)

        }
    }, [])

    const handleClose = ()=> {
        setOpen(false) 
        if(setWaiting){
            setWaiting(null)
        }
    }

    return (
        <>
        {openAlert && 
            <div className={`${severity === 'success' ? 'bg-emerald-500' : severity==='error' ? 'bg-red-600' : severity==='info'?'bg-sky-400' : 'bg-transparent'} p-3 flex justify-center items-center gap-4 rounded`}> 

                    {
                        severity === 'error' ? <ErrorIcon/> :
                        severity === 'warning' ? <WarningIcon/> :
                        severity === 'success' ? <CheckCircleOutlineIcon/> : ''
                    }

                <p className='text-sm'>{message}</p>

                    <button onClick={handleClose}>
                <CloseIcon/>
                    </button>
            </div>
        }
        </>

    )


}