import Link from "next/link";
import { propertyCategories } from "@/lib/utils";

export default function PropertyCategories() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="mb-10 text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-secondary">
            Browse by Type
          </span>
          <h2 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
            Property Categories
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {propertyCategories.map((cat) => (
            <Link
              key={cat.type}
              href={`/properties?type=${cat.type}`}
              className="card-hover group flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
            >
              <span className="text-4xl">{cat.icon}</span>
              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary">
                  {cat.label}
                </h3>
                <p className="text-sm text-slate-500">{cat.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
