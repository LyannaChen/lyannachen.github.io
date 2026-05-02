import { ArrowLeft, ImageIcon } from "lucide-react";
import { motion } from "motion/react";
import { Link, useParams } from "react-router";
import { Header } from "../components/Header";
import { SketchyBox } from "../components/SketchyBox";
import { bakingExperiments } from "./BakingPage";

export function BakingDetailPage() {
  const { slug } = useParams();
  const experiment = bakingExperiments.find((item) => item.slug === slug);

  if (!experiment) {
    return (
      <div className="min-h-screen bg-[#fefdfb] relative overflow-hidden">
        <Header />
        <main className="relative max-w-4xl mx-auto px-6 py-12">
          <Link
            to="/baking"
            className="flex items-center gap-2 text-slate-700 hover:text-slate-900 mb-10 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Baking
          </Link>

          <SketchyBox variant="medium" className="bg-white/85">
            <section className="p-8">
              <h1 className="text-4xl text-slate-900 font-light mb-4">
                Baking experiment not found
              </h1>
              <p className="text-slate-700 font-light">
                This baking page does not exist yet.
              </p>
            </section>
          </SketchyBox>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fefdfb] relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg className="w-full h-full">
          <defs>
            <pattern id="baking-detail-dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#d6d3d1" opacity="0.35" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#baking-detail-dots)" />
        </svg>
      </div>

      <Header />
      <main className="relative max-w-6xl mx-auto px-6 py-12">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Link
            to="/baking"
            className="flex items-center gap-2 text-slate-700 hover:text-slate-900 mb-10 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Baking
          </Link>
        </motion.div>

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
          <h1 className="text-5xl mb-5 text-slate-900 font-light">
            {experiment.title}
          </h1>
          <p className="text-xl text-slate-700 max-w-3xl font-light leading-relaxed">
            {experiment.description}
          </p>
        </motion.section>

        {experiment.images.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiment.images.map((image, index) => (
              <motion.div
                key={image}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
              >
                <SketchyBox variant="light" className="bg-white/85 overflow-hidden">
                  <img
                    src={image}
                    alt={`${experiment.title} ${index + 1}`}
                    className="relative z-10 w-full aspect-[4/3] object-cover p-3"
                  />
                </SketchyBox>
              </motion.div>
            ))}
          </div>
        ) : (
          <SketchyBox variant="medium" className="bg-white/85">
            <section className="p-8 min-h-72 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 mb-5 relative flex items-center justify-center text-slate-700">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 64 64">
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="1.5"
                    opacity="0.45"
                  />
                </svg>
                <ImageIcon className="w-8 h-8 relative z-10" strokeWidth={1.5} />
              </div>
              <h2 className="text-3xl text-slate-900 font-light mb-3">
                Photos coming soon
              </h2>
            </section>
          </SketchyBox>
        )}
      </main>
    </div>
  );
}
