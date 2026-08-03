import PostArticle from "@/components/PostArticle";
export default function BlogArticle({ params }: { params: { slug: string } }) {
  return <PostArticle type="blog" slug={params.slug} />;
}
