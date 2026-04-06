import { useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { BRANCHES } from "../data/hierarchyData";

const BRANCH_COLOURS = {
  governance: "#fbbf24",
  military: "#ef4444",
  religion: "#a78bfa",
};

/**
 * Spoiler-gated character overlay toggle.
 * Users must first acknowledge the spoiler warning, then select a book.
 * When characters are enabled, a branch filter appears.
 */
export default function CharacterToggle({ charOverlay, setCharOverlay }) {
  const [spoilerWarningShown, setSpoilerWarningShown] = useState(false);

  const toggle = useCallback(() => {
    if (charOverlay.enabled) {
      setCharOverlay({ enabled: false, book: 0, branch: "all" });
    } else {
      setSpoilerWarningShown(true);
    }
  }, [charOverlay, setCharOverlay]);

  const acceptSpoilers = useCallback(
    (book) => {
      setSpoilerWarningShown(false);
      setCharOverlay({ enabled: true, book, branch: "all" });
    },
    [setCharOverlay]
  );

  const dismissWarning = useCallback(() => {
    setSpoilerWarningShown(false);
  }, []);

  const switchBook = useCallback(
    (book) => {
      setCharOverlay((prev) => ({ ...prev, book }));
    },
    [setCharOverlay]
  );

  const switchBranch = useCallback(
    (branch) => {
      setCharOverlay((prev) => ({ ...prev, branch }));
    },
    [setCharOverlay]
  );

  return (
    <>
      {/* Inline toggle button (sits inside the control bar) */}
      <button
        onClick={toggle}
        className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200
                    flex items-center gap-1.5
          ${
            charOverlay.enabled
              ? "bg-amber-500 text-slate-900 shadow-md shadow-amber-500/20"
              : "bg-slate-700 text-slate-300 hover:bg-slate-600"
          }`}
      >
        👤 Characters{charOverlay.enabled ? "" : ""}
      </button>

      {/* Book + Branch selector pills — shown below control bar when enabled */}
      {charOverlay.enabled && (
        <div
          className="absolute top-14 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5
                      bg-slate-800/80 backdrop-blur-md border border-slate-700 rounded-lg px-3 py-1.5 shadow-lg
                      animate-fade-in"
        >
          {/* Book pills */}
          <button
            onClick={() => switchBook(1)}
            className={`px-2 py-1 rounded-md text-[10px] font-medium transition-all border
              ${
                charOverlay.book === 1
                  ? "bg-amber-500 text-slate-900 border-amber-400"
                  : "bg-slate-700 text-slate-400 border-slate-600 hover:bg-slate-600"
              }`}
          >
            Book 1
          </button>
          <button
            onClick={() => switchBook(2)}
            className={`px-2 py-1 rounded-md text-[10px] font-medium transition-all border
              ${
                charOverlay.book === 2
                  ? "bg-amber-500 text-slate-900 border-amber-400"
                  : "bg-slate-700 text-slate-400 border-slate-600 hover:bg-slate-600"
              }`}
          >
            Book 2
          </button>

          <div className="w-px h-4 bg-slate-600" />

          {/* Branch pills */}
          <button
            onClick={() => switchBranch("all")}
            className={`px-2 py-1 rounded-md text-[10px] font-medium transition-all border
              ${
                charOverlay.branch === "all"
                  ? "bg-slate-300 text-slate-900 border-slate-400"
                  : "bg-slate-700 text-slate-400 border-slate-600 hover:bg-slate-600"
              }`}
          >
            All
          </button>
          {BRANCHES.map((b) => (
            <button
              key={b.id}
              onClick={() => switchBranch(b.id)}
              className="px-2 py-1 rounded-md text-[10px] font-medium transition-all border"
              style={
                charOverlay.branch === b.id
                  ? {
                      background: b.colour,
                      color: "#0f172a",
                      borderColor: b.colour,
                    }
                  : {
                      background: "rgba(51,65,85,0.8)",
                      color: b.colour,
                      borderColor: "rgba(51,65,85,1)",
                    }
              }
            >
              {b.icon} {b.name}
            </button>
          ))}
        </div>
      )}

      {/* Spoiler warning modal — portalled to body to escape transformed parent */}
      {spoilerWarningShown && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-8 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-800 border border-amber-400/40 rounded-xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
            {/* Header */}
            <div className="bg-red-500/10 border-b border-red-400/20 px-5 py-3">
              <h3 className="text-base font-bold text-red-400 flex items-center gap-2">
                ⚠️ Spoiler Warning
              </h3>
            </div>

            <div className="px-5 py-4 space-y-3">
              <p className="text-sm text-slate-300 leading-relaxed">
                The character overlay shows{" "}
                <strong className="text-white">
                  where named characters fall in the Hierarchy
                </strong>
                . This includes their tier and branch assignments, which may
                reveal plot details.
              </p>
              <p className="text-sm text-slate-400">
                Select how much you want to see:
              </p>

              <div className="space-y-2">
                <button
                  onClick={() => acceptSpoilers(1)}
                  className="w-full px-4 py-3 rounded-lg bg-slate-700 hover:bg-slate-600 border border-slate-600
                             text-left transition-all group"
                >
                  <div className="text-sm font-semibold text-amber-300 group-hover:text-amber-200">
                    📖 Book 1 — The Will of the Many
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Characters and positions during/at the end of Book 1 only
                  </div>
                </button>

                <button
                  onClick={() => acceptSpoilers(2)}
                  className="w-full px-4 py-3 rounded-lg bg-slate-700 hover:bg-slate-600 border border-slate-600
                             text-left transition-all group"
                >
                  <div className="text-sm font-semibold text-amber-300 group-hover:text-amber-200">
                    📖 Book 2 — The Strength of the Few
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    All characters through Book 2 (includes Book 1 spoilers)
                  </div>
                </button>
              </div>

              <button
                onClick={dismissWarning}
                className="w-full text-center text-xs text-slate-400 hover:text-slate-200 py-2.5 mt-1
                           border border-slate-600 rounded-lg hover:bg-slate-700 transition-all"
              >
                Cancel — no spoilers please
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
