import { useEffect, useState } from "react";
import Pyramid from "./components/Pyramid";
import Detail from "./components/Detail";
import { computeTiers } from "./willMath";
import { BRANCHES, GLOSSARY, BOOKS } from "./data/world";
import CHARACTERS from "./data/characters";

const tiers = computeTiers();
const BOOK_OPTIONS = ["None", "Book 1", "Books 1–2"];

function charactersUpTo(book) {
  return CHARACTERS.filter((c) => c.placements[0].book <= book).map((c) => {
    const latest = c.placements.filter((p) => p.book <= book).pop();
    return { name: c.name, ...latest };
  });
}

function Explorer() {
  const [rank, setRank] = useState(8);
  const [book, setBook] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    const timer = setTimeout(() => {
      if (rank === 1) setPlaying(false);
      else setRank(rank - 1);
    }, rank === 1 ? 1500 : 1300);
    return () => clearTimeout(timer);
  }, [playing, rank]);

  const visible = charactersUpTo(book);
  const counts = {};
  for (const c of visible) counts[c.rank ?? 0] = (counts[c.rank ?? 0] || 0) + 1;
  const here = book ? visible.filter((c) => (c.rank ?? 0) === rank) : null;

  function select(r) {
    setPlaying(false);
    setRank(r);
  }

  function follow() {
    setRank(8);
    setPlaying(true);
  }

  return (
    <div className="explorer">
      <div className="spoilers" role="group" aria-label="Show characters">
        <span>Show characters from</span>
        {BOOK_OPTIONS.map((label, i) => (
          <button key={label} className={book === i ? "on" : ""} onClick={() => setBook(i)}>
            {label}
          </button>
        ))}
      </div>

      <div className="follow">
        <button onClick={follow} disabled={playing}>
          {playing ? "Following the Will…" : "▲ Follow the Will upward"}
        </button>
      </div>

      <div className="stage">
        <Pyramid tiers={tiers} selected={rank} onSelect={select} counts={counts} playing={playing} />
        <div>
          <Detail tiers={tiers} rank={rank} people={here} />
          {counts[0] > 0 && (
            <button className={rank === 0 ? "offchart on" : "offchart"} onClick={() => select(0)}>
              Off the chart ({counts[0]})
            </button>
          )}
        </div>
      </div>

      <p className="hint">
        Select a rank. Numbers beside the bars show how many people hold it in one full pyramid, and the
        lines show how many people from the rank below cede directly to each person above.
      </p>
    </div>
  );
}

function Fold({ title, children }) {
  return (
    <details className="fold">
      <summary>{title}</summary>
      <div>{children}</div>
    </details>
  );
}

export default function App() {
  return (
    <main>
      <header className="hero">
        <p className="kicker">James Islington’s Hierarchy series</p>
        <h1>Who feeds whom</h1>
        <p className="lead">
          In the Catenan Republic, everyone must cede half of their Will, their energy and drive, to
          someone of higher rank.
        </p>
      </header>

      <Explorer />

      <section className="folds">
        <Fold title="How the Will adds up">
          <ol>
            <li>Everyone has 1 unit of Will.</li>
            <li>
              Each person receives Will from a group directly below them. The group's size matches its
              rank number: eight Octavii cede to one Septimus, seven Septimii to one Sextus, and so on.
            </li>
            <li>
              People cede half of what they hold. A Septimus holds their own 1 plus 4 from eight Octavii, so
              5, and passes on 2.5.
            </li>
            <li>The Princeps ends up with about 430 times the Will of one Octavus.</li>
          </ol>
          <p className="small muted">
            Ceding half and the 8-to-1, 7-to-1 ratios come from the books. The multiples are worked out
            from them by fans, using the same chart the Hierarchy wiki publishes.
          </p>
        </Fold>
        <Fold title="One pyramid, many pyramids">
          <p>
            The bars show a single full pyramid: 1 Princeps, 2 Dimidii, 6 Tertii and so on down to 40,320
            Octavii, 46,233 people in all.
          </p>
          <p>
            The Republic has roughly 24 million people, so it is made of a great many pyramids of
            different heights. Only the three senatorial pyramids, Governance, Military and Religion, rise
            above Quartus.
          </p>
        </Fold>
        <Fold title="What Will lets you do">
          <p>
            Someone holding spare Will can imbue it into themselves or into objects. Imbuing yourself
            makes you stronger and harder to move, and imbuing objects lets you move them at a distance
            or build things like the Transvects that carry people across the Republic.
          </p>
          <p>
            People with less Will are less hale and less mentally sharp, and those with more are
            stronger, sharper and more energetic. Octavii, who cede half and receive nothing, live at the
            low end.
          </p>
        </Fold>
        <Fold title="The three branches">
          {BRANCHES.map((b) => (
            <p key={b.name}><b>{b.name}.</b> {b.text}</p>
          ))}
        </Fold>
        <Fold title="The world, spoiler-light">
          <p>
            About three hundred years ago a Cataclysm left fewer than one person in twenty alive. The
            Catenan Republic rose afterwards, conquered what was left, and built its order on Will and
            the pre-Cataclysm technology that makes ceding possible.
          </p>
          <p>
            Vis Telimus, a fugitive hiding under a false name, is adopted by a powerful senator and sent
            to the Catenan Academy, where students compete for a place in the Hierarchy.
          </p>
        </Fold>
        <Fold title="Reading order">
          <ol>
            {BOOKS.map((b) => (
              <li key={b.title}><em>{b.title}</em> <span className="muted">· {b.year}</span></li>
            ))}
          </ol>
        </Fold>
        <Fold title="Glossary">
          <dl>
            {GLOSSARY.map(([term, definition]) => (
              <div key={term}><dt>{term}</dt><dd>{definition}</dd></div>
            ))}
          </dl>
        </Fold>
      </section>

      <footer>
        <p>
          A free fan project. All characters and world-building belong to James Islington.{" "}
          <a href="https://github.com/burntsouup/HierarchySeries/issues">Report a mistake</a> ·{" "}
          <a href="https://buymeacoffee.com/burntsoup">Buy me a coffee</a>
        </p>
      </footer>
    </main>
  );
}
