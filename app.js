/* ===================================================================
   Starting players. The full 380-game EPL fixture list lives in
   fixtures.js (loaded before this file) and is written into Firestore
   by seedIfNeeded() below.
   =================================================================== */
const PLAYERS = ["Solar", "DKC", "Dere", "Ermo", "Costa", "Mab"];

/* =====================================================================
   EPL Predictor — app logic (plain JavaScript)

   Screens (Fixtures / Table / Opta Stats / Manage) all live in this one
   file. Data is stored in Firebase (Firestore) so every phone shares the
   same leaderboard. No build step — just files a browser opens.
   ===================================================================== */

/* ---- scoring rules (change these if you want) ---- */
const POINTS = { EXACT: 20, RESULT: 15, MISS: 0 };

/* ---- competition (EPL only) ---- */
const COMPS = {
  EPL: { name: "Premier League", short: "EPL", logo: "🦁", weekWord: "Week" },
};

/* ---- manage PIN ----
   Change the number below to update the PIN. */
const MANAGE_PIN = "1122";
let manageUnlocked = false;

/* ---- frozen games ----
   Match IDs listed here are FROZEN: locked from predictions and NOT counted
   in the leaderboard. Empty for now — add IDs to freeze games. */
const EXCLUDED_MATCH_IDS = [];
function isExcluded(m) {
  return EXCLUDED_MATCH_IDS.includes(m.id);
}

/* ---- player avatars (coloured initials, generated from the name) ---- */
const AVATAR_COLORS = [
  "#2563eb", "#7c3aed", "#db2777", "#ea580c", "#0891b2",
  "#ca8a04", "#dc2626", "#4f46e5", "#0d9488", "#9333ea",
];
function avatarColor(name) {
  let h = 0;
  for (const ch of String(name)) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
}
function initials(name) {
  return String(name).trim().slice(0, 2).toUpperCase();
}

/* ---- player jerseys (home kits) ----
   body / sleeve / trim colors per player. Add new players here;
   anyone not listed gets a generic jersey in their avatar color. */
const KITS = {
  chelsea:       { body: "#034694", sleeve: "#034694", trim: "#ffffff" },
  manutd:        { body: "#DA291C", sleeve: "#DA291C", trim: "#ffffff" },
  arsenal:       { body: "#EF0107", sleeve: "#ffffff", trim: "#ffffff" },
  arsenal_away:  { body: "#FFDD00", sleeve: "#FFDD00", trim: "#023474" }, // yellow / navy
  manutd_away:   { body: "#f8f8f8", sleeve: "#f8f8f8", trim: "#DA291C" }, // white / red
  manutd_away2:  { body: "#1a1a1a", sleeve: "#1a1a1a", trim: "#DA291C" }, // black / red
};
const PLAYER_KITS = {
  costa: KITS.chelsea,
  dere: KITS.manutd_away2,
  dkc: KITS.arsenal,
  ermo: KITS.arsenal_away,
  ermi: KITS.arsenal_away,
  mab: KITS.manutd_away,
  solar: KITS.manutd,
};
function kitFor(name) {
  const k = PLAYER_KITS[String(name).trim().toLowerCase()];
  if (k) return k;
  const c = avatarColor(name);
  return { body: c, sleeve: c, trim: "#ffffff" };
}
function jerseyHTML(name) {
  const k = kitFor(name);
  return `<svg class="jersey" viewBox="0 0 64 64" aria-hidden="true">
    <path d="M42 7 L56 13 L62 27 L51 31 L48 24 L48 56 L16 56 L16 24 L13 31 L2 27 L8 13 L22 7 C24 13 40 13 42 7 Z"
      fill="${k.body}" stroke="#1e293b" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M8 13 L2 27 L13 31 L17 18 Z" fill="${k.sleeve}" stroke="#1e293b" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M56 13 L62 27 L51 31 L47 18 Z" fill="${k.sleeve}" stroke="#1e293b" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M22 7 C24 13 40 13 42 7 L38 5.5 C35.5 9.5 28.5 9.5 26 5.5 Z" fill="${k.trim}" stroke="#1e293b" stroke-width="2" stroke-linejoin="round"/>
    <text x="32" y="42" text-anchor="middle" font-size="14" font-weight="800"
      fill="${k.trim}" stroke="none">${esc(initials(name))}</text>
  </svg>`;
}

/* ---- connect to the database ---- */
const keysMissing =
  !firebaseConfig || !firebaseConfig.apiKey || firebaseConfig.apiKey.includes("YOUR_") ||
  !firebaseConfig.projectId || firebaseConfig.projectId.includes("YOUR_");

let dbf = null;
if (!keysMissing) {
  firebase.initializeApp(firebaseConfig);
  dbf = firebase.firestore();
}

/* ---- app state ---- */
let players = [];      // [{id, name}]
let matches = [];      // every game added so far
let predictions = [];  // every prediction by everyone
let openWeeks = new Set(); // "comp|week" keys the admin has opened for picks
let tab = "fixtures";
let manageTab = "results";
let myId = localStorage.getItem("plucl_player_id");
let myName = localStorage.getItem("plucl_player_name");

const screen = document.getElementById("screen");

/* ---- small helpers ---- */
const sign = (h, a) => (h > a ? 1 : h < a ? -1 : 0);

