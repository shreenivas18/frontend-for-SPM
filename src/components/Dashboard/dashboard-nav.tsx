"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Blog", href: "/dashboard/generate/blog" },
  { name: "LinkedIn", href: "/dashboard/generate/linkedin" },
  { name: "Video", href: "/dashboard/generate/video" },
  { name: "Settings", href: "/dashboard/settings" },
];

export default function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center space-x-2 md:space-x-4 text-sm font-medium">
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={cn(
            "transition-colors hover:text-white px-3 py-2 rounded-md",
            pathname.startsWith(item.href) && item.href !== '/dashboard' || pathname === item.href
              ? "bg-zinc-800 text-white"
              : "text-zinc-400"
          )}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
