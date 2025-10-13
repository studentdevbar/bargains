"use server";

import { requestHandler } from "../helpers/requestHandler";

export async function verifyOtp(email: string, otp: string) {
    return await requestHandler(
        "post",
        `/api/register/verify-otp`,
        { email, otp }
    );
}