"use client";

import { useState } from "react";
import type { Treatment } from "@/types/clinic";

export default function TreatmentsManager({
  initial,
}: {
  initial: Treatment[];
}) {
  const [items, setItems] = useState(initial);
  const [editing, setEditing] = useState<Treatment | null>(null);
  const [saving, setSaving] = useState(false);

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    const res = await fetch("/api/treatments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });
    if (res.ok) {
      const updated = await res.json();
      setItems((prev) => {
        const exists = prev.some((t) => t.id === updated.id);
        return exists
          ? prev.map((t) => (t.id === updated.id ? updated : t))
          : [...prev, updated];
      });
      setEditing(null);
    }
    setSaving(false);
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this treatment?")) return;
    const res = await fetch("/api/treatments", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) setItems((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="space-y-4">
      <button
        type="button"
        className="btn-primary"
        onClick={() =>
          setEditing({
            id: "",
            slug: "",
            title: "",
            shortDescription: "",
            overview: "",
            benefits: [],
            procedure: [],
            recovery: "",
            duration: "",
            suitableFor: [],
            faqs: [],
            relatedSlugs: [],
            image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&q=80",
            icon: "Smile",
            featured: false,
            order: items.length + 1,
            published: true,
            updatedAt: new Date().toISOString(),
          })
        }
      >
        Add treatment
      </button>

      {editing && (
        <div className="space-y-3 rounded-2xl border border-primary/10 bg-white p-5">
          <input
            className="input-field"
            placeholder="Title"
            value={editing.title}
            onChange={(e) => setEditing({ ...editing, title: e.target.value })}
          />
          <textarea
            className="input-field"
            rows={2}
            placeholder="Short description"
            value={editing.shortDescription}
            onChange={(e) =>
              setEditing({ ...editing, shortDescription: e.target.value })
            }
          />
          <textarea
            className="input-field"
            rows={4}
            placeholder="Overview"
            value={editing.overview}
            onChange={(e) => setEditing({ ...editing, overview: e.target.value })}
          />
          <input
            className="input-field"
            placeholder="Image URL"
            value={editing.image}
            onChange={(e) => setEditing({ ...editing, image: e.target.value })}
          />
          <input
            className="input-field"
            placeholder="Duration"
            value={editing.duration}
            onChange={(e) => setEditing({ ...editing, duration: e.target.value })}
          />
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={editing.featured}
              onChange={(e) =>
                setEditing({ ...editing, featured: e.target.checked })
              }
            />
            Featured on homepage
          </label>
          <div className="flex gap-2">
            <button type="button" className="btn-primary" onClick={save} disabled={saving}>
              {saving ? "Saving…" : "Save"}
            </button>
            <button type="button" className="btn-secondary" onClick={() => setEditing(null)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {items.map((t) => (
          <div
            key={t.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-primary/10 bg-white p-4"
          >
            <div>
              <p className="font-semibold">{t.title}</p>
              <p className="text-sm text-muted">
                {t.featured ? "Featured · " : ""}
                {t.published ? "Published" : "Draft"} · /{t.slug}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className="rounded-xl bg-mist px-3 py-1.5 text-sm font-medium text-primary"
                onClick={() => setEditing(t)}
              >
                Edit
              </button>
              <button
                type="button"
                className="rounded-xl bg-red-50 px-3 py-1.5 text-sm font-medium text-red-600"
                onClick={() => remove(t.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
