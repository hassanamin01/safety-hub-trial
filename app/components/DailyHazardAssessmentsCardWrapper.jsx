'use client';
import dynamic from 'next/dynamic';
const DailyHazardAssessmentsCard = dynamic(() => import('./DailyHazardAssessmentsCard'), { ssr: false });
export default DailyHazardAssessmentsCard;
