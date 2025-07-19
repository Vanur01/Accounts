"use client";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  // Sidebar width: 80px when collapsed, 220px when expanded
  // Use Tailwind margin classes for main content
  const marginClass = collapsed ? "md:ml-16" : "md:ml-56";

  return (
    <div className="bg-gray-50">
      {/* Sidebar is always fixed and outside the main content flow */}
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      {/* Main content wrapper, offset by sidebar width on desktop */}
      <div
        className={`flex flex-col min-h-screen transition-all duration-300 ${marginClass}`}
      >
        <Navbar collapsed={collapsed} onOpenSidebar={() => setMobileOpen(true)} />
        <main className="flex-1 p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
