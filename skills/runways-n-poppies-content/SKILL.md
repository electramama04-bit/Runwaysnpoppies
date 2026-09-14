---
name: runways-n-poppies-content
description: >-
  The content system for Runways n Poppies — the four buckets, the weekly cadence, the
  sequencing rules that decide what can follow what, the reel and caption formats, and the
  manual-publishing rule (no Blotato, no automation, until the pages are established). Use
  when planning the calendar, deciding what to post next, writing a reel script or caption,
  or asking how a post actually gets published. Triggers on "what should I post", "plan the
  month", "content calendar for the channel", "write the script", "which bucket", "how do I
  post this", "schedule the channel", "can I automate this". Companion skills:
  runways-n-poppies-voice (read FIRST — voice and guardrails), runways-n-poppies-comments
  (after it's live), viral-hooks (the opening line), mama-brand-kit (tagline, handles).
---

# Runways n Poppies — Content System

**Read runways-n-poppies-voice first.** This skill assumes the voice and the guardrails are
already loaded.

---

## The four buckets

| Bucket | What it is | Cadence |
|---|---|---|
| **Runways** | Aviation, the Boeing lens, museums, airfields, paper airplanes | 1× / week |
| **Poppies** | Remembrance, veterans, VFW, the Buddy Poppy, her father | 1–2× / month |
| **Wild places** | Nature as the teacher — beaches, weird landmarks, hikes, kites | 1× / week |
| **Small wonders** | Physics you can do with your hands in your own kitchen | 1× / 2 weeks |

**Every post belongs to exactly one bucket.** If it belongs to none, it isn't a post yet.
If a month has no Poppies post, the channel is drifting from its own name.

## Weekly shape

- **Wednesday** — the anchor. The biggest post of the week, and the only slot for a heavy one.
  A heavy post drops as a Reel *and* a long-form on the same day, same hour.
- **Friday** — a short Reel, 15–20 seconds. Sharp, single idea.
- **Sunday** — a long-form. Warm, lower stakes, a place to breathe.

## Sequencing rules — what can follow what

These are load-bearing. Getting the order wrong is how a good post dies.

1. **Warm before you go heavy.** Never open a cold page with the hardest post. Two or three
   low-stakes posts first — they get the camera warm and prove the text overlay works.
2. **Every heavy post is followed by a deliberate cool-down** in the very next slot. Something
   light, from a different bucket. The audience needs to breathe and so does she.
3. **Never stack two heavy posts in the same week.** One per week, maximum.
4. **Earn standing before you spend it.** A post that argues something contested must come
   *after* the posts that establish who she is. A VFW Auxiliary Chaplain arguing about
   playground rules has standing that a stranger on the internet does not — but only if the
   audience already knows she's a chaplain.
5. **Origin before commentary.** People have to love the kid before they'll hear what was done
   to him.

## Reel format

- **Vertical 9:16.** 15–60 seconds. 60 is the ceiling, not the target.
- **The hook is the first 3 seconds** and it comes from `viral-hooks` — run the first-3-words
  test on it before anything else. The strongest word goes first. Never lead with the narrator
  ("I told...", "People keep asking...") when a number, a label, or a fact can lead instead.
- **Face + text overlay together, every time.** 85% of Reels are watched on mute. A spoken hook
  with no text on screen is a hook that does not exist.
- Overlay text sits in the **top third**, above the caption bar. Break long lines across two
  lines rather than shrinking the type — small text is the same as no text.
- Script it as a table: **time · what's on screen · what she says, word for word.**
- Heavy posts get a **second full version, text-overlay-only over B-roll**, written at the
  same time.

## Caption format

1. **The hook line, matching the on-screen text** — verbatim, so mute viewers and sound
   viewers get the same first sentence.
2. **Context** — 2–4 lines. Why it matters, what the kid actually learned.
3. **The Boeing or chaplain lens** — one line, where it fits honestly. Never forced.
4. **A concrete invitation** — go see it, take two, tell me where to go next.
5. **The tagline and the site**, on the two pinned posts only. A link in every post reads as
   selling.
6. **4–6 hashtags.** #RunwaysnPoppies always leads.

## Publishing — MANUAL ONLY

> **Do not schedule Runways n Poppies through Blotato, n8n, or any automation.** New pages
> pushing posts through a third-party API is exactly the pattern Meta's automated enforcement
> flags, and a flagged page can be shut down before it has any history to defend it.

**This rule holds until the pages have real posting history and an established audience.**
Revisit it then — not before, and not because a deadline is tight.

- **What Claude does:** hand over the finished package — shot list, on-screen text cards,
  word-for-word voiceover, copy/paste caption, hashtags. Everything she needs to post by hand
  from her phone in under five minutes.
- **What Claude does not do:** call publishing tools, schedule posts, or upload media for this
  channel.
- `vfw-969-social-pipeline` is the **VFW's** machine (Airtable + n8n + Blotato). Runways n
  Poppies does not route through it. Different brand, different rules.

## Where things live

- **Tagline, hashtag, handles, colors** → `mama-brand-kit`. Never hardcode them here.
- **Hook templates** → `viral-hooks`. Don't duplicate the library.
- **The role blurb for bios and the website** → `mama-specialty-descriptions`.

## Before any post goes out — the check

- [ ] Bucket named, and it isn't the same bucket as the last post
- [ ] Hook passes the first-3-words test
- [ ] Hook text is on screen, top third, in the first 3 seconds
- [ ] Every factual claim is on the confirmed list, or flagged for her to verify
- [ ] No school, teacher, or district named anywhere
- [ ] If Noah is in it — he has seen it and said yes
- [ ] If it's heavy — the fallback version exists and the next slot is a cool-down
- [ ] Reply bank open before it posts
