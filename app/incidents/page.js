import IncidentsDashboardCard        from "../components/IncidentsDashboardCardWrapper";
import TimeLostToInjuryCard          from "../components/TimeLostToInjuryCardWrapper";
import DailyHazardAssessmentsCard    from "../components/DailyHazardAssessmentsCardWrapper";
import ClaimedToDateCard             from "../components/ClaimedToDateCardWrapper";
import ToolboxTalkAttendanceCard     from "../components/ToolboxTalkAttendanceCardWrapper";
import TopNav                        from "../components/TopNavWrapper";
import PageHeader                    from "../components/PageHeaderWrapper";
import TabBar                        from "../components/TabBarWrapper";
import RightDock                     from "../components/RightDockWrapper";

export const metadata = { title: "Safety Hub – 001SW Monarch Apartments" };

export default function IncidentsPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: 'hsl(200,8%,96%)', fontFamily: 'sans-serif' }}>
      <TopNav />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <PageHeader />
          <TabBar />
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 24px' }}>
            {/* Row 1 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridAutoRows: '360px', gap: 16, marginBottom: 16 }}>
              <IncidentsDashboardCard />
              <TimeLostToInjuryCard />
              <DailyHazardAssessmentsCard />
            </div>
            {/* Row 2 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridAutoRows: '360px', gap: 16 }}>
              <ClaimedToDateCard />
              <ToolboxTalkAttendanceCard />
            </div>
          </div>
        </div>
        <RightDock />
      </div>
    </div>
  );
}
