"use client";

import { useMemo, useState } from "react";
import { format, parseISO, differenceInCalendarDays } from "date-fns";
import {
  CalendarCheck,
  CheckCircle2,
  XCircle,
  Percent,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  attendanceRecords,
  type AttendanceRecord,
  type AttendanceStatus,
} from "@/lib/mockData";

type DateRange = "All" | "Last 30 days" | "Last 90 days";
type StatusFilter = "All" | AttendanceStatus;

const TODAY = new Date("2026-06-15");

const statusChipStyles: Record<AttendanceStatus, string> = {
  Attended: "bg-[#2E8B57]/10 text-[#2E8B57]",
  Missed: "bg-[#E63946]/10 text-[#E63946]",
  Pending: "bg-[#F4A261]/15 text-[#B45309]",
};

export default function AttendancePage() {
  const [dateRange, setDateRange] = useState<DateRange>("All");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [search, setSearch] = useState("");

  const attendedCount = useMemo(
    () => attendanceRecords.filter((r) => r.status === "Attended").length,
    [],
  );
  const missedCount = useMemo(
    () => attendanceRecords.filter((r) => r.status === "Missed").length,
    [],
  );
  const attendanceRate = useMemo(() => {
    const denom = attendedCount + missedCount;
    return denom === 0 ? 0 : Math.round((attendedCount / denom) * 100);
  }, [attendedCount, missedCount]);

  const filtered = useMemo<AttendanceRecord[]>(() => {
    return attendanceRecords.filter((r) => {
      if (statusFilter !== "All" && r.status !== statusFilter) return false;

      if (dateRange !== "All") {
        const limit = dateRange === "Last 30 days" ? 30 : 90;
        const diff = Math.abs(differenceInCalendarDays(TODAY, parseISO(r.date)));
        if (diff > limit) return false;
      }

      if (
        search.trim() &&
        !r.activity.toLowerCase().includes(search.trim().toLowerCase())
      ) {
        return false;
      }

      return true;
    });
  }, [statusFilter, dateRange, search]);

  const stats = [
    {
      label: "Total Sessions",
      value: attendanceRecords.length,
      icon: CalendarCheck,
      color: "#0077B6",
    },
    {
      label: "Attended",
      value: attendedCount,
      icon: CheckCircle2,
      color: "#2E8B57",
    },
    {
      label: "Missed",
      value: missedCount,
      icon: XCircle,
      color: "#E63946",
    },
    {
      label: "Attendance Rate",
      value: `${attendanceRate}%`,
      icon: Percent,
      color: "#00B4D8",
    },
  ];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-slate-900">
          Attendance Records
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Track your CPD session attendance, hours, and signature requirements.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="card flex items-center gap-4 p-5">
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg"
                style={{ backgroundColor: `${s.color}1A`, color: s.color }}
              >
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-2xl font-semibold text-slate-900">
                  {s.value}
                </p>
                <p className="text-sm text-slate-500">{s.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="card flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between">
        <div className="relative md:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search activity name..."
            className="w-full rounded-lg border border-slate-200 bg-[#F8FAFC] py-2 pl-9 pr-3 text-sm text-slate-700 outline-none focus:border-[#0077B6] focus:ring-1 focus:ring-[#0077B6]"
          />
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value as DateRange)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-[#0077B6] focus:ring-1 focus:ring-[#0077B6]"
          >
            <option value="All">All dates</option>
            <option value="Last 30 days">Last 30 days</option>
            <option value="Last 90 days">Last 90 days</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-[#0077B6] focus:ring-1 focus:ring-[#0077B6]"
          >
            <option value="All">All statuses</option>
            <option value="Attended">Attended</option>
            <option value="Missed">Missed</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Activity Name</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">Hours</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Signature Required</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-10 text-center text-sm text-slate-400"
                >
                  No attendance records match your filters.
                </td>
              </tr>
            ) : (
              filtered.map((r) => (
                <tr
                  key={r.id}
                  className="border-b border-slate-100 last:border-0 hover:bg-[#F8FAFC]"
                >
                  <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                    {format(parseISO(r.date), "dd MMM yyyy")}
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-900">
                    {r.activity}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                    {r.type}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{r.hours}</td>
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        "inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium",
                        statusChipStyles[r.status],
                      )}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        "inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium",
                        r.signatureRequired
                          ? "bg-[#F4A261]/15 text-[#B45309]"
                          : "bg-slate-100 text-slate-500",
                      )}
                    >
                      {r.signatureRequired ? "Required" : "Not required"}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
