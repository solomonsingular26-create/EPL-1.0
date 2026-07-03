/* ===================================================================
   Embedded fixtures + starting players. Written into Firestore the
   first time the app loads (see seedIfEmpty in load()).
   =================================================================== */
const PLAYERS = ["Solar","DKC","Dere","Ermo","Costa","Mab"];
const FIXTURES = [{"id":1,"stage":"GROUP","group_name":"A","matchday":1,"ordering":0,"slot_label":null,"home_team":"Mexico","away_team":"South Africa","home_flag":"🇲🇽","away_flag":"🇿🇦"},{"id":2,"stage":"GROUP","group_name":"A","matchday":1,"ordering":1,"slot_label":null,"home_team":"Korea Republic","away_team":"Czechia","home_flag":"🇰🇷","away_flag":"🇨🇿"},{"id":3,"stage":"GROUP","group_name":"B","matchday":1,"ordering":2,"slot_label":null,"home_team":"Canada","away_team":"Bosnia & Herzegovina","home_flag":"🇨🇦","away_flag":"🇧🇦"},{"id":4,"stage":"GROUP","group_name":"B","matchday":1,"ordering":3,"slot_label":null,"home_team":"Qatar","away_team":"Switzerland","home_flag":"🇶🇦","away_flag":"🇨🇭"},{"id":5,"stage":"GROUP","group_name":"C","matchday":1,"ordering":4,"slot_label":null,"home_team":"Brazil","away_team":"Morocco","home_flag":"🇧🇷","away_flag":"🇲🇦"},{"id":6,"stage":"GROUP","group_name":"C","matchday":1,"ordering":5,"slot_label":null,"home_team":"Haiti","away_team":"Scotland","home_flag":"🇭🇹","away_flag":"🏴󠁧󠁢󠁳󠁣󠁴󠁿"},{"id":7,"stage":"GROUP","group_name":"D","matchday":1,"ordering":6,"slot_label":null,"home_team":"USA","away_team":"Paraguay","home_flag":"🇺🇸","away_flag":"🇵🇾"},{"id":8,"stage":"GROUP","group_name":"D","matchday":1,"ordering":7,"slot_label":null,"home_team":"Australia","away_team":"Türkiye","home_flag":"🇦🇺","away_flag":"🇹🇷"},{"id":9,"stage":"GROUP","group_name":"E","matchday":1,"ordering":8,"slot_label":null,"home_team":"Germany","away_team":"Curaçao","home_flag":"🇩🇪","away_flag":"🇨🇼"},{"id":10,"stage":"GROUP","group_name":"E","matchday":1,"ordering":9,"slot_label":null,"home_team":"Côte d'Ivoire","away_team":"Ecuador","home_flag":"🇨🇮","away_flag":"🇪🇨"},{"id":11,"stage":"GROUP","group_name":"F","matchday":1,"ordering":10,"slot_label":null,"home_team":"Netherlands","away_team":"Japan","home_flag":"🇳🇱","away_flag":"🇯🇵"},{"id":12,"stage":"GROUP","group_name":"F","matchday":1,"ordering":11,"slot_label":null,"home_team":"Sweden","away_team":"Tunisia","home_flag":"🇸🇪","away_flag":"🇹🇳"},{"id":13,"stage":"GROUP","group_name":"G","matchday":1,"ordering":12,"slot_label":null,"home_team":"Belgium","away_team":"Egypt","home_flag":"🇧🇪","away_flag":"🇪🇬"},{"id":14,"stage":"GROUP","group_name":"G","matchday":1,"ordering":13,"slot_label":null,"home_team":"Iran","away_team":"New Zealand","home_flag":"🇮🇷","away_flag":"🇳🇿"},{"id":15,"stage":"GROUP","group_name":"H","matchday":1,"ordering":14,"slot_label":null,"home_team":"Spain","away_team":"Cabo Verde","home_flag":"🇪🇸","away_flag":"🇨🇻"},{"id":16,"stage":"GROUP","group_name":"H","matchday":1,"ordering":15,"slot_label":null,"home_team":"Saudi Arabia","away_team":"Uruguay","home_flag":"🇸🇦","away_flag":"🇺🇾"},{"id":17,"stage":"GROUP","group_name":"I","matchday":1,"ordering":16,"slot_label":null,"home_team":"France","away_team":"Senegal","home_flag":"🇫🇷","away_flag":"🇸🇳"},{"id":18,"stage":"GROUP","group_name":"I","matchday":1,"ordering":17,"slot_label":null,"home_team":"Iraq","away_team":"Norway","home_flag":"🇮🇶","away_flag":"🇳🇴"},{"id":19,"stage":"GROUP","group_name":"J","matchday":1,"ordering":18,"slot_label":null,"home_team":"Argentina","away_team":"Algeria","home_flag":"🇦🇷","away_flag":"🇩🇿"},{"id":20,"stage":"GROUP","group_name":"J","matchday":1,"ordering":19,"slot_label":null,"home_team":"Austria","away_team":"Jordan","home_flag":"🇦🇹","away_flag":"🇯🇴"},{"id":21,"stage":"GROUP","group_name":"K","matchday":1,"ordering":20,"slot_label":null,"home_team":"Portugal","away_team":"DR Congo","home_flag":"🇵🇹","away_flag":"🇨🇩"},{"id":22,"stage":"GROUP","group_name":"K","matchday":1,"ordering":21,"slot_label":null,"home_team":"Uzbekistan","away_team":"Colombia","home_flag":"🇺🇿","away_flag":"🇨🇴"},{"id":23,"stage":"GROUP","group_name":"L","matchday":1,"ordering":22,"slot_label":null,"home_team":"England","away_team":"Croatia","home_flag":"🏴󠁧󠁢󠁥󠁮󠁧󠁿","away_flag":"🇭🇷"},{"id":24,"stage":"GROUP","group_name":"L","matchday":1,"ordering":23,"slot_label":null,"home_team":"Ghana","away_team":"Panama","home_flag":"🇬🇭","away_flag":"🇵🇦"},{"id":25,"stage":"GROUP","group_name":"A","matchday":2,"ordering":24,"slot_label":null,"home_team":"Mexico","away_team":"Korea Republic","home_flag":"🇲🇽","away_flag":"🇰🇷"},{"id":26,"stage":"GROUP","group_name":"A","matchday":2,"ordering":25,"slot_label":null,"home_team":"Czechia","away_team":"South Africa","home_flag":"🇨🇿","away_flag":"🇿🇦"},{"id":27,"stage":"GROUP","group_name":"B","matchday":2,"ordering":26,"slot_label":null,"home_team":"Canada","away_team":"Qatar","home_flag":"🇨🇦","away_flag":"🇶🇦"},{"id":28,"stage":"GROUP","group_name":"B","matchday":2,"ordering":27,"slot_label":null,"home_team":"Switzerland","away_team":"Bosnia & Herzegovina","home_flag":"🇨🇭","away_flag":"🇧🇦"},{"id":29,"stage":"GROUP","group_name":"C","matchday":2,"ordering":28,"slot_label":null,"home_team":"Brazil","away_team":"Haiti","home_flag":"🇧🇷","away_flag":"🇭🇹"},{"id":30,"stage":"GROUP","group_name":"C","matchday":2,"ordering":29,"slot_label":null,"home_team":"Scotland","away_team":"Morocco","home_flag":"🏴󠁧󠁢󠁳󠁣󠁴󠁿","away_flag":"🇲🇦"},{"id":31,"stage":"GROUP","group_name":"D","matchday":2,"ordering":30,"slot_label":null,"home_team":"USA","away_team":"Australia","home_flag":"🇺🇸","away_flag":"🇦🇺"},{"id":32,"stage":"GROUP","group_name":"D","matchday":2,"ordering":31,"slot_label":null,"home_team":"Türkiye","away_team":"Paraguay","home_flag":"🇹🇷","away_flag":"🇵🇾"},{"id":33,"stage":"GROUP","group_name":"E","matchday":2,"ordering":32,"slot_label":null,"home_team":"Germany","away_team":"Côte d'Ivoire","home_flag":"🇩🇪","away_flag":"🇨🇮"},{"id":34,"stage":"GROUP","group_name":"E","matchday":2,"ordering":33,"slot_label":null,"home_team":"Ecuador","away_team":"Curaçao","home_flag":"🇪🇨","away_flag":"🇨🇼"},{"id":35,"stage":"GROUP","group_name":"F","matchday":2,"ordering":34,"slot_label":null,"home_team":"Netherlands","away_team":"Sweden","home_flag":"🇳🇱","away_flag":"🇸🇪"},{"id":36,"stage":"GROUP","group_name":"F","matchday":2,"ordering":35,"slot_label":null,"home_team":"Tunisia","away_team":"Japan","home_flag":"🇹🇳","away_flag":"🇯🇵"},{"id":37,"stage":"GROUP","group_name":"G","matchday":2,"ordering":36,"slot_label":null,"home_team":"Belgium","away_team":"Iran","home_flag":"🇧🇪","away_flag":"🇮🇷"},{"id":38,"stage":"GROUP","group_name":"G","matchday":2,"ordering":37,"slot_label":null,"home_team":"New Zealand","away_team":"Egypt","home_flag":"🇳🇿","away_flag":"🇪🇬"},{"id":39,"stage":"GROUP","group_name":"H","matchday":2,"ordering":38,"slot_label":null,"home_team":"Spain","away_team":"Saudi Arabia","home_flag":"🇪🇸","away_flag":"🇸🇦"},{"id":40,"stage":"GROUP","group_name":"H","matchday":2,"ordering":39,"slot_label":null,"home_team":"Uruguay","away_team":"Cabo Verde","home_flag":"🇺🇾","away_flag":"🇨🇻"},{"id":41,"stage":"GROUP","group_name":"I","matchday":2,"ordering":40,"slot_label":null,"home_team":"France","away_team":"Iraq","home_flag":"🇫🇷","away_flag":"🇮🇶"},{"id":42,"stage":"GROUP","group_name":"I","matchday":2,"ordering":41,"slot_label":null,"home_team":"Norway","away_team":"Senegal","home_flag":"🇳🇴","away_flag":"🇸🇳"},{"id":43,"stage":"GROUP","group_name":"J","matchday":2,"ordering":42,"slot_label":null,"home_team":"Argentina","away_team":"Austria","home_flag":"🇦🇷","away_flag":"🇦🇹"},{"id":44,"stage":"GROUP","group_name":"J","matchday":2,"ordering":43,"slot_label":null,"home_team":"Jordan","away_team":"Algeria","home_flag":"🇯🇴","away_flag":"🇩🇿"},{"id":45,"stage":"GROUP","group_name":"K","matchday":2,"ordering":44,"slot_label":null,"home_team":"Portugal","away_team":"Uzbekistan","home_flag":"🇵🇹","away_flag":"🇺🇿"},{"id":46,"stage":"GROUP","group_name":"K","matchday":2,"ordering":45,"slot_label":null,"home_team":"Colombia","away_team":"DR Congo","home_flag":"🇨🇴","away_flag":"🇨🇩"},{"id":47,"stage":"GROUP","group_name":"L","matchday":2,"ordering":46,"slot_label":null,"home_team":"England","away_team":"Ghana","home_flag":"🏴󠁧󠁢󠁥󠁮󠁧󠁿","away_flag":"🇬🇭"},{"id":48,"stage":"GROUP","group_name":"L","matchday":2,"ordering":47,"slot_label":null,"home_team":"Panama","away_team":"Croatia","home_flag":"🇵🇦","away_flag":"🇭🇷"},{"id":49,"stage":"GROUP","group_name":"A","matchday":3,"ordering":48,"slot_label":null,"home_team":"Mexico","away_team":"Czechia","home_flag":"🇲🇽","away_flag":"🇨🇿"},{"id":50,"stage":"GROUP","group_name":"A","matchday":3,"ordering":49,"slot_label":null,"home_team":"South Africa","away_team":"Korea Republic","home_flag":"🇿🇦","away_flag":"🇰🇷"},{"id":51,"stage":"GROUP","group_name":"B","matchday":3,"ordering":50,"slot_label":null,"home_team":"Canada","away_team":"Switzerland","home_flag":"🇨🇦","away_flag":"🇨🇭"},{"id":52,"stage":"GROUP","group_name":"B","matchday":3,"ordering":51,"slot_label":null,"home_team":"Bosnia & Herzegovina","away_team":"Qatar","home_flag":"🇧🇦","away_flag":"🇶🇦"},{"id":53,"stage":"GROUP","group_name":"C","matchday":3,"ordering":52,"slot_label":null,"home_team":"Brazil","away_team":"Scotland","home_flag":"🇧🇷","away_flag":"🏴󠁧󠁢󠁳󠁣󠁴󠁿"},{"id":54,"stage":"GROUP","group_name":"C","matchday":3,"ordering":53,"slot_label":null,"home_team":"Morocco","away_team":"Haiti","home_flag":"🇲🇦","away_flag":"🇭🇹"},{"id":55,"stage":"GROUP","group_name":"D","matchday":3,"ordering":54,"slot_label":null,"home_team":"USA","away_team":"Türkiye","home_flag":"🇺🇸","away_flag":"🇹🇷"},{"id":56,"stage":"GROUP","group_name":"D","matchday":3,"ordering":55,"slot_label":null,"home_team":"Paraguay","away_team":"Australia","home_flag":"🇵🇾","away_flag":"🇦🇺"},{"id":57,"stage":"GROUP","group_name":"E","matchday":3,"ordering":56,"slot_label":null,"home_team":"Germany","away_team":"Ecuador","home_flag":"🇩🇪","away_flag":"🇪🇨"},{"id":58,"stage":"GROUP","group_name":"E","matchday":3,"ordering":57,"slot_label":null,"home_team":"Curaçao","away_team":"Côte d'Ivoire","home_flag":"🇨🇼","away_flag":"🇨🇮"},{"id":59,"stage":"GROUP","group_name":"F","matchday":3,"ordering":58,"slot_label":null,"home_team":"Netherlands","away_team":"Tunisia","home_flag":"🇳🇱","away_flag":"🇹🇳"},{"id":60,"stage":"GROUP","group_name":"F","matchday":3,"ordering":59,"slot_label":null,"home_team":"Japan","away_team":"Sweden","home_flag":"🇯🇵","away_flag":"🇸🇪"},{"id":61,"stage":"GROUP","group_name":"G","matchday":3,"ordering":60,"slot_label":null,"home_team":"Belgium","away_team":"New Zealand","home_flag":"🇧🇪","away_flag":"🇳🇿"},{"id":62,"stage":"GROUP","group_name":"G","matchday":3,"ordering":61,"slot_label":null,"home_team":"Egypt","away_team":"Iran","home_flag":"🇪🇬","away_flag":"🇮🇷"},{"id":63,"stage":"GROUP","group_name":"H","matchday":3,"ordering":62,"slot_label":null,"home_team":"Spain","away_team":"Uruguay","home_flag":"🇪🇸","away_flag":"🇺🇾"},{"id":64,"stage":"GROUP","group_name":"H","matchday":3,"ordering":63,"slot_label":null,"home_team":"Cabo Verde","away_team":"Saudi Arabia","home_flag":"🇨🇻","away_flag":"🇸🇦"},{"id":65,"stage":"GROUP","group_name":"I","matchday":3,"ordering":64,"slot_label":null,"home_team":"France","away_team":"Norway","home_flag":"🇫🇷","away_flag":"🇳🇴"},{"id":66,"stage":"GROUP","group_name":"I","matchday":3,"ordering":65,"slot_label":null,"home_team":"Senegal","away_team":"Iraq","home_flag":"🇸🇳","away_flag":"🇮🇶"},{"id":67,"stage":"GROUP","group_name":"J","matchday":3,"ordering":66,"slot_label":null,"home_team":"Argentina","away_team":"Jordan","home_flag":"🇦🇷","away_flag":"🇯🇴"},{"id":68,"stage":"GROUP","group_name":"J","matchday":3,"ordering":67,"slot_label":null,"home_team":"Algeria","away_team":"Austria","home_flag":"🇩🇿","away_flag":"🇦🇹"},{"id":69,"stage":"GROUP","group_name":"K","matchday":3,"ordering":68,"slot_label":null,"home_team":"Portugal","away_team":"Colombia","home_flag":"🇵🇹","away_flag":"🇨🇴"},{"id":70,"stage":"GROUP","group_name":"K","matchday":3,"ordering":69,"slot_label":null,"home_team":"DR Congo","away_team":"Uzbekistan","home_flag":"🇨🇩","away_flag":"🇺🇿"},{"id":71,"stage":"GROUP","group_name":"L","matchday":3,"ordering":70,"slot_label":null,"home_team":"England","away_team":"Panama","home_flag":"🏴󠁧󠁢󠁥󠁮󠁧󠁿","away_flag":"🇵🇦"},{"id":72,"stage":"GROUP","group_name":"L","matchday":3,"ordering":71,"slot_label":null,"home_team":"Croatia","away_team":"Ghana","home_flag":"🇭🇷","away_flag":"🇬🇭"},{"id":73,"stage":"R32","group_name":null,"matchday":null,"ordering":72,"slot_label":"Round of 32 — Match 1","home_team":"TBD","away_team":"TBD","home_flag":"","away_flag":""},{"id":74,"stage":"R32","group_name":null,"matchday":null,"ordering":73,"slot_label":"Round of 32 — Match 2","home_team":"TBD","away_team":"TBD","home_flag":"","away_flag":""},{"id":75,"stage":"R32","group_name":null,"matchday":null,"ordering":74,"slot_label":"Round of 32 — Match 3","home_team":"TBD","away_team":"TBD","home_flag":"","away_flag":""},{"id":76,"stage":"R32","group_name":null,"matchday":null,"ordering":75,"slot_label":"Round of 32 — Match 4","home_team":"TBD","away_team":"TBD","home_flag":"","away_flag":""},{"id":77,"stage":"R32","group_name":null,"matchday":null,"ordering":76,"slot_label":"Round of 32 — Match 5","home_team":"TBD","away_team":"TBD","home_flag":"","away_flag":""},{"id":78,"stage":"R32","group_name":null,"matchday":null,"ordering":77,"slot_label":"Round of 32 — Match 6","home_team":"TBD","away_team":"TBD","home_flag":"","away_flag":""},{"id":79,"stage":"R32","group_name":null,"matchday":null,"ordering":78,"slot_label":"Round of 32 — Match 7","home_team":"TBD","away_team":"TBD","home_flag":"","away_flag":""},{"id":80,"stage":"R32","group_name":null,"matchday":null,"ordering":79,"slot_label":"Round of 32 — Match 8","home_team":"TBD","away_team":"TBD","home_flag":"","away_flag":""},{"id":81,"stage":"R32","group_name":null,"matchday":null,"ordering":80,"slot_label":"Round of 32 — Match 9","home_team":"TBD","away_team":"TBD","home_flag":"","away_flag":""},{"id":82,"stage":"R32","group_name":null,"matchday":null,"ordering":81,"slot_label":"Round of 32 — Match 10","home_team":"TBD","away_team":"TBD","home_flag":"","away_flag":""},{"id":83,"stage":"R32","group_name":null,"matchday":null,"ordering":82,"slot_label":"Round of 32 — Match 11","home_team":"TBD","away_team":"TBD","home_flag":"","away_flag":""},{"id":84,"stage":"R32","group_name":null,"matchday":null,"ordering":83,"slot_label":"Round of 32 — Match 12","home_team":"TBD","away_team":"TBD","home_flag":"","away_flag":""},{"id":85,"stage":"R32","group_name":null,"matchday":null,"ordering":84,"slot_label":"Round of 32 — Match 13","home_team":"TBD","away_team":"TBD","home_flag":"","away_flag":""},{"id":86,"stage":"R32","group_name":null,"matchday":null,"ordering":85,"slot_label":"Round of 32 — Match 14","home_team":"TBD","away_team":"TBD","home_flag":"","away_flag":""},{"id":87,"stage":"R32","group_name":null,"matchday":null,"ordering":86,"slot_label":"Round of 32 — Match 15","home_team":"TBD","away_team":"TBD","home_flag":"","away_flag":""},{"id":88,"stage":"R32","group_name":null,"matchday":null,"ordering":87,"slot_label":"Round of 32 — Match 16","home_team":"TBD","away_team":"TBD","home_flag":"","away_flag":""},{"id":89,"stage":"R16","group_name":null,"matchday":null,"ordering":88,"slot_label":"Round of 16 — Match 1","home_team":"TBD","away_team":"TBD","home_flag":"","away_flag":""},{"id":90,"stage":"R16","group_name":null,"matchday":null,"ordering":89,"slot_label":"Round of 16 — Match 2","home_team":"TBD","away_team":"TBD","home_flag":"","away_flag":""},{"id":91,"stage":"R16","group_name":null,"matchday":null,"ordering":90,"slot_label":"Round of 16 — Match 3","home_team":"TBD","away_team":"TBD","home_flag":"","away_flag":""},{"id":92,"stage":"R16","group_name":null,"matchday":null,"ordering":91,"slot_label":"Round of 16 — Match 4","home_team":"TBD","away_team":"TBD","home_flag":"","away_flag":""},{"id":93,"stage":"R16","group_name":null,"matchday":null,"ordering":92,"slot_label":"Round of 16 — Match 5","home_team":"TBD","away_team":"TBD","home_flag":"","away_flag":""},{"id":94,"stage":"R16","group_name":null,"matchday":null,"ordering":93,"slot_label":"Round of 16 — Match 6","home_team":"TBD","away_team":"TBD","home_flag":"","away_flag":""},{"id":95,"stage":"R16","group_name":null,"matchday":null,"ordering":94,"slot_label":"Round of 16 — Match 7","home_team":"TBD","away_team":"TBD","home_flag":"","away_flag":""},{"id":96,"stage":"R16","group_name":null,"matchday":null,"ordering":95,"slot_label":"Round of 16 — Match 8","home_team":"TBD","away_team":"TBD","home_flag":"","away_flag":""},{"id":97,"stage":"QF","group_name":null,"matchday":null,"ordering":96,"slot_label":"Quarter-final — Match 1","home_team":"TBD","away_team":"TBD","home_flag":"","away_flag":""},{"id":98,"stage":"QF","group_name":null,"matchday":null,"ordering":97,"slot_label":"Quarter-final — Match 2","home_team":"TBD","away_team":"TBD","home_flag":"","away_flag":""},{"id":99,"stage":"QF","group_name":null,"matchday":null,"ordering":98,"slot_label":"Quarter-final — Match 3","home_team":"TBD","away_team":"TBD","home_flag":"","away_flag":""},{"id":100,"stage":"QF","group_name":null,"matchday":null,"ordering":99,"slot_label":"Quarter-final — Match 4","home_team":"TBD","away_team":"TBD","home_flag":"","away_flag":""},{"id":101,"stage":"SF","group_name":null,"matchday":null,"ordering":100,"slot_label":"Semi-final — Match 1","home_team":"TBD","away_team":"TBD","home_flag":"","away_flag":""},{"id":102,"stage":"SF","group_name":null,"matchday":null,"ordering":101,"slot_label":"Semi-final — Match 2","home_team":"TBD","away_team":"TBD","home_flag":"","away_flag":""},{"id":103,"stage":"THIRD","group_name":null,"matchday":null,"ordering":102,"slot_label":"Third-place play-off","home_team":"TBD","away_team":"TBD","home_flag":"","away_flag":""},{"id":104,"stage":"FINAL","group_name":null,"matchday":null,"ordering":103,"slot_label":"Final","home_team":"TBD","away_team":"TBD","home_flag":"","away_flag":""}];

