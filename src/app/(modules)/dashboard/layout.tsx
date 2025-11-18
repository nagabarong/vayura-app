import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Vayura App",
};

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <section>{children}</section>;
}
