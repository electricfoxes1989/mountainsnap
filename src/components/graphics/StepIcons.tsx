type IconProps = { className?: string };

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function PostIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <g {...stroke}>
        <path d="M24 8 L18 16 L30 16 Z" />
        <rect x="20" y="16" width="8" height="6" rx="1" />
        <path d="M24 22 L24 40" />
        <path d="M16 40 L32 40" />
        <path d="M14 35 Q24 32 34 35" />
      </g>
    </svg>
  );
}

export function QrIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <g {...stroke}>
        <rect x="8" y="8" width="12" height="12" rx="1" />
        <rect x="28" y="8" width="12" height="12" rx="1" />
        <rect x="8" y="28" width="12" height="12" rx="1" />
        <rect x="12" y="12" width="4" height="4" fill="currentColor" stroke="none" />
        <rect x="32" y="12" width="4" height="4" fill="currentColor" stroke="none" />
        <rect x="12" y="32" width="4" height="4" fill="currentColor" stroke="none" />
        <path d="M28 28 L32 28 M36 28 L40 28 M28 32 L28 36 M32 32 L36 36 M40 32 L40 40 M28 40 L36 40" />
      </g>
    </svg>
  );
}

export function CameraIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <g {...stroke}>
        <path d="M10 16 L18 16 L20 12 L28 12 L30 16 L38 16 Q40 16 40 18 L40 36 Q40 38 38 38 L10 38 Q8 38 8 36 L8 18 Q8 16 10 16 Z" />
        <circle cx="24" cy="26" r="6" />
        <circle cx="24" cy="26" r="2.5" />
        <circle cx="34" cy="20" r="0.8" fill="currentColor" />
      </g>
    </svg>
  );
}

export function ArchiveIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <g {...stroke}>
        <rect x="8" y="14" width="32" height="26" rx="1" />
        <path d="M8 22 L40 22" />
        <path d="M16 30 L20 26 L26 32 L32 26 L36 30" />
        <circle cx="20" cy="18" r="0.8" fill="currentColor" />
        <circle cx="24" cy="18" r="0.8" fill="currentColor" />
        <circle cx="28" cy="18" r="0.8" fill="currentColor" />
        <path d="M14 8 L34 8 L34 14 L14 14 Z" />
      </g>
    </svg>
  );
}

export function LeafMark({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <g {...stroke}>
        <path d="M5 27 Q12 8 27 5 Q24 20 5 27 Z" />
        <path d="M5 27 Q14 18 24 11" />
      </g>
    </svg>
  );
}
