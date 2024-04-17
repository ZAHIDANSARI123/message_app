import { resend } from "@/lib/resend";
import VerificaitionEmail from "../../emails/VerificationEmails";
import { ApiResponse } from "@/types/ApiaResponse";



export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string,
) : Promise<ApiResponse>{
    try {
        await resend.emails.send({
            from: 'example@gmail.com',
            to: email,
            subject: 'hello welcome to my email',
            react: VerificaitionEmail({username, otp: verifyCode}),
        });
        return {success: true, message: 'Verification email send successfull'}
    } catch (emailError) {
        console.error("Error sending verification email", emailError)
        return {success: false, message: "Failed to send verification email"}
    }
}

