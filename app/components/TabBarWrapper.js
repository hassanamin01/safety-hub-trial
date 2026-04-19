'use client';
import dynamic from 'next/dynamic';
const TabBar = dynamic(() => import('./TabBar'), { ssr: false });
export default TabBar;
