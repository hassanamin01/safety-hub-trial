'use client';

import React, { useState, useMemo } from 'react';
import { Button, Card, Dropdown, Panel, Typography } from '@procore/core-react';
import { EllipsisVertical } from '@procore/core-icons';
import {
  Bar, BarChart, CartesianGrid, ResponsiveContainer,
  Tooltip, XAxis, YAxis,
} from 'recharts';

const COLORS = {
  projected: 'hsl(271,55%,42%)',
  actual:    'hsl(218,75%,50%)',
  grid:      'hsl(200,8%,90%)',
  tick:      'hsl(200,8%,40%)',
};

const RANGE_OPTIONS = [
  { label: 'Last 4 Months',  value: 4 },
  { label: 'Last 6 Months',  value: 6 },
  { label: 'Last 12 Months', value: 12 },
];

function generateMonthlyData(months) {
  const data = [];
  const now  = new Date();
  for (let i = months - 1; i >= 0; i--) {
    const d          = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const projected  = 22 + Math.floor(Math.random() * 4);
    const lost       = Math.floor(Math.random() * 9);
    data.push({
      month:      d.toLocaleString('default', { month: 'short' }),
      actualWork: projected - lost,
      lostTime:   lost,
    });
  }
  return data;
}

const SEEDED = {
  4:  generateMonthlyData(4),
  6:  generateMonthlyData(6),
  12: generateMonthlyData(12),
};

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: 'white', border: '1px solid hsl(200,8%,85%)', borderRadius: 4, padding: '8px 12px', fontSize: 12 }}>
      <div style={{ fontWeight: 600, marginBottom: 4 }}>{label}</div>
      {payload.map((p) => (
        <div key={p.dataKey} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
          <span style={{ width: 8, height: 8, borderRadius: 2, background: p.fill, flexShrink: 0 }} />
          <span style={{ color: 'hsl(200,8%,30%)' }}>{p.name}: <strong>{p.value}d</strong></span>
        </div>
      ))}
    </div>
  );
}

function TimeLostChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 4, right: 8, left: 4, bottom: 24 }}>
        <CartesianGrid vertical={false} stroke={COLORS.grid} strokeDasharray="4 4" />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 11, fill: COLORS.tick }}
          axisLine={false}
          tickLine={false}
          label={{ value: 'Month', position: 'insideBottom', offset: -12, style: { fontSize: 11, fill: COLORS.tick } }}
        />
        <YAxis
          tick={{ fontSize: 11, fill: COLORS.tick }}
          axisLine={false}
          tickLine={false}
          label={{ value: 'Days', angle: -90, position: 'insideLeft', offset: 14, style: { fontSize: 11, fill: COLORS.tick, textAnchor: 'middle' } }}
        />
        <Tooltip cursor={{ fill: 'rgba(0,0,0,0.04)' }} content={<CustomTooltip />} />
        <Bar dataKey="actualWork" name="Actual Work"    stackId="a" fill={COLORS.actual}    maxBarSize={32} radius={[0,0,0,0]} />
        <Bar dataKey="lostTime"   name="Projected Work" stackId="a" fill={COLORS.projected} maxBarSize={32} radius={[4,4,0,0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

function ChartLegend() {
  return (
    <div style={{ display: 'flex', gap: 12, marginBottom: 8 }}>
      {[
        { color: COLORS.projected, label: 'Projected Work' },
        { color: COLORS.actual,    label: 'Actual Work' },
      ].map(({ color, label }) => (
        <span key={label} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: color, display: 'inline-block', flexShrink: 0 }} />
          <Typography intent="small" color="gray30">{label}</Typography>
        </span>
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'hsl(200,8%,55%)', gap: 8 }}>
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
      <Typography intent="small" color="gray40">No data available for this period</Typography>
    </div>
  );
}

export default function TimeLostToInjuryCard() {
  const [panelOpen,   setPanelOpen]   = useState(false);
  const [rangeMonths, setRangeMonths] = useState(6);

  const chartData   = useMemo(() => SEEDED[rangeMonths] ?? [], [rangeMonths]);
  const panelData   = useMemo(() => SEEDED[12],               []);
  const hasData     = chartData.length > 0;
  const activeRange = RANGE_OPTIONS.find((o) => o.value === rangeMonths);

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <Card shadowStrength={1} style={{ padding: 16, flex: 1, minWidth: 0, height: '100%', display: 'flex', flexDirection: 'column' }}>

        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, flexShrink: 0 }}>
          <Typography intent="h3" weight="semibold" color="gray15">Time Lost to Injury</Typography>
          <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button variant="secondary" size="sm" onClick={() => setPanelOpen(true)}>View More</Button>
            <Dropdown aria-label="Card options" icon={<EllipsisVertical size="sm" />} variant="tertiary" size="sm">
              <Dropdown.Item>Export</Dropdown.Item>
              <Dropdown.Item>Edit</Dropdown.Item>
              <Dropdown.Item>Remove</Dropdown.Item>
            </Dropdown>
          </div>
        </div>

        {/* Range selector */}
        <div style={{ flexShrink: 0, marginBottom: 10 }}>
          <Dropdown
            label={activeRange?.label ?? 'Select range'}
            variant="secondary"
            size="sm"
            style={{ minWidth: 140 }}
          >
            {RANGE_OPTIONS.map((opt) => (
              <Dropdown.Item key={opt.value} item={opt.value} onClick={() => setRangeMonths(opt.value)}>
                {opt.label}
              </Dropdown.Item>
            ))}
          </Dropdown>
        </div>

        {/* Legend */}
        <div style={{ flexShrink: 0 }}>
          <ChartLegend />
        </div>

        {/* Chart or empty state */}
        <div style={{ flex: 1, minHeight: 0 }}>
          {hasData ? <TimeLostChart data={chartData} /> : <EmptyState />}
        </div>
      </Card>

      {/* Slide-out panel */}
      {panelOpen && (
        <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: 720, zIndex: 400, boxShadow: '-4px 0 24px rgba(0,0,0,0.12)', background: 'white', display: 'flex', flexDirection: 'column' }}>
          <Panel style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Panel.Header onClose={() => setPanelOpen(false)}>
              <Panel.Title>Time Lost to Injury — Last 12 Months</Panel.Title>
            </Panel.Header>
            <Panel.Body style={{ flex: 1, padding: 24, overflowY: 'auto' }}>
              <div style={{ marginBottom: 12 }}>
                <Typography intent="body" color="gray30">Projected vs. actual work capacity by month</Typography>
              </div>
              <ChartLegend />
              <div style={{ height: 400 }}>
                <TimeLostChart data={panelData} />
              </div>
            </Panel.Body>
            <Panel.Footer>
              <Panel.FooterActions>
                <Button variant="secondary" onClick={() => setPanelOpen(false)}>Close</Button>
              </Panel.FooterActions>
            </Panel.Footer>
          </Panel>
        </div>
      )}
    </div>
  );
}
