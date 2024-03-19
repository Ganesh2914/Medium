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
    const { success }=signUpCheck.safeParse(body)
    if(!success){
      c.status(411)
      return c.json({
        msg:"Inputs are incorrect"
      })
    }
      const user:any = await prisma.user.create({
        data: {
          email: body.email,
          password: body.password,
          username: body.username,
        }
      })
      const token=await sign({id:user.id},c.env.jwt_secret)
      return c.json({
        token:token
      })
  })
userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL, }).$extends(withAccelerate())
  
    const body = await c.req.json();
  
    const finduser= await prisma.user.findUnique({
      where:{
        username:body.username,
        password:body.password
      }
    });
     
      if(!finduser){
        c.status(403)
        return c.json({
            msg:"Invalid inputs/unathorized"
        })
      }else{
        const token=await sign({id:finduser.id},c.env.jwt_secret)
        return c.json({
        msg:"User logged in successfully",
        token:token
      })
      }
      
  })