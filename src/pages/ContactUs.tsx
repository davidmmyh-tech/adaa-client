import { ContactusForm } from '@/components/sections/contact-forms/ContactusForm';
import SponsorshipSubmissionForm from '@/components/sections/contact-forms/SponsorshipForm';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function ContactUsPage() {
  const [selectedForm, setSelectedForm] = useState<'تقديم-رعاية' | 'اتصل-بنا'>('تقديم-رعاية');

  return (
    <>
      <header className="relative flex h-screen max-h-[650px] items-center justify-center bg-black">
        <div className="contactus-hero-background absolute inset-0 opacity-50"></div>
        <div className="z-20 container flex h-full flex-col items-center justify-center space-y-4 px-4 text-center text-white">
          <h1 className="text-4xl font-bold md:text-5xl">تواصل معنا</h1>
          <p className="text-lg md:text-xl">
            يسرنا في أداء أن نكون على تواصل مباشر معكم , و استقبال طلبات الرعاية و الشراكات التي تدعم رحلتنا في رفع
            كفاءة القطاع غير الربحي و تعزيز أثره المستدام
          </p>
        </div>
      </header>

      <div className="container">
        <div className="flex justify-center space-x-4 py-12">
          <Button
            variant="outline"
            className={cn(
              'border-muted text-muted w-64 rounded-2xl py-12',
              selectedForm === 'تقديم-رعاية' && 'bg-secondary/10 border-secondary text-secondary'
            )}
            onClick={() => setSelectedForm('تقديم-رعاية')}
          >
            تقديم رعاية
          </Button>
          <Button
            variant="outline"
            className={cn(
              'border-muted text-muted w-64 rounded-2xl py-12',
              selectedForm !== 'تقديم-رعاية' && 'bg-secondary/10 border-secondary text-secondary'
            )}
            onClick={() => setSelectedForm('اتصل-بنا')}
          >
            اتصل بنا
          </Button>
        </div>

        <div className="space-y-2">
          {selectedForm === 'اتصل-بنا' ? <ContactusForm /> : <SponsorshipSubmissionForm />}
        </div>
      </div>
    </>
  );
}
