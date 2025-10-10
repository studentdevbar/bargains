"use server";

import { requestHandler } from "../helpers/requestHandler";

export async function getCouponReveal(couponId: number) {
    return await requestHandler(
        "get",
        `/api/coupons/${couponId}/reveal`
    );
}