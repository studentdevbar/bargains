"use server";

import { requestHandler } from "../helpers/requestHandler";

export async function getFavourites(page: number = 1, perPage: number = 15) {
    return await requestHandler(
        "get",
        `/api/coupons/favorites?page=${page}&per_page=${perPage}`
    );
}