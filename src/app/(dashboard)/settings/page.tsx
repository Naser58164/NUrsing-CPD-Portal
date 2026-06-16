"use client";

import { useState } from "react";
import {
  User,
  Bell,
  ShieldCheck,
  SlidersHorizontal,
  Monitor,
  Smartphone,
  Laptop,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { currentUser } from "@/lib/mockData";

type TabId = "profile" | "notifications" | "privacy" | "preferences";

const tabs: { id: TabId; label: string; icon: typeof User }[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "privacy", label: "Privacy & Security", icon: ShieldCheck },
  { id: "preferences", label: "Preferences", icon: SlidersHorizontal },
];

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:ring-offset-1",
        checked ? "bg-[#0077B6]" : "bg-slate-300",
      )}
    >
      <span
        className={cn(
          "inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform",
          checked ? "translate-x-5" : "translate-x-0.5",
        )}
      />
    </button>
  );
}

const notificationEvents = [
  "Deadlines",
  "Approvals",
  "New Courses",
  "Achievements",
  "Assessment Results",
] as const;
const channels = ["Email", "SMS", "Push"] as const;

type NotificationState = Record<string, boolean>;

function buildDefaultNotificationState(): NotificationState {
  const state: NotificationState = {};
  notificationEvents.forEach((event, i) => {
    channels.forEach((channel) => {
      // Email on by default, SMS/Push vary for realistic defaults.
      state[`${event}::${channel}`] =
        channel === "Email" ? true : channel === "Push" ? i % 2 === 0 : false;
    });
  });
  return state;
}

interface Session {
  id: string;
  device: string;
  location: string;
  lastActive: string;
  icon: typeof Monitor;
  current: boolean;
}

