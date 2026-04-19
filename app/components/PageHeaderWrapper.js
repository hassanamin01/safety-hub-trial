'use client';
import dynamic from 'next/dynamic';
const PageHeader = dynamic(() => import('./PageHeader'), { ssr: false });
export default PageHeader;
