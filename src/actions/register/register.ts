"use server";

import { requestHandler } from "../helpers/requestHandler";

export async function registerUser(email: string) {
    return await requestHandler(
        "post",
        `/api/register`,
        { email }
    );
}