"use client";

import { useState } from "react";
import type { Testimonial } from "@/types/clinic";

export default function TestimonialsManager({
  initial,
}: {
  initial: Testimonial[];
}) {
  const [items, setItems] = useState(initial);
  const [form, setForm] = useState({
    name: "",
    treatment: "",
    text: "",
    rating: 5,
    videoUrl: "",
    featured: true,
    source: "website" as Testimonial["source"],
  });

  const add = async () => {
    const res = await fetch("/api/testimonials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        videoUrl: form.videoUrl || undefined,
      }),
    });
    if (res.ok) {
      const item = await res.json();
      setItems((prev) => [item, ...prev]);
      setForm({
        name: "",
        treatment: "",
        text: "",
        rating: 5,
        videoUrl: "",
        featured: true,
        source: "website",
      });
    }
  };

  const remove = async (id: string) => {
    const res = await fetch("/api/testimonials", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) setItems((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3 rounded-2xl border border-primary/10 bg-white p-5">
        <input
          className="input-field"
          placeholder="Patient name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="input-field"
          placeholder="Treatment"
          value={form.treatment}
          onChange={(e) => setForm({ ...form, treatment: e.target.value })}
        />
        <textarea
          className="input-field"
          rows={3}
          placeholder="Review text"
          value={form.text}
          onChange={(e) => setForm({ ...form, text: e.target.value })}
        />
        <input
          className="input-field"
          placeholder="Video URL (optional)"
          value={form.videoUrl}
          onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
        />
        <button type="button" className="btn-primary" onClick={add}>
          Add testimonial
        </button>
      </div>
      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between gap-3 rounded-2xl border border-primary/10 bg-white p-4"
          >
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-muted">{item.text}</p>
            </div>
            <button
              type="button"
              className="shrink-0 rounded-xl bg-red-50 px-3 py-1.5 text-sm text-red-600"
              onClick={() => remove(item.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
