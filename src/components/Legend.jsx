import { useState } from "react";
import ColumnIcon from "./ColumnIcon";

export default function Legend() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) {
    return (
      <button
        onClick={() => setDismissed(false)}
        className="absolute top-16 left-4 z-10 w-9 h-9 rounded-full
                   bg-slate-800/80 backdrop-blur-md border border-slate-700
                   text-amber-300 text-sm font-bold shadow-lg
                   hover:bg-slate-700 hover:border-amber-400/40 transition-all duration-200
                   flex items-center justify-center"
        title="How It Works"
      >
        ?
      </button>
    );
  }

  return (
    <div className="absolute top-16 left-4 z-10 w-80 animate-fade-in">
      <div className="bg-slate-800/90 backdrop-blur-lg border border-slate-700 rounded-xl
                      shadow-xl max-h-[calc(100vh-6rem)] flex flex-col">
        <div className="flex items-start justify-between px-5 pt-4 pb-2">
          <h3 className="text-sm font-semibold text-amber-300 flex items-center gap-1.5">
            <ColumnIcon size={13} /> How It Works
          </h3>
          <button
            onClick={() => setDismissed(true)}
            className="text-slate-500 hover:text-white text-xs transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="overflow-y-auto px-5 pb-4 space-y-3 text-[11.5px] text-slate-300 leading-relaxed">
          <p>
            In <em className="text-amber-200">The Hierarchy</em> by James Islington,
            the Catenan Republic runs on <strong className="text-white">Will</strong> — life energy
            that each citizen must cede upward.
          </p>

          {/* The ratio mechanic */}
          <div className="bg-slate-900/60 rounded-lg p-3 space-y-2 border border-slate-700/60">
            <div className="flex items-start gap-2">
              <span className="text-amber-400 text-sm mt-px">①</span>
              <div>
                <span className="text-white font-semibold">Feeding Ratios</span>
                <span className="text-slate-400"> — 8 Octavii feed 1 Septimus, 7 Septimii feed 1 Sextus,
                  and so on (8→7→6→5→4→3→2). Each tier's ratio = its rank number.</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-amber-400 text-sm mt-px">②</span>
              <div>
                <span className="text-white font-semibold">50% Ceded</span>
                <span className="text-slate-400"> — Each tier cedes half its accumulated Will upward. The Princeps keeps everything.</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-amber-400 text-sm mt-px">③</span>
              <div>
                <span className="text-white font-semibold">Factorial Population</span>
                <span className="text-slate-400"> — Population at rank R = R! (factorial).
                  Total: 46,233 people, with 40,320 Octavii at the base.</span>
              </div>
            </div>
          </div>

          {/* Totius / Not Totius */}
          <div className="bg-slate-900/60 rounded-lg p-3 border border-slate-700/60">
            <p className="text-white font-semibold mb-1.5">Totius vs Not Totius</p>
            <p className="text-slate-400 text-[10.5px]">
              <span className="text-amber-300">Totius</span> = total Will wielded (own + received) before ceding — your full power in a burst.{" "}
              <span className="text-amber-300">Not Totius</span> = what you keep after ceding 50% — your everyday strength.
            </p>
          </div>

          <div className="border-t border-slate-700 pt-2.5 mt-2 space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-gradient-to-br from-amber-400 to-amber-500" />
              <span>Brighter = higher rank & more power</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-amber-300">×N</span>
              <span>Power multiplier vs. an Octavus</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                <div className="w-2 h-0.5 bg-amber-400 rounded" />
                <div className="w-2 h-0.5 bg-amber-400 rounded" />
                <div className="w-2 h-0.5 bg-amber-400 rounded" />
              </div>
              <span>Lines between tiers = feeding ratio count</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px]">👆</span>
              <span>Click any tier to explore details</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
