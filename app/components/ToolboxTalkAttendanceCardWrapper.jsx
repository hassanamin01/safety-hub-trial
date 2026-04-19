'use client';
import dynamic from 'next/dynamic';
const ToolboxTalkAttendanceCard = dynamic(() => import('./ToolboxTalkAttendanceCard'), { ssr: false });
export default ToolboxTalkAttendanceCard;
