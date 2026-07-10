"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FAQ } from "@/types/clinic";

export default function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <div className="space-y-3">
      {faqs.map((faq) => {
        const open = openId === faq.id;
        return (
          <div
            key={faq.id}
            className="overflow-hidden rounded-2xl border border-primary/10 bg-white/80"
          >
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              onClick={() => setOpenId(open ? null : faq.id)}
              aria-expanded={open}
            >
              <span className="font-medium text-ink">{faq.question}</span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 shrink-0 text-muted transition-transform",
                  open && "rotate-180"
                )}
              />
            </button>
            {open && (
              <div className="border-t border-primary/8 px-5 py-4 text-sm leading-relaxed text-muted">
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
