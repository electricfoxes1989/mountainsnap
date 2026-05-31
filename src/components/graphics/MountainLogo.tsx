type Props = {
  className?: string;
  framed?: boolean;
};

/**
 * MountainSnap logo — closely matches the Canva mark:
 * a smaller medium-green peak on the left, a larger dark-green volcanic
 * peak on the right with a smoke plume, set in a white rounded square
 * with a thin near-black border.
 */
export function MountainLogo({ className = "", framed = true }: Props) {
  const Icon = (
    <svg
      viewBox="0 0 80 80"
      xmlns="http://www.w3.org/2000/svg"
      className="block w-full h-full"
      role="img"
      aria-label="MountainSnap"
    >
      {/* smoke plume */}
      <g fill="#a8a294">
        <ellipse cx="48" cy="20" rx="6.5" ry="3" opacity="0.55" />
        <ellipse cx="54" cy="14" rx="5.5" ry="2.5" opacity="0.65" />
        <ellipse cx="60" cy="9" rx="4" ry="2" opacity="0.7" />
        <ellipse cx="44" cy="14" rx="3.5" ry="1.6" opacity="0.5" />
      </g>

      {/* left/smaller peak — medium green */}
      <path
        d="M2 70 L24 32 L42 58 L42 70 Z"
        fill="#5a8a4e"
      />

      {/* right/larger volcanic peak — dark forest green */}
      <path
        d="M28 70 L48 22 L78 70 Z"
        fill="#234c28"
      />

      {/* small snow cap on right peak */}
      <path
        d="M44 32 L48 22 L52 32 L48 35 Z"
        fill="#fbf6ea"
      />

      {/* ground line (subtle) */}
      <rect x="0" y="68" width="80" height="2" fill="#1b3a1f" opacity="0.25" />
    </svg>
  );

  if (!framed) {
    return <span className={className}>{Icon}</span>;
  }

  return (
    <span
      className={`inline-flex items-center justify-center bg-white rounded-md p-1.5 ring-1 ring-black/85 ${className}`}
    >
      {Icon}
    </span>
  );
}
