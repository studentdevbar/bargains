"use server";

import { requestHandler } from "../helpers/requestHandler";

interface WaitlistCreateRequest {
    email: string;
    name: string;
    school_id: number;
    study?: string;
    student_email?: string;

}

export async function joinWaitlist(data: WaitlistCreateRequest) {
    return await requestHandler(
        "post",
        `/api/waitlists`,
        data
    );
}