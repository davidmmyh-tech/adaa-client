import { shieldImage } from '@/assets/images';
import UserStateButton from '@/components/ui/extend/UserStateButton';
import { ROUTES } from '@/routes';

const prizes = [
  {
    prizeValue: 15000,
    shield: 'ذهبي'
  },
  {
    prizeValue: 10000,
    shield: 'فضي'
  },
  {
    prizeValue: 5000,
    shield: 'برونزي'
  }
];

export default function PrizesSection() {
  return (
    <section className="relative">
      <div className="absolute -top-52" id="prizes" />
      <div className="bg-accent text-primary pb-20">
        <div className="container flex flex-col-reverse items-center gap-8 p-8 sm:flex-row sm:items-start">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold"> الجوائز التي سيتم منحها</h3>
            <p className="font-semibold">
              نحن في جائزة درع أداء نقدم جوائز قيّمة لتمكين المنظمات غير الربحية من توسيع تأثيرها وتحقيق أهدافها. سيتم
              منح الجوائز المالية على شكل بطاقات كريدت تُستخدم في مسرعة أثر وريادة لدعم تطوير المشاريع.
            </p>
            <UserStateButton to={ROUTES.ADAA_SHIELD.ASSESSMENT} variant="default" className="mx-auto flex w-40">
              أبداء الآن
            </UserStateButton>
          </div>
          <img src={shieldImage} alt="Prizes" className="h-52 rounded-lg object-contain sm:h-64" />
        </div>
      </div>
      <div className="container">
        <div className="bg-primary text-primary-foreground mx-auto -mt-24 flex max-w-4xl flex-col justify-around gap-8 rounded-2xl p-8 sm:flex-row">
          {prizes.map((prize) => (
            <div key={prize.shield} className="space-y-8 text-center">
              <div className="text-4xl font-semibold">{prize.prizeValue} ريال</div>
              <div className="text-sm font-semibold">+ درع {prize.shield}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
