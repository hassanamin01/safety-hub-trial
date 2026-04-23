import DailyHazardAssessmentsCard from "./components/DailyHazardAssessmentsCardWrapper";
import ClaimedToDateCard from "./components/ClaimedToDateCardWrapper";
import ToolboxTalkAttendanceCard from "./components/ToolboxTalkAttendanceCardWrapper";

const GAP = 16;

function PlaceholderCard({ col, row }) {
  return (
    <div style={{
      gridColumn: col,
      gridRow: row,
      background: 'white',
      borderRadius: 8,
      boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
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
      {/* Col 1, Row 1: ClaimedToDate (1/3 h) + DailyHazard (2/3 h) */}
      <div style={{
        gridColumn: '1',
        gridRow: '1',
        display: 'flex',
        flexDirection: 'column',
        gap: GAP,
        minHeight: 0,
      }}>
        <div style={{ flex: 2, minHeight: 0, overflow: 'hidden' }}>
          <ClaimedToDateCard />
        </div>
        <div style={{ flex: 3, minHeight: 0, overflow: 'hidden' }}>
          <DailyHazardAssessmentsCard />
        </div>
      </div>

      {/* Col 1, Row 2: Toolbox Talk */}
      <div style={{ gridColumn: '1', gridRow: '2', minHeight: 0 }}>
        <ToolboxTalkAttendanceCard />
      </div>

      {/* Col 2–3, Rows 1–2: placeholders */}
      <PlaceholderCard col="2" row="1" />
      <PlaceholderCard col="3" row="1" />
      <PlaceholderCard col="2" row="2" />
      <PlaceholderCard col="3" row="2" />
    </main>
  );
}
