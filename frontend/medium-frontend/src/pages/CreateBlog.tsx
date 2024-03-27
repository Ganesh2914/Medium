import { useState } from "react"

export const CreateBlog= ()=>{
    const[title,setTitle]=useState("");
    const[content,setContent]=useState("");
    return <>
        <div className="m-8 ">
        <input type="text"  className="text-7xl " placeholder="Title" onChange={(e)=>{
            setTitle(e.target.value)
        }}/>  
        </div>
        <div className="ml-8 ">
        <input type="text" className="p-4 text-4xl border border-gray-300 rounded-lg w-96 h-16" placeholder="Enter text here..." onChange={(e)=>{
            setContent(e.target.value)
        }}/>
        </div>
        <div>
        <button onClick={postNewBlog} className="ml-8 mt-4 bg-green-500 hover:bg-green-600 text-white text-2xl rounded font-bold py-2 px-8 rounded">
      Post
    </button>
        </div>
    </>
async function postNewBlog(){
    const response = await fetch("http://127.0.0.1:8787/api/v1/blog",{
        method:"POST",
        body:JSON.stringify({
            title,
            content
        }),
        headers:{
            "authorization":localStorage.getItem("token") || "",
            "Content-Type":"application/json"
        }
    })
    const data= await response.json();
    if(data.success){
        alert("posted Successfully")
    }
}
}