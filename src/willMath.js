import TIERS from "./data/tiers";

export function computeTiers() {
  const byRank = {};
  let cededBelow = 0;
  let contributorsBelow = 0;

  for (const tier of [...TIERS].reverse()) {
    const headStrength = 1 + tier.feeds * cededBelow;
    const whileCeding = headStrength / 2;
    const contributors = tier.feeds ? (contributorsBelow + 1) * tier.feeds : 0;

    byRank[tier.rank] = { ...tier, headStrength, whileCeding, contributors };
    cededBelow = whileCeding;
    contributorsBelow = contributors;
  }

  return TIERS.map((t) => byRank[t.rank]);
}

export function formatNumber(n) {
  return n.toLocaleString("en-US", { maximumFractionDigits: 2 });
}
