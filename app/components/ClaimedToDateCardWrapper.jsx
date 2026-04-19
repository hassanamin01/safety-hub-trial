'use client';
import dynamic from 'next/dynamic';
const ClaimedToDateCard = dynamic(() => import('./ClaimedToDateCard'), { ssr: false });
export default ClaimedToDateCard;
