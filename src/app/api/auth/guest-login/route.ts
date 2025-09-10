// app/api/auth/guest-login/route.ts
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { hash } from "bcryptjs"
import { randomUUID } from "crypto"

export async function POST() {
  const guestEmail = `guest-${randomUUID()}@example.com`
  const guestPassword = randomUUID()
  const hashedPassword = await hash(guestPassword, 10)

  const user = await prisma.user.create({
    data: {
      email: guestEmail,
      password: hashedPassword,
      name: "Guest User",
    },
  })

  return NextResponse.json({
    email: guestEmail,
    password: guestPassword,
  })
}