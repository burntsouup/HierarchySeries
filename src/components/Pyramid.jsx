import { formatNumber } from "../willMath";

const WIDTH = 600;
const ROW_HEIGHT = 46;
const GAP = 26;
const HEIGHT = 8 * ROW_HEIGHT + 7 * GAP;

const rowY = (rank) => (rank - 1) * (ROW_HEIGHT + GAP);
const rowWidth = (rank) => 130 + (rank - 1) * 62;

// Darker and browner toward the base, brighter gold at the top
function colour(rank) {
  const f = (8 - rank) / 7;
  return `hsl(${28 + f * 16} ${38 + f * 40}% ${24 + f * 38}%)`;
}

function FlowLines({ upper, lower, count }) {
  const yTop = rowY(upper) + ROW_HEIGHT;
  const yBottom = rowY(lower);

  return Array.from({ length: count }, (_, i) => {
    const t = count === 1 ? 0.5 : i / (count - 1);
    const x1 = WIDTH / 2 + (t - 0.5) * rowWidth(lower) * 0.8;
    const x2 = WIDTH / 2 + (t - 0.5) * rowWidth(upper) * 0.5;
    return <line key={i} className="flow" x1={x1} y1={yBottom} x2={x2} y2={yTop} />;
  });
}

export default function Pyramid({ tiers, selected, onSelect, counts, playing }) {
  return (
    <svg className="pyramid" viewBox={`0 0 ${WIDTH} ${HEIGHT}`} role="group" aria-label="The eight ranks">
      {tiers.slice(0, 7).map((t) => (
        <FlowLines key={t.rank} upper={t.rank} lower={t.rank + 1} count={t.feeds} />
      ))}
      {tiers.map((t) => {
        const w = rowWidth(t.rank);
        const y = rowY(t.rank);
        const isSelected = selected === t.rank;
        const classes = ["row"];
        if (isSelected) classes.push("on");
        if (playing && t.rank >= selected) classes.push("lit");

        return (
          <g
            key={t.rank}
            className={classes.join(" ")}
            role="button"
            tabIndex={0}
            aria-pressed={isSelected}
            aria-label={`${t.name}, ${formatNumber(t.pyramid)} in a full pyramid`}
            onClick={() => onSelect(t.rank)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect(t.rank);
              }
            }}
          >
            <rect x={(WIDTH - w) / 2} y={y} width={w} height={ROW_HEIGHT} rx="3" fill={colour(t.rank)} />
            <text x={WIDTH / 2} y={y + ROW_HEIGHT / 2 + 1} className="row-name">{t.name}</text>
            <text x={(WIDTH + w) / 2 + 12} y={y + ROW_HEIGHT / 2 + 1} className="row-count">
              {formatNumber(t.pyramid)}
            </text>
            {counts[t.rank] > 0 && (
              <circle cx={(WIDTH - w) / 2 - 14} cy={y + ROW_HEIGHT / 2} r="5" className="dot" />
            )}
          </g>
        );
      })}
    </svg>
  );
}
