/* ===================================================================
   ALL 380 EPL games for 2026/27 — weeks 1 to 38 (10 games per week).
   Official fixture list (kickoffs in UTC). Later-season kickoffs are
   the provisional 3pm Saturday slots until TV picks move them — use
   Manage → Deadlines to update a time, Manage → Games to move a game
   to a different week or delete it.
   =================================================================== */

/* short feed name -> display name + badge emoji (edit emojis freely) */
const TEAMS = {
  "Arsenal":        { name: "Arsenal",           flag: "🔴" },
  "Aston Villa":    { name: "Aston Villa",       flag: "🦁" },
  "Bournemouth":    { name: "Bournemouth",       flag: "🍒" },
  "Brentford":      { name: "Brentford",         flag: "🐝" },
  "Brighton":       { name: "Brighton",          flag: "🕊️" },
  "Chelsea":        { name: "Chelsea",           flag: "🔵" },
  "Coventry":       { name: "Coventry City",     flag: "🔵" },
  "Crystal Palace": { name: "Crystal Palace",    flag: "🦅" },
  "Everton":        { name: "Everton",           flag: "🍬" },
  "Fulham":         { name: "Fulham",            flag: "⚪" },
  "Hull":           { name: "Hull City",         flag: "🟠" },
  "Ipswich":        { name: "Ipswich Town",      flag: "🚜" },
  "Leeds":          { name: "Leeds United",      flag: "🦚" },
  "Liverpool":      { name: "Liverpool",         flag: "🔴" },
  "Man City":       { name: "Manchester City",   flag: "🔵" },
  "Man Utd":        { name: "Manchester United", flag: "🔴" },
  "Newcastle":      { name: "Newcastle United",  flag: "⚫" },
  "Nott'm Forest":  { name: "Nottingham Forest", flag: "🌳" },
  "Spurs":          { name: "Tottenham Hotspur", flag: "⚪" },
  "Sunderland":     { name: "Sunderland",        flag: "🐱" },
};

/* Each week: a shared default kickoff + 10 [home, away] games.
   A game can carry its own kickoff as a 3rd item (week 1 does). */
