'use client';

import React, { useState } from 'react';
import { Button, Card, Dropdown, Typography } from '@procore/core-react';
import { ArrowDown, ArrowUp, EllipsisVertical, Plus } from '@procore/core-icons';

const FILTER_DATA = {
  'All Vendors':  { amount: 892_400_000, trend: -2.3  },
  'Cost Code A':  { amount: 124_500_000, trend:  5.1  },
  'Cost Code B':  { amount: 340_200_000, trend: -0.8  },
  'Cost Code C':  { amount: 427_700_000, trend: 12.4  },
};

const FILTER_OPTIONS = Object.keys(FILTER_DATA);

function formatCurrency(value) {
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(1)}B`;
  if (value >= 1_000_000)     return `$${(value / 1_000_000).toFixed(0)}M`;
  if (value >= 1_000)         return `$${(value / 1_000).toFixed(0)}K`;
  return `$${value}`;
}

export default function ClaimedToDateCard() {
  const [filter, setFilter] = useState('All Vendors');
  const { amount, trend } = FILTER_DATA[filter];
  const isPositive = trend >= 0;

  return (
    <div style={{ height: '100%' }}>
    <Card shadowStrength={1} style={{ padding: 16, height: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <Typography intent="h3" weight="semibold" color="gray15">Claimed to Date</Typography>
        <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button variant="secondary" size="sm" icon={<Plus size="sm" />}>
            Create Claim
          </Button>
          <Dropdown aria-label="Card options" icon={<EllipsisVertical size="sm" />} variant="tertiary" size="sm">
            <Dropdown.Item>Export</Dropdown.Item>
            <Dropdown.Item>Edit</Dropdown.Item>
            <Dropdown.Item>Remove</Dropdown.Item>
          </Dropdown>
        </div>
      </div>

      {/* Quick filter */}
      <div style={{ marginBottom: 20 }}>
        <Dropdown
          label={filter}
          size="sm"
          onSelect={({ item }) => setFilter(item)}
        >
          {FILTER_OPTIONS.map((opt) => (
            <Dropdown.Item key={opt} item={opt} selected={opt === filter}>{opt}</Dropdown.Item>
          ))}
        </Dropdown>
      </div>

      {/* KPI metric — centered */}
      <div style={{ textAlign: 'center', padding: '24px 0' }}>
        <Typography intent="small" color="gray45" as="div" style={{ marginBottom: 8 }}>
          Claimed to Date
        </Typography>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
          <span style={{ fontSize: 40, fontWeight: 700, color: 'hsl(200,8%,10%)', lineHeight: 1 }}>
            {formatCurrency(amount)}
          </span>
          <span style={{
            display: 'flex', alignItems: 'center', gap: 2,
            fontSize: 14, fontWeight: 600,
            color: isPositive ? 'hsl(125,50%,38%)' : 'hsl(5,85%,48%)',
          }}>
            {isPositive
              ? <ArrowUp size="sm" />
              : <ArrowDown size="sm" />}
            {Math.abs(trend)}%
          </span>
        </div>

        <Typography intent="small" color="gray45" as="div" style={{ marginTop: 8 }}>
          vs. previous period
        </Typography>
      </div>
    </Card>
    </div>
  );
}
