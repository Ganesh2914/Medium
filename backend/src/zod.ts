import z from "zod";

export const signUpCheck=z.object({
    email:z.string().refine(
        email => email.endsWith("@gmail.com") || email.endsWith("@yahoo.in") || email.endsWith("@outlook.in"),
        {
          message: "Email must end with '@gmail.com' or '@yahoo.in'",
          path: ["email"]
        }
      ),
     username: z.string().min(6, { message: "Username must be at least 6 characters long" }).max(20, { message: "Username cannot be longer than 20 characters" }).refine(username => /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/.test(username), {
       message: "Username must contain at least one letter and one number",
       path: ["username"]
     }),
     password:z.string().min(8)

}) 

export type SignUpCheck=z.infer<typeof signUpCheck>