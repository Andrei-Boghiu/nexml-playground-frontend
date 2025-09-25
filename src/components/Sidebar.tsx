import { Link } from "react-router-dom";

type Route = { label: string; path: string };

const mainNavigation: Route[] = [
  { label: "Dashboard", path: "/" },
  { label: "Instructions", path: "/instructions" },
  { label: "Policies", path: "/policies" },
  { label: "Job Listings", path: "/job-listings" },
  { label: "Archives", path: "/archives" },
];

// const helpers: Route[] = [
//   { label: "Support", path: "/support" },
//   { label: "Feedback", path: "/feedback" },
//   { label: "Report a Bug", path: "/report-bug" },
// ];

export default function Sidebar() {
  return (
    <aside>
      {mainNavigation.map(({ label, path }) => (
        <Link key={path} style={{ display: "block" }} to={path}>
          {label}
        </Link>
      ))}
      <hr />
      {/* {helpers.map(({ label, path }) => (
        <Link key={path} style={{ display: "block" }} to={path}>
          {label}
        </Link>
      ))} */}
    </aside>
  );
}
