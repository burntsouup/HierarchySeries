/**
 * Character placements in the Hierarchy, gated by book.
 *
 * Each character has:
 *   id          – unique identifier
 *   name        – display name
 *   rank        – tier number (1-8) in this book
 *   branch      – "governance" | "military" | "religion" | "academy" | "outside"
 *   title       – their specific title (e.g. "Magnus Quintus")
 *   description – one-line, low-spoiler description
 *   book        – 1 or 2 (which book this placement applies to)
 *   deceased    – (optional) true if dead by this book
 *
 * Characters whose tier/branch CHANGES between books appear twice
 * (once per book entry) so readers can see the progression.
 *
 * "academy" branch = pre-graduation (Book 1 only, during the Academy arc).
 * "outside" = characters outside the formal Hierarchy (e.g. the Anguis).
 */

const CHARACTER_DATA = [
  // ═══════════════════════════════════════════════════
  //  BOOK 1 — The Will of the Many
  // ═══════════════════════════════════════════════════

  // ── Academy students (not yet assigned a branch) ──
  {
    id: "vis-b1",
    name: "Vis Telimus",
    rank: 7,
    branch: "academy",
    title: "Academy Student — Iudicium Winner",
    description:
      "Orphaned prince of Suus in hiding, adopted by Ulciscor. Wins the Iudicium to earn Sextus placement.",
    book: 1,
  },
  {
    id: "callidus-b1",
    name: "Callidus Ericius",
    rank: 7,
    branch: "academy",
    title: "Academy Student (Class 7)",
    description:
      "Brilliant but disgraced student who befriends Vis. Son of the powerful Ericius. Deliberately stays in Class 7.",
    book: 1,
  },
  {
    id: "eidhin-b1",
    name: "Eidhin Breac",
    rank: 7,
    branch: "academy",
    title: "Academy Student (Class 6)",
    description:
      "Foreign student with exceptional fighting skills. Trained by the Bladesmiths of his tribe. Ally and friend to Vis.",
    book: 1,
  },
  {
    id: "emissa-b1",
    name: "Emissa Corenius",
    rank: 7,
    branch: "academy",
    title: "Academy Student (Class 3)",
    description:
      "One of the top-ranked students at the Academy. Develops a complicated relationship with Vis.",
    book: 1,
  },
  {
    id: "aequa-b1",
    name: "Aequa Claudius",
    rank: 7,
    branch: "academy",
    title: "Academy Student (Class 4)",
    description:
      "Academy student who witnesses the naumachia disaster alongside Vis.",
    book: 1,
  },
  {
    id: "indol-b1",
    name: "Indol Quiscil",
    rank: 7,
    branch: "academy",
    title: "Academy Student (Top-Ranked)",
    description:
      "Top-ranked Academy student who takes a keen interest in Vis.",
    book: 1,
  },

  // ── Established Hierarchy members (Book 1) ──
  {
    id: "ulciscor-b1",
    name: "Ulciscor Telimus",
    rank: 5,
    branch: "military",
    title: "Magnus Quintus",
    description:
      "Powerful Military senator. Vis's adoptive father, obsessed with uncovering his brother's death.",
    book: 1,
  },
  {
    id: "veridius-b1",
    name: "Veridius Julii",
    rank: 5,
    branch: "religion",
    title: "Quintus — Principalis",
    description:
      "Head of the Catenan Academy. Knows secrets about the ancient labyrinth beneath the island.",
    book: 1,
  },
  {
    id: "ericius-b1",
    name: "Ericius",
    rank: 3,
    branch: "governance",
    title: "Magnus Tertius",
    description:
      "Father of Callidus and Livia. One of the most powerful men in the Republic.",
    book: 1,
  },
  {
    id: "lanistia-b1",
    name: "Lanistia Scipio",
    rank: 6,
    branch: "governance",
    title: "Sextus",
    description:
      "Resides at Ulciscor's estate. Tutor to Vis, blinded in the Academy accident that killed Caeror.",
    book: 1,
  },
  {
    id: "relucia-b1",
    name: "Relucia Telimus",
    rank: 6,
    branch: "governance",
    title: "Sextus",
    description:
      "Wife of Ulciscor Telimus. Resides at the Telimus family estate.",
    book: 1,
  },
  {
    id: "sedotia-b1",
    name: "Sedotia",
    rank: 8,
    branch: "outside",
    title: "Anguis",
    description:
      "Leader of the Anguis rebel group that resists the Hierarchy from outside its structure.",
    book: 1,
  },

  // ═══════════════════════════════════════════════════
  //  BOOK 2 — The Strength of the Few
  // ═══════════════════════════════════════════════════

  // ── Post-graduation placements ──
  {
    id: "vis-b2",
    name: "Vis Telimus Catenicus",
    rank: 6,
    branch: "governance",
    title: "Sextus",
    description:
      "Now a Sextus in Governance, working under Ericius while investigating the Iudicium events.",
    book: 2,
  },
  {
    id: "eidhin-b2",
    name: "Eidhin Breac",
    rank: 6,
    branch: "military",
    title: "Sextus",
    description:
      "Sextus in Military. Vis's friend and ally in investigating what happened at the Iudicium.",
    book: 2,
  },
  {
    id: "emissa-b2",
    name: "Emissa Corenius",
    rank: 6,
    branch: "military",
    title: "Sextus",
    description:
      "Sextus in Military. Her relationship with Vis is complicated by the Iudicium events.",
    book: 2,
  },
  {
    id: "aequa-b2",
    name: "Aequa Claudius",
    rank: 5,
    branch: "governance",
    title: "Quintus",
    description:
      "Quintus in Governance. Survivor of the naumachia. Friend and ally of Vis.",
    book: 2,
  },
  {
    id: "indol-b2",
    name: "Indol Quiscil",
    rank: 6,
    branch: "religion",
    title: "Sextus",
    description:
      "Sextus in Religion. Vis's friend and ally in investigating the Iudicium.",
    book: 2,
  },

  // ── Established members (Book 2) ──
  {
    id: "ulciscor-b2",
    name: "Ulciscor Telimus",
    rank: 5,
    branch: "military",
    title: "Magnus Quintus",
    description:
      "Military senator still consumed with uncovering the truth about his brother Caeror.",
    book: 2,
  },
  {
    id: "veridius-b2",
    name: "Veridius Julii",
    rank: 5,
    branch: "religion",
    title: "Quintus — Principalis",
    description:
      "Still heads the Academy. Claims to be trying to prevent a second Cataclysm.",
    book: 2,
  },
  {
    id: "ericius-b2",
    name: "Ericius",
    rank: 3,
    branch: "governance",
    title: "Magnus Tertius",
    description:
      "Father of Callidus and Livia. One of the most powerful men in the Republic. Vis's supervisor.",
    book: 2,
  },
  {
    id: "amercus-b2",
    name: "Amercus Decimus",
    rank: 3,
    branch: "religion",
    title: "Tertius",
    description:
      "Father of Iro. Embittered toward Vis over his daughter's death at the naumachia.",
    book: 2,
  },
  {
    id: "livia-b2",
    name: "Livia Ericius",
    rank: 7,
    branch: "governance",
    title: "Septimus",
    description:
      "Sister of the deceased Callidus. Navigating life in the shadow of her family's grief.",
    book: 2,
  },
  {
    id: "kadmos-b2",
    name: "Kadmos",
    rank: 7,
    branch: "military",
    title: "Septimus — Dispensator",
    description:
      "Dispensator to the Telimus family and tutor to Vis. Loyal despite his low rank.",
    book: 2,
  },
  {
    id: "lanistia-b2",
    name: "Lanistia Scipio",
    rank: 6,
    branch: "governance",
    title: "Sextus",
    description:
      "Still resides at Ulciscor's estate. Former Academy classmate of the deceased Caeror.",
    book: 2,
  },
  {
    id: "relucia-b2",
    name: "Relucia Telimus",
    rank: 6,
    branch: "governance",
    title: "Sextus",
    description:
      "Wife of Ulciscor. Secretly a member of the Anguis rebel group.",
    book: 2,
  },

  // ── Deceased ──
  {
    id: "callidus-b2",
    name: "Callidus Ericius",
    rank: 7,
    branch: "academy",
    title: "Deceased — Academy Student",
    description:
      "Killed during the Anguis sabotage at the end of the Iudicium. His death haunts Vis.",
    book: 2,
    deceased: true,
  },

  // ── Outside the Hierarchy ──
  {
    id: "ostius-b2",
    name: "Ostius",
    rank: 8,
    branch: "outside",
    title: "Anguis Ally",
    description:
      "A mysterious ally of the Anguis who can travel between Res and Luceum.",
    book: 2,
  },
  {
    id: "caeror-b2",
    name: "Caeror Telimus",
    rank: 8,
    branch: "outside",
    title: "Lost — Surviving in Obiteum",
    description:
      "Ulciscor's brother. Thought dead after the Academy accident, but surviving in Obiteum for seven years.",
    book: 2,
  },
  {
    id: "cristoval-b2",
    name: "Cristoval",
    rank: 8,
    branch: "outside",
    title: "Deceased — Former King of Suus",
    description:
      "Vis's father and former king of the island kingdom of Suus. Executed by the Hierarchy when they conquered his people.",
    book: 2,
    deceased: true,
  },
];

export default CHARACTER_DATA;
