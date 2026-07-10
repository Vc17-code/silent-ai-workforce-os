"use client";

import { useState } from "react";

export default function JsonEditor({
  type,
  initial,
}: {
  type: string;
  initial: unknown;
}) {
  const [value, setValue] = useState(JSON.stringify(initial, null, 2));
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const save = async () => {
    setSaving(true);
    setMessage("");
    try {
      const data = JSON.parse(value);
      const res = await fetch("/api/cms", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, data }),
      });
      if (!res.ok) throw new Error("Save failed");
      setMessage("Saved successfully.");
    } catch {
      setMessage("Invalid JSON or save failed.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-3">
      <textarea
        className="input-field min-h-[420px] font-mono text-xs"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        spellCheck={false}
      />
      <button type="button" className="btn-primary" onClick={save} disabled={saving}>
        {saving ? "Saving…" : "Save changes"}
      </button>
      {message && <p className="text-sm text-muted">{message}</p>}
    </div>
  );
}
