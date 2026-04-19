'use client';

import dynamic from 'next/dynamic';

const IncidentsDashboardCard = dynamic(
  () => import('./IncidentsDashboardCard'),
  { ssr: false }
);

export default IncidentsDashboardCard;
