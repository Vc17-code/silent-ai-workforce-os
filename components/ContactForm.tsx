"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle } from "lucide-react";

const inquirySchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number required"),
  email: z.string().email("Valid email required").optional().or(z.literal("")),
  propertyRequirement: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().optional(),
  propertyId: z.string().optional(),
  propertyTitle: z.string().optional(),
});

type InquiryFormData = z.infer<typeof inquirySchema>;

interface ContactFormProps {
  propertyId?: string;
  propertyTitle?: string;
  compact?: boolean;
}

export default function ContactForm({
  propertyId,
  propertyTitle,
  compact = false,
}: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      propertyId,
      propertyTitle,
    },
  });

  const onSubmit = async (data: InquiryFormData) => {
    setError("");
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to submit");
      setSubmitted(true);
      reset();
    } catch {
      setError("Something went wrong. Please call us directly.");
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl bg-emerald-50 p-8 text-center">
        <CheckCircle className="mb-3 h-12 w-12 text-secondary" />
        <h3 className="text-xl font-bold text-slate-900">Thank You!</h3>
        <p className="mt-2 text-slate-600">
          We&apos;ve received your inquiry and will contact you shortly.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-4 text-sm font-medium text-primary hover:underline"
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {propertyTitle && (
        <p className="rounded-lg bg-blue-50 px-4 py-2 text-sm text-primary">
          Inquiring about: <strong>{propertyTitle}</strong>
        </p>
      )}

      <div className={compact ? "space-y-4" : "grid gap-4 sm:grid-cols-2"}>
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-700">
            Name *
          </label>
          <input
            id="name"
            {...register("name")}
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="Your name"
          />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="mb-1 block text-sm font-medium text-slate-700">
            Phone *
          </label>
          <input
            id="phone"
            {...register("phone")}
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="+91 98765 43210"
          />
          {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
        </div>
      </div>

      {!compact && (
        <>
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="your@email.com"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="propertyRequirement" className="mb-1 block text-sm font-medium text-slate-700">
                Property Requirement
              </label>
              <select
                id="propertyRequirement"
                {...register("propertyRequirement")}
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="">Select type</option>
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="plot">Plot</option>
                <option value="villa">Villa</option>
                <option value="rent">Rental</option>
              </select>
            </div>

            <div>
              <label htmlFor="budget" className="mb-1 block text-sm font-medium text-slate-700">
                Budget
              </label>
              <input
                id="budget"
                {...register("budget")}
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="e.g. ₹50 Lakh"
              />
            </div>
          </div>
        </>
      )}

      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-slate-700">
          Message
        </label>
        <textarea
          id="message"
          {...register("message")}
          rows={compact ? 3 : 4}
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          placeholder="Tell us about your requirements..."
        />
      </div>

      <input type="hidden" {...register("propertyId")} />
      <input type="hidden" {...register("propertyTitle")} />

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:opacity-60"
      >
        <Send className="h-4 w-4" />
        {isSubmitting ? "Sending..." : "Submit Inquiry"}
      </button>
    </form>
  );
}
