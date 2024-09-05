'use client';

import { useAuthContext, useThemeContext } from '../context';
import { ThemeSettings } from '../context/ThemeContext';
import VerticalLayout from '@/layouts/Vertical';
import HorizontalLayout from '@/layouts/Horizontal';
import { redirect } from 'next/navigation';

export default function DashboardLayout({ children }) {
  const { settings } = useThemeContext();
  const { user } = useAuthContext();

  if (!user) {
    redirect('/account/login');
  }

  const Layout = settings.layout.type === ThemeSettings.layout.type.vertical
    ? VerticalLayout
    : HorizontalLayout;

  return (
    <Layout>
      {children}
    </Layout>
  );
}