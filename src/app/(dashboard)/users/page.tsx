"use client";

import { useState, useMemo } from "react";
import {
  Search,
  UserPlus,
  Filter,
  MoreVertical,
  CheckCircle2,
  XCircle,
  Clock,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  Mail,
  Phone,
  Shield,
  Building2,
  Users,
  UserCheck,
  UserX,
  AlertTriangle,
  X,
  Eye,
  Edit2,
  Ban,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────
type Role =
  | "Staff Nurse"
  | "Nurse Educator"
  | "Department Head"
  | "CPD Administrator"
  | "Nursing Director"
  | "HR / Staff Dev";

type UserStatus = "Active" | "Inactive" | "Pending";
type CPDStatus = "Compliant" | "Near Deadline" | "Non-Compliant";
type SortField = "name" | "role" | "department" | "cpdHours" | "lastActive" | "status";
type SortDir = "asc" | "desc";

interface PortalUser {
  id: string;
  name: string;
  initials: string;
  email: string;
  phone: string;
  role: Role;
  department: string;
  status: UserStatus;
  cpdHours: number;
  cpdTarget: number;
  cpdStatus: CPDStatus;
  lastActive: string; // ISO date string
  joinedDate: string;
  avatarColor: string;
}

// ─── Mock user data ───────────────────────────────────────────────────────────
const allUsers: PortalUser[] = [
  {
    id: "u1",
    name: "Sarah Johnson",
    initials: "SJ",
    email: "sarah.johnson@hospital.nhs.uk",
    phone: "+44 7700 900123",
    role: "Staff Nurse",
    department: "Cardiology",
    status: "Active",
    cpdHours: 42,
    cpdTarget: 50,
    cpdStatus: "Near Deadline",
    lastActive: "2026-06-15",
    joinedDate: "2022-03-14",
    avatarColor: "#0077B6",
  },
  {
    id: "u2",
    name: "James Okafor",
    initials: "JO",
    email: "james.okafor@hospital.nhs.uk",
    phone: "+44 7700 900456",
    role: "Nurse Educator",
    department: "Training & Development",
    status: "Active",
    cpdHours: 55,
    cpdTarget: 50,
    cpdStatus: "Compliant",
    lastActive: "2026-06-16",
    joinedDate: "2019-07-01",
    avatarColor: "#00B4D8",
  },
  {
    id: "u3",
    name: "Linda Chen",
    initials: "LC",
    email: "linda.chen@hospital.nhs.uk",
    phone: "+44 7700 900789",
    role: "Department Head",
    department: "Oncology",
    status: "Active",
    cpdHours: 48,
    cpdTarget: 50,
    cpdStatus: "Near Deadline",
    lastActive: "2026-06-14",
    joinedDate: "2017-11-20",
    avatarColor: "#2E8B57",
  },
  {
    id: "u4",
    name: "Marcus Williams",
    initials: "MW",
    email: "marcus.williams@hospital.nhs.uk",
    phone: "+44 7700 900321",
    role: "Staff Nurse",
    department: "Emergency",
    status: "Active",
    cpdHours: 50,
    cpdTarget: 50,
    cpdStatus: "Compliant",
    lastActive: "2026-06-16",
    joinedDate: "2021-05-03",
    avatarColor: "#0077B6",
  },
  {
    id: "u5",
    name: "Priya Sharma",
    initials: "PS",
    email: "priya.sharma@hospital.nhs.uk",
    phone: "+44 7700 900654",
    role: "Staff Nurse",
    department: "Paediatrics",
    status: "Active",
    cpdHours: 20,
    cpdTarget: 50,
    cpdStatus: "Non-Compliant",
    lastActive: "2026-05-30",
    joinedDate: "2023-01-10",
    avatarColor: "#0077B6",
  },
  {
    id: "u6",
    name: "Robert Nkemdirim",
    initials: "RN",
    email: "robert.n@hospital.nhs.uk",
    phone: "+44 7700 900987",
    role: "CPD Administrator",
    department: "HR & Development",
    status: "Active",
    cpdHours: 60,
    cpdTarget: 50,
    cpdStatus: "Compliant",
    lastActive: "2026-06-16",
    joinedDate: "2018-09-15",
    avatarColor: "#F4A261",
  },
  {
    id: "u7",
    name: "Fatima Al-Rashid",
    initials: "FA",
    email: "fatima.ar@hospital.nhs.uk",
    phone: "+44 7700 901110",
    role: "Staff Nurse",
    department: "ICU",
    status: "Inactive",
    cpdHours: 10,
    cpdTarget: 50,
    cpdStatus: "Non-Compliant",
    lastActive: "2026-03-01",
    joinedDate: "2020-06-22",
    avatarColor: "#0077B6",
  },
  {
    id: "u8",
    name: "David Thompson",
    initials: "DT",
    email: "david.thompson@hospital.nhs.uk",
    phone: "+44 7700 901221",
    role: "Nursing Director",
    department: "Executive",
    status: "Active",
    cpdHours: 58,
    cpdTarget: 50,
    cpdStatus: "Compliant",
    lastActive: "2026-06-15",
    joinedDate: "2015-02-18",
    avatarColor: "#7C3AED",
  },
  {
    id: "u9",
    name: "Aisha Patel",
    initials: "AP",
    email: "aisha.patel@hospital.nhs.uk",
    phone: "+44 7700 901332",
    role: "HR / Staff Dev",
    department: "HR & Development",
    status: "Active",
    cpdHours: 45,
    cpdTarget: 50,
    cpdStatus: "Near Deadline",
    lastActive: "2026-06-13",
    joinedDate: "2021-08-09",
    avatarColor: "#E63946",
  },
  {
    id: "u10",
    name: "Connor MacLeod",
    initials: "CM",
    email: "connor.mac@hospital.nhs.uk",
    phone: "+44 7700 901443",
    role: "Staff Nurse",
    department: "Orthopaedics",
    status: "Pending",
    cpdHours: 0,
    cpdTarget: 50,
    cpdStatus: "Non-Compliant",
    lastActive: "2026-06-16",
    joinedDate: "2026-06-10",
    avatarColor: "#0077B6",
  },
  {
    id: "u11",
    name: "Ngozi Eze",
    initials: "NE",
    email: "ngozi.eze@hospital.nhs.uk",
    phone: "+44 7700 901554",
    role: "Nurse Educator",
    department: "Training & Development",
    status: "Active",
    cpdHours: 52,
    cpdTarget: 50,
    cpdStatus: "Compliant",
    lastActive: "2026-06-16",
    joinedDate: "2020-11-30",
    avatarColor: "#00B4D8",
  },
  {
    id: "u12",
    name: "Yusuf Al-Farsi",
    initials: "YF",
    email: "yusuf.af@hospital.nhs.uk",
    phone: "+44 7700 901665",
    role: "Staff Nurse",
    department: "Neurology",
    status: "Active",
    cpdHours: 38,
    cpdTarget: 50,
    cpdStatus: "Near Deadline",
    lastActive: "2026-06-11",
    joinedDate: "2022-07-04",
    avatarColor: "#0077B6",
  },
];

// ─── Config helpers ───────────────────────────────────────────────────────────
const roleColors: Record<Role, { bg: string; text: string }> = {
  "Staff Nurse":      { bg: "bg-blue-50",   text: "text-[#0077B6]" },
  "Nurse Educator":   { bg: "bg-cyan-50",   text: "text-[#00B4D8]" },
  "Department Head":  { bg: "bg-green-50",  text: "text-[#2E8B57]" },
  "CPD Administrator":{ bg: "bg-amber-50",  text: "text-[#d97706]" },
  "Nursing Director": { bg: "bg-purple-50", text: "text-purple-700" },
  "HR / Staff Dev":   { bg: "bg-red-50",    text: "text-[#E63946]" },
};

const statusConfig: Record<UserStatus, { icon: typeof CheckCircle2; color: string; bg: string; label: string }> = {
  Active:   { icon: CheckCircle2,  color: "text-[#2E8B57]", bg: "bg-green-50",  label: "Active"  },
  Inactive: { icon: XCircle,       color: "text-slate-500",  bg: "bg-slate-100", label: "Inactive"},
  Pending:  { icon: Clock,         color: "text-[#F4A261]",  bg: "bg-amber-50",  label: "Pending" },
};

const cpdStatusConfig: Record<CPDStatus, { color: string; bg: string; dot: string }> = {
  "Compliant":     { color: "text-[#2E8B57]", bg: "bg-green-50",  dot: "bg-[#2E8B57]" },
  "Near Deadline": { color: "text-[#d97706]", bg: "bg-amber-50",  dot: "bg-[#F4A261]" },
  "Non-Compliant": { color: "text-[#E63946]", bg: "bg-red-50",    dot: "bg-[#E63946]" },
};

const departments = ["All Departments", ...Array.from(new Set(allUsers.map((u) => u.department))).sort()];
const roleOptions: (Role | "All Roles")[] = ["All Roles", "Staff Nurse", "Nurse Educator", "Department Head", "CPD Administrator", "Nursing Director", "HR / Staff Dev"];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

// ─── Add-User Modal ───────────────────────────────────────────────────────────
function AddUserModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name: "", email: "", role: "Staff Nurse" as Role, department: "", phone: "" });
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(onClose, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
        >
          <X className="h-4 w-4" />
        </button>
        <h2 className="text-lg font-bold text-slate-800">Add New User</h2>
        <p className="mt-1 text-sm text-slate-500">Create a portal account for a staff member.</p>

        {saved ? (
          <div className="mt-6 flex flex-col items-center gap-3 py-6">
            <CheckCircle2 className="h-12 w-12 text-[#2E8B57]" />
            <p className="font-semibold text-slate-700">User created successfully!</p>
          </div>
        ) : (
          <form onSubmit={handleSave} className="mt-6 space-y-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">Full Name *</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-[#0077B6] focus:outline-none focus:ring-2 focus:ring-[#0077B6]/20"
                placeholder="e.g. Jane Smith"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">Email Address *</label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-[#0077B6] focus:outline-none focus:ring-2 focus:ring-[#0077B6]/20"
                placeholder="jane.smith@hospital.nhs.uk"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">Role *</label>
                <select
                  value={form.role}
                  onChange={(e) => setForm((f) => ({ ...f, role: e.target.value as Role }))}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-[#0077B6] focus:outline-none focus:ring-2 focus:ring-[#0077B6]/20"
                >
                  {roleOptions.filter((r) => r !== "All Roles").map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">Department *</label>
                <input
                  required
                  value={form.department}
                  onChange={(e) => setForm((f) => ({ ...f, department: e.target.value }))}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-[#0077B6] focus:outline-none focus:ring-2 focus:ring-[#0077B6]/20"
                  placeholder="e.g. Cardiology"
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">Phone (optional)</label>
              <input
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-[#0077B6] focus:outline-none focus:ring-2 focus:ring-[#0077B6]/20"
                placeholder="+44 7700 900000"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-lg border border-slate-200 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 rounded-lg bg-[#0077B6] py-2 text-sm font-semibold text-white hover:bg-[#005f92]"
              >
                Create User
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

// ─── Row action menu ──────────────────────────────────────────────────────────
function ActionMenu({
  user,
  onClose,
}: {
  user: PortalUser;
  onClose: () => void;
}) {
  const actions = [
    { icon: Eye,       label: "View Profile",   color: "text-slate-700" },
    { icon: Edit2,     label: "Edit Details",   color: "text-slate-700" },
    { icon: Mail,      label: "Send Email",      color: "text-slate-700" },
    user.status === "Active"
      ? { icon: Ban,       label: "Deactivate",    color: "text-[#E63946]" }
      : { icon: RotateCcw, label: "Reactivate",    color: "text-[#2E8B57]" },
  ];
  return (
    <div className="absolute right-0 top-8 z-30 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
      {actions.map((a) => {
        const Icon = a.icon;
        return (
          <button
            key={a.label}
            onClick={onClose}
            className={cn(
              "flex w-full items-center gap-2.5 px-4 py-2.5 text-sm transition-colors hover:bg-slate-50",
              a.color,
            )}
          >
            <Icon className="h-4 w-4" />
            {a.label}
          </button>
        );
      })}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("All Departments");
  const [roleFilter, setRoleFilter] = useState<Role | "All Roles">("All Roles");
  const [statusFilter, setStatusFilter] = useState<UserStatus | "All">("All");
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [showAddModal, setShowAddModal] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const PER_PAGE = 8;

  // ── derived stats
  const stats = useMemo(() => ({
    total:      allUsers.length,
    active:     allUsers.filter((u) => u.status === "Active").length,
    inactive:   allUsers.filter((u) => u.status === "Inactive").length,
    pending:    allUsers.filter((u) => u.status === "Pending").length,
    compliant:  allUsers.filter((u) => u.cpdStatus === "Compliant").length,
    nonCompliant: allUsers.filter((u) => u.cpdStatus === "Non-Compliant").length,
  }), []);

  // ── filter + sort
  const filtered = useMemo(() => {
    let list = [...allUsers];
    const q = search.toLowerCase();
    if (q) list = list.filter((u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.department.toLowerCase().includes(q));
    if (deptFilter !== "All Departments") list = list.filter((u) => u.department === deptFilter);
    if (roleFilter !== "All Roles") list = list.filter((u) => u.role === roleFilter);
    if (statusFilter !== "All") list = list.filter((u) => u.status === statusFilter);

    list.sort((a, b) => {
      let av: string | number = "", bv: string | number = "";
      if (sortField === "name")       { av = a.name;       bv = b.name; }
      if (sortField === "role")       { av = a.role;       bv = b.role; }
      if (sortField === "department") { av = a.department; bv = b.department; }
      if (sortField === "cpdHours")   { av = a.cpdHours;   bv = b.cpdHours; }
      if (sortField === "lastActive") { av = a.lastActive; bv = b.lastActive; }
      if (sortField === "status")     { av = a.status;     bv = b.status; }
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return list;
  }, [search, deptFilter, roleFilter, statusFilter, sortField, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const toggleSort = (field: SortField) => {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortField(field); setSortDir("asc"); }
    setPage(1);
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ChevronsUpDown className="ml-1 inline h-3 w-3 text-slate-300" />;
    return sortDir === "asc"
      ? <ChevronUp className="ml-1 inline h-3 w-3 text-[#0077B6]" />
      : <ChevronDown className="ml-1 inline h-3 w-3 text-[#0077B6]" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">User Management</h1>
          <p className="mt-0.5 text-sm text-slate-500">
            Manage all portal users, roles, and CPD compliance status.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 rounded-xl bg-[#0077B6] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#005f92]"
        >
          <UserPlus className="h-4 w-4" />
          Add New User
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {[
          { label: "Total Users",    value: stats.total,       icon: Users,      color: "#0077B6", bg: "bg-blue-50"   },
          { label: "Active",         value: stats.active,      icon: UserCheck,  color: "#2E8B57", bg: "bg-green-50"  },
          { label: "Inactive",       value: stats.inactive,    icon: UserX,      color: "#94A3B8", bg: "bg-slate-100" },
          { label: "Pending",        value: stats.pending,     icon: Clock,      color: "#F4A261", bg: "bg-amber-50"  },
          { label: "CPD Compliant",  value: stats.compliant,   icon: Shield,     color: "#2E8B57", bg: "bg-green-50"  },
          { label: "Non-Compliant",  value: stats.nonCompliant,icon: AlertTriangle,color:"#E63946",bg: "bg-red-50"   },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className={cn("flex items-center gap-3 rounded-xl p-4", s.bg)}>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm">
                <Icon className="h-4 w-4" style={{ color: s.color }} />
              </span>
              <div className="min-w-0">
                <p className="text-lg font-bold leading-tight text-slate-800">{s.value}</p>
                <p className="truncate text-xs text-slate-500">{s.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        {/* Search */}
        <div className="relative min-w-[220px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm placeholder:text-slate-400 focus:border-[#0077B6] focus:outline-none focus:ring-2 focus:ring-[#0077B6]/20"
            placeholder="Search name, email, department…"
          />
        </div>

        {/* Dept */}
        <div className="relative">
          <Building2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <select
            value={deptFilter}
            onChange={(e) => { setDeptFilter(e.target.value); setPage(1); }}
            className="appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-8 text-sm text-slate-700 focus:border-[#0077B6] focus:outline-none focus:ring-2 focus:ring-[#0077B6]/20"
          >
            {departments.map((d) => <option key={d}>{d}</option>)}
          </select>
        </div>

        {/* Role */}
        <div className="relative">
          <Shield className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <select
            value={roleFilter}
            onChange={(e) => { setRoleFilter(e.target.value as Role | "All Roles"); setPage(1); }}
            className="appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-8 text-sm text-slate-700 focus:border-[#0077B6] focus:outline-none focus:ring-2 focus:ring-[#0077B6]/20"
          >
            {roleOptions.map((r) => <option key={r}>{r}</option>)}
          </select>
        </div>

        {/* Status */}
        <div className="relative">
          <Filter className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value as UserStatus | "All"); setPage(1); }}
            className="appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-8 text-sm text-slate-700 focus:border-[#0077B6] focus:outline-none focus:ring-2 focus:ring-[#0077B6]/20"
          >
            {(["All", "Active", "Inactive", "Pending"] as const).map((s) => (
              <option key={s}>{s === "All" ? "All Statuses" : s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Result count */}
      <p className="text-sm text-slate-500">
        Showing <strong className="text-slate-700">{filtered.length}</strong> user{filtered.length !== 1 ? "s" : ""}
        {search || deptFilter !== "All Departments" || roleFilter !== "All Roles" || statusFilter !== "All"
          ? " matching filters"
          : ""}
      </p>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <th className="px-5 py-3.5 text-left">
                  <button onClick={() => toggleSort("name")} className="flex items-center hover:text-slate-700">
                    User <SortIcon field="name" />
                  </button>
                </th>
                <th className="px-5 py-3.5 text-left">
                  <button onClick={() => toggleSort("role")} className="flex items-center hover:text-slate-700">
                    Role <SortIcon field="role" />
                  </button>
                </th>
                <th className="px-5 py-3.5 text-left">
                  <button onClick={() => toggleSort("department")} className="flex items-center hover:text-slate-700">
                    Department <SortIcon field="department" />
                  </button>
                </th>
                <th className="px-5 py-3.5 text-left">
                  <button onClick={() => toggleSort("cpdHours")} className="flex items-center hover:text-slate-700">
                    CPD Progress <SortIcon field="cpdHours" />
                  </button>
                </th>
                <th className="px-5 py-3.5 text-left">
                  <button onClick={() => toggleSort("status")} className="flex items-center hover:text-slate-700">
                    Status <SortIcon field="status" />
                  </button>
                </th>
                <th className="px-5 py-3.5 text-left">
                  <button onClick={() => toggleSort("lastActive")} className="flex items-center hover:text-slate-700">
                    Last Active <SortIcon field="lastActive" />
                  </button>
                </th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paged.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center text-slate-400">
                    No users found matching your filters.
                  </td>
                </tr>
              ) : (
                paged.map((user) => {
                  const sc = statusConfig[user.status];
                  const StatusIcon = sc.icon;
                  const rc = roleColors[user.role];
                  const cc = cpdStatusConfig[user.cpdStatus];
                  const pct = Math.min(100, Math.round((user.cpdHours / user.cpdTarget) * 100));
                  return (
                    <tr
                      key={user.id}
                      className="border-b border-slate-100 transition-colors last:border-0 hover:bg-slate-50/60"
                    >
                      {/* User */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <span
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                            style={{ backgroundColor: user.avatarColor }}
                          >
                            {user.initials}
                          </span>
                          <div className="min-w-0">
                            <p className="truncate font-semibold text-slate-800">{user.name}</p>
                            <p className="truncate text-xs text-slate-500">{user.email}</p>
                          </div>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="px-5 py-4">
                        <span className={cn("inline-block rounded-full px-2.5 py-1 text-xs font-semibold", rc.bg, rc.text)}>
                          {user.role}
                        </span>
                      </td>

                      {/* Dept */}
                      <td className="px-5 py-4 text-slate-600">{user.department}</td>

                      {/* CPD progress */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex-1">
                            <div className="mb-1 flex items-center justify-between">
                              <span className="text-xs font-medium text-slate-600">
                                {user.cpdHours}/{user.cpdTarget} hrs
                              </span>
                              <span className={cn("text-[10px] font-semibold", cc.color)}>{pct}%</span>
                            </div>
                            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                              <div
                                className="h-full rounded-full transition-all"
                                style={{
                                  width: `${pct}%`,
                                  backgroundColor: user.cpdStatus === "Compliant" ? "#2E8B57" : user.cpdStatus === "Near Deadline" ? "#F4A261" : "#E63946",
                                }}
                              />
                            </div>
                          </div>
                          <span className={cn("inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-semibold", cc.bg, cc.color)}>
                            <span className={cn("h-1.5 w-1.5 rounded-full", cc.dot)} />
                            {user.cpdStatus}
                          </span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold", sc.bg, sc.color)}>
                          <StatusIcon className="h-3 w-3" />
                          {sc.label}
                        </span>
                      </td>

                      {/* Last active */}
                      <td className="px-5 py-4 text-slate-500">{formatDate(user.lastActive)}</td>

                      {/* Actions */}
                      <td className="px-5 py-4 text-right">
                        <div className="relative inline-block">
                          <button
                            onClick={() => setOpenMenuId(openMenuId === user.id ? null : user.id)}
                            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                            aria-label="Open actions"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </button>
                          {openMenuId === user.id && (
                            <ActionMenu user={user} onClose={() => setOpenMenuId(null)} />
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3">
            <p className="text-xs text-slate-500">
              Page {page} of {totalPages}
            </p>
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={cn(
                    "h-7 w-7 rounded-lg text-xs font-medium transition-colors",
                    p === page
                      ? "bg-[#0077B6] text-white"
                      : "text-slate-500 hover:bg-slate-100",
                  )}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Add user modal */}
      {showAddModal && <AddUserModal onClose={() => setShowAddModal(false)} />}
    </div>
  );
}
