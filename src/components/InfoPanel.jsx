import { useMemo } from "react";
import HIERARCHY_DATA from "../data/hierarchyData";
import { computeAllWillStats, formatNumber, formatPct, formatWill } from "../utils/willMath";

const TIER_ACCENT = {
  1: { border: "border-amber-400/60", bg: "bg-amber-400/10", text: "text-amber-300", bar: "bg-amber-400" },
  2: { border: "border-amber-500/50", bg: "bg-amber-500/10", text: "text-amber-400", bar: "bg-amber-500" },
  3: { border: "border-amber-600/40", bg: "bg-amber-600/10", text: "text-amber-400", bar: "bg-amber-600" },
  4: { border: "border-yellow-700/40", bg: "bg-yellow-700/10", text: "text-yellow-500", bar: "bg-yellow-700" },
  5: { border: "border-orange-800/30", bg: "bg-orange-800/10", text: "text-orange-400", bar: "bg-orange-800" },
  6: { border: "border-orange-900/30", bg: "bg-orange-900/10", text: "text-orange-500", bar: "bg-orange-900" },
  7: { border: "border-stone-700/30", bg: "bg-stone-700/10", text: "text-stone-400", bar: "bg-stone-700" },
  8: { border: "border-stone-800/30", bg: "bg-stone-800/10", text: "text-stone-500", bar: "bg-stone-800" },
};

const BRANCH_COLOURS = {
  governance: "#fbbf24",
  military: "#ef4444",
  religion: "#a78bfa",
  academy: "#60a5fa",
  outside: "#94a3b8",
};

