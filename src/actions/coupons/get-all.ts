"use server";

import { requestHandler } from "../helpers/requestHandler";
import type { CouponsQueryParams } from "../../../types";

export async function getAllCoupons(params?: CouponsQueryParams) {
    return await requestHandler(
        "get",
        `/api/coupons`,
        undefined,
        params
    );
}