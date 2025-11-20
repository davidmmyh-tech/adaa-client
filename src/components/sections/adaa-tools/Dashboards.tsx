import Img from '@/components/ui/extend/Img';
import Logo from '@/components/ui/extend/Logo';
import UserStateButton from '@/components/ui/extend/UserStateButton';
import { downloadTool, type Tool } from '@/services/tools';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { Brackets, Download } from 'lucide-react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { Fragment } from 'react/jsx-runtime';

type Props = {
  items: Tool[];
  isLoading: boolean;
};

export default function DashboardsSection({ items, isLoading }: Props) {
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

        {isLoading ? (
          <div className="flex h-48 items-center justify-center">
            <Logo isLoading />
          </div>
        ) : items.length > 0 ? (
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
        ) : (
          <div className="flex flex-col items-center gap-8 py-24">
            <Brackets size={80} className="stroke-primary" />
            <p className="text-primary text-center text-4xl font-semibold">لا توجد تصاميم متاحة حالياً.</p>
          </div>
        )}
      </div>
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

function DashboardCard({ title, description, image, id }: CardProps) {
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
}
