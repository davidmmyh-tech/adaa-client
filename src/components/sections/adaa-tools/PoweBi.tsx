import { powerBiIcon } from '@/assets/icons';
import Img from '@/components/ui/extend/Img';
import UserStateButton from '@/components/ui/extend/UserStateButton';
import DataWrapper from '@/layouts/DataWrapper';
import { downloadTool, type Tool } from '@/services/tools';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { Download } from 'lucide-react';
import { memo } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

type Props = {
  items: Tool[];
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
};

export default function PoweBiSection({ items, isLoading, isError, refetch }: Props) {
  return (
    <section className="container">
      <div className="py-8">
        <h4 className="text-2xl font-semibold">
          <img src={powerBiIcon} alt="Power BI Icon" className="mr-2 inline-block h-6 w-6" /> نماذج Power BI لقياس
          وتحليل الأداء
        </h4>

        <p>
          في هذا القسم، نقدم نماذج Power BI المتقدمة التي توفر أدوات تحليلية لقياس وتحليل الأداء المؤسسي بشكل عميق. تتيح
          لك هذه النماذج إنشاء تقارير وتحليل البيانات بشكل تفاعلي.
        </p>
      </div>

      <DataWrapper isEmpty={!items.length} isLoading={isLoading} isError={isError} retry={refetch}>
        <div className="space-y-2">
          {items.map((t, index) => (
            <PowerBiCard
              key={t.id}
              index={index}
              id={t.id}
              title={t.headline}
              description={t.description}
              image={t.image}
            />
          ))}
        </div>
      </DataWrapper>
    </section>
  );
}

type CardProps = {
  index: number;
  title: string;
  description: string;
  image: string;
  id: number;
};

const PowerBiCard = memo(function PowerBiCard({ index, title, description, image, id }: CardProps) {
  const navigate = useNavigate();
  const downloadMutation = useMutation({
    mutationKey: ['download-dashboard-design', id],
    mutationFn: () => downloadTool(id, 'tools'),
    onError: (err) => {
      if (isAxiosError(err)) {
        if (err.response?.status === 404) toast.error('عذرًا، الملف الذي تحاول تنزيله غير متوفر حالياً.');
        if (err.response?.status === 403) navigate('/اشتراكاشتراك-اداء-المميز');
      } else toast.error('حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى لاحقًا.');
    }
  });

  return (
    <div
      className={`bg-primary text-primary-foreground flex flex-col gap-8 rounded-2xl p-8 md:flex-row ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
    >
      <Img src={image} alt="Coming Soon" className="aspect-square h-60 rounded-xl object-cover" />
      <div className="grow">
        <p className="text-xl font-semibold">{title}</p>
        <p>{description}</p>
      </div>
      <div className={`flex flex-col items-end ${index % 2 === 1 ? 'lg:items-start' : 'lg:items-end'}`}>
        <img
          src={powerBiIcon}
          alt="Power BI Icon"
          className="hidden h-32 w-32 brightness-0 saturate-100 md:block"
          style={{ filter: 'invert(78%) sepia(85%) saturate(1586%) hue-rotate(359deg) brightness(102%) contrast(95%)' }}
        />
        <UserStateButton
          useAdaaPlus
          className="border-secondary text-primary h-14 bg-[#F5CA0C]"
          onClick={() => downloadMutation.mutate()}
          isLoading={downloadMutation.isPending}
        >
          <div className="flex items-center gap-2">
            تحميل التصميم <Download />
          </div>
        </UserStateButton>
      </div>
    </div>
  );
});
