import { useState, useCallback } from "react";
import { Handle, Position } from "@xyflow/react";

// Colour ramp: rank 1 (brightest gold) → rank 8 (dimmest).
const TIER_COLOURS = {
  1: { from: "#fbbf24", to: "#f59e0b", glow: "rgba(251,191,36,0.8)",  text: "#78350f", badge: "#fffbeb" },
  2: { from: "#f59e0b", to: "#d97706", glow: "rgba(245,158,11,0.65)", text: "#78350f", badge: "#fef3c7" },
  3: { from: "#d97706", to: "#b45309", glow: "rgba(217,119,6,0.5)",   text: "#fffbeb", badge: "#fde68a" },
  4: { from: "#b45309", to: "#92400e", glow: "rgba(180,83,9,0.4)",    text: "#fffbeb", badge: "#fcd34d" },
  5: { from: "#92400e", to: "#78350f", glow: "rgba(146,64,14,0.3)",   text: "#fef3c7", badge: "#fbbf24" },
  6: { from: "#78350f", to: "#5c2d0e", glow: "rgba(120,53,15,0.25)",  text: "#fef3c7", badge: "#f59e0b" },
  7: { from: "#5c2d0e", to: "#451a03", glow: "rgba(69,26,3,0.2)",     text: "#fde68a", badge: "#d97706" },
  8: { from: "#451a03", to: "#331502", glow: "rgba(51,21,2,0.15)",    text: "#fde68a", badge: "#b45309" },
};

const BRANCH_COLOURS = {
  governance: "#fbbf24",
  military: "#ef4444",
  religion: "#a78bfa",
  academy: "#60a5fa",
  outside: "#94a3b8",
};

function formatPopulation(n) {
  if (n >= 1000) return (n / 1000).toFixed(1) + "K";
  return n.toLocaleString();
}

/** Invisible handle style — used as edge anchor points only. */
const hiddenHandle = {
  background: "transparent",
  border: "none",
  width: 2,
  height: 2,
  minWidth: 0,
  minHeight: 0,
  padding: 0,
};

export default function TierNode({ data }) {
  const [hovered, setHovered] = useState(false);
  const {
    rank, latinTitle, latinPlural, englishEquivalent, population, willTransferRate,
    privileges, selected, onSelectTier,
    powerMultiplier, feedingRatio, supportedBy,
    nodeWidth, sourceHandleCount, targetHandleCount,
    characters = [],
  } = data;

  const colours = TIER_COLOURS[rank] || TIER_COLOURS[8];
  const glowSpread = Math.max(6, (9 - rank) * 5);
  const isSelected = selected;

  const onEnter = useCallback(() => setHovered(true), []);
  const onLeave = useCallback(() => setHovered(false), []);
  const onClick = useCallback(() => {
    if (onSelectTier) onSelectTier(rank);
  }, [onSelectTier, rank]);

  const retainedPct = 100 - willTransferRate;

  // Format multiplier nicely
  const multStr =
    powerMultiplier === 1
      ? "×1 base"
      : powerMultiplier < 10
        ? `×${parseFloat(powerMultiplier.toFixed(1))}`
        : `×${Math.round(powerMultiplier).toLocaleString()}`;

  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onClick}
      className="relative select-none cursor-pointer"
      style={{ width: nodeWidth }}
    >
      {/* Source handles (top) */}
      {Array.from({ length: sourceHandleCount }).map((_, i) => (
        <Handle
          key={`source-${i}`}
          type="source"
          position={Position.Top}
          id={`source-${i}`}
          style={{
            ...hiddenHandle,
            left: `${((i + 1) / (sourceHandleCount + 1)) * 100}%`,
          }}
        />
      ))}

      {/* Target handles (bottom) */}
      {Array.from({ length: targetHandleCount }).map((_, i) => (
        <Handle
          key={`target-${i}`}
          type="target"
          position={Position.Bottom}
          id={`target-${i}`}
          style={{
            ...hiddenHandle,
            left: `${((i + 1) / (targetHandleCount + 1)) * 100}%`,
          }}
        />
      ))}

      {/* Selection ring */}
      {isSelected && (
        <div
          className="absolute -inset-1.5 rounded-2xl animate-pulse-slow"
          style={{
            border: `2px solid ${colours.glow}`,
            boxShadow: `0 0 20px 4px ${colours.glow}`,
          }}
        />
      )}

      {/* Main node card */}
      <div
        className="rounded-xl px-5 py-3 text-center border border-white/10
                   transition-all duration-200 relative overflow-visible"
        style={{
          background: `linear-gradient(135deg, ${colours.from}, ${colours.to})`,
          boxShadow: hovered || isSelected
            ? `0 0 ${glowSpread * 1.5}px ${glowSpread}px ${colours.glow}`
            : `0 0 ${glowSpread}px ${glowSpread / 2}px ${colours.glow}`,
          color: colours.text,
          transform: hovered ? "scale(1.03)" : "scale(1)",
        }}
      >
        {/* Rank badge */}
        <div
          className="absolute -top-0.5 -right-0.5 w-7 h-7 rounded-bl-lg rounded-tr-xl
                     flex items-center justify-center text-[10px] font-bold"
          style={{
            background: colours.to,
            color: colours.badge,
            boxShadow: `inset 0 0 4px ${colours.glow}`,
          }}
        >
          {rank}
        </div>

        {/* Title row */}
        <div className="font-bold text-lg leading-tight tracking-wide pr-6">
          {latinTitle}
        </div>
        <div className="text-xs opacity-60 mt-0.5">{englishEquivalent}</div>

        {/* Stats row */}
        <div className="text-[10px] mt-2 opacity-60 font-mono flex items-center justify-center gap-2 flex-wrap">
          <span>👥 {formatPopulation(population)}</span>
          <span className="opacity-40">·</span>
          <span>{willTransferRate > 0 ? `↑${willTransferRate}%` : "⚡ Apex"}</span>
          {supportedBy > 0 && (
            <>
              <span className="opacity-40">·</span>
              <span>← {supportedBy}:1</span>
            </>
          )}
        </div>

        {/* Power multiplier */}
        <div
          className="mt-1.5 text-sm font-bold font-mono tracking-tight flex items-center justify-center gap-1"
          style={{ color: colours.badge, opacity: 0.9 }}
        >
          <span className="text-[10px] opacity-60">⚡</span>
          <span>{multStr}</span>
        </div>

        {/* Will retention mini-bar */}
        <div className="mt-1.5 h-1 bg-black/20 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${retainedPct}%`, background: colours.badge, opacity: 0.7 }}
          />
        </div>
        <div className="text-[9px] mt-0.5 opacity-40 font-mono">
          {retainedPct}% retained
        </div>
      </div>

      {/* Character markers */}
      {characters.length > 0 && (
        <div className="flex flex-wrap justify-center gap-1.5 mt-2 px-2">
          {characters.map((ch) => (
            <div
              key={ch.id}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold leading-tight
                         border backdrop-blur-sm shadow-sm whitespace-nowrap
                         ${ch.deceased ? "line-through opacity-50" : ""}`}
              style={{
                background: `${BRANCH_COLOURS[ch.branch] || "#94a3b8"}22`,
                color: BRANCH_COLOURS[ch.branch] || "#94a3b8",
                borderColor: `${BRANCH_COLOURS[ch.branch] || "#94a3b8"}40`,
              }}
              title={`${ch.name} — ${ch.title}${ch.deceased ? " (deceased)" : ""}`}
            >
              {ch.name.split(" ")[0]}
              {ch.deceased && " †"}
            </div>
          ))}
        </div>
      )}

      {/* Tooltip on hover */}
      {hovered && !isSelected && (
        <div
          className="absolute z-50 left-1/2 -translate-x-1/2 mb-2 w-64 rounded-lg
                     bg-slate-800/95 border border-amber-400/30 px-3 py-2.5 text-xs
                     text-slate-200 shadow-xl backdrop-blur-sm pointer-events-none
                     animate-fade-in"
          style={{ bottom: "100%" }}
        >
          <p className="font-semibold text-amber-300 mb-1">
            {latinTitle} — {englishEquivalent}
          </p>
          <p className="leading-relaxed text-slate-300 text-[11px]">{privileges}</p>
          {feedingRatio > 0 && (
            <p className="mt-1 text-amber-400/80 font-mono text-[10px]">
              {feedingRatio} {latinPlural} → 1 above
            </p>
          )}
          <p className="mt-1.5 text-[10px] text-slate-500 italic">
            Click to explore this tier →
          </p>
        </div>
      )}
    </div>
  );
}
