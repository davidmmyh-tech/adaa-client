import CertificatesAnalyticsSection from '@/components/sections/certificates-informatics/CertificatesAnalytics';
import CertificatesOrgsTable from '@/components/sections/certificates-informatics/CertificatesOrgsTable';
import { CertificateOrgsGrid } from '@/components/sections/certificates-informatics/CertificateOrgsGrid';
import CertificatesHeroSection from '@/components/sections/Certificates/CertificatesHero';
import { Button } from '@/components/ui/button';
import Dropdown from '@/components/ui/extend/Dropdown';
import { SearchIcon } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import { CERTIFICATE_CLASSES, YEARS } from '@/constants/data';
import useDebounce from '@/hooks/useDebounce';
import { getOrganzations } from '@/services/certificates/certificates-data';
import { useQuery } from '@tanstack/react-query';
import { Grid3x3 } from 'lucide-react';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router';
import { useDocumentHead } from '@/hooks/useDocumentHead';
import DataWrapper from '@/layouts/DataWrapper';

export default function CertificatesInformaticsPage() {
  useDocumentHead({
    title: 'معلومات شهادات أداء - المنظمات الحاصلة على الشهادات',
    description:
      'تصفح قائمة المنظمات غير الربحية الحاصلة على شهادات الأداء المؤسسي المعتمدة مع إحصائيات وتحليلات شاملة.',
    ogTitle: 'معلومات شهادات أداء',
    ogDescription: 'قائمة المنظمات الحاصلة على شهادات أداء مع إحصائيات وتحليلات.'
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const display = searchParams.get('display') || '';
  const rank = searchParams.get('rank') || '';
  const year = Number(searchParams.get('year')) || undefined;

  const { data, isError, refetch, isFetching } = useQuery({
    queryKey: ['certificate-organizations', query, rank, year],
    queryFn: () => getOrganzations({ query, rank, year, page: 1, limit: 5 })
  });
  const organizations = data?.data.data.data || [];

  const updateSearchParam = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) newParams.set(key, value);
    else newParams.delete(key);
    setSearchParams(newParams, { preventScrollReset: true });
  };

  const handleQueryChange = useDebounce((e: React.ChangeEvent<HTMLInputElement>) => {
    updateSearchParam('query', e.target.value);
  }, 400);

  const certificates = useMemo(
    () => Object.values(CERTIFICATE_CLASSES).map((cls) => ({ label: cls.title, value: cls.id })),
    []
  );

  return (
    <div className="space-y-4">
      <CertificatesHeroSection
        title="الحاصلون على شهادة الأداء المؤسسي لعام 2025"
        subtitle=" نُبارك للجمعيات التي حصلت على شهادات الأداء المؤسسي لهذا العام، والتي أظهرت التزامًا بمعايير التميز التشغيلي،
          والاستراتيجي، وإدارة الموارد البشرية.."
      />

      <section className="space-y-8">
        <div className="container space-y-6">
          <h2 className="text-2xl font-bold">الجمعيات الحاصلة على شهادة اداء</h2>
          <div className="flex w-full flex-wrap space-y-4 space-x-4 md:flex-nowrap">
            <div className="relative w-full md:basis-3/6">
              <SearchIcon className="absolute start-4 top-4" width={18} height={18} />
              <Input
                className="border-primary placeholder:text-primary h-full border-2 ps-10 placeholder:font-semibold"
                placeholder="ابحث باسم الجمعية..."
                onChange={handleQueryChange}
              />
            </div>

            <Button
              variant="outline"
              className="h-auto w-48 border-2 font-semibold"
              onClick={() => updateSearchParam('display', display === 'grid' ? 'table' : 'grid')}
            >
              {display === 'grid' ? 'عرض الجدول' : 'عرض كبطاقات'} <Grid3x3 />
            </Button>

            <Dropdown
              variant="secondary"
              values={certificates}
              selectLabel="نوع الشهادة"
              onValueChange={(value) => updateSearchParam('rank', value === 'none' ? '' : value)}
              className="basis-1/6"
            />

            <Dropdown
              variant="secondary"
              values={YEARS}
              selectLabel="السنة"
              onValueChange={(value) => updateSearchParam('year', value === 'none' ? '' : value)}
              className="basis-1/6"
            />
          </div>
        </div>

        {display === 'grid' ? (
          <DataWrapper isEmpty={organizations.length === 0} isLoading={isFetching} isError={isError} retry={refetch}>
            <CertificateOrgsGrid orgs={organizations} />
          </DataWrapper>
        ) : (
          <CertificatesOrgsTable
            orgs={organizations}
            isLoading={isFetching}
            isEmpty={organizations.length === 0}
            isError={isError}
            refetch={refetch}
          />
        )}
        <CertificatesAnalyticsSection />
      </section>
    </div>
  );
}