function scorePrediction(ph, pa, ah, aa) {
  if (ph === ah && pa === aa) return { pts: POINTS.EXACT, kind: "exact" };
  if (sign(ph, pa) === sign(ah, aa)) return { pts: POINTS.RESULT, kind: "result" };
  return { pts: POINTS.MISS, kind: "miss" };
}

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
  );
}

function compOf(m) {
  return COMPS[m.comp] || COMPS.EPL;
}

// "Premier League · Week 1"
function weekTitle(m) {
  const c = compOf(m);
  return `${c.name} · ${c.weekWord} ${m.week}`;
}

// short label for a single row, e.g. "EPL · Wk 1"
function shortLabel(m) {
  const c = compOf(m);
  return `${c.short} · ${c.weekWord === "Week" ? "Wk" : "MD"} ${m.week}`;
}

/* ---- group any list of matches into comp+week sections, in fixture order ---- */
function sectionsOf(list) {
  const map = new Map();
  for (const m of list) {
    const key = `${m.comp}|${m.week}`;
    if (!map.has(key)) map.set(key, { title: weekTitle(m), comp: m.comp, week: m.week, min: m.ordering, list: [] });
    const s = map.get(key);
    s.list.push(m);
    if (m.ordering < s.min) s.min = m.ordering;
  }
  // sort by week number so a game moved to another week files in correctly
  return [...map.values()].sort((a, b) => a.week - b.week || a.min - b.min);
}

/* ---- week filter (Fixtures + Manage) ----
   The season is 38 weeks × 10 games, so screens show one week at a
   time. Default: the first week that still has an unfinished game. */
let weekFilter = null; // null = auto, "all" = everything, or a week number

function currentWeek() {
  const open = matches.filter((m) => !m.finished);
  if (open.length === 0) return matches.length ? Math.max(...matches.map((m) => m.week)) : 1;
  return Math.min(...open.map((m) => m.week));
}

function activeWeek() {
  return weekFilter === null ? currentWeek() : weekFilter;
}

function visibleMatches() {
  const w = activeWeek();
  return w === "all" ? matches : matches.filter((m) => m.week === w);
}

function weekSelectHTML() {
  const w = activeWeek();
  const maxWeek = matches.length ? Math.max(...matches.map((m) => m.week)) : 38;
  let opts = `<option value="all" ${w === "all" ? "selected" : ""}>All weeks</option>`;
  for (let n = 1; n <= maxWeek; n++) {
    opts += `<option value="${n}" ${w === n ? "selected" : ""}>Week ${n}</option>`;
  }
  return `<div class="card weekbar">
    <span class="weekbar-label">Gameweek</span>
    <select class="select" style="margin:0;flex:1" onchange="setWeek(this.value)">${opts}</select>
  </div>`;
}

window.setWeek = (v) => {
  weekFilter = v === "all" ? "all" : Math.max(1, Math.trunc(Number(v)) || 1);
  render();
};

/* ---- prediction deadline ----
   A match has an optional `kickoff` (an ISO timestamp). Once that moment
   passes, predictions for it are closed — no new picks can be entered.
   Times are stored in UTC so they're correct for everyone, wherever they are. */
function isClosed(m) {
  return !!m.kickoff && new Date(m.kickoff).getTime() <= Date.now();
}

/* ---- week activation ----
   Every week starts CLOSED for predictions, even when its games are
   visible. The admin opens a week from Manage → Deadlines; the list of
   open weeks lives in Firestore (meta/openWeeks) so everyone sees it. */
const weekKey = (comp, week) => `${comp}|${week}`;
function isWeekOpen(m) {
  return openWeeks.has(weekKey(m.comp, m.week));
}

