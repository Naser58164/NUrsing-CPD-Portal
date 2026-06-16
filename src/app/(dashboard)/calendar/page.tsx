"use client";

import { useMemo, useState } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  format,
  parseISO,
} from "date-fns";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import { calendarEvents, type CalendarEvent } from "@/lib/mockData";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date(2026, 5, 1));
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(2026, 5, 1));
  const [activeTypes, setActiveTypes] = useState<Set<string>>(new Set());

  const eventTypes = useMemo(
    () => Array.from(new Set(calendarEvents.map((e) => e.type))),
    [],
  );

  const visibleEvents = useMemo(
    () =>
      activeTypes.size === 0
        ? calendarEvents
        : calendarEvents.filter((e) => activeTypes.has(e.type)),
    [activeTypes],
  );

  const days = useMemo(() => {
    const gridStart = startOfWeek(startOfMonth(currentMonth));
    const gridEnd = endOfWeek(endOfMonth(currentMonth));
    return eachDayOfInterval({ start: gridStart, end: gridEnd });
  }, [currentMonth]);

  const today = new Date();

  const eventsForDay = (day: Date): CalendarEvent[] =>
    visibleEvents.filter((e) => isSameDay(parseISO(e.date), day));

  const toggleType = (type: string) => {
    setActiveTypes((prev) => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });
  };

  const goToday = () => {
    setCurrentMonth(startOfMonth(today));
    setSelectedDate(today);
  };

  const selectedEvents = eventsForDay(selectedDate).sort((a, b) =>
    a.startTime.localeCompare(b.startTime),
  );

  const panelTitle =
    selectedEvents.length > 0
      ? format(selectedDate, "dd MMM yyyy")
      : "Upcoming Events";

  const panelEvents =
    selectedEvents.length > 0
      ? selectedEvents
      : [...visibleEvents]
          .sort((a, b) => a.date.localeCompare(b.date))
          .slice(0, 6);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Learning Calendar</h1>
        <p className="mt-1 text-sm text-slate-500">
          View your scheduled CPD activities, deadlines and assessments.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {eventTypes.map((type) => {
          const active = activeTypes.has(type);
          const color = calendarEvents.find((e) => e.type === type)?.color;
          return (
            <button
              key={type}
              type="button"
              onClick={() => toggleType(type)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition",
                active
                  ? "border-transparent text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50",
              )}
              style={active ? { backgroundColor: color } : undefined}
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: active ? "#fff" : color }}
              />
              {type}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="card p-4 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">
              {format(currentMonth, "MMMM yyyy")}
            </h2>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={goToday}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-[#0077B6] transition hover:bg-[#0077B6]/10"
              >
                Today
              </button>
              <button
                type="button"
                aria-label="Previous month"
                onClick={() => setCurrentMonth((m) => subMonths(m, 1))}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Next month"
                onClick={() => setCurrentMonth((m) => addMonths(m, 1))}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 border-b border-slate-200 pb-2">
            {WEEKDAYS.map((d) => (
              <div
                key={d}
                className="text-center text-xs font-semibold uppercase tracking-wide text-slate-400"
              >
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7">
            {days.map((day) => {
              const inMonth = isSameMonth(day, currentMonth);
              const isToday = isSameDay(day, today);
              const isSelected = isSameDay(day, selectedDate);
              const dayEvents = eventsForDay(day);
              return (
                <button
                  type="button"
                  key={day.toISOString()}
                  onClick={() => setSelectedDate(day)}
                  className={cn(
                    "flex min-h-[84px] flex-col gap-1 border-b border-r border-slate-100 p-1.5 text-left transition hover:bg-[#F8FAFC]",
                    !inMonth && "bg-slate-50/60 text-slate-300",
                    isSelected && "ring-2 ring-inset ring-[#0077B6]",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium",
                      isToday && "bg-[#0077B6] text-white",
                      !isToday && inMonth && "text-slate-700",
                    )}
                  >
                    {format(day, "d")}
                  </span>
                  <div className="flex flex-col gap-0.5">
                    {dayEvents.slice(0, 3).map((e) => (
                      <span
                        key={e.id}
                        title={e.title}
                        className="truncate rounded px-1 py-0.5 text-[10px] font-medium text-white"
                        style={{ backgroundColor: e.color }}
                      >
                        {e.title}
                      </span>
                    ))}
                    {dayEvents.length > 3 && (
                      <span className="px-1 text-[10px] text-slate-400">
                        +{dayEvents.length - 3} more
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="card p-4 lg:col-span-1">
          <div className="mb-4 flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-[#0077B6]" />
            <h2 className="text-base font-semibold text-slate-900">
              {panelTitle}
            </h2>
          </div>
          {panelEvents.length === 0 ? (
            <p className="text-sm text-slate-400">No events to display.</p>
          ) : (
            <ul className="space-y-3">
              {panelEvents.map((e) => (
                <li
                  key={e.id}
                  className="flex gap-3 rounded-lg border border-slate-100 bg-[#F8FAFC] p-3"
                >
                  <span
                    className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: e.color }}
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-900">
                      {e.title}
                    </p>
                    <p className="text-xs text-slate-500">
                      {e.startTime} - {e.endTime}
                    </p>
                    <span className="mt-1 inline-flex rounded-full bg-white px-2 py-0.5 text-[10px] font-medium text-slate-500">
                      {e.type}
                    </span>
                    {selectedEvents.length === 0 && (
                      <p className="mt-1 text-[11px] text-slate-400">
                        {format(parseISO(e.date), "dd MMM yyyy")}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
