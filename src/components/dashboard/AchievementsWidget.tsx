"use client";

import * as Icons from "lucide-react";
import { Flame, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { achievements, learningStreak, totalPoints } from "@/lib/mockData";

export default function AchievementsWidget() {
  return (
    <div className="card p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-bold text-slate-800">Achievements</h2>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F4A261]/15 px-3 py-1.5 text-sm font-semibold text-[#B26A1F]">
            <Flame className="h-4 w-4" />
            {learningStreak}-day streak
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0077B6]/10 px-3 py-1.5 text-sm font-semibold text-[#0077B6]">
            <Sparkles className="h-4 w-4" />
            {totalPoints} pts
          </span>
        </div>
      </div>

      <div className="scrollbar-thin flex gap-4 overflow-x-auto pb-2">
        {achievements.map((a) => {
          const Icon =
            (Icons[a.iconName as keyof typeof Icons] as React.ComponentType<{
              className?: string;
            }>) ?? Icons.Award;
          return (
            <div
              key={a.id}
              className={cn(
                "flex w-32 shrink-0 flex-col items-center gap-2 rounded-xl border p-4 text-center transition-all",
                a.earned
                  ? "border-[#0077B6]/20 bg-[#0077B6]/5"
                  : "border-slate-100 bg-slate-50 opacity-50 grayscale"
              )}
              title={a.description}
            >
              <span
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-full",
                  a.earned ? "bg-[#0077B6] text-white" : "bg-slate-200 text-slate-400"
                )}
              >
                <Icon className="h-6 w-6" />
              </span>
              <span className="text-xs font-semibold text-slate-700">{a.name}</span>
              <span className="text-[11px] font-medium text-slate-400">
                {a.earned ? `+${a.points} pts` : "Locked"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
