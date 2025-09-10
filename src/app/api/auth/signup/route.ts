// app/api/auth/signup/route.ts
import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { hash } from "bcryptjs"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json()

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return NextResponse.json({ error: "すでに登録済みのメールアドレスです" }, { status: 400 })
    }

    const hashedPassword = await hash(password, 10)
    const newUser = await prisma.user.create({
      data: { email, password: hashedPassword, name },
    })

    return NextResponse.json({ user: { id: newUser.id, email: newUser.email, name: newUser.name } });
  } catch (err) {
    return NextResponse.json({ error: "ユーザー作成に失敗しました" }, { status: 500 });
  }
}