'use client';

import React, { useState, useMemo } from 'react';
import {
  Button, Card, Dropdown, EmptyState, Panel, Typography,
} from '@procore/core-react';
import { EllipsisVertical } from '@procore/core-icons';
import {
  Bar, CartesianGrid, ComposedChart, Line,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts';

const COLORS = {
  acmeBuilders:   'hsl(218, 75%, 50%)',
  ridgeCo:        'hsl(170, 65%, 40%)',
  harborElectric: 'hsl(125, 50%, 50%)',
  summitSteel:    'hsl(19, 100%, 50%)',
  totalLine:      'hsl(200, 8%, 25%)',
  gridLine:       'hsl(200, 8%, 90%)',
  tickText:       'hsl(200, 8%, 40%)',
};

const CONTRACTORS = [
  { key: 'acmeBuilders',   label: 'Acme Builders',  color: COLORS.acmeBuilders },
  { key: 'ridgeCo',        label: 'Ridge Co.',       color: COLORS.ridgeCo },
  { key: 'harborElectric', label: 'Harbor Electric', color: COLORS.harborElectric },
  { key: 'summitSteel',    label: 'Summit Steel',    color: COLORS.summitSteel },
];

const DATE_RANGE_OPTIONS = ['Last 7 Days', 'Last 12 Days', 'Last 30 Days'];

function generateData(days) {
  const data = [];
  const now = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const acme   = Math.floor(Math.random() * 5);
    const ridge  = Math.floor(Math.random() * 4);
    const harbor = Math.floor(Math.random() * 4);
    const summit = Math.floor(Math.random() * 3);
    data.push({
      date: `${mm}/${dd}`,
      acmeBuilders: acme, ridgeCo: ridge, harborElectric: harbor, summitSteel: summit,
      total: acme + ridge + harbor + summit,
    });
  }
  return data;
}

const SEED_12 = generateData(12);
const SEED_75 = generateData(75);

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const contractors = payload.filter((p) => p.dataKey !== 'total');
  const totalEntry  = payload.find((p) => p.dataKey === 'total');
  return (
    <div style={{ background: 'white', border: '1px solid hsl(200,8%,85%)', borderRadius: 4, padding: '8px 12px', fontSize: 12, minWidth: 140 }}>
      <div style={{ fontWeight: 600, marginBottom: 6, color: 'hsl(200,8%,15%)' }}>{label}</div>
      {contractors.map((entry) => (
        <div key={entry.dataKey} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: entry.fill, flexShrink: 0 }} />
          <span style={{ color: 'hsl(200,8%,30%)' }}>{entry.name}: <strong>{entry.value}</strong></span>
        </div>
      ))}
      {totalEntry && (
        <div style={{ borderTop: '1px solid hsl(200,8%,90%)', marginTop: 4, paddingTop: 4, color: COLORS.totalLine, fontWeight: 600 }}>
          Total: {totalEntry.value}
        </div>
      )}
    </div>
  );
}

// height="100%" — parent div controls the actual pixel height
function IncidentsChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={data} margin={{ top: 8, right: 8, left: 4, bottom: 0 }}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke={COLORS.gridLine} />
        <XAxis dataKey="date" tick={{ fontSize: 10, fill: COLORS.tickText }} axisLine={false} tickLine={false}
          interval={data.length > 20 ? Math.floor(data.length / 12) : 0} />
        <YAxis domain={[0, 12]} ticks={[0, 3, 6, 9, 12]} tick={{ fontSize: 10, fill: COLORS.tickText }}
          axisLine={false} tickLine={false}
          label={{ value: 'Number of Incidents', angle: -90, position: 'insideLeft', offset: 12, style: { fontSize: 10, fill: COLORS.tickText, textAnchor: 'middle' } }} />
        <Tooltip cursor={{ fill: 'transparent' }} content={<CustomTooltip />} />
        {CONTRACTORS.map((c) => (
          <Bar key={c.key} dataKey={c.key} name={c.label} stackId="stack" fill={c.color} maxBarSize={18} />
        ))}
        <Line type="monotone" dataKey="total" name="Total incidents" stroke={COLORS.totalLine}
          strokeWidth={2} strokeDasharray="5 4" dot={{ r: 3, fill: COLORS.totalLine, strokeWidth: 0 }} activeDot={{ r: 5 }} />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

