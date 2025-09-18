"use server";

import { requestHandler } from "../helpers/requestHandler";
import { cookies } from "next/headers";
import { createSession } from "../helpers/session";

export async function loginUser(email: string, password: string) {
    const result = await requestHandler(
        "post",
        `/api/login`,
        { email, password }
    );

    // On successful login, set minimal, HttpOnly cookies for session
    if (result?.success && result?.data?.token) {
        const cookieStore = await cookies();
        await createSession(result.data.token);
        cookieStore.set("sb_account_confirmed", result?.data?.user?.account_confirmed ? "1" : "0", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            path: "/",
        });
    }

    return result;
}