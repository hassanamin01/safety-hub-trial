'use client';

import { Title, Button } from '@procore/core-react';
import { GridStroked, Plus, CaretDown } from '@procore/core-icons';

export default function PageHeader() {
  return (
    <Title style={{ padding: '10px 16px 0', background: 'white', flexShrink: 0 }}>
      <Title.Assets alignment="center">
        <GridStroked size="md" style={{ color: 'hsl(200,8%,40%)' }} />
      </Title.Assets>
      <Title.Text>
        <span style={{ fontSize: 18, fontWeight: 700, color: 'hsl(200,8%,10%)' }}>
          001SW – Monarch Apartments
        </span>
      </Title.Text>
      <Title.Actions>
        <Button
          variant="primary"
          icon={<Plus size="sm" />}
          style={{ background: 'hsl(19,100%,50%)', border: 'none' }}
        >
          Quick Create
          <CaretDown size="sm" style={{ marginLeft: 4 }} />
        </Button>
        <Button variant="secondary">
          Feedback
        </Button>
      </Title.Actions>
    </Title>
  );
}
