'use client';

import React, { useMemo } from 'react';
import { Button, Card, Dropdown, Typography } from '@procore/core-react';
import { EllipsisVertical } from '@procore/core-icons';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const STATUSES = [
  { key: 'complete',   label: 'Complete',    color: 'hsl(170,65%,40%)', pct: 52 },
  { key: 'inProgress', label: 'In Progress', color: 'hsl(260,65%,55%)', pct: 28 },
  { key: 'open',       label: 'Open',        color: 'hsl(218,75%,50%)', pct: 20 },
];

const EMPTY_SEGMENT = [{ key: 'empty', label: '', color: 'hsl(200,8%,88%)', value: 100 }];
const TOTAL = 247;

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const { label, pct, color } = payload[0].payload;
  if (!label) return null;
  return (
    <div style={{ background: 'white', border: '1px solid hsl(200,8%,85%)', borderRadius: 4, padding: '6px 10px', fontSize: 12 }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: color, flexShrink: 0 }} />
        <strong>{label}</strong>: {pct}%
      </span>
    </div>
  );
}

export default function DailyHazardAssessmentsCard({ isEmpty = false }) {
  const gaugeData = useMemo(
    () => isEmpty ? EMPTY_SEGMENT : STATUSES.map((s) => ({ ...s, value: s.pct })),
    [isEmpty],
  );

  return (
    <div style={{ height: '100%' }}>
      <Card shadowStrength={1} style={{ padding: 16, height: '100%', display: 'flex', flexDirection: 'column' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4, flexShrink: 0 }}>
          <Typography intent="h3" weight="semibold" color="gray15">Daily Hazard Assessments</Typography>
          <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button variant="secondary" size="sm">View All</Button>
            <Dropdown aria-label="Card options" icon={<EllipsisVertical size="sm" />} variant="tertiary" size="sm">
              <Dropdown.Item>View Report</Dropdown.Item>
              <Dropdown.Item>Edit Card</Dropdown.Item>
              <Dropdown.Item>Remove</Dropdown.Item>
            </Dropdown>
          </div>
        </div>

        {/* Semi-circle gauge */}
        <div style={{ flex: 1, minHeight: 0, position: 'relative' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={gaugeData}
                cx="50%"
                cy="90%"
                startAngle={180}
                endAngle={0}
                innerRadius="55%"
                outerRadius="80%"
                paddingAngle={isEmpty ? 0 : 2}
                cornerRadius={6}
                dataKey="value"
                stroke="none"
              >
                {gaugeData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              {!isEmpty && <Tooltip content={<CustomTooltip />} />}
            </PieChart>
          </ResponsiveContainer>

          {/* Center label */}
          <div style={{
            position: 'absolute', bottom: '8%', left: '50%', transform: 'translateX(-50%)',
            textAlign: 'center', lineHeight: 1.2,
          }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: 'hsl(200,8%,10%)' }}>
              {isEmpty ? 0 : TOTAL}
            </div>
            <Typography intent="small" color="gray45">Project Total</Typography>
          </div>
        </div>

        {/* Horizontal legend: dot + % + label */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 20, paddingTop: 8, flexShrink: 0, flexWrap: 'wrap' }}>
          {STATUSES.map(({ key, label, color, pct }) => (
            <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{
                width: 10, height: 10, borderRadius: '50%',
                background: isEmpty ? 'hsl(200,8%,80%)' : color,
                flexShrink: 0,
              }} />
              <span style={{ fontSize: 12, color: 'hsl(200,8%,35%)' }}>
                <strong>{isEmpty ? '0' : pct}%</strong> {label}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
