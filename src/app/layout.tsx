import './globals.css';
import ClientLayout from './ClientLayout';
import { Metadata } from 'next';
import landingPageImg from '@/assets/landingPageImg.jpg';
import React from 'react';

export const metadata: Metadata = {
  title: 'Gym Exercises',
  description: 'Plan workouts with AI in seconds',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark --font-body">
      <body className="relative min-h-screen flex flex-col overflow-hidden antialiased">
        {/* global background image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-60 z-10"
          style={{ backgroundImage: `url(${landingPageImg.src})` }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/90" />

        {/* all pages go here */}
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
