"use client";

import { useState } from "react";
import { AppSidebar } from "../../components/app-sidebar";
import { MainContent } from "../../components/main-content";
import { useSanityData } from "../../hooks/useSanityData";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function Page() {
  const [activeSection, setActiveSection] = useState<
    "categories" | "products" | "orders" | null
  >(null);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const { data, loading } = useSanityData();

  const handleItemSelect = (
    section: "categories" | "products" | "orders",
    itemId: string
  ) => {
    setActiveSection(section);
    setActiveItem(itemId);
  };

  return (
    <SidebarProvider>
      <AppSidebar
        // @ts-expect-error "should not be called when section is not active"
        onItemSelect={handleItemSelect}
      />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    {activeSection
                      ? activeSection.charAt(0).toUpperCase() +
                        activeSection.slice(1)
                      : "Overview"}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <MainContent
          activeSection={activeSection}
          activeItem={activeItem}
          data={data}
        />
      </SidebarInset>
    </SidebarProvider>
  );
}
