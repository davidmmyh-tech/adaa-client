import AdaaShieldHeroSection from '@/components/sections/adaa-shield-assessment/AdaaShieldHero';
import AdaaShieldAnalytics from '@/components/sections/adaa-shield-info/AdaaShieldAnalytics';
import AdaaShieldOrgsTable from '@/components/sections/adaa-shield-info/AdaaShieldOrgsTable';
import Dropdown from '@/components/ui/extend/Dropdown';
import { SearchIcon } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import { GRADES, REGIONS, YEARS } from '@/constants/data';
import useGetAdaaShieldOrganizationsQuery from '@/hooks/queries/useGetAdaaShieldOrganizationsQuery';
import useDebounce from '@/hooks/useDebounce';
import { useSearchParams } from 'react-router';

const PAGE_ORG_LIMIT = 5;
const ORGS_PAGE = 1;

export default function AdaaShieldInformatics() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const grade = searchParams.get('grade') || '';
  const region = searchParams.get('region') || '';
  const year = Number(searchParams.get('year')) || undefined;

  const { data, isFetching } = useGetAdaaShieldOrganizationsQuery({
    params: { query, grade, region, year, page: ORGS_PAGE, limit: PAGE_ORG_LIMIT }
  });

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
    <div className="space-y-4">
      <AdaaShieldHeroSection
        title='الجمعيات الحاصلة على "درع أداء" لعام 2025'
        description="يسرنا في منصة Adaa.pro تهنئة الجمعيات التي استحقت درع الأداء المؤسسي بعد إتمام استراتيجياتها وتحقيقها نتائج تقييم “جيدة” فأعلى وفق المعايير المعتمدة."
      />
      <section className="space-y-6">
        <div className="container space-y-6">
          <h2 className="text-2xl font-bold">درع الأداء المؤسسي 2025</h2>
          <div className="flex w-full flex-wrap space-x-4 md:flex-nowrap">
            <div className="relative basis-3/6">
              <SearchIcon className="absolute start-4 top-4" width={18} height={18} />
              <Input
                className="border-primary placeholder:text-primary border-2 ps-10 placeholder:font-semibold"
                placeholder="ابحث باسم الجمعية أو نوع الشهادة..."
                onChange={handleQueryChange}
              />
            </div>
            <Dropdown
              variant="secondary"
              values={YEARS}
              selectLabel="السنة"
              onValueChange={(value) => updateSearchParam('year', value === 'none' ? '' : value)}
              className="basis-1/6"
            />
            <Dropdown
              variant="secondary"
              values={REGIONS}
              selectLabel="المنطقة"
              onValueChange={(value) => updateSearchParam('region', value === 'none' ? '' : value)}
              className="basis-1/6"
            />
            <Dropdown
              variant="secondary"
              values={GRADES}
              selectLabel="مستوى الأداء"
              onValueChange={(value) => updateSearchParam('grade', value === 'none' ? '' : value)}
              className="basis-1/6"
            />
          </div>
        </div>

        <AdaaShieldOrgsTable orgs={data?.data.data || []} isLoading={isFetching} />
        <AdaaShieldAnalytics />
      </section>
    </div>
  );
}
