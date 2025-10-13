"use server";

import { AxiosError } from "axios";
import apiClient from "./apiClient";
import { redirect } from "next/navigation";

export async function requestHandler(
  method: "get" | "post" | "put" | "patch" | "delete",
  url: string,
  data?: unknown,
  params?: Record<string, unknown>
) {
  try {
    const isFormData =
      typeof FormData !== "undefined" && data instanceof FormData;

    const headers = isFormData
      ? {
        "Content-Type": "multipart/form-data",
      }
      : {
        "Content-Type": "application/json",
      };

    const response = await apiClient.request({
      method,
      url,
      ...(method === "get" ? { params } : { data }),
      headers,
    });

    return {
      success: true,
      error: null,
      data: response.data,
    };
  } catch (error: unknown) {

    if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
        try {
          await apiClient.post("/api/logout");
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (_) { }
        redirect("/login");
      }

      return {
        success: false,
        error:
          error.response?.data?.message ||
          error.message ||
          "Something went wrong. Please try again.",
        data: null,
      };
    }


    return {
      success: false,
      error: "An unknown error occurred",
      data: null,
    };
  }
}
