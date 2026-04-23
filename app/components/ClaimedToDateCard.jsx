'use client';

import React, { useState } from 'react';
import { Button, Card, Dropdown, Typography } from '@procore/core-react';
import { ArrowDown, ArrowUp, EllipsisVertical } from '@procore/core-icons';
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

// Wave: rises to hump → deep valley → small bump → shoots off top-right
const SPARKLINE = {
  'All Claims':  [{ v:44 },{ v:60 },{ v:68 },{ v:50 },{ v:26 },{ v:8 },{ v:18 },{ v:32 },{ v:28 },{ v:58 },{ v:96 }],
  'Cost Code A': [{ v:20 },{ v:38 },{ v:32 },{ v:48 },{ v:40 },{ v:55 },{ v:44 },{ v:62 },{ v:56 },{ v:74 },{ v:96 }],
  'Cost Code B': [{ v:62 },{ v:52 },{ v:58 },{ v:42 },{ v:36 },{ v:46 },{ v:38 },{ v:30 },{ v:44 },{ v:36 },{ v:28 }],
  'Cost Code C': [{ v:28 },{ v:44 },{ v:58 },{ v:72 },{ v:64 },{ v:78 },{ v:68 },{ v:82 },{ v:76 },{ v:88 },{ v:96 }],
};

const FILTER_DATA = {
  'All Claims':  { amount: 924_000_000, trend: 17   },
  'Cost Code A': { amount: 124_500_000, trend:  5.1 },
  'Cost Code B': { amount: 340_200_000, trend: -0.8 },
  'Cost Code C': { amount: 427_700_000, trend: 12.4 },
};

const FILTER_OPTIONS = Object.keys(FILTER_DATA);

function formatCurrency(value) {
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(1)}B`;
  if (value >= 1_000_000)     return `$${(value / 1_000_000).toFixed(0)}M`;
  if (value >= 1_000)         return `$${(value / 1_000).toFixed(0)}K`;
  return `$${value}`;
}

export default function ClaimedToDateCard() {
  const [filter, setFilter] = useState('All Claims');
  const { amount, trend } = FILTER_DATA[filter];
  const isPositive = trend >= 0;
  const lineColor = isPositive ? 'hsl(125,45%,40%)' : 'hsl(5,85%,48%)';

  return (
    <div style={{ height: '100%' }}>
      <Card shadowStrength={1} style={{
        padding: 16,
        height: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}>

        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexShrink: 0, marginBottom: 10,
        }}>
          <Typography intent="h3" weight="semibold" color="gray15">Claimed to Date</Typography>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Button variant="secondary" size="sm">Create Claim</Button>
            <Dropdown aria-label="Card options" icon={<EllipsisVertical size="sm" />} variant="tertiary" size="sm">
              <Dropdown.Item>Export</Dropdown.Item>
              <Dropdown.Item>Edit</Dropdown.Item>
              <Dropdown.Item>Remove</Dropdown.Item>
            </Dropdown>
          </div>
        </div>

        {/* Body — relative so children can be absolutely placed */}
        <div style={{ flex: 1, position: 'relative', minHeight: 0 }}>

          {/* Dropdown — top left */}
          <div style={{ position: 'absolute', top: 0, left: 0, zIndex: 2 }}>
            <Dropdown label={filter} size="sm" onSelect={({ item }) => setFilter(item)}>
              {FILTER_OPTIONS.map((opt) => (
                <Dropdown.Item key={opt} item={opt} selected={opt === filter}>{opt}</Dropdown.Item>
              ))}
            </Dropdown>
          </div>

          {/* Sparkline — right 55%, full body height, left entry clipped cleanly */}
          <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: '45%', overflow: 'hidden' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={SPARKLINE[filter]}
                margin={{ top: 0, right: 0, bottom: 0, left: -24 }}
                style={{ overflow: 'visible' }}
              >
                <defs>
                  <linearGradient id="ctdGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor={lineColor} stopOpacity={0.22} />
                    <stop offset="100%" stopColor={lineColor} stopOpacity={0}    />
                  </linearGradient>
                </defs>
                <XAxis hide padding={{ left: 0, right: 0 }} />
                <YAxis domain={[0, 72]} hide />
                <Area
                  type="monotone"
                  dataKey="v"
                  stroke={lineColor}
                  strokeWidth={2.5}
                  fill="url(#ctdGrad)"
                  dot={false}
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* KPI — bottom left */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, zIndex: 2 }}>
            <div style={{
              fontSize: 44, fontWeight: 800,
              color: 'hsl(200,8%,8%)',
              lineHeight: 1, marginBottom: 6,
            }}>
              {formatCurrency(amount)}
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 5,
              fontSize: 14, color: lineColor, fontWeight: 500,
            }}>
              {isPositive ? <ArrowUp size="sm" /> : <ArrowDown size="sm" />}
              <span>{Math.abs(trend)}%{' '}vs. past month</span>
            </div>
          </div>

        </div>
      </Card>
    </div>
  );
}
