import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { ArrowLeft, FileText } from "lucide-react";
import { motion } from "motion/react";
import { Header } from "../components/Header";
import { SketchyBox } from "../components/SketchyBox";

type ResearchProject = {
  title: string;
  description: string;
  href?: string;
};

type ResearchSection = {
  id: string;
  title: string;
  description: string;
  projects: ResearchProject[];
};

const researchSections: ResearchSection[] = [
  {
    id: "linguistics",
    title: "Linguistics",
    description: "Understanding how language encodes meaning, structure, and social context across cultures.",
    projects: [
      {
        title: "Tone 3 Sandhi and Stress Interaction",
        description: "Examining how tonal processes interact with prosodic structure in Mandarin",
        href: "/pdfs/tone3.pdf",
      },
      {
        title: "Phonetic Variation in Cantonese",
        description: "Analyzing acoustic patterns and variation in spoken Cantonese",
        href: "/pdfs/cantonese.pdf",
      },
      {
        title: "Predicate Decomposition and Lambda Calculus in Mandarin Resultative Verb Compounds",
        description: "Applying formal semantic tools to analyze complex verb constructions in Mandarin",
      }
    ],
  },
  {
    id: "cs",
    title: "Computer Science",
    description: "Building intelligent systems with a focus on language models, agents, and human-centered AI.",
    projects: [
      {
        title: "BruinWatch — Campus Safety Platform",
        description: "Designing a real-time system for reporting and responding to safety incidents",
        href: "https://github.com/LyannaChen/BruinWatch",
      },
    ],
  },
  {
    id: "anthropology",
    title: "Anthropology",
    description: "Studying how people construct meaning, identity, and experience through culture and narrative.",
    projects: [
      {
        title: "Illness Narratives in Hyperthyroidism",
        description: "Exploring how patients describe and make sense of chronic illness",
      },
      {
        title: "Motherhood and Policy in Chaoshan",
        description: "Investigating how population policies shape women's perspectives on childbearing",
      },
    ],
  },
  {
    id: "anthropology-cs",
    title: "Anthropology × Computer Science",
    description: "Designing AI systems that are socially aware, culturally grounded, and human-centered.",
    projects: [
      {
        title: "Human-AI Interaction in Social Contexts",
        description: "Studying how people interpret and respond to AI behavior",
      },
    ],
  },
  {
    id: "cs-linguistics",
    title: "Computer Science × Linguistics",
    description: "Applying computational methods to understand and generate human language.",
    projects: [
      {
        title: "English Syntax Tree Parser",
        description: "Implementing syntactic parsing using functional programming (Haskell)",
      },
    ],
  },
  {
    id: "anthropology-linguistics",
    title: "Anthropology × Linguistics",
    description: "Exploring how language reflects culture, identity, and social structure.",
    projects: [
      {
        title: "Media Language and Gender",
        description: "Analyzing representations of female terrorists in media discourse",
        href: "/pdfs/terrorist.pdf",
      },
    ],
  },
  {
    id: "anthropology-cs-linguistics",
    title: "Anthropology × Computer Science × Linguistics",
    description:
      "Bringing together cultural insight, linguistic theory, and AI to build more socially aligned language technologies.",
    projects: [
      {
        title: "Cultural Fairness in LLMs",
        description: "Measuring and mitigating cultural bias in language model outputs",
      },
      {
        title: "Shopper Simulation Agents",
        description: "Building persona-driven agents for realistic decision-making",
      },
    ],
  },
];

export function ResearchPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const activeSection = location.hash.replace("#", "");

  useEffect(() => {
    if (!location.hash) return;

    requestAnimationFrame(() => {
      document
        .getElementById(location.hash.slice(1))
        ?.scrollIntoView({ block: "start", behavior: "auto" });
    });
  }, [location.hash]);

  return (
    <div className="min-h-screen bg-[#fefdfb] relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg className="w-full h-full">
          <defs>
            <pattern id="research-dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#d6d3d1" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#research-dots)" />
        </svg>
      </div>

      <Header />
      <main className="relative max-w-5xl mx-auto px-6 py-12">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() =>
            navigate("/", {
              state: {
                restoreResearchAreas: activeSection,
              },
            })
          }
          className="flex items-center gap-2 text-slate-700 hover:text-slate-900 mb-10 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className="text-5xl mb-5 text-slate-900 font-light">Research Areas</h1>
                  <svg className="mb-6" width="120" height="10" viewBox="0 0 120 10">
            <path
              d="M 3 5 Q 32 2, 60 5 T 117 5"
              stroke="#38bdf8"
              strokeWidth="3"
              fill="none"
              opacity="0.55"
            />
          </svg>
        </motion.div>

        <div className="space-y-16">
          {researchSections.map((section, sectionIndex) => (
            <motion.section
              id={section.id}
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: sectionIndex * 0.05 }}
              className="scroll-mt-28"
            >
              <div className="mb-7">
                <h2 className="text-4xl mb-4 text-slate-900 font-light">{section.title}</h2>
                <p className="text-xl text-slate-700 max-w-3xl font-light">
                  {section.description}
                </p>
              </div>

              <div className="grid gap-6">
                {section.projects.map((project) => (
                  <SketchyBox
                    key={project.title}
                    variant="light"
                    className="bg-white hover:bg-stone-50/50 transition-colors"
                  >
                    <article className="p-6 flex gap-4">
                      <div className="w-12 h-12 flex items-center justify-center flex-shrink-0 relative">
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 48 48">
                          <rect
                            x="2"
                            y="2"
                            width="44"
                            height="44"
                            rx="8"
                            fill="none"
                            stroke="#78716c"
                            strokeWidth="1.5"
                            opacity="0.4"
                          />
                        </svg>
                        <FileText className="w-6 h-6 text-slate-700 relative z-10" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h4 className="text-xl mb-2 text-slate-900 font-light">
                          {project.href ? (
                            <a
                              href={project.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-sky-600 underline decoration-sky-300 decoration-2 underline-offset-4 transition-colors"
                            >
                              {project.title}
                            </a>
                          ) : (
                            project.title
                          )}
                        </h4>
                        <p className="text-slate-700 font-light">{project.description}</p>
                      </div>
                    </article>
                  </SketchyBox>
                ))}
              </div>
            </motion.section>
          ))}
        </div>
      </main>
    </div>
  );
}
