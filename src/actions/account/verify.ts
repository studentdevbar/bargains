"use server";

import { requestHandler } from "../helpers/requestHandler";

type VerifyAccountProps = {
    first_name: string;
    last_name: string;
    gender: "male" | "female";
    dob: string;
    school_id: number;
    student_email: string;
}

export async function verifyAccount(data: VerifyAccountProps) {
    return await requestHandler(
        "post",
        `/api/account/verify`,
        data
    );
}