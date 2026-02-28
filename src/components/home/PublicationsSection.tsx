import React from "react";
import FloatingSection from "@/components/ui/FloatingSection";
import Link from "next/link";
import { Download, ArrowRight, ExternalLink } from "lucide-react";

const PublicationsSection: React.FC = () => {
  return (
    <div id="publications">
      <FloatingSection>
        <h1 className="text-bold text-2xl sm:text-3xl mb-3 sm:mb-4">
          Publications
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base mb-6">
          Research papers and academic contributions.
        </p>

        <div className="bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 shadow-sm transition-all hover:shadow-md">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-100">
                Linear Matrix Formulation for Directional Tangency Constraints
                in Parametric Curve Design
              </h3>
              <div className="flex items-center gap-3 mt-2 text-sm">
                <span className="bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-400 px-2 py-1 rounded-md font-medium">
                  🏆 Best Poster Award - MERS 2025
                </span>
                <span className="text-muted-foreground">
                  University of Moratuwa
                </span>
              </div>
            </div>
          </div>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-6 text-justify">
            In Computer-Aided Design (CAD), parametric curves enable the
            creation of arbitrary yet controllable shapes. During sketching,
            designers often apply geometric constraints such as fixed points or
            tangency, leading to non-linear systems that are costly to solve in
            real time. This work presents a linear matrix formulation for
            enforcing directional tangency constraints without optimization
            algorithms. The method was implemented in Python and C++, and
            integrated into a commercial turbomachinery design tool to maintain
            blade-edge tangency constraints interactively.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/docs/Linear_Matrix_Formulation.pdf"
              download
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </a>
            <Link
              href="/projects/project_constrained_solver"
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-sm font-medium transition-colors"
            >
              View Related Project
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </FloatingSection>
    </div>
  );
};

export default PublicationsSection;
