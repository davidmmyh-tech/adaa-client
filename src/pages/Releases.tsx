import Dropdown from '@/components/ui/extend/Dropdown';
import Img from '@/components/ui/extend/Img';
import InnerHTML from '@/components/ui/extend/InnerHTML';
import Logo from '@/components/ui/extend/Logo';
import DataPagination from '@/components/ui/extend/Pagination';
import SearchBar from '@/components/ui/extend/SearchBar';
import useDebounce from '@/hooks/useDebounce';
import DataWrapper from '@/layouts/DataWrapper';
import { remote } from '@/lib/utils';
import { findReleases, getReleasesCategories } from '@/services/releases';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router';

export default function ReleasesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [hasError, setHasError] = useState(false);
  const query = searchParams.get('query') || '';
  const category = searchParams.get('category') || '';
  const LIMIT = 6;

  const { data, isLoading, isFetching, isPending, isError, isSuccess, refetch } = useQuery({
    queryKey: ['find-releases', currentPage, query, category],
    queryFn: () => findReleases({ page: currentPage, limit: LIMIT, q: query, category }),
    placeholderData: (previousData) => previousData
  });

  // Track error state - set to true on error, only clear on successful refetch
  useEffect(() => {
    if (isError) {
      setHasError(true);
    } else if (isSuccess && !isFetching) {
      setHasError(false);
    }
  }, [isError, isSuccess, isFetching]);

  const categoriesQuery = useQuery({
    queryKey: ['release-categories'],
    queryFn: () => getReleasesCategories()
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
    <>
      <header className="bg-primary relative flex h-screen max-h-[650px] items-center justify-center">
        <div className="releases-hero-background absolute inset-0 opacity-50"></div>
        <div className="z-20 container flex h-full flex-col items-center justify-center space-y-4 px-4 text-center text-white">
          <h1 className="text-4xl font-bold md:text-5xl">اصدارات أداء</h1>
          <p className="text-lg md:text-xl">
            في اصدارات اداء نضع بين ايديكم اصدارتنا المتخصصة , التي تسلط الضوء على واقع القطاع غير الربحي و تقدم معرفة
            موثوقة تدعم تطويره و تعزيز اثره
          </p>
        </div>
      </header>

      <section className="container my-12">
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          <SearchBar placeholder="ابحث في الاصدارات..." className="w-full md:w-md" onChange={handleQueryChange} />
          <Dropdown
            variant="secondary"
            values={categories.map((cat) => cat.name)}
            className="w-full md:w-3xs"
            selectLabel="نوع الاصدار"
            onValueChange={(value) => updateSearchParam('category', value)}
          />
        </div>

        <DataWrapper
          isPending={isPending}
          isError={hasError}
          isEmpty={!data?.data.items.length}
          retry={refetch}
          isRefetching={isFetching}
        >
          <div className="relative mt-8">
            {isFetching && !isLoading && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60">
                <Logo isLoading className="h-20 w-20" />
              </div>
            )}

            <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
              {data?.data.items.map((blog) => (
                <ReleaseCard
                  key={blog.id}
                  title={blog.title}
                  description={blog.description}
                  pdfUrl={blog.file_path}
                  image={blog.image}
                />
              ))}
            </div>
          </div>

          <div className="mt-12 flex justify-center">
            <DataPagination currentPage={currentPage} totalPages={1} onPageChange={setCurrentPage} />
          </div>
        </DataWrapper>
      </section>
    </>
  );
}

type Props = {
  title: string;
  description: string;
  pdfUrl: string;
  image: string;
};

function ReleaseCard({ title, description, pdfUrl, image }: Props) {
  return (
    <Link to={remote(pdfUrl)} target="_blank" className="overflow-clip rounded-lg border shadow-md">
      <Img src={image} alt="release sample" className="h-64 w-full object-cover" />
      <div className="my-4 space-y-4 px-4">
        <span className="font-semibold">{title}</span>
        <InnerHTML content={description} className="text-muted text-sm" />
      </div>
    </Link>
  );
}
