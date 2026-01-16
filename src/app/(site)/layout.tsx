import '../globals.css';
import { Metadata } from 'next';
import React from 'react';
import ClientLayout from './ClientLayout';
import landingPageImg from '../../../public/assets/landingPageImg.jpg';
import { ToastContainer } from 'react-toastify';

export const metadata: Metadata = {
  title: 'Gym Exercises',
  description: 'Plan workouts with AI in seconds',
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark --font-body">
      <body>
        {/* global background image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{ backgroundImage: `url(${landingPageImg.src})` }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/90" />
        {/* all pages go here */}
        <ClientLayout>{children}</ClientLayout>
        <ToastContainer position="top-center"/>
      </body>
    </html>
  );
}
