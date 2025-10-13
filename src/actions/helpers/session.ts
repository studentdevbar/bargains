"use server";
import { cookies } from "next/headers";

const SESSION_COOKIE_KEY = "sb_session";
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const VERIFIED_COOKIE_KEY = "sb_verified"; // "1" or "0"
const ACCOUNT_CONFIRMED_COOKIE_KEY = "sb_account_confirmed"; // "1" or "0"


// Store only the token in the cookie
export async function createSession(token: string) {
  const cookieStore = await cookies();
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS);

  cookieStore.set(SESSION_COOKIE_KEY, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
    expires: expiresAt,
  });
}

// Get the raw token from the cookie
export async function getSession(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_KEY)?.value || null;
  return token ?? null;
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_KEY);
  cookieStore.delete(ACCOUNT_CONFIRMED_COOKIE_KEY);
  cookieStore.delete(VERIFIED_COOKIE_KEY);
}

// Minimal verified flag cookie for middleware checks
export async function setVerifiedCookie(verified: boolean) {
  const cookieStore = await cookies();
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS);
  cookieStore.set(VERIFIED_COOKIE_KEY, verified ? "1" : "0", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
    expires: expiresAt,
  });
}

export async function getVerifiedCookie(): Promise<boolean | null> {
  const cookieStore = await cookies();
  const val = cookieStore.get(VERIFIED_COOKIE_KEY)?.value;
  if (val === undefined) return null;
  return val === "1";
}