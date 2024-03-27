import { Link } from "react-router-dom";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks";

export function Blogs(){
    const {loading,blogs}=useBlogs();

    if(loading){
        return <div>loading.......</div>
    }
    
    return <div className="grid grid-cols-12">

    <div className="col-span-2">
        <div className="m-2 text-xl font-bold">
          Create a new Blog
        </div>
        <div className="m-4 w-20 ">
          <Link to={"/createblog"}>
        <img src="./src/assets/image.png"/>
        </Link>
        </div>
     </div>  

    <div className="col-span-10 flex justify-center ">
        <div className="max-w">
          {blogs.map(blog=>

        <BlogCard authorName={blog.author.username} title={blog.title}
        content={blog.content} publishedDate={blog.created_at.slice(0,10)} id={blog.id} > </BlogCard>
          )}  
    </div>
    
    </div>
    </div>
}

