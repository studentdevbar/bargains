"use server";

import { requestHandler } from "../helpers/requestHandler";

export async function favouriteCoupon(couponId: string) {
    return await requestHandler(
        "post",
        `/api/coupons/${couponId}/favorite`
    );
}