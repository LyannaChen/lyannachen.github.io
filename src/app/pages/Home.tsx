import { motion } from "motion/react";
import { Link, useLocation } from "react-router";
import { Header } from "../components/Header";
import ResearchBubbles from "../components/ResearchBubbles";
import { SketchyBox } from "../components/SketchyBox";
import rough from "roughjs/bin/rough";
import { useEffect, useRef } from "react";

type ResearchAreaId = "linguistics" | "cs" | "anthropology";

const researchAreaIds = new Set<ResearchAreaId>([
  "linguistics",
  "cs",
  "anthropology",
]);

function isResearchAreaId(value: string): value is ResearchAreaId {
  return researchAreaIds.has(value as ResearchAreaId);
}

const publications = [
  {
    title: "InsideOut: Measuring and Mitigating Insider–Outsider Bias in Interview Script Generation",
    venue: "ACL 2026 Main",
    details: (
  <>
    Yixin Wan*,{" "}
    <strong className="font-semibold text-slate-900">Xingrun Chen</strong>*,
    Kai-Wei Chang (* equal contribution)
  </>
),
  },
  {
    title: "SALESSIM: Benchmarking and Aligning Multimodal Language Models as Retail User Simulators",
    venue: "preprint under submission",
    details: (
  <>
    Yada Pruksachatkun*,{" "}
    Yixin Wan*,{" "}
    <strong className="font-semibold text-slate-900">Xingrun Chen</strong>,
    Kai-Wei Chang, {" "}
    Chien-Sheng Wu (* equal contribution)
  </>
    )
  }
];

function RoughProfileCircle() {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    svg.innerHTML = "";

    const rc = rough.svg(svg);
    const circle = rc.circle(160, 160, 280, {
      stroke: "#38bdf8",
      strokeWidth: 2.2,
      roughness: 2.8,
      bowing: 1.5,
      fill: "none",
    });

    svg.appendChild(circle);

    const secondCircle = rc.circle(162, 158, 268, {
      stroke: "#7dd3fc",
      strokeWidth: 1.2,
      roughness: 3.2,
      bowing: 1.8,
      fill: "none",
    });

    svg.appendChild(secondCircle);
  }, []);

  return (
    <svg
      ref={svgRef}
      className="absolute -inset-8 w-full h-full pointer-events-none"
      viewBox="0 0 320 320"
      aria-hidden="true"
      style={{ transform: "rotate(-5deg)", opacity: 0.5 }}
    />
  );
}

