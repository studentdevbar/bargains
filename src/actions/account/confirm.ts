"use server";

import { requestHandler } from "../helpers/requestHandler";

export async function confirmAccount(token: string) {
  return await requestHandler(
    "post",
    `/api/account/complete-verification`,
    { token }
  );
}


