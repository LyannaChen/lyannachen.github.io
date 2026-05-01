import type { ReactNode } from "react";

interface SketchyBoxProps {
  children: ReactNode;
  className?: string;
  variant?: "light" | "medium" | "dark";
  rounded?: boolean;
}

export function SketchyBox({ children, className = "", variant = "light", rounded = false }: SketchyBoxProps) {
  const strokeColor = variant === "dark" ? "#44403c" : variant === "medium" ? "#78716c" : "#a8a29e";

  return (
    <div className={`relative ${className}`}>
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ filter: "url(#roughness)" }}
      >
        <defs>
          <filter id="roughness">
            <feTurbulence baseFrequency="0.05" numOctaves="2" result="noise" seed="2" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
          </filter>
        </defs>
        {rounded ? (
          <>
            {/* Hand-drawn rounded shape using path */}
            <path
              d="M 20% 2%
                 Q 5% 5%, 2% 20%
                 L 2% 80%
                 Q 5% 95%, 20% 98%
                 L 80% 98%
                 Q 95% 95%, 98% 80%
                 L 98% 20%
                 Q 95% 5%, 80% 2%
                 Z"
              fill="none"
              stroke={strokeColor}
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
            {/* Additional imperfect stroke */}
            <path
              d="M 22% 3%
                 Q 7% 6%, 3% 22%
                 L 3% 78%
                 Q 6% 93%, 22% 97%
                 L 78% 97%
                 Q 93% 93%, 97% 78%
                 L 97% 22%
                 Q 93% 6%, 78% 3%
                 Z"
              fill="none"
              stroke={strokeColor}
              strokeWidth="1"
              opacity="0.3"
              vectorEffect="non-scaling-stroke"
            />
          </>
        ) : (
          <>
            <rect
              x="2"
              y="2"
              width="calc(100% - 4px)"
              height="calc(100% - 4px)"
              fill="none"
              stroke={strokeColor}
              strokeWidth="2"
              rx="24"
            />
            <rect
              x="3"
              y="3"
              width="calc(100% - 6px)"
              height="calc(100% - 6px)"
              fill="none"
              stroke={strokeColor}
              strokeWidth="1"
              rx="24"
              opacity="0.3"
            />
          </>
        )}
      </svg>
      {children}
    </div>
  );
}
