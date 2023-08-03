'use client'

import { ChildrenType } from "./ModalChildrenType"

interface IModalRoot {

    children: ChildrenType,
    open: boolean

}

export default function ModalRoot({ children, open }:IModalRoot) {

    return (

        <>
         { open && (
             <div className="fixed inset-0 z-10 bg-black bg-opacity-25 text-gray-700">
                <div className='flex h-full w-full items-center justify-center'>
                    <div className="absolute z-50  mx-auto  flex h-screen w-screen sm:h-fit sm:w-[480px] flex-col overflow-hidden rounded-xl bg-white shadow-2xl">
                    { children }
                    </div>
                </div>
            </div>
        ) }
        </>

    )

}