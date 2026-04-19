'use client';
import dynamic from 'next/dynamic';
const RightDock = dynamic(() => import('./RightDock'), { ssr: false });
export default RightDock;
