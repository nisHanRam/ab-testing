"use client";
import { Circle } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated =
    typeof window !== "undefined" && !!localStorage.getItem("token");
  const router = useRouter();
  const pathname = usePathname();

  const isAuthPage = pathname.startsWith("/auth");

  useEffect(() => {
    if (!isAuthenticated && !isAuthPage) {
      router.push("/auth");
    }
  }, [isAuthenticated, isAuthPage, router]);

  if (!isAuthenticated && !isAuthPage)
    return <Circle className="animate-spin" />;

  return <>{children}</>;
}
