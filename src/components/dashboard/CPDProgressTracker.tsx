"use client";

import { CheckCircle2 } from "lucide-react";

interface CategoryProgress {
  name: string;
  current: number;
  total: number;
  color: string;
}

const categories: CategoryProgress[] = [
  { name: "Clinical", current: 18, total: 20, color: "#0077B6" },
  { name: "Professional", current: 10, total: 12, color: "#00B4D8" },
  { name: "Leadership", current: 6, total: 10, color: "#2E8B57" },
  { name: "Mandatory", current: 8, total: 8, color: "#F4A261" },
];

export default function CPDProgressTracker() {
  const completed = 42;
  const required = 50;
  const percent = Math.round((completed / required) * 100);

  const size = 180;
  const stroke = 14;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="card p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-800">CPD Progress</h2>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#2E8B57]/10 px-3 py-1 text-xs font-semibold text-[#2E8B57]">
          <CheckCircle2 className="h-3.5 w-3.5" />
          Compliant
        </span>
      </div>

      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:gap-8">
        <div className="relative shrink-0" style={{ width: size, height: size }}>
          <svg width={size} height={size} className="-rotate-90">
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="#E2E8F0"
              strokeWidth={stroke}
            />
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="#0077B6"
              strokeWidth={stroke}
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className="transition-all duration-700"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-slate-800">{percent}%</span>
            <span className="text-xs font-medium text-slate-500">
              {completed} / {required} hrs
            </span>
          </div>
        </div>

        <div className="w-full flex-1 space-y-4">
          {categories.map((c) => {
            const pct = Math.round((c.current / c.total) * 100);
            return (
              <div key={c.name}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-600">{c.name}</span>
                  <span className="font-semibold text-slate-500">
                    {c.current}/{c.total} hrs
                  </span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${pct}%`, backgroundColor: c.color }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
