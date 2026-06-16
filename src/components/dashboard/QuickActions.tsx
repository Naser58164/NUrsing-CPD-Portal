"use client";

import {
  PlusCircle,
  Upload,
  FileText,
  Download,
  CheckSquare,
} from "lucide-react";

interface Action {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const actions: Action[] = [
  { label: "Register for Activity", icon: PlusCircle, color: "#0077B6" },
  { label: "Upload Evidence", icon: Upload, color: "#00B4D8" },
  { label: "Submit Reflection", icon: FileText, color: "#2E8B57" },
  { label: "Download CPD Report", icon: Download, color: "#F4A261" },
  { label: "Request Approval", icon: CheckSquare, color: "#7C3AED" },
];

export default function QuickActions() {
  return (
    <div className="card p-6">
      <h2 className="mb-4 text-lg font-bold text-slate-800">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {actions.map((a) => {
          const Icon = a.icon;
          return (
            <button
              key={a.label}
              className="group flex flex-col items-center gap-2 rounded-lg border border-slate-100 p-4 text-center transition-all hover:-translate-y-0.5 hover:border-slate-200 hover:shadow-sm"
            >
              <span
                className="flex h-11 w-11 items-center justify-center rounded-full transition-transform group-hover:scale-110"
                style={{ backgroundColor: `${a.color}1A`, color: a.color }}
              >
                <Icon className="h-5 w-5" />
              </span>
              <span className="text-xs font-semibold text-slate-600">{a.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
