import { AppSidebar } from "@/components/navigation/app-sidebar";
import { SiteHeader } from "@/components/navigation/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { Outlet } from "react-router-dom";

export type OverlayProps = {
  children: React.ReactNode;
};

export default function Overlay() {
  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset className="min-w-0 mx-5 my-3.5">
            <Outlet />
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
