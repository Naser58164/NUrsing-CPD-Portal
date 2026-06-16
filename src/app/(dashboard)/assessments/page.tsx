"use client";

import { useMemo } from "react";
import { format, parseISO } from "date-fns";
import {
  CheckCircle2,
  XCircle,
  Gauge,
  Clock4,
  RotateCcw,
  FileCheck,
  Play,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  assessments,
  type Assessment,
  type AssessmentStatus,
} from "@/lib/mockData";

const barColor: Record<AssessmentStatus, string> = {
  Passed: "#2E8B57",
  Failed: "#E63946",
  Pending: "#94A3B8",
};

const statusBadge: Record<AssessmentStatus, string> = {
  Passed: "bg-[#2E8B57]/10 text-[#2E8B57]",
  Failed: "bg-[#E63946]/10 text-[#E63946]",
  Pending: "bg-slate-100 text-slate-500",
};

function ActionButton({ assessment }: { assessment: Assessment }) {
  if (assessment.status === "Passed") {
    return (
      <button
        type="button"
        className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
      >
        <FileCheck className="h-4 w-4" />
        View Results
      </button>
    );
  }

  if (assessment.status === "Pending") {
    return (
      <button
        type="button"
        className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#0077B6] px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-[#005f93]"
      >
        <Play className="h-4 w-4" />
        Start
      </button>
    );
  }

  const canRetake = assessment.attempts < assessment.maxAttempts;
  return (
    <button
      type="button"
      disabled={!canRetake}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        canRetake
          ? "bg-[#E63946] text-white hover:bg-[#c92f3b]"
          : "cursor-not-allowed bg-slate-100 text-slate-400",
      )}
    >
      <RotateCcw className="h-4 w-4" />
      {canRetake ? "Retake" : "No attempts left"}
    </button>
  );
}

export default function AssessmentsPage() {
  const passedCount = useMemo(
    () => assessments.filter((a) => a.status === "Passed").length,
    [],
  );
  const failedCount = useMemo(
    () => assessments.filter((a) => a.status === "Failed").length,
    [],
  );
  const pendingCount = useMemo(
    () => assessments.filter((a) => a.status === "Pending").length,
    [],
  );
  const averageScore = useMemo(() => {
    const scored = assessments.filter((a) => a.status !== "Pending");
    if (scored.length === 0) return 0;
    return Math.round(
      scored.reduce((sum, a) => sum + a.score, 0) / scored.length,
    );
  }, []);

  const stats = [
    { label: "Passed", value: passedCount, icon: CheckCircle2, color: "#2E8B57" },
    { label: "Failed", value: failedCount, icon: XCircle, color: "#E63946" },
    {
      label: "Average Score",
      value: `${averageScore}%`,
      icon: Gauge,
      color: "#0077B6",
    },
    { label: "Pending", value: pendingCount, icon: Clock4, color: "#F4A261" },
  ];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-slate-900">Assessments</h1>
        <p className="mt-1 text-sm text-slate-500">
          Review your quiz, exam, and practical assessment outcomes.
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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {assessments.map((a) => (
          <div key={a.id} className="card flex flex-col gap-4 p-5">
            <div className="flex items-start justify-between gap-3">
              <h2 className="font-semibold leading-snug text-slate-900">
                {a.title}
              </h2>
              <span
                className={cn(
                  "shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium",
                  statusBadge[a.status],
                )}
              >
                {a.status}
              </span>
            </div>

            <span className="inline-flex w-fit rounded-md bg-[#00B4D8]/10 px-2 py-0.5 text-xs font-medium text-[#0077B6]">
              {a.type}
            </span>

            <div>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="text-slate-600">
                  Score: {a.score}% (pass {a.passMark}%)
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${Math.min(a.score, 100)}%`,
                    backgroundColor: barColor[a.status],
                  }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>{format(parseISO(a.date), "dd MMM yyyy")}</span>
              <span>
                {a.attempts}/{a.maxAttempts} attempts
              </span>
            </div>

            <div className="mt-auto pt-1">
              <ActionButton assessment={a} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
