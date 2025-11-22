import { cn } from '@/lib/utils';
import { useRef } from 'react';
import { LgSideBarMenuList, MdSideBarMenuList } from './SideBarMenuList';
import { X } from 'lucide-react';
import { Button } from '../ui/button';

type Props = { isOpen: boolean; onClose: () => void };

export default function SideBar({ isOpen, onClose }: Props) {
  const asideRef = useRef<HTMLElement>(null);

  return (
    <>
      {/* Overlay*/}
      <div
        onClick={() => onClose()}
        className={`fixed inset-0 z-40 bg-black transition-all 2xl:hidden ${isOpen ? 'opacity-50' : 'pointer-events-none opacity-0'}`}
      />

      <aside
        ref={asideRef}
        className={cn(
          'bg-background fixed top-0 bottom-0 z-50 block w-96 space-y-4 border-e p-6 drop-shadow-2xl transition-all 2xl:hidden',
          isOpen ? 'start-0' : '-start-96'
        )}
      >
        <div>
          <Button variant="link" onClick={onClose}>
            <X />
          </Button>
        </div>
        <ul className="text-primary flex flex-col space-y-4 md:hidden">
          <MdSideBarMenuList onClose={onClose} />
        </ul>
        <ul className="text-primary flex flex-col space-y-4 lg:hidden">
          <LgSideBarMenuList onClose={onClose} />
        </ul>
      </aside>
    </>
  );
}