function ChartLegend() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 10px', marginBottom: 8 }}>
      {CONTRACTORS.map((c) => (
        <span key={c.key} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: c.color, flexShrink: 0 }} />
          <Typography intent="small" color="gray30">{c.label}</Typography>
        </span>
      ))}
      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <span style={{ width: 16, height: 0, borderTop: `2px dashed ${COLORS.totalLine}`, flexShrink: 0 }} />
        <Typography intent="small" color="gray30">Total incidents</Typography>
      </span>
    </div>
  );
}

export default function IncidentsDashboardCard({ isEmpty = false }) {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [dateRange,   setDateRange]   = useState('Last 12 Days');
  const shortData = useMemo(() => SEED_12, []);
  const longData  = useMemo(() => SEED_75, []);

  return (
    <div style={{ display: 'flex', gap: 0, height: '100%' }}>
      <Card shadowStrength={1} style={{ padding: 16, flex: 1, minWidth: 0, height: '100%' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <Typography intent="h3" weight="semibold" color="gray15">
            Incidents per Manpower Log
          </Typography>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Button variant="tertiary" size="sm" onClick={() => setIsPanelOpen(true)}>View More</Button>
            <Dropdown aria-label="Card options" icon={<EllipsisVertical size="sm" />} variant="tertiary" size="sm">
              <Dropdown.Item>Export</Dropdown.Item>
              <Dropdown.Item>Edit</Dropdown.Item>
              <Dropdown.Item>Remove</Dropdown.Item>
            </Dropdown>
          </div>
        </div>

        {/* Date range */}
        <div style={{ marginBottom: 10 }}>
          <Dropdown label={dateRange} size="sm" onSelect={({ item }) => setDateRange(item)}>
            {DATE_RANGE_OPTIONS.map((opt) => (
              <Dropdown.Item key={opt} item={opt} selected={opt === dateRange}>{opt}</Dropdown.Item>
            ))}
          </Dropdown>
        </div>

        <div>
          <ChartLegend />
        </div>

        {/* Chart */}
        {isEmpty ? (
          <EmptyState size="sm" style={{ padding: '24px 0' }}>
            <EmptyState.NoResults />
            <EmptyState.Title>No Incident Data</EmptyState.Title>
            <EmptyState.Description>No incidents were reported in the selected period.</EmptyState.Description>
          </EmptyState>
        ) : (
          <div style={{ height: 200 }}>
            <IncidentsChart data={shortData} />
          </div>
        )}
      </Card>

      {isPanelOpen && (
        <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: 720, zIndex: 400, boxShadow: '-4px 0 24px rgba(0,0,0,0.12)', background: 'white', display: 'flex', flexDirection: 'column' }}>
          <Panel style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Panel.Header onClose={() => setIsPanelOpen(false)}>
              <Panel.Title>Incidents per Manpower Log</Panel.Title>
            </Panel.Header>
            <Panel.Body style={{ flex: 1, padding: 24, overflowY: 'auto' }}>
              <div style={{ marginBottom: 12 }}>
                <ChartLegend />
              </div>
              <div style={{ height: 400 }}>
                <IncidentsChart data={longData} />
              </div>
            </Panel.Body>
            <Panel.Footer>
              <Panel.FooterActions>
                <Button variant="secondary" onClick={() => setIsPanelOpen(false)}>Close</Button>
              </Panel.FooterActions>
            </Panel.Footer>
          </Panel>
        </div>
      )}
    </div>
  );
}
