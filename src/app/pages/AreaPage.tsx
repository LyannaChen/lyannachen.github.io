import { useParams, useNavigate } from "react-router";
import { ArrowLeft, BookOpen, FileText } from "lucide-react";
import { motion } from "motion/react";
import { Header } from "../components/Header";
import { SketchyBox } from "../components/SketchyBox";

const areaContent: Record<string, {
  title: string;
  description: string;
  color: string;
  projects: { title: string; description: string; href?: string }[];
}> = {
  linguistics: {
    title: "Linguistics",
    description: "Understanding how language encodes meaning, structure, and social context across cultures.",
    color: "from-slate-500 to-slate-700",
    projects: [
      {
        title: "Tone 3 Sandhi and Stress Interaction",
        description: "Examining how tonal processes interact with prosodic structure in Mandarin",
      },
      {
        title: "Phonetic Variation in Cantonese",
        description: "Analyzing acoustic patterns and variation in spoken Cantonese",
      },
    ],
  },

  cs: {
    title: "Computer Science",
    description: "Building intelligent systems with a focus on language models, agents, and human-centered AI.",
    color: "from-stone-500 to-stone-700",
    projects: [
      {
        title: "BruinWatch — Campus Safety Platform",
        description: "Designing a real-time system for reporting and responding to safety incidents",
        href: "https://github.com/LyannaChen/BruinWatch",
      },
    ],
  },

  anthropology: {
    title: "Anthropology",
    description: "Studying how people construct meaning, identity, and experience through culture and narrative.",
    color: "from-neutral-500 to-neutral-700",
    projects: [
      {
        title: "Illness Narratives in Hyperthyroidism",
        description: "Exploring how patients describe and make sense of chronic illness",
      },
      {
        title: "Motherhood and Policy in Chaoshan",
        description: "Investigating how population policies shape women's perspectives on childbearing",
      }
    ],
  },

  "anthropology-cs": {
    title: "Anthropology × Computer Science",
    description: "Designing AI systems that are socially aware, culturally grounded, and human-centered.",
    color: "from-neutral-500 to-stone-700",
    projects: [
      {
        title: "Human-AI Interaction in Social Contexts",
        description: "Studying how people interpret and respond to AI behavior",
      },
    ],
  },

  "cs-linguistics": {
    title: "Computer Science × Linguistics",
    description: "Applying computational methods to understand and generate human language.",
    color: "from-stone-500 to-slate-700",
    projects: [
      {
        title: "English Syntax Tree Parser",
        description: "Implementing syntactic parsing using functional programming (Haskell)",
      },
    ],
  },

  "anthropology-linguistics": {
    title: "Anthropology × Linguistics",
    description: "Exploring how language reflects culture, identity, and social structure.",
    color: "from-neutral-500 to-slate-700",
    projects: [
      {
        title: "Metaphors in English and Mandarin",
        description: "Comparing conceptual metaphor systems across languages",
      },
      {
        title: "Media Language and Gender",
        description: "Analyzing representations of female terrorists in media discourse",
      },
    ],
  },

  "anthropology-cs-linguistics": {
    title: "Anthropology × Computer Science × Linguistics",
    description: "Bringing together cultural insight, linguistic theory, and AI to build more socially aligned language technologies.",
    color: "from-neutral-600 via-stone-600 to-slate-700",
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
};
export function AreaPage() {
  const { areas } = useParams<{ areas: string }>();
  const navigate = useNavigate();

  const content = areaContent[areas || ""];

  if (!content) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl mb-4">Area not found</h1>
          <button
            onClick={() => navigate("/")}
            className="text-blue-600 hover:underline"
          >
            Return home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fefdfb] relative overflow-hidden">
      {/* Hand-drawn background elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg className="w-full h-full">
          <defs>
            <pattern id="dots-area" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#d6d3d1" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots-area)" />
        </svg>
      </div>

      <Header />
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() =>
            navigate("/", {
              state: {
                restoreResearchAreas: areas,
              },
            })
          }
          className="flex items-center gap-2 text-slate-700 hover:text-slate-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          {/* Hand-drawn accent line */}
          <svg className="mb-6" width="100" height="8" viewBox="0 0 100 8">
            <path
              d="M 2 4 Q 25 2, 50 4 T 98 4"
              stroke="#38bdf8"
              strokeWidth="3"
              fill="none"
              opacity="0.6"
            />
          </svg>
          <h1 className="text-4xl mb-4 text-slate-900 font-light">{content.title}</h1>
          <p className="text-xl text-slate-700 max-w-3xl font-light">{content.description}</p>
        </motion.div>

        {/* Projects Grid */}
        <div className="mb-12">
          <h2 className="text-2xl mb-6 text-slate-900 flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            Research & Projects
          </h2>
          <div className="grid gap-6">
            {content.projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <SketchyBox variant="light" className="bg-white hover:bg-stone-50/50 transition-colors">
                  <div className="p-6 flex gap-4">
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
                      <h3 className="text-xl mb-2 text-slate-900 font-light">
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
                      </h3>
                      <p className="text-slate-700 font-light">{project.description}</p>
                    </div>
                  </div>
                </SketchyBox>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
