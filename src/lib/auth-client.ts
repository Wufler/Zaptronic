import { createAuthClient } from "better-auth/react"
import { magicLinkClient } from "better-auth/client/plugins";
import { inferAdditionalFields } from "better-auth/client/plugins";
import type { auth } from "./auth";

export const authClient = createAuthClient({
    baseURL: process.env.BETTER_AUTH_URL,
    plugins: [
        magicLinkClient(),
        inferAdditionalFields<typeof auth>()
    ]
})