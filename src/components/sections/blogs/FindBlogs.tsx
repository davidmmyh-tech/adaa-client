import BlogCard from '@/components/ui/extend/BlogCard';
import Dropdown from '@/components/ui/extend/Dropdown';
import Logo from '@/components/ui/extend/Logo';
import DataPagination from '@/components/ui/extend/Pagination';
import SearchBar from '@/components/ui/extend/SearchBar';
import useDebounce from '@/hooks/useDebounce';
import DataWrapper from '@/layouts/DataWrapper';
import { findBlogs, getBlogsCategories } from '@/services/blogs';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useSearchParams } from 'react-router';

export default function FindBlogsSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const category = searchParams.get('category') || '';
  const LIMIT = 6;

  const {
    data: blogs,
    isLoading: isBlogsLoading,
    isFetching: isBlogsFetching,
    isRefetching: isRefetchingBlogs,
    refetch
  } = useQuery({
    queryKey: ['find-blogs', currentPage, query, category],
    queryFn: () => findBlogs({ page: currentPage, limit: LIMIT, q: query, category }),
    placeholderData: (previousData) => previousData
  });

  const categoriesQuery = useQuery({
    queryKey: ['blog-categories'],
    queryFn: () => getBlogsCategories()
  });
  const categories = categoriesQuery.data?.data.data.data || [];

  const updateSearchParam = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) newParams.set(key, value);
    else newParams.delete(key);
    setSearchParams(newParams, { preventScrollReset: true });
  };

  const handleQueryChange = useDebounce((e: React.ChangeEvent<HTMLInputElement>) => {
    updateSearchParam('query', e.target.value);
  }, 400);

  return (
    <section className="container my-12">
      <div className="flex flex-col justify-between gap-8 md:flex-row">
        <SearchBar placeholder="ابحث في مقالات المدونة..." className="w-full md:w-md" onChange={handleQueryChange} />
        <Dropdown
          variant="secondary"
          values={categories.map((cat) => cat.name)}
          className="w-full md:w-3xs"
          selectLabel="نوع المقال"
          onValueChange={(value) => updateSearchParam('category', value)}
        />
      </div>

      <DataWrapper
        isPending={isBlogsLoading && !blogs}
        isEmpty={!blogs?.data.items.length}
        retry={refetch}
        isRefetching={isRefetchingBlogs}
      >
        <div className="relative mt-8">
          {isBlogsFetching && !isBlogsLoading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60">
              <Logo isLoading className="h-20 w-20" />
            </div>
          )}

          <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
            {blogs?.data.items.map((blog) => (
              <BlogCard
                key={blog.id}
                title={blog.title}
                description={blog.description}
                image={blog.image}
                id={blog.id}
              />
            ))}
          </div>
        </div>

        {blogs && (
          <div className="mt-12 flex justify-center">
            <DataPagination
              currentPage={currentPage}
              totalPages={blogs.data.pagination.last_page}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </DataWrapper>
    </section>
  );
}
