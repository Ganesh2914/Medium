import { Link } from "react-router-dom"

interface BlogCardProps{
    authorName:string
    title:string
    content:string
    publishedDate:string,
    id:string
}
export const  BlogCard=({
    authorName,title,content,publishedDate,id
}:BlogCardProps)=>{
    
    return <Link to={`/blog/${id}`}>
        <div className="border-b border-slate-400 pb-4 cursor-pointer">
    <div className="flex mt-2">
       <Avatar/> <div className="pl-2 font-semibold">{authorName}</div> <div className="flex justify-center flex-col p-2"><Circle/></div> <div className="font-thin">{publishedDate}</div>
    </div>
    <div className="font-bold pl-2 text-xl">
        {title}
    </div>
    <div className="pl-2 text-md ">
        {content.slice(0,100)+"..."}
    </div>
    <div className="pl-2 text-slate-400 text-sm font-thin">
        {`${Math.ceil(content.length/200)} minute(s) read`}
    </div>
    
    </div>
    </Link>
}

function Circle(){
    return <>
        <div className="h-2 w-2 rounded-full bg-slate-200"> </div>
        </>
}

export function Avatar(){
    return <span>
    <img className="ml-2 w-6 h-6 rounded-full" src="./src/assets/react.svg" alt="Rounded avatar"></img>
    </span>
}