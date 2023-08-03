interface IModalActionsProps {
    close: ()=>void,
    actionText?:string,
    action?: ()=>void,
}



export default function ModalActions({ close, actionText, action }:IModalActionsProps) {

    return (

        <div className='flex justify-end w-full p-3 border-2 gap-3'>
            <button className='p-2 bg-slate-500 text-white rounded text-sm' onClick={close} >Fechar</button>
            {action && 
                <button className='p-2 gradient rounded text-sm text-white font-bold' onClick={action}>
                        {actionText}
                    </button>
            }
        </div>


    )


}