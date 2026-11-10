import { formatNumber } from "../willMath";

function People({ people }) {
  if (!people?.length) return null;

  return (
    <ul className="people">
      {people.map((p) => (
        <li key={p.name}>
          <b>{p.name}</b>
          {p.group && <span className="tag">{p.group}</span>}
          <span className="muted"> {p.note}</span>
        </li>
      ))}
    </ul>
  );
}

export default function Detail({ tiers, rank, people }) {
  if (rank === 0) {
    return (
      <div className="detail">
        <h3>Off the chart</h3>
        <p className="muted">Academy students, rebels and others who do not hold a rank.</p>
        <People people={people} />
      </div>
    );
  }

  const tier = tiers.find((t) => t.rank === rank);
  const below = tiers.find((t) => t.rank === rank + 1);
  const top = tiers[0].headStrength;

  return (
    <div className="detail">
      <h3>
        {tier.name} <span className="muted">“{tier.meaning}”</span>
      </h3>
      <p>{tier.note}</p>

      <div className="power" title="Strength at the head of a pyramid, compared with the Princeps">
        <div style={{ width: `${Math.max(1, (tier.headStrength / top) * 100)}%` }} />
      </div>

      <div className="stats">
        <div>
          <b>×{formatNumber(tier.headStrength)}</b>
          <span>strength at the head of a pyramid</span>
        </div>
        <div>
          <b>{tier.rank === 1 ? "—" : `×${formatNumber(tier.whileCeding)}`}</b>
          <span>strength while ceding</span>
        </div>
        <div>
          <b>{tier.feeds ? tier.feeds : "none"}</b>
          <span>{tier.feeds ? `${below.plural} cede directly to each` : "cede to this rank"}</span>
        </div>
        <div>
          <b>{formatNumber(tier.contributors)}</b>
          <span>people behind each one</span>
        </div>
      </div>

      <details className="more">
        <summary>The numbers</summary>
        <p>
          A full pyramid has {formatNumber(tier.pyramid)} {tier.pyramid === 1 ? tier.name : tier.plural}.
          The whole Republic has {tier.republic}.
        </p>
        <p className="small muted">
          ×1 is one person's own Will. A rank's strength is its own 1 plus half of what each person
          below cedes to it. Republic head counts are estimates from the book's census.
        </p>
      </details>

      <People people={people} />
    </div>
  );
}
