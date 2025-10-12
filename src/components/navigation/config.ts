import {
  BookOpen,
  Settings2,
  SquareTerminal,
  LifeBuoy,
  MessageSquare,
  Bug,
  ListChecks,
  Briefcase,
  ScrollText,
} from "lucide-react";
import { buildPathnameMap } from "./util";
import type { NavigationConfig, NavigationItem } from "./types";

// Resume Archives pagination configuration
export const page = 1;
export const limit = 4;

export const mainNavItems: NavigationConfig[] = [
  {
    title: "Dashboard",
    url: "/",
    icon: SquareTerminal,
  },
  {
    title: "Configuration",
    defaultOpen: true,
    items: [
      {
        title: "Instructions",
        url: "/instructions",
        icon: ListChecks,
      },
      {
        title: "Job Listings",
        url: "/job-listings",
        icon: Briefcase,
      },
      {
        title: "Policies",
        url: "/policies",
        icon: ScrollText,
      },
    ],
  },
  {
    title: "Documentation",
    icon: BookOpen,
    defaultOpen: false,
    items: [
      {
        title: "Introduction",
        url: "/docs/intro",
      },
      {
        title: "Get Started",
        url: "/docs/get-started",
      },
      {
        title: "Tutorials",
        url: "/docs/tutorials",
      },
      {
        title: "Changelog",
        url: "/docs/changelog",
      },
    ],
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings2,
  },
];

export const secondaryNavItems: NavigationItem[] = [
  {
    title: "Support",
    url: "/support",
    icon: LifeBuoy,
  },
  {
    title: "Feedback",
    url: "/feedback",
    icon: MessageSquare,
  },
  {
    title: "Report Issue",
    url: "/report-issue",
    icon: Bug,
  },
];

export const pathnameMap = {
  ...buildPathnameMap(...mainNavItems, ...secondaryNavItems),

  "/instructions/:id": "Instruction Details",
  "/job-listings/:id": "Job Listing Details",
  "/policies/:id": "Policy Details",

  "/archives": "Archives List",
  "/archives/:id": "Archive Details",

  "/notifications": "Notifications",
  "/account": "Account",
  "/billing": "Billing",
};
