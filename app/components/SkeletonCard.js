export default function SkeletonCard({ tall = false }) {
  return (
    <div style={{
      background: 'white', borderRadius: 8, padding: 16,
      minHeight: tall ? 300 : 220,
      boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
    }}>
      {/* Header row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Skel width={160} height={12} />
        <Skel width={56} height={12} />
      </div>
      {/* Text lines */}
      <Skel width="100%" height={10} mb={10} />
      <Skel width="85%"  height={10} mb={10} />
      <Skel width="90%"  height={10} mb={10} />
      <Skel width="70%"  height={10} mb={20} />
      {/* Block */}
      <Skel width="100%" height={tall ? 130 : 70} />
    </div>
  );
}

function Skel({ width, height, mb = 0 }) {
  return (
    <div style={{
      width, height, marginBottom: mb, borderRadius: 4,
      background: 'linear-gradient(90deg, hsl(200,8%,92%) 25%, hsl(200,8%,96%) 50%, hsl(200,8%,92%) 75%)',
      backgroundSize: '400% 100%',
      animation: 'shimmer 1.6s ease-in-out infinite',
    }} />
  );
}
