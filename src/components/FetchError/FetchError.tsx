'use client'
export default function FetchError() {

    return (
        <div className='text-center'>
<h1 className='font-bold text-xl'>Houve um erro, <button className='underline' onClick={()=>location.reload()}>tente novamente</button></h1>

</div>
    )

}