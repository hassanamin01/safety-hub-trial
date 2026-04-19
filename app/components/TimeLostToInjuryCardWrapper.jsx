'use client';
import dynamic from 'next/dynamic';
const TimeLostToInjuryCard = dynamic(() => import('./TimeLostToInjuryCard'), { ssr: false });
export default TimeLostToInjuryCard;
