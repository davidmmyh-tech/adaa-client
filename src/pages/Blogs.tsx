import BlogsHeroSection from '@/components/sections/blogs/BlogsHero';
import FindBlogsSection from '@/components/sections/blogs/FindBlogs';
import LatestBlogSection from '@/components/sections/blogs/LatestBlog';
import HSplit from '@/components/ui/h-split';
import { useDocumentHead } from '@/hooks/useDocumentHead';

export default function BlogsPage() {
  useDocumentHead({
    title: 'مدونة أداء - مقالات ورؤى في التميز المؤسسي',
    description:
      'اقرأ آخر المقالات والرؤى حول التميز المؤسسي، تطوير أداء المنظمات غير الربحية، وأفضل الممارسات في القطاع الثالث من خبراء أداء.',
    ogTitle: 'مدونة أداء - مقالات التميز المؤسسي',
    ogDescription: 'مقالات ورؤى متخصصة في التميز المؤسسي وتطوير أداء المنظمات غير الربحية.'
  });

  return (
    <>
      <BlogsHeroSection />
      <LatestBlogSection />
      <HSplit className="container" />
      <FindBlogsSection />
    </>
  );
}
