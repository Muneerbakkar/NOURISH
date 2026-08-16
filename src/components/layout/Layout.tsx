import React from 'react';
import { Navbar, Footer } from './NavbarFooter';
import { ScrollToHashElement } from '../utils/ScrollToHashElement';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-emerald-200 selection:text-emerald-900">
      <ScrollToHashElement />
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
