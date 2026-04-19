'use client';

import React, { useState, useMemo } from 'react';
import { Button, Card, Dropdown, EmptyState, Panel, Typography } from '@procore/core-react';
import { EllipsisVertical, Fullscreen } from '@procore/core-icons';
import {
  Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer,
  Tooltip, XAxis, YAxis,
} from 'recharts';

const COLORS = {
  attended:  'hsl(218,75%,50%)',
  remaining: 'hsl(260,65%,55%)',
  grid:      'hsl(200,8%,90%)',
  tick:      'hsl(200,8%,40%)',
};

function generateTalkData(count) {
  return Array.from({ length: count }, (_, i) => {
    const total    = 15 + Math.floor(Math.random() * 20);
    const attended = Math.floor(total * (0.5 + Math.random() * 0.45));
    return {
      talk:      `Talk ${i + 1}`,
      attended,
      remaining: total - attended,
      total,
    };
  });
}

const SEED_6  = generateTalkData(6);
const SEED_12 = generateTalkData(12);

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const attended  = payload.find((p) => p.dataKey === 'attended');
  const remaining = payload.find((p) => p.dataKey === 'remaining');
  const total     = (attended?.value ?? 0) + (remaining?.value ?? 0);
  return (
    <div style={{ background: 'white', border: '1px solid hsl(200,8%,85%)', borderRadius: 4, padding: '8px 12px', fontSize: 12 }}>
      <div style={{ fontWeight: 600, marginBottom: 4 }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
        <span style={{ width: 8, height: 8, borderRadius: 2, background: COLORS.attended,  flexShrink: 0 }} />
        <span>Attended: <strong>{attended?.value}</strong></span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
        <span style={{ width: 8, height: 8, borderRadius: 2, background: COLORS.remaining, flexShrink: 0 }} />
        <span>Total: <strong>{total}</strong></span>
      </div>
    </div>
  );
}

function AttendanceChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 8, right: 8, left: 4, bottom: 20 }}>
        <CartesianGrid vertical={false} stroke={COLORS.grid} />
        <XAxis dataKey="talk" tick={{ fontSize: 10, fill: COLORS.tick }} axisLine={false} tickLine={false} label={{ value: 'Toolbox Talk', position: 'insideBottom', offset: -8, style: { fontSize: 10, fill: COLORS.tick } }} />
        <YAxis
          tick={{ fontSize: 10, fill: COLORS.tick }} axisLine={false} tickLine={false}
          label={{ value: 'People', angle: -90, position: 'insideLeft', offset: 14, style: { fontSize: 10, fill: COLORS.tick, textAnchor: 'middle' } }}
        />
        <Tooltip cursor={{ fill: 'transparent' }} content={<CustomTooltip />} />
        <Bar dataKey="attended"  name="Attended" stackId="a" fill={COLORS.attended}  maxBarSize={28} radius={[0,0,0,0]} />
        <Bar dataKey="remaining" name="Total"    stackId="a" fill={COLORS.remaining} maxBarSize={28} radius={[4,4,0,0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

function Legend() {
  return (
    <div style={{ display: 'flex', gap: 12, marginBottom: 8 }}>
      {[
        { color: COLORS.attended,  label: 'Attended' },
        { color: COLORS.remaining, label: 'Total'    },
      ].map(({ color, label }) => (
        <span key={label} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ width: 10, height: 10, borderRadius: 2, background: color, display: 'inline-block', flexShrink: 0 }} />
          <Typography intent="small" color="gray30">{label}</Typography>
        </span>
      ))}
    </div>
  );
}

export default function ToolboxTalkAttendanceCard({ isEmpty = false }) {
  const [panelOpen, setPanelOpen] = useState(false);
  const shortData = useMemo(() => SEED_6,  []);
  const longData  = useMemo(() => SEED_12, []);

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <Card shadowStrength={1} style={{ padding: 16, flex: 1, minWidth: 0, height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, flexShrink: 0 }}>
          <Typography intent="h3" weight="semibold" color="gray15">Toolbox Talk Attendance</Typography>
          <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button variant="secondary" size="sm" onClick={() => setPanelOpen(true)}>View More</Button>
            <Button variant="tertiary" size="sm" icon={<Fullscreen size="sm" />} aria-label="Expand" />
            <Dropdown aria-label="Card options" icon={<EllipsisVertical size="sm" />} variant="tertiary" size="sm">
              <Dropdown.Item>Export</Dropdown.Item>
              <Dropdown.Item>Edit</Dropdown.Item>
              <Dropdown.Item>Remove</Dropdown.Item>
            </Dropdown>
          </div>
        </div>

        <div style={{ flexShrink: 0 }}><Legend /></div>

        {isEmpty ? (
          <EmptyState size="sm" style={{ flex: 1, padding: '24px 0' }}>
            <EmptyState.NoResults />
            <EmptyState.Title>No Attendance Data</EmptyState.Title>
            <EmptyState.Description>No toolbox talks found for this period.</EmptyState.Description>
          </EmptyState>
        ) : (
          <div style={{ flex: 1, minHeight: 0 }}>
            <AttendanceChart data={shortData} />
          </div>
        )}
      </Card>

      {panelOpen && (
        <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: 720, zIndex: 400, boxShadow: '-4px 0 24px rgba(0,0,0,0.12)', background: 'white', display: 'flex', flexDirection: 'column' }}>
          <Panel style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Panel.Header onClose={() => setPanelOpen(false)}>
              <Panel.Title>Toolbox Talk Attendance</Panel.Title>
            </Panel.Header>
            <Panel.Body style={{ flex: 1, padding: 24, overflowY: 'auto' }}>
              <Legend />
              <div style={{ height: 400 }}>
                <AttendanceChart data={longData} />
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