/* =====================================================================
   World Cup 2026 Predictor — app logic (plain JavaScript)

   Three screens (Fixtures / Leaderboard / Manage) all live in this one
   file. Data is stored in Firebase (Firestore) so every phone shares the
   same leaderboard. No build step — just files a browser opens.
   ===================================================================== */

/* ---- scoring rules (change these if you want) ---- */
const POINTS = { EXACT: 20, RESULT: 15, MISS: 0 };

/* ---- manage PIN ----
   Change the number below to update the PIN. */
const MANAGE_PIN = "1122";
let manageUnlocked = false;

/* ---- frozen games ----
   Match IDs listed here are FROZEN: locked from predictions and NOT counted
   in the leaderboard. (Group-stage MD1 games 1–12 come before Belgium v Egypt.)
   Edit this list to freeze/unfreeze different games. */
const EXCLUDED_MATCH_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
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
let matches = [];      // all 104 fixtures
let predictions = [];  // every prediction by everyone
let tab = "fixtures";
let manageTab = "results";
let myId = localStorage.getItem("wc_player_id");
let myName = localStorage.getItem("wc_player_name");

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

const STAGE_TITLES = {
  GROUP: "Group Stage", R32: "Round of 32", R16: "Round of 16",
  QF: "Quarter-finals", SF: "Semi-finals", THIRD: "Third-place play-off", FINAL: "Final",
};

