 
import { ChangeEvent, useState } from "react";
import {SignUpCheck} from "../../../../backend/src/zod"
import { Link,  useNavigate } from "react-router-dom";
import { backend_url } from "../config";
export const Auth= ({type}:{type:"signin" | "signup"})=>{
    const [postInputs,setPostInputs]= useState<SignUpCheck>({
        username:"",
        email:"",
        password:""
    })
    const navigate=useNavigate();
    async function sendRequest(){
           const response=await fetch(`${backend_url}/api/v1/user/${type==="signin"?"signin":"signup"}`,{
                method:"POST",
                body:JSON.stringify({
                    postInputs
                }),
                headers:{
                    "Content-Type":"application/json"
                },
               
            })
            try{
                const data=await response.json();
                if(data.success){
                    localStorage.setItem("token",data.token);
                    navigate("/blogs")
                }
            }catch(e){
                console.log(e);
            }
    }
    return <>
        
        <div className="flex justify-center items-center ">
            <div >
            <div className="px-10 text-3xl font-bold">
            Create an account
            </div>
            <div>
            
        <LabelInputBox label={"Username"} onChange={(e)=>{
            setPostInputs(c=>({
                ...c,
                username:e.target.value,
            }))
        }} placeholder={"Username here....."}></LabelInputBox>
        
        {type==="signup"?
        <LabelInputBox label={"Email"} placeholder={"Email here....."} onChange={(e)=>{
            setPostInputs(c=>({
                ...c,
                email:e.target.value,
            }))
        }}></LabelInputBox>:""}

        <LabelInputBox label={"Password"} type={"password"} onChange={(e)=>{
            setPostInputs(c=>({
                ...c,
                password:e.target.value,
            }))
        }} placeholder={"Password here....."}></LabelInputBox>
         
        <button onClick={sendRequest} type="button" className="w-full mt-6 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type==="signup"?"Sign up":"Sign In" }  </button>
            </div>
            <div className="text-slate-400 text-center">{
            type ==="signin" ? "Don't have an account ": "Already have an account?"
            } 
            <Link className="pl-2 underline" to={type==="signin"?"/signup":"/signin"} >{type==="signin"?"Sing Up":"Login"}</Link>    
            </div> 
        </div>
        
        </div>
       
    </>
}

interface LabelInputs{
    label:string
    placeholder: string
    onChange:(e: ChangeEvent<HTMLInputElement>)=>void;
    type?:string
}

function LabelInputBox({label,placeholder,onChange,type}:LabelInputs){
    return <>
        <div className="mt-4" >
            <label for="first_name" class="block mb-2 text-xl font-medium text-gray-900 dark:text-black">{label}</label>
            <input onChange={onChange} type={type||"text"} id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
        </div>
        
    </>
}
 
 