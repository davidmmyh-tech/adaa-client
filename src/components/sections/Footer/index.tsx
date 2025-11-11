import { backGroundtexture } from '@/assets/images';
import HSplit from '@/components/ui/h-split';
import InquiryForm from './InquiryForm';
import CompanyInfo from './CompanyInfo';
import Socials from './Socials';
import Map from './Map';

export default function Footer() {
  return (
    <footer>
      <div className="bg-accent text-primary-foreground py-1">
        <div className="bg- bod-logo-split h-20"></div>
      </div>

      <div className="container flex flex-col gap-4 py-4 md:flex-row md:items-stretch md:justify-between md:gap-8">
        <CompanyInfo />
        <Map />
      </div>

      <div className="bg-primary text-primary-foreground relative">
        <img
          src={backGroundtexture}
          alt="Background Texture"
          className="absolute inset-0 z-0 h-full w-full object-cover"
        />

        <div className="relative z-20 container flex flex-col justify-between space-y-4 py-8 sm:flex-row">
          <Socials />
          <InquiryForm />
        </div>

        <HSplit className="border-none opacity-35" />

        <p className="py-4 text-center text-xs font-medium text-gray-300">
          جميع الحقوق محفوظة لدى منصة أداء © By Birth Of Dream Company
        </p>
      </div>
    </footer>
  );
}
