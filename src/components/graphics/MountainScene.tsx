export function MountainScene({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 480"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Illustration de paysage de montagne"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="ms-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fbf6ea" />
          <stop offset="100%" stopColor="#e9d8b6" />
        </linearGradient>
        <linearGradient id="ms-far" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#b9cdd1" />
          <stop offset="100%" stopColor="#8aa68b" />
        </linearGradient>
        <linearGradient id="ms-mid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7a9479" />
          <stop offset="100%" stopColor="#4a6b4d" />
        </linearGradient>
        <linearGradient id="ms-near" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a5a3f" />
          <stop offset="100%" stopColor="#2a3a2c" />
        </linearGradient>
      </defs>

      {/* sky */}
      <rect width="800" height="480" fill="url(#ms-sky)" />

      {/* sun */}
      <circle cx="600" cy="130" r="38" fill="#e8a060" opacity="0.55" />
      <circle cx="600" cy="130" r="22" fill="#e8a060" opacity="0.85" />

      {/* clouds */}
      <g opacity="0.5" fill="#fbf6ea">
        <ellipse cx="180" cy="110" rx="60" ry="10" />
        <ellipse cx="220" cy="100" rx="40" ry="8" />
        <ellipse cx="450" cy="80" rx="80" ry="9" />
      </g>

      {/* far range */}
      <path
        d="M0,300 L60,260 L110,290 L170,220 L240,270 L320,210 L400,260 L470,200 L540,250 L620,220 L700,270 L800,240 L800,480 L0,480 Z"
        fill="url(#ms-far)"
        opacity="0.85"
      />
      {/* snow caps far */}
      <path
        d="M155,228 L170,220 L185,230 L172,238 Z M315,218 L320,210 L330,220 L322,225 Z M462,210 L470,200 L482,212 L470,218 Z"
        fill="#fbf6ea"
        opacity="0.9"
      />

      {/* mid range */}
      <path
        d="M0,360 L80,310 L140,350 L210,280 L290,340 L380,270 L470,330 L560,290 L640,340 L730,310 L800,330 L800,480 L0,480 Z"
        fill="url(#ms-mid)"
      />

      {/* near range */}
      <path
        d="M0,420 L120,360 L220,400 L320,340 L420,390 L520,350 L640,400 L760,370 L800,390 L800,480 L0,480 Z"
        fill="url(#ms-near)"
      />

      {/* trees on near range */}
      <g fill="#2a3a2c">
        {[80, 140, 200, 260, 340, 410, 480, 560, 620, 700, 760].map((x, i) => (
          <g key={i} transform={`translate(${x}, ${410 + (i % 3) * 6})`}>
            <path d="M0,0 L-7,18 L7,18 Z" />
            <rect x="-1" y="18" width="2" height="4" />
          </g>
        ))}
      </g>

      {/* lake */}
      <ellipse cx="400" cy="455" rx="180" ry="10" fill="#b9cdd1" opacity="0.45" />
    </svg>
  );
}