// ISO (UTC) -> value for a <input type="datetime-local"> in the viewer's local time
function toLocalInput(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`;
}

// short, friendly kickoff label, e.g. "Aug 21, 8:00 PM"
function kickoffLabel(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleString([], {
    month: "short", day: "numeric", hour: "numeric", minute: "2-digit",
  });
}

/* =====================================================================
   LOAD DATA  (and seed the games into Firestore on the very first run)
   ===================================================================== */
function slug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "player";
}

/* Version-based seeding. Bump SEED_VERSION when the FIXTURES list in
   fixtures.js changes in a big way: the app then wipes old matches
   (and old predictions, which point at the old game IDs) and writes
   the fresh list. Results/edits you make in Manage are per-match-doc
   updates and are untouched between version bumps. */
const SEED_VERSION = 2; // v2 = UCL removed, all 380 EPL games added

async function seedIfNeeded() {
  const metaRef = dbf.collection("meta").doc("seed");
  const meta = await metaRef.get();
  if (meta.exists && (meta.data().version || 0) >= SEED_VERSION) return;

  // wipe old matches + predictions (IDs change between versions)
  const [oldM, oldP] = await Promise.all([
    dbf.collection("matches").get(),
    dbf.collection("predictions").get(),
  ]);
  const stale = [...oldM.docs, ...oldP.docs];
  while (stale.length) {
    const b = dbf.batch();
    for (const d of stale.splice(0, 400)) b.delete(d.ref);
    await b.commit();
  }

  // write the full fixture list in chunks (Firestore batch limit is 500)
  const queue = [...FIXTURES];
  while (queue.length) {
    const b = dbf.batch();
    for (const f of queue.splice(0, 400)) {
      b.set(dbf.collection("matches").doc(String(f.id)),
        { ...f, home_score: null, away_score: null, finished: false });
    }
    await b.commit();
  }

  const b = dbf.batch();
  for (const name of PLAYERS) {
    b.set(dbf.collection("players").doc(slug(name)), { name }, { merge: true });
  }
  b.set(metaRef, { version: SEED_VERSION });
  await b.commit();
}

async function load() {
  if (!dbf) return;
  await seedIfNeeded();
  const [pSnap, mSnap, prSnap, owSnap] = await Promise.all([
    dbf.collection("players").get(),
    dbf.collection("matches").get(),
    dbf.collection("predictions").get(),
    dbf.collection("meta").doc("openWeeks").get(),
  ]);
  players = pSnap.docs.map((d) => ({ id: d.id, name: d.data().name }));
  players.sort((a, b) => a.name.localeCompare(b.name));
  matches = mSnap.docs.map((d) => d.data());
  matches.sort((a, b) => a.ordering - b.ordering);
  predictions = prSnap.docs.map((d) => d.data());
  openWeeks = new Set(owSnap.exists ? owSnap.data().keys || [] : []);
}

/* =====================================================================
   RENDER — picks which screen to draw
   ===================================================================== */
function render() {
  if (keysMissing) { renderSetup(); return; }
  // the Table screen gets a black background; everything else stays white
  screen.classList.toggle("dark", tab === "leaderboard");
  if (tab === "fixtures") renderFixtures();
  else if (tab === "leaderboard") renderLeaderboard();
  else if (tab === "stats") renderStats();
  else if (tab === "manage") {
    if (!manageUnlocked) renderPinGate();
    else renderManage();
  }
}

function renderSetup() {
  screen.innerHTML = `
    <div class="setup">
      <b>Almost there — connect your database.</b>
      <p>Open <code>config.js</code> and paste your Firebase web-app config
      (apiKey, projectId, etc.). See the README for the setup steps.</p>
    </div>`;
}

/* ---------------------------------------------------------------------
   FIXTURES
   ------------------------------------------------------------------- */
function myPredFor(matchId) {
  return predictions.find((p) => p.player_id === myId && p.match_id === matchId);
}

function playerBarHTML() {
  if (myId && myName) {
    return `<div class="card playerbar">
      <div>Predicting as <b>${esc(myName)}</b></div>
      <button class="link" onclick="clearPlayer()">switch</button>
    </div>`;
  }
  const chips = players
    .map((p) => `<button class="chip" onclick="selectPlayer('${p.id}','${esc(p.name)}')">${esc(p.name)}</button>`)
    .join("");
  return `<div class="card">
    <div style="font-weight:700;font-size:14px;margin-bottom:2px">Who are you?</div>
    <div class="chips">${chips}
      <button class="chip dashed" onclick="addPlayer()">+ new</button>
    </div>
  </div>`;
}

function matchRowHTML(m) {
  const isTbd = m.home_team === "TBD" || m.away_team === "TBD";
  const mine = myPredFor(m.id);
  const closed = isClosed(m); // past its kickoff/deadline
  const frozen = isExcluded(m); // not counted in the leaderboard
  const notOpen = !isWeekOpen(m); // week not activated by the admin yet
  const locked = m.finished || isTbd || !!mine || closed || frozen || notOpen;

  const result = m.finished
    ? `<div class="result"><div>${m.home_score}</div><div>${m.away_score}</div></div>`
    : "";

  const hVal = mine ? mine.home_score : "";
  const aVal = mine ? mine.away_score : "";
  const dis = locked || !myId ? "disabled" : "";

  // footer message
  let foot = "";
  if (frozen) {
    foot = `<span class="locked">frozen · not counted</span>`;
  } else if (m.finished && mine) {
    const s = scorePrediction(mine.home_score, mine.away_score, m.home_score, m.away_score);
    const cls = s.kind === "exact" ? "pts-exact" : s.kind === "result" ? "pts-result" : "pts-miss";
    const label = s.kind === "exact" ? "Exact" : s.kind === "result" ? "Result" : "Miss";
    foot = `<span class="${cls}">${label} +${s.pts}</span>`;
  } else if (isTbd) {
    foot = `<span class="foot-left">teams TBD</span>`;
  } else if (!myId) {
    foot = `<span class="foot-left">pick who you are ↑</span>`;
  } else if (mine) {
    foot = `<span class="locked">locked 🔒</span>`;
  } else if (closed) {
    foot = `<span class="locked">picks closed 🔒</span>`;
  } else if (notOpen) {
    foot = `<span class="locked">predictions not open yet 🔒</span>`;
  } else {
    foot = `<button class="link" onclick="savePick(${m.id})">lock in pick</button>`;
  }

  // show the deadline on the left when one is set and the game isn't done
  const kickoff = m.kickoff && !m.finished && !frozen
    ? ` · ${closed ? "closed" : "closes"} ${kickoffLabel(m.kickoff)}`
    : "";

  const pill = `<span class="pill epl">${compOf(m).short}</span>`;
  const left = pill + " " + shortLabel(m) +
    (m.slot_label ? ` · ${esc(m.slot_label)}` : "") + kickoff;

  return `<div class="card${frozen ? " frozen" : ""}">
    <div class="match">
      <div class="teams">
        <div class="team"><span>${m.home_flag}</span><span class="name">${esc(m.home_team)}</span></div>
        <div class="team"><span>${m.away_flag}</span><span class="name">${esc(m.away_team)}</span></div>
      </div>
      ${result}
      <div class="scorebox">
        <input type="number" min="0" max="99" id="h-${m.id}" value="${hVal}" ${dis}>
        <input type="number" min="0" max="99" id="a-${m.id}" value="${aVal}" ${dis}>
      </div>
    </div>
    <div class="match-foot"><span class="foot-left">${left}</span><span id="foot-${m.id}">${foot}</span></div>
  </div>`;
}

function renderFixtures() {
  document.getElementById("header-stage").textContent = "FIXTURES";
  const sections = sectionsOf(visibleMatches());

  const body = sections.length
    ? sections
        .map(
          (s) =>
            `<div class="section-title">${s.title}</div>` +
            s.list.map(matchRowHTML).join("")
        )
        .join("")
    : `<p class="note">No games in this week — pick another week, or add games in Manage → Games.</p>`;

  screen.innerHTML = playerBarHTML() + weekSelectHTML() + body;
}

/* ---------------------------------------------------------------------
   LEADERBOARD — Exact·Result / Games / Total columns
   ------------------------------------------------------------------- */
function buildLeaderboard() {
  const finished = new Map(
    matches
      .filter((m) => m.finished && !isExcluded(m) && m.home_score != null && m.away_score != null)
      .map((m) => [m.id, m])
  );
  const rows = new Map();
  for (const p of players) rows.set(p.id, {
    name: p.name,
    points: 0, exact: 0, results: 0, scored: 0,
  });

  for (const pr of predictions) {
    const m = finished.get(pr.match_id);
    const row = rows.get(pr.player_id);
    if (!m || !row) continue;
    row.scored++;
    const s = scorePrediction(pr.home_score, pr.away_score, m.home_score, m.away_score);
    row.points += s.pts;
    if (s.kind === "exact") row.exact++;
    else if (s.kind === "result") row.results++;
  }
  return [...rows.values()].sort(
    (a, b) => b.points - a.points || b.exact - a.exact || a.name.localeCompare(b.name)
  );
}

function renderLeaderboard() {
  document.getElementById("header-stage").textContent = "TABLE";
  const rows = buildLeaderboard();
  const n = rows.length;
  const medals = ["🥇", "🥈", "🥉"];

  const rowHTML = (r, i) => {
    const leader = i === 0;
    const last = n >= 4 && i === n - 1;
    const badge = i < medals.length ? medals[i] : String(i + 1);
    return `<div class="card lb-row ${leader ? "leader" : ""} ${last ? "last" : ""}">
      <div class="lb-rank ${i >= medals.length ? "num" : ""}" title="Rank ${i + 1}">${badge}</div>
      ${jerseyHTML(r.name)}
      <div class="lb-main">
        <span class="lb-name">${esc(r.name)}</span>
        <span class="lb-sub">${r.exact} exact · ${r.results} results</span>
      </div>
      ${leader ? `<span class="lb-deco d1">🎉</span><span class="lb-deco d2">🎊</span><span class="lb-deco d3">✨</span><span class="lb-deco d4">🎈</span><span class="lb-king">👑</span>` : ""}
      ${last ? `<span class="lb-clown">🤡</span>` : ""}
      <div class="lb-total"><span>TOT</span>${r.points}</div>
    </div>`;
  };

  let body;
  if (n === 0) {
    body = `<p class="note">No players yet. Add yourself on the Fixtures tab.</p>`;
  } else {
    // tiers: 1 = VIP/PRO · 2-3 = TOP · middle = MID TABLE · last = QIX
    const parts = [];
    parts.push(`<div class="lb-tier">👑 VIP / PRO</div>`, rowHTML(rows[0], 0));
    if (n > 1) {
      parts.push(`<div class="lb-tier">TOP</div>`);
      rows.slice(1, 3).forEach((r, k) => parts.push(rowHTML(r, k + 1)));
    }
    const midEnd = n >= 4 ? n - 1 : n;
    if (midEnd > 3) {
      parts.push(`<div class="lb-tier">MID TABLE</div>`);
      rows.slice(3, midEnd).forEach((r, k) => parts.push(rowHTML(r, k + 3)));
    }
    if (n >= 4) {
      parts.push(`<div class="lb-tier">QIX</div>`, rowHTML(rows[n - 1], n - 1));
    }
    body = parts.join("");
  }

  screen.innerHTML = `<div class="big-title">Leaderboard</div>` + body;
}

/* ---------------------------------------------------------------------
   OPTA STATS — per-player analytics (exact / result / miss breakdown)
   ------------------------------------------------------------------- */
function renderStats() {
  document.getElementById("header-stage").textContent = "OPTA STATS";
  const rows = buildLeaderboard();
  const scoredGames = matches.filter(
    (m) => m.finished && !isExcluded(m) && m.home_score != null && m.away_score != null
  ).length;

  const pct = (n, d) => (d > 0 ? Math.round((n / d) * 100) : 0);
  const w = (n, d) => (d > 0 ? (n / d) * 100 : 0);

  const cards =
    rows.length === 0
      ? `<p class="note">No players yet. Add yourself on the Fixtures tab.</p>`
      : rows
          .map((r) => {
            const miss = r.scored - r.exact - r.results;
            const acc = pct(r.exact + r.results, r.scored);          // % of picks that scored
            const ppg = r.scored > 0 ? (r.points / r.scored).toFixed(1) : "0.0";
            const bar = r.scored > 0
              ? `<div class="stat-bar">
                   <div class="seg-exact" style="width:${w(r.exact, r.scored)}%"></div>
                   <div class="seg-result" style="width:${w(r.results, r.scored)}%"></div>
                   <div class="seg-miss" style="width:${w(miss, r.scored)}%"></div>
                 </div>`
              : `<div class="stat-bar"></div>`;
            return `<div class="card stat-row">
              <div class="stat-head">
                ${jerseyHTML(r.name)}
                <div class="n">${esc(r.name)}</div>
                <div class="pts">${r.points} <small>PTS</small></div>
              </div>
              ${bar}
              <div class="legend">
                <span><span class="dot" style="background:var(--accent)"></span>Exact ${r.exact}</span>
                <span><span class="dot" style="background:var(--gold)"></span>Result ${r.results}</span>
                <span><span class="dot" style="background:#cbd5e1"></span>Miss ${miss}</span>
              </div>
              <div class="stat-grid">
                <div class="stat-cell exact"><div class="v">${pct(r.exact, r.scored)}%</div><div class="l">Exact rate</div></div>
                <div class="stat-cell result"><div class="v">${acc}%</div><div class="l">Hit rate</div></div>
                <div class="stat-cell"><div class="v">${ppg}</div><div class="l">Pts / game</div></div>
                <div class="stat-cell"><div class="v">${r.scored}</div><div class="l">Games</div></div>
              </div>
            </div>`;
          })
          .join("");

  screen.innerHTML = `
    <div><span class="opta-title">📊 OPTA STATS</span></div>
    <p class="note">${scoredGames} game${scoredGames === 1 ? "" : "s"} scored so far. Exact rate = perfect scorelines; hit rate = exact + correct results.</p>
    ${cards}`;
}

/* ---------------------------------------------------------------------
   MANAGE  (results / deadlines / games / predictions) — PIN-gated.
   ------------------------------------------------------------------- */
let backfillPlayerId = null;

function renderManage() {
  document.getElementById("header-stage").textContent = "MANAGE";
  if (!backfillPlayerId && players[0]) backfillPlayerId = players[0].id;

  const tabs = `
    <div class="tabs">
      <button class="tab ${manageTab === "results" ? "active" : ""}" onclick="setManageTab('results')">Results</button>
      <button class="tab ${manageTab === "deadlines" ? "active" : ""}" onclick="setManageTab('deadlines')">Deadlines</button>
      <button class="tab ${manageTab === "games" ? "active" : ""}" onclick="setManageTab('games')">Games</button>
      <button class="tab ${manageTab === "backfill" ? "active" : ""}" onclick="setManageTab('backfill')">Predictions</button>
    </div>`;

  let body = "";
  const playable = visibleMatches().filter((m) => m.home_team !== "TBD" && m.away_team !== "TBD");

  if (manageTab === "results") {
    body =
      `<p class="note">Enter the final score of any game (including ones already played). Saving locks the game and updates the leaderboard.</p>` +
      playable.map(resultRowHTML).join("");
  } else if (manageTab === "deadlines") {
    body =
      `<p class="note">Every week starts <b>closed</b> — players can see the games but can't predict until you open the week with its toggle. You can also set per-game kickoff deadlines, or hit <b>Close now</b> to lock a game immediately.</p>` +
      deadlinesBody(playable);
  } else if (manageTab === "games") {
    body = gamesBody();
  } else {
    const opts = players
      .map((p) => `<option value="${p.id}" ${p.id === backfillPlayerId ? "selected" : ""}>${esc(p.name)}</option>`)
      .join("");
    body =
      `<p class="note">Enter past predictions for someone. Pick the player, then fill in their scores.</p>
       <select class="select" onchange="setBackfillPlayer(this.value)">${opts}</select>` +
      playable.map(backfillRowHTML).join("");
  }

  screen.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:2px">
      <div class="big-title" style="font-size:22px;margin:0">Manage</div>
      <button class="btn ghost sm" onclick="lockManage()">🔒 Lock</button>
    </div>
    ${weekSelectHTML()}${tabs}${body}`;
}

function manageLabel(m) {
  return shortLabel(m) + (m.slot_label ? ` · ${esc(m.slot_label)}` : "");
}

function resultRowHTML(m) {
  return `<div class="card">
    <div class="row-label">${manageLabel(m)}${m.finished ? " · scored ✓" : ""}</div>
    <div class="row-mini">
      <div class="grow">${m.home_flag} ${esc(m.home_team)} <span class="muted">v</span> ${m.away_flag} ${esc(m.away_team)}</div>
      <input type="number" min="0" max="99" id="rh-${m.id}" value="${m.home_score ?? ""}" style="width:42px;height:34px;text-align:center;border:1px solid var(--line);border-radius:8px;font-weight:700">
      <input type="number" min="0" max="99" id="ra-${m.id}" value="${m.away_score ?? ""}" style="width:42px;height:34px;text-align:center;border:1px solid var(--line);border-radius:8px;font-weight:700">
      <button class="btn sm" onclick="setResult(${m.id})">${m.finished ? "Update" : "Set"}</button>
      ${m.finished ? `<button class="btn ghost sm" onclick="clearResult(${m.id})">Clear</button>` : ""}
    </div>
  </div>`;
}

/* ---- Deadlines tab: group games into weeks, each with an Open-picks
   toggle (weeks start closed) and a bulk "Close all now" ---- */
function deadlinesBody(playable) {
  return sectionsOf(playable)
    .map((s) => {
      const weekOpen = openWeeks.has(weekKey(s.comp, s.week));
      const toggle = weekOpen
        ? `<button class="btn sm" onclick="toggleWeekOpen('${s.comp}', ${s.week})">🔓 Picks OPEN — close</button>`
        : `<button class="btn ghost sm" onclick="toggleWeekOpen('${s.comp}', ${s.week})">🔒 Picks closed — open</button>`;
      const anyOpen = s.list.some((m) => !m.finished && !isClosed(m));
      const btn = anyOpen && weekOpen
        ? `<button class="btn ghost sm" onclick="closeWeek('${s.comp}', ${s.week})">Close all now</button>`
        : "";
      return `<div style="display:flex;align-items:center;justify-content:space-between;gap:6px;margin:16px 4px 6px">
          <span class="section-title" style="margin:0">${s.title}</span>
          <span style="display:flex;gap:6px">${toggle}${btn}</span>
        </div>` + s.list.map(deadlineRowHTML).join("");
    })
    .join("");
}

function deadlineRowHTML(m) {
  const closed = isClosed(m);
  let status = "";
  if (m.finished) status = " · finished";
  else if (closed) status = ` · closed ${kickoffLabel(m.kickoff)}`;
  else if (m.kickoff) status = ` · closes ${kickoffLabel(m.kickoff)}`;

  if (m.finished) {
    return `<div class="card">
      <div class="row-label">${manageLabel(m)}${status}</div>
      <div class="grow" style="font-size:14px;font-weight:600">${m.home_flag} ${esc(m.home_team)} <span class="muted">v</span> ${m.away_flag} ${esc(m.away_team)}</div>
    </div>`;
  }
  return `<div class="card">
    <div class="row-label">${manageLabel(m)}${status}</div>
    <div class="grow" style="font-size:14px;font-weight:600;margin-bottom:6px">${m.home_flag} ${esc(m.home_team)} <span class="muted">v</span> ${m.away_flag} ${esc(m.away_team)}</div>
    <div class="row-mini">
      <input type="datetime-local" id="dl-${m.id}" value="${toLocalInput(m.kickoff)}" style="flex:1;border:1px solid var(--line);border-radius:8px;padding:7px;font-size:13px">
      <button class="btn sm" onclick="setKickoff(${m.id})">Set</button>
      <button class="btn ghost sm" onclick="closeNow(${m.id})">Close now</button>
      ${m.kickoff ? `<button class="btn ghost sm" onclick="clearKickoff(${m.id})">✕</button>` : ""}
    </div>
  </div>`;
}

/* ---- Games tab: edit / move / delete any game, or add extra ones ---- */
function gamesBody() {
  const w = activeWeek();
  const defWeek = w === "all" ? 1 : w;
  const addForm = `
    <p class="note">All 380 games are pre-loaded. Move a game to a different week by changing its week number and hitting Save; delete a game with 🗑. You can also add an extra game below — set the badge emojis (optional), teams, week number, and an optional kickoff/deadline.</p>
    <div class="card">
      <div class="row-label">Add a game</div>
      <div class="add-grid">
        <span class="muted" style="align-self:center;font-size:12px;font-weight:700">Week #</span>
        <input type="number" min="1" max="99" id="ag-week" value="${defWeek}" placeholder="Week #" title="Week number">
      </div>
      <div class="ko-grid" style="margin-top:6px">
        <input class="flag" id="ag-hf" placeholder="🔴">
        <input id="ag-ht" placeholder="Home team">
        <input class="flag" id="ag-af" placeholder="🔵">
        <input id="ag-at" placeholder="Away team">
      </div>
      <input type="datetime-local" id="ag-ko" style="width:100%;margin-top:6px;border:1px solid var(--line);border-radius:8px;padding:7px;font-size:13px" title="Kickoff / picks deadline (optional)">
      <button class="btn block sm" style="margin-top:8px" onclick="addGame()">+ Add game</button>
    </div>`;

  const list = sectionsOf(visibleMatches())
    .map(
      (s) =>
        `<div class="section-title">${s.title}</div>` +
        s.list.map(gameEditRowHTML).join("")
    )
    .join("");

  return addForm + list;
}

function gameEditRowHTML(m) {
  const ht = m.home_team === "TBD" ? "" : esc(m.home_team);
  const at = m.away_team === "TBD" ? "" : esc(m.away_team);
  return `<div class="card">
    <div class="row-label">${manageLabel(m)}${m.finished ? " · scored ✓" : ""}</div>
    <div class="ko-grid">
      <input class="flag" id="ehf-${m.id}" value="${m.home_flag}" placeholder="🏳️">
      <input id="eht-${m.id}" value="${ht}" placeholder="Home team">
      <input class="flag" id="eaf-${m.id}" value="${m.away_flag}" placeholder="🏳️">
      <input id="eat-${m.id}" value="${at}" placeholder="Away team">
    </div>
    <div class="row-mini" style="margin-top:8px">
      <span class="muted" style="font-size:12px">Wk</span>
      <input type="number" min="1" max="99" id="ew-${m.id}" value="${m.week}" style="width:52px;height:34px;text-align:center;border:1px solid var(--line);border-radius:8px;font-weight:700">
      <button class="btn sm grow" onclick="saveGame(${m.id})">Save</button>
      <button class="btn ghost sm" onclick="deleteGame(${m.id})">🗑 Delete</button>
    </div>
  </div>`;
}

function backfillRowHTML(m) {
  const mine = predictions.find((p) => p.player_id === backfillPlayerId && p.match_id === m.id);
  return `<div class="card">
    <div class="row-label">${manageLabel(m)}${m.finished ? ` · result ${m.home_score}-${m.away_score}` : ""}</div>
    <div class="row-mini">
      <div class="grow">${m.home_flag} ${esc(m.home_team)} <span class="muted">v</span> ${m.away_flag} ${esc(m.away_team)}</div>
      <input type="number" min="0" max="99" id="bh-${m.id}" value="${mine ? mine.home_score : ""}" style="width:42px;height:34px;text-align:center;border:1px solid var(--line);border-radius:8px;font-weight:700">
      <input type="number" min="0" max="99" id="ba-${m.id}" value="${mine ? mine.away_score : ""}" style="width:42px;height:34px;text-align:center;border:1px solid var(--line);border-radius:8px;font-weight:700">
      <button class="btn sm" onclick="saveBackfill(${m.id})">Save</button>
      ${mine ? `<button class="btn ghost sm" onclick="clearBackfill(${m.id})">✕</button>` : ""}
    </div>
  </div>`;
}

/* =====================================================================
   ACTIONS (write to the database, then reload + redraw)
   ===================================================================== */
function num(id) {
  const v = document.getElementById(id).value;
  if (v === "") return null;
  const n = Math.trunc(Number(v));
  return Number.isFinite(n) && n >= 0 && n <= 99 ? n : null;
}

async function refresh() { await load(); render(); }

window.selectPlayer = (id, name) => {
  myId = id; myName = name;
  localStorage.setItem("plucl_player_id", id);
  localStorage.setItem("plucl_player_name", name);
  render();
};

window.clearPlayer = () => {
  myId = null; myName = null;
  localStorage.removeItem("plucl_player_id");
  localStorage.removeItem("plucl_player_name");
  render();
};

window.addPlayer = async () => {
  const name = prompt("Your name?");
  if (!name || !name.trim()) return;
  const clean = name.trim();
  const id = slug(clean);
  try {
    const ref = dbf.collection("players").doc(id);
    const snap = await ref.get();
    if (snap.exists) { alert("That name is taken."); return; }
    await ref.set({ name: clean });
    await load();
    selectPlayer(id, clean);
  } catch (e) { alert(e.message); }
};

window.savePick = async (matchId) => {
  const h = num(`h-${matchId}`), a = num(`a-${matchId}`);
  if (h === null || a === null) { document.getElementById(`foot-${matchId}`).innerHTML = '<span class="pts-miss">enter both</span>'; return; }
  const m = matches.find((x) => x.id === matchId);
  if (m && (isClosed(m) || isExcluded(m) || !isWeekOpen(m))) { // deadline passed, frozen, or week not opened — refuse
    await refresh();
    return;
  }
  try {
    const ref = dbf.collection("predictions").doc(`${myId}_${matchId}`);
    const snap = await ref.get();
    if (snap.exists) { await refresh(); return; } // already locked
    await ref.set({ player_id: myId, match_id: matchId, home_score: h, away_score: a });
    await refresh();
  } catch (e) { alert(e.message); }
};

window.setResult = async (matchId) => {
  const h = num(`rh-${matchId}`), a = num(`ra-${matchId}`);
  if (h === null || a === null) { alert("Enter both scores (0–99)"); return; }
  try {
    await dbf.collection("matches").doc(String(matchId)).update({ home_score: h, away_score: a, finished: true });
    await refresh();
  } catch (e) { alert(e.message); }
};

window.clearResult = async (matchId) => {
  try {
    await dbf.collection("matches").doc(String(matchId)).update({ home_score: null, away_score: null, finished: false });
    await refresh();
  } catch (e) { alert(e.message); }
};

// ---- Prediction deadlines ----
window.setKickoff = async (matchId) => {
  const v = document.getElementById(`dl-${matchId}`).value; // local datetime
  if (!v) { alert("Pick a date and time first."); return; }
  const iso = new Date(v).toISOString(); // store as UTC so it's correct for everyone
  try {
    await dbf.collection("matches").doc(String(matchId)).update({ kickoff: iso });
    await refresh();
  } catch (e) { alert(e.message); }
};

window.closeNow = async (matchId) => {
  try {
    await dbf.collection("matches").doc(String(matchId)).update({ kickoff: new Date().toISOString() });
    await refresh();
  } catch (e) { alert(e.message); }
};

window.clearKickoff = async (matchId) => {
  try {
    await dbf.collection("matches").doc(String(matchId)).update({ kickoff: null });
    await refresh();
  } catch (e) { alert(e.message); }
};

// Open or close a whole week for predictions (weeks start closed).
window.toggleWeekOpen = async (comp, week) => {
  const key = weekKey(comp, week);
  const next = new Set(openWeeks);
  if (next.has(key)) {
    if (!confirm(`Close Week ${week} for predictions? Players won't be able to enter picks.`)) return;
    next.delete(key);
  } else {
    if (!confirm(`Open Week ${week} for predictions? Players will be able to enter picks.`)) return;
    next.add(key);
  }
  try {
    await dbf.collection("meta").doc("openWeeks").set({ keys: [...next] });
    await refresh();
  } catch (e) { alert(e.message); }
};

