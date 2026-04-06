import HIERARCHY_DATA from "../data/hierarchyData";
import { computeAllWillStats, formatWill } from "./willMath";

// Build React Flow nodes + edges for the pyramid layout.
// One node per tier, width proportional to rank.
// Edge count between tiers matches the feeding ratio.
export function buildPyramid(selectedRank, onSelectTier, characters = []) {
  const willStats = computeAllWillStats();

  const MAX_WIDTH = 720;
  const MIN_WIDTH = 220;
  const NODE_HEIGHT = 100;
  const V_GAP = 80;

  const sorted = [...HIERARCHY_DATA].sort((a, b) => a.rank - b.rank); // 1→8
  const nodes = [];
  const edges = [];

  // Pre-index feeding ratios
  const feedingRatioByRank = {};
  for (const t of HIERARCHY_DATA) feedingRatioByRank[t.rank] = t.feedingRatio;

  // Group characters by tier rank
  const charsByRank = {};
  for (const ch of characters) {
    if (!charsByRank[ch.rank]) charsByRank[ch.rank] = [];
    charsByRank[ch.rank].push(ch);
  }

  // Helper: node width for a given rank (linear taper)
  function nodeWidth(rank) {
    return MIN_WIDTH + ((rank - 1) / 7) * (MAX_WIDTH - MIN_WIDTH);
  }

  sorted.forEach((tier) => {
    const { rank } = tier;
    const w = nodeWidth(rank);
    const x = (MAX_WIDTH - w) / 2;
    const y = (rank - 1) * (NODE_HEIGHT + V_GAP);

    const tierStats = willStats.byRank[rank];
    const powerMultiplier = tierStats.totius / willStats.baseTotius; // vs Octavus

    // Handle counts for multi-edge connections
    // Source handles (top): this tier's feedingRatio edges going UP to tier R-1
    const sourceHandleCount = rank >= 2 ? rank : 0;
    // Target handles (bottom): feedingRatio(R+1) edges coming FROM tier R+1
    const targetHandleCount = rank <= 7 ? feedingRatioByRank[rank + 1] || 0 : 0;

    nodes.push({
      id: `tier-${rank}`,
      type: "tierNode",
      position: { x, y },
      data: {
        ...tier,
        selected: selectedRank === rank,
        onSelectTier,
        // Will stats
        totius: tierStats.totius,
        notTotius: tierStats.notTotius,
        powerMultiplier,
        receivesFrom: tierStats.receivesFrom,
        mixedIn: tierStats.mixedIn,
        supportedBy: tierStats.supportedBy,
        totiusFormatted: formatWill(tierStats.totius),
        notTotiusFormatted: formatWill(tierStats.notTotius),
        // Layout
        nodeWidth: w,
        sourceHandleCount,
        targetHandleCount,
        // Characters
        characters: charsByRank[rank] || [],
      },
    });
  });

  // Edges: R parallel lines between tier R and tier R-1
  for (let rank = 8; rank >= 2; rank--) {
    const childId = `tier-${rank}`;
    const parentId = `tier-${rank - 1}`;
    const edgeCount = rank; // feeding ratio = rank number

    const isDirectlySelected =
      selectedRank === rank || selectedRank === rank - 1;

    for (let i = 0; i < edgeCount; i++) {
      edges.push({
        id: `e-${rank}-${i}`,
        source: childId,
        target: parentId,
        sourceHandle: `source-${i}`,
        targetHandle: `target-${i}`,
        type: "straight",
        animated: true,
        style: {
          stroke: isDirectlySelected ? "#fbbf24" : "#d97706",
          strokeWidth: isDirectlySelected ? 2 : 1.2,
          opacity: isDirectlySelected ? 0.8 : 0.3,
        },
      });
    }
  }

  return { nodes, edges };
}
