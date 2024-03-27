import { Link } from "react-router-dom"
import { Quote } from "../components/Quote"
import { Auth } from "../components/Auth"

export function Signin(){
    return <>
     
     <div className="grid grid-cols-1 lg:grid-cols-2 flex justify-center items-center">
            <div>
                <Auth type="signin"></Auth>
            </div>
            <div className="hidden lg:block">
                <Quote></Quote>
            </div>
        </div>
</>
}

 