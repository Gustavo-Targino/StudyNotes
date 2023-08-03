export default function SkeletonTarefa() {

    return (
        <div className="flex flex-col w-full gap-4 p-4">
        
            {Array.from({length:5}).map((item, index)=> (
                <div className="w-full p-8 bg-slate-700 rounded animate-pulse" key={index} />
               ))}
             
        </div>
    )


}