"use client";

import { useState } from "react";
import { Download, FileSpreadsheet } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { analyticsData, departmentStats } from "@/lib/mockData";

type DateRange = "3" | "6" | "12";

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState<DateRange>("12");
  const [department, setDepartment] = useState<string>("All");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Reports &amp; Analytics</h1>
        <p className="mt-1 text-sm text-slate-500">
          Visualise CPD activity, compliance trends and category distribution across the organisation.
        </p>
      </div>

      <div className="card flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value as DateRange)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-[#0077B6] focus:outline-none"
          >
            <option value="3">Last 3 months</option>
            <option value="6">Last 6 months</option>
            <option value="12">Last 12 months</option>
          </select>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-[#0077B6] focus:outline-none"
          >
            <option value="All">All Departments</option>
            {departmentStats.departments.map((d) => (
              <option key={d.name} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            <Download className="h-4 w-4" />
            Export PDF
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            <FileSpreadsheet className="h-4 w-4" />
            Export Excel
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card p-5">
          <h2 className="mb-4 text-base font-semibold text-slate-900">
            Monthly CPD Hours vs. Target
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analyticsData.monthly}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#475569" }} />
              <YAxis tick={{ fontSize: 12, fill: "#475569" }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="hours" name="Hours" fill="#0077B6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="target" name="Target" fill="#00B4D8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-5">
          <h2 className="mb-4 text-base font-semibold text-slate-900">
            Compliance Trend
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analyticsData.complianceTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#475569" }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: "#475569" }} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="rate"
                name="Compliance %"
                stroke="#2E8B57"
                strokeWidth={2}
                dot
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card p-5 lg:col-span-2">
          <h2 className="mb-4 text-base font-semibold text-slate-900">
            CPD Hours by Category
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={analyticsData.categoryBreakdown}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
              >
                {analyticsData.categoryBreakdown.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
