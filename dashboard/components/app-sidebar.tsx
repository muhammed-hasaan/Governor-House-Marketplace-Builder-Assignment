"use client";

import type * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PackageIcon, ShoppingCartIcon, FolderIcon } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  const menuItems = [
    { name: "Products", icon: PackageIcon, path: "/products" },
    { name: "Orders", icon: ShoppingCartIcon, path: "/orders" },
    { name: "Categories", icon: FolderIcon, path: "/categories" },
  ];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <h1 className="px-4 text-xl font-bold">Dashboard</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild>
                <Link href={`/dashboard${item.path}`}>
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