// Close every still-open game in a week right now.
window.closeWeek = async (comp, week) => {
  const now = new Date().toISOString();
  const targets = matches.filter(
    (m) => m.comp === comp && m.week === week &&
      m.home_team !== "TBD" && m.away_team !== "TBD" && !m.finished && !isClosed(m)
  );
  if (targets.length === 0) return;
  if (!confirm(`Close picks for ${targets.length} game(s) now? Players won't be able to add predictions for them.`)) return;
  try {
    const batch = dbf.batch();
    for (const m of targets) batch.update(dbf.collection("matches").doc(String(m.id)), { kickoff: now });
    await batch.commit();
    await refresh();
  } catch (e) { alert(e.message); }
};

// ---- Games: add / edit / delete ----
window.addGame = async () => {
  const comp = "EPL";
  const week = Math.max(1, Math.trunc(Number(document.getElementById("ag-week").value)) || 1);
  const homeTeam = document.getElementById("ag-ht").value.trim() || "TBD";
  const awayTeam = document.getElementById("ag-at").value.trim() || "TBD";
  const homeFlag = document.getElementById("ag-hf").value.trim();
  const awayFlag = document.getElementById("ag-af").value.trim();
  const koVal = document.getElementById("ag-ko").value;
  const kickoff = koVal ? new Date(koVal).toISOString() : null;

  const id = matches.reduce((mx, m) => Math.max(mx, Number(m.id) || 0), 0) + 1;
  const ordering = matches.reduce((mx, m) => Math.max(mx, Number(m.ordering) || 0), -1) + 1;

  try {
    await dbf.collection("matches").doc(String(id)).set({
      id, comp, week, ordering, slot_label: null,
      home_team: homeTeam, away_team: awayTeam,
      home_flag: homeFlag, away_flag: awayFlag,
      kickoff, home_score: null, away_score: null, finished: false,
    });
    await refresh();
  } catch (e) { alert(e.message); }
};

