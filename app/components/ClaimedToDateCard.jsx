'use client';

import React, { useState } from 'react';
import { Button, Card, Dropdown, Typography } from '@procore/core-react';
import { ArrowDown, ArrowUp, EllipsisVertical } from '@procore/core-icons';
import { Area, AreaChart, ResponsiveContainer } from 'recharts';

const SPARKLINE = {
  'All Claims':  [{ v:42 },{ v:58 },{ v:70 },{ v:52 },{ v:32 },{ v:18 },{ v:28 },{ v:44 },{ v:56 },{ v:90 }],
  'Cost Code A': [{ v:20 },{ v:35 },{ v:28 },{ v:45 },{ v:38 },{ v:50 },{ v:42 },{ v:60 },{ v:55 },{ v:72 }],
  'Cost Code B': [{ v:60 },{ v:50 },{ v:55 },{ v:40 },{ v:35 },{ v:45 },{ v:38 },{ v:30 },{ v:42 },{ v:35 }],
  'Cost Code C': [{ v:30 },{ v:45 },{ v:60 },{ v:75 },{ v:65 },{ v:80 },{ v:70 },{ v:85 },{ v:78 },{ v:95 }],
};

const FILTER_DATA = {
  'All Claims':   { amount: 924_000_000, trend: 17   },
  'Cost Code A':  { amount: 124_500_000, trend:  5.1 },
  'Cost Code B':  { amount: 340_200_000, trend: -0.8 },
  'Cost Code C':  { amount: 427_700_000, trend: 12.4 },
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
  const green = 'hsl(125,50%,38%)';
  const red   = 'hsl(5,85%,48%)';
  const trendColor = isPositive ? green : red;

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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0, marginBottom: 12 }}>
          <Typography intent="h3" weight="semibold" color="gray15">Claimed to Date</Typography>
          <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button variant="secondary" size="sm">Create Claim</Button>
            <Dropdown aria-label="Card options" icon={<EllipsisVertical size="sm" />} variant="tertiary" size="sm">
              <Dropdown.Item>Export</Dropdown.Item>
              <Dropdown.Item>Edit</Dropdown.Item>
              <Dropdown.Item>Remove</Dropdown.Item>
            </Dropdown>
          </div>
        </div>

        {/* Filter */}
        <div style={{ flexShrink: 0 }}>
          <Dropdown label={filter} size="sm" onSelect={({ item }) => setFilter(item)}>
            {FILTER_OPTIONS.map((opt) => (
              <Dropdown.Item key={opt} item={opt} selected={opt === filter}>{opt}</Dropdown.Item>
            ))}
          </Dropdown>
        </div>

        {/* KPI + Sparkline */}
        <div style={{
          marginTop: 'auto',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: 12,
        }}>
          {/* Left: number + trend */}
          <div style={{ flexShrink: 0 }}>
            <div style={{ fontSize: 40, fontWeight: 800, color: 'hsl(200,8%,10%)', lineHeight: 1, marginBottom: 6 }}>
              {formatCurrency(amount)}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: trendColor, fontWeight: 500 }}>
              {isPositive ? <ArrowUp size="sm" /> : <ArrowDown size="sm" />}
              <span>{Math.abs(trend)}% vs. past month</span>
            </div>
          </div>

          {/* Right: sparkline */}
          <div style={{ flex: 1, minWidth: 0, height: 72 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={SPARKLINE[filter]} margin={{ top: 4, right: 0, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={isPositive ? green : red} stopOpacity={0.25} />
                    <stop offset="100%" stopColor={isPositive ? green : red} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="v"
                  stroke={isPositive ? green : red}
                  strokeWidth={2.5}
                  fill="url(#sparkGrad)"
                  dot={false}
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </Card>
    </div>
  );
}
