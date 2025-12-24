import React from 'react';
import { AdminLayoutClient } from './AdminLayoutClient';
import '../globals.css';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <html lang="en" className="dark --font-body">
        <body>
          <AdminLayoutClient>{children}</AdminLayoutClient>
        </body>
      </html>
    </>
  );
}
