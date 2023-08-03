interface ILoaderProps {
    w:string,
    h:string
}

export default function Loader() {
    return (
        <div className={`w-8 h-8  rounded-full border-2 border-t-purple-500 animate-spin`}>
          
        </div>
    )
}