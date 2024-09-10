import NextAuth, { NextAuthConfig } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "./lib/prisma"
import GitHub from "next-auth/providers/github"
import Passkey from "next-auth/providers/passkey"
import Resend from "next-auth/providers/resend"
import Discord from "next-auth/providers/discord"

export const {
    handlers,
    signIn,
    signOut,
    auth,
} = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "database"
    },
    secret: process.env.AUTH_SECRET,
    providers: [GitHub, Discord, Passkey, Resend({
        from: process.env.EMAIL_FROM,
        server: {
            host: process.env.EMAIL_SERVER_HOST,
            port: process.env.EMAIL_SERVER_PORT,
            auth: {
                user: process.env.EMAIL_SERVER_USER,
                pass: process.env.EMAIL_SERVER_PASSWORD
            }
        },
    })],
    experimental: { enableWebAuthn: true },
    pages: {
        signIn: "/login",
        verifyRequest: "/login/verify"
    }
} satisfies NextAuthConfig)
