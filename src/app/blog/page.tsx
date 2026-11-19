import PostsBrowser from "@/components/PostsBrowser";
import { getPosts } from "@/lib/data";
import { pageMeta } from "@/lib/seo";

export const revalidate = 300;
export const metadata = pageMeta("/blog", "UK Hiring & Careers Blog", "Guides and perspective on hiring, talent and the UK job market from the ProficientNow specialist recruitment team.");

export default async function BlogPage() {
  return <PostsBrowser type="blog" posts={await getPosts("blog")} />;
}
