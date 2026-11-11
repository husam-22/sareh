import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { serviceGroups } from "@/data/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL;
  if (!base) return [];
  const paths = ["/", "/services", "/projects", "/about", "/contact", "/privacy", ...serviceGroups.map((item) => `/services/${item.slug}`), ...projects.map((item) => `/projects/${item.slug}`)];
  return paths.map((path) => ({ url: `${base.replace(/\/$/, "")}${path}`, lastModified: new Date(), changeFrequency: path === "/" ? "weekly" : "monthly", priority: path === "/" ? 1 : 0.7 }));
}