/* ---- prediction deadline ----
   A match has an optional `kickoff` (an ISO timestamp). Once that moment
   passes, predictions for it are closed — no new picks can be entered.
   Times are stored in UTC so they're correct for everyone, wherever they are. */
function isClosed(m) {
  return !!m.kickoff && new Date(m.kickoff).getTime() <= Date.now();
}

// ISO (UTC) -> value for a <input type="datetime-local"> in the viewer's local time
function toLocalInput(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`;
}

// short, friendly kickoff label, e.g. "Jun 13, 12:00 PM"
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

async function seedIfEmpty() {
  const snap = await dbf.collection("matches").limit(1).get();
  if (!snap.empty) return; // matches exist — never touch them
  // Only reaches here if the collection is truly empty (first ever run)
  const batch = dbf.batch();
  for (const f of FIXTURES) {
    const ref = dbf.collection("matches").doc(String(f.id));
    // set() with merge:true means it ONLY writes fields that don't exist yet.
    // If a document already has home_score set, it will NOT be overwritten.
    batch.set(ref, { ...f, home_score: null, away_score: null, finished: false }, { merge: true });
  }
  for (const name of PLAYERS) {
    batch.set(dbf.collection("players").doc(slug(name)), { name }, { merge: true });
  }
  await batch.commit();
}

async function load() {
  if (!dbf) return;
  await seedIfEmpty();
  const [pSnap, mSnap, prSnap] = await Promise.all([
    dbf.collection("players").get(),
    dbf.collection("matches").get(),
    dbf.collection("predictions").get(),
  ]);
  players = pSnap.docs.map((d) => ({ id: d.id, name: d.data().name }));
  players.sort((a, b) => a.name.localeCompare(b.name));
  matches = mSnap.docs.map((d) => d.data());
  matches.sort((a, b) => a.ordering - b.ordering);
  predictions = prSnap.docs.map((d) => d.data());
}

/* =====================================================================
   RENDER — picks which screen to draw
   ===================================================================== */
function render() {
  if (keysMissing) { renderSetup(); return; }
  if (tab === "fixtures") renderFixtures();
  else if (tab === "leaderboard") renderLeaderboard();
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
  const locked = m.finished || isTbd || !!mine || closed || frozen;

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
  } else {
    foot = `<button class="link" onclick="savePick(${m.id})">lock in pick</button>`;
  }

  // show the deadline on the left when one is set and the game isn't done
  const kickoff = m.kickoff && !m.finished && !frozen
    ? ` · ${closed ? "closed" : "closes"} ${kickoffLabel(m.kickoff)}`
    : "";

  const left = (m.group_name
    ? `Group ${m.group_name} · MD${m.matchday}`
    : esc(m.slot_label || STAGE_TITLES[m.stage])) + kickoff;

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
  const sections = [];

  // group stage by matchday
  for (const md of [1, 2, 3]) {
    const sub = matches.filter((m) => m.stage === "GROUP" && m.matchday === md);
    if (sub.length) sections.push({ title: `Group Stage · Matchday ${md}`, list: sub });
  }
  // knockout rounds
  for (const stage of ["R32", "R16", "QF", "SF", "THIRD", "FINAL"]) {
    const sub = matches.filter((m) => m.stage === stage);
    if (sub.length) sections.push({ title: STAGE_TITLES[stage], list: sub });
  }

  const body = sections
    .map(
      (s) =>
        `<div class="section-title">${s.title}</div>` +
        s.list.map(matchRowHTML).join("")
    )
    .join("");

  screen.innerHTML = playerBarHTML() + body;
}

/* ---------------------------------------------------------------------
   LEADERBOARD
   ------------------------------------------------------------------- */
const KO_STAGES = new Set(["R32", "R16", "QF", "SF", "THIRD", "FINAL"]);

function buildLeaderboard() {
  const finished = new Map(
    matches
      .filter((m) => m.finished && !isExcluded(m) && m.home_score != null && m.away_score != null)
      .map((m) => [m.id, m])
  );
  const rows = new Map();
  for (const p of players) rows.set(p.id, {
    name: p.name,
    groupPts: 0, koPts: 0, points: 0,
    exact: 0, results: 0, scored: 0,
  });

  for (const pr of predictions) {
    const m = finished.get(pr.match_id);
    const row = rows.get(pr.player_id);
    if (!m || !row) continue;
    row.scored++;
    const s = scorePrediction(pr.home_score, pr.away_score, m.home_score, m.away_score);
    row.points += s.pts;
    if (KO_STAGES.has(m.stage)) row.koPts += s.pts;
    else row.groupPts += s.pts;
    if (s.kind === "exact") row.exact++;
    else if (s.kind === "result") row.results++;
  }
  return [...rows.values()].sort(
    (a, b) => b.points - a.points || b.exact - a.exact || a.name.localeCompare(b.name)
  );
}

function renderLeaderboard() {
  document.getElementById("header-stage").textContent = "LEADERBOARD";
  const rows = buildLeaderboard();
  const finished = matches.filter((m) => m.finished && !isExcluded(m)).length;
  const playable = matches.filter((m) => m.home_team !== "TBD" && m.away_team !== "TBD" && !isExcluded(m)).length;
  const medals = ["🥇", "🥈", "🥉"];

  const list =
    rows.length === 0
      ? `<p class="note">No players yet. Add yourself on the Fixtures tab.</p>`
      : rows
          .map((r, i) => {
            const leader = i === 0 && r.points > 0;
            return `<div class="card lb-row ${leader ? "leader" : ""}">
              <div class="lb-rank">${i < 3 ? medals[i] : i + 1}</div>
              <div class="avatar" style="background:${avatarColor(r.name)}">${esc(initials(r.name))}</div>
              <div class="lb-name">
                <div class="n">${esc(r.name)}</div>
                <div class="sub">${r.exact} exact · ${r.results} results</div>
              </div>
              <div class="lb-pts-wrap">
                <div class="lb-pts-col">
                  <div class="lb-pts-label">GRP</div>
                  <div class="lb-pts-val">${r.groupPts}</div>
                </div>
                <div class="lb-pts-col">
                  <div class="lb-pts-label">KO</div>
                  <div class="lb-pts-val">${r.koPts}</div>
                </div>
                <div class="lb-pts-col">
                  <div class="lb-pts-label">TOT</div>
                  <div class="lb-pts-val ${leader ? "leader" : ""}">${r.points}</div>
                </div>
              </div>
            </div>`;
          })
          .join("");

  screen.innerHTML = `
    <div class="big-title">Leaderboard</div>
    ${list}`;
}

/* ---------------------------------------------------------------------
   MANAGE  (results / knockout / backfill) — no password, share with
   whoever runs the pool.
   ------------------------------------------------------------------- */
let backfillPlayerId = null;

function renderManage() {
  document.getElementById("header-stage").textContent = "MANAGE";
  if (!backfillPlayerId && players[0]) backfillPlayerId = players[0].id;

  const tabs = `
    <div class="tabs">
      <button class="tab ${manageTab === "results" ? "active" : ""}" onclick="setManageTab('results')">Results</button>
      <button class="tab ${manageTab === "deadlines" ? "active" : ""}" onclick="setManageTab('deadlines')">Deadlines</button>
      <button class="tab ${manageTab === "knockout" ? "active" : ""}" onclick="setManageTab('knockout')">Knockout</button>
      <button class="tab ${manageTab === "backfill" ? "active" : ""}" onclick="setManageTab('backfill')">Predictions</button>
    </div>`;

  let body = "";
  const playable = matches.filter((m) => m.home_team !== "TBD" && m.away_team !== "TBD");
  const knockout = matches.filter((m) => m.stage !== "GROUP");

  if (manageTab === "results") {
    body =
      `<p class="note">Enter the final score of any game (including ones already played). Saving locks the game and updates the leaderboard.</p>` +
      playable.map(resultRowHTML).join("");
  } else if (manageTab === "deadlines") {
    body =
      `<p class="note">Set when picks close for each game. After the deadline, players can't add or change a prediction. Set a kickoff time, or hit <b>Close now</b> to lock a game (or a whole matchday) immediately.</p>` +
      deadlinesBody(playable);
  } else if (manageTab === "knockout") {
    body =
      `<p class="note">As the bracket fills, type the two teams for each knockout game (emoji flag optional). Predictions open once both teams are set.</p>` +
      knockout.map(koRowHTML).join("");
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
    ${tabs}${body}`;
}

function manageLabel(m) {
  return m.group_name ? `Group ${m.group_name} · MD${m.matchday}` : esc(m.slot_label || m.stage);
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

/* ---- Deadlines tab: group games into sections, each with a bulk "Close all now" ---- */
function deadlinesBody(playable) {
  const sections = [];
  for (const md of [1, 2, 3]) {
    const sub = playable.filter((m) => m.stage === "GROUP" && m.matchday === md);
    if (sub.length) sections.push({ title: `Group Stage · Matchday ${md}`, stage: "GROUP", md, list: sub });
  }
  for (const stage of ["R32", "R16", "QF", "SF", "THIRD", "FINAL"]) {
    const sub = playable.filter((m) => m.stage === stage);
    if (sub.length) sections.push({ title: STAGE_TITLES[stage], stage, md: null, list: sub });
  }
  return sections
    .map((s) => {
      const anyOpen = s.list.some((m) => !m.finished && !isClosed(m));
      const btn = anyOpen
        ? `<button class="btn ghost sm" onclick="closeGroup('${s.stage}', ${s.md ?? "null"})">Close all now</button>`
        : `<span class="ok">all closed ✓</span>`;
      return `<div style="display:flex;align-items:center;justify-content:space-between;margin:16px 4px 6px">
          <span class="section-title" style="margin:0">${s.title}</span>${btn}
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

function koRowHTML(m) {
  const ht = m.home_team === "TBD" ? "" : esc(m.home_team);
  const at = m.away_team === "TBD" ? "" : esc(m.away_team);
  return `<div class="card">
    <div class="row-label">${esc(m.slot_label || m.stage)}</div>
    <div class="ko-grid">
      <input class="flag" id="khf-${m.id}" value="${m.home_flag}" placeholder="🏳️">
      <input id="kht-${m.id}" value="${ht}" placeholder="Home team">
      <input class="flag" id="kaf-${m.id}" value="${m.away_flag}" placeholder="🏳️">
      <input id="kat-${m.id}" value="${at}" placeholder="Away team">
    </div>
    <button class="btn block sm" style="margin-top:8px" onclick="setKnockout(${m.id})">Save matchup</button>
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
  localStorage.setItem("wc_player_id", id);
  localStorage.setItem("wc_player_name", name);
  render();
};

window.clearPlayer = () => {
  myId = null; myName = null;
  localStorage.removeItem("wc_player_id");
  localStorage.removeItem("wc_player_name");
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
  if (m && (isClosed(m) || isExcluded(m))) { // deadline passed or frozen — refuse
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
  const v = document.getElementById(`dl-${matchId}`).value; // local datetime, e.g. 2026-06-13T12:00
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

// Close every still-open game in a section (matchday or knockout round) right now.
window.closeGroup = async (stage, md) => {
  const now = new Date().toISOString();
  const targets = matches.filter(
    (m) => m.stage === stage && (md === null || m.matchday === md) &&
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

window.setKnockout = async (matchId) => {
  const homeTeam = document.getElementById(`kht-${matchId}`).value.trim() || "TBD";
  const awayTeam = document.getElementById(`kat-${matchId}`).value.trim() || "TBD";
  const homeFlag = document.getElementById(`khf-${matchId}`).value.trim();
  const awayFlag = document.getElementById(`kaf-${matchId}`).value.trim();
  try {
    await dbf.collection("matches").doc(String(matchId)).update({ home_team: homeTeam, away_team: awayTeam, home_flag: homeFlag, away_flag: awayFlag });
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
