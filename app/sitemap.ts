import type { MetadataRoute } from "next";
import { getProperties } from "@/lib/db";
import { siteConfig } from "@/lib/config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const properties = await getProperties(true);
  const baseUrl = siteConfig.url;

  const staticPages = [
    "",
    "/properties",
    "/about",
    "/services",
    "/contact",
    "/gallery",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const propertyPages = properties
    .filter((p) => !p.hidden)
    .map((p) => ({
      url: `${baseUrl}/properties/${p.slug}`,
      lastModified: new Date(p.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

  return [...staticPages, ...propertyPages];
}
