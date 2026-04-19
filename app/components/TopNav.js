'use client';

import {
  Button,
  Avatar,
  Tooltip,
} from '@procore/core-react';
import {
  List,
  Help,
  Comments,
  Bell,
  CaretDown,
} from '@procore/core-icons';

function ProcoreLogo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 2160.1 271.3"
      height="14"
      style={{ display: 'block', flexShrink: 0 }}
      aria-label="Procore"
    >
      <g fill="white">
        <path d="M220.5,173.6H68.6v97.6H0V0h220.5c35.3,0,60.1,24.8,60.1,60.1v53.5c0,35.2-24.8,60-60.1,60ZM68.6,50.7v72.1h124.8c10.5,0,17.4-7,17.4-17.4v-37.2c0-10.5-7-17.4-17.4-17.4h-124.8v-.1Z"/>
        <path d="M543.5,172.8l56.2,98.4h-74l-55.8-97.6h-88v97.6h-68.6V0h220.5c35.3,0,60.1,24.8,60.1,60.1v53.5c0,31.8-20.5,55.4-50.4,59.3v-.1ZM381.9,50.7v72.1h124.8c10.5,0,17.4-7,17.4-17.4v-37.2c0-10.5-7-17.4-17.4-17.4h-124.8v-.1Z"/>
        <path d="M680.8,0h172c31.8,0,54.3,22.5,54.3,54.3v162.7c0,31.8-22.5,54.2-54.3,54.2h-172c-31.8,0-54.2-22.5-54.2-54.2V54.3c0-31.8,22.5-54.3,54.2-54.3ZM668.4,135.6l50,86h96.9l50-86-50-86h-96.9l-50,86Z"/>
        <path d="M994,271.2c-31.8,0-54.2-22.5-54.2-54.2V54.3c0-31.8,22.5-54.3,54.2-54.3h172c31.8,0,54.3,22.5,54.3,54.3v53.9h-56.2l-33.7-58.5h-98.8l-50,86,50,86h98.8l33.7-58.5h56.2v53.9c0,31.8-22.5,54.2-54.3,54.2h-172v-.1Z"/>
        <path d="M1307.3,0h172c31.8,0,54.3,22.5,54.3,54.3v162.7c0,31.8-22.5,54.2-54.3,54.2h-172c-31.8,0-54.2-22.5-54.2-54.2V54.3c0-31.8,22.5-54.3,54.2-54.3ZM1294.9,135.6l50,86h96.9l50-86-50-86h-96.9l-50,86Z"/>
        <path d="M1796.5,172.8l56.2,98.4h-74l-55.8-97.6h-88v97.6h-68.6V0h220.5c35.3,0,60.1,24.8,60.1,60.1v53.5c0,31.8-20.5,55.4-50.4,59.3v-.1ZM1634.9,50.7v72.1h124.8c10.5,0,17.4-7,17.4-17.4v-37.2c0-10.5-7-17.4-17.4-17.4h-124.8v-.1Z"/>
        <path d="M1948.1,160.8v59.7h212v50.8h-280.5V0h280.5v50.8h-212v59.3h148v50.8h-148v-.1Z"/>
      </g>
      <polygon fill="#ff5200" points="1107.2 89.9 1133.9 135.6 1107.2 181.3 1054.5 181.3 1027.7 135.6 1054.5 89.9 1107.2 89.9"/>
    </svg>
  );
}

function SearchBar() {
  return (
    <div style={{
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
      width: 400,
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        background: 'hsl(200,6%,18%)',
        border: '1px solid hsl(200,6%,32%)',
        borderRadius: 6,
        padding: '0 10px',
        height: 32,
        cursor: 'text',
      }}>
        {/* Magnifying glass icon */}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="hsl(200,6%,55%)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
          <circle cx="11" cy="11" r="7" />
          <line x1="16.5" y1="16.5" x2="22" y2="22" />
        </svg>
        <span style={{ flex: 1, fontSize: 13, color: 'hsl(200,6%,52%)', userSelect: 'none' }}>
          Ask anything
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 3, flexShrink: 0 }}>
          <kbd style={{
            fontSize: 10, color: 'hsl(200,6%,50%)',
            background: 'hsl(200,6%,26%)',
            border: '1px solid hsl(200,6%,38%)',
            borderRadius: 3,
            padding: '1px 5px',
            fontFamily: 'inherit',
            lineHeight: 1.6,
          }}>⌘K</kbd>
        </div>
      </div>
    </div>
  );
}

export default function TopNav() {
  return (
    <header style={{
      height: 52,
      background: '#000000',
      display: 'flex',
      alignItems: 'center',
      padding: '0 12px',
      gap: 10,
      flexShrink: 0,
      zIndex: 100,
      position: 'relative',
    }}>
      {/* Left: hamburger + logo + project selector */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        <Button
          variant="tertiary"
          icon={<List size="md" />}
          style={{ color: '#ffffff', minWidth: 0 }}
        />

        <ProcoreLogo />

        <Button
          variant="tertiary"
          style={{
            background: '#2a2e31', border: 'none', borderRadius: 5,
            padding: '3px 8px', display: 'flex', alignItems: 'center', gap: 5,
            cursor: 'pointer', maxWidth: 220,
          }}
        >
          <div style={{ textAlign: 'left', lineHeight: 1.3 }}>
            <div style={{ fontSize: 10, color: 'hsl(200,8%,58%)' }}>Miller Holdings</div>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 160 }}>001SW – Monarch Apartments</div>
          </div>
          <CaretDown size="sm" style={{ color: 'hsl(200,8%,58%)', flexShrink: 0 }} />
        </Button>
      </div>

      {/* Center: absolutely positioned search bar */}
      <SearchBar />

      {/* Right: icons + avatar + org badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 2, marginLeft: 'auto', flexShrink: 0 }}>
        <Tooltip overlay="Help" placement="bottom">
          <Button variant="tertiary" icon={<Help size="md" />} aria-label="Help" style={{ color: '#ffffff' }} />
        </Tooltip>

        <Tooltip overlay="Conversations" placement="bottom">
          <Button variant="tertiary" icon={<Comments size="md" />} aria-label="Conversations" style={{ color: '#ffffff' }} />
        </Tooltip>

        <div style={{ position: 'relative', display: 'inline-flex' }}>
          <Tooltip overlay="Notifications" placement="bottom">
            <Button variant="tertiary" icon={<Bell size="md" />} aria-label="Notifications" style={{ color: '#ffffff' }} />
          </Tooltip>
          <span style={{
            position: 'absolute', top: 5, right: 5,
            width: 6, height: 6, background: 'hsl(5,85%,55%)',
            borderRadius: '50%', border: '1.5px solid #000000', pointerEvents: 'none',
          }} />
        </div>

        <Avatar size="md" aria-hidden>
          <Avatar.Label style={{ background: 'hsl(218,75%,50%)', color: '#fff', fontWeight: 700, fontSize: 12 }}>
            MH
          </Avatar.Label>
        </Avatar>

        <Button
          variant="primary"
          style={{ background: 'hsl(19,100%,50%)', border: 'none', fontWeight: 700, fontSize: 11, marginLeft: 4, padding: '0 10px' }}
        >
          <span style={{ fontSize: 8, marginRight: 3 }}>◆</span> MILLER DESIGN
        </Button>
      </div>
    </header>
  );
}
