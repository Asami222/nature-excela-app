// app/api/auth/signup/route.ts
import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { hash } from "bcryptjs"
import { signupSchema } from "@/lib/validations/auth"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const body = await req.json()

    // サーバー側バリデーション
    const parsed = signupSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues.map(i => i.message).join(", ") },
        { status: 400 }
      )
    }

    const { email, password, name } = parsed.data

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return NextResponse.json({ error: "すでに登録済みのメールアドレスです" }, { status: 400 })
    }

    const hashedPassword = await hash(password, 10)
    const newUser = await prisma.user.create({
      data: { email, password: hashedPassword, name },
    })

    return NextResponse.json({ user: { id: newUser.id, email: newUser.email, name: newUser.name } });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return NextResponse.json({ error: "ユーザー作成に失敗しました" }, { status: 500 });
  }
}