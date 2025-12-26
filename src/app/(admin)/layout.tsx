import React from 'react';
import AdminLayout from './AdminLayout';
import '../globals.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <html lang="en" className="dark --font-body">
        <body>
          <AdminLayout>{children}</AdminLayout>
        </body>
      </html>
    </>
  );
}
