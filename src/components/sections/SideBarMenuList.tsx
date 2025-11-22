import { lgMenuItems, mdMenuItems } from '@/constants/menus';
import { isActiveRoute } from '@/routes';
import { ChevronDown, ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router';

export function MdSideBarMenuList({ onClose }: { onClose?: () => void }) {
  const location = useLocation();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (itemName: string) => {
    setOpenSubmenu(openSubmenu === itemName ? null : itemName);
  };

  return mdMenuItems.map((item) => (
    <li
      key={item.name}
      className={`relative ${item.to && isActiveRoute(location.pathname, item.to) ? 'bg-secondary text-secondary-foreground rounded-md' : ''}`}
    >
      {item.to ? (
        <Link
          to={item.to}
          onClick={onClose}
          className="hover:bg-secondary hover:text-secondary-foreground block rounded-md px-2 py-2 font-semibold whitespace-nowrap"
        >
          <ChevronLeft size={18} className="me-3 mb-1 inline-block" />
          {item.name}
        </Link>
      ) : item.subMenu ? (
        <>
          <button
            type="button"
            onClick={() => toggleSubmenu(item.name)}
            className="hover:bg-secondary hover:text-secondary-foreground block w-full cursor-pointer touch-manipulation rounded-md px-2 py-2 text-start font-semibold whitespace-nowrap"
          >
            <ChevronDown size={18} className="me-1 inline-block" />
            {item.name}
          </button>
          {openSubmenu === item.name && (
            <ul className="border-muted/10 mt-2 space-y-2 rounded-lg border bg-white p-4">
              {item.subMenu.map((subItem) => (
                <li key={subItem.name}>
                  {subItem.to && (
                    <Link
                      to={subItem.to}
                      onClick={onClose}
                      className={`block rounded-md px-2 py-2 font-semibold ${isActiveRoute(location.pathname, subItem.to) ? 'bg-secondary text-secondary-foreground' : 'hover:bg-secondary hover:text-secondary-foreground'}`}
                    >
                      <ChevronLeft size={18} className="me-3 mb-1 inline-block" />
                      {subItem.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        item.name
      )}
    </li>
  ));
}

export function LgSideBarMenuList({ onClose }: { onClose?: () => void }) {
  const location = useLocation();

  return lgMenuItems.map((item) => (
    <li key={item.name}>
      {item.to ? (
        <Link
          to={item.to}
          onClick={onClose}
          className={`block rounded-md px-2 py-2 font-semibold whitespace-nowrap ${isActiveRoute(location.pathname, item.to) ? 'bg-secondary text-secondary-foreground' : 'hover:bg-secondary hover:text-secondary-foreground'}`}
        >
          <ChevronLeft size={18} className="me-3 mb-1 inline-block" />
          {item.name}
        </Link>
      ) : (
        <span className="block px-2 py-2 font-semibold whitespace-nowrap">{item.name}</span>
      )}
    </li>
  ));
}