const mockSessions: Session[] = [
  {
    id: "s-1",
    device: "Chrome on Windows",
    location: "Leeds, UK",
    lastActive: "Active now",
    icon: Monitor,
    current: true,
  },
  {
    id: "s-2",
    device: "Safari on iPhone",
    location: "Manchester, UK",
    lastActive: "2 hours ago",
    icon: Smartphone,
    current: false,
  },
  {
    id: "s-3",
    device: "Firefox on MacBook",
    location: "Birmingham, UK",
    lastActive: "Yesterday",
    icon: Laptop,
    current: false,
  },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabId>("profile");
  const [notificationState, setNotificationState] = useState<NotificationState>(
    buildDefaultNotificationState,
  );
  const [mfaEnabled, setMfaEnabled] = useState(true);
  const [sessions, setSessions] = useState<Session[]>(mockSessions);

  const toggleNotification = (key: string, next: boolean) => {
    setNotificationState((prev) => ({ ...prev, [key]: next }));
  };

  const revokeSession = (id: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-slate-900">Settings</h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage your profile, notifications, security, and app preferences.
        </p>
      </header>

      <div className="flex flex-wrap gap-1 border-b border-slate-200">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "-mb-px inline-flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "border-[#0077B6] bg-[#0077B6]/5 text-[#0077B6]"
                  : "border-transparent text-slate-500 hover:text-slate-800",
              )}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {activeTab === "profile" && (
        <div className="card p-6">
          <form
            className="grid grid-cols-1 gap-5 md:grid-cols-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <Field label="Full Name" defaultValue={currentUser.name} />
            <Field label="Role" defaultValue={currentUser.role} />
            <Field label="Department" defaultValue={currentUser.department} />
            <Field
              label="Email"
              type="email"
              defaultValue={currentUser.email}
            />
            <Field
              label="Phone"
              type="tel"
              defaultValue={currentUser.phone}
            />
            <div className="md:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Bio
              </label>
              <textarea
                rows={4}
                defaultValue={`${currentUser.role} in ${currentUser.department} with ${currentUser.yearsExp} years of experience.`}
                className="w-full rounded-lg border border-slate-200 bg-[#F8FAFC] px-3 py-2 text-sm text-slate-700 outline-none focus:border-[#0077B6] focus:ring-1 focus:ring-[#0077B6]"
              />
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="rounded-lg bg-[#0077B6] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#005f93]"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}

      {activeTab === "notifications" && (
        <div className="card overflow-x-auto p-2 sm:p-4">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                <th className="px-4 py-3 font-medium">Event Type</th>
                {channels.map((c) => (
                  <th key={c} className="px-4 py-3 text-center font-medium">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {notificationEvents.map((event) => (
                <tr
                  key={event}
                  className="border-b border-slate-100 last:border-0"
                >
                  <td className="px-4 py-3 font-medium text-slate-800">
                    {event}
                  </td>
                  {channels.map((channel) => {
                    const key = `${event}::${channel}`;
                    return (
                      <td key={channel} className="px-4 py-3">
                        <div className="flex justify-center">
                          <Toggle
                            label={`${event} ${channel}`}
                            checked={!!notificationState[key]}
                            onChange={(next) => toggleNotification(key, next)}
                          />
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "privacy" && (
        <div className="space-y-6">
          <div className="card flex items-center justify-between gap-4 p-6">
            <div>
              <h2 className="font-semibold text-slate-900">
                Multi-Factor Authentication
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Add an extra layer of security when signing in.
              </p>
            </div>
            <Toggle
              label="Multi-Factor Authentication"
              checked={mfaEnabled}
              onChange={setMfaEnabled}
            />
          </div>

          <div className="card p-6">
            <h2 className="mb-4 font-semibold text-slate-900">
              Active Sessions
            </h2>
            <ul className="space-y-3">
              {sessions.length === 0 ? (
                <li className="text-sm text-slate-400">No active sessions.</li>
              ) : (
                sessions.map((s) => {
                  const Icon = s.icon;
                  return (
                    <li
                      key={s.id}
                      className="flex flex-col gap-3 rounded-lg border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0077B6]/10 text-[#0077B6]">
                          <Icon className="h-5 w-5" />
                        </span>
                        <div>
                          <p className="text-sm font-medium text-slate-800">
                            {s.device}
                            {s.current && (
                              <span className="ml-2 rounded-full bg-[#2E8B57]/10 px-2 py-0.5 text-xs font-medium text-[#2E8B57]">
                                This device
                              </span>
                            )}
                          </p>
                          <p className="text-xs text-slate-500">
                            {s.location} &middot; {s.lastActive}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        disabled={s.current}
                        onClick={() => revokeSession(s.id)}
                        className={cn(
                          "rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors",
                          s.current
                            ? "cursor-not-allowed border-slate-200 text-slate-300"
                            : "border-[#E63946]/30 text-[#E63946] hover:bg-[#E63946]/5",
                        )}
                      >
                        Revoke
                      </button>
                    </li>
                  );
                })
              )}
            </ul>
          </div>

          <div className="card flex items-center justify-between gap-4 p-6">
            <div>
              <h2 className="font-semibold text-slate-900">Password</h2>
              <p className="mt-1 text-sm text-slate-500">
                Update your account password regularly.
              </p>
            </div>
            <button
              type="button"
              className="rounded-lg bg-[#0077B6] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#005f93]"
            >
              Change Password
            </button>
          </div>
        </div>
      )}

      {activeTab === "preferences" && (
        <div className="card p-6">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <SelectField label="Language" options={["English", "French", "Spanish", "German"]} />
            <SelectField label="Theme" options={["Light", "Dark", "System"]} />
            <SelectField
              label="Default Calendar View"
              options={["Month", "Week", "Day"]}
            />
          </div>
          <div className="mt-6">
            <button
              type="button"
              className="rounded-lg bg-[#0077B6] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#005f93]"
            >
              Save Preferences
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  defaultValue,
  type = "text",
}: {
  label: string;
  defaultValue: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <input
        type={type}
        defaultValue={defaultValue}
        className="w-full rounded-lg border border-slate-200 bg-[#F8FAFC] px-3 py-2 text-sm text-slate-700 outline-none focus:border-[#0077B6] focus:ring-1 focus:ring-[#0077B6]"
      />
    </div>
  );
}

function SelectField({
  label,
  options,
}: {
  label: string;
  options: string[];
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <select
        defaultValue={options[0]}
        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-[#0077B6] focus:ring-1 focus:ring-[#0077B6]"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
