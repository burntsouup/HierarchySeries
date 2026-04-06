/*
 * Canonical hierarchy data from James Islington's "The Hierarchy" series.
 *
 * Populations follow the factorial pattern (R!) and each tier's feeding
 * ratio equals its rank number: 8 Octavii → 1 Septimus, 7 Septimii → 1 Sextus, etc.
 * Every tier cedes 50% of accumulated Will upward. The Princeps keeps everything.
 */
const HIERARCHY_DATA = [
  {
    rank: 1,
    latinTitle: "Princeps",
    latinPlural: "Principes",
    englishEquivalent: "Ruler",
    population: 1,
    feedingRatio: 0,
    willTransferRate: 0,
    privileges:
      "Absolute authority. Commands the collective Will of the entire hierarchy.",
    lore: "The Princeps sits at the apex of the Hierarchy — a single individual who receives the funnelled Will of every citizen below. Two Dimidii cede their accumulated power upward, and through them, the Will of all 46,233 people in the Republic converges into one person. The Princeps wields roughly 430× the power of an Octavus — enough to reshape cities and command armies single-handedly.",
    analogy:
      "An emperor or supreme head of state — the single point where all power converges.",
  },
  {
    rank: 2,
    latinTitle: "Dimidius",
    latinPlural: "Dimidii",
    englishEquivalent: "Half-Ruler",
    population: 2,
    feedingRatio: 2,
    willTransferRate: 50,
    privileges:
      "Second only to the Princeps. Governs vast regions and directs grand infrastructure.",
    lore: "Only two Dimidii exist in the Republic. The title means 'half' in Latin — each wields roughly half the power of the Princeps. Three Tertii feed each Dimidius, and through them, the Will of over 20,000 Octavii flows upward. At 429× an Octavus, a Dimidius can power city-scale constructs.",
    analogy:
      "Like the most powerful cabinet ministers or joint chiefs of staff — wielding enormous delegated authority.",
  },
  {
    rank: 3,
    latinTitle: "Tertius",
    latinPlural: "Tertii",
    englishEquivalent: "Third",
    population: 6,
    feedingRatio: 3,
    willTransferRate: 50,
    privileges:
      "Senior leadership. Commands districts, legions, or major religious institutions.",
    lore: "Just six Tertii command the highest echelons of their branch — a Tertius in Governance oversees district-level administration, in Military they command legions, and in Religion they manage major temples. Four Quarti feed each Tertius, and through the chain, each one channels the Will of 6,720 Octavii. Characters like Ericius (Magnus Tertius in Governance) are among the most powerful people alive, wielding 286× an Octavus.",
    analogy:
      "Military generals, federal judges, or archbishops — powerful leaders managing large organisations within their branch.",
  },
  {
    rank: 4,
    latinTitle: "Quartus",
    latinPlural: "Quarti",
    englishEquivalent: "Fourth",
    population: 24,
    feedingRatio: 4,
    willTransferRate: 50,
    privileges:
      "Privileged citizens. Manage estates, trade networks, and local operations.",
    lore: "Twenty-four Quarti form the upper class of the Republic — wealthy, educated, and influential. Five Quinti feed each Quartus, channelling the Will of 1,680 Octavii through the chain. At 142× an Octavus, a Quartus has enough personal power to wield Imbued devices and live in considerable comfort. This is where genuine privilege begins.",
    analogy:
      "The upper-middle class: senior managers, wealthy merchants — comfortable and influential but still serving those above.",
  },
  {
    rank: 5,
    latinTitle: "Quintus",
    latinPlural: "Quinti",
    englishEquivalent: "Fifth",
    population: 120,
    feedingRatio: 5,
    willTransferRate: 50,
    privileges:
      "Skilled professionals and minor officials. The highest tier most citizens can aspire to.",
    lore: "The 120 Quinti are the skilled professionals of the Republic — crafts-people, minor officials, and specialists. Six Sexti feed each Quintus. Characters like Ulciscor Telimus (Magnus Quintus in Military) hold significant political influence as senators, wielding 57× an Octavus. Life as a Quintus is stable and respected, though advancement to Quartus is exceedingly difficult.",
    analogy:
      "Skilled professionals: engineers, doctors, military officers — respected and comfortable, forming the backbone of institutions.",
  },
  {
    rank: 6,
    latinTitle: "Sextus",
    latinPlural: "Sexti",
    englishEquivalent: "Sixth",
    population: 720,
    feedingRatio: 6,
    willTransferRate: 50,
    privileges:
      "The first tier that Academy graduates enter. Competent workers with limited authority.",
    lore: "Sexti are where Academy graduates begin their careers. After winning the Iudicium, Vis enters as a Sextus in Governance. His friends are similarly placed: Eidhin and Emissa as Sexti in Military, Indol as a Sextus in Religion. Seven Septimii feed each Sextus, and at 19× an Octavus, they are competent but junior. The gap between Sextus and Quintus is one of the steepest social divides.",
    analogy:
      "Junior professionals and entry-level officers — capable and educated, but still proving themselves within the system.",
  },
  {
    rank: 7,
    latinTitle: "Septimus",
    latinPlural: "Septimii",
    englishEquivalent: "Seventh",
    population: 5040,
    feedingRatio: 7,
    willTransferRate: 50,
    privileges:
      "General labourers. Form the backbone of the economy. Limited rights and hope of advancement.",
    lore: "The 5,040 Septimii are the general labourers of the Republic — farming, construction, manufacturing. Eight Octavii feed each Septimus, giving them 5× an Octavus. Characters like Kadmos (a Septimus in Military who serves as Dispensator to the Telimus family) and Livia Ericius (a Septimus in Governance) show that even named characters can occupy this tier. A Septimus has limited rights and little hope of advancement.",
    analogy:
      "Factory workers and farmhands — essential to the economy but with little personal power or upward mobility.",
  },
  {
    rank: 8,
    latinTitle: "Octavus",
    latinPlural: "Octavii",
    englishEquivalent: "Eighth",
    population: 40320,
    feedingRatio: 8,
    willTransferRate: 50,
    privileges:
      "The lowest tier. The true foundation — cede half their Will with almost no personal rights.",
    lore: "The 40,320 Octavii are the true foundation of the Hierarchy — the broadest tier, the most numerous, and the most exploited. Eight Octavii pool their Will to feed a single Septimus above them. After ceding 50%, each retains just 0.5 Will units — half of what they naturally generate. They have almost no legal rights and are treated as disposable resources. The suffering of this tier is a central theme of the series.",
    analogy:
      "The lowest-paid workers in a pyramid scheme — contributing everything, receiving nothing from below. They are the source of all power.",
  },
];

export default HIERARCHY_DATA;

// The three branches of the Catenan Republic.
export const BRANCHES = [
  {
    id: "governance",
    name: "Governance",
    icon: "🏛️",
    colour: "#fbbf24",
    description:
      "The political and civic branch. Manages law, administration, trade, and the day-to-day governance of the Republic.",
  },
  {
    id: "military",
    name: "Military",
    icon: "⚔️",
    colour: "#ef4444",
    description:
      "The armed forces of the Republic. Defends borders, conquers territory, and maintains order through strength.",
  },
  {
    id: "religion",
    name: "Religion",
    icon: "🔮",
    colour: "#a78bfa",
    description:
      "Oversees temples, metaphysical research, and the Academy. The keepers of ancient knowledge and ritual.",
  },
];
