import Img from '@/components/ui/extend/Img';
import UserStateButton from '@/components/ui/extend/UserStateButton';
import DataWrapper from '@/layouts/DataWrapper';
import type { Id } from '@/schemas/types';
import { downloadTool, type Tool } from '@/services/tools';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { Download } from 'lucide-react';
import { memo } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { Fragment } from 'react/jsx-runtime';

type Props = {
  items: Tool[];
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
};

export default function DashboardsSection({ items, isLoading, refetch, isError }: Props) {
  return (
    <section className="bg-accent pt-8 pb-24">
      <div className="container space-y-12">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">تصاميم لوحات داش بورد لقياس الأداء</h1>
          <p>
            في هذا القسم، نقدم مجموعة من تصاميم لوحات الداش بورد التي تستخدم لعرض وتحليل مؤشرات الأداء بشكل مرئي. يمكن
            تخصيص هذه التصاميم لتناسب احتياجات مؤسستك، من خلال الرسومات البيانية والمخططات التفاعلية.
          </p>
        </div>

        <DataWrapper isEmpty={!items.length} isLoading={isLoading} isError={isError} retry={refetch}>
          <div className="mx-auto grid max-w-5xl gap-8 gap-y-18 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((t, index) => (
              <Fragment key={t.id}>
                <DashboardCard
                  id={t.id}
                  key={index}
                  index={index}
                  description={t.description}
                  title={t.headline}
                  image={t.image}
                />
              </Fragment>
            ))}
          </div>
        </DataWrapper>
      </div>
    </section>
  );
}

type CardProps = {
  index: number;
  title: string;
  description: string;
  image: string;
  id: Id;
};

const DashboardCard = memo(function DashboardCard({ title, description, image, id }: CardProps) {
  const navigate = useNavigate();
  const downloadMutation = useMutation({
    mutationKey: ['download-dashboard-design', id],
    mutationFn: () => downloadTool(id, 'dashboards'),
    onError: (err) => {
      if (isAxiosError(err)) {
        if (err.response?.status === 404) toast.error('عذرًا، الملف الذي تحاول تنزيله غير متوفر حالياً.');
        if (err.response?.status === 403) navigate('/اشتراك-اداء-المميز');
      } else toast.error('حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى لاحقًا.');
    }
  });

  return (
    <div>
      <div className="space-y-6 rounded-3xl bg-white p-4 pb-12 shadow-md">
        <Img src={image} alt="dashboard design" className="aspect-square w-full rounded-3xl object-cover" />
        <div className="space-y-4">
          <p className="font-semibold">{title}</p>
          <p className="text-sm">{description}</p>
        </div>
      </div>

      <div className="-mt-6 flex w-full justify-center">
        <UserStateButton
          useAdaaPlus
          className="border-secondary -mb-24 h-14"
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
