import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("sb_session")?.value;
  const verified = cookieStore.get("sb_verified")?.value; // "1" | "0" | undefined

  if (!token) {
    redirect("/login");
  }
  if (verified === "0") {
    redirect("/verification");
  }

  return <>{children}</>;
}
