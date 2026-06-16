"use client";

import * as Icons from "lucide-react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TrendDirection } from "@/lib/mockData";

export interface KPICardProps {
  label: string;
  value: number;
  target?: number | null;
  color: string;
  trend: TrendDirection;
  trendValue?: string;
  icon: string;
  suffix?: string;
}

export default function KPICard({
  label,
  value,
  target,
  color,
  trend,
  trendValue,
  icon,
  suffix,
}: KPICardProps) {
  const IconComp =
    (Icons[icon as keyof typeof Icons] as React.ComponentType<{
      className?: string;
    }>) ?? Icons.Activity;

  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
  const trendColor =
    trend === "up" ? "text-[#2E8B57]" : trend === "down" ? "text-[#E63946]" : "text-slate-400";

  return (
    <div
      className="card relative overflow-hidden p-5"
      style={{ borderLeft: `4px solid ${color}` }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-2 flex items-baseline gap-1">
            <span className="text-3xl font-bold text-slate-800">{value}</span>
            {suffix && <span className="text-sm font-medium text-slate-400">{suffix}</span>}
            {target != null && (
              <span className="ml-1 text-sm font-medium text-slate-400">/ {target}</span>
            )}
          </p>
        </div>
        <span
          className="flex h-11 w-11 items-center justify-center rounded-full"
          style={{ backgroundColor: `${color}1A`, color }}
        >
          <IconComp className="h-5 w-5" />
        </span>
      </div>
      {trendValue && (
        <div className={cn("mt-3 flex items-center gap-1 text-xs font-medium", trendColor)}>
          <TrendIcon className="h-3.5 w-3.5" />
          <span>{trendValue}</span>
        </div>
      )}
    </div>
  );
}
