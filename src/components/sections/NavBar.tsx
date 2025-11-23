import Logo from '../ui/extend/Logo';
import { Menu } from 'lucide-react';
import { Button } from '../ui/button';
import { MdNavBarMenuList, LgNavBarMenuList } from './NavBarMenuList';
import { useUserState } from '@/context/UserProvider';
import useScrollEffect from '@/hooks/useScrollEffect';
import LogoutButton from '../ui/extend/LogoutButton';

type Props = { onOpenSideBar: () => void };

export default function NavBar({ onOpenSideBar }: Props) {
  const { isLoading } = useUserState();
  const { isScrollingDown } = useScrollEffect();

  return (
    <nav
      className={`fixed top-4 z-30 w-screen transition-transform duration-300 ${isScrollingDown ? '-translate-y-24' : 'translate-y-0'}`}
    >
      <div className="container flex text-sm lg:justify-center">
        <div
          className={
            'bg-secondary z-20 flex h-14 w-full items-center justify-between gap-2 rounded-2xl px-4 shadow-md lg:justify-center'
          }
        >
          <div className="flex grow items-center gap-4 lg:grow-0">
            <Logo variant="light" isLoading={isLoading} className="inline-block h-10 w-10" />
            <UserMenu onOpenSideBar={onOpenSideBar} />
          </div>
        </div>
      </div>
    </nav>
  );
}

function UserMenu({ onOpenSideBar }: Props) {
  return (
    <div className="flex w-full justify-between">
      <div className="flex items-center gap-1">
        <ul className="text-primary-foreground hidden md:inline-flex">
          <MdNavBarMenuList />
        </ul>
        <ul className="text-primary-foreground hidden lg:inline-flex">
          <LgNavBarMenuList />
        </ul>
      </div>
      <div>
        <LogoutButton />
        <Button variant="link" onClick={onOpenSideBar} className="ms-4 h-8 w-8 p-0 lg:hidden">
          <Menu size={20} />
        </Button>
      </div>
    </div>
  );
}
