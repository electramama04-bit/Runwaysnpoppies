# Runways n Poppies — Locked 30-Day Plan

Content plan, scripts, captions, and comment reply bank for Shirley "Mama" Hauser —
Boeing toolmaker, homeschool mom, VFW Auxiliary 969 Chaplain.

> **The runways taught us to fly. The poppies remind us what it cost.**

**Window: Sep 14 – Oct 11, 2026.** Hashtag: **#RunwaysnPoppies**

## Start here

Open `dist/` — those are the files to actually use.

| File | What it's for |
|---|---|
| `RunwaysnPoppies-30-Day-Plan.docx` | The whole plan: dates, four buckets, safety net, kid rules |
| `RunwaysnPoppies-Reel-Scripts.docx` | All 11 reels word for word + both text-overlay fallbacks |
| `RunwaysnPoppies-Facebook-Captions.docx` | Seven long-form captions, A–G |
| `RunwaysnPoppies-Comment-Reply-Bank.docx` | Save to phone Notes **before** posting |
| `RunwaysnPoppies-30-Day-Calendar.xlsx` | Filterable calendar + film days, with a Status column |
| `RunwaysnPoppies-30-Day-Plan.ics` | Import to Google Calendar — 22 events, 1-hour reminders |

## The four buckets

**Runways** (aviation, Boeing) · **Poppies** (remembrance, veterans, VFW) ·
**Wild places** (nature) · **Small wonders** (kitchen physics)

## The three things that are not optional

1. **Blue Tape (Sep 16) posts before Finger-Guns (Sep 30),** and the Poppies week sits
   between them. That order is load-bearing — see the note in Week 3 of the plan.
2. **Noah previews every heavy post and can veto it.** No reason required.
3. **Verify the flagged facts before you film.** Every ⚠️ is a claim a commenter will check.
   Remaining open items: the Flanders/aviation history in Script 10, the Buddy Poppy
   specifics in Script 11 (both: confirm through VFW National), Satsop public access, and
   the real numbers in Script 7.

## Confirmed facts (do not re-flag)

- Noah was **nine** when the blue tape happened. He is nine now, turns ten in November 2026.
- The school's title was **"threat assessment specialist"** — word for word, never paraphrased.
- Satsop: **481 ft**, construction started **1977**.

## Open item

- **Website URL** — the site is live but the address isn't in these files yet. Once it's
  added it belongs in Caption B (the pinned Blue Tape post) and Caption G (the manifesto).

## Rebuilding

Source of truth is the markdown in `plan/`. Edit there, then:

```
pip install python-docx openpyxl
python3 build.py
```

Regenerates everything in `dist/`.
