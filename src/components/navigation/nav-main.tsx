import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import { mainNavItems } from "./config";
import type { NavigationConfig, NavigationLabel, NavigationChildren, NavigationItem } from "./types";

export function NavMain() {
  const { pathname } = useLocation();

  // Group items by label
  const groups: NavigationConfig[][] = [];
  let currentGroup: NavigationConfig[] = [];

  for (const item of mainNavItems) {
    if ("label" in item) {
      if (currentGroup.length > 0) groups.push(currentGroup);
      currentGroup = [item];
    } else {
      currentGroup.push(item);
    }
  }
  if (currentGroup.length > 0) groups.push(currentGroup);

  return (
    <>
      {groups.map((group, i) => {
        const labelItem = group.find((g): g is NavigationLabel => "label" in g);
        const items = group.filter((g): g is NavigationItem | NavigationChildren => !("label" in g));

        return (
          <SidebarGroup key={labelItem?.label || `group-${i}`}>
            {labelItem && <SidebarGroupLabel>{labelItem.label}</SidebarGroupLabel>}
            <SidebarMenu>
              {items.map((item) => {
                const hasChildren = "items" in item;
                const isActive = (url?: string) => pathname === url;

                if (hasChildren) {
                  const children = item as NavigationChildren;
                  return (
                    <Collapsible key={children.title} asChild defaultOpen={children.defaultOpen}>
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton tooltip={children.title}>
                            {children.icon && <children.icon />}
                            <span>{children.title}</span>
                            <SidebarMenuAction asChild className="ml-auto data-[state=open]:rotate-90">
                              <div>
                                <ChevronRight />
                                <span className="sr-only">Toggle</span>
                              </div>
                            </SidebarMenuAction>
                          </SidebarMenuButton>
                        </CollapsibleTrigger>

                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {children.items.map((sub) => (
                              <SidebarMenuSubItem key={sub.title}>
                                <SidebarMenuSubButton asChild isActive={isActive(sub.url)}>
                                  <Link to={sub.url}>
                                    {sub.icon && <sub.icon />}
                                    <span>{sub.title}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  );
                }

                const single = item as NavigationItem;
                return (
                  <SidebarMenuItem key={single.title}>
                    <SidebarMenuButton asChild tooltip={single.title} isActive={isActive(single.url)}>
                      <Link to={single.url}>
                        {single.icon && <single.icon />}
                        <span>{single.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        );
      })}
    </>
  );
}
