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
} from "lucide-react";

const features = [
  { icon: Activity, text: "Track CPD hours and stay compliant effortlessly" },
  { icon: ShieldCheck, text: "Manage certifications and never miss a renewal" },
  { icon: GraduationCap, text: "Access a rich catalogue of accredited training" },
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("sarah.johnson@hospital.nhs.uk");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <div
        className="relative flex flex-col justify-between overflow-hidden p-10 text-white lg:w-1/2"
        style={{ background: "linear-gradient(135deg, #0077B6 0%, #00B4D8 100%)" }}
      >
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
            <HeartPulse className="h-6 w-6" />
          </span>
          <span className="text-xl font-bold">CPD Nursing Portal</span>
        </div>

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

        <p className="relative z-10 text-xs text-white/70">
          © {new Date().getFullYear()} CPD Nursing Portal. All rights reserved.
        </p>

        <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -top-16 -left-16 h-56 w-56 rounded-full bg-white/10" />
      </div>

      <div className="flex flex-1 items-center justify-center bg-white p-6 lg:w-1/2">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-bold text-slate-800">Welcome Back</h1>
          <p className="mt-1 text-sm text-slate-500">
            Sign in to access your CPD dashboard.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">
                Email address
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-3 text-sm text-slate-700 focus:border-[#0077B6] focus:outline-none focus:ring-2 focus:ring-[#0077B6]/20"
                  placeholder="you@hospital.nhs.uk"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-10 text-sm text-slate-700 focus:border-[#0077B6] focus:outline-none focus:ring-2 focus:ring-[#0077B6]/20"
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
            </div>

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

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#0077B6] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#005f92]"
            >
              <CheckCircle2 className="h-4 w-4" />
              Login
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-slate-400">
            Need an account? Contact your department administrator.
          </p>
        </div>
      </div>
    </div>
  );
}
