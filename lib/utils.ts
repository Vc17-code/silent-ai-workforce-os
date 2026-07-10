export function getWhatsAppLink(phone: string, message?: string): string {
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${phone.replace(/\D/g, "")}${text}`;
}

export function getPhoneLink(phone: string): string {
  return `tel:${phone.replace(/\s/g, "")}`;
}

export function getEmailLink(email: string, subject?: string): string {
  const params = subject ? `?subject=${encodeURIComponent(subject)}` : "";
  return `mailto:${email}${params}`;
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
