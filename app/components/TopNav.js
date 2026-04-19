'use client';

import {
  Button,
  Avatar,
  Tooltip,
  Search,
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
    // viewBox 2160.1 × 271.3 → render at 22px tall → width ≈ 175px
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 2160.1 271.3"
      height="18"
      style={{ display: 'block', flexShrink: 0 }}
      aria-label="Procore"
    >
      {/* Letter paths — white on dark nav */}
      <g fill="white">
        <path d="M220.5,173.6H68.6v97.6H0V0h220.5c35.3,0,60.1,24.8,60.1,60.1v53.5c0,35.2-24.8,60-60.1,60ZM68.6,50.7v72.1h124.8c10.5,0,17.4-7,17.4-17.4v-37.2c0-10.5-7-17.4-17.4-17.4h-124.8v-.1Z"/>
        <path d="M543.5,172.8l56.2,98.4h-74l-55.8-97.6h-88v97.6h-68.6V0h220.5c35.3,0,60.1,24.8,60.1,60.1v53.5c0,31.8-20.5,55.4-50.4,59.3v-.1ZM381.9,50.7v72.1h124.8c10.5,0,17.4-7,17.4-17.4v-37.2c0-10.5-7-17.4-17.4-17.4h-124.8v-.1Z"/>
        <path d="M680.8,0h172c31.8,0,54.3,22.5,54.3,54.3v162.7c0,31.8-22.5,54.2-54.3,54.2h-172c-31.8,0-54.2-22.5-54.2-54.2V54.3c0-31.8,22.5-54.3,54.2-54.3ZM668.4,135.6l50,86h96.9l50-86-50-86h-96.9l-50,86Z"/>
        <path d="M994,271.2c-31.8,0-54.2-22.5-54.2-54.2V54.3c0-31.8,22.5-54.3,54.2-54.3h172c31.8,0,54.3,22.5,54.3,54.3v53.9h-56.2l-33.7-58.5h-98.8l-50,86,50,86h98.8l33.7-58.5h56.2v53.9c0,31.8-22.5,54.2-54.3,54.2h-172v-.1Z"/>
        <path d="M1307.3,0h172c31.8,0,54.3,22.5,54.3,54.3v162.7c0,31.8-22.5,54.2-54.3,54.2h-172c-31.8,0-54.2-22.5-54.2-54.2V54.3c0-31.8,22.5-54.3,54.2-54.3ZM1294.9,135.6l50,86h96.9l50-86-50-86h-96.9l-50,86Z"/>
        <path d="M1796.5,172.8l56.2,98.4h-74l-55.8-97.6h-88v97.6h-68.6V0h220.5c35.3,0,60.1,24.8,60.1,60.1v53.5c0,31.8-20.5,55.4-50.4,59.3v-.1ZM1634.9,50.7v72.1h124.8c10.5,0,17.4-7,17.4-17.4v-37.2c0-10.5-7-17.4-17.4-17.4h-124.8v-.1Z"/>
        <path d="M1948.1,160.8v59.7h212v50.8h-280.5V0h280.5v50.8h-212v59.3h148v50.8h-148v-.1Z"/>
      </g>
      {/* Orange diamond accent */}
      <polygon fill="#ff5200" points="1107.2 89.9 1133.9 135.6 1107.2 181.3 1054.5 181.3 1027.7 135.6 1054.5 89.9 1107.2 89.9"/>
    </svg>
  );
}

export default function TopNav() {
  return (
    <header style={{
      height: 56, background: '#000000',
      display: 'flex', alignItems: 'center', padding: '0 16px', gap: 12,
      flexShrink: 0, zIndex: 100,
    }}>
      {/* Hamburger */}
      <Button
        variant="tertiary"
        icon={<List size="md" />}
        style={{ color: '#ffffff' }}
      >
        Menu
      </Button>

      {/* Logo */}
      <ProcoreLogo />

      {/* Project selector */}
      <Button
        variant="tertiary"
        style={{
          background: '#2f3437', border: 'none', borderRadius: 6,
          padding: '4px 10px', display: 'flex', alignItems: 'center', gap: 6,
          cursor: 'pointer', maxWidth: 240,
        }}
      >
        <div style={{ textAlign: 'left', lineHeight: 1.3 }}>
          <div style={{ fontSize: 10, color: 'hsl(200,8%,65%)' }}>Miller Holdings</div>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#ffffff' }}>001SW – Monarch Apartments</div>
        </div>
        <CaretDown size="sm" style={{ color: 'hsl(200,8%,65%)', flexShrink: 0 }} />
      </Button>

      {/* Search — Core React Search component, styled for dark nav */}
      <div style={{ flex: 1, maxWidth: 380, position: 'relative', display: 'flex', alignItems: 'center' }}>
        <Search
          placeholder="Ask anything"
          style={{
            width: '100%',
            background: 'hsl(200,8%,12%)',
            borderColor: 'hsl(200,8%,30%)',
            color: 'hsl(200,8%,80%)',
            paddingRight: 60,
          }}
        />
        <span style={{
          position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
          fontSize: 10, color: 'hsl(200,8%,55%)',
          background: 'hsl(200,8%,20%)', padding: '1px 5px', borderRadius: 3,
          pointerEvents: 'none',
        }}>
          Ctrl K
        </span>
      </div>

      {/* Right nav icons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginLeft: 'auto' }}>
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
            position: 'absolute', top: 4, right: 4,
            width: 7, height: 7, background: 'hsl(5,85%,55%)',
            borderRadius: '50%', border: '2px solid #000000', pointerEvents: 'none',
          }} />
        </div>

        {/* User avatar — initials */}
        <Avatar size="md" aria-hidden>
          <Avatar.Label style={{ background: 'hsl(218,75%,50%)', color: '#fff', fontWeight: 700, fontSize: 12 }}>
            MH
          </Avatar.Label>
        </Avatar>

        {/* Org badge */}
        <Button
          variant="primary"
          style={{ background: 'hsl(19,100%,50%)', border: 'none', fontWeight: 700, fontSize: 12, marginLeft: 4 }}
        >
          <span style={{ fontSize: 9, marginRight: 3 }}>◆</span> MILLER DESIGN
        </Button>
      </div>
    </header>
  );
}
