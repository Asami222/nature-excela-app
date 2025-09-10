// app/api/auth/guest-logout/route.ts
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  const { email } = await req.json()
  if (email?.startsWith("guest-")) {
    await prisma.user.delete({ where: { email } })
  }
  return NextResponse.json({ success: true })
}