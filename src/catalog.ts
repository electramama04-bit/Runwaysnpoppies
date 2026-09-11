/**
 * The Runways n Poppies catalog.
 *
 * This is the single place to add a document or a link. The site reads it
 * through /api/documents and /api/links, so adding an entry here (plus dropping
 * the file into public/files/) is all it takes to publish something new.
 */

/**
 * School years, labeled by grade.
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
  /** Human-readable size, shown so nobody is surprised by the click. */
  sizeLabel: string;
  /** Page count for printables, so people know what they're printing. */
  pages?: number;
  grade?: Grade;
  /** Unit or theme this belongs to. */
  unit?: string;
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

export const DOCUMENTS: DocEntry[] = [
  {
    id: "hours-log-template",
    title: "Homeschool Hours Log 2026-2027 Template",
    description:
      "A year-long hours tracker for a Washington homeschool. Type each day into the Daily Log and the rest adds itself up: hours and days per month, hours in each of the 11 required subjects, and how much of the year happened away from a desk. Tracks both the 1,000-hour and the 180-day path so you can use whichever you reach first.",
    file: "hours-log-template.xlsx",
    format: "xlsx",
    sizeLabel: "31 KB",
    grade: "5th Grade",
    unit: "Compliance",
    subjects: ["Occupational Education", "Compliance", "Printable"],
    updated: "2026-09-11",
    featured: true,
  },
  {
    id: "four-forces-pages",
    title: "The Four Forces — Flight & Friction, Pages 4–6",
    description:
      "Lift, weight, thrust, and drag explained through a kite, a boat, and a monster truck — plus the three big ideas behind the unit and how engineers write results down. Includes the three-trials-one-average method and the two kite safety rules that are not optional.",
    file: "four-forces-pages.pdf",
    format: "pdf",
    sizeLabel: "180 KB",
    pages: 3,
    grade: "5th Grade",
    unit: "Flight & Friction",
    subjects: ["Science", "Math", "Reading"],
    updated: "2026-09-06",
    featured: true,
  },
  {
    id: "flight-test-report",
    title: "Flight Test Report — Flight & Friction, Day 10",
    description:
      "The final report real test engineers write after every program. Label the four forces, record your best result across three vehicles, check your hypothesis, and sign it. Doubles as a writing sample and a science assessment artifact for the annual review.",
    file: "flight-test-report.pdf",
    format: "pdf",
    sizeLabel: "100 KB",
    pages: 2,
    grade: "5th Grade",
    unit: "Flight & Friction",
    subjects: ["Science", "Writing", "Math", "Health / PE"],
    updated: "2026-09-06",
    featured: true,
  },
];

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
    description:
      "The statute itself — it explicitly protects experiential, less-structured teaching.",
    category: "Washington State",
  },
  {
    title: "BirdNote",
    url: "https://www.birdnote.org/",
    description: "Short episodes that turn drive time into science class.",
    category: "Listening",
  },
];
