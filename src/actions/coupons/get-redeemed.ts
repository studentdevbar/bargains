"use server";

import { requestHandler } from "../helpers/requestHandler";

export async function getRedeemedCoupons(page: number = 1, perPage: number = 15) {
    return await requestHandler(
        "get",
        `/api/coupons/redeemed?page=${page}&per_page=${perPage}`
    );
}