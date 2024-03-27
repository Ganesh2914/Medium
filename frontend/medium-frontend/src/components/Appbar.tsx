import { Link } from "react-router-dom";

export function Appbar(){
    return <div className="h-12 border bg-slate-200 ">

            <div className="flex justify-between felx-col">
                <div className="p-1 text-black text-2xl font-bold">
                    <Link to={"/blogs"}>Medium </Link>
                </div>
                <div className="m-0.5 mr-4 w-10 h-10 rounded-full bg-slate-400 ">
                     
                    <div className="m-0.5 flex justify-center p-1 font-bold "> <Link to={"/signin"}>GK</Link> 
                    </div>
                            
                </div>
            </div>

    </div>
}