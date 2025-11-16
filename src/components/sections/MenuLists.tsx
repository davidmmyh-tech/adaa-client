import { lgMenuItems, mdMenuItems } from '@/constants/menus';
import { isHere } from '@/lib/utils';
import { ChevronDown, ChevronLeft, Play } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router';

export function MdMenuList() {
  const location = useLocation();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (itemName: string) => {
    setOpenSubmenu(openSubmenu === itemName ? null : itemName);
  };

  const handleMouseEnter = (itemName: string) => {
    setOpenSubmenu(itemName);
  };

  const handleMouseLeave = () => {
    setOpenSubmenu(null);
  };

  return mdMenuItems.map((item) => (
    <li
      key={item.name}
      className={`relative rounded-md px-2 py-2 font-semibold whitespace-nowrap ${item.to && isHere(item.to, location.pathname) ? 'text-primary bg-accent md:bg-secondary' : 'cursor-default'}`}
      onMouseEnter={item.subMenu ? () => handleMouseEnter(item.name) : undefined}
      onMouseLeave={item.subMenu ? handleMouseLeave : undefined}
    >
      {item.to ? (
        <>
          <ChevronLeft size={18} className="me-3 mb-1 inline-block md:hidden" />
          <Link to={item.to}>{item.name}</Link>
        </>
      ) : item.subMenu ? (
        <>
          <button
            type="button"
            onClick={() => toggleSubmenu(item.name)}
            className="w-full touch-manipulation text-start"
          >
            <ChevronDown size={18} className="me-1 inline-block" />
            {item.name}
          </button>
        </>
      ) : (
        item.name
      )}
      {item.subMenu && (
        <div className={`text-primary top-8 z-20 md:absolute ${openSubmenu === item.name ? 'block' : 'hidden'}`}>
          <ul className="border-muted/10 relative mt-2 space-y-2 rounded-lg border bg-white p-4 md:mt-6 md:shadow-lg">
            <Play size={11} className="absolute top-[-9px] -rotate-90 fill-white stroke-white" />
            {item.subMenu.map((subItem) => (
              <li
                key={subItem.name}
                className={`hover:bg-secondary hover:text-secondary-foreground rounded-md px-2 py-2 font-semibold ${subItem.to && isHere(subItem.to, location.pathname) ? 'text-secondary-foreground bg-secondary' : ''}`}
              >
                <ChevronLeft size={18} className="me-3 mb-1 inline-block md:hidden" />
                {subItem.to && <Link to={subItem.to}>{subItem.name}</Link>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  ));
}

export function LgMenuList() {
  const location = useLocation();

  return lgMenuItems.map((item) => (
    <li
      key={item.name}
      className={`rounded-md px-2 py-2 font-semibold whitespace-nowrap ${item.to && isHere(item.to, location.pathname) ? 'text-primary bg-accent lg:bg-secondary' : ''}`}
    >
      <ChevronLeft size={18} className="me-3 mb-1 inline-block lg:hidden" />
      {item.to ? <Link to={item.to}>{item.name}</Link> : item.name}
    </li>
  ));
}
