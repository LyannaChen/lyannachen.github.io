import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import rough from "roughjs/bin/rough";
import "../../styles/ResearchBubbles.css";

type Area = {
  id: "linguistics" | "cs" | "anthropology";
  name: string;
  icon: string;
  x: number;
  y: number;
};


const areas: Area[] = [
  { id: "linguistics", name: "Linguistics", icon: "💬", x: 56, y: 53 },
  { id: "cs", name: "Computer Science", icon: "💻", x: 79, y: 18 },
  { id: "anthropology", name: "Anthropology", icon: "👥", x: 93, y: 62 },
];

const projectMap: Record<string, string[]> = {
  linguistics: [
    "Tone 3 Sandhi and Its Interaction with Stress in Mandarin Chinese",
    "A Phonetic Study of Cantonese Speech Patterns",
  ],
  cs: [
    "BruinWatch: A Campus Safety Application",
  ],
  anthropology: [
    "Illness Narratives in Hyperthyroidism: A Qualitative Interview Study",
    "Motherhood in Chaoshan: How Population Policies Shape Women's Perspectives on Childbearing",
  ],
  "cs-linguistics": [
    "An English Syntax Tree Parser Implemented in Haskell",
  ],
  "anthropology-cs": [
    "Designing Culturally-Aware AI Systems",
  ],
  "anthropology-linguistics": [
    "A Comparative Study of Language-Related Metaphors in English and Mandarin",
    "Media Representations of Female Terrorists: A Linguistic Analysis",
  ],
  "anthropology-cs-linguistics": [
    "Cultural Fairness in Large Language Models",
    "Simulating Shopper Behavior with LLM-Based Agents",
  ],
};

type SketchBubbleProps = {
  area: Area;
  selected: boolean;
  onClick: () => void;
  index: number;
};

type ResearchCloudBubblesProps = {
  initialSelected?: Area["id"][];
};

type RoughFrameProps = {
  children: ReactNode;
  className: string;
  stroke?: string;
  fill?: string;
  fillStyle?: "hachure" | "solid" | "zigzag" | "cross-hatch" | "dots" | "dashed" | "zigzag-line";
  fillWeight?: number;
  hachureGap?: number;
  hachureAngle?: number;
  strokeWidth?: number;
  roughness?: number;
  bowing?: number;
  radius?: number;
};

function roundedRectPath(width: number, height: number, radius: number) {
  const r = Math.min(radius, width / 2, height / 2);

  return `
    M ${r} 2
    L ${width - r} 2
    Q ${width - 2} 2 ${width - 2} ${r}
    L ${width - 2} ${height - r}
    Q ${width - 2} ${height - 2} ${width - r} ${height - 2}
    L ${r} ${height - 2}
    Q 2 ${height - 2} 2 ${height - r}
    L 2 ${r}
    Q 2 2 ${r} 2
    Z
  `;
}

function RoughFrame({
  children,
  className,
  stroke = "#64748b",
  fill = "rgba(255, 255, 255, 0.72)",
  fillStyle = "solid",
  fillWeight,
  hachureGap,
  hachureAngle,
  strokeWidth = 1.5,
  roughness = 2.2,
  bowing = 1.4,
  radius = 24,
}: RoughFrameProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || size.width === 0 || size.height === 0) return;

    svg.innerHTML = "";
    svg.setAttribute("viewBox", `0 0 ${size.width} ${size.height}`);

    const rc = rough.svg(svg);
    const frame = rc.path(roundedRectPath(size.width, size.height, radius), {
      stroke,
      strokeWidth,
      roughness,
      bowing,
      fill,
      fillStyle,
      fillWeight,
      hachureGap,
      hachureAngle,
    });

    svg.appendChild(frame);
  }, [
    bowing,
    fill,
    fillStyle,
    fillWeight,
    hachureAngle,
    hachureGap,
    radius,
    roughness,
    size,
    stroke,
    strokeWidth,
  ]);

  return (
    <div ref={containerRef} className={className}>
      <svg ref={svgRef} className="rough-frame-svg" aria-hidden="true" />
      <div className="rough-frame-content">{children}</div>
    </div>
  );
}

