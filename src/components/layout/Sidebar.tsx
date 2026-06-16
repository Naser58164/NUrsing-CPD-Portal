"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  GraduationCap,
  Award,
  Target,
  ClipboardList,
  FileCheck,
  BarChart2,
  Users,
  UserCog,
  Settings,
  LogOut,
  HeartPulse,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentPath: string;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "My CPD Activities", href: "/activities", icon: BookOpen },
  { label: "Learning Calendar", href: "/calendar", icon: Calendar },
  { label: "Training Catalogue", href: "/catalogue", icon: GraduationCap },
  { label: "Certifications", href: "/certifications", icon: Award },
  { label: "Competencies", href: "/competencies", icon: Target },
  { label: "Attendance Records", href: "/attendance", icon: ClipboardList },
  { label: "Assessments", href: "/assessments", icon: FileCheck },
  { label: "Reports & Analytics", href: "/analytics", icon: BarChart2 },
  { label: "Department Performance", href: "/department", icon: Users },
  { label: "User Management", href: "/users", icon: UserCog },
  { label: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar({ isOpen, onClose, currentPath }: SidebarProps) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/50 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-white shadow-xl transition-transform duration-300 lg:translate-x-0 lg:shadow-none lg:border-r lg:border-slate-200",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between gap-2 border-b border-slate-200 px-5">
          <Link href="/dashboard" className="flex items-center gap-2.5" onClick={onClose}>
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0077B6] text-white">
              <HeartPulse className="h-5 w-5" />
            </span>
            <span className="text-base font-bold leading-tight text-slate-800">
              CPD Nursing
              <span className="block text-xs font-medium text-[#0077B6]">Portal</span>
            </span>
          </Link>
          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100 lg:hidden"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="scrollbar-thin flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const active =
                currentPath === item.href || currentPath.startsWith(item.href + "/");
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      active
                        ? "bg-[#0077B6] text-white shadow-sm"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    )}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-slate-200 p-3">
          <button
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#E63946] transition-colors hover:bg-red-50"
            type="button"
          >
            <LogOut className="h-5 w-5 shrink-0" />
            <span>Log out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
