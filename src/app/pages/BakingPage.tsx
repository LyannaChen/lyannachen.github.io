import { ArrowLeft, ArrowRight, Cookie } from "lucide-react";
import { motion } from "motion/react";
import { Link, useNavigate } from "react-router";
import { Header } from "../components/Header";
import { SketchyBox } from "../components/SketchyBox";

export type BakingExperiment = {
  slug: string;
  title: string;
  description: string;
  images: string[];
};

export const bakingExperiments: BakingExperiment[] = [
  {
    slug: "basque-cheesecakes",
    title: "Basque Cheesecakes",
    description: "Experimenting with flavors...",
    images: [ 
      "/public/baking/basque-cheesecakes/1.JPG",
      "/baking/basque-cheesecakes/2.JPG",
      "/baking/basque-cheesecakes/3.JPG",
      "/baking/basque-cheesecakes/4.JPG",
      "/baking/basque-cheesecakes/5.JPG",
    ],
  },
  {
    slug: "mochi-bread",
    title: "Mochi Bread",
    description: "Countless abalation tests are driving me crazy.",
    images: [
      "/baking/mochi-bread/1.JPG",
    ],
  }, 
  {
    slug: "seaweed-pork-floss-cake",
    title: "Seaweed Pork Floss Cake",
    description: "Some said I should open a store for this",
    images: [
      "/baking/seaweed-pork-floss-cake/1.JPG",
    ],
  },
  {
    slug: "egg-tarts",
    title: "Egg tarts",
    description: "Easiest ever",
    images: [],
  },
];

export function BakingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#fefdfb] relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg className="w-full h-full">
          <defs>
            <pattern id="baking-dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#d6d3d1" opacity="0.35" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#baking-dots)" />
        </svg>
      </div>

      <Header />
      <main className="relative max-w-6xl mx-auto px-6 py-12">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-slate-700 hover:text-slate-900 mb-10 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </motion.button>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <svg className="mb-6" width="120" height="10" viewBox="0 0 120 10">
            <path
              d="M 3 5 Q 32 2, 60 5 T 117 5"
              stroke="#38bdf8"
              strokeWidth="3"
              fill="none"
              opacity="0.55"
            />
          </svg>
          <h1 className="text-5xl mb-5 text-slate-900 font-light">Baking Experiments</h1>
          <p className="text-xl text-slate-700 max-w-3xl font-light leading-relaxed">
            A small shelf for things I bake, test, overthink, and sometimes happily repeat.
          </p>
        </motion.section>

        <div className="grid md:grid-cols-3 gap-6">
          {bakingExperiments.map((experiment, index) => (
            <motion.div
              key={experiment.title}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
            >
              <SketchyBox variant="light" className="h-full bg-white/85 hover:bg-sky-50/40 transition-colors">
                <Link to={`/baking/${experiment.slug}`} className="block h-full">
                  <article className="p-6 min-h-64 flex flex-col">
                    <div className="w-14 h-14 mb-5 relative flex items-center justify-center text-slate-700">
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 56 56">
                        <circle
                          cx="28"
                          cy="28"
                          r="24"
                          fill="none"
                          stroke="#38bdf8"
                          strokeWidth="1.5"
                          opacity="0.45"
                        />
                      </svg>
                      <Cookie className="w-7 h-7 relative z-10" strokeWidth={1.5} />
                    </div>
                    <h2 className="text-2xl text-slate-900 font-light mb-3">
                      {experiment.title}
                    </h2>
                    <p className="text-slate-700 font-light leading-relaxed">
                      {experiment.description}
                    </p>
                    <span className="mt-auto pt-6 flex items-center gap-2 text-sky-600">
                      View photos
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </article>
                </Link>
              </SketchyBox>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
