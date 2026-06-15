"use client";

import { format, parseISO } from "date-fns";
import { Award, Download, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { certifications, type CertStatus } from "@/lib/mockData";

const statusStyles: Record<CertStatus, { badge: string; dot: string }> = {
  Active: { badge: "bg-[#2E8B57]/10 text-[#2E8B57]", dot: "bg-[#2E8B57]" },
  "Expiring Soon": { badge: "bg-[#F4A261]/15 text-[#B26A1F]", dot: "bg-[#F4A261]" },
  Expired: { badge: "bg-[#E63946]/10 text-[#E63946]", dot: "bg-[#E63946]" },
};

export default function CertificationsPanel() {
  const items = certifications.slice(0, 6);

  return (
    <div className="card flex flex-col p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-800">Certifications</h2>
        <button className="text-sm font-semibold text-[#0077B6] hover:underline">
          Manage
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {items.map((c) => {
          const style = statusStyles[c.status];
          const needsRenewal = c.status !== "Active";
          return (
            <div
              key={c.id}
              className="flex flex-col rounded-lg border border-slate-100 p-4 transition-colors hover:border-slate-200"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0077B6]/10 text-[#0077B6]">
                  <Award className="h-5 w-5" />
                </span>
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
                    style.badge
                  )}
                >
                  <span className={cn("h-1.5 w-1.5 rounded-full", style.dot)} />
                  {c.status}
                </span>
              </div>
              <p className="mt-3 text-sm font-semibold text-slate-800">{c.name}</p>
              <p className="text-xs text-slate-500">{c.issuer}</p>
              <p className="mt-1 text-xs text-slate-400">
                Expires {format(parseISO(c.expiryDate), "dd MMM yyyy")}
              </p>
              <div className="mt-3 flex gap-2">
                <button className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-md border border-slate-200 px-2 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50">
                  <Download className="h-3.5 w-3.5" /> Download
                </button>
                {needsRenewal && (
                  <button className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-md bg-[#F4A261] px-2 py-1.5 text-xs font-semibold text-white hover:opacity-90">
                    <RefreshCw className="h-3.5 w-3.5" /> Renew
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
