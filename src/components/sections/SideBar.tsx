import useOutsideClick from '@/hooks/useOutsideClick';
import { cn } from '@/lib/utils';
import { useRef } from 'react';
import { LgMenuList, MdMenuList, XlMenuList, XXlMenuList } from './MenuLists';
import { X } from 'lucide-react';
import { Button } from '../ui/button';

type Props = { isOpen: boolean; onClose: () => void };

export default function SideBar({ isOpen, onClose }: Props) {
  const asideRef = useRef<HTMLElement>(null);
  useOutsideClick({ containerRef: asideRef, onOutsideClick: onClose });

  return (
    <>
      {/* Overlay*/}
      <div
        className={`fixed inset-0 z-40 bg-black transition-all 2xl:hidden ${isOpen ? 'opacity-50' : 'pointer-events-none opacity-0'}`}
      />

      <aside
        ref={asideRef}
        className={cn(
          'bg-background fixed top-0 bottom-0 z-50 block w-80 space-y-2 border-e p-6 drop-shadow-2xl transition-all 2xl:hidden',
          isOpen ? 'start-0' : '-start-80'
        )}
      >
        <div>
          <Button variant="link" onClick={onClose}>
            <X />
          </Button>
        </div>
        <ul className="text-primary [&>li]:hover:bg-secondary [&>li]:hover:text-primary-foreground flex flex-col md:hidden">
          <MdMenuList />
        </ul>
        <ul className="text-primary [&>li]:hover:bg-secondary [&>li]:hover:text-primary-foreground flex flex-col lg:hidden">
          <LgMenuList />
        </ul>
        <ul className="text-primary [&>li]:hover:bg-secondary [&>li]:hover:text-primary-foreground flex flex-col xl:hidden">
          <XlMenuList />
        </ul>
        <ul className="text-primary [&>li]:hover:bg-secondary [&>li]:hover:text-primary-foreground flex flex-col 2xl:hidden">
          <XXlMenuList />
        </ul>
      </aside>
    </>
  );
}
