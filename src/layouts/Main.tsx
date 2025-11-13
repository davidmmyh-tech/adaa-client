import { useState } from 'react';
import { Outlet } from 'react-router';
import NavBar from '@/components/sections/NavBar';
import SideBar from '@/components/sections/SideBar';
import Footer from '@/components/sections/Footer';

export default function MainLayout() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  return (
    <>
      <NavBar onOpenSideBar={() => setIsSideBarOpen(true)} />
      <SideBar isOpen={isSideBarOpen} onClose={() => setIsSideBarOpen(false)} />
      <main className="min-h-[20vh] pb-12">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
