"use server";

import { requestHandler } from "../helpers/requestHandler";

export async function confirmAccount(token: string) {
  return await requestHandler(
    "get",
    `/api/account/confirm`,
    undefined,
    { token }
  );
}


