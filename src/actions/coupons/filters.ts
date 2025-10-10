"use server";

import { requestHandler } from "../helpers/requestHandler";

export async function getCouponsFilters() {
    return await requestHandler(
        "get",
        `/api/coupons/filters`
    );
}