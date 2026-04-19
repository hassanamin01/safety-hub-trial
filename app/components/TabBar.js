'use client';

import { useState } from 'react';
import { Tabs, ToggleButton } from '@procore/core-react';
import { Filter, CaretDown } from '@procore/core-icons';

export default function TabBar() {
  const [active, setActive] = useState('Safety Hub');
  const tabs = ['Overview', 'Safety Hub', 'Resource Management'];

  return (
    <div style={{
      display: 'flex', alignItems: 'center',
      background: 'white', borderBottom: '1px solid hsl(200,8%,88%)',
      padding: '0 16px', flexShrink: 0, gap: 8,
    }}>
      {/* Filter toggle button */}
      <ToggleButton
        size="sm"
        icon={<Filter size="sm" />}
        style={{ marginRight: 4 }}
      >
        Filter
      </ToggleButton>

      {/* Divider */}
      <span style={{ width: 1, height: 16, background: 'hsl(200,8%,82%)', flexShrink: 0 }} />

      {/* Tabs */}
      <Tabs style={{ flex: 1 }}>
        {tabs.map((tab) => (
          <Tabs.Tab
            key={tab}
            role="button"
            selected={active === tab}
            onPress={() => setActive(tab)}
          >
            {tab}
            {tab === 'Safety Hub' && (
              <CaretDown size="sm" style={{ marginLeft: 3 }} />
            )}
          </Tabs.Tab>
        ))}
      </Tabs>
    </div>
  );
}
