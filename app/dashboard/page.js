'use client';
import React from 'react';
import dynamic from 'next/dynamic';

const Education = dynamic(() => import('./education/page'), { ssr: false });

export default function DashboardPage() {
  return (
    <Education/>
  );
}