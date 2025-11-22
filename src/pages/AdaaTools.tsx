import DashboardsSection from '@/components/sections/adaa-tools/Dashboards';
import ExcelSheetsSection from '@/components/sections/adaa-tools/ExcelSheets';
import PoweBiSection from '@/components/sections/adaa-tools/PoweBi';
import ToolsGuideSection from '@/components/sections/adaa-tools/ToolsGuide';
import ToolsHeroSection from '@/components/sections/adaa-tools/ToolsHero';
import { getTools } from '@/services/tools';
import { useQueries } from '@tanstack/react-query';
import { useDocumentHead } from '@/hooks/useDocumentHead';

export default function AdaaToolsPage() {
  const toolsQueries = useQueries({
    queries: [
      {
        queryKey: ['adaa-excel-tools'],
        queryFn: () => getTools('models') //fetchExcelTools()
      },
      {
        queryKey: ['adaa-dashboard-designs'],
        queryFn: () => getTools('dashboards') //fetchDashboardDesigns()
      },
      {
        queryKey: ['adaa-powerbi-templates'],
        queryFn: () => getTools('tools') //fetchPowerBiTemplates()
      }
    ]
  });

  useDocumentHead({
    title: 'أدوات أداء - نماذج ولوحات تحليلية للمنظمات غير الربحية',
    description:
      'احصل على أدوات تقييم احترافية للمنظمات غير الربحية. نماذج إكسل، لوحات تحليلية، وقوالب Power BI جاهزة لقياس وتحسين الأداء المؤسسي.',
    ogTitle: 'أدوات أداء - نماذج ولوحات تحليلية احترافية',
    ogDescription: 'أدوات تقييم احترافية للمنظمات غير الربحية تشمل نماذج إكسل، لوحات تحليلية، وقوالب Power BI.'
  });

  return (
    <>
      <ToolsHeroSection />
      <ExcelSheetsSection
        items={toolsQueries[0]?.data?.data.data || []}
        isLoading={toolsQueries[0]?.isLoading}
        isError={toolsQueries[0].isError}
        refetch={toolsQueries[0].refetch}
      />
      <DashboardsSection
        isError={toolsQueries[1].isError}
        refetch={toolsQueries[1].refetch}
        items={toolsQueries[1]?.data?.data.data || []}
        isLoading={toolsQueries[1]?.isLoading}
      />
      <PoweBiSection
        items={toolsQueries[2]?.data?.data.data || []}
        isLoading={toolsQueries[2]?.isLoading}
        isError={toolsQueries[2].isError}
        refetch={toolsQueries[2].refetch}
      />
      <ToolsGuideSection />
    </>
  );
}