function SketchBubble({ area, selected, onClick, index }: SketchBubbleProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    svg.innerHTML = "";

    const rc = rough.svg(svg);

    const shape = rc.path(
      "M55 105 C28 60 70 25 125 34 C160 5 222 26 230 75 C283 86 275 155 215 165 C165 192 78 175 55 105 Z",
      {
        stroke: selected ? "#38bdf8" : "#64748b",
        strokeWidth: selected ? 2.1 : 1.5,
        roughness: 2.8,
        bowing: 1.8,
        fill: selected
          ? "rgba(232, 247, 255, 0.78)"
          : "rgba(255, 255, 255, 0.58)",
        fillStyle: "solid",
      }
    );

    svg.appendChild(shape);

    const accent = rc.path("M42 126 C92 152 174 154 245 124", {
      stroke: "rgba(125, 211, 252, 0.45)",
      strokeWidth: 1.1,
      roughness: 2.4,
      fill: "none",
    });

    svg.appendChild(accent);
  }, [selected]);

  return (
    <button
      type="button"
      className={`sketch-bubble bubble-${index} ${selected ? "selected" : ""}`}
      style={{ left: `${area.x}%`, top: `${area.y}%` }}
      onClick={onClick}
    >
      <svg ref={svgRef} className="bubble-svg" viewBox="0 0 300 200" />
      <span className="bubble-content">
        <span className="bubble-icon">{area.icon}</span>
        <span className="bubble-name">{area.name}</span>
      </span>
    </button>
  );
}

export default function ResearchCloudBubbles({ initialSelected = [] }: ResearchCloudBubblesProps) {
  const [selected, setSelected] = useState<Area["id"][]>(initialSelected);
  const navigate = useNavigate();
  const initialSelectedKey = initialSelected.join("|");

  useEffect(() => {
    setSelected(initialSelected);
  }, [initialSelectedKey]);

  const toggle = (id: Area["id"]) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const selectedKey = [...selected].sort().join("-");
  const selectedProjects = projectMap[selectedKey] ?? [];

  const viewDetails = () => {
    if (selectedKey) {
      navigate(`/area/${selectedKey}`);
    }
  };

  return (
    <section className="research-cloud-section">
      <div className="research-copy">
        <h2>Explore My Research Areas</h2>
        <p>Mix and match to discover my interdisciplinary connections</p>
      </div>

      <div className="cloud-stage">
        <div className="sketch-swirl swirl-one" />
        <div className="sketch-swirl swirl-two" />
        <div className="sketch-dot dot-one" />
        <div className="sketch-dot dot-two" />
        <div className="sketch-dot dot-three" />

        {areas.map((area, index) => (
          <SketchBubble
            key={area.id}
            area={area}
            index={index}
            selected={selected.includes(area.id)}
            onClick={() => toggle(area.id)}
          />
        ))}
      </div>

      {selected.length > 0 && (
        <RoughFrame
          className="research-result-card"
          stroke="rgba(30, 41, 59, 0.62)"
          fill="rgba(255, 255, 255, 0.76)"
          strokeWidth={1.8}
          roughness={2.5}
          bowing={1.6}
          radius={28}
        >
          <div>
            <h3>Research in {selected.length > 1 ? "these areas" : "this area"}</h3>

            <div className="selected-tags">
              {selected.map((id) => {
                const area = areas.find((item) => item.id === id);
                if (!area) return null;

                return (
                  <RoughFrame
                    className="selected-tag"
                    key={id}
                    stroke="#7dd3fc"
                    fill="rgba(224, 242, 254, 0.92)"
                    strokeWidth={1.1}
                    roughness={1.8}
                    bowing={1.1}
                    radius={999}
                  >
                    {area.name}
                  </RoughFrame>
                );
              })}
            </div>

            <div className="project-list">
              {selectedProjects.map((project) => (
                <RoughFrame
                  className="project-line"
                  key={project}
                  stroke="rgba(148, 163, 184, 0.58)"
                  fill="rgba(255, 255, 255, 0.86)"
                  strokeWidth={1.1}
                  roughness={2}
                  bowing={1.2}
                  radius={6}
                >
                  {project}
                </RoughFrame>
              ))}
            </div>
          </div>

          <button type="button" className="view-button" onClick={viewDetails}>
            <RoughFrame
              className="view-button-frame"
              stroke="#64748b"
              fill="rgba(224, 242, 254, 0.55)"
              fillStyle="hachure"
              fillWeight={1.4}
              hachureGap={6}
              hachureAngle={-12}
              strokeWidth={1.5}
              roughness={2.1}
              bowing={1.2}
              radius={999}
            >
              View Details →
            </RoughFrame>
          </button>
        </RoughFrame>
      )}
    </section>
  );
}
