import { Outlet } from "react-router-dom";
import Sidebar from "../pages/components/Sidebar";

export default function LayoutDashboard() {
  return (
    <div className="w-screen h-screen flex  max-sm:flex-col bg-white dark:bg-neutral-800">
      <Sidebar />
      <div className="h-full w-full flex-1 overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}
