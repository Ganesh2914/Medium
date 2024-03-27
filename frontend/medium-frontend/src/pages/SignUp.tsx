import { Link } from "react-router-dom";
import { Auth } from "../components/Auth";
import { Quote } from "../components/Quote";


export function Signup() {
    return <>

        <div className="grid grid-cols-1 lg:grid-cols-2 flex justify-center items-center">
            <div>
                <Auth type="signup"></Auth>
            </div>
            <div className="hidden lg:block">
                <Quote></Quote>
            </div>
        </div>

    </>
}