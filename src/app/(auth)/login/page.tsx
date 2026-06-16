"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  HeartPulse,
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  Activity,
  ShieldCheck,
  GraduationCap,
  ChevronDown,
  User,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Demo credentials per role ───────────────────────────────────────────────
const demoAccounts = [
  {
    role: "Staff Nurse",
    email: "sarah.johnson@hospital.nhs.uk",
    password: "Nurse@2026",
    color: "#0077B6",
    bg: "bg-blue-50",
    badge: "bg-[#0077B6] text-white",
  },
  {
    role: "Nurse Educator",
    email: "james.okafor@hospital.nhs.uk",
    password: "Educator@2026",
    color: "#00B4D8",
    bg: "bg-cyan-50",
    badge: "bg-[#00B4D8] text-white",
  },
  {
    role: "Department Head",
    email: "linda.chen@hospital.nhs.uk",
    password: "DeptHead@2026",
    color: "#2E8B57",
    bg: "bg-green-50",
    badge: "bg-[#2E8B57] text-white",
  },
  {
    role: "CPD Administrator",
    email: "admin.cpd@hospital.nhs.uk",
    password: "CPDAdmin@2026",
    color: "#F4A261",
    bg: "bg-amber-50",
    badge: "bg-[#F4A261] text-slate-900",
  },
  {
    role: "Nursing Director",
    email: "director.nursing@hospital.nhs.uk",
    password: "Director@2026",
    color: "#7C3AED",
    bg: "bg-purple-50",
    badge: "bg-purple-600 text-white",
  },
  {
    role: "HR / Staff Dev",
    email: "hr.staffdev@hospital.nhs.uk",
    password: "HRDev@2026",
    color: "#E63946",
    bg: "bg-red-50",
    badge: "bg-[#E63946] text-white",
  },
] as const;

const roles = demoAccounts.map((d) => d.role);

const features = [
  { icon: Activity, text: "Track CPD hours and stay compliant effortlessly" },
  { icon: ShieldCheck, text: "Manage certifications and never miss a renewal" },
  { icon: GraduationCap, text: "Access a rich catalogue of accredited training" },
];

// ─── Validation helpers ───────────────────────────────────────────────────────
function validateEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}
function validatePassword(v: string) {
  return v.length >= 6;
}