const WEEKS = [
  { week: 1, kickoff: null, games: [
    ["Arsenal", "Coventry", "2026-08-21T19:00:00Z"],
    ["Hull", "Man Utd", "2026-08-22T11:30:00Z"],
    ["Everton", "Crystal Palace", "2026-08-22T14:00:00Z"],
    ["Ipswich", "Sunderland", "2026-08-22T14:00:00Z"],
    ["Nott'm Forest", "Leeds", "2026-08-22T14:00:00Z"],
    ["Brentford", "Spurs", "2026-08-22T16:30:00Z"],
    ["Brighton", "Aston Villa", "2026-08-23T13:00:00Z"],
    ["Man City", "Bournemouth", "2026-08-23T13:00:00Z"],
    ["Newcastle", "Liverpool", "2026-08-23T15:30:00Z"],
    ["Fulham", "Chelsea", "2026-08-24T19:00:00Z"],
  ]},
  { week: 2, kickoff: "2026-08-29T14:00:00Z", games: [
    ["Bournemouth", "Everton"], ["Aston Villa", "Arsenal"], ["Chelsea", "Brighton"],
    ["Coventry", "Hull"], ["Crystal Palace", "Man City"], ["Leeds", "Brentford"],
    ["Liverpool", "Nott'm Forest"], ["Man Utd", "Ipswich"], ["Sunderland", "Fulham"],
    ["Spurs", "Newcastle"],
  ]},
  { week: 3, kickoff: "2026-09-05T14:00:00Z", games: [
    ["Arsenal", "Chelsea"], ["Brentford", "Sunderland"], ["Brighton", "Leeds"],
    ["Everton", "Man Utd"], ["Fulham", "Crystal Palace"], ["Hull", "Aston Villa"],
    ["Ipswich", "Liverpool"], ["Man City", "Coventry"], ["Newcastle", "Bournemouth"],
    ["Nott'm Forest", "Spurs"],
  ]},
  { week: 4, kickoff: "2026-09-12T14:00:00Z", games: [
    ["Bournemouth", "Brentford"], ["Aston Villa", "Nott'm Forest"], ["Chelsea", "Hull"],
    ["Coventry", "Brighton"], ["Crystal Palace", "Ipswich"], ["Leeds", "Newcastle"],
    ["Liverpool", "Fulham"], ["Man Utd", "Man City"], ["Sunderland", "Arsenal"],
    ["Spurs", "Everton"],
  ]},
  { week: 5, kickoff: "2026-09-19T14:00:00Z", games: [
    ["Bournemouth", "Liverpool"], ["Brentford", "Chelsea"], ["Brighton", "Arsenal"],
    ["Everton", "Ipswich"], ["Fulham", "Man Utd"], ["Leeds", "Crystal Palace"],
    ["Man City", "Sunderland"], ["Newcastle", "Hull"], ["Nott'm Forest", "Coventry"],
    ["Spurs", "Aston Villa"],
  ]},
  { week: 6, kickoff: "2026-10-10T14:00:00Z", games: [
    ["Arsenal", "Leeds"], ["Aston Villa", "Brentford"], ["Chelsea", "Bournemouth"],
    ["Coventry", "Newcastle"], ["Crystal Palace", "Nott'm Forest"], ["Hull", "Everton"],
    ["Ipswich", "Fulham"], ["Liverpool", "Man City"], ["Man Utd", "Spurs"],
    ["Sunderland", "Brighton"],
  ]},
  { week: 7, kickoff: "2026-10-17T14:00:00Z", games: [
    ["Bournemouth", "Sunderland"], ["Brentford", "Liverpool"], ["Brighton", "Crystal Palace"],
    ["Everton", "Chelsea"], ["Fulham", "Hull"], ["Leeds", "Man Utd"],
    ["Man City", "Ipswich"], ["Newcastle", "Aston Villa"], ["Nott'm Forest", "Arsenal"],
    ["Spurs", "Coventry"],
  ]},
  { week: 8, kickoff: "2026-10-24T14:00:00Z", games: [
    ["Arsenal", "Everton"], ["Aston Villa", "Man City"], ["Chelsea", "Spurs"],
    ["Coventry", "Fulham"], ["Crystal Palace", "Newcastle"], ["Hull", "Brentford"],
    ["Ipswich", "Nott'm Forest"], ["Liverpool", "Brighton"], ["Man Utd", "Bournemouth"],
    ["Sunderland", "Leeds"],
  ]},
  { week: 9, kickoff: "2026-10-31T15:00:00Z", games: [
    ["Bournemouth", "Leeds"], ["Aston Villa", "Fulham"], ["Brentford", "Nott'm Forest"],
    ["Chelsea", "Man Utd"], ["Coventry", "Sunderland"], ["Hull", "Ipswich"],
    ["Liverpool", "Arsenal"], ["Man City", "Brighton"], ["Newcastle", "Everton"],
    ["Spurs", "Crystal Palace"],
  ]},
  { week: 10, kickoff: "2026-11-07T15:00:00Z", games: [
    ["Arsenal", "Hull"], ["Brighton", "Brentford"], ["Crystal Palace", "Liverpool"],
    ["Everton", "Coventry"], ["Fulham", "Newcastle"], ["Ipswich", "Bournemouth"],
    ["Leeds", "Spurs"], ["Man Utd", "Aston Villa"], ["Nott'm Forest", "Man City"],
    ["Sunderland", "Chelsea"],
  ]},
  { week: 11, kickoff: "2026-11-21T15:00:00Z", games: [
    ["Bournemouth", "Nott'm Forest"], ["Aston Villa", "Sunderland"], ["Brentford", "Everton"],
    ["Chelsea", "Leeds"], ["Coventry", "Crystal Palace"], ["Hull", "Brighton"],
    ["Liverpool", "Man Utd"], ["Man City", "Fulham"], ["Newcastle", "Arsenal"],
    ["Spurs", "Ipswich"],
  ]},
  { week: 12, kickoff: "2026-11-28T15:00:00Z", games: [
    ["Arsenal", "Man City"], ["Brighton", "Newcastle"], ["Crystal Palace", "Hull"],
    ["Everton", "Liverpool"], ["Fulham", "Bournemouth"], ["Ipswich", "Aston Villa"],
    ["Leeds", "Coventry"], ["Man Utd", "Brentford"], ["Nott'm Forest", "Chelsea"],
    ["Sunderland", "Spurs"],
  ]},
  { week: 13, kickoff: "2026-12-02T20:00:00Z", games: [
    ["Bournemouth", "Brighton"], ["Aston Villa", "Everton"], ["Brentford", "Arsenal"],
    ["Chelsea", "Crystal Palace"], ["Coventry", "Ipswich"], ["Hull", "Nott'm Forest"],
    ["Liverpool", "Sunderland"], ["Man City", "Leeds"], ["Newcastle", "Man Utd"],
    ["Spurs", "Fulham"],
  ]},
  { week: 14, kickoff: "2026-12-05T15:00:00Z", games: [
    ["Bournemouth", "Hull"], ["Aston Villa", "Crystal Palace"], ["Brentford", "Man City"],
    ["Chelsea", "Liverpool"], ["Everton", "Fulham"], ["Leeds", "Ipswich"],
    ["Man Utd", "Coventry"], ["Newcastle", "Sunderland"], ["Nott'm Forest", "Brighton"],
    ["Spurs", "Arsenal"],
  ]},
  { week: 15, kickoff: "2026-12-12T15:00:00Z", games: [
    ["Arsenal", "Bournemouth"], ["Brighton", "Everton"], ["Coventry", "Aston Villa"],
    ["Crystal Palace", "Man Utd"], ["Fulham", "Brentford"], ["Hull", "Spurs"],
    ["Ipswich", "Newcastle"], ["Liverpool", "Leeds"], ["Man City", "Chelsea"],
    ["Sunderland", "Nott'm Forest"],
  ]},
  { week: 16, kickoff: "2026-12-19T15:00:00Z", games: [
    ["Bournemouth", "Coventry"], ["Arsenal", "Man Utd"], ["Brentford", "Newcastle"],
    ["Brighton", "Ipswich"], ["Chelsea", "Aston Villa"], ["Leeds", "Fulham"],
    ["Liverpool", "Spurs"], ["Man City", "Hull"], ["Nott'm Forest", "Everton"],
    ["Sunderland", "Crystal Palace"],
  ]},
  { week: 17, kickoff: "2026-12-26T15:00:00Z", games: [
    ["Aston Villa", "Leeds"], ["Coventry", "Chelsea"], ["Crystal Palace", "Arsenal"],
    ["Everton", "Sunderland"], ["Fulham", "Brighton"], ["Hull", "Liverpool"],
    ["Ipswich", "Brentford"], ["Man Utd", "Nott'm Forest"], ["Newcastle", "Man City"],
    ["Spurs", "Bournemouth"],
  ]},
  { week: 18, kickoff: "2026-12-30T20:00:00Z", games: [
    ["Aston Villa", "Liverpool"], ["Coventry", "Brentford"], ["Crystal Palace", "Bournemouth"],
    ["Everton", "Man City"], ["Fulham", "Arsenal"], ["Hull", "Leeds"],
    ["Ipswich", "Chelsea"], ["Man Utd", "Sunderland"], ["Newcastle", "Nott'm Forest"],
    ["Spurs", "Brighton"],
  ]},
  { week: 19, kickoff: "2027-01-02T15:00:00Z", games: [
    ["Bournemouth", "Aston Villa"], ["Arsenal", "Ipswich"], ["Brentford", "Crystal Palace"],
    ["Brighton", "Man Utd"], ["Chelsea", "Newcastle"], ["Leeds", "Everton"],
    ["Liverpool", "Coventry"], ["Man City", "Spurs"], ["Nott'm Forest", "Fulham"],
    ["Sunderland", "Hull"],
  ]},
  { week: 20, kickoff: "2027-01-06T20:00:00Z", games: [
    ["Arsenal", "Brentford"], ["Brighton", "Bournemouth"], ["Crystal Palace", "Chelsea"],
    ["Everton", "Aston Villa"], ["Fulham", "Spurs"], ["Ipswich", "Coventry"],
    ["Leeds", "Man City"], ["Man Utd", "Newcastle"], ["Nott'm Forest", "Hull"],
    ["Sunderland", "Liverpool"],
  ]},
  { week: 21, kickoff: "2027-01-16T15:00:00Z", games: [
    ["Bournemouth", "Ipswich"], ["Aston Villa", "Man Utd"], ["Brentford", "Brighton"],
    ["Chelsea", "Sunderland"], ["Coventry", "Everton"], ["Hull", "Arsenal"],
    ["Liverpool", "Crystal Palace"], ["Man City", "Nott'm Forest"], ["Newcastle", "Fulham"],
    ["Spurs", "Leeds"],
  ]},
  { week: 22, kickoff: "2027-01-23T15:00:00Z", games: [
    ["Arsenal", "Newcastle"], ["Brighton", "Man City"], ["Crystal Palace", "Spurs"],
    ["Everton", "Brentford"], ["Fulham", "Aston Villa"], ["Ipswich", "Hull"],
    ["Leeds", "Chelsea"], ["Man Utd", "Liverpool"], ["Nott'm Forest", "Bournemouth"],
    ["Sunderland", "Coventry"],
  ]},
  { week: 23, kickoff: "2027-01-30T15:00:00Z", games: [
    ["Bournemouth", "Fulham"], ["Aston Villa", "Ipswich"], ["Brentford", "Man Utd"],
    ["Chelsea", "Nott'm Forest"], ["Coventry", "Leeds"], ["Hull", "Crystal Palace"],
    ["Liverpool", "Everton"], ["Man City", "Arsenal"], ["Newcastle", "Brighton"],
    ["Spurs", "Sunderland"],
  ]},
  { week: 24, kickoff: "2027-02-06T15:00:00Z", games: [
    ["Arsenal", "Liverpool"], ["Brighton", "Hull"], ["Crystal Palace", "Coventry"],
    ["Everton", "Newcastle"], ["Fulham", "Man City"], ["Ipswich", "Spurs"],
    ["Leeds", "Bournemouth"], ["Man Utd", "Chelsea"], ["Nott'm Forest", "Brentford"],
    ["Sunderland", "Aston Villa"],
  ]},
  { week: 25, kickoff: "2027-02-10T20:00:00Z", games: [
    ["Aston Villa", "Bournemouth"], ["Coventry", "Liverpool"], ["Crystal Palace", "Brentford"],
    ["Everton", "Leeds"], ["Fulham", "Nott'm Forest"], ["Hull", "Sunderland"],
    ["Ipswich", "Arsenal"], ["Man Utd", "Brighton"], ["Newcastle", "Chelsea"],
    ["Spurs", "Man City"],
  ]},
  { week: 26, kickoff: "2027-02-20T15:00:00Z", games: [
    ["Bournemouth", "Crystal Palace"], ["Arsenal", "Fulham"], ["Brentford", "Coventry"],
    ["Brighton", "Spurs"], ["Chelsea", "Ipswich"], ["Leeds", "Aston Villa"],
    ["Liverpool", "Hull"], ["Man City", "Newcastle"], ["Nott'm Forest", "Man Utd"],
    ["Sunderland", "Everton"],
  ]},
  { week: 27, kickoff: "2027-02-27T15:00:00Z", games: [
    ["Aston Villa", "Chelsea"], ["Coventry", "Bournemouth"], ["Crystal Palace", "Sunderland"],
    ["Everton", "Nott'm Forest"], ["Fulham", "Leeds"], ["Hull", "Man City"],
    ["Ipswich", "Brighton"], ["Man Utd", "Arsenal"], ["Newcastle", "Brentford"],
    ["Spurs", "Liverpool"],
  ]},
  { week: 28, kickoff: "2027-03-03T20:00:00Z", games: [
    ["Bournemouth", "Spurs"], ["Arsenal", "Crystal Palace"], ["Brentford", "Ipswich"],
    ["Brighton", "Fulham"], ["Chelsea", "Coventry"], ["Leeds", "Hull"],
    ["Liverpool", "Aston Villa"], ["Man City", "Everton"], ["Nott'm Forest", "Newcastle"],
    ["Sunderland", "Man Utd"],
  ]},
  { week: 29, kickoff: "2027-03-13T15:00:00Z", games: [
    ["Bournemouth", "Newcastle"], ["Aston Villa", "Hull"], ["Chelsea", "Arsenal"],
    ["Coventry", "Man City"], ["Crystal Palace", "Fulham"], ["Leeds", "Brighton"],
    ["Liverpool", "Ipswich"], ["Man Utd", "Everton"], ["Sunderland", "Brentford"],
    ["Spurs", "Nott'm Forest"],
  ]},
  { week: 30, kickoff: "2027-03-20T15:00:00Z", games: [
    ["Arsenal", "Sunderland"], ["Brentford", "Bournemouth"], ["Brighton", "Coventry"],
    ["Everton", "Spurs"], ["Fulham", "Liverpool"], ["Hull", "Chelsea"],
    ["Ipswich", "Crystal Palace"], ["Man City", "Man Utd"], ["Newcastle", "Leeds"],
    ["Nott'm Forest", "Aston Villa"],
  ]},
  { week: 31, kickoff: "2027-04-10T14:00:00Z", games: [
    ["Bournemouth", "Man City"], ["Aston Villa", "Brighton"], ["Chelsea", "Fulham"],
    ["Coventry", "Arsenal"], ["Crystal Palace", "Everton"], ["Leeds", "Nott'm Forest"],
    ["Liverpool", "Newcastle"], ["Man Utd", "Hull"], ["Sunderland", "Ipswich"],
    ["Spurs", "Brentford"],
  ]},
  { week: 32, kickoff: "2027-04-17T14:00:00Z", games: [
    ["Arsenal", "Aston Villa"], ["Brentford", "Leeds"], ["Brighton", "Chelsea"],
    ["Everton", "Bournemouth"], ["Fulham", "Sunderland"], ["Hull", "Coventry"],
    ["Ipswich", "Man Utd"], ["Man City", "Crystal Palace"], ["Newcastle", "Spurs"],
    ["Nott'm Forest", "Liverpool"],
  ]},
  { week: 33, kickoff: "2027-04-24T14:00:00Z", games: [
    ["Bournemouth", "Arsenal"], ["Aston Villa", "Coventry"], ["Brentford", "Fulham"],
    ["Chelsea", "Man City"], ["Everton", "Brighton"], ["Leeds", "Liverpool"],
    ["Man Utd", "Crystal Palace"], ["Newcastle", "Ipswich"], ["Nott'm Forest", "Sunderland"],
    ["Spurs", "Hull"],
  ]},
  { week: 34, kickoff: "2027-05-01T14:00:00Z", games: [
    ["Arsenal", "Spurs"], ["Brighton", "Nott'm Forest"], ["Coventry", "Man Utd"],
    ["Crystal Palace", "Aston Villa"], ["Fulham", "Everton"], ["Hull", "Bournemouth"],
    ["Ipswich", "Leeds"], ["Liverpool", "Chelsea"], ["Man City", "Brentford"],
    ["Sunderland", "Newcastle"],
  ]},
  { week: 35, kickoff: "2027-05-08T14:00:00Z", games: [
    ["Bournemouth", "Man Utd"], ["Brentford", "Aston Villa"], ["Brighton", "Sunderland"],
    ["Everton", "Hull"], ["Fulham", "Ipswich"], ["Leeds", "Arsenal"],
    ["Man City", "Liverpool"], ["Newcastle", "Coventry"], ["Nott'm Forest", "Crystal Palace"],
    ["Spurs", "Chelsea"],
  ]},
  { week: 36, kickoff: "2027-05-15T14:00:00Z", games: [
    ["Arsenal", "Nott'm Forest"], ["Aston Villa", "Newcastle"], ["Chelsea", "Everton"],
    ["Coventry", "Spurs"], ["Crystal Palace", "Brighton"], ["Hull", "Fulham"],
    ["Ipswich", "Man City"], ["Liverpool", "Brentford"], ["Man Utd", "Leeds"],
    ["Sunderland", "Bournemouth"],
  ]},
  { week: 37, kickoff: "2027-05-23T14:00:00Z", games: [
    ["Bournemouth", "Chelsea"], ["Brentford", "Hull"], ["Brighton", "Liverpool"],
    ["Everton", "Arsenal"], ["Fulham", "Coventry"], ["Leeds", "Sunderland"],
    ["Man City", "Aston Villa"], ["Newcastle", "Crystal Palace"], ["Nott'm Forest", "Ipswich"],
    ["Spurs", "Man Utd"],
  ]},
  { week: 38, kickoff: "2027-05-30T15:00:00Z", games: [
    ["Arsenal", "Brighton"], ["Aston Villa", "Spurs"], ["Chelsea", "Brentford"],
    ["Coventry", "Nott'm Forest"], ["Crystal Palace", "Leeds"], ["Hull", "Newcastle"],
    ["Ipswich", "Everton"], ["Liverpool", "Bournemouth"], ["Man Utd", "Fulham"],
    ["Sunderland", "Man City"],
  ]},
];

/* expand into the flat FIXTURES list the app uses */
const FIXTURES = [];
{
  let n = 0;
  for (const w of WEEKS) {
    for (const g of w.games) {
      const [h, a, ko] = g;
      const H = TEAMS[h] || { name: h, flag: "" };
      const A = TEAMS[a] || { name: a, flag: "" };
      n++;
      FIXTURES.push({
        id: n, comp: "EPL", week: w.week, ordering: n - 1, slot_label: null,
        home_team: H.name, away_team: A.name,
        home_flag: H.flag, away_flag: A.flag,
        kickoff: ko || w.kickoff,
      });
    }
  }
}
