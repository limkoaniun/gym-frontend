import React from 'react';
import AdminLayout from './AdminLayout';
import '../globals.css';
import { ToastContainer } from 'react-toastify';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <html lang="en" className="dark --font-body">
        <body>
          <AdminLayout>{children}</AdminLayout>
          <ToastContainer position="top-center" />
        </body>
      </html>
    </>
  );
}
