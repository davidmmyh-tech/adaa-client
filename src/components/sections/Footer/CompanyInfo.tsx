import { LocateFixedIcon, Mail, PhoneCall } from 'lucide-react';
import { Link } from 'react-router';

export default function CompanyInfo() {
  return (
    <div className="basis-4/12">
      <h5 className="mb-12 text-3xl">تواصل معنا</h5>
      <ul className="space-y-6">
        <li>
          <div className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground h-10 w-10 shrink-0 rounded-full p-2">
              <LocateFixedIcon />
            </div>
            <span className="text-lg font-semibold">قم بزيارتنا</span>
          </div>
          <Link to={''} target="_blank" className="">
            مجمع ريفا للأعمال - حي النزهة بمدينة جدة- المملكة العربية السعودية
          </Link>
        </li>
        <li>
          <div className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground h-10 w-10 shrink-0 rounded-full p-2">
              <Mail />
            </div>
            <span className="text-lg font-semibold">أرسل لنا</span>
          </div>
          <Link to="mailto:admin@birthofdream.com" className="hover:underline">
            admin@birthofdream.com
          </Link>
        </li>
        <li>
          <div className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground h-10 w-10 shrink-0 rounded-full p-2">
              <PhoneCall />
            </div>
            <span className="text-lg font-semibold">اتصل بنا</span>
          </div>
          <Link to="tel:+966560086999" className="text-end hover:underline" dir="ltr">
            (+966) 56 008 6999
          </Link>
        </li>
      </ul>
    </div>
  );
}
