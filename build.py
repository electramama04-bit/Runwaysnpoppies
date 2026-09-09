#!/usr/bin/env python3
"""Build Mama's #MakeLifeFun deliverables: .docx docs, .xlsx calendar, .ics schedule."""
import re, os, datetime
from docx import Document
from docx.shared import Pt, Inches, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

ROOT = os.path.dirname(os.path.abspath(__file__))
PLAN, DIST = os.path.join(ROOT, "plan"), os.path.join(ROOT, "dist")
os.makedirs(DIST, exist_ok=True)

NAVY = RGBColor(0x1F, 0x3A, 0x5F)

# ---------- markdown -> docx ----------
def add_runs(par, text):
    """Handle **bold**, *italic*, `code` inline."""
    for tok in re.split(r"(\*\*.+?\*\*|(?<!\*)\*(?!\*).+?(?<!\*)\*(?!\*)|`.+?`)", text):
        if not tok:
            continue
        if tok.startswith("**") and tok.endswith("**"):
            par.add_run(tok[2:-2]).bold = True
        elif tok.startswith("`") and tok.endswith("`"):
            r = par.add_run(tok[1:-1]); r.font.name = "Consolas"; r.font.size = Pt(9.5)
        elif tok.startswith("*") and tok.endswith("*") and len(tok) > 2:
            par.add_run(tok[1:-1]).italic = True
        else:
            par.add_run(tok)

def flush_table(doc, rows):
    if not rows:
        return
    body = [r for r in rows if not re.fullmatch(r"\|[\s:|-]+\|", r.strip())]
    grid = [[c.strip() for c in r.strip().strip("|").split("|")] for r in body]
    width = max(len(r) for r in grid)
    grid = [r + [""] * (width - len(r)) for r in grid]
    t = doc.add_table(rows=len(grid), cols=width)
    t.style = "Light Grid Accent 1"
    for i, row in enumerate(grid):
        for j, cell in enumerate(row):
            c = t.cell(i, j); c.text = ""
            for k, line in enumerate(cell.split("<br>")):
                p = c.paragraphs[0] if k == 0 else c.add_paragraph()
                add_runs(p, line)
                for r in p.runs:
                    r.font.size = Pt(9)
                    if i == 0:
                        r.bold = True
    doc.add_paragraph()

def md_to_docx(md_path, out_path, title):
    doc = Document()
    st = doc.styles["Normal"]; st.font.name = "Calibri"; st.font.size = Pt(11)
    for s in doc.sections:
        s.left_margin = s.right_margin = Inches(0.8)
        s.top_margin = s.bottom_margin = Inches(0.7)

    h = doc.add_paragraph(); h.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r = h.add_run(title); r.bold = True; r.font.size = Pt(20); r.font.color.rgb = NAVY
    sub = doc.add_paragraph(); sub.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r = sub.add_run("#MakeLifeFun  ·  Shirley “Mama” Hauser  ·  Tacoma, WA")
    r.italic = True; r.font.size = Pt(10); r.font.color.rgb = RGBColor(0x66, 0x66, 0x66)

    tbuf = []
    for raw in open(md_path, encoding="utf-8").read().split("\n"):
        line = raw.rstrip()
        if line.startswith("|"):
            tbuf.append(line); continue
        if tbuf:
            flush_table(doc, tbuf); tbuf = []
        if not line.strip():
            continue
        if re.fullmatch(r"-{3,}", line.strip()):
            p = doc.add_paragraph(); p.paragraph_format.space_before = Pt(2)
            add_runs(p, "─" * 60)
            for run in p.runs:
                run.font.color.rgb = RGBColor(0xBB, 0xBB, 0xBB)
            continue
        m = re.match(r"^(#{1,4})\s+(.*)", line)
        if m:
            lvl, txt = len(m.group(1)), m.group(2)
            p = doc.add_heading(level=min(lvl, 4)); add_runs(p, txt)
            for run in p.runs:
                run.font.color.rgb = NAVY
                run.font.size = Pt({1: 17, 2: 14, 3: 12, 4: 11}[min(lvl, 4)])
            continue
        if line.startswith(">"):
            p = doc.add_paragraph(); p.paragraph_format.left_indent = Inches(0.35)
            add_runs(p, line.lstrip("> ").rstrip())
            for run in p.runs:
                run.italic = True; run.font.color.rgb = NAVY
            continue
        m = re.match(r"^(\s*)[-*]\s+(.*)", line)
        if m:
            p = doc.add_paragraph(style="List Bullet")
            p.paragraph_format.left_indent = Inches(0.3 + 0.25 * (len(m.group(1)) // 2))
            add_runs(p, m.group(2)); continue
        m = re.match(r"^\s*(\d+)\.\s+(.*)", line)
        if m:
            p = doc.add_paragraph(style="List Number"); add_runs(p, m.group(2)); continue
        add_runs(doc.add_paragraph(), line)
    if tbuf:
        flush_table(doc, tbuf)
    doc.save(out_path)
    print("  docx:", os.path.basename(out_path))

# ---------- the schedule ----------
SCHEDULE = [
    ("2026-09-10","Week 1 — Warm","Wild Places","Satsop POV Reel","Reel, 20 sec","Script 1",
     "POV: Saturday school is a nuclear cooling tower most people have never heard of."),
    ("2026-09-12","Week 1 — Warm","Small Wonders","RC boat vs. the ocean","Reel, 15 sec","Script 2",
     "The ocean beat our RC boat in 4 seconds. Best physics lesson we've had all year."),
    ("2026-09-13","Week 1 — Warm","Wild Places","Ocean Shores day recap","Facebook, ~3 min","Caption A",
     "Our classroom on Saturday was a beach."),
    ("2026-09-16","Week 2 — Blue Tape","Origin","THE ORIGIN REEL — Blue Tape","Reel, 60 sec, face + text","Script 3 / 3-ALT",
     "My son's teacher put blue tape around his desk before he ever walked in the door."),
    ("2026-09-16","Week 2 — Blue Tape","Origin","Blue Tape long-form — PIN THIS","Facebook, 4-5 min","Caption B",
     "They put blue tape around my son. So I built him a runway instead."),
    ("2026-09-18","Week 2 — Blue Tape","Origin","The box and the runway","Reel, 15 sec","Script 4",
     "Same kid. One year apart."),
    ("2026-09-20","Week 2 — Blue Tape","Small Wonders","Pizza dough physics (cool-down)","Facebook, ~2 min","Caption C",
     "The pizza dough started flying and the science lesson started itself."),
    ("2026-09-23","Week 3 — Finger-Guns","Cultural","THE CULTURAL REEL — Finger-Guns","Reel, 60 sec, face + text","Script 5 / 5-ALT",
     "They brought a terrorism screener into a meeting about my 9-year-old."),
    ("2026-09-23","Week 3 — Finger-Guns","Cultural","Kids used to be able to play like boys","Facebook, 4-5 min","Caption D",
     "When did play become a threat?"),
    ("2026-09-25","Week 3 — Finger-Guns","Cultural","Stop treating imagination like a threat","Reel, 15 sec","Script 6",
     "Stop treating imagination like a threat."),
    ("2026-09-27","Week 3 — Finger-Guns","Wild Places","Satsop long-form (cool-down)","Facebook, ~3 min","Caption E",
     "Two 481-foot towers 90 minutes from Tacoma that never cooled anything."),
    ("2026-09-30","Week 4 — Deliver","Runways & Wings","He distracted a Boeing engineer","Reel, 20 sec","Script 7",
     "He was labeled a distraction. Today he distracted a Boeing engineer with a good question."),
    ("2026-10-02","Week 4 — Deliver","Origin","3 things his old school took away","Reel, 30 sec","Script 8",
     "3 things his old school took away that homeschool gave back in a week."),
    ("2026-10-04","Week 4 — Deliver","Recap","One month of #MakeLifeFun","Facebook, ~3 min","Caption F",
     "Where should we take school next?"),
    ("2026-10-05","Bonus (optional)","Small Wonders","The chocolate story","Reel, 20 sec","Script 9",
     "I told his school no chocolate. They gave him chocolate. Then punished him for having energy."),
]
FILM_DAYS = [
    ("2026-09-15", "FILM: Blue Tape reel (both versions)",
     "Film tonight so you have a full night before it posts. One honest tear, once, at 0:22 — then hard cut to Noah. Film Script 3 first; if it doesn't feel right in the morning, post 3-ALT. Show Noah both. He gets a veto."),
    ("2026-09-22", "FILM: Finger-Guns / Ohio reel (both versions)",
     "Calm, not angry. Read Caption D out loud first — if any sentence sounds like a fight, cut it. Verify the exact job title on the school's paperwork before you say it. Have Reply 4 open before you post."),
]

def build_xlsx():
    wb = Workbook(); ws = wb.active; ws.title = "30-Day Calendar"
    hdr = ["Date","Day","Week","Bucket","Post","Format","Script / Caption","Hook line","Status","Notes"]
    ws.append(hdr)
    fill = PatternFill("solid", fgColor="1F3A5F")
    thin = Side(style="thin", color="D0D0D0"); bd = Border(thin,thin,thin,thin)
    for c in ws[1]:
        c.font = Font(bold=True, color="FFFFFF", size=11); c.fill = fill
        c.alignment = Alignment(horizontal="center", vertical="center"); c.border = bd
    heavy = PatternFill("solid", fgColor="FCE4E4")
    warm  = PatternFill("solid", fgColor="EAF3EA")
    for d, wk, bucket, post, fmt, script, hook in SCHEDULE:
        dt = datetime.date.fromisoformat(d)
        ws.append([dt.strftime("%b %-d, %Y"), dt.strftime("%A"), wk, bucket, post, fmt, script, hook, "Not posted", ""])
        row = ws[ws.max_row]
        for c in row:
            c.border = bd; c.alignment = Alignment(vertical="top", wrap_text=True)
            if post.startswith("THE "): c.fill = heavy
            elif wk.startswith("Week 1"): c.fill = warm
        row[4].font = Font(bold=post.startswith("THE "))
    for col, w in zip("ABCDEFGHIJ", [15,11,22,17,38,26,17,52,13,28]):
        ws.column_dimensions[col].width = w
    ws.freeze_panes = "A2"
    ws.auto_filter.ref = f"A1:J{ws.max_row}"

    ws2 = wb.create_sheet("Film Days")
    ws2.append(["Date","Day","What to film","Reminders"])
    for c in ws2[1]:
        c.font = Font(bold=True, color="FFFFFF", size=11); c.fill = fill
        c.alignment = Alignment(horizontal="center"); c.border = bd
    for d, what, note in FILM_DAYS:
        dt = datetime.date.fromisoformat(d)
        ws2.append([dt.strftime("%b %-d, %Y"), dt.strftime("%A"), what, note])
        for c in ws2[ws2.max_row]:
            c.border = bd; c.alignment = Alignment(vertical="top", wrap_text=True)
    for col, w in zip("ABCD", [15,11,42,86]):
        ws2.column_dimensions[col].width = w

    p = os.path.join(DIST, "MakeLifeFun-30-Day-Calendar.xlsx"); wb.save(p)
    print("  xlsx:", os.path.basename(p))

VTZ = """BEGIN:VTIMEZONE
TZID:America/Los_Angeles
BEGIN:DAYLIGHT
TZOFFSETFROM:-0800
TZOFFSETTO:-0700
TZNAME:PDT
DTSTART:19700308T020000
RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU
END:DAYLIGHT
BEGIN:STANDARD
TZOFFSETFROM:-0700
TZOFFSETTO:-0800
TZNAME:PST
DTSTART:19701101T020000
RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU
END:STANDARD
END:VTIMEZONE"""

def esc(s):
    return s.replace("\\","\\\\").replace(";","\;").replace(",","\\,").replace("\n","\\n")

def fold(line):
    """RFC 5545 content-line folding: max 75 octets, never split a multibyte char."""
    b = line.encode("utf-8"); out = []; limit = 74
    while len(b) > limit:
        cut = limit
        while cut > 0 and (b[cut] & 0xC0) == 0x80:   # don't split a UTF-8 sequence
            cut -= 1
        out.append(b[:cut].decode("utf-8")); b = b[cut:]; limit = 73  # 73 + leading space
    out.append(b.decode("utf-8"))
    return "\r\n ".join(out)

def build_ics():
    stamp = datetime.datetime.utcnow().strftime("%Y%m%dT%H%M%SZ")
    L = ["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//MakeLifeFun//30-Day Plan//EN",
         "CALSCALE:GREGORIAN","METHOD:PUBLISH","X-WR-CALNAME:#MakeLifeFun — 30-Day Plan",
         "X-WR-TIMEZONE:America/Los_Angeles"] + VTZ.split("\n")
    n = 0
    def ev(date, hhmm, dur_min, summary, desc):
        nonlocal n; n += 1
        d = date.replace("-","")
        start = f"{d}T{hhmm}00"
        endt = (datetime.datetime.strptime(start,"%Y%m%dT%H%M%S") +
                datetime.timedelta(minutes=dur_min)).strftime("%Y%m%dT%H%M%S")
        L.extend(["BEGIN:VEVENT", f"UID:mlf-{n}-{d}@makelifefun.local", f"DTSTAMP:{stamp}",
                  f"DTSTART;TZID=America/Los_Angeles:{start}",
                  f"DTEND;TZID=America/Los_Angeles:{endt}",
                  fold("SUMMARY:" + esc(summary)), fold("DESCRIPTION:" + esc(desc)),
                  "BEGIN:VALARM","TRIGGER:-PT60M","ACTION:DISPLAY",
                  fold("DESCRIPTION:" + esc(summary)),"END:VALARM","END:VEVENT"])
    for d, wk, bucket, post, fmt, script, hook in SCHEDULE:
        ev(d, "1700", 30, f"POST: {post}",
           f"{wk} · {bucket}\n{fmt}\nUse: {script}\n\nHook: {hook}\n\n"
           "Text overlay on the hook line is mandatory — 85% watch on mute.\n"
           "Reply bank open BEFORE you post. Answer once, never twice.")
    for d, what, note in FILM_DAYS:
        ev(d, "1800", 90, what, note)
    ev("2026-09-15","1930",20,"Show Noah both Blue Tape versions",
       "He gets a veto. No reason required from him, no negotiating from you.")
    ev("2026-09-22","1930",20,"Show Noah both Finger-Guns versions",
       "He gets a veto. His face appears in the redemption half only.")
    L.append("END:VCALENDAR")
    p = os.path.join(DIST, "MakeLifeFun-30-Day-Plan.ics")
    out = "\r\n".join(fold(x) if len(x.encode()) > 75 else x for x in L) + "\r\n"
    open(p, "w", newline="", encoding="utf-8").write(out)
    print("  ics: ", os.path.basename(p))

if __name__ == "__main__":
    print("Building #MakeLifeFun deliverables...")
    for src, out, title in [
        ("30-day-plan.md","MakeLifeFun-30-Day-Plan.docx","The Locked 30-Day Plan"),
        ("reel-scripts.md","MakeLifeFun-Reel-Scripts.docx","Reel Scripts — All 9 + Fallbacks"),
        ("facebook-captions.md","MakeLifeFun-Facebook-Captions.docx","Facebook Long-Form Captions"),
        ("comment-replies.md","MakeLifeFun-Comment-Reply-Bank.docx","Comment Reply Bank"),
    ]:
        md_to_docx(os.path.join(PLAN, src), os.path.join(DIST, out), title)
    build_xlsx(); build_ics()
    print("Done ->", DIST)
