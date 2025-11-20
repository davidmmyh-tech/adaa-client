import Img from '@/components/ui/extend/Img';
import Logo from '@/components/ui/extend/Logo';
import UserStateButton from '@/components/ui/extend/UserStateButton';
import HSplit from '@/components/ui/h-split';
import SubmitButton from '@/components/ui/submit-button';
import { cn } from '@/lib/utils';
import { downloadTool, type Tool } from '@/services/tools';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { Brackets, Download, Eye } from 'lucide-react';
import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

type Props = {
  items: Tool[];
  isLoading: boolean;
};

export default function ExcelSheetsSection({ items, isLoading }: Props) {
  const [viewMore, setViewMore] = useState(false);

  const topItems = items.slice(0, 3);
  const restOfItems = items.slice(3);
  return (
    <section className="space-y-8 py-8">
      <div className="container space-y-4">
        <h2 className="text-2xl font-semibold">نماذج إكسل لقياس الأداء</h2>
        <p>
          تقدم هذه المجموعة من نماذج إكسل أدوات متقدمة لقياس الأداء المؤسسي. سواء كنت تبحث عن نموذج لتحديد مؤشرات الأداء
          الرئيسية (KPIs)، متابعة الميزانية، أو تحليل العوائد المالية، ستجد النموذج المناسب لاحتياجاتك.
        </p>
      </div>

      <div className="bg-primary py-14">
        {isLoading && (
          <div className="flex h-96 items-center justify-center">
            <Logo isLoading className="h-28 w-28" />
          </div>
        )}

        {topItems.length > 0 ? (
          <div className="text-primary-foreground container">
            {topItems.map((t, index) => (
              <Fragment key={t.id}>
                <ExcelCard
                  id={t.id}
                  key={index}
                  index={index}
                  description={t.description}
                  title={t.headline}
                  image={t.image}
                />
                {index < items.length - 1 && <HSplit className="mt-6 mb-12 opacity-40" />}
              </Fragment>
            ))}

            {viewMore &&
              restOfItems.map((t, index) => (
                <Fragment key={t.id}>
                  <ExcelCard
                    id={t.id}
                    key={index + 3}
                    index={index + 3}
                    description={t.description}
                    title={t.headline}
                    image={t.image}
                  />
                  {index < restOfItems.length - 1 && <HSplit className="mt-6 mb-12 opacity-40" />}
                </Fragment>
              ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-8 py-24">
            <Brackets size={80} className="stroke-primary-foreground" />
            <p className="text-primary-foreground text-center text-4xl font-semibold">لا توجد نمازج متاحة حالياً.</p>
          </div>
        )}
      </div>

      <div className="flex h-16 justify-center">
        <SubmitButton onClick={() => setViewMore(!viewMore)} disabled={restOfItems.length === 0} className="w-52">
          <div className="flex items-center gap-2">
            {viewMore ? 'عرض أقل' : 'عرض المزيد من النماذج'}
            <Eye />
          </div>
        </SubmitButton>
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

function ExcelCard({ index, title, description, image, id }: CardProps) {
  const navigate = useNavigate();
  const downloadMutation = useMutation({
    mutationKey: ['download-excel-sheet', id],
    mutationFn: () => downloadTool(id, 'models'),
    onError: (err) => {
      if (isAxiosError(err)) {
        if (err.response?.status === 404) toast.error('عذرًا، الملف الذي تحاول تنزيله غير متوفر حالياً.');
        if (err.response?.status === 403) navigate('/اشتراك-اداء-المميز');
      } else toast.error('حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى لاحقًا.');
    }
  });

  return (
    <Fragment>
      <div className={cn('flex flex-col gap-4 text-start lg:flex-row', index % 2 === 1 ? 'lg:flex-row-reverse' : '')}>
        <div className="flex w-full shrink-0 justify-center lg:w-auto">
          <div className="relative w-fit">
            <Img src={image} alt="s" className="h-60 w-96 rounded-lg object-cover" />
          </div>
        </div>
        <div className="flex grow flex-col gap-4">
          <p className="text-lg font-semibold">
            {index + 1}. {title}
          </p>
          <p className="font-light">{description}</p>
          <div className={`flex h-full items-end ${index % 2 === 1 ? 'lg:justify-start' : 'lg:justify-end'}`}>
            <UserStateButton
              to=""
              useAdaaPlus
              variant="secondary"
              className="border-secondary w-full sm:w-48"
              onClick={() => downloadMutation.mutate()}
              isLoading={downloadMutation.isPending}
            >
              <div className="flex items-center gap-2">
                تحميل النموذج <Download />
              </div>
            </UserStateButton>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
