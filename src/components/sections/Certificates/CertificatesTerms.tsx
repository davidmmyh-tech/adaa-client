import { CheckCircle } from 'lucide-react';

export default function CertificatesTermsSection() {
  return (
    <section className="bg-primary text-primary-foreground mb-0">
      <div className="container py-8">
        <h3 className="text-primary-foreground mb-6 text-2xl font-bold">📋 شروط المشاركة:</h3>
        <div className="flex justify-between">
          <ol className="list-decimal space-y-8 ps-4 text-lg font-semibold">
            <li className="ps-4">الجمعية مسجلة رسميًا في المركز الوطني لتنمية القطاع غير الربحي.</li>
            <li className="ps-4">يمكن التقديم لمسار واحد أو أكثر.</li>
            <li className="ps-4">الالتزام بالمواعيد النهائية دون تأخير.</li>
          </ol>
          <CheckCircle size={200} className="hidden opacity-40 sm:block" />
        </div>
      </div>
    </section>
  );
}
