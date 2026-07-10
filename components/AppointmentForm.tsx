"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Loader2 } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  phone: z.string().min(10, "Enter a valid phone number"),
  email: z.string().email("Enter a valid email").optional().or(z.literal("")),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
  treatment: z.string().optional(),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function AppointmentForm({
  treatments = [],
  defaultTreatment = "",
}: {
  treatments?: { slug: string; title: string }[];
  defaultTreatment?: string;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { treatment: defaultTreatment },
  });

  const onSubmit = async (data: FormData) => {
    setError("");
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
      reset();
    } catch {
      setError("Something went wrong. Please call or WhatsApp us instead.");
    }
  };

  if (submitted) {
    return (
      <div className="rounded-[1.75rem] border border-accent/20 bg-mist/60 p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-accent" />
        <h3 className="mt-4 font-display text-2xl text-ink">Request received</h3>
        <p className="mt-2 text-muted">
          Our team will confirm your appointment shortly by phone or WhatsApp.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="btn-secondary mt-6"
        >
          Book another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name" error={errors.name?.message}>
          <input {...register("name")} className="input-field" placeholder="Your name" />
        </Field>
        <Field label="Phone" error={errors.phone?.message}>
          <input {...register("phone")} className="input-field" placeholder="+91" />
        </Field>
      </div>
      <Field label="Email (optional)" error={errors.email?.message}>
        <input {...register("email")} type="email" className="input-field" placeholder="you@email.com" />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Preferred date">
          <input {...register("preferredDate")} type="date" className="input-field" />
        </Field>
        <Field label="Preferred time">
          <select {...register("preferredTime")} className="input-field">
            <option value="">Select</option>
            <option>Morning</option>
            <option>Afternoon</option>
            <option>Evening</option>
          </select>
        </Field>
      </div>
      <Field label="Treatment interest">
        <select {...register("treatment")} className="input-field">
          <option value="">General consultation</option>
          {treatments.map((t) => (
            <option key={t.slug} value={t.title}>
              {t.title}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Message">
        <textarea
          {...register("message")}
          rows={3}
          className="input-field resize-none"
          placeholder="Tell us briefly what you need"
        />
      </Field>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending…
          </>
        ) : (
          "Request appointment"
        )}
      </button>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block font-medium text-ink">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  );
}
