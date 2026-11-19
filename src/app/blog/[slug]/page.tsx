import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PostArticle from "@/components/PostArticle";
import JsonLd from "@/components/JsonLd";
import { getPost, getPosts } from "@/lib/data";
import { articleLd, clip, pageMeta } from "@/lib/seo";

export const revalidate = 300;

export async function generateStaticParams() {
  return ((await getPosts("blog")) ?? []).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost("blog", params.slug);
  return post ? pageMeta(`/blog/${post.slug}`, post.title, clip(post.meta_description || post.excerpt || post.body)) : {};
}

export default async function BlogArticle({ params }: { params: { slug: string } }) {
  const post = await getPost("blog", params.slug);
  if (!post) notFound();
  return (
    <>
      <JsonLd data={articleLd(post)} />
      <PostArticle type="blog" post={post} />
    </>
  );
}
