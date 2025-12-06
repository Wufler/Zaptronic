import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import { magicLink } from "better-auth/plugins";
import { sendEmail } from "./email";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    socialProviders: {
        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        },
    },
    plugins: [
        magicLink({
            sendMagicLink: async ({ email, url }) => {
                await sendEmail({
                    to: email,
                    subject: "Login to your account",
                    text: `Click the link to login to your account: ${url}`,
                });
            }
        })
    ],
    user: {
        additionalFields: {
            role: {
                type: "string"
            }
        }
    }
});