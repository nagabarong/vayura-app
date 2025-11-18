"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/custom/Navbar";

export function ConditionalNavbar() {
  const pathname = usePathname();
  const isAuthRoute = pathname?.startsWith("/auth");

  if (isAuthRoute) {
    return null;
  }

  return <Navbar />;
}

