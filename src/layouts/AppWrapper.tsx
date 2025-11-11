import { Outlet, ScrollRestoration } from 'react-router';
import UserProvider from '../context/UserProvider';
import { ToastContainer } from 'react-toastify';

export default function AppWrapper() {
  return (
    <UserProvider>
      <ScrollRestoration />
      <ToastContainer position="bottom-left" theme="dark" />
      <Outlet />
    </UserProvider>
  );
}
