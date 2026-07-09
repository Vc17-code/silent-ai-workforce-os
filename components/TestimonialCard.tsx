import { Star } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  text: string;
  rating: number;
}

export default function TestimonialCard({ name, text, rating }: TestimonialCardProps) {
  return (
    <div className="card-hover rounded-2xl bg-white p-6 shadow-md">
      <div className="mb-4 flex gap-1">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className="h-5 w-5 fill-accent text-accent" />
        ))}
      </div>
      <p className="mb-4 text-slate-600 leading-relaxed">&ldquo;{text}&rdquo;</p>
      <p className="font-semibold text-slate-900">— {name}</p>
    </div>
  );
}
