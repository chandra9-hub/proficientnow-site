import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PostArticle from "@/components/PostArticle";
import { getPost } from "@/lib/data";
import { clip, pageMeta } from "@/lib/seo";

export const revalidate = 300;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost("blog", params.slug);
  return post ? pageMeta(`/blog/${post.slug}`, post.title, clip(post.excerpt || post.body)) : {};
}

export default async function BlogArticle({ params }: { params: { slug: string } }) {
  const post = await getPost("blog", params.slug);
  if (!post) notFound();
  return <PostArticle type="blog" post={post} />;
}
