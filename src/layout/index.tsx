import { Outlet } from "react-router-dom";
import Sidebar from "../pages/components/Sidebar";

export default function LayoutDashboard() {
  return (
    <div className="w-screen h-screen flex bg-gray-800 ">
      <Sidebar />
      <div className="h-full w-full flex-1 overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}
