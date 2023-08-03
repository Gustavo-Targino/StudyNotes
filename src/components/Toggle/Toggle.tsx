export default function Toggle({onChange, checked}: {onChange: ()=>void, checked:boolean}) {


    return (
        <div className='flex flex-col items-center justify-center gap-1'>
             <span className="text-sm font-medium">Concluída</span>
        <label className="relative inline-flex items-center cursor-pointer">
  <input type="checkbox" value="" className="sr-only peer" checked={checked} onChange={onChange} />
  <div className="w-11 h-6 bg-slate-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
 
</label>
        </div>
    )


}