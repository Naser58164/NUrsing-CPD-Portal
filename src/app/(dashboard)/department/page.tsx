"use client";

import { AlertTriangle, ShieldCheck, TrendingUp, Users } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { departmentStats, type TopPerformer } from "@/lib/mockData";
import { cn } from "@/lib/utils";

const { departments, topPerformers } = departmentStats;

const overallCompliance = Math.round(
  departments.reduce((sum, d) => sum + d.compliance, 0) / departments.length,
);
const totalStaff = departments.reduce((sum, d) => sum + d.totalStaff, 0);
const compliantStaff = departments.reduce((sum, d) => sum + d.compliantStaff, 0);
const atRisk = totalStaff - compliantStaff;

interface Kpi {
  label: string;
  value: string;
  icon: typeof Users;
  color: string;
}

const kpis: Kpi[] = [
  { label: "Overall Compliance", value: `${overallCompliance}%`, icon: TrendingUp, color: "#0077B6" },
  { label: "Total Staff", value: `${totalStaff}`, icon: Users, color: "#00B4D8" },
  { label: "Compliant Staff", value: `${compliantStaff}`, icon: ShieldCheck, color: "#2E8B57" },
  { label: "At Risk", value: `${atRisk}`, icon: AlertTriangle, color: "#E63946" },
];

interface StatusMeta {
  label: string;
  chip: string;
  row: string;
  bar: string;
}

function getStatus(completion: number): StatusMeta {
  if (completion >= 90) {
    return {
      label: "Compliant",
      chip: "bg-green-50 text-[#2E8B57]",
      row: "bg-green-50/40",
      bar: "bg-[#2E8B57]",
    };
  }
  if (completion >= 75) {
    return {
      label: "Near Deadline",
      chip: "bg-amber-50 text-[#F4A261]",
      row: "bg-amber-50/40",
      bar: "bg-[#F4A261]",
    };
  }
  return {
    label: "Non-Compliant",
    chip: "bg-red-50 text-[#E63946]",
    row: "bg-red-50/40",
    bar: "bg-[#E63946]",
  };
}

export default function DepartmentPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Department Performance</h1>
        <p className="mt-1 text-sm text-slate-500">
          Monitor compliance, participation and top performers across departments.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.label} className="card flex items-center gap-4 p-5">
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg"
                style={{ backgroundColor: `${kpi.color}1a`, color: kpi.color }}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">{kpi.value}</div>
                <div className="text-sm text-slate-500">{kpi.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="card p-5">
        <h2 className="mb-4 text-base font-semibold text-slate-900">
          Compliance &amp; Participation by Department
        </h2>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={departments}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#475569" }} />
            <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: "#475569" }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="participation" name="Participation %" fill="#0077B6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="compliance" name="Compliance %" fill="#00B4D8" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="card p-5">
        <h2 className="mb-4 text-base font-semibold text-slate-900">
          Top Performers Leaderboard
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                <th className="px-3 py-3 font-medium">Rank</th>
                <th className="px-3 py-3 font-medium">Name</th>
                <th className="px-3 py-3 font-medium">Department</th>
                <th className="px-3 py-3 font-medium">Hours</th>
                <th className="px-3 py-3 font-medium">Completion</th>
                <th className="px-3 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {topPerformers.map((p: TopPerformer, idx) => {
                const status = getStatus(p.completion);
                return (
                  <tr
                    key={p.name}
                    className={cn("border-b border-slate-100 last:border-0", status.row)}
                  >
                    <td className="px-3 py-4 font-semibold text-slate-700">{idx + 1}</td>
                    <td className="px-3 py-4 font-medium text-slate-900">{p.name}</td>
                    <td className="px-3 py-4 text-slate-600">{p.department}</td>
                    <td className="px-3 py-4 text-slate-600">{p.hours}</td>
                    <td className="px-3 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-24 overflow-hidden rounded-full bg-slate-200">
                          <div
                            className={cn("h-full rounded-full", status.bar)}
                            style={{ width: `${p.completion}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-slate-600">
                          {p.completion}%
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-4">
                      <span
                        className={cn(
                          "inline-flex rounded-full px-2.5 py-1 text-xs font-medium",
                          status.chip,
                        )}
                      >
                        {status.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
