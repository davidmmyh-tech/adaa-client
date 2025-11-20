import UserStateButton from '@/components/ui/extend/UserStateButton';
import { formatPeriodInArabic, parsedDate } from '@/lib/utils';
import { getCertificatesSchedules } from '@/services/certificates/certificates-data';
import { useQuery } from '@tanstack/react-query';

export default function CertificatesScheduleSection() {
  const { data } = useQuery({
    queryKey: ['certificates-schedules'],
    queryFn: () => getCertificatesSchedules()
  });

  const schedule = data?.data.data[0];

  return (
    <section className="bg-muted/10">
      <div className="illustration-background">
        <div className="container space-y-8 py-8">
          <h5 className="text-center text-2xl font-semibold">الجدول الزمني الرسمي 2026</h5>
          {schedule && (
            <div className="grid grid-cols-4 gap-x-8 gap-y-4">
              <ScheduleCard
                title="فتح باب التقديم"
                from={parsedDate(schedule.submission_start_date)}
                period={formatPeriodInArabic(
                  new Date(schedule.submission_end_date).getTime() - new Date(schedule.submission_start_date).getTime()
                )}
                details={schedule.submission_note}
              />
              <ScheduleCard
                title="إغلاق التقديم"
                from={parsedDate(schedule.submission_end_date)}
                period="______"
                details={schedule.submission_end_note}
              />
              <ScheduleCard
                title="لتقييم الإلكتروني"
                from={parsedDate(schedule.evaluation_start_date)}
                period={formatPeriodInArabic(
                  new Date(schedule.evaluation_end_date).getTime() - new Date(schedule.evaluation_start_date).getTime()
                )}
                details={schedule.evaluation_note}
              />
              <ScheduleCard
                title="فتح باب التقديم"
                from={parsedDate(schedule.announcement_date)}
                period="_______"
                details={schedule.announcement_note}
              />
            </div>
          )}

          <div className="card text-primary-foreground mx-auto max-w-xl bg-[#6062A7] px-4">
            <div className="w-full space-y-4 text-start">
              <p> 🗓️ تسليم شهادات الأداء</p>
              <p className="space-x-8">
                <span>
                  <span className="font-semibold">التاريخ:</span>
                  {parsedDate(schedule?.awarding_start_date)}{' '}
                </span>
                <span>
                  <span className="font-semibold">المده:</span>
                  {schedule
                    ? formatPeriodInArabic(
                        new Date(schedule.awarding_end_date).getTime() -
                          new Date(schedule.awarding_start_date).getTime()
                      )
                    : ''}
                </span>
              </p>
              <p>
                <span className="font-semibold">التفاصيل:</span>
                {schedule?.awarding_note}
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <UserStateButton to="/شهادات-اداء/تقييم" className="bg-secondary w-40">
              أبداء الآن
            </UserStateButton>
          </div>
        </div>
      </div>
    </section>
  );
}

type ScheduleCardProps = {
  title: string;
  from: string;
  period: string;
  details: string;
};

function ScheduleCard({ title, from, period, details }: ScheduleCardProps) {
  return (
    <div className="card col-span-4 px-4 md:col-span-2 2xl:col-span-1">
      <div className="w-full space-y-4 text-start">
        <p className="font-semibold">🗓️ {title}</p>
        <p className="space-x-6">
          <span>
            <span className="font-semibold">التاريخ:</span>
            {from}
          </span>
          <span>
            <span className="font-semibold">المده:</span>
            {period}
          </span>
        </p>
        <p>
          <span className="font-semibold">التفاصيل:</span> {details}
        </p>
      </div>
    </div>
  );
}
