# Catalog Fields — every field in src/catalog.ts

## A document entry

```ts
{
  id: "hours-log-template",
  title: "Homeschool Hours Log 2026-2027 Template",
  description:
    "A month-by-month tracker for Washington's 1,000-hour requirement, with every hour mapped to one of the 11 required subjects. Field trips, nature time, and reading all count, and this shows how.",
  file: "hours-log-template.xlsx",
  format: "xlsx",
  sizeLabel: "48 KB",
  pages: 12,
  grade: "5th Grade",
  unit: "Compliance",
  subjects: ["Occupational Education"],
  updated: "2026-09-11",
  featured: true,
}
```

| Field | Required | What goes in it |
|-------|----------|-----------------|
| `id` | yes | Kebab-case slug. **Becomes the URL. Permanent once shared.** Describe the content, never the week |
| `title` | yes | What a stranger searching would recognize. Include the unit if it helps |
| `description` | yes | One or two plain sentences. What is it, and who is it for. Written for a parent who has never met you |
| `file` | yes | Exact filename inside `public/files/`, including extension |
| `format` | yes | One of `pdf`, `docx`, `xlsx`, `ics`, `png`, `zip`. Anything else fails typecheck |
| `sizeLabel` | yes | Real, human-readable. `"180 KB"`, `"1.2 MB"`. Measure it |
| `pages` | no | Page count for printables, so people know what they are printing |
| `grade` | no | `"4th Grade"` or `"5th Grade"`. Drives the filter on `/downloads` |
| `unit` | no | The unit or theme. `"Flight & Friction"`. Groups related sheets |
| `subjects` | yes | Array. Use Washington's required subjects where they fit, plus any tag that helps someone find it |
| `updated` | yes | `YYYY-MM-DD`. The day the file was actually last revised |
| `featured` | no | `true` puts it on the home page. Two or three maximum |

## School years

```ts
export type Grade = "4th Grade" | "5th Grade";
```

4th grade ran September 8, 2025 to July 1, 2026. 5th grade started September 8, 2026.
This is the frame the site uses. Adding a 6th grade means adding it to the `Grade` type
first, or typecheck fails.

## Washington's 11 required subjects

Use these exact strings in `subjects` wherever they fit, so a parent filtering by what
their state requires finds the sheet.

Reading · Writing · Spelling · Language · Math · Science · Social Studies · History ·
Health · Occupational Education · Art & Music Appreciation

Add practical tags alongside them: `"Aviation"`, `"Nature"`, `"Compliance"`, `"Printable"`.
A sheet can carry several. The existing Four Forces entry uses
`["Science", "Math", "Reading"]`, and the Flight Test Report adds `"Health / PE"`.

## A link entry

```ts
{
  title: "The Museum of Flight",
  url: "https://www.museumofflight.org/",
  description: "Our home institution in Seattle, and the anchor of the whole year.",
  category: "Museums",
}
```

All four fields required. `category` creates its own heading on `/links`, so match an
existing string exactly or you get two headings for the same thing.

Existing categories as of September 2026: **Museums**, **Washington State**, **Listening**.

## What the site does with all this

| Route | Serves |
|-------|--------|
| `/` | Hero, manifesto, four hats, reels, curriculum, contact. Featured documents appear here |
| `/downloads` | The full library, filterable by grade |
| `/links` | Every link, grouped by category heading |
| `/api/documents` | JSON feed of `DOCUMENTS` |
| `/api/links` | JSON feed of `LINKS` |
| `/download/<id>` | The file, wrapped with a Content-Disposition header so it saves under a readable name instead of previewing |

The `/download/<id>` route is why the id matters. It is also why a saved file arrives named
after the **title**, not the filename: `Homeschool_Hours_Log_2026-2027_Template.xlsx`.

### Gotcha: punctuation in a title shows up in the saved filename

The saved name is built from `title` by stripping anything that is not a letter, number,
space, or hyphen, then turning spaces into underscores. So an em-dash in a title leaves a
**double underscore** behind: `"Hours Log — 2026-2027"` saves as `Hours_Log__2026-2027`.

Use a hyphen or a colon in titles instead. Mama's caption voice rule already bans
em-dashes, and this is the same rule showing up in a second place.

## The manifesto is protected

`public/index.html` carries the manifesto verbatim, Cream on Navy with a Gold attribution.
Do not reword it, reflow it, or "tighten" it while editing anything else on that page.
