import PostArticle from "@/components/PostArticle";
export default function NewsArticle({ params }: { params: { slug: string } }) {
  return <PostArticle type="news" slug={params.slug} />;
}
