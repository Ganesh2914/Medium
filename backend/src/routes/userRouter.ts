import { Hono } from 'hono'
import { withAccelerate } from '@prisma/extension-accelerate'
import { PrismaClient } from '@prisma/client/edge'
import { sign } from "hono/jwt"
import { signUpCheck } from '../zod'
 
export const userRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string,
      jwt_secret:string
    }
  }>()

userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL, }).$extends(withAccelerate())

    const body = await c.req.json();
    
    const { success }=signUpCheck.safeParse(body.postInputs)
 
    if(!success){
      c.status(411)
      return c.json({
        msg:"Inputs are incorrect"
      })
    }
      const user:any = await prisma.user.create({
        data: {
          email: body.postInputs.email,
          username: body.postInputs.username,
          password: body.postInputs.password,
        }
      })
      const token=await sign({id:user.id},c.env.jwt_secret)
      return c.json({
        token:token,
        success:true
      })
  })
userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL, }).$extends(withAccelerate())
  
    const body = await c.req.json();
    // console.log(body.postInputs.username)
    const finduser= await prisma.user.findUnique({
      where:{
        username:body.postInputs.username,
        password:body.postInputs.password
      }
    });
     
      if(!finduser){
        c.status(403)
        return c.json({
            msg:"Invalid inputs/unathorized",
            success:false
        })
      }else{
        const token=await sign({id:finduser.id},c.env.jwt_secret)
        return c.json({
        msg:"User logged in successfully",
        token:token,
        success:true  
      })
      }
      
  })