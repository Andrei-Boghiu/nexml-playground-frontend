import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";

export type OverlayProps = {
  children: React.ReactNode;
};

export default function Overlay() {
  return (
    <div>
      <Sidebar />

      <Outlet />
    </div>
  );
}
