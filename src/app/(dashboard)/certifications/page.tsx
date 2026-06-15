"use client";

import { useMemo, useState } from "react";
import { format, parseISO } from "date-fns";
import {
  Award,
  Upload,
  Search,
  Download,
  RefreshCw,
  X,
  ShieldCheck,
  AlertTriangle,
  XCircle,
  FileStack,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { certifications, type CertStatus } from "@/lib/mockData";

const statusBadge: Record<CertStatus, string> = {
  Active: "bg-[#2E8B57]/10 text-[#2E8B57]",
  "Expiring Soon": "bg-[#F4A261]/15 text-[#B5651D]",
  Expired: "bg-[#E63946]/10 text-[#E63946]",
};

interface StatCard {
  label: string;
  value: number;
  icon: typeof FileStack;
  color: string;
}

export default function CertificationsPage() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(certifications.map((c) => c.category)))],
    [],
  );

  const filtered = useMemo(
    () =>
      certifications.filter((c) => {
        const matchesSearch =
          c.name.toLowerCase().includes(search.trim().toLowerCase()) ||
          c.issuer.toLowerCase().includes(search.trim().toLowerCase());
        const matchesCategory =
          categoryFilter === "All" || c.category === categoryFilter;
        const matchesStatus =
          statusFilter === "All" || c.status === statusFilter;
        return matchesSearch && matchesCategory && matchesStatus;
      }),
    [search, categoryFilter, statusFilter],
  );

  const stats: StatCard[] = [
    {
      label: "Total",
      value: certifications.length,
      icon: FileStack,
      color: "#0077B6",
    },
    {
      label: "Active",
      value: certifications.filter((c) => c.status === "Active").length,
      icon: ShieldCheck,
      color: "#2E8B57",
    },
    {
      label: "Expiring Soon",
      value: certifications.filter((c) => c.status === "Expiring Soon").length,
      icon: AlertTriangle,
      color: "#F4A261",
    },
    {
      label: "Expired",
      value: certifications.filter((c) => c.status === "Expired").length,
      icon: XCircle,
      color: "#E63946",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Certifications</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage your credentials, renewals and supporting evidence.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-[#0077B6] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#0077B6]/90"
        >
          <Upload className="h-4 w-4" />
          Upload New Certificate
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="card flex items-center gap-4 p-5">
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg"
                style={{ backgroundColor: `${s.color}1A`, color: s.color }}
              >
                <Icon className="h-6 w-6" />
              </span>
              <div>
                <p className="text-2xl font-bold text-slate-900">{s.value}</p>
                <p className="text-sm text-slate-500">{s.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="card p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search certificates..."
              className="w-full rounded-lg border border-slate-200 bg-[#F8FAFC] py-2 pl-9 pr-3 text-sm text-slate-800 outline-none focus:border-[#0077B6] focus:ring-1 focus:ring-[#0077B6]"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-[#0077B6] focus:ring-1 focus:ring-[#0077B6]"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === "All" ? "All Categories" : c}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-[#0077B6] focus:ring-1 focus:ring-[#0077B6]"
          >
            {["All", "Active", "Expiring Soon", "Expired"].map((s) => (
              <option key={s} value={s}>
                {s === "All" ? "All Statuses" : s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="card p-10 text-center text-slate-400">
          No certificates match your filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => (
            <div key={c.id} className="card flex flex-col p-5">
              <div className="flex items-start justify-between gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#0077B6]/10 text-[#0077B6]">
                  <Award className="h-6 w-6" />
                </span>
                <span
                  className={cn(
                    "inline-flex rounded-full px-2.5 py-1 text-xs font-medium",
                    statusBadge[c.status],
                  )}
                >
                  {c.status}
                </span>
              </div>

              <h3 className="mt-4 text-base font-semibold text-slate-900">
                {c.name}
              </h3>
              <p className="text-sm text-slate-500">{c.issuer}</p>

              <dl className="mt-4 space-y-1.5 text-sm">
                <div className="flex justify-between gap-2">
                  <dt className="text-slate-400">Credential ID</dt>
                  <dd className="font-medium text-slate-700">
                    {c.credentialId}
                  </dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-slate-400">Issued</dt>
                  <dd className="font-medium text-slate-700">
                    {format(parseISO(c.issuedDate), "dd MMM yyyy")}
                  </dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-slate-400">Expires</dt>
                  <dd className="font-medium text-slate-700">
                    {format(parseISO(c.expiryDate), "dd MMM yyyy")}
                  </dd>
                </div>
              </dl>

              <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  <Download className="h-4 w-4" />
                  Download
                </button>
                {c.status !== "Active" && (
                  <button
                    type="button"
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#F4A261] px-3 py-2 text-xs font-medium text-white transition hover:bg-[#F4A261]/90"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Renew
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="card w-full max-w-md p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">
                Upload New Certificate
              </h2>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setModalOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-5 flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 bg-[#F8FAFC] px-6 py-10 text-center">
              <Upload className="h-8 w-8 text-[#0077B6]" />
              <p className="text-sm font-medium text-slate-700">
                Drag &amp; drop your file here
              </p>
              <p className="text-xs text-slate-400">
                PDF, PNG or JPG up to 10MB
              </p>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="inline-flex items-center gap-2 rounded-lg bg-[#0077B6] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#0077B6]/90"
              >
                <Upload className="h-4 w-4" />
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
