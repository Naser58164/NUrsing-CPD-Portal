"use client";

import { useState } from "react";
import { formatDistanceToNow, parseISO } from "date-fns";
import {
  Info,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  CheckCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { notifications as initialNotifications, type Severity } from "@/lib/mockData";

const severityConfig: Record<
  Severity,
  { icon: React.ComponentType<{ className?: string }>; color: string; bg: string }
> = {
  info: { icon: Info, color: "#0077B6", bg: "bg-[#0077B6]/10" },
  success: { icon: CheckCircle2, color: "#2E8B57", bg: "bg-[#2E8B57]/10" },
  warning: { icon: AlertTriangle, color: "#B26A1F", bg: "bg-[#F4A261]/15" },
  error: { icon: AlertCircle, color: "#E63946", bg: "bg-[#E63946]/10" },
};

export default function NotificationsWidget() {
  const [items, setItems] = useState(initialNotifications);
  const unread = items.filter((n) => !n.read).length;

  const markAllRead = () => setItems((prev) => prev.map((n) => ({ ...n, read: true })));

  return (
    <div className="card flex h-full flex-col p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-bold text-slate-800">
          Notifications
          {unread > 0 && (
            <span className="rounded-full bg-[#E63946] px-2 py-0.5 text-xs font-bold text-white">
              {unread}
            </span>
          )}
        </h2>
        <button
          onClick={markAllRead}
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#0077B6] hover:underline"
        >
          <CheckCheck className="h-3.5 w-3.5" /> Mark all read
        </button>
      </div>

      <ul className="scrollbar-thin max-h-[380px] space-y-2 overflow-y-auto pr-1">
        {items.map((n) => {
          const cfg = severityConfig[n.severity];
          const Icon = cfg.icon;
          return (
            <li
              key={n.id}
              className={cn(
                "flex gap-3 rounded-lg border p-3 transition-colors",
                n.read ? "border-slate-100 bg-white" : "border-slate-200 bg-slate-50"
              )}
            >
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                  cfg.bg
                )}
                style={{ color: cfg.color }}
              >
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-semibold text-slate-800">{n.title}</p>
                  {!n.read && (
                    <span className="h-2 w-2 shrink-0 rounded-full bg-[#0077B6]" />
                  )}
                </div>
                <p className="mt-0.5 text-xs text-slate-500">{n.message}</p>
                <p className="mt-1 text-[11px] font-medium text-slate-400">
                  {formatDistanceToNow(parseISO(n.timestamp), { addSuffix: true })}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
