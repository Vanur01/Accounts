"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { usePathname } from "next/navigation";
import {
  FiMenu,
  FiX,
  FiHome,
  FiFileText,
  FiDollarSign,
  FiClipboard,
  FiCreditCard,
  FiShoppingCart,
  FiArrowDownCircle,
  FiSettings,
  FiHelpCircle,
  FiLogOut,
  FiChevronLeft,
  FiChevronRight,
  FiUsers,
  FiBox,
} from "react-icons/fi";

const links = [
  { name: "Dashboard", href: "/dashboard", icon: <FiHome /> },
  { name: "Quotations", href: "/dashboard/quotation", icon: <FiFileText /> },
  { name: "Clients", href: "/dashboard/clients", icon: <FiUsers /> },
  { name: "Inventory", href: "/dashboard/inventory/category", icon: <FiBox /> },
  { name: "Invoices", href: "/dashboard/invoices", icon: <FiDollarSign /> },
  { name: "Receipts", href: "#", icon: <FiClipboard /> },
  { name: "Sales Orders", href: "#", icon: <FiShoppingCart /> },
  { name: "Credit Notes", href: "#", icon: <FiCreditCard /> },
  { name: "Purchases", href: "#", icon: <FiArrowDownCircle /> },
  { name: "Payout Receipts", href: "#", icon: <FiDollarSign /> },
];

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
  mobileOpen: boolean;
  setMobileOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Sidebar({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}: SidebarProps) {
  const pathname = usePathname();

  // Force full width for mobile, collapsible only on desktop
  const sidebarWidth = collapsed ? "md:w-20 w-56" : "w-56";

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity md:hidden h-screen ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      />
      {/* Sidebar */}
      <aside
        className={`bg-[var(--color-sidebar)] border-r border-[var(--color-sidebar-border)] h-screen flex flex-col fixed z-50 top-0 left-0 transition-all duration-300 shadow-lg
        ${sidebarWidth}
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
        `}
      >
        {/* Header */}
        <div className="flex items-center gap-2 px-6 py-5 border-b border-[var(--color-sidebar-border)] justify-between">
          <div className="flex items-center gap-2">
            {!collapsed && (
              <>
                <span className="text-2xl font-bold text-[var(--color-sidebar-primary)]">CRM</span>
                <span className="text-lg font-semibold text-[var(--color-sidebar-foreground)] hidden md:inline">
                  Accounts
                </span>
              </>
            )}
          </div>
          {/* Collapse toggle (only on desktop) */}
          <button
            className="hidden md:flex items-center justify-center p-1 rounded hover:bg-[var(--color-sidebar-accent)]/20 text-[var(--color-sidebar-primary)]"
            onClick={() => setCollapsed((c) => !c)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <FiChevronRight size={20} />
            ) : (
              <FiChevronLeft size={20} />
            )}
          </button>
          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex items-center justify-center p-1 rounded hover:bg-[var(--color-sidebar-accent)]/20 text-[var(--color-sidebar-primary)]"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle Sidebar"
          >
            {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Navigation Links */}
        <nav
          className={`flex-1 flex-col gap-1 px-2 py-4 flex ${
            collapsed ? "md:items-center" : ""
          }`}
        >
          {links.map((link) => {
            // Determine if the link is active based on the current pathname
            const isActive = link.href === pathname;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={() => {
                  setMobileOpen(false); // auto-close on mobile
                }}
                className={`flex items-center ${
                  collapsed ? "md:justify-center" : "gap-3"
                } rounded px-4 py-2 text-[var(--color-sidebar-foreground)] font-medium transition hover:bg-[var(--color-sidebar-accent)]/20 cursor-pointer mb-1 ${
                  isActive
                    ? "bg-[var(--color-sidebar-accent)] text-[var(--color-sidebar-accent-foreground)] font-semibold"
                    : ""
                }`}
              >
                <span className="text-lg mr-3 md:mr-0">{link.icon}</span>
                <span className={`inline md:${collapsed ? "hidden" : "inline"}`}>
                  {link.name}
                </span>
              </a>
            );
          })}
        </nav>

        {/* Footer */}
        <div
          className={`mt-auto px-4 py-4 border-t border-[var(--color-sidebar-border)] flex flex-col gap-2 ${
            collapsed ? "md:items-center md:px-0" : ""
          }`}
        >
          <a
            href="#settings"
            className={`flex items-center gap-2 text-[var(--color-muted-foreground)] hover:text-[var(--color-sidebar-primary)] text-sm font-medium ${
              collapsed ? "md:justify-center" : ""
            }`}
          >
            <FiSettings /> {!collapsed && "Settings"}
          </a>
          <a
            href="#help"
            className={`flex items-center gap-2 text-[var(--color-muted-foreground)] hover:text-[var(--color-sidebar-primary)] text-sm font-medium ${
              collapsed ? "md:justify-center" : ""
            }`}
          >
            <FiHelpCircle /> {!collapsed && "Help"}
          </a>
          <a
            href="#logout"
            className={`flex items-center gap-2 text-[var(--color-destructive)] hover:text-[var(--color-destructive)]/80 text-sm font-medium ${
              collapsed ? "md:justify-center" : ""
            }`}
          >
            <FiLogOut /> {!collapsed && "Logout"}
          </a>
        </div>
      </aside>
    </>
  );
}
