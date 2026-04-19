'use client';

import { Button, Tooltip } from '@procore/core-react';
import { ClipboardCheck, Comments, GridStroked } from '@procore/core-icons';

const DOCK_ITEMS = [
  { label: 'Assist',         icon: <GridStroked size="md" /> },
  { label: 'Conversations',  icon: <Comments size="md" />,   badge: true },
  { label: 'Kickoff',        icon: <ClipboardCheck size="md" /> },
];

export default function RightDock() {
  return (
    <div style={{
      width: 56, background: 'white', borderLeft: '1px solid hsl(200,8%,90%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      paddingTop: 12, gap: 4,
    }}>
      {DOCK_ITEMS.map(({ label, icon, badge }) => (
        <Tooltip key={label} overlay={label} placement="left">
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Button
              variant="tertiary"
              icon={icon}
              aria-label={label}
              style={{ color: 'hsl(200,8%,40%)' }}
            />
            {badge && (
              <span style={{
                position: 'absolute', top: 4, right: 4,
                width: 8, height: 8, background: 'hsl(5,85%,55%)',
                borderRadius: '50%', border: '2px solid white',
                pointerEvents: 'none',
              }} />
            )}
            <span style={{ fontSize: 9, color: 'hsl(200,8%,50%)', marginTop: -2 }}>{label}</span>
          </div>
        </Tooltip>
      ))}
    </div>
  );
}
