import PostsBrowser from "@/components/PostsBrowser";
import { getPosts } from "@/lib/data";
import { pageMeta } from "@/lib/seo";

export const revalidate = 300;
export const metadata = pageMeta("/news", "UK Labour Market News & Hiring Insights", "The latest UK labour-market news and hiring insight from the ProficientNow specialist recruitment team.");

export default async function NewsPage() {
  return <PostsBrowser type="news" posts={await getPosts("news")} />;
}