export function Home() {
  const location = useLocation();
  const researchSectionRef = useRef<HTMLDivElement | null>(null);
  const routeState = location.state as { restoreResearchAreas?: string } | null;
  const restoredAreas = routeState?.restoreResearchAreas
    ? routeState.restoreResearchAreas.split("-").filter(isResearchAreaId)
    : [];

  useEffect(() => {
    if (!routeState?.restoreResearchAreas) return;

    requestAnimationFrame(() => {
      researchSectionRef.current?.scrollIntoView({
        block: "start",
        behavior: "auto",
      });
    });
  }, [routeState?.restoreResearchAreas]);

  return (
    <div className="min-h-screen bg-[#fefdfb] relative overflow-hidden">
      {/* Hand-drawn background elements */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <svg className="w-full h-full">
          <defs>
            <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#d6d3d1" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
          {/* Decorative sketchy lines */}
          <path
            d="M 100 100 Q 200 150, 300 100 T 500 100"
            stroke="#e7e5e4"
            strokeWidth="2"
            fill="none"
            opacity="0.3"
          />
          <path
            d="M 800 300 Q 900 250, 1000 300 T 1200 300"
            stroke="#e7e5e4"
            strokeWidth="2"
            fill="none"
            opacity="0.3"
          />
        </svg>
      </div>

      <Header />
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
        {/* Profile Section - Asymmetric Layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid lg:grid-cols-2 gap-12 items-center mb-24"
        >
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="relative">
                <h1 className="text-5xl lg:text-6xl mb-6 text-slate-900 font-light relative">
                  About Me
                  {/* Hand-drawn underline */}
                  <svg className="absolute -bottom-2 left-0 w-3/4 h-4" viewBox="0 0 400 20">
                    <path
                      d="M 5 10 Q 100 15, 200 10 T 395 10"
                      stroke="#38bdf8"
                      strokeWidth="2"
                      fill="none"
                      opacity="0.4"
                    />
                  </svg>
                </h1>
              </div>
             <div className="space-y-4 text-xl text-slate-700 leading-relaxed font-light">
              <p>
                I'm Lyanna (Xingrun) Chen. I'm currently an undergrad majoring in Linguistics,
                Computer Science, and Anthropology with a minor in Data Science Engineering at
                UCLA. I'm fortunate to be mentored by the amazing Elaine Wan and Professor
                Kai-wei Chang at{" "}
                <a
                  href="https://web.cs.ucla.edu/~kwchang/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-normal text-sky-600 underline decoration-sky-300 decoration-2 underline-offset-4 hover:text-sky-700"
                >
                  UCLA NLP Lab
                </a>{" "}
                and Professor Kuan-hao Huang at the{" "}
                <a
                  href="https://khhuang.me/group.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-normal text-sky-600 underline decoration-sky-300 decoration-2 underline-offset-4 hover:text-sky-700"
                >
                  FLAIR Lab
                </a>{" "}
                at Texas A&amp;M.
              </p>

              <p>
                My research interests focus on the intersection of
                technology, language, and culture, specifically building trustworthy and
                responsible LLMs and agents that interact with humans like humans.
              </p>

              <p>
                Outside of academics, I enjoy baking (see some of my experiments{" "}
                <Link
                  to="/baking"
                  className="font-normal text-sky-600 underline decoration-sky-300 decoration-2 underline-offset-4 hover:text-sky-700"
                >
                  here
                </Link>
                ), hiking, and playing Hollow Knight.
              </p>
            </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <div className="relative">
              <RoughProfileCircle />

              <SketchyBox variant="dark" rounded className="w-64 h-64 lg:w-72 lg:h-72 rounded-[45%]">
                <img
                  src="/profile.JPG"
                  alt="Lyanna Chen"
                  className="w-full h-full object-cover rounded-[45%] relative z-10"
                />
              </SketchyBox>

              {/* Hand-drawn accent marks */}
              <svg className="absolute -bottom-6 -left-6 w-20 h-20" viewBox="0 0 80 80">
                <path
                  d="M 10 40 Q 20 30, 40 40 T 70 40"
                  stroke="#38bdf8"
                  strokeWidth="2"
                  fill="none"
                  opacity="0.4"
                />
                <circle cx="15" cy="40" r="3" fill="#38bdf8" opacity="0.3" />
                <circle cx="65" cy="40" r="3" fill="#38bdf8" opacity="0.3" />
              </svg>
            </div>
          </motion.div>
        </motion.div>
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
          className="relative mt-20 pb-10"
        >
          <div className="mb-10">
            <h2 className="text-4xl text-slate-900 font-light relative inline-block">
              Selected Publications
              <svg className="absolute -bottom-2 left-0 w-full h-4" viewBox="0 0 260 20">
                <path
                  d="M 4 11 Q 70 5, 130 10 T 256 9"
                  stroke="#38bdf8"
                  strokeWidth="2"
                  fill="none"
                  opacity="0.45"
                />
              </svg>
            </h2>
          </div>

          <div className="grid gap-5">
            {publications.map((publication) => (
              <SketchyBox
                key={publication.title}
                variant="medium"
                className="bg-white/80 hover:bg-sky-50/40 transition-colors"
              >
                <article className="relative p-6 md:p-7">
                  <p className="text-sm uppercase tracking-wide text-sky-600 mb-3">
                    {publication.venue}
                  </p>
                  <h3 className="text-2xl text-slate-900 font-light mb-3">
                    {publication.title}
                  </h3>
                  <p className="text-slate-700 leading-relaxed font-light">
                    {publication.details}
                  </p>
                </article>
              </SketchyBox>
            ))}
          </div>
        </motion.section>
        <div ref={researchSectionRef}>
          <ResearchBubbles initialSelected={restoredAreas} />
        </div>


      </div>
    </div>
  );
}
