import { ChildrenType } from "./ModalChildrenType"

interface IModalHeader {

    children: ChildrenType

}

export default function ModalHeader({ children }:IModalHeader) {

    return (
        <div className="text-xl font-bold p-2 border-2">
            { children }
        </div>
    )

}