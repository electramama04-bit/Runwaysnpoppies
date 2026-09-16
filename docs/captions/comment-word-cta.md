# The comment word: RUNWAY

How a viewer becomes a subscriber, and every line you need to say along the way.

## Why RUNWAY

One word, six letters, already the brand. It is in the name, it is the blue tape
story, and nobody mistypes it. A word like PLANE is generic and gets used by
fifty other accounts. RUNWAY belongs to this channel.

Use the same word every time. The whole point is that regulars learn it.

## The flow

```
Video ends with the ask
   ->  Viewer comments RUNWAY
   ->  You reply publicly, and send the link by DM
   ->  They subscribe on Substack
   ->  Welcome email delivers the file
```

The public reply matters as much as the DM. Other people read the comments and
see that you answer.

## What to say at the end of the video

On screen, last three seconds, and in the caption. Keep it to one line.

```
Comment RUNWAY and I'll send it to you.
```

Alternates when the first gets stale:

```
Comment RUNWAY and it's yours.
Want it? Comment RUNWAY.
```

Do not stack the ask. One word, one instruction. Never pair it with "and follow
and share and turn on notifications."

## Reply scripts

**Public reply, under their comment.** Short. Everyone else is reading it.

```
Sent. Check your messages.
```

```
On its way.
```

**DM, same day.** This is the one that has to carry the link.

```
Here you go. This is the [FILE NAME] we used this week.

[SUBSTACK LINK]

Drop your email there and it lands in your inbox right away. I send one letter a
week with whatever we built, and nothing else.

Thanks for watching.
```

Rules for the DM. No emojis. No exclamation points stacked up. Name the file, so
it feels like a thing and not a funnel. Say what the newsletter actually is, in
one sentence, so subscribing is an informed choice.

**If they ask whether it costs anything:**

```
Nothing. The newsletter is free. Three of the lesson files on the site are free
to download with no email at all, if you would rather just grab those.
runwaysnpoppies.com
```

That answer is the whole trust position in three sentences. It is worth having
ready.

## The two-track rule

| The file | The ask |
|---|---|
| The Four Forces, Flight Test Report, Hours Log | "It's free on the site." No comment word. |
| Anything published after the list opened | "Comment RUNWAY and I'll send it to you." |

Never ask people to comment for something they could have downloaded in one
click. They will find out, and it reads as a trick.

## The welcome email

Substack calls this the welcome note. It sends itself when someone subscribes,
so write it once.

```
Subject: Here's the file, and here's what this is

Thanks for subscribing.

The file is attached, or linked right below this line.

[FILE LINK]

Here is what you signed up for. One letter a week from an aviation themed
homeschool in Tacoma, Washington. What we built that week, what worked, what
did not, and the printable that came out of it.

I am a Boeing tool maker. I homeschool my son through aviation because that is
what pulls his attention forward. Everything I make for our year, I share.

Three of the lesson files are free on the site with no email at all, if you want
to start there. runwaysnpoppies.com

Runways for my son. Poppies for my dad.

Shirley
```

## What the first gated file should be

It has to be new, and it has to be worth an email.

**Recommended: the Flight and Friction unit, complete.** All ten days, not just
the three pages on the site. Pages 1 through 3 and 7 through 10 have never been
published. That makes the free pages a genuine sample rather than a tease, and
the full unit a real reason to subscribe.

It is also nearly done. You wrote it already.

## Open items

- Substack not created yet. Until it exists there is no link, so do not run the
  comment word in a video.
- `NEWSLETTER_URL` in `src/catalog.ts` is empty. Fill it with the Substack URL
  and gated cards will point there.
- No file is marked `access: "newsletter"` yet. The three originals stay free.
