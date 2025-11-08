import { Archive } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "react-router-dom";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { getArchives } from "@/services/archive.service";
import { limit, page } from "./config";

export default function NavArchives() {
  const { pathname } = useLocation();

  const { data: archives } = useQuery({
    queryKey: ["archives", { page, limit }],
    queryFn: () => getArchives({ page, limit }),
  });

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Resume Archives</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <Link to="/archives">
            <SidebarMenuButton isActive={pathname === "/archives"}>
              <Archive />
              <span>Archives List</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
        {archives?.data?.map((item) => (
          <SidebarMenuItem key={item.id}>
            <SidebarMenuButton asChild isActive={pathname === `/archives/${item.id}`}>
              <Link to={`/archives/${item.id}`}>
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
