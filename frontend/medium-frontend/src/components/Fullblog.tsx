import { Blog } from "../hooks"
import { Avatar } from "./BlogCard"

export const Fullblog = ({ blog }: { blog: Blog }) => {
    return <div className="grid grid-cols-12">
        <div className="col-span-8">
            <div className="pl-2 text-3xl font-bold">
                {blog.title}
            </div>
            <div className="pl-2 text-md text-slate-500">
                Posted on {blog.created_at.slice(0, 10)}
            </div>
            <div>
                {blog.content}
            </div>

        </div>
        <div className="col-span-4  ">
            <div className="text-lg text-slate-400 font-semibold">Author</div>
            <div className="pl-10 text-2xl font-bold">
                {blog.author.username.toUpperCase()}
            </div> 
            <div> 
                   <Circle></Circle> 
            </div>
            <div> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur perferendis fuga eos quisquam consectetur, quasi recusandae molestiae omnis sequi porro nam nisi impedit fugit, inventore accusamus dignissimos quidem ipsum voluptatibus. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur perferendis fuga eos quisquam consectetur, quasi recusandae molestiae omnis sequi porro nam nisi impedit fugit, inventore accusamus dignissimos quidem ipsum voluptatibus. </div>
            </div>

    </div>
}

 function Circle(){
    return <div className="m-0.5 mr-4 w-8 h-8 rounded-full bg-slate-400 ">
                     
    <div className="m-0.5 flex justify-center p-1 font-bold ">GK
    </div>
            
</div>
 }