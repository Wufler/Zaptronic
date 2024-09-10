"use server"
import { signIn } from "@/auth"

export default async function resendLogin(formData: FormData) {
    try {
        const result = await signIn("resend", formData)
        return result
    } catch (error) {
        console.error(error)
        throw error
    }
}


