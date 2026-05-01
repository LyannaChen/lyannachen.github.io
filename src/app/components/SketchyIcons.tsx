interface IconProps {
  className?: string;
}

export function SketchyMessageSquare({ className = "" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      {/* Hand-drawn message bubble */}
      <path
        d="M 8 10 Q 7 10, 7 11 L 7 30 Q 7 31, 8 31 L 12 31 L 12 38 L 20 31 L 40 31 Q 41 31, 41 30 L 41 11 Q 41 10, 40 10 Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Sketchy text lines inside */}
      <path d="M 14 17 L 34 17" strokeLinecap="round" opacity="0.6" />
      <path d="M 14 22 L 30 22" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

export function SketchyLaptop({ className = "" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      {/* Hand-drawn laptop */}
      <path
        d="M 10 12 Q 9 12, 9 13 L 9 30 L 39 30 L 39 13 Q 39 12, 38 12 Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Screen detail */}
      <path d="M 12 15 L 36 15 L 36 27 L 12 27 Z" strokeLinecap="round" opacity="0.4" />
      {/* Keyboard base */}
      <path
        d="M 5 30 L 6 33 Q 6 34, 7 34 L 41 34 Q 42 34, 42 33 L 43 30 Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Trackpad */}
      <path d="M 21 31 L 27 31" strokeLinecap="round" />
    </svg>
  );
}

export function SketchyUsers({ className = "" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
      {/* Hand-drawn people */}
      {/* First person */}
      <circle cx="18" cy="14" r="5" strokeLinecap="round" />
      <path
        d="M 10 32 Q 10 25, 14 23 Q 16 22, 18 22 Q 20 22, 22 23 Q 26 25, 26 32"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Second person (slightly offset) */}
      <circle cx="31" cy="14" r="5" strokeLinecap="round" opacity="0.7" />
      <path
        d="M 23 35 Q 23 28, 27 26 Q 29 25, 31 25 Q 33 25, 35 26 Q 39 28, 39 35"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.7"
      />
    </svg>
  );
}