export default function LoginPage() {
  const router = useRouter();

  const [selectedRole, setSelectedRole] = useState<string>(roles[0]);
  const [roleOpen, setRoleOpen] = useState(false);
  const [email, setEmail] = useState(demoAccounts[0].email);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [touched, setTouched] = useState<{ email?: boolean; password?: boolean }>({});

  // Auto-fill when demo card is clicked
  const fillDemo = (account: (typeof demoAccounts)[number]) => {
    setSelectedRole(account.role);
    setEmail(account.email);
    setPassword(account.password);
    setErrors({});
    setTouched({});
  };

  // Select role from dropdown
  const selectRole = (role: string) => {
    setSelectedRole(role);
    setRoleOpen(false);
    const account = demoAccounts.find((d) => d.role === role);
    if (account) {
      setEmail(account.email);
      setPassword(account.password);
      setErrors({});
    }
  };

  // Field-level validation
  const validate = () => {
    const errs: typeof errors = {};
    if (!email.trim()) errs.email = "Email address is required.";
    else if (!validateEmail(email)) errs.email = "Enter a valid email address.";
    if (!password) errs.password = "Password is required.";
    else if (!validatePassword(password)) errs.password = "Password must be at least 6 characters.";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    setErrors({});

    // Simulate network delay then redirect
    await new Promise((r) => setTimeout(r, 900));
    router.push("/dashboard");
  };

  const activeDemo = demoAccounts.find((d) => d.role === selectedRole);

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* ── Left panel ──────────────────────────────────────────────────── */}
      <div
        className="relative flex flex-col justify-between overflow-hidden p-10 text-white lg:w-1/2"
        style={{ background: "linear-gradient(135deg, #0077B6 0%, #00B4D8 100%)" }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
            <HeartPulse className="h-6 w-6" />
          </span>
          <span className="text-xl font-bold">CPD Nursing Portal</span>
        </div>

        {/* Tagline */}
        <div className="relative z-10 my-12 max-w-md">
          <h2 className="text-3xl font-bold leading-tight lg:text-4xl">
            Empowering Nurses Through Continuous Learning
          </h2>
          <p className="mt-4 text-white/80">
            Your single platform for professional development, compliance and growth.
          </p>
          <ul className="mt-8 space-y-4">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <li key={f.text} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/15">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="text-sm text-white/90">{f.text}</span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Demo credentials panel */}
        <div className="relative z-10 rounded-2xl bg-white/10 p-5 backdrop-blur-sm">
          <div className="mb-3 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-yellow-300" />
            <span className="text-sm font-semibold text-white">Demo Accounts — click to auto-fill</span>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {demoAccounts.map((a) => (
              <button
                key={a.role}
                type="button"
                onClick={() => fillDemo(a)}
                className={cn(
                  "rounded-lg px-2.5 py-2 text-left transition-all hover:scale-105 active:scale-95",
                  selectedRole === a.role
                    ? "ring-2 ring-white ring-offset-2 ring-offset-transparent"
                    : "opacity-80 hover:opacity-100",
                  a.bg,
                )}
              >
                <span
                  className={cn("inline-block rounded-full px-2 py-0.5 text-[10px] font-bold leading-tight", a.badge)}
                >
                  {a.role}
                </span>
                <p className="mt-1 truncate text-[10px] text-slate-600">{a.email}</p>
              </button>
            ))}
          </div>
        </div>

        <p className="relative z-10 mt-4 text-xs text-white/70">
          © {new Date().getFullYear()} CPD Nursing Portal. All rights reserved.
        </p>

        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -top-16 -left-16 h-56 w-56 rounded-full bg-white/10" />
      </div>

      {/* ── Right panel ─────────────────────────────────────────────────── */}
      <div className="flex flex-1 items-center justify-center bg-white p-6 lg:w-1/2">
        <div className="w-full max-w-sm">
          {/* Role indicator */}
          {activeDemo && (
            <div
              className="mb-6 flex items-center gap-2 rounded-xl px-4 py-2.5"
              style={{ backgroundColor: activeDemo.color + "15" }}
            >
              <User className="h-4 w-4" style={{ color: activeDemo.color }} />
              <span className="text-sm font-medium" style={{ color: activeDemo.color }}>
                Signing in as <strong>{activeDemo.role}</strong>
              </span>
            </div>
          )}

          <h1 className="text-2xl font-bold text-slate-800">Welcome Back</h1>
          <p className="mt-1 text-sm text-slate-500">Sign in to access your CPD dashboard.</p>

          <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
            {/* Role selector */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Select Your Role
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setRoleOpen((v) => !v)}
                  className="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 hover:border-[#0077B6] focus:border-[#0077B6] focus:outline-none focus:ring-2 focus:ring-[#0077B6]/20"
                >
                  <span className="flex items-center gap-2">
                    <User className="h-4 w-4 text-slate-400" />
                    {selectedRole}
                  </span>
                  <ChevronDown
                    className={cn("h-4 w-4 text-slate-400 transition-transform", roleOpen && "rotate-180")}
                  />
                </button>
                {roleOpen && (
                  <ul className="absolute z-20 mt-1 w-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg">
                    {roles.map((r) => (
                      <li key={r}>
                        <button
                          type="button"
                          onClick={() => selectRole(r)}
                          className={cn(
                            "flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors hover:bg-slate-50",
                            r === selectedRole && "bg-[#0077B6]/5 font-semibold text-[#0077B6]",
                          )}
                        >
                          {r === selectedRole && <CheckCircle2 className="h-3.5 w-3.5 text-[#0077B6]" />}
                          {r !== selectedRole && <span className="h-3.5 w-3.5" />}
                          {r}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">
                Email Address
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (touched.email) setErrors((err) => ({ ...err, email: undefined }));
                  }}
                  onBlur={() => {
                    setTouched((t) => ({ ...t, email: true }));
                    if (!validateEmail(email))
                      setErrors((err) => ({
                        ...err,
                        email: email.trim() ? "Enter a valid email address." : "Email address is required.",
                      }));
                  }}
                  className={cn(
                    "w-full rounded-lg border py-2.5 pl-10 pr-3 text-sm text-slate-700 focus:outline-none focus:ring-2",
                    errors.email
                      ? "border-[#E63946] focus:border-[#E63946] focus:ring-[#E63946]/20"
                      : "border-slate-200 focus:border-[#0077B6] focus:ring-[#0077B6]/20",
                  )}
                  placeholder="you@hospital.nhs.uk"
                />
              </div>
              {errors.email && (
                <p className="mt-1 flex items-center gap-1 text-xs text-[#E63946]">
                  <AlertCircle className="h-3 w-3" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-slate-700">
                Password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (touched.password) setErrors((err) => ({ ...err, password: undefined }));
                  }}
                  onBlur={() => {
                    setTouched((t) => ({ ...t, password: true }));
                    if (!validatePassword(password))
                      setErrors((err) => ({
                        ...err,
                        password: password ? "Password must be at least 6 characters." : "Password is required.",
                      }));
                  }}
                  className={cn(
                    "w-full rounded-lg border py-2.5 pl-10 pr-10 text-sm text-slate-700 focus:outline-none focus:ring-2",
                    errors.password
                      ? "border-[#E63946] focus:border-[#E63946] focus:ring-[#E63946]/20"
                      : "border-slate-200 focus:border-[#0077B6] focus:ring-[#0077B6]/20",
                  )}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 flex items-center gap-1 text-xs text-[#E63946]">
                  <AlertCircle className="h-3 w-3" />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-[#0077B6] focus:ring-[#0077B6]"
                />
                Remember me
              </label>
              <a href="#" className="text-sm font-semibold text-[#0077B6] hover:underline">
                Forgot Password?
              </a>
            </div>

            {/* General error */}
            {errors.general && (
              <div className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2.5 text-sm text-[#E63946]">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {errors.general}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#0077B6] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#005f92] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                  </svg>
                  Signing In…
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  Sign In
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-slate-400">
            Need an account?{" "}
            <span className="font-medium text-[#0077B6]">Contact your department administrator.</span>
          </p>
        </div>
      </div>
    </div>
  );
}
