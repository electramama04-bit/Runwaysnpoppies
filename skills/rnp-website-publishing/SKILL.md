---
name: rnp-website-publishing
description: >-
  Publishes a document or a link to runwaysnpoppies.com — the Cloudflare Worker site that
  serves the free homeschool library. Use for ANY task putting something on the site or
  fixing it: adding a lab sheet, nature journal page, trip card, or hours log; adding a
  curated link; changing a title or description; featuring something on the home page;
  a download that 404s; a deploy that fails. Triggers on "put this on the site", "add a
  download", "publish the lab sheet", "add a link to the site", "the download is broken",
  "feature this on the home page", "deploy the site", "update the catalog", "runwaysnpoppies
  .com". Companion skills: rnp-content-calendar (the post that points at the download),
  aviation-homeschool (the curriculum the document comes from), mama-brand-kit (colors and
  the three-color rule if the document itself needs designing).
  Field-by-field catalog reference lives in references/catalog-fields.md.
---

# Runways n Poppies — Website Publishing

The site is a Cloudflare Worker with static assets. There is no database and no CMS.
**Everything on the site comes from one file: `src/catalog.ts`.** Add an entry there, drop
the file in `public/files/`, deploy. That is the whole system.

## The one rule that cannot be undone

**Once a document's `id` has been shared publicly, never change it.**

The `id` becomes the URL: `id: "four-forces-pages"` serves at
`runwaysnpoppies.com/download/four-forces-pages`. Change the id and every link in every
post, comment, and DM you have ever sent breaks silently. Nobody reports a broken link.
They just leave.

Title, description, and file can all change freely. The id is permanent. Choose it once,
carefully, in kebab-case, describing the content rather than the week it was made.

- Good: `four-forces-pages`, `hours-log-template`, `paine-field-trip-card`
- Bad: `week-3`, `noahs-sheet-final-v2`, `download1`

## Publishing a document — four steps

### 1. Put the file in `public/files/`

Filename in kebab-case, matching the id where possible. `four-forces-pages.pdf`.

Format by what it is:

| It is | Format | Why |
|-------|--------|-----|
| A printable worksheet or lab sheet | `.pdf` | Prints identically everywhere |
| A tracker or log someone fills in | `.xlsx` | They need to type in it |
| A guide someone will adapt | `.docx` | They need to edit it |
| Calendar events | `.ics` | Imports straight to their calendar |

PDF is the default for anything a parent prints. Use `.xlsx` or `.docx` only when the
person receiving it genuinely needs to change the contents.

### 2. Add the entry to `src/catalog.ts`

Add to the `DOCUMENTS` array. Every field is explained in
`references/catalog-fields.md`. Match `file` to the filename exactly, including extension.

### 3. Fill in the real `sizeLabel`, `pages`, and `updated`

Not estimates. Get the real numbers:

```bash
ls -lh public/files/your-file.pdf          # size
pdfinfo public/files/your-file.pdf | grep Pages   # page count, if pdfinfo is available
```

`updated` is an ISO date, `YYYY-MM-DD`, the day the file was actually last revised.
`sizeLabel` is shown so nobody is surprised by the click. A wrong one is a small lie that
costs trust for no reason.

### 4. Check, then deploy

```bash
npm run check     # regenerates types, typechecks, dry-run deploys. Must pass clean
npm run deploy    # publishes to Cloudflare
```

Never deploy without `npm run check` passing first. It catches a malformed catalog entry
before the site does.

Then **open the real URL and click the real download button.** A deploy that succeeded is
not the same as a file that downloads.

## Adding a link

Same file, the `LINKS` array. Four fields: `title`, `url`, `description`, `category`.

A new `category` string creates its own heading on `/links` automatically. That is a
feature, and also a trap: `"Museums"` and `"museums"` become two separate headings. Match
an existing category exactly or deliberately start a new one.

## Featuring on the home page

`featured: true` puts an entry on the home page. Keep it to the two or three genuinely
strongest downloads. Featuring everything is featuring nothing.

## When a catalog entry has no file yet

The site handles this gracefully on purpose. A listed document with no file in
`public/files/` returns a clear message — "That file is listed but not uploaded yet" —
rather than a broken page, and it logs the mismatch.

So you can list something before it exists. **But do not leave it there.** A listing that
never becomes a file is a promise the site keeps making and breaking.

## The library is the bottleneck

As of September 2026 the site carries **two downloads**, both from the Flight & Friction
unit, both 5th grade. Every post that points somewhere points at one of those two.

Two downloads cannot carry a year of posting. When **rnp-content-calendar** flags "no
download fits this post," that is this skill's queue. The fastest fills:

- The hours log template. Every WA homeschool parent needs one and it ties to the
  1,000-hour requirement
- A trip card for each field trip already on the calendar
- Nature journal pages
- The Declaration of Intent walkthrough, which is searched every August and September

A published download is itself a post. "I put the hours log on the site, it's free, here's
how we use it" is a complete Wednesday outcome Reel.

## Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| Download returns "listed but not uploaded yet" | `file` does not match a real filename | Check spelling and extension in `public/files/` |
| Download 404s with "No document with that id" | The id in the URL is not in `DOCUMENTS` | An id was changed or never added |
| `npm run check` fails on types | Catalog entry is missing a required field or uses an unknown `format` | `format` must be one of pdf, docx, xlsx, ics, png, zip |
| Two headings for the same category on /links | Category strings differ in case or spacing | Make them identical |
| `wrangler: not found` | Dependencies not installed | `npm install` |
| Deploy asks for login | Not authenticated | `npx wrangler login` |

## What NOT to do

- Don't change a published `id`. Ever.
- Don't deploy without `npm run check` passing.
- Don't trust a successful deploy. Click the actual download.
- Don't guess `sizeLabel`, `pages`, or `updated`.
- Don't list a document you are not going to upload within the week.
- Don't feature more than three documents.
- Don't put a child's full name, your home address, or anything identifying inside a
  published file. These are downloaded by strangers, which is the point, and the boys'
  first names on camera are a different decision from their details inside a PDF.
