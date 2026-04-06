import { useState, useMemo, useEffect, useCallback } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import TierNode from "./TierNode";
import InfoPanel from "./InfoPanel";
import Legend from "./Legend";
import GuidedTour from "./GuidedTour";
import CharacterToggle from "./CharacterToggle";
import ColumnIcon from "./ColumnIcon";
import { buildPyramid } from "../utils/buildPyramid";
import CHARACTER_DATA from "../data/characterData";

const nodeTypes = { tierNode: TierNode };

export default function HierarchyFlow() {
  const [selectedRank, setSelectedRank] = useState(null);
  const [tourActive, setTourActive] = useState(false);

  // Character overlay: { enabled, book, branch }
  // branch: "all" | "governance" | "military" | "religion"
  const [charOverlay, setCharOverlay] = useState({
    enabled: false,
    book: 0,
    branch: "all",
  });

  const onSelectTier = useCallback((rank) => {
    setSelectedRank((prev) => (prev === rank ? null : rank));
  }, []);
  const onClosePanel = useCallback(() => setSelectedRank(null), []);

  // Filter characters for the active book + branch.
  // When viewing Book 2, prefer Book 2 entries over Book 1 for characters
  // that appear in both (deduplicate by character name).
  const filteredCharacters = useMemo(() => {
    if (!charOverlay.enabled || charOverlay.book === 0) return [];
    const eligible = CHARACTER_DATA.filter((ch) => {
      if (ch.book > charOverlay.book) return false;
      if (charOverlay.branch === "all") return true;
      return (
        ch.branch === charOverlay.branch ||
        ch.branch === "academy" ||
        ch.branch === "outside"
      );
    });
    // Deduplicate: for characters appearing in both books, keep the highest-book entry.
    // Use the id prefix (e.g. "vis" from "vis-b1"/"vis-b2") as the dedup key.
    const byKey = new Map();
    for (const ch of eligible) {
      const key = ch.id.replace(/-b\d+$/, "");
      const existing = byKey.get(key);
      if (!existing || ch.book > existing.book) {
        byKey.set(key, ch);
      }
    }
    return [...byKey.values()];
  }, [charOverlay]);

  // Rebuild the pyramid whenever selection or characters change.
  const { initialNodes, initialEdges } = useMemo(() => {
    const { nodes, edges } = buildPyramid(
      selectedRank,
      onSelectTier,
      filteredCharacters
    );
    return { initialNodes: nodes, initialEdges: edges };
  }, [selectedRank, onSelectTier, filteredCharacters]);

  // React Flow controlled state
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [initialNodes, initialEdges, setNodes, setEdges]);

  // Tour callbacks
  const startTour = useCallback(() => {
    setTourActive(true);
    setSelectedRank(null);
  }, []);
  const endTour = useCallback(() => setTourActive(false), []);

  return (
    <div className="relative w-screen h-screen" style={{ background: "#0f172a" }}>
      {/* Top control bar */}
      <div
        className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2
                    bg-slate-800/80 backdrop-blur-md border border-slate-700 rounded-xl px-4 py-2 shadow-lg"
      >
        <h1 className="text-sm font-semibold text-amber-300 tracking-wide mr-1 flex items-center gap-1.5">
          <ColumnIcon size={14} /> The Hierarchy
        </h1>
        <div className="w-px h-5 bg-slate-600" />

        {/* Tour button */}
        <button
          onClick={startTour}
          className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200
            ${
              tourActive
                ? "bg-amber-500 text-slate-900 shadow-md shadow-amber-500/20"
                : "bg-slate-700 text-slate-300 hover:bg-slate-600"
            }`}
        >
          🎓 Tour
        </button>

        {/* Characters toggle — inline in control bar */}
        <CharacterToggle charOverlay={charOverlay} setCharOverlay={setCharOverlay} />
      </div>

      {/* Legend */}
      <Legend />

      {/* React Flow canvas */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.15 }}
        proOptions={{ hideAttribution: true }}
        minZoom={0.1}
        maxZoom={2.5}
        nodesDraggable={false}
        nodesConnectable={false}
      >
        <Background color="#1e293b" gap={24} size={1} />
        <Controls
          position="bottom-right"
          className="!bg-slate-800/80 !border-slate-700 !rounded-lg !shadow-lg
                     [&>button]:!bg-slate-700 [&>button]:!border-slate-600
                     [&>button]:!text-slate-300 [&>button:hover]:!bg-slate-600"
        />
      </ReactFlow>

      {/* Info side panel */}
      {selectedRank !== null && (
        <InfoPanel
          selectedRank={selectedRank}
          characters={filteredCharacters}
          onClose={onClosePanel}
        />
      )}

      {/* Guided tour */}
      <GuidedTour
        active={tourActive}
        onEnd={endTour}
        onSelectRank={setSelectedRank}
      />

      {/* Buy Me a Coffee */}
      <a
        href="https://buymeacoffee.com/burntsoup"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10
                   text-[10px] text-slate-500 hover:text-amber-300 transition-colors"
      >
        ☕ Buy me a coffee
      </a>
    </div>
  );
}
