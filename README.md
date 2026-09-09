# #MakeLifeFun — Locked 30-Day Plan

Content plan, scripts, captions, and comment reply bank for Shirley "Mama" Hauser's
homeschool channel. **Window: Sep 10 – Oct 5, 2026.**

> They put blue tape around my son, so I built him a runway instead.

## Start here

Open `dist/` — those are the files to actually use.

| File | What it's for |
|---|---|
| `MakeLifeFun-30-Day-Plan.docx` | The whole plan: dates, niche, safety net, kid rules |
| `MakeLifeFun-Reel-Scripts.docx` | All 9 reels word for word + both text-overlay fallbacks |
| `MakeLifeFun-Facebook-Captions.docx` | Six long-form captions, A–F |
| `MakeLifeFun-Comment-Reply-Bank.docx` | Save to phone Notes **before** posting |
| `MakeLifeFun-30-Day-Calendar.xlsx` | Filterable calendar + film days, with a Status column |
| `MakeLifeFun-30-Day-Plan.ics` | Import to Google Calendar — 19 events, 1-hour reminders |

## The three things that are not optional

1. **Blue Tape (Sep 16) posts before Finger-Guns (Sep 23).** The audience has to love the
   kid before they hear what was done to him.
2. **Noah previews every heavy post and can veto it.** No reason required.
3. **Verify the flagged facts before you film.** Every ⚠️ in the scripts is a number or a
   name that a commenter will check. Notably: Noah's age when the blue tape happened, and
   the exact job title printed on the school's paperwork.

## Rebuilding

Source of truth is the markdown in `plan/`. Edit there, then:

```
pip install python-docx openpyxl
python3 build.py
```

Regenerates everything in `dist/`.
