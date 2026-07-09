"use client";

import { useEffect, useState } from "react";
import OwnerSidebar from "@/components/OwnerSidebar";
import type { Inquiry } from "@/types/property";
import { Mail, Phone, Check } from "lucide-react";

export default function OwnerEnquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/inquiries")
      .then((res) => res.json())
      .then(setInquiries)
      .finally(() => setLoading(false));
  }, []);

  const markRead = async (id: string) => {
    await fetch("/api/inquiries", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setInquiries((prev) =>
      prev.map((i) => (i.id === id ? { ...i, read: true } : i))
    );
  };

  return (
    <>
      <OwnerSidebar />
      <div className="flex-1 p-6 md:p-8">
        <h1 className="text-2xl font-bold text-slate-900">Customer Inquiries</h1>
        <p className="mt-1 text-slate-500">
          {inquiries.filter((i) => !i.read).length} unread of {inquiries.length} total
        </p>

        {loading ? (
          <p className="mt-8 text-slate-500">Loading...</p>
        ) : inquiries.length === 0 ? (
          <div className="mt-8 rounded-2xl bg-white p-12 text-center text-slate-500 shadow-sm">
            No inquiries yet. They will appear here when visitors submit the contact form.
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {inquiries.map((inquiry) => (
              <div
                key={inquiry.id}
                className={`rounded-2xl bg-white p-6 shadow-sm ${
                  !inquiry.read ? "border-l-4 border-primary" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-900">{inquiry.name}</h3>
                      {!inquiry.read && (
                        <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-white">New</span>
                      )}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-4 text-sm text-slate-600">
                      <a href={`tel:${inquiry.phone}`} className="flex items-center gap-1 hover:text-primary">
                        <Phone className="h-4 w-4" /> {inquiry.phone}
                      </a>
                      {inquiry.email && (
                        <a href={`mailto:${inquiry.email}`} className="flex items-center gap-1 hover:text-primary">
                          <Mail className="h-4 w-4" /> {inquiry.email}
                        </a>
                      )}
                    </div>
                    {inquiry.propertyTitle && (
                      <p className="mt-2 text-sm text-primary">
                        Re: {inquiry.propertyTitle}
                      </p>
                    )}
                    {inquiry.propertyRequirement && (
                      <p className="mt-1 text-sm text-slate-500">
                        Looking for: {inquiry.propertyRequirement}
                        {inquiry.budget && ` • Budget: ${inquiry.budget}`}
                      </p>
                    )}
                    {inquiry.message && (
                      <p className="mt-3 text-slate-600">{inquiry.message}</p>
                    )}
                    <p className="mt-2 text-xs text-slate-400">
                      {new Date(inquiry.createdAt).toLocaleString("en-IN")}
                    </p>
                  </div>
                  {!inquiry.read && (
                    <button
                      type="button"
                      onClick={() => markRead(inquiry.id)}
                      className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
                    >
                      <Check className="h-3 w-3" /> Mark Read
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
