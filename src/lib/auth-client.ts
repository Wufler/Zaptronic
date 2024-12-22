import { createAuthClient } from "better-auth/react"
import { passkeyClient } from "better-auth/client/plugins"
import { magicLinkClient } from "better-auth/client/plugins";
import { inferAdditionalFields } from "better-auth/client/plugins";
import type { auth } from "./auth";

export const authClient = createAuthClient({
    baseURL: process.env.BETTER_AUTH_URL,
    plugins: [
        passkeyClient(),
        magicLinkClient(),
        inferAdditionalFields<typeof auth>()
    ]
})