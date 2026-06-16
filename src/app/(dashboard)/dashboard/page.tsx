"use client";

import { format } from "date-fns";
import { Trophy } from "lucide-react";
import KPICard from "@/components/dashboard/KPICard";
import CPDProgressTracker from "@/components/dashboard/CPDProgressTracker";
import UpcomingActivities from "@/components/dashboard/UpcomingActivities";
import NotificationsWidget from "@/components/dashboard/NotificationsWidget";
import CertificationsPanel from "@/components/dashboard/CertificationsPanel";
import QuickActions from "@/components/dashboard/QuickActions";
import AchievementsWidget from "@/components/dashboard/AchievementsWidget";
import { kpiData, currentUser, departmentStats } from "@/lib/mockData";

const medalColors = ["#F4A261", "#94A3B8", "#B45309"];

export default function DashboardPage() {
  const top3 = departmentStats.topPerformers.slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dashboard Overview</h1>
          <p className="text-sm text-slate-500">
            Welcome back, {currentUser.name.split(" ")[0]} — here is your CPD summary.
          </p>
        </div>
        <span className="text-sm font-medium text-slate-500">
          {format(new Date(), "EEEE, dd MMMM yyyy")}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {kpiData.map((k) => (
          <KPICard
            key={k.id}
            label={k.label}
            value={k.value}
            target={k.target}
            color={k.color}
            trend={k.trend}
            trendValue={k.trendValue}
            icon={k.icon}
            suffix={k.suffix}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CPDProgressTracker />
        </div>
        <div className="lg:col-span-1">
          <NotificationsWidget />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <UpcomingActivities />
        <CertificationsPanel />
      </div>

      <QuickActions />

      <AchievementsWidget />

      <div className="card p-6">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-800">
          <Trophy className="h-5 w-5 text-[#F4A261]" />
          Department Leaderboard
        </h2>
        <ul className="space-y-3">
          {top3.map((p, i) => (
            <li
              key={p.name}
              className="flex items-center gap-4 rounded-lg border border-slate-100 p-4"
            >
              <span
                className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white"
                style={{ backgroundColor: medalColors[i] }}
              >
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-800">{p.name}</p>
                <p className="text-xs text-slate-500">{p.department}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-slate-800">{p.hours} hrs</p>
                <p className="text-xs text-[#2E8B57]">{p.completion}% complete</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
