import UserStateButton from '@/components/ui/extend/UserStateButton';

export default function CertificatesScheduleSection() {
  return (
    <section className="bg-muted/10">
      <div className="illustration-background">
        <div className="container space-y-8 py-8">
          <h5 className="text-center text-2xl font-semibold">الجدول الزمني الرسمي 2026</h5>
          <div className="grid grid-cols-4 gap-x-8 gap-y-4">
            <ScheduleCard
              title="فتح باب التقديم"
              from="1 يناير 2026"
              period="8 أسابيع"
              details="بدء استقبال النماذج إلكترونيًا."
            />
            <ScheduleCard
              title="إغلاق التقديم"
              from="28 فبراير 2026"
              period="______"
              details="آخر موعد للتقديم ورفع الشواهد."
            />
            <ScheduleCard
              title="لتقييم الإلكتروني"
              from="1 – 25 مارس 2026"
              period="3 أسابيع"
              details="مراجعة وتحليل النتائج إلكترونيًا."
            />
            <ScheduleCard
              title="فتح باب التقديم"
              from=" 1 أبريل 2026"
              period="_______"
              details="إعلان الجمعيات الحاصلة على الشهادات"
            />
          </div>

          <div className="card text-primary-foreground mx-auto max-w-xl bg-[#6062A7] px-4">
            <div className="w-full space-y-4 text-start">
              <p> 🗓️ تسليم شهادات الأداء</p>
              <p className="space-x-8">
                <span>
                  <span className="font-semibold">التاريخ:</span>2 – 5 أبريل 2026
                </span>
                <span>
                  <span className="font-semibold">المده:</span>
                  أسبوع واحد
                </span>
              </p>
              <p>
                <span className="font-semibold">التفاصيل:</span> تُرسل إلكترونيًا إلى لوحة الجمعية في المنصة.
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

function ScheduleCard({
  title,
  from,
  period,
  details
}: {
  title: string;
  from: string;
  period: string;
  details: string;
}) {
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
