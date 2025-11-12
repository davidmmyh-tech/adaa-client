import { Outlet, ScrollRestoration } from 'react-router';
import { ToastContainer } from 'react-toastify';

export default function AppWrapper() {
  return (
    <>
      <ScrollRestoration />
      <ToastContainer position="bottom-left" theme="dark" />
      <Outlet />
    </>
  );
}
