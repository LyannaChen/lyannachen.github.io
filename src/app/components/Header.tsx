import { Code2, Mail, SquareUser } from "lucide-react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";

export function Header() {
  const navigate = useNavigate();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-[#fefdfb]/95 backdrop-blur-sm sticky top-0 z-50"
    >
      {/* Hand-drawn border line */}
      <svg className="absolute bottom-0 left-0 w-full h-1" preserveAspectRatio="none" viewBox="0 0 1200 4">
        <path
          d="M 0 2 Q 300 1, 600 2 T 1200 2"
          stroke="#d6d3d1"
          strokeWidth="2"
          fill="none"
        />
      </svg>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Name/Logo */}
          <button
            onClick={() => navigate("/")}
            className="text-2xl text-slate-900 hover:text-slate-700 transition-colors font-light relative group"
          >
            Xingrun Lyanna Chen
            {/* Hand-drawn underline on hover */}
            <svg className="absolute -bottom-1 left-0 w-full h-2 opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 200 8">
              <path
                d="M 2 4 Q 50 2, 100 4 T 198 4"
                stroke="#38bdf8"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
          </button>

          {/* Contact Links */}
          <div className="flex items-center gap-6">
            <a
              href="mailto:lyannachen@ucla.edu"
              className="flex items-center gap-2 text-slate-700 hover:text-slate-900 transition-colors group"
            >
              <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline text-sm">
                Email
              </span>
            </a>
            <a
              href="https://www.linkedin.com/in/lyanna-chen"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-700 hover:text-slate-900 transition-colors group"
            >
              <SquareUser className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline text-sm">
                LinkedIn
              </span>
            </a>
            <a
              href="https://github.com/LyannaChen"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-700 hover:text-slate-900 transition-colors group"
            >
              <Code2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline text-sm">
                GitHub
              </span>
            </a>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