window.saveGame = async (matchId) => {
  const homeTeam = document.getElementById(`eht-${matchId}`).value.trim() || "TBD";
  const awayTeam = document.getElementById(`eat-${matchId}`).value.trim() || "TBD";
  const homeFlag = document.getElementById(`ehf-${matchId}`).value.trim();
  const awayFlag = document.getElementById(`eaf-${matchId}`).value.trim();
  const week = Math.max(1, Math.trunc(Number(document.getElementById(`ew-${matchId}`).value)) || 1);
  try {
    await dbf.collection("matches").doc(String(matchId)).update({
      home_team: homeTeam, away_team: awayTeam, home_flag: homeFlag, away_flag: awayFlag, week,
    });
    await refresh();
  } catch (e) { alert(e.message); }
};

window.deleteGame = async (matchId) => {
  const m = matches.find((x) => x.id === matchId);
  if (!m) return;
  if (!confirm(`Delete ${m.home_team} v ${m.away_team}? Everyone's predictions for it are removed too.`)) return;
  try {
    const batch = dbf.batch();
    batch.delete(dbf.collection("matches").doc(String(matchId)));
    for (const pr of predictions.filter((p) => p.match_id === matchId)) {
      batch.delete(dbf.collection("predictions").doc(`${pr.player_id}_${matchId}`));
    }
    await batch.commit();
    await refresh();
  } catch (e) { alert(e.message); }
};

