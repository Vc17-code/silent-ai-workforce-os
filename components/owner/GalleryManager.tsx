"use client";

import { useState } from "react";
import type { GalleryItem } from "@/types/clinic";

export default function GalleryManager({ initial }: { initial: GalleryItem[] }) {
  const [items, setItems] = useState(initial);
  const [form, setForm] = useState({
    title: "",
    category: "clinic" as GalleryItem["category"],
    image: "",
    beforeImage: "",
    afterImage: "",
    description: "",
    featured: true,
  });

  const add = async () => {
    const payload = {
      title: form.title,
      category: form.category,
      image: form.category === "before-after" ? undefined : form.image,
      beforeImage: form.category === "before-after" ? form.beforeImage : undefined,
      afterImage: form.category === "before-after" ? form.afterImage : undefined,
      description: form.description,
      featured: form.featured,
    };
    const res = await fetch("/api/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      const item = await res.json();
      setItems((prev) => [item, ...prev]);
      setForm({
        title: "",
        category: "clinic",
        image: "",
        beforeImage: "",
        afterImage: "",
        description: "",
        featured: true,
      });
    }
  };

  const remove = async (id: string) => {
    const res = await fetch("/api/gallery", {
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
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <select
          className="input-field"
          value={form.category}
          onChange={(e) =>
            setForm({ ...form, category: e.target.value as GalleryItem["category"] })
          }
        >
          <option value="before-after">Before & After</option>
          <option value="smile">Smile</option>
          <option value="clinic">Clinic</option>
          <option value="equipment">Equipment</option>
          <option value="team">Team</option>
        </select>
        {form.category === "before-after" ? (
          <>
            <input
              className="input-field"
              placeholder="Before image URL"
              value={form.beforeImage}
              onChange={(e) => setForm({ ...form, beforeImage: e.target.value })}
            />
            <input
              className="input-field"
              placeholder="After image URL"
              value={form.afterImage}
              onChange={(e) => setForm({ ...form, afterImage: e.target.value })}
            />
          </>
        ) : (
          <input
            className="input-field"
            placeholder="Image URL"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
          />
        )}
        <input
          className="input-field"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <button type="button" className="btn-primary" onClick={add}>
          Add to gallery
        </button>
      </div>

      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-2xl border border-primary/10 bg-white p-4"
          >
            <div>
              <p className="font-semibold">{item.title}</p>
              <p className="text-sm text-muted">{item.category}</p>
            </div>
            <button
              type="button"
              className="rounded-xl bg-red-50 px-3 py-1.5 text-sm text-red-600"
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
