import { Hono } from 'hono'
import { withAccelerate } from '@prisma/extension-accelerate'
import { PrismaClient } from '@prisma/client/edge'
import { decode, sign, verify } from "hono/jwt"
 
export const blogRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string,
      jwt_secret:string,
    },
    Variables:{
      userid:string
    }
  }>();

  blogRouter.use("/*",async (c,next)=>{
    const authHeader=c.req.header("authorization") || "";
    const userid= await verify(authHeader,c.env.jwt_secret)
    console.log(userid);
    try{

      if(!userid){
        c.status(403);
        return c.json({
          msg:"You are not authorized"
        })   
      }else{
        c.set("userid",userid);
      }
      await next();
    }catch(e){
      console.log(e);
    }
  });

blogRouter.post("/",async (c)=>{
  const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL, }).$extends(withAccelerate())
  const body=await c.req.json();
  const userid=c.get("userid");
  try{
    await prisma.post.create({
      data:{
        title:body.title,
        content:body.content,
        authorId:userid.id 
      }
    })
    return c.json({
      msg:" Posted successfully "
    })
  }catch(e){
    console.error(e);
    c.status(500) 
    c.json({ error: "An error occurred while creating the post." });
  }
})
blogRouter.put("/",async (c)=>{
  const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL, }).$extends(withAccelerate())
  const body=await c.req.json();
  console.log(body.id)
  const post= await prisma.post.update({
  where:{
    id:body.id
  },
    data:{
      title:body.title,
      content:body.content
    }
  })
 return c.json({
    msg:" Post updated successfully "
  })
})

blogRouter.get("/bulk",async (c)=>{
 
  const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL, }).$extends(withAccelerate())
  try{
    const posts=await prisma.post.findMany();
    console.log(posts)
    return c.json({
      posts
    })
  }catch(e){
    console.log(e);
  }

})
blogRouter.get("/:id",async (c)=>{
  const id= c.req.param("id");
  console.log(id);
  const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL, }).$extends(withAccelerate())
  try{
    const post= await prisma.post.findFirst({
      where:{
        id:id
      }
    })
    return c.json({
      post
    })
  }catch(e){
      c.status(411);
      return c.json({
        msg:"Error while fetching blog post"  
      })
  }
})