window.saveBackfill = async (matchId) => {
  const h = num(`bh-${matchId}`), a = num(`ba-${matchId}`);
  if (h === null || a === null) { alert("Enter both scores (0–99)"); return; }
  try {
    await dbf.collection("predictions").doc(`${backfillPlayerId}_${matchId}`)
      .set({ player_id: backfillPlayerId, match_id: matchId, home_score: h, away_score: a });
    await refresh();
  } catch (e) { alert(e.message); }
};

window.clearBackfill = async (matchId) => {
  try {
    await dbf.collection("predictions").doc(`${backfillPlayerId}_${matchId}`).delete();
    await refresh();
  } catch (e) { alert(e.message); }
};

window.setManageTab = (t) => { manageTab = t; render(); };
window.setBackfillPlayer = (id) => { backfillPlayerId = id; render(); };

window.unlockManage = () => {
  const entered = document.getElementById("pin-input").value;
  if (entered === MANAGE_PIN) {
    manageUnlocked = true;
    render();
  } else {
    document.getElementById("pin-error").textContent = "Wrong PIN — try again.";
    document.getElementById("pin-input").value = "";
  }
};

window.lockManage = () => {
  manageUnlocked = false;
  render();
};

function renderPinGate() {
  document.getElementById("header-stage").textContent = "MANAGE";
  screen.innerHTML = `
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:60vh;gap:12px;text-align:center;padding:0 32px">
      <div style="font-size:48px">🔐</div>
      <div style="font-size:20px;font-weight:800">Manage</div>
      <p style="color:var(--muted);font-size:14px;margin:0">Enter the PIN to enter results and manage the pool.</p>
      <input id="pin-input" type="password" inputmode="numeric" maxlength="6"
        placeholder="PIN"
        onkeydown="if(event.key==='Enter') unlockManage()"
        style="width:140px;height:52px;text-align:center;font-size:28px;font-weight:800;letter-spacing:8px;border:2px solid var(--line);border-radius:14px;margin-top:8px">
      <p id="pin-error" style="color:#dc2626;font-size:13px;font-weight:700;min-height:18px;margin:0"></p>
      <button class="btn block" style="max-width:200px" onclick="unlockManage()">Unlock</button>
    </div>`;
}

/* ---- bottom nav ---- */
document.querySelectorAll(".nav-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".nav-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    tab = btn.dataset.tab;
    render();
  });
});

/* ---- start ---- */
(async function start() {
  if (keysMissing) { renderSetup(); return; }
  await load();
  render();
})();
