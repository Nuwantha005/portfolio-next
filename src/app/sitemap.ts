import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

export const dynamic = "force-static";

const BASE_URL = "https://nuwanthakumara.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/projects`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];

  // Project pages
  const projectSlugs = [
    "project_cfd_microchannel",
    "Project_CommunicationSoftware",
    "project_complex_mapping",
    "project_constrained_solver",
    "project_fourier_images",
    "project_fourier_text",
    "project_gearbox_design",
    "project_mems_tec",
    "project_meridional_solver",
    "Project_MoviesSoftware",
    "project_single_dof_vibration",
    "project_tsp",
    "project_volute_fillet",
  ];

  const projectRoutes: MetadataRoute.Sitemap = projectSlugs.map((slug) => ({
    url: `${BASE_URL}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Blog posts
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = getAllPosts();
    blogRoutes = posts
      .filter((post) => post.published)
      .map((post) => ({
        url: `${BASE_URL}/blog/${post.slug}`,
        lastModified: post.date ? new Date(post.date) : new Date(),
        changeFrequency: "yearly" as const,
        priority: 0.7,
      }));
  } catch {
    // Blog data may not be available during build in some environments
  }

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
