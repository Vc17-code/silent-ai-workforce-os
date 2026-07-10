"use client";

import { useState } from "react";
import type { Appointment } from "@/types/clinic";
import { formatDate } from "@/lib/utils";

export default function AppointmentsManager({
  initial,
}: {
  initial: Appointment[];
}) {
  const [items, setItems] = useState(initial);

  const updateStatus = async (id: string, status: Appointment["status"]) => {
    const res = await fetch("/api/appointments", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status, read: true }),
    });
    if (res.ok) {
      const updated = await res.json();
      setItems((prev) => prev.map((a) => (a.id === id ? updated : a)));
    }
  };

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-primary/20 bg-white p-10 text-center text-muted">
        No appointments yet.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((a) => (
        <div
          key={a.id}
          className="rounded-2xl border border-primary/10 bg-white p-5"
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-semibold text-ink">{a.name}</p>
              <p className="text-sm text-muted">
                {a.phone}
                {a.email ? ` · ${a.email}` : ""}
              </p>
              <p className="mt-2 text-sm text-ink">
                {a.treatment || "General consultation"}
                {a.preferredDate ? ` · ${a.preferredDate}` : ""}
                {a.preferredTime ? ` · ${a.preferredTime}` : ""}
              </p>
              {a.message && (
                <p className="mt-2 text-sm text-muted">{a.message}</p>
              )}
              <p className="mt-2 text-xs text-muted">{formatDate(a.createdAt)}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {(["new", "confirmed", "completed", "cancelled"] as const).map(
                (status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => updateStatus(a.id, status)}
                    className={`rounded-xl px-3 py-1.5 text-xs font-semibold capitalize ${
                      a.status === status
                        ? "bg-primary text-white"
                        : "bg-mist text-primary"
                    }`}
                  >
                    {status}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
