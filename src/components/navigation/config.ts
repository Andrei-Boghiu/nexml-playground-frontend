import { BookOpen, Settings2, SquareTerminal, LifeBuoy, MessageSquare, Bug } from "lucide-react";

// Resume Archives pagination configuration
export const page = 1;
export const limit = 4;

export const mainNavItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: SquareTerminal,
    isActive: true,
    items: [
      {
        title: "Instructions",
        url: "/instructions",
      },
      {
        title: "Job Listings",
        url: "/job-listings",
      },
      {
        title: "Policies",
        url: "/policies",
      },
    ],
  },
  {
    title: "Documentation",
    url: "/docs",
    icon: BookOpen,
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

export const secondaryNavItems = [
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

export const pathnameMap: Record<string, string> = {
  "/": "Dashboard",
  "/archives": "Archives",
  "/archives/:id": "Archive Details",
  "/archives/:id/edit": "Edit Archive",
  "/account": "Account",
  "/billing": "Billing",
  "/notifications": "Notifications",
};
