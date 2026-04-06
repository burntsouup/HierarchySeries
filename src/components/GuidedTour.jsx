import { useState, useEffect, useCallback } from "react";
import { computeAllWillStats, formatNumber, formatWill } from "../utils/willMath";

const stats = computeAllWillStats();

/**
 * Tour steps: intro → tier 8→1 → conclusion.
 * All numbers are computed from willMath.js for consistency.
 */
const TOUR_STEPS = [
  {
    rank: null,
    title: "Welcome to the Hierarchy",
    body: `In the Catenan Republic, every citizen must cede half their Will — their life energy — to the tier above them. The ratios decrease as you climb: 8 Octavii feed 1 Septimus, 7 Septimii feed 1 Sextus, and so on. The result is a brutal 8-tier pyramid of ${formatNumber(stats.totalPopulation)} people. Let's walk through it.`,
  },
  {
    rank: 8,
    title: "Tier 8 — Octavus (Eighth)",
    body: `The base: ${formatNumber(stats.byRank[8].population)} Octavii. Each generates 1 Will but must cede 50% upward, retaining just ${formatWill(stats.byRank[8].notTotius)}. Eight Octavii pool their Will to feed a single Septimus — notice the 8 lines flowing upward from this tier.`,
  },
  {
    rank: 7,
    title: "Tier 7 — Septimus (Seventh)",
    body: `The ${formatNumber(stats.byRank[7].population)} Septimii are general labourers. Each receives Will from 8 Octavii below, giving them a Totius of ${formatWill(stats.byRank[7].totius)} — that's ×${parseFloat((stats.byRank[7].totius / stats.baseTotius).toFixed(1))} an Octavus. They then cede half upward through 7 lines to a Sextus.`,
  },
  {
    rank: 6,
    title: "Tier 6 — Sextus (Sixth)",
    body: `Where Academy graduates enter. ${stats.byRank[6].population} Sexti, each wielding ${formatWill(stats.byRank[6].totius)} Totius (×${parseFloat((stats.byRank[6].totius / stats.baseTotius).toFixed(1))} an Octavus). The protagonist Vis enters here as a Sextus in Governance. Notice 7 lines from Septimus, 6 going up.`,
  },
  {
    rank: 5,
    title: "Tier 5 — Quintus (Fifth)",
    body: `Skilled professionals. ${stats.byRank[5].population} Quinti wielding ${formatWill(stats.byRank[5].totius)} Totius each (×${parseFloat((stats.byRank[5].totius / stats.baseTotius).toFixed(1))} an Octavus). Characters like Ulciscor Telimus (Magnus Quintus in Military) hold real influence as senators. Each receives from ${formatNumber(stats.byRank[5].receivesFrom)} people below.`,
  },
  {
    rank: 4,
    title: "Tier 4 — Quartus (Fourth)",
    body: `Just ${stats.byRank[4].population} Quarti form the upper class. At ${formatWill(stats.byRank[4].totius)} Totius (×${Math.round(stats.byRank[4].totius / stats.baseTotius)} an Octavus), this is where genuine personal power begins. Each one channels the Will of ${formatNumber(stats.byRank[4].receivesFrom)} Octavii below.`,
  },
  {
    rank: 3,
    title: "Tier 3 — Tertius (Third)",
    body: `Only ${stats.byRank[3].population} Tertii — each commanding ${formatWill(stats.byRank[3].totius)} Totius (×${Math.round(stats.byRank[3].totius / stats.baseTotius)} an Octavus). Ericius (Magnus Tertius) supervises Vis. Each receives the concentrated Will of ${formatNumber(stats.byRank[3].receivesFrom)} Octavii through the chain.`,
  },
  {
    rank: 2,
    title: "Tier 2 — Dimidius (Half-Ruler)",
    body: `Only ${stats.byRank[2].population} Dimidii exist. The name means "half" — each wields roughly half the Princeps's power. At ${formatWill(stats.byRank[2].totius)} Totius (×${Math.round(stats.byRank[2].totius / stats.baseTotius)} an Octavus), they can power city-scale constructs. Notice just 2 lines rising to the apex.`,
  },
  {
    rank: 1,
    title: "Tier 1 — Princeps (Ruler)",
    body: `One person. ${formatWill(stats.byRank[1].totius)} Totius — the concentrated Will of all ${formatNumber(stats.byRank[1].mixedIn)} citizens. That's ×${Math.round(stats.byRank[1].totius / stats.baseTotius)} an Octavus. And unlike everyone else, the Princeps cedes nothing — they keep it all.`,
  },
  {
    rank: null,
    title: "The Cost of Power",
    body: `The Hierarchy concentrates the Will of ${formatNumber(stats.totalPopulation)} people into one. The ${formatNumber(stats.byRank[8].population)} Octavii — ${Math.round(stats.byRank[8].population / stats.totalPopulation * 100)}% of the population — retain just ${formatWill(stats.byRank[8].notTotius)} Will each. Meanwhile, one Princeps wields ×${Math.round(stats.byRank[1].totius / stats.baseTotius)}. That is the Hierarchy.`,
  },
];

export default function GuidedTour({ active, onEnd, onSelectRank }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (active) setStep(0);
  }, [active]);

  // Apply step effects
  useEffect(() => {
    if (!active) return;
    const current = TOUR_STEPS[step];
    if (!current) return;
    onSelectRank(current.rank);
  }, [active, step, onSelectRank]);

  const next = useCallback(() => {
    if (step < TOUR_STEPS.length - 1) {
      setStep((s) => s + 1);
    } else {
      onEnd();
    }
  }, [step, onEnd]);

  const prev = useCallback(() => {
    setStep((s) => Math.max(0, s - 1));
  }, []);

  if (!active) return null;

  const current = TOUR_STEPS[step];
  const isFirst = step === 0;
  const isLast = step === TOUR_STEPS.length - 1;
  const progress = ((step + 1) / TOUR_STEPS.length) * 100;

  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 w-[500px] max-w-[92vw] animate-fade-in">
      <div className="bg-slate-800/95 backdrop-blur-lg border border-amber-400/30 rounded-xl
                      shadow-2xl shadow-amber-900/20 overflow-hidden">
        {/* Progress bar */}
        <div className="h-1 bg-slate-700">
          <div
            className="h-full bg-amber-400 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="px-5 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono text-amber-400/70">
              STEP {step + 1} OF {TOUR_STEPS.length}
            </span>
            <button
              onClick={onEnd}
              className="text-slate-500 hover:text-white text-xs transition-colors"
            >
              Skip tour ✕
            </button>
          </div>

          <h3 className="text-base font-bold text-white mb-2">{current.title}</h3>
          <p className="text-sm text-slate-300 leading-relaxed mb-4">{current.body}</p>

          <div className="flex items-center justify-between">
            <button
              onClick={prev}
              disabled={isFirst}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                ${isFirst
                  ? "text-slate-600 cursor-not-allowed"
                  : "text-slate-300 bg-slate-700 hover:bg-slate-600"
                }`}
            >
              ← Back
            </button>

            <div className="flex gap-1">
              {TOUR_STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    i === step ? "bg-amber-400 scale-125" : i < step ? "bg-amber-400/40" : "bg-slate-600"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="px-4 py-1.5 rounded-lg text-xs font-semibold transition-all
                         bg-amber-500 text-slate-900 hover:bg-amber-400 shadow-md shadow-amber-500/20"
            >
              {isLast ? "Finish" : "Next →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
