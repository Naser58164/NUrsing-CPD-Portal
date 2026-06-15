"use client";

import { format, parseISO } from "date-fns";
import { MapPin, Wifi, CalendarPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  upcomingActivities,
  type ActivityType,
  type RegistrationStatus,
} from "@/lib/mockData";

const typeColors: Record<ActivityType, string> = {
  Workshop: "#0077B6",
  Conference: "#7C3AED",
  "E-Learning": "#00B4D8",
  Seminar: "#2E8B57",
  Simulation: "#F4A261",
  Webinar: "#00B4D8",
};

const statusStyles: Record<RegistrationStatus, string> = {
  Registered: "bg-[#2E8B57]/10 text-[#2E8B57]",
  Open: "bg-[#0077B6]/10 text-[#0077B6]",
  Waitlist: "bg-[#F4A261]/15 text-[#B26A1F]",
  Full: "bg-slate-100 text-slate-400",
};

export default function UpcomingActivities() {
  return (
    <div className="card flex flex-col p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-800">Upcoming Activities</h2>
        <button className="text-sm font-semibold text-[#0077B6] hover:underline">
          View all
        </button>
      </div>

      <ul className="space-y-3">
        {upcomingActivities.map((a) => {
          const date = parseISO(a.date);
          const color = typeColors[a.type];
          return (
            <li
              key={a.id}
              className="flex items-center gap-3 rounded-lg border border-slate-100 p-3 transition-colors hover:border-slate-200 hover:bg-slate-50"
            >
              <div
                className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-lg text-white"
                style={{ backgroundColor: color }}
              >
                <span className="text-lg font-bold leading-none">{format(date, "dd")}</span>
                <span className="text-[10px] font-medium uppercase">
                  {format(date, "MMM")}
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-800">{a.title}</p>
                <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1">
                    {a.isOnline ? (
                      <Wifi className="h-3.5 w-3.5" />
                    ) : (
                      <MapPin className="h-3.5 w-3.5" />
                    )}
                    {a.venue}
                  </span>
                  <span
                    className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
                    style={{ backgroundColor: `${color}1A`, color }}
                  >
                    {a.type}
                  </span>
                  <span>{a.hours} hrs</span>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <span
                  className={cn(
                    "hidden rounded-full px-2.5 py-1 text-xs font-semibold sm:inline-block",
                    statusStyles[a.registrationStatus]
                  )}
                >
                  {a.registrationStatus}
                </span>
                <button
                  className="rounded-md p-2 text-[#0077B6] hover:bg-[#0077B6]/10"
                  aria-label="Add to calendar"
                >
                  <CalendarPlus className="h-4 w-4" />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
