import BlogListClient from "./BlogListClient";
import MainLayout from "@/components/layout/MainLayout";
import { getAllPosts, getAllTags } from "@/lib/blog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Technical articles, tutorials, and thoughts on engineering and programming.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <MainLayout currentPath="/blog">
      <BlogListClient posts={posts} tags={tags} />
    </MainLayout>
  );
}
