import CertificatesAnalyticsSection from '@/components/sections/certificates-informatics/CertificatesAnalytics';
import CertificatesOrgsTable from '@/components/sections/certificates-informatics/CertificatesOrgsTable';
import CertificatesHeroSection from '@/components/sections/Certificates/CertificatesHero';
import { Button } from '@/components/ui/button';
import Dropdown from '@/components/ui/extend/Dropdown';
import { SearchIcon } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import { grades, regions } from '@/constants/data';
// import useGetAdaaShieldOrganizationsQuery from '@/hooks/queries/useGetAdaaShieldOrganizationsQuery';
// import useDebounce from '@/hooks/useDebounce';
import { Grid3x3 } from 'lucide-react';
// import { useSearchParams } from 'react-router';

// const PAGE_ORG_LIMIT = 5;
// const ORGS_PAGE = 1;

export default function CertificatesInformaticsPage() {
  // const [searchParams, setSearchParams] = useSearchParams();
  // const query = searchParams.get('query') || '';
  // const grade = searchParams.get('grade') || '';
  // const region = searchParams.get('region') || '';
  // const year = Number(searchParams.get('year')) || undefined;

  // const { data } = useGetAdaaShieldOrganizationsQuery({
  //   params: { query, grade, region, year, page: ORGS_PAGE, limit: PAGE_ORG_LIMIT }
  // });

  // const updateSearchParam = (key: string, value: string) => {
  //   const newParams = new URLSearchParams(searchParams);
  //   if (value) newParams.set(key, value);
  //   else newParams.delete(key);
  //   setSearchParams(newParams, { preventScrollReset: true });
  // };

  // const handleQueryChange = useDebounce((e: React.ChangeEvent<HTMLInputElement>) => {
  //   updateSearchParam('query', e.target.value);
  // }, 400);

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
          <div className="flex w-full flex-wrap space-x-4 md:flex-nowrap">
            <div className="relative basis-3/6">
              <SearchIcon className="absolute start-4 top-4" width={18} height={18} />
              <Input
                className="border-primary placeholder:text-primary h-full border-2 ps-10 placeholder:font-semibold"
                placeholder="ابحث باسم الجمعية أو نوع الشهادة..."
                // onChange={handleQueryChange}
              />
            </div>

            <Button variant="outline" className="h-auto border-2 font-semibold">
              عرض كبطاقات <Grid3x3 />
            </Button>

            <Dropdown
              variant="secondary"
              values={regions}
              selectLabel="المنطقة"
              // onValueChange={(value) => updateSearchParam('region', value === 'none' ? '' : value)}
              className="basis-1/6"
            />

            <Dropdown
              variant="secondary"
              values={grades}
              selectLabel="مستوى الأداء"
              // onValueChange={(value) => updateSearchParam('grade', value === 'none' ? '' : value)}
              className="basis-1/6"
            />
          </div>
        </div>

        <CertificatesOrgsTable />
        <CertificatesAnalyticsSection />
      </section>
    </div>
  );
}
