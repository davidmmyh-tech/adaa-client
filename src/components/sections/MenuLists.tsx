import { lgMenuItems, mdMenuItems, xlMenuItems, xxlMenuItems } from '@/constants/menus';
import { isHere } from '@/lib/utils';
import { ChevronLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router';

export function MdMenuList() {
  const location = useLocation();

  return mdMenuItems.map((item) => (
    <li
      key={item.name}
      className={`rounded-md px-2 py-2 font-semibold ${isHere(item.to, location.pathname) ? 'text-primary bg-[#B98F4B]' : ''}`}
    >
      <ChevronLeft size={18} className="me-3 mb-1 inline-block md:hidden" />
      <Link to={item.to}>{item.name}</Link>
    </li>
  ));
}

export function LgMenuList() {
  const location = useLocation();

  return lgMenuItems.map((item) => (
    <li
      key={item.name}
      className={`rounded-md px-2 py-2 font-semibold ${isHere(item.to, location.pathname) ? 'text-primary bg-secondary' : ''}`}
    >
      <ChevronLeft size={18} className="me-3 mb-1 inline-block lg:hidden" />
      <Link to={item.to}>{item.name}</Link>
    </li>
  ));
}

export function XlMenuList() {
  const location = useLocation();

  return xlMenuItems.map((item) => (
    <li
      key={item.name}
      className={`rounded-md px-2 py-2 font-semibold ${isHere(item.to, location.pathname) ? 'text-primary bg-secondary' : ''}`}
    >
      <ChevronLeft size={18} className="me-3 mb-1 inline-block xl:hidden" />
      <Link to={item.to}>{item.name}</Link>
    </li>
  ));
}

export function XXlMenuList() {
  const location = useLocation();

  return xxlMenuItems.map((item) => (
    <li
      key={item.name}
      className={`rounded-md px-2 py-2 font-semibold ${isHere(item.to, location.pathname) ? 'text-primary bg-secondary' : ''}`}
    >
      <ChevronLeft size={18} className="me-3 mb-1 inline-block 2xl:hidden" />
      <Link to={item.to}>{item.name}</Link>
    </li>
  ));
}
