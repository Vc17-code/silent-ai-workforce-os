"use client";

import { useState } from "react";
import type { MediaAssets } from "@/types/clinic";

export default function MediaManager({ initial }: { initial: MediaAssets }) {
  const [media, setMedia] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const save = async () => {
    setSaving(true);
    setSaved(false);
    const res = await fetch("/api/cms", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "media", data: media }),
    });
    setSaving(false);
    if (res.ok) setSaved(true);
  };

  return (
    <div className="space-y-8">
      <section className="space-y-3 rounded-2xl border border-primary/10 bg-white p-5">
        <h2 className="font-display text-xl">Introductory video</h2>
        <input
          className="input-field"
          placeholder="Video URL (YouTube / Vimeo / MP4)"
          value={media.introVideo.url}
          onChange={(e) =>
            setMedia({
              ...media,
              introVideo: { ...media.introVideo, url: e.target.value },
            })
          }
        />
        <input
          className="input-field"
          placeholder="Thumbnail image URL"
          value={media.introVideo.thumbnail}
          onChange={(e) =>
            setMedia({
              ...media,
              introVideo: { ...media.introVideo, thumbnail: e.target.value },
            })
          }
        />
        <input
          className="input-field"
          placeholder="Title"
          value={media.introVideo.title}
          onChange={(e) =>
            setMedia({
              ...media,
              introVideo: { ...media.introVideo, title: e.target.value },
            })
          }
        />
      </section>

      <section className="space-y-3 rounded-2xl border border-primary/10 bg-white p-5">
        <h2 className="font-display text-xl">360° Virtual Tour</h2>
        <select
          className="input-field"
          value={media.virtualTour.provider}
          onChange={(e) =>
            setMedia({
              ...media,
              virtualTour: {
                ...media.virtualTour,
                provider: e.target.value as MediaAssets["virtualTour"]["provider"],
              },
            })
          }
        >
          <option value="placeholder">Placeholder</option>
          <option value="matterport">Matterport</option>
          <option value="pannellum">Pannellum</option>
          <option value="marzipano">Marzipano</option>
          <option value="streetview">Google Street View</option>
        </select>
        <input
          className="input-field"
          placeholder="Embed URL"
          value={media.virtualTour.embedUrl}
          onChange={(e) =>
            setMedia({
              ...media,
              virtualTour: { ...media.virtualTour, embedUrl: e.target.value },
            })
          }
        />
        <input
          className="input-field"
          placeholder="Thumbnail URL"
          value={media.virtualTour.thumbnail}
          onChange={(e) =>
            setMedia({
              ...media,
              virtualTour: { ...media.virtualTour, thumbnail: e.target.value },
            })
          }
        />
      </section>

      <section className="space-y-3 rounded-2xl border border-primary/10 bg-white p-5">
        <h2 className="font-display text-xl">Homepage hero</h2>
        <input
          className="input-field"
          placeholder="Hero image URL"
          value={media.heroBanner.image}
          onChange={(e) =>
            setMedia({
              ...media,
              heroBanner: { ...media.heroBanner, image: e.target.value },
            })
          }
        />
        <input
          className="input-field"
          placeholder="Headline"
          value={media.heroBanner.headline}
          onChange={(e) =>
            setMedia({
              ...media,
              heroBanner: { ...media.heroBanner, headline: e.target.value },
            })
          }
        />
        <textarea
          className="input-field"
          rows={2}
          placeholder="Subheadline"
          value={media.heroBanner.subheadline}
          onChange={(e) =>
            setMedia({
              ...media,
              heroBanner: { ...media.heroBanner, subheadline: e.target.value },
            })
          }
        />
      </section>

      <button type="button" className="btn-primary" onClick={save} disabled={saving}>
        {saving ? "Saving…" : "Save media settings"}
      </button>
      {saved && <p className="text-sm text-accent">Saved successfully.</p>}
    </div>
  );
}
