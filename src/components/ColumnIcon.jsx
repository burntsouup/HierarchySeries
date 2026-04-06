/**
 * A minimal Roman/Ionic column icon, used as the app logo.
 * Rendered as an inline SVG so it scales with text and
 * can inherit colour via currentColor.
 */
export default function ColumnIcon({ className = "", size = 16 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 32"
      width={size}
      height={size * (32 / 24)}
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      {/* Capital (top) — wider slab with small volute curls */}
      <rect x="2" y="0" width="20" height="2.5" rx="0.5" />
      <rect x="4" y="2.5" width="16" height="2" rx="0.4" />

      {/* Shaft — tapers slightly (wider at bottom) */}
      <path d="M7 4.5 L6 26 L18 26 L17 4.5 Z" />

      {/* Fluting lines on shaft */}
      <line x1="9.5" y1="6" x2="9" y2="25" stroke="rgba(0,0,0,0.15)" strokeWidth="0.7" />
      <line x1="12" y1="6" x2="12" y2="25" stroke="rgba(0,0,0,0.15)" strokeWidth="0.7" />
      <line x1="14.5" y1="6" x2="15" y2="25" stroke="rgba(0,0,0,0.15)" strokeWidth="0.7" />

      {/* Base — two-step plinth */}
      <rect x="4" y="26" width="16" height="2.5" rx="0.4" />
      <rect x="2" y="28.5" width="20" height="3" rx="0.5" />
    </svg>
  );
}
