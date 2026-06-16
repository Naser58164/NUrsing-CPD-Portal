"use client";

import { useMemo, useState } from "react";
import { format, parseISO } from "date-fns";
import {
  Eye,
  Search,
  ClipboardList,
  CheckCircle2,
  Loader2,
  Clock4,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { upcomingActivities } from "@/lib/mockData";

type ActivityStatus = "Completed" | "In Progress" | "Pending";

interface ActivityRow {
  id: string;
  title: string;
  type: string;
  hours: number;
  date: string;
  status: ActivityStatus;
}

const extraRows: ActivityRow[] = [
  {
    id: "log-1",
    title: "Sepsis Recognition E-Learning",
    type: "E-Learning",
    hours: 2,
    date: "2026-06-10",
    status: "Completed",
  },
  {
    id: "log-2",
    title: "Cardiac Monitoring Workshop",
    type: "Workshop",
    hours: 4,
    date: "2026-06-05",
    status: "Completed",
  },
  {
    id: "log-3",
    title: "Pain Management Seminar",
    type: "Seminar",
    hours: 3,
    date: "2026-05-28",
    status: "In Progress",
  },
  {
    id: "log-4",
    title: "Diabetes Care Update",
    type: "Webinar",
    hours: 2,
    date: "2026-05-20",
    status: "Completed",
  },
  {
    id: "log-5",
    title: "Mental Health First Aid",
    type: "Seminar",
    hours: 4,
    date: "2026-04-18",
    status: "Pending",
  },
];

const allRows: ActivityRow[] = [
  ...upcomingActivities.map<ActivityRow>((a) => ({
    id: a.id,
    title: a.title,
    type: a.type,
    hours: a.hours,
    date: a.date,
    status:
      a.registrationStatus === "Registered" ? "In Progress" : "Pending",
  })),
  ...extraRows,
];

const statusChip: Record<ActivityStatus, string> = {
  Completed: "bg-[#2E8B57]/10 text-[#2E8B57]",
  "In Progress": "bg-[#00B4D8]/10 text-[#0077B6]",
  Pending: "bg-[#F4A261]/15 text-[#B5651D]",
};

interface StatCard {
  label: string;
  value: number;
  icon: typeof ClipboardList;
  color: string;
}

export default function ActivitiesPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const types = useMemo(
    () => ["All", ...Array.from(new Set(allRows.map((r) => r.type)))],
    [],
  );

  const filtered = useMemo(
    () =>
      allRows.filter((r) => {
        const matchesSearch = r.title
          .toLowerCase()
          .includes(search.trim().toLowerCase());
        const matchesType = typeFilter === "All" || r.type === typeFilter;
        const matchesStatus =
          statusFilter === "All" || r.status === statusFilter;
        return matchesSearch && matchesType && matchesStatus;
      }),
    [search, typeFilter, statusFilter],
  );

  const stats: StatCard[] = [
    {
      label: "Total Activities",
      value: allRows.length,
      icon: ClipboardList,
      color: "#0077B6",
    },
    {
      label: "Completed",
      value: allRows.filter((r) => r.status === "Completed").length,
      icon: CheckCircle2,
      color: "#2E8B57",
    },
    {
      label: "In Progress",
      value: allRows.filter((r) => r.status === "In Progress").length,
      icon: Loader2,
      color: "#00B4D8",
    },
    {
      label: "Pending",
      value: allRows.filter((r) => r.status === "Pending").length,
      icon: Clock4,
      color: "#F4A261",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">My CPD Activities</h1>
        <p className="mt-1 text-sm text-slate-500">
          Track, filter and review your continuing professional development
          record.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="card flex items-center gap-4 p-5">
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg"
                style={{ backgroundColor: `${s.color}1A`, color: s.color }}
              >
                <Icon className="h-6 w-6" />
              </span>
              <div>
                <p className="text-2xl font-bold text-slate-900">{s.value}</p>
                <p className="text-sm text-slate-500">{s.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="card p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title..."
              className="w-full rounded-lg border border-slate-200 bg-[#F8FAFC] py-2 pl-9 pr-3 text-sm text-slate-800 outline-none focus:border-[#0077B6] focus:ring-1 focus:ring-[#0077B6]"
            />
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-[#0077B6] focus:ring-1 focus:ring-[#0077B6]"
          >
            {types.map((t) => (
              <option key={t} value={t}>
                {t === "All" ? "All Types" : t}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-[#0077B6] focus:ring-1 focus:ring-[#0077B6]"
          >
            {["All", "Completed", "In Progress", "Pending"].map((s) => (
              <option key={s} value={s}>
                {s === "All" ? "All Statuses" : s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-[#F8FAFC] text-xs uppercase tracking-wide text-slate-500">
                <th className="px-5 py-3 font-semibold">Title</th>
                <th className="px-5 py-3 font-semibold">Type</th>
                <th className="px-5 py-3 font-semibold">Hours</th>
                <th className="px-5 py-3 font-semibold">Date</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-10 text-center text-slate-400"
                  >
                    No activities match your filters.
                  </td>
                </tr>
              ) : (
                filtered.map((r) => (
                  <tr
                    key={r.id}
                    className="border-b border-slate-100 last:border-0 hover:bg-[#F8FAFC]"
                  >
                    <td className="px-5 py-3 font-medium text-slate-900">
                      {r.title}
                    </td>
                    <td className="px-5 py-3 text-slate-600">{r.type}</td>
                    <td className="px-5 py-3 text-slate-600">{r.hours}</td>
                    <td className="px-5 py-3 text-slate-600">
                      {format(parseISO(r.date), "dd MMM yyyy")}
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={cn(
                          "inline-flex rounded-full px-2.5 py-1 text-xs font-medium",
                          statusChip[r.status],
                        )}
                      >
                        {r.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <button
                        type="button"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-[#0077B6] transition hover:bg-[#0077B6]/10"
                      >
                        <Eye className="h-4 w-4" />
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
