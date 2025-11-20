import DashboardsSection from '@/components/sections/adaa-tools/Dashboards';
import ExcelSheetsSection from '@/components/sections/adaa-tools/ExcelSheets';
import PoweBiSection from '@/components/sections/adaa-tools/PoweBi';
import ToolsGuideSection from '@/components/sections/adaa-tools/ToolsGuide';
import ToolsHeroSection from '@/components/sections/adaa-tools/ToolsHero';
import { getTools } from '@/services/tools';
import { useQueries } from '@tanstack/react-query';
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

  return (
    <>
      <ToolsHeroSection />
      <ExcelSheetsSection items={toolsQueries[0]?.data?.data.data || []} isLoading={toolsQueries[0]?.isLoading} />
      <DashboardsSection items={toolsQueries[1]?.data?.data.data || []} isLoading={toolsQueries[1]?.isLoading} />
      <PoweBiSection items={toolsQueries[2]?.data?.data.data || []} isLoading={toolsQueries[2]?.isLoading} />
      <ToolsGuideSection />
    </>
  );
}
