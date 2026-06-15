"use client";

import { format, parseISO } from "date-fns";
import { CalendarClock } from "lucide-react";
import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { competencies, type Competency } from "@/lib/mockData";
import { cn } from "@/lib/utils";

interface RadarDatum {
  name: string;
  current: number;
  required: number;
}

const radarData: RadarDatum[] = competencies.map((c) => ({
  name: c.name,
  current: c.currentLevel,
  required: c.requiredLevel,
}));

function LevelDots({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`Level ${level} of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "h-2.5 w-2.5 rounded-full",
            i < level ? "bg-[#0077B6]" : "bg-slate-200",
          )}
        />
      ))}
    </div>
  );
}

function GapChip({ gap }: { gap: number }) {
  if (gap <= 0) {
    return (
      <span className="inline-flex rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-[#2E8B57]">
        Met
      </span>
    );
  }
  if (gap === 1) {
    return (
      <span className="inline-flex rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-[#F4A261]">
        1 below
      </span>
    );
  }
  return (
    <span className="inline-flex rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-[#E63946]">
      {gap} below
    </span>
  );
}

export default function CompetenciesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Competency Matrix</h1>
        <p className="mt-1 text-sm text-slate-500">
          Track your current proficiency against required levels across core nursing competencies.
        </p>
      </div>

      <div className="card p-5">
        <h2 className="mb-4 text-base font-semibold text-slate-900">
          Current vs. Required Proficiency
        </h2>
        <ResponsiveContainer width="100%" height={360}>
          <RadarChart data={radarData} outerRadius="75%">
            <PolarGrid stroke="#e2e8f0" />
            <PolarAngleAxis
              dataKey="name"
              tick={{ fontSize: 12, fill: "#475569" }}
            />
            <PolarRadiusAxis domain={[0, 5]} tick={{ fontSize: 11, fill: "#94a3b8" }} />
            <Radar
              name="Current"
              dataKey="current"
              stroke="#0077B6"
              fill="#0077B6"
              fillOpacity={0.4}
            />
            <Radar
              name="Required"
              dataKey="required"
              stroke="#F4A261"
              fill="transparent"
              fillOpacity={0}
            />
            <Legend />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="card p-5">
        <h2 className="mb-4 text-base font-semibold text-slate-900">
          Competency Details
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                <th className="px-3 py-3 font-medium">Competency</th>
                <th className="px-3 py-3 font-medium">Current Level</th>
                <th className="px-3 py-3 font-medium">Required Level</th>
                <th className="px-3 py-3 font-medium">Gap</th>
                <th className="px-3 py-3 font-medium">Last Assessed</th>
                <th className="px-3 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {competencies.map((c: Competency) => {
                const gap = c.requiredLevel - c.currentLevel;
                return (
                  <tr
                    key={c.id}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                  >
                    <td className="px-3 py-4">
                      <div className="font-medium text-slate-900">{c.name}</div>
                      <div className="text-xs text-slate-400">{c.category}</div>
                    </td>
                    <td className="px-3 py-4">
                      <LevelDots level={c.currentLevel} />
                    </td>
                    <td className="px-3 py-4">
                      <LevelDots level={c.requiredLevel} />
                    </td>
                    <td className="px-3 py-4">
                      <GapChip gap={gap} />
                    </td>
                    <td className="px-3 py-4 text-slate-600">
                      {format(parseISO(c.lastAssessed), "dd MMM yyyy")}
                    </td>
                    <td className="px-3 py-4">
                      {gap > 0 ? (
                        <button
                          type="button"
                          className="inline-flex items-center gap-1.5 rounded-lg bg-[#0077B6] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#005f92]"
                        >
                          <CalendarClock className="h-3.5 w-3.5" />
                          Schedule Training
                        </button>
                      ) : (
                        <span className="text-xs font-medium text-slate-400">
                          Up to date
                        </span>
                      )}
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
