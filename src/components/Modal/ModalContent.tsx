import { ChildrenType } from "./ModalChildrenType"

interface IModalPropsContent {
    children: ChildrenType
}

export default function ModalContent({ children }:IModalPropsContent) {
    
    return (
        <div className='p-4 py-8 text-zinc-500'>

                {children}
                
        </div>
    )

}