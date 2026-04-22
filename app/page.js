import DailyHazardAssessmentsCard from "./components/DailyHazardAssessmentsCardWrapper";
import ClaimedToDateCard from "./components/ClaimedToDateCardWrapper";
import ToolboxTalkAttendanceCard from "./components/ToolboxTalkAttendanceCardWrapper";

const GAP = 16;

function PlaceholderCard() {
  return (
    <div style={{
      background: 'white',
      borderRadius: 8,
      boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
      height: '100%',
    }} />
  );
}

export default function Home() {
  return (
    <main style={{
      flex: 1,
      minHeight: 0,
      background: 'hsl(200, 8%, 96%)',
      padding: GAP,
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gridTemplateRows: 'repeat(2, 1fr)',
      gap: GAP,
    }}>
      {/* Row 1, Col 1: ClaimedToDate (1/3) + DailyHazard (2/3) stacked in one cell */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: GAP,
        minHeight: 0,
      }}>
        <div style={{ flex: 1, minHeight: 0 }}>
          <ClaimedToDateCard />
        </div>
        <div style={{ flex: 2, minHeight: 0 }}>
          <DailyHazardAssessmentsCard />
        </div>
      </div>

      {/* Row 1, Col 2 & 3 */}
      <PlaceholderCard />
      <PlaceholderCard />

      {/* Row 2, Col 1 */}
      <ToolboxTalkAttendanceCard />

      {/* Row 2, Col 2 & 3 */}
      <PlaceholderCard />
      <PlaceholderCard />
    </main>
  );
}
