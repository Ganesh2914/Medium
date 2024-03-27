import z from "zod";

export const signUpCheck = z.object({
  username: z.string(),
  email: z.string().refine(
    email => email.endsWith("@gmail.com") || email.endsWith("@yahoo.in") || email.endsWith("@outlook.in"),
    {
      message: "Email must end with '@gmail.com' or '@yahoo.in'",
      path: ["email"]
    }
  ),
  password: z.string().min(8)

})

export type SignUpCheck = z.infer<typeof signUpCheck>