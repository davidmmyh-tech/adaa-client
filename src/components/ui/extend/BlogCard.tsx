import { Link } from 'react-router';
import Img from './Img';
import type { Id } from '@/schemas/types';
import usePrefetchBlogDetails from '@/hooks/prefetch/usePrefetchBlogDetails';
import { memo } from 'react';

type Props = {
  title: string;
  description: string;
  image: string;
  id: Id;
};

const BlogCard = memo(function BlogCard({ title, description, image, id }: Props) {
  const { handlePrefetchBlog } = usePrefetchBlogDetails();
  return (
    <div className="flex flex-col gap-6 sm:flex-row" onMouseEnter={() => handlePrefetchBlog(id)}>
      <Link to={`/مدونة-اداء/${id}`} className="block aspect-square shrink-0 sm:w-40" prefetch="render">
        <Img src={image} className="rounded-md object-cover" alt={title} />
      </Link>
      <div className="w-full space-y-2">
        <Link to={`/مدونة-اداء/${id}`} className="block text-lg font-semibold">
          {title}
        </Link>
        <p className="text-sm">{description}</p>
        <Link to={`/مدونة-اداء/${id}`} className="text-secondary mt-4 block text-end text-sm underline">
          اقرأ المزيد
        </Link>
      </div>
    </div>
  );
});

export default BlogCard;
