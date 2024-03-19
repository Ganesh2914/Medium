import { Hono } from 'hono'
import { withAccelerate } from '@prisma/extension-accelerate'
import { PrismaClient } from '@prisma/client/edge'
import { sign } from "hono/jwt"
import { userRouter } from './routes/userRouter'
import { blogRouter } from './routes/blogRouter'
 

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    jwt_secret:string
  }
}>()

app.route("/api/v1/user",userRouter);
app.route("/api/v1/blog",blogRouter);

 

 
// app.post('/api/v1/signin', (c) => {

// })
// app.post('/api/v1/blog', (c) => {

// })
// app.put('/api/v1/blog', (c) => {

// })
// app.get('/api/v1/blog/: id', (c) => {

// })

export default app
