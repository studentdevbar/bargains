

import DashboardSidebar from "@/components/layout/DashboardSidebar";
import DashboardTopbar from "@/components/layout/DashboardTopbar";

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100dvh] w-full bg-gray-50 text-foreground">
      <DashboardTopbar />
      <div className="mx-auto flex w-full max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <DashboardSidebar />
        <main className="min-h-[calc(100dvh-4rem)] flex-1 rounded-lg bg-white p-6 shadow-sm ">
          {children}
        </main>
      </div>
    </div>
  );
}
