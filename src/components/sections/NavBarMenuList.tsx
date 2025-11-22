import { lgMenuItems, mdMenuItems } from '@/constants/menus';
import { isActiveRoute } from '@/routes';
import { ChevronDown, Play } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router';

export function MdNavBarMenuList() {
  const location = useLocation();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const handleMouseEnter = (itemName: string) => {
    setOpenSubmenu(itemName);
  };

  const handleMouseLeave = () => {
    setOpenSubmenu(null);
  };

  return mdMenuItems.map((item) => (
    <li
      key={item.name}
      className={`relative rounded-md px-2 py-2 font-semibold whitespace-nowrap ${item.to && isActiveRoute(location.pathname, item.to) ? 'text-primary bg-accent md:bg-secondary' : 'cursor-default'}`}
      onMouseEnter={item.subMenu ? () => handleMouseEnter(item.name) : undefined}
      onMouseLeave={item.subMenu ? handleMouseLeave : undefined}
    >
      {item.to ? (
        <Link to={item.to}>{item.name}</Link>
      ) : item.subMenu ? (
        <span className="cursor-pointer">
          {item.name}
          <ChevronDown size={18} className="me-1 inline-block" />
        </span>
      ) : (
        item.name
      )}
      {item.subMenu && (
        <div className={`text-primary absolute top-8 z-20 ${openSubmenu === item.name ? 'block' : 'hidden'}`}>
          <ul className="border-muted/10 relative mt-6 space-y-2 rounded-lg border bg-white p-4 shadow-lg">
            <Play size={11} className="absolute top-[-9px] -rotate-90 fill-white stroke-white" />
            {item.subMenu.map((subItem) => (
              <li
                key={subItem.name}
                className={`hover:bg-secondary hover:text-secondary-foreground rounded-md px-2 py-2 font-semibold ${subItem.to && isActiveRoute(location.pathname, subItem.to) ? 'text-secondary-foreground bg-secondary' : ''}`}
              >
                {subItem.to && <Link to={subItem.to}>{subItem.name}</Link>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  ));
}

export function LgNavBarMenuList() {
  const location = useLocation();

  return lgMenuItems.map((item) => (
    <li
      key={item.name}
      className={`rounded-md px-2 py-2 font-semibold whitespace-nowrap ${item.to && isActiveRoute(location.pathname, item.to) ? 'text-primary bg-accent lg:bg-secondary' : ''}`}
    >
      {item.to ? <Link to={item.to}>{item.name}</Link> : item.name}
    </li>
  ));
}
