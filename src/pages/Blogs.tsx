import BlogsHeroSection from '@/components/sections/blogs/BlogsHero';
import FindBlogsSection from '@/components/sections/blogs/FindBlogs';
import LatestBlogSection from '@/components/sections/blogs/LatestBlog';
import HSplit from '@/components/ui/h-split';

export default function BlogsPage() {
  return (
    <>
      <BlogsHeroSection />
      <LatestBlogSection />
      <HSplit className="container" />
      <FindBlogsSection />
    </>
  );
}
