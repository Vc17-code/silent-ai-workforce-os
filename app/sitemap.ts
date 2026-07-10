import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";
import { getTreatments, getBlogs } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const treatments = await getTreatments();
  const blogs = await getBlogs();

  const staticRoutes = [
    "",
    "/about",
    "/doctor",
    "/treatments",
    "/gallery",
    "/reviews",
    "/tour",
    "/contact",
    "/book",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const treatmentRoutes = treatments.map((t) => ({
    url: `${base}/treatments/${t.slug}`,
    lastModified: new Date(t.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogRoutes = blogs.map((b) => ({
    url: `${base}/blog/${b.slug}`,
    lastModified: new Date(b.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...treatmentRoutes, ...blogRoutes];
}
