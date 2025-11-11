import { AskingIcon } from '@/components/ui/icons';

const questions = [
  {
    q: 'ما هي مدة المسابقة؟',
    a: 'تبدأ المسابقة في [التاريخ] وتنتهي في [التاريخ].'
  },
  {
    q: 'كيف يتم التقييم؟',
    a: 'يتم التقييم بناءً على معايير محددة تشمل الابتكار، التأثير الاجتماعي، الاستدامة المالية، والقيادة الاستراتيجية.'
  },
  {
    q: 'ما هي الجوائز؟',
    a: 'الجوائز هي بطاقات كريدت لدعم المشاريع في المسرعة.'
  }
];

export default function CommonQuestion() {
  return (
    <section className="bg-primary text-primary-foreground p-8">
      <div className="container flex justify-between">
        <div>
          <h4 className="text-3xl font-semibold">الأسئلة الشائعة</h4>
          <ul className="mt-8 space-y-4">
            {questions.map((question, index) => (
              <li key={index} className="space-y-2">
                <strong>{question.q}</strong>
                <p>{question.a}</p>
              </li>
            ))}
          </ul>
        </div>
        <AskingIcon className="hidden md:block" size={250} />
      </div>
    </section>
  );
}
