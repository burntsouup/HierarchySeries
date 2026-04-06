import HIERARCHY_DATA from "../data/hierarchyData";

export function formatNumber(n) {
  if (n >= 1_000_000) {
    const v = n / 1_000_000;
    return (v % 1 === 0 ? v.toFixed(0) : v.toFixed(1)) + "M";
  }
  if (n >= 1_000) {
    const v = n / 1_000;
    return (v % 1 === 0 ? v.toFixed(0) : v.toFixed(1)) + "K";
  }
  return Math.round(n).toLocaleString();
}

export function formatPct(n) {
  if (n < 0.01) return "<0.01%";
  if (n < 1) return n.toFixed(2) + "%";
  return n.toFixed(1) + "%";
}

// Format a Will value (may be fractional).
export function formatWill(n) {
  if (n >= 1000) return formatNumber(n);
  if (Number.isInteger(n)) return n.toString();
  return parseFloat(n.toFixed(2)).toString();
}

// Compute per-person Will flow for every tier (bottom-up).
// Based on canonical data: each person generates 1 Will, cedes 50% upward.
export function computeAllWillStats() {
  const feedingRatioByRank = {};
  for (const t of HIERARCHY_DATA) feedingRatioByRank[t.rank] = t.feedingRatio;

  const sorted = [...HIERARCHY_DATA].sort((a, b) => b.rank - a.rank);
  const byRank = {};
  let prevCededPerPerson = 0;

  for (const tier of sorted) {
    const { rank, latinTitle, latinPlural, englishEquivalent, population, willTransferRate } = tier;

    // How many from the tier below feed one person at this rank
    const supportedBy = feedingRatioByRank[rank + 1] || 0;

    // Per-person Will flow
    const ownGeneration = 1;
    const receivedFromBelow = supportedBy * prevCededPerPerson;
    const totius = ownGeneration + receivedFromBelow;
    const cedeRate = willTransferRate / 100;
    const cededPerPerson = totius * cedeRate;
    const notTotius = totius - cededPerPerson;

    // "Receives Will from" — total Octavii in this person's subtree (8!/R!)
    let receivesFrom = 0;
    if (rank < 8) {
      let prod = 1;
      for (let k = rank + 1; k <= 8; k++) prod *= k;
      receivesFrom = prod;
    }

    byRank[rank] = {
      rank,
      latinTitle,
      latinPlural,
      englishEquivalent,
      population,
      feedingRatio: tier.feedingRatio,
      willTransferRate,
      supportedBy,
      totius,
      notTotius,
      cededPerPerson,
      receivesFrom,
      // mixedIn computed in second pass
      mixedIn: 0,
    };

    prevCededPerPerson = cededPerPerson;
  }

  // Second pass: "People mixed in" (including self) — bottom-up recursive
  byRank[8].mixedIn = 1;
  for (let r = 7; r >= 1; r--) {
    const supportedBy = byRank[r].supportedBy;
    byRank[r].mixedIn = 1 + supportedBy * (byRank[r + 1]?.mixedIn || 0);
  }

  const totalPopulation = HIERARCHY_DATA.reduce((s, t) => s + t.population, 0);
  // Energy conservation: total retained = total generated
  let totalRetained = 0;
  for (const v of Object.values(byRank)) {
    if (v.rank === 1) {
      totalRetained += v.population * v.totius; // Princeps keeps all
    } else {
      totalRetained += v.population * v.notTotius;
    }
  }

  const baseTotius = byRank[8]?.totius || 1; // Octavus Totius = 1

  // Array form sorted 1→8 for iteration
  const tiers = Object.values(byRank).sort((a, b) => a.rank - b.rank);

  return { byRank, totalPopulation, totalRetained, baseTotius, tiers };
}
