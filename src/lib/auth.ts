// src/lib/auth.ts
import { getServerSession as originalGetServerSession } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "./prisma"
import type { NextAuthOptions } from "next-auth"
import { compare, hash } from "bcryptjs"

// 環境ごとの設定切り替え
//const isDev = process.env.NODE_ENV === "development"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma as any), // eslint-disable-line
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })
        if (!user) return null

        const isValid = await compare(credentials.password, user.password)
        if (!isValid) return null

        return { id: user.id, name: user.name, email: user.email }
      },
    }),
  ],
  events: {
    async createUser(message) {
      // message.user に作成されたユーザーが入っている
      const user = message.user as unknown as { id: string; password?: string }
      if (!user.password) {
        await prisma.user.update({
          where: { id: message.user.id },
          data: { password: await hash("dummyPassword", 10) },
        })
      }
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      const dbUser = await prisma.user.findFirst({
        where: { email: token.email },
      })
      if (!dbUser) {
        if (user) {
          token.id = user?.id
        }
        return token
      }
      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      }
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
      }
      return session
    },
  },
  pages: {
    signIn: "/login", // カスタムログインページ
  },
}

export const getServerSession = async () => {
  return originalGetServerSession(authOptions)
}