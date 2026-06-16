"use client";

import { useState } from "react";
import {
  Menu,
  Search,
  Bell,
  HelpCircle,
  ChevronDown,
  Settings,
  LogOut,
  User,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { currentUser, notifications } from "@/lib/mockData";

export interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [lang, setLang] = useState("EN");

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-slate-200 bg-white px-4 lg:px-6">
      <button
        onClick={onMenuClick}
        className="rounded-md p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      <h1 className="hidden text-lg font-bold text-slate-800 sm:block lg:hidden xl:block">
        CPD Nursing Portal
      </h1>

      <div className="relative ml-auto hidden flex-1 max-w-md md:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          placeholder="Search activities, courses, certificates..."
          className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-[#0077B6] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0077B6]/20"
        />
      </div>

      <div className="ml-auto flex items-center gap-1 sm:gap-2 md:ml-0">
        <button
          className="hidden rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 sm:block"
          aria-label="Help"
        >
          <HelpCircle className="h-5 w-5" />
        </button>

        <div className="relative hidden sm:block">
          <button
            onClick={() => {
              setLangOpen((v) => !v);
              setProfileOpen(false);
            }}
            className="flex items-center gap-1 rounded-md px-2 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
          >
            <Globe className="h-4 w-4" />
            {lang}
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
          {langOpen && (
            <div className="absolute right-0 mt-2 w-32 rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
              {["EN", "FR", "ES", "DE"].map((l) => (
                <button
                  key={l}
                  onClick={() => {
                    setLang(l);
                    setLangOpen(false);
                  }}
                  className={cn(
                    "block w-full px-3 py-2 text-left text-sm hover:bg-slate-50",
                    l === lang ? "font-semibold text-[#0077B6]" : "text-slate-600"
                  )}
                >
                  {l}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          className="relative rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-[#E63946] px-1 text-[10px] font-bold text-white">
              {unreadCount}
            </span>
          )}
        </button>

        <div className="relative">
          <button
            onClick={() => {
              setProfileOpen((v) => !v);
              setLangOpen(false);
            }}
            className="flex items-center gap-2 rounded-lg p-1 pr-2 hover:bg-slate-100"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0077B6] text-sm font-bold text-white">
              {currentUser.initials}
            </span>
            <span className="hidden text-left leading-tight md:block">
              <span className="block text-sm font-semibold text-slate-800">
                {currentUser.name}
              </span>
              <span className="block text-xs text-slate-500">{currentUser.role}</span>
            </span>
            <ChevronDown className="hidden h-4 w-4 text-slate-400 md:block" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
              <div className="border-b border-slate-100 px-4 py-3">
                <p className="text-sm font-semibold text-slate-800">{currentUser.name}</p>
                <p className="text-xs text-slate-500">{currentUser.email}</p>
              </div>
              <button className="flex w-full items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">
                <User className="h-4 w-4" /> My Profile
              </button>
              <button className="flex w-full items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">
                <Settings className="h-4 w-4" /> Settings
              </button>
              <button className="flex w-full items-center gap-2 border-t border-slate-100 px-4 py-2 text-sm text-[#E63946] hover:bg-red-50">
                <LogOut className="h-4 w-4" /> Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
