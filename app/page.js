import IncidentsDashboardCard from "./components/IncidentsDashboardCardWrapper";
import TimeLostToInjuryCard from "./components/TimeLostToInjuryCardWrapper";
import DailyHazardAssessmentsCard from "./components/DailyHazardAssessmentsCardWrapper";
import ClaimedToDateCard from "./components/ClaimedToDateCardWrapper";
import ToolboxTalkAttendanceCard from "./components/ToolboxTalkAttendanceCardWrapper";
import SkeletonCard from "./components/SkeletonCard";

export default function Home() {
  return (
    <main style={{
      flex: 1,
      background: 'hsl(200, 8%, 96%)',
      padding: '16px 16px 24px',
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gridTemplateRows: '1fr 1fr',
      gap: 16,
      minHeight: 0,
    }}>
      <IncidentsDashboardCard />
      <TimeLostToInjuryCard />
      <SkeletonCard />
      <DailyHazardAssessmentsCard />
      <ClaimedToDateCard />
      <ToolboxTalkAttendanceCard />
    </main>
  );
}
