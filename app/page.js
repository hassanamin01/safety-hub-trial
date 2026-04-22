import DailyHazardAssessmentsCard from "./components/DailyHazardAssessmentsCardWrapper";
import ClaimedToDateCard from "./components/ClaimedToDateCardWrapper";
import ToolboxTalkAttendanceCard from "./components/ToolboxTalkAttendanceCardWrapper";

export default function Home() {
  return (
    <main style={{
      flex: 1,
      background: 'hsl(200, 8%, 96%)',
      padding: '16px 16px 24px',
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 16,
      minHeight: 0,
      alignItems: 'start',
    }}>
      {/* Left column: two stacked cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <ClaimedToDateCard />
        <DailyHazardAssessmentsCard />
      </div>

      {/* Middle column */}
      <ToolboxTalkAttendanceCard />
    </main>
  );
}
