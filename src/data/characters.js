// Placements are listed by book. A character appears once the reader's book
// reaches their first placement, using the latest placement up to that book.
const CHARACTERS = [
  {
    name: "Vis Telimus",
    placements: [
      { book: 1, rank: null, group: "Academy", note: "Orphan taken in by Ulciscor and sent to the Academy. Not who he says he is." },
      { book: 2, rank: 6, group: "Governance", note: "Sextus in Governance, working under Ericius." },
    ],
  },
  {
    name: "Ulciscor Telimus",
    placements: [
      { book: 1, rank: 5, group: "Military", note: "Magnus Quintus and Military senator. Vis's adoptive father." },
    ],
  },
  {
    name: "Callidus Ericius",
    placements: [
      { book: 1, rank: null, group: "Academy", note: "Class 7 student and Vis's friend. Son of Ericius. Dies at the end of Book 1." },
    ],
  },
  {
    name: "Eidhin Breac",
    placements: [
      { book: 1, rank: null, group: "Academy", note: "Class 6 student from the tribal region of Cymr, with exceptional fighting skill." },
      { book: 2, rank: 6, group: "Military", note: "Sextus in Military." },
    ],
  },
  {
    name: "Emissa Corenius",
    placements: [
      { book: 1, rank: null, group: "Academy", note: "Class 3 student, one of the top-ranked at the Academy." },
      { book: 2, rank: 6, group: "Military", note: "Sextus in Military." },
    ],
  },
  {
    name: "Indol Quiscil",
    placements: [
      { book: 1, rank: null, group: "Academy", note: "Top-ranked student who takes an interest in Vis." },
      { book: 2, rank: 6, group: "Religion", note: "Sextus in Religion." },
    ],
  },
  {
    name: "Aequa Claudius",
    placements: [
      { book: 1, rank: null, group: "Academy", note: "Class 4 student. Attends the naumachia with Vis." },
      { book: 2, rank: 5, group: "Governance", note: "Quintus in Governance." },
    ],
  },
  {
    name: "Veridius Julii",
    placements: [
      { book: 1, rank: 5, group: "Religion", note: "The Principalis, in charge of the Academy." },
    ],
  },
  {
    name: "Ericius",
    placements: [
      { book: 1, rank: 3, group: "Governance", note: "Magnus Tertius and State Censor. Father of Callidus and Livia." },
      { book: 2, rank: 3, group: "Governance", note: "Magnus Tertius and State Censor. Father of Callidus and Livia, and now Vis's supervisor." },
    ],
  },
  {
    name: "Lanistia Scipio",
    placements: [
      { book: 1, rank: 6, group: null, note: "Sextus living at Ulciscor's estate. Tutored Vis. Blinded in the Academy accident that killed Caeror." },
    ],
  },
  {
    name: "Relucia Telimus",
    placements: [
      { book: 1, rank: 6, group: null, note: "Sextus and wife of Ulciscor." },
      { book: 2, rank: 6, group: null, note: "Sextus and wife of Ulciscor. Secretly works for the Anguis." },
    ],
  },
  {
    name: "Sedotia",
    placements: [
      { book: 1, rank: null, group: "Anguis", note: "Anguis member who confronts Vis after an attack on his journey to the capital." },
      { book: 2, rank: null, group: "Anguis", note: "The name Relucia Telimus used in the Anguis." },
    ],
  },
  {
    name: "Caeror Telimus",
    placements: [
      { book: 1, rank: null, group: "Outside", note: "Ulciscor's younger brother. His death at the Academy years ago drives Ulciscor's search for answers." },
      { book: 2, rank: null, group: "Obiteum", note: "Alive in Obiteum, where he has lived since running the Labyrinth." },
    ],
  },
  {
    name: "Ostius",
    placements: [
      { book: 2, rank: null, group: "Anguis", note: "A mysterious ally of the Anguis who can travel between worlds." },
    ],
  },
  {
    name: "Cristoval",
    placements: [
      { book: 2, rank: null, group: "Outside", note: "Former king of Suus and Vis's father. Executed by the Hierarchy." },
    ],
  },
  {
    name: "Kadmos",
    placements: [
      { book: 2, rank: 7, group: "Military", note: "Septimus in Military. Dispensator to the Telimus family and tutor to Vis." },
    ],
  },
  {
    name: "Livia Ericius",
    placements: [
      { book: 2, rank: 7, group: "Governance", note: "Septimus in Governance. Callidus's sister." },
    ],
  },
  {
    name: "Amercus Decimus",
    placements: [
      { book: 2, rank: 3, group: "Religion", note: "Tertius in Religion. Father of Iro, and embittered toward Vis over her death at the naumachia." },
    ],
  },
];

export default CHARACTERS;
