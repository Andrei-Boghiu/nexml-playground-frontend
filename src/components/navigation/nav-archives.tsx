import { ArrowBigRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

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
  const { data: archives } = useQuery({
    queryKey: ["archives", { page, limit }],
    queryFn: () => getArchives({ page, limit }),
  });

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Resume Archives</SidebarGroupLabel>
      <SidebarMenu>
        {archives?.data?.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <Link to={`/archives/${item.id}`}>
                <span>{item.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem>
          <Link to="/archives">
            <SidebarMenuButton>
              <ArrowBigRight />
              <span>All Archives</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