export default function InfoPanel({ selectedRank, characters = [], onClose }) {
  const tier = HIERARCHY_DATA.find((t) => t.rank === selectedRank);
  const { byRank, totalPopulation, totalRetained } = useMemo(
    () => computeAllWillStats(),
    []
  );
  const accent = TIER_ACCENT[selectedRank] || TIER_ACCENT[8];
  const stats = byRank[selectedRank];

  if (!tier || !stats) return null;

  const retainedPct = tier.willTransferRate > 0 ? 100 - tier.willTransferRate : 100;
  const popShare = (tier.population / totalPopulation) * 100;
  const powerMultiplier = stats.totius / (byRank[8]?.totius || 1);
  const multStr = powerMultiplier < 10
    ? `×${parseFloat(powerMultiplier.toFixed(1))}`
    : `×${Math.round(powerMultiplier).toLocaleString()}`;

  // Characters in this tier
  const tierChars = characters.filter((ch) => ch.rank === selectedRank);

  // Feeding relationship text
  const tierAbove = HIERARCHY_DATA.find((t) => t.rank === selectedRank - 1);
  const feedingText = tier.feedingRatio > 0 && tierAbove
    ? `${tier.feedingRatio} ${tier.latinPlural} → 1 ${tierAbove.latinTitle}`
    : null;

  return (
    <div
      className={`absolute top-0 right-0 z-20 h-full w-[380px] max-w-[90vw]
                  bg-slate-900/95 backdrop-blur-lg border-l ${accent.border}
                  shadow-2xl overflow-y-auto transition-transform duration-300
                  animate-slide-in`}
    >
      {/* Header */}
      <div className={`px-5 py-4 border-b ${accent.border} ${accent.bg}`}>
        <div className="flex items-start justify-between">
          <div>
            <div className={`text-xs font-mono ${accent.text} mb-1`}>
              TIER {tier.rank} OF 8
            </div>
            <h2 className="text-xl font-bold text-white leading-tight">
              {tier.latinTitle}
            </h2>
            <p className="text-sm text-slate-400">{tier.englishEquivalent}</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-white transition-colors text-xl leading-none mt-1"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Will Transfer Visual */}
      <div className="px-5 py-4 border-b border-slate-700/50">
        <h3 className={`text-xs font-semibold uppercase tracking-wider ${accent.text} mb-3`}>
          Will Distribution
        </h3>
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-slate-400">
            <span>Retained</span>
            <span className="text-white font-mono">{retainedPct}%</span>
          </div>
          <div className="h-3 bg-slate-800 rounded-full overflow-hidden flex">
            <div
              className={`${accent.bar} transition-all duration-700 ${tier.willTransferRate > 0 ? "rounded-l-full" : "rounded-full"}`}
              style={{ width: `${retainedPct}%` }}
            />
            {tier.willTransferRate > 0 && (
              <div
                className="bg-red-500/60 rounded-r-full transition-all duration-700"
                style={{ width: `${tier.willTransferRate}%` }}
              />
            )}
          </div>
          <div className="flex justify-between text-xs text-slate-500">
            <span className={accent.text}>■ Kept (Not Totius)</span>
            {tier.willTransferRate > 0 && (
              <span className="text-red-400">■ Ceded upward ({tier.willTransferRate}%)</span>
            )}
          </div>
        </div>
      </div>

      {/* Key Stats */}
      <div className="px-5 py-4 border-b border-slate-700/50">
        <h3 className={`text-xs font-semibold uppercase tracking-wider ${accent.text} mb-3`}>
          By the Numbers
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <Stat label="Population" value={formatNumber(tier.population)} accent={accent} />
          <Stat
            label="vs. Octavus"
            value={selectedRank === 8 ? "Baseline" : multStr}
            accent={accent}
            highlight={selectedRank !== 8}
          />
          <Stat label="Totius (Full Power)" value={formatWill(stats.totius)} accent={accent} highlight />
          <Stat label="Not Totius (Retained)" value={formatWill(stats.notTotius)} accent={accent} />
          <Stat
            label="Receives Will From"
            value={stats.receivesFrom > 0 ? `${formatNumber(stats.receivesFrom)} people` : "None"}
            accent={accent}
          />
          <Stat
            label="Will Mixed In From"
            value={`${formatNumber(stats.mixedIn)} people`}
            accent={accent}
          />
          <Stat label="% of Population" value={formatPct(popShare)} accent={accent} />
          <Stat label="Cede Rate" value={`${tier.willTransferRate}%`} accent={accent} negative={tier.willTransferRate > 0} />
        </div>

        {/* Feeding relationship */}
        {feedingText && (
          <div className="mt-3 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
            <p className="text-[11px] text-amber-300 font-mono text-center">
              {feedingText}
            </p>
          </div>
        )}

        {/* Narrative insight */}
        <div className="mt-3 px-3 py-2 rounded-lg bg-slate-800/60 border border-slate-700/50">
          <p className="text-[11px] text-slate-400 leading-relaxed">
            {selectedRank === 1 ? (
              <>
                A single person — <span className="text-white">{formatPct(popShare)}</span> of
                the population — wields <span className={accent.text}>{formatWill(stats.totius)}</span> Will
                (Totius), concentrating the energy of all{" "}
                <span className="text-white">{formatNumber(stats.mixedIn)}</span> citizens.
                That's <span className={accent.text}>{multStr}</span> the power of an Octavus.
              </>
            ) : selectedRank === 8 ? (
              <>
                <span className="text-white">{formatNumber(tier.population)}</span> people — {formatPct(popShare)} of
                the nation — each generating 1 Will, but retaining
                only <span className={accent.text}>{formatWill(stats.notTotius)}</span> after
                ceding {tier.willTransferRate}%.{" "}
                {tier.feedingRatio} Octavii feed a single Septimus above.
              </>
            ) : (
              <>
                Each of the {tier.population.toLocaleString()} {tier.latinPlural} wields{" "}
                <span className={accent.text}>{formatWill(stats.totius)}</span> Totius
                ({multStr} an Octavus), receiving Will from{" "}
                <span className="text-white">{formatNumber(stats.receivesFrom)}</span> people below
                and retaining <span className={accent.text}>{formatWill(stats.notTotius)}</span> after
                ceding {tier.willTransferRate}%.
              </>
            )}
          </p>
        </div>
      </div>

      {/* Characters in this tier */}
      {tierChars.length > 0 && (
        <div className="px-5 py-4 border-b border-slate-700/50">
          <h3 className={`text-xs font-semibold uppercase tracking-wider ${accent.text} mb-3`}>
            Characters at this Tier
          </h3>
          <div className="space-y-2">
            {tierChars.map((ch) => (
              <div
                key={ch.id}
                className={`flex items-start gap-3 px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-700/40
                  ${ch.deceased ? "opacity-50" : ""}`}
              >
                <div
                  className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                  style={{ background: BRANCH_COLOURS[ch.branch] || "#94a3b8" }}
                />
                <div className="min-w-0">
                  <div className={`text-sm font-semibold text-white ${ch.deceased ? "line-through" : ""}`}>
                    {ch.name}
                    {ch.deceased && <span className="text-red-400 ml-1 no-underline text-xs">†</span>}
                  </div>
                  <div
                    className="text-[10px] font-mono mt-0.5"
                    style={{ color: BRANCH_COLOURS[ch.branch] || "#94a3b8" }}
                  >
                    {ch.title}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                    {ch.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lore */}
      <div className="px-5 py-4 border-b border-slate-700/50">
        <h3 className={`text-xs font-semibold uppercase tracking-wider ${accent.text} mb-3`}>
          About the {tier.latinTitle}
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed">{tier.lore}</p>
      </div>

      {/* Real-World Analogy */}
      <div className="px-5 py-4">
        <h3 className={`text-xs font-semibold uppercase tracking-wider ${accent.text} mb-3`}>
          Real-World Analogy
        </h3>
        <div className={`${accent.bg} border ${accent.border} rounded-lg px-4 py-3`}>
          <p className="text-sm text-slate-300 leading-relaxed italic">
            "{tier.analogy}"
          </p>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, accent, negative, highlight }) {
  return (
    <div className="bg-slate-800/50 rounded-lg px-3 py-2">
      <div className="text-[10px] text-slate-500 uppercase tracking-wide">{label}</div>
      <div
        className={`text-sm font-mono font-semibold mt-0.5 ${
          negative ? "text-red-400" : highlight ? accent.text : "text-white"
        }`}
      >
        {value}
      </div>
    </div>
  );
}
