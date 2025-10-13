"use server";

import { requestHandler } from "../helpers/requestHandler";

export async function getAllSchools() {
    return await requestHandler(
        "get",
        `/api/schools`
    );
}