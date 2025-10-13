"use server";

import { requestHandler } from "../helpers/requestHandler";

export async function getFeaturedCoupons() {
    return await requestHandler(
        "get",
        `/api/coupons/featured`
    );
}