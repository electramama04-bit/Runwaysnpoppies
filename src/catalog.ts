/**
 * The Runways & Poppies catalog.
 *
 * This is the single place to add a document or a link. The site reads it
 * through /api/documents and /api/links, so adding an entry here (plus dropping
 * the file into public/files/) is all it takes to publish something new.
 */

/**
 * School years, labeled by Noah's grade.
 * 4th grade ran Sept 8, 2025 - Jul 1, 2026. 5th grade started Sept 8, 2026.
 */
export type Grade = "4th Grade" | "5th Grade";

/** File formats the download route knows how to label. */
export type Format = "pdf" | "docx" | "xlsx" | "ics" | "png" | "zip";

export interface DocEntry {
  /** URL slug — this becomes /download/<id>. Keep it stable once published. */
  id: string;
  title: string;
  /** One or two plain sentences. What is it, and who is it for? */
  description: string;
  /** Filename inside public/files/ */
  file: string;
  format: Format;
  /** Human-readable size, e.g. "1.2 MB". Shown so nobody is surprised. */
  sizeLabel: string;
  grade?: Grade;
  /** Washington's 11 required subjects, or any tag that helps someone find it. */
  subjects: string[];
  /** ISO date (YYYY-MM-DD) this file was last revised. */
  updated: string;
  /** Featured entries appear on the home page. */
  featured?: boolean;
}

export interface LinkEntry {
  title: string;
  url: string;
  description: string;
  category: string;
}

/**
 * PLACEHOLDER ENTRIES — replace with the real files.
 *
 * Each one below is shaped from the actual curriculum so the page renders and
 * filters correctly on first run. Drop the real file into public/files/, update
 * `file`, `sizeLabel` and `updated`, and it goes live on the next deploy.
 */
export const DOCUMENTS: DocEntry[] = [
  {
    id: "hours-log-template",
    title: "Homeschool Hours Log Template",
    description:
      "Monthly hours tracker mapped to Washington's 11 required subjects. Built to satisfy the 1,000-hour requirement without last-minute scrambling.",
    file: "hours-log-template.xlsx",
    format: "xlsx",
    sizeLabel: "— KB",
    grade: "4th Grade",
    subjects: ["Recordkeeping", "WA Compliance"],
    updated: "2026-09-09",
    featured: true,
  },
  {
    id: "year-planning-guide",
    title: "52-Week Aviation Year Planning Guide",
    description:
      "The full thematic framework — four quarters from Spring Flight through Winter Ascent, with weekly themes and the aviation milestones they hang on.",
    file: "year-planning-guide.pdf",
    format: "pdf",
    sizeLabel: "— MB",
    grade: "4th Grade",
    subjects: ["Planning", "History", "Science"],
    updated: "2026-09-09",
    featured: true,
  },
  {
    id: "paper-airplane-lab",
    title: "Paper Airplane Engineering Lab",
    description:
      "A hands-on Friday lab: fold three designs, measure glide distance, chart the results. Covers lift and drag in a way a nine-year-old can hold in his hands.",
    file: "paper-airplane-lab.pdf",
    format: "pdf",
    sizeLabel: "— KB",
    grade: "4th Grade",
    subjects: ["Science", "Occupational Ed", "Math"],
    updated: "2026-09-09",
    featured: true,
  },
  {
    id: "bird-flight-journal",
    title: "Birds & Flight Nature Journal Pages",
    description:
      "Printable journal spreads for bird identification and wing-shape sketching. Pairs with eBird and Merlin on nature outings.",
    file: "bird-flight-journal.pdf",
    format: "pdf",
    sizeLabel: "— KB",
    grade: "4th Grade",
    subjects: ["Science", "Art Appreciation", "Writing"],
    updated: "2026-09-09",
  },
  {
    id: "museum-trip-quick-cards",
    title: "Museum Trip Quick Cards",
    description:
      "One card per outing: hours, parking, fees, what the membership covers, and the discussion questions to ask in the car on the way home.",
    file: "museum-trip-quick-cards.pdf",
    format: "pdf",
    sizeLabel: "— MB",
    grade: "4th Grade",
    subjects: ["Social Studies", "History"],
    updated: "2026-09-09",
  },
  {
    id: "homeschool-calendar",
    title: "Aviation Homeschool Calendar",
    description:
      "The full year as an .ics file — import it straight into Google Calendar and every theme week, break, and field trip lands on the right day.",
    file: "homeschool-calendar.ics",
    format: "ics",
    sizeLabel: "— KB",
    grade: "5th Grade",
    subjects: ["Planning"],
    updated: "2026-09-09",
  },
];

/** PLACEHOLDER — swap in the links actually worth sharing. */
export const LINKS: LinkEntry[] = [
  {
    title: "The Museum of Flight",
    url: "https://www.museumofflight.org/",
    description: "Our home institution in Seattle, and the anchor of the whole year.",
    category: "Museums",
  },
  {
    title: "Washington State Homeschool Law (RCW 28A.200)",
    url: "https://app.leg.wa.gov/rcw/default.aspx?cite=28A.200",
    description: "The statute itself — it explicitly protects experiential, less-structured teaching.",
    category: "Washington State",
  },
  {
    title: "BirdNote",
    url: "https://www.birdnote.org/",
    description: "Short episodes that turn drive time into science class.",
    category: "Listening",
  },
];
