export function SectionDivider({
  className = "",
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 1440 60"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
      style={{ transform: flip ? "scaleY(-1)" : undefined }}
    >
      <path
        d="M0,30 Q120,5 240,30 T480,30 T720,30 T960,30 T1200,30 T1440,30 L1440,60 L0,60 Z"
        fill="currentColor"
        opacity="0.9"
      />
    </svg>
  );
}

export function MountainDivider({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 80"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M0,80 L0,55 L80,30 L150,55 L230,15 L320,50 L420,20 L520,55 L620,25 L740,55 L850,30 L960,55 L1080,20 L1200,55 L1320,30 L1440,55 L1440,80 Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ContourLines({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 400"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.35"
      >
        <path d="M-50,200 Q150,140 300,200 T650,200" />
        <path d="M-50,230 Q150,170 300,230 T650,230" />
        <path d="M-50,260 Q150,200 300,260 T650,260" />
        <path d="M-50,290 Q150,230 300,290 T650,290" />
        <path d="M-50,170 Q150,110 300,170 T650,170" />
        <path d="M-50,140 Q150,80 300,140 T650,140" />
        <path d="M-50,110 Q150,50 300,110 T650,110" />
      </g>
    </svg>
  );
}
