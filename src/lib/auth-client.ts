import { createAuthClient } from "better-auth/react"
import { passkeyClient } from "better-auth/client/plugins"
import { magicLinkClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
    baseURL: process.env.BETTER_AUTH_URL,
    plugins: [
        passkeyClient(),
        magicLinkClient()
    ]
})

export type Session = typeof authClient.$Infer.Session