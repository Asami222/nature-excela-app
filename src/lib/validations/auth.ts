import { z } from "zod"

export const signupSchema = z.object({
  name: z.string().min(1, "名前を入力してください"),
  email: z.string().refine(
    (val) => /\S+@\S+\.\S+/.test(val),
    { message: "有効なメールアドレスを入力してください" }
  ),
  password: z
    .string()
    .min(8, "パスワードは8文字以上で入力してください")
    .regex(/[0-9]/, "少なくとも1つの数字を含めてください")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "少なくとも1つの記号を含めてください"),
});

export const loginSchema = z.object({
  email: z.string().refine(
    (val) => /\S+@\S+\.\S+/.test(val),
    { message: "有効なメールアドレスを入力してください" }
  ),
  password: z.string().min(1, "パスワードを入力してください"),
})