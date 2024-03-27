import { useEffect, useState } from "react";
import { backend_url } from "../config";

export interface Blog{
        id:string,
        title:string,
        content:string,
        created_at:string,
        author:{
            username:string
        }
}
export const useBlog=({id}:{id:string})=>{
    const [loading,setLoading]=useState(true)
    const [blog,setBlog]=useState<Blog>();

    useEffect(()=>{
          fetch(`${backend_url}/api/v1/blog/${id}`,{
            headers:{
                "authorization":localStorage.getItem("token") || "",
                "Content-Type":"application/json"
            }
          }).then(async (response)=>{
            const data=await response.json();
          
            console.log(data.post) 
            setBlog(data.post) 
            setLoading(false)
        })
    },[id])


    return {
        loading,
        blog
    }

}
export function useBlogs(){
    const [loading,setLoading]=useState(true)
    const [blogs,setBlogs]=useState<Blog[]>([]);

    useEffect(()=>{
          fetch(`${backend_url}/api/v1/blog/bulk`,{
            headers:{
                "authorization":localStorage.getItem("token") || "",
                "Content-Type":"application/json"
            }
          }).then(async (response)=>{
            const data=await response.json();
         
            setBlogs(data.posts) 
            setLoading(false)
        })
    },[])


    return {
        loading,
        blogs
    }
}