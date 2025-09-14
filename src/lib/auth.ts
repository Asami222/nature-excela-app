// src/lib/auth.ts
import { getServerSession as originalGetServerSession } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "./prisma"
import type { NextAuthOptions } from "next-auth"
import { compare } from "bcryptjs"

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
        //console.log("Authorize called with:", credentials)
        if (!credentials?.email || !credentials.password) return null
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })
        //console.log(credentials, user)
        if (!user) return null

        const isValid = await compare(credentials.password, user.password)
        //console.log("compare result:", isValid)
        if (!isValid) return null

        return { id: user.id, name: user.name, email: user.email }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      //console.log("JWT callback:", { token, user })
      if (user) {
        // authorize で返した user がここに入る
        token.id = user.id
        token.name = user.name
        token.email = user.email
      }
      return token // ← 上書きせずに token を返す！
    },
    async session({ session, token }) {
      //console.log("Session callback:", { session, token })
    
      if (session.user) {
        session.user.id = token.id as string ?? token.sub as string
        session.user.name = token.name as string
        session.user.email = token.email as string
        session.user.image = token.picture as string | null
      }
    
      return session
    }
  },
  pages: {
    signIn: "/login", // カスタムログインページ
  },
}

export const getServerSession = async () => {
  return originalGetServerSession(authOptions)
}