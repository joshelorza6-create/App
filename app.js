const sports = [
  "World Cup",
  "NBA",
  "WNBA",
  "NFL",
  "MLB",
  "NHL",
  "Soccer",
  "Tennis",
  "UFC",
  "Formula 1",
  "CDL",
  "Valorant",
  "CS2",
  "League of Legends",
];

const state = {
  currentView: "home",
  activeSport: "WNBA",
  activeMovementSport: "WNBA",
  selectedPlayerId: "caitlin-clark",
  selectedMovementPlayerId: "",
  selectedLiveGame: "Indiana vs Chicago",
  selectedLivePlayerId: "",
  selectedTeam: "Boston Celtics",
  profileMenuOpen: false,
  searchQuery: "",
  avatarUrl: "",
  bio: "",
  bioWarning: "",
  selectedTeams: new Set(),
  selectedSports: new Set(["World Cup", "WNBA", "MLB", "CDL", "Tennis", "Soccer"]),
  collapsedSections: new Set(),
  infoSections: new Set(),
};

const chartRegistry = new Map();

const sportEmoji = {
  "World Cup": "\u26bd",
  NBA: "\ud83c\udfc0",
  WNBA: "\ud83c\udfc0",
  NFL: "\ud83c\udfc8",
  MLB: "\u26be",
  NHL: "\ud83c\udfd2",
  Soccer: "\u26bd",
  Tennis: "\ud83c\udfbe",
  UFC: "\ud83e\udd4a",
  "Formula 1": "\ud83c\udfce\ufe0f",
  CDL: "\ud83c\udfae",
  Valorant: "\ud83c\udfae",
  CS2: "\ud83c\udfae",
  "League of Legends": "\ud83c\udfae",
};

const players = [
  makePlayer("caitlin-clark", "Caitlin Clark", "Indiana", "WNBA", "Chicago", "vs Chicago", 22.5, "Points", 25.8, 94, "Rising", "green", "8/10", "Clear", "Home", [21.5, 22, 22.5, 24.5, 23], [24, 27, 31, 18, 29], "Player is on an upward scoring trend. Chicago allows above-average guard production, and the model projection remains higher than the current line."),
  makePlayer("aja-wilson", "A'ja Wilson", "Las Vegas", "WNBA", "Seattle", "vs Seattle", 10.5, "Rebounds", 11.6, 82, "Rising", "green", "8/10", "Clear", "Away", [10, 10.5, 11, 12, 11.5], [12, 9, 14, 11, 13], "Rebounding form remains strong and matchup pace supports extra board chances."),
  makePlayer("lebron-james", "LeBron James", "Los Angeles", "NBA", "Denver", "vs Denver", 7.5, "Assists", 8.4, 79, "Rising", "green", "7/10", "Probable", "Home", [7, 7.5, 8, 8.5, 8], [9, 6, 10, 8, 9], "Assist creation is trending up against a defense that forces extra passing. Monitor the injury tag before trusting the edge."),
  makePlayer("jayson-tatum", "Jayson Tatum", "Boston", "NBA", "Miami", "vs Miami", 29.5, "Points", 28.3, 48, "Dropping", "red", "5/10", "Clear", "Home", [28.5, 29.5, 31, 30, 29.5], [26, 34, 28, 25, 31], "The market is slightly above projection and Miami's half-court pace reduces ceiling."),
  makePlayer("patrick-mahomes", "Patrick Mahomes", "Kansas City", "NFL", "Baltimore", "vs Baltimore", 265.5, "Pass Yards", 258.2, 44, "Dropping", "red", "5/10", "Clear", "Home", [258.5, 262.5, 268.5, 266.5, 265.5], [241, 312, 257, 221, 286], "The line has moved higher than the model projection. Matchup pressure and drive pace currently make this number look expensive."),
  makePlayer("justin-jefferson", "Justin Jefferson", "Minnesota", "NFL", "Detroit", "vs Detroit", 86.5, "Receiving Yards", 91.2, 77, "Rising", "green", "7/10", "Clear", "Away", [82.5, 84.5, 89.5, 92.5, 90.5], [93, 105, 62, 97, 88], "Target share and opponent coverage profile keep the projection above the current number."),
  makePlayer("shohei-ohtani", "Shohei Ohtani", "Los Angeles", "MLB", "New York", "vs New York", 1.5, "Total Bases", 2.1, 88, "Rising", "green", "9/10", "Clear", "Home", [1.5, 1.5, 2, 2.5, 2], [2, 3, 4, 1, 2], "Recent contact quality is strong, and home splits are pushing the projection above the posted number despite mild line movement."),
  makePlayer("aaron-judge", "Aaron Judge", "New York", "MLB", "Los Angeles", "at Los Angeles", 1.5, "Hits + Runs + RBI", 1.4, 55, "Neutral", "yellow", "6/10", "Clear", "Away", [1.5, 1.5, 2, 1.5, 1.5], [2, 0, 3, 1, 1], "Power is always live, but the current number is close to fair value."),
  makePlayer("connor-mcdavid", "Connor McDavid", "Edmonton", "NHL", "Vegas", "at Vegas", 3.5, "Shots", 4.1, 81, "Rising", "green", "8/10", "Clear", "Away", [3, 3.5, 4, 4.5, 3.5], [5, 4, 3, 6, 4], "Shot volume is stable and matchup pace grades favorable. The current number still sits below the model projection."),
  makePlayer("auston-matthews", "Auston Matthews", "Toronto", "NHL", "Boston", "vs Boston", 4.5, "Shots", 4.2, 52, "Neutral", "yellow", "6/10", "Clear", "Home", [4, 4.5, 5, 4.5, 4.5], [5, 3, 6, 4, 3], "A high-volume profile, but the posted line already reflects that strength."),
  makePlayer("haland", "Erling Haaland", "Norway", "World Cup", "Spain", "vs Spain", 3.5, "Shots", 4.4, 83, "Live Surge", "blue", "7/10", "Clear", "Away", [3, 3.5, 4.5, 5, 4], [4, 5, 2, 6, 4], "Live volume is spiking. Shot creation is ahead of pace, and current pressure suggests the posted number may lag the game state."),
  makePlayer("kylian-mbappe", "Kylian Mbappe", "France", "World Cup", "Germany", "vs Germany", 1.5, "Shots on Target", 1.9, 76, "Rising", "green", "7/10", "Clear", "Home", [1.5, 1.5, 2, 2.5, 2], [2, 3, 1, 2, 2], "Transition chances and role stability keep this market favorable."),
  makePlayer("iga-swiatek", "Iga Swiatek", "Poland", "Tennis", "Sabalenka", "vs Sabalenka", 20.5, "Games Won", 20.7, 62, "Neutral", "yellow", "6/10", "Clear", "Clay", [20.5, 20.5, 21, 22, 20.5], [19, 22, 21, 20, 23], "Surface performance keeps the projection stable, but line edge is thin. Treat as neutral until match conditions move."),
  makePlayer("carlos-alcaraz", "Carlos Alcaraz", "Spain", "Tennis", "Sinner", "vs Sinner", 12.5, "Aces + Winners", 13.8, 80, "Rising", "green", "8/10", "Clear", "Grass", [12, 12.5, 13.5, 14, 13.5], [15, 11, 16, 14, 13], "Surface and aggressive shot profile support a projection above the market."),
  makePlayer("islam-makhachev", "Islam Makhachev", "Russia", "UFC", "Gaethje", "vs Gaethje", 3.5, "Takedowns", 3.6, 57, "Neutral", "yellow", "6/10", "Clear", "Apex", [3.5, 3.5, 4, 4.5, 3.5], [4, 2, 5, 3, 4], "The edge is thin. Grappling control supports the projection, but the current line is already near fair value."),
  makePlayer("max-verstappen", "Max Verstappen", "Red Bull", "Formula 1", "Silverstone field", "Silverstone GP", 1.5, "Podium Finish", 1.2, 74, "Rising", "green", "9/10", "Clear", "Road", [1.8, 1.6, 1.4, 1.3, 1.2], [1, 1, 2, 1, 3], "Practice pace and historical track strength keep the projection favorable. Market movement is compressing but still useful."),
  makePlayer("simp", "Simp", "Atlanta FaZe", "CDL", "OpTic Texas", "vs OpTic", 24.5, "Map 1 Kills", 22.9, 38, "Dropping", "red", "4/10", "Clear", "LAN", [22.5, 23, 25, 24.5, 23.5], [21, 27, 18, 23, 20], "The market moved above the model projection. Map order still matters, but this number is currently priced aggressively."),
  makePlayer("shotzzy", "Shotzzy", "OpTic Texas", "CDL", "Atlanta FaZe", "vs FaZe", 23.5, "Map 1 Kills", 25.1, 84, "Rising", "green", "8/10", "Clear", "LAN", [22, 22.5, 24, 25.5, 25], [25, 26, 22, 28, 24], "Pace and role suggest strong kill involvement on the projected map order."),
  makePlayer("aspas", "aspas", "MIBR", "Valorant", "Sentinels", "vs Sentinels", 18.5, "Map 1 Kills", 20.4, 86, "Rising", "green", "8/10", "Clear", "LAN", [17.5, 18, 20, 21, 19.5], [21, 24, 18, 22, 20], "Entry impact is ahead of the posted number, and the opponent profile allows first-duel volume."),
  makePlayer("donk", "donk", "Spirit", "CS2", "FaZe", "vs FaZe", 20.5, "Map 1 Kills", 21.1, 73, "Live Surge", "blue", "7/10", "Clear", "LAN", [19.5, 20.5, 22.5, 21.5, 21], [24, 19, 23, 20, 22], "Opening duel rate is elevated. The line has already spiked, but live pace still supports a modest edge."),
  makePlayer("faker", "Faker", "T1", "League of Legends", "Gen.G", "vs Gen.G", 6.5, "Assists", 6.8, 66, "Neutral", "yellow", "6/10", "Clear", "Seoul", [6, 6.5, 7.5, 6.5, 6.5], [7, 5, 9, 6, 7], "The matchup projects controlled teamfighting. Useful context, but not enough edge to mark as a premium value."),
];

const games = [
  { sport: "WNBA", teams: "Indiana vs Chicago", score: "54 - 49", stage: "Q3 04:18", status: "LIVE", venue: "Gainbridge Fieldhouse" },
  { sport: "NBA", teams: "Los Angeles vs Denver", score: "102 - 98", stage: "Q4 02:41", status: "LIVE", venue: "Crypto.com Arena" },
  { sport: "NFL", teams: "Kansas City vs Baltimore", score: "8:20 PM", stage: "Upcoming", status: "Tonight", venue: "Arrowhead" },
  { sport: "MLB", teams: "Dodgers vs Yankees", score: "3 - 2", stage: "Top 7th", status: "LIVE", venue: "Dodger Stadium" },
  { sport: "NHL", teams: "Edmonton vs Vegas", score: "2 - 2", stage: "3rd 08:10", status: "LIVE", venue: "T-Mobile Arena" },
  { sport: "World Cup", teams: "Norway vs Spain", score: "1 - 1", stage: "67'", status: "LIVE", venue: "Group Stage" },
  { sport: "World Cup", teams: "France vs Germany", score: "2 - 1", stage: "74'", status: "LIVE", venue: "Knockout Round" },
  { sport: "Tennis", teams: "Swiatek vs Sabalenka", score: "6-4, 2-3", stage: "Set 2", status: "LIVE", venue: "Clay Court" },
  { sport: "UFC", teams: "Makhachev vs Gaethje", score: "Sat 10:00 PM", stage: "Upcoming", status: "Fight Night", venue: "Apex" },
  { sport: "Formula 1", teams: "Silverstone GP", score: "Sun 9:00 AM", stage: "Race", status: "Upcoming", venue: "Silverstone" },
  { sport: "CDL", teams: "FaZe vs OpTic", score: "1 - 1", stage: "Map 3 Control", status: "LIVE", venue: "LAN Dallas" },
  { sport: "Valorant", teams: "MIBR vs Sentinels", score: "10 - 8", stage: "Map 1", status: "LIVE", venue: "VCT Americas" },
  { sport: "CS2", teams: "Spirit vs FaZe", score: "7 - 5", stage: "Map 1", status: "LIVE", venue: "IEM" },
  { sport: "League of Legends", teams: "T1 vs Gen.G", score: "Game 2", stage: "Draft", status: "LIVE", venue: "LCK Arena" },
];

const lineMarkets = [
  { book: "PrizePicks", offset: 0, drift: 1 },
  { book: "Underdog", offset: -1, drift: -0.5 },
  { book: "Chalkboard", offset: 0.5, drift: 0 },
  { book: "Dabble", offset: -0.5, drift: 0.5 },
  { book: "Sportsbook", offset: 1, drift: -1 },
  { book: "DraftKings", offset: 0.5, drift: 1.5 },
  { book: "Pick6", offset: -1.5, drift: 0.5 },
];

const primaryMarkets = lineMarkets.filter((market) => ["PrizePicks", "Underdog"].includes(market.book));

const appIconClass = {
  PrizePicks: "pp",
  Underdog: "ud",
};

const teamCatalog = {
  WNBA: ["Indiana Fever", "Las Vegas Aces", "Chicago Sky", "Phoenix Mercury", "Minnesota Lynx", "New York Liberty", "Seattle Storm"],
  NBA: ["Los Angeles Lakers", "Denver Nuggets", "Boston Celtics", "Miami Heat", "Phoenix Suns", "Golden State Warriors"],
  NFL: ["Kansas City Chiefs", "Minnesota Vikings", "Detroit Lions", "Baltimore Ravens", "Dallas Cowboys", "San Francisco 49ers"],
  MLB: ["Los Angeles Dodgers", "New York Yankees", "Boston Red Sox", "Chicago Cubs", "San Diego Padres", "Arizona Diamondbacks"],
  NHL: ["Edmonton Oilers", "Vegas Golden Knights", "Toronto Maple Leafs", "Boston Bruins"],
  "World Cup": ["France", "Germany", "Norway", "Spain", "Argentina", "Brazil"],
  Soccer: ["France", "Germany", "Norway", "Spain", "Argentina", "Brazil"],
  Tennis: ["Iga Swiatek Team", "Carlos Alcaraz Team"],
  UFC: ["Apex Fight Team"],
  "Formula 1": ["Red Bull", "Mercedes", "Ferrari", "McLaren"],
  CDL: ["Atlanta FaZe", "OpTic Texas"],
  Valorant: ["MIBR", "Sentinels"],
  CS2: ["Spirit", "FaZe"],
  "League of Legends": ["T1", "Gen.G"],
};

const playerRoles = {
  "patrick-mahomes": "QB",
  "justin-jefferson": "WR",
  "caitlin-clark": "Guard",
  "aja-wilson": "Forward",
  "lebron-james": "Forward",
  "jayson-tatum": "Forward",
  "shohei-ohtani": "Batter",
  "aaron-judge": "Batter",
};

const fullTeamNames = {
  Boston: "Boston Celtics",
  "Los Angeles": "Los Angeles Lakers",
  Indiana: "Indiana Fever",
  "Las Vegas": "Las Vegas Aces",
  Kansas: "Kansas City Chiefs",
  Minnesota: "Minnesota Vikings",
  "New York": "New York Yankees",
  Edmonton: "Edmonton Oilers",
  Toronto: "Toronto Maple Leafs",
};

const lastFiveOpponents = {
  "caitlin-clark": ["Chicago Sky", "Phoenix Mercury", "Minnesota Lynx", "New York Liberty", "Atlanta Dream"],
  "aja-wilson": ["Seattle Storm", "Dallas Wings", "Phoenix Mercury", "Minnesota Lynx", "Connecticut Sun"],
  "lebron-james": ["Denver Nuggets", "Phoenix Suns", "Golden State Warriors", "Dallas Mavericks", "Minnesota Timberwolves"],
  "jayson-tatum": ["Miami Heat", "New York Knicks", "Milwaukee Bucks", "Philadelphia 76ers", "Cleveland Cavaliers"],
  "shohei-ohtani": ["New York Yankees", "San Diego Padres", "San Francisco Giants", "Arizona Diamondbacks", "Chicago Cubs"],
  "aaron-judge": ["Los Angeles Dodgers", "Boston Red Sox", "Toronto Blue Jays", "Tampa Bay Rays", "Baltimore Orioles"],
};

const statusClass = { green: "number-green", red: "number-red", yellow: "number-yellow", blue: "number-blue", purple: "number-purple" };

const blockedBioPatterns = [
  /\bn+[i1!]+[gq]+(?:[e3]+r+|a+)s?\b/gi,
  /\bf+[a@]+[gq]+(?:g+)?[o0]?[t7]?s?\b/gi,
  /\bf+[u*]+[c*]+k+(?:er|ing|ed|s)?\b/gi,
  /\bc+[o0]+[o0]+n+s?\b/gi,
  /\bch+[i1!]+nks?\b/gi,
  /\bsp[i1!]+cs?\b/gi,
  /\bk[i1!]+kes?\b/gi,
  /\bw[e3]+tb[a@]+cks?\b/gi,
  /\bg[o0]+[o0]+ks?\b/gi,
  /\bt[o0]+w[e3]+lh[e3]+[a@]+ds?\b/gi,
  /\br[e3]+t[a@]+rds?\b/gi,
];

function makePlayer(id, name, team, sport, opponent, matchup, line, stat, projection, valueScore, trend, status, hitRate, injury, location, movement, last5, summary) {
  return { id, name, team, sport, opponent, matchup, line, stat, projection, valueScore, trend, status, hitRate, injury, location, movement, last5, summary };
}

function qs(selector) { return document.querySelector(selector); }
function qsa(selector) { return [...document.querySelectorAll(selector)]; }
function sportLabel(sport) { return `${sportEmoji[sport] || "\ud83c\udfdf\ufe0f"} ${sport}`; }
function appIcon(book) { return `<span class="app-icon ${appIconClass[book] || ""}" title="${book}">${book === "PrizePicks" ? "PP" : book === "Underdog" ? "UD" : book[0]}</span>`; }
function teamSport(team) { return Object.entries(teamCatalog).find(([, teams]) => teams.includes(team))?.[0] || ""; }
function displayTeamName(team) { return fullTeamNames[team] || team; }
function playerFullTeam(player) { return displayTeamName(player.team); }
function teamPlayers(team) {
  return players.filter((player) => playerFullTeam(player) === team || player.team === team || player.opponent === team || team.includes(player.team));
}
function teamGame(team) {
  return games.find((game) => game.teams.includes(team) || game.teams.includes(team.replace(/^(Los Angeles|New York|Kansas City|Las Vegas) /, "$1")) || game.teams.includes(team.split(" ").slice(-1)[0]));
}
function normalized(text) { return text.toLowerCase().trim(); }
function sanitizeBio(text) {
  let blocked = false;
  const clean = blockedBioPatterns.reduce((value, pattern) => value.replace(pattern, () => { blocked = true; return ""; }), text);
  return { clean: clean.replace(/\s{2,}/g, " ").trimStart(), blocked };
}

function searchResults(query) {
  const q = normalized(query);
  if (!q) return [];
  const playerResults = players.filter((player) => normalized(player.name).includes(q)).slice(0, 5).map((player) => ({ type: "player", label: player.name, meta: `${player.sport} - ${player.team}`, id: player.id }));
  const teams = Object.entries(teamCatalog).flatMap(([sport, items]) => items.map((team) => ({ sport, team })));
  const teamResults = teams.filter(({ team }) => normalized(team).includes(q)).slice(0, 5).map(({ sport, team }) => ({ type: "team", label: team, meta: sport, id: team }));
  return [...playerResults, ...teamResults].slice(0, 8);
}

function renderGlobalSearchResults() {
  const box = qs("#global-search-results");
  if (!box) return;
  const results = searchResults(state.searchQuery);
  box.innerHTML = results.length ? results.map((item) => `<button data-search-type="${item.type}" data-search-id="${item.id}"><strong>${item.label}</strong><span>${item.meta}</span></button>`).join("") : "";
  box.classList.toggle("active", results.length > 0);
}

function svgBear(className = "hero-logo") {
  return `<span class="bear-mark ${className}"><svg viewBox="0 0 64 64" aria-hidden="true"><path class="bear-face" d="M8 25 14 11l11 7h14l11-7 6 14-4 18-10 12H22L12 43 8 25Z"></path><path class="bear-muzzle" d="M21 39c4-8 18-8 22 0l-5 11H26l-5-11Z"></path><path class="bear-brow" d="m19 30 10 3-1 4-11-4Zm26 0-10 3 1 4 11-4Z"></path><circle class="bear-eye" cx="25" cy="36" r="2.6"></circle><circle class="bear-eye" cx="39" cy="36" r="2.6"></circle><path class="bear-nose" d="M27 43c0-4 10-4 10 0 0 5-10 5-10 0Z"></path><path class="bear-mouth" d="M31 49h2l4 4H27l4-4Z"></path></svg></span>`;
}

function badge(label, status = "green") {
  return `<span class="badge"><span class="status-dot status-${status}"></span>${label}</span>`;
}

function chartTimeLabels(values) {
  const labels = ["July 22", "July 23", "July 24", "July 25", "July 26", "July 27", "July 28", "July 29"];
  if (values.length <= labels.length) return labels.slice(0, values.length);
  return values.map((_, index) => `Day ${index + 1}`);
}

function chartBlock(values, color, size = "small") {
  const id = `chart-${Math.random().toString(36).slice(2)}`;
  chartRegistry.set(id, { values, color, labels: chartTimeLabels(values) });
  return `<div class="chart-wrap ${size === "large" ? "chart-large" : ""}"><canvas class="line-chart" id="${id}" aria-label="Line movement chart"></canvas></div>`;
}

function liveStatChartBlock(series, labels, size = "large") {
  const id = `chart-${Math.random().toString(36).slice(2)}`;
  chartRegistry.set(id, { series, labels, type: "multi" });
  return `<div class="chart-wrap ${size === "large" ? "chart-large" : ""}"><canvas class="line-chart" id="${id}" aria-label="Live player stats chart"></canvas></div>`;
}

function getChartColor(color) {
  return { green: "#40c978", red: "#d95a64", yellow: "#d0b44d", blue: "#5f8fd6", purple: "#9471d2" }[color] || "#40c978";
}

function movementEventIndexes(values) {
  const spike = values.indexOf(Math.max(...values));
  let fall = values.findIndex((value, index) => index > spike && value < values[index - 1]);
  if (fall === -1) fall = values.findIndex((value, index) => index > 0 && value < values[index - 1]);
  return new Set([0, spike, fall].filter((index) => index >= 0));
}

function drawFallbackChart(canvas, values, color) {
  const ctx = canvas.getContext("2d");
  const rect = canvas.getBoundingClientRect();
  const ratio = window.devicePixelRatio || 1;
  canvas.width = rect.width * ratio;
  canvas.height = rect.height * ratio;
  ctx.scale(ratio, ratio);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const points = values.map((value, index) => ({ x: 8 + (index / (values.length - 1)) * (rect.width - 16), y: rect.height - 10 - ((value - min) / range) * (rect.height - 20) }));
  ctx.clearRect(0, 0, rect.width, rect.height);
  ctx.strokeStyle = getChartColor(color);
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  points.forEach((point, index) => { if (index === 0) ctx.moveTo(point.x, point.y); else ctx.lineTo(point.x, point.y); });
  ctx.stroke();
  ctx.fillStyle = "#d95a64";
  movementEventIndexes(values).forEach((index) => { const point = points[index]; ctx.beginPath(); ctx.arc(point.x, point.y, 3, 0, Math.PI * 2); ctx.fill(); });
}

function renderCharts() {
  chartRegistry.forEach(({ values, color, labels, series, type }, id) => {
    const canvas = document.getElementById(id);
    if (!canvas) { chartRegistry.delete(id); return; }
    if (type === "multi") {
      if (!window.Chart) return;
      if (canvas.osoChart) canvas.osoChart.destroy();
      canvas.osoChart = new Chart(canvas, {
        type: "line",
        data: {
          labels,
          datasets: series.map((item) => ({ label: item.label, data: item.values, borderColor: getChartColor(item.color), borderWidth: 1.8, tension: 0.35, fill: false, pointRadius: 3 })),
        },
        options: {
          animation: false,
          responsive: true,
          maintainAspectRatio: false,
          interaction: { mode: "nearest", intersect: false, axis: "x" },
          plugins: { legend: { labels: { color: "#bdbdbd", boxWidth: 10 } }, tooltip: { displayColors: true } },
          scales: { x: { ticks: { color: "#707070" }, grid: { color: "#1d211f" } }, y: { ticks: { color: "#707070" }, grid: { color: "#1d211f" } } },
        },
      });
      return;
    }
    const eventIndexes = movementEventIndexes(values);
    if (!window.Chart) { drawFallbackChart(canvas, values, color); return; }
    if (canvas.osoChart) canvas.osoChart.destroy();
    canvas.osoChart = new Chart(canvas, {
      type: "line",
      data: {
        labels,
        datasets: [{ data: values, borderColor: getChartColor(color), borderWidth: 1.6, tension: 0.42, fill: false, pointRadius: values.map((_, index) => (eventIndexes.has(index) ? 4 : 0)), pointHoverRadius: 5, pointBackgroundColor: values.map((_, index) => (eventIndexes.has(index) ? "#d95a64" : "transparent")), pointBorderColor: values.map((_, index) => (eventIndexes.has(index) ? "#d95a64" : "transparent")) }],
      },
      options: {
        animation: false,
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "nearest", intersect: false, axis: "x" },
        events: ["mousemove", "mouseout", "click", "touchstart", "touchmove"],
        plugins: { legend: { display: false }, tooltip: { displayColors: false, callbacks: { title: (items) => labels[items[0].dataIndex], label: (item) => `Line changed to ${item.formattedValue}` } } },
        scales: { x: { display: false }, y: { display: false } },
      },
    });
  });
}

function valueCard(player) {
  return `<button class="value-card simple-value-card" data-player="${player.id}"><div class="card-row"><div><h3 class="card-title">${player.name}</h3><span class="subtle">${player.sport} - ${playerFullTeam(player)}</span></div>${badge(player.trend, player.status)}</div><div><span class="subtle">${player.stat}</span><div class="book-line-row">${primaryLineSummary(player)}</div></div><div class="card-row"><span class="subtle">Projection</span><strong class="${statusClass[player.status]}">${player.projection}</strong></div></button>`;
}

function gameCard(game) {
  const live = game.status === "LIVE";
  return `<button class="game-card"><div class="card-row"><h3 class="card-title">${game.teams}</h3>${badge(game.status, live ? "green" : "yellow")}</div><div class="score ${live ? "number-blue" : ""}">${game.score}</div><div class="card-row"><span>${game.stage}</span><span class="subtle">${game.venue}</span></div></button>`;
}

function liveScoreCard(game) {
  return `<button class="game-card live-score-card"><div class="card-row"><h3 class="card-title">${game.teams}</h3>${badge("LIVE", "green")}</div><div class="score number-blue">${game.score}</div></button>`;
}

function sectionHeader(id, title, subtitle, info) {
  const collapsed = state.collapsedSections.has(id);
  const infoOpen = state.infoSections.has(id);
  return `<div class="section-head section-head-controls"><div><h2>${title}</h2><p>${subtitle}</p></div><div class="section-actions"><button class="mini-icon-button" data-info-section="${id}" aria-label="Show ${title} information">i</button><button class="mini-icon-button" data-collapse-section="${id}" aria-label="${collapsed ? "Expand" : "Collapse"} ${title}">${collapsed ? "v" : "^"}</button></div></div>${infoOpen ? `<div class="info-box">${info}</div>` : ""}`;
}

function collapsibleSection(id, title, subtitle, info, body) {
  return `${sectionHeader(id, title, subtitle, info)}${state.collapsedSections.has(id) ? "" : body}`;
}

function sportGameGroup(sport, items, cardRenderer = gameCard) {
  const key = `games-${sport.replace(/\W+/g, "-").toLowerCase()}`;
  return `<section class="sport-strip-panel"><div class="sport-strip-head"><h3>${sportLabel(sport)}</h3><div class="section-actions"><button class="mini-icon-button" data-info-section="${key}" aria-label="Show ${sport} score information">i</button><button class="mini-icon-button" data-collapse-section="${key}" aria-label="${state.collapsedSections.has(key) ? "Expand" : "Collapse"} ${sport}">${state.collapsedSections.has(key) ? "v" : "^"}</button></div></div>${state.infoSections.has(key) ? `<div class="info-box compact">Live score cards show matchup and current score only, so the live feed stays fast to scan.</div>` : ""}${state.collapsedSections.has(key) ? "" : `<div class="game-strip">${items.map(cardRenderer).join("")}</div>`}</section>`;
}

function renderLiveGameStats(filteredGames) {
  const order = ["World Cup", "MLB", "WNBA", "NBA", "NFL", "NHL", "CDL", "Tennis", "UFC", "Formula 1", "Valorant", "CS2", "League of Legends"];
  const grouped = order.map((sport) => [sport, filteredGames.filter((game) => game.sport === sport && game.status === "LIVE")]).filter(([, items]) => items.length);
  return `<div class="sport-strip">${grouped.map(([sport, items]) => sportGameGroup(sport, items, liveScoreCard)).join("")}</div>`;
}

function lineMarketForPlayer(player, market) {
  const open = +(player.movement[0] + market.offset).toFixed(1);
  const current = +(player.movement[player.movement.length - 1] + market.offset + market.drift).toFixed(1);
  const move = +(current - open).toFixed(1);
  const status = move > 0 ? "green" : move < 0 ? "red" : "yellow";
  return { ...market, open, current, move, status };
}

function propNamesForPlayer(player) {
  const role = playerRoles[player.id] || "";
  if (player.sport === "NFL" && role === "QB") return ["Passing Yards", "Passing Touchdowns", "Pass Attempts", "Completions", "Completion Percentage", "Rushing Yards", "Rushing Touchdowns"];
  if (player.sport === "NFL" && role === "WR") return ["Receiving Yards", "Receptions", "Receiving Touchdowns", "Targets", "Rushing Yards", "Rushing Touchdowns"];
  const map = {
    WNBA: ["Points", "Rebounds", "Assists", "Points + Rebounds + Assists", "3PT Made", "Minutes"],
    NBA: ["Points", "Rebounds", "Assists", "Points + Rebounds + Assists", "3PT Made", "Minutes"],
    MLB: ["Hits", "Total Bases", "Hits + Runs + RBI", "Runs", "RBI"],
    NHL: ["Shots", "Points", "Assists", "Saves"],
    "World Cup": ["Shots", "Shots on Target", "Passes Attempted", "Tackles"],
    Soccer: ["Shots", "Shots on Target", "Passes Attempted", "Tackles"],
    CDL: ["Map 1 Kills", "Map 2 Kills", "Map 3 Kills", "Maps 1-3 Kills"],
    Valorant: ["Map 1 Kills", "Map 2 Kills", "Map 3 Kills", "Headshots"],
    CS2: ["Map 1 Kills", "Map 2 Kills", "Map 3 Kills", "Headshots"],
    "League of Legends": ["Kills", "Assists", "Kills + Assists"],
    Tennis: ["Games Won", "Aces", "Break Points Won"],
    UFC: ["Takedowns", "Significant Strikes", "Control Time"],
    "Formula 1": ["Podium Finish", "Fastest Lap", "Points Finish"],
  };
  return map[player.sport] || ["Main Prop"];
}

function propBase(player, prop, index) {
  if (prop === player.stat) return player.line;
  if (prop === "Passing Touchdowns") return 1.5;
  if (prop === "Pass Attempts") return 34.5;
  if (prop === "Completions") return 23.5;
  if (prop === "Completion Percentage") return 66.5;
  if (prop === "Rushing Touchdowns" || prop === "Receiving Touchdowns") return 0.5;
  if (prop === "Targets") return 9.5;
  if (prop === "Receptions") return 6.5;
  if (prop.includes("Points + Rebounds + Assists")) return +(player.line + 11.5).toFixed(1);
  if (prop === "Minutes") return 32.5;
  if (prop.includes("Map 2")) return +(player.line - 1).toFixed(1);
  if (prop.includes("Map 3")) return +(player.line - 1.5).toFixed(1);
  if (prop.includes("Maps 1-3")) return +(player.line * 2.7).toFixed(1);
  if (prop.includes("Passing")) return Math.max(18.5, player.line);
  if (prop.includes("Receiving") || prop.includes("Rushing")) return +(player.line * 0.34).toFixed(1);
  if (prop === "Rebounds" || prop === "Assists" || prop === "3PT Made") return +(Math.max(1.5, player.line * 0.34 + index)).toFixed(1);
  return +(Math.max(1, player.line + index * 0.5)).toFixed(1);
}

function currentPropLines(player) {
  return propNamesForPlayer(player).map((prop, index) => {
    const base = propBase(player, prop, index);
    const projection = +(base + (player.status === "red" ? -0.8 : player.status === "yellow" ? 0.2 : 1.1)).toFixed(1);
    if (prop === "Minutes") return { prop, projection: average(last10Minutes(player)), contextOnly: true, markets: [] };
    const markets = primaryMarkets.map((market) => ({
      book: market.book,
      line: +(base + market.offset * 0.5).toFixed(1),
    }));
    return { prop, projection, markets };
  });
}

function primaryLineSummary(player) {
  const prop = currentPropLines(player)[0];
  return prop.markets.map((market) => `${appIcon(market.book)} ${market.line}`).join("");
}

function renderHomeLineColumns(filteredPlayers) {
  const rows = filteredPlayers.flatMap((player) => lineMarkets.slice(0, 5).map((market) => ({ player, market: lineMarketForPlayer(player, market) })));
  const columns = [
    ["Lines Moving Up", rows.filter(({ market }) => market.move > 0).slice(0, 8), "green"],
    ["Lines Stagnant", rows.filter(({ market }) => market.move === 0).slice(0, 8), "yellow"],
    ["Lines Decreasing", rows.filter(({ market }) => market.move < 0).slice(0, 8), "red"],
  ];
  return `<div class="line-columns">${columns.map(([title, items, color]) => `<section class="line-column"><h3 class="${statusClass[color]}">${title}</h3><div class="list">${items.length ? items.map(({ player, market }) => `<button class="line-change-card" data-player="${player.id}"><div class="card-row"><span><strong>${player.name}</strong><small>${player.sport} - ${market.book}</small></span><span class="${statusClass[market.status]}">${market.move > 0 ? "+" : ""}${market.move}</span></div>${chartBlock(player.movement, player.status)}</button>`).join("") : emptyState("No lines in this group.")}</div></section>`).join("")}</div>`;
}

function renderHome() {
  const filteredPlayers = players.filter((player) => state.selectedSports.has(player.sport));
  const filteredGames = games.filter((game) => state.selectedSports.has(game.sport));
  qs("#view-home").innerHTML = `
    ${collapsibleSection("live-games", "Live Scores", "Current live games only", "Live score cards show the matchup and score only. They are grouped by sport so users can swipe across without seeing every sport mixed together.", renderLiveGameStats(filteredGames))}
    ${collapsibleSection("value-opportunities", "Hot Player Props", "Lines by app, no extra clutter", "These are the players currently grading hot. Each card shows the prop, the main app lines, and the projection only.", `<div class="grid cards-3">${filteredPlayers.sort((a, b) => b.valueScore - a.valueScore).slice(0, 9).map(valueCard).join("")}</div>`)}`;
}

function liveGameButton(game) {
  return `<button class="live-game-pill ${state.selectedLiveGame === game.teams ? "active" : ""}" data-live-game="${game.teams}"><span>${sportLabel(game.sport)}</span><strong>${game.teams}</strong><span>${game.score}</span></button>`;
}

function livePlayerButton(player) {
  const summary = liveStatSummary(player);
  return `<button class="live-player-row ${state.selectedLivePlayerId === player.id ? "active" : ""}" data-live-player="${player.id}"><span><strong>${player.name}</strong><small>${player.stat}</small></span><span class="live-stat-chips">${summary.labels.map((label, index) => `<em>${label} ${summary.values[index]}</em>`).join("")}</span></button>`;
}

function renderLiveStats() {
  const liveGames = games.filter((game) => game.status === "LIVE");
  const selectedGame = liveGames.find((game) => game.teams === state.selectedLiveGame) || liveGames[0];
  if (selectedGame && state.selectedLiveGame !== selectedGame.teams) state.selectedLiveGame = selectedGame.teams;
  const groups = selectedGame ? livePlayersForGame(selectedGame) : { left: "", right: "", leftPlayers: [], rightPlayers: [] };
  const allPlayers = [...groups.leftPlayers, ...groups.rightPlayers];
  const topPlayers = allPlayers.sort((a, b) => b.valueScore - a.valueScore).slice(0, 3);
  const selectedPlayer = allPlayers.find((player) => player.id === state.selectedLivePlayerId);
  const liveChart = selectedPlayer ? liveSeriesForPlayer(selectedPlayer) : null;
  qs("#view-live").innerHTML = `<section class="panel"><div class="section-head"><div><h2>Live Player Stats</h2><p>Click a game, then a player</p></div></div><div class="live-game-strip">${liveGames.map(liveGameButton).join("")}</div>${selectedGame ? `<div class="section-head"><h2>Top Performers</h2><p>${selectedGame.teams}</p></div><div class="top-performer-row">${topPlayers.map(livePlayerButton).join("")}</div><div class="live-matchup-grid"><section><h3>${groups.left}</h3><div class="list">${groups.leftPlayers.map(livePlayerButton).join("") || emptyState("No tracked players.")}</div></section><section><h3>${groups.right}</h3><div class="list">${groups.rightPlayers.map(livePlayerButton).join("") || emptyState("No tracked players.")}</div></section></div><div class="live-player-detail">${selectedPlayer ? `<div class="section-head"><h2>${selectedPlayer.name}</h2><p>Live stat graph</p></div>${liveStatChartBlock(liveChart.series, liveChart.labels)}<div class="summary-box">${selectedPlayer.summary}</div>` : emptyState("Click a player to see the live graph.")}</div>` : emptyState("No live games right now.")}</section>`;
}

function sportCard(sport) {
  const liveCount = games.filter((game) => game.sport === sport && game.status === "LIVE").length;
  const playerCount = players.filter((player) => player.sport === sport).length;
  return `<button class="sport-card" data-sport="${sport}"><div class="card-row"><h3 class="card-title">${sportLabel(sport)}</h3>${badge(liveCount ? "Live" : "Slate", liveCount ? "green" : "yellow")}</div><span class="subtle">${playerCount} tracked markets</span><strong class="score">${Math.max(68, 96 - sport.length * 2)}</strong></button>`;
}

function renderSports() {
  const sportPlayers = players.filter((player) => player.sport === state.activeSport).sort((a, b) => b.valueScore - a.valueScore);
  const sportGames = games.filter((game) => game.sport === state.activeSport && game.status === "LIVE");
  qs("#view-sports").innerHTML = `<div class="tabs">${sports.map((sport) => `<button class="tab ${sport === state.activeSport ? "active" : ""}" data-tab-sport="${sport}">${sportLabel(sport)}</button>`).join("")}</div><div class="sports-layout"><section class="panel"><div class="section-head"><h2>Players</h2><p>Current prop lines</p></div><div class="list">${sportPlayers.length ? sportPlayers.map(playerCard).join("") : emptyState("No tracked players in this sport yet. Add markets here when the feed is connected.")}</div></section><aside class="score-rail"><div class="section-head compact-head"><h2>Live</h2></div><div class="list">${sportGames.length ? sportGames.map(liveScoreCard).join("") : emptyState("No live scores.")}</div></aside></div>`;
}

function renderTeam() {
  const team = state.selectedTeam;
  const sport = teamSport(team);
  const roster = teamPlayers(team);
  const game = teamGame(team);
  const starters = roster.length ? roster.slice(0, 5) : players.filter((player) => player.sport === sport).slice(0, 5);
  const outs = roster.filter((player) => player.injury !== "Clear");
  qs("#view-team").innerHTML = `<section class="panel"><div class="section-head"><div><h2>${team}</h2><p>${sport || "Team"} overview</p></div>${sport ? badge(sport, "green") : ""}</div>${game ? `<div class="team-game-card"><div><span class="subtle">Current game</span><h3>${game.teams}</h3></div><strong class="score number-blue">${game.score}</strong></div>` : `<div class="empty-state">No current game loaded for this team.</div>`}<div class="team-layout"><section><div class="section-head compact-head"><h2>Starting / Featured Players</h2></div><div class="list">${starters.length ? starters.map((player) => `<button class="player-card" data-player="${player.id}"><div class="card-row"><div><h3 class="card-title">${player.name}</h3><span class="subtle">${playerFullTeam(player)} - ${player.stat}</span></div>${badge(player.trend, player.status)}</div><div class="book-line-row">${primaryLineSummary(player)}</div></button>`).join("") : emptyState("No roster data loaded yet.")}</div></section><aside><div class="section-head compact-head"><h2>Out / Watch List</h2></div><div class="list">${outs.length ? outs.map((player) => `<div class="followed-team"><span><strong>${player.name}</strong><small>${player.injury}</small></span></div>`).join("") : `<div class="empty-state">No listed outs right now.</div>`}</div></aside></div></section>`;
}

function emptyState(message) { return `<div class="empty-state">${message}</div>`; }

function playerCard(player) {
  return `<button class="player-card" data-player="${player.id}"><div class="card-row"><div><h3 class="card-title">${player.name}</h3><span class="subtle">${playerFullTeam(player)} - ${player.stat}</span></div>${badge(player.trend, player.status)}</div><div class="book-line-row">${primaryLineSummary(player)}</div><div class="card-row"><span class="subtle">Projection ${player.projection}</span><strong class="${statusClass[player.status]}">${player.valueScore}</strong></div></button>`;
}

function renderPlayer() {
  const player = players.find((item) => item.id === state.selectedPlayerId) || players[0];
  const last10 = last10Stats(player);
  const opponents = last10Opponents(player);
  qs("#view-player").innerHTML = `<div class="player-layout"><section class="panel"><div class="card-row"><div><span class="eyebrow">${playerFullTeam(player)} - ${player.sport}</span><h2>${player.name}</h2><p class="subtle">${player.matchup} - ${player.location} - Injury: ${player.injury}</p></div>${badge(player.trend, player.status)}</div><div class="section-head"><h2>Current Lines</h2><p>PrizePicks and Underdog</p></div><table class="table"><thead><tr><th>Prop</th><th>PrizePicks</th><th>Underdog</th><th>Projection</th></tr></thead><tbody>${currentPropLines(player).map((prop) => prop.contextOnly ? `<tr><td>${prop.prop}</td><td colspan="2">Last 10 avg: ${prop.projection}</td><td class="subtle">Context only</td></tr>` : `<tr><td>${prop.prop}</td><td>${appIcon("PrizePicks")} ${prop.markets.find((market) => market.book === "PrizePicks").line}</td><td>${appIcon("Underdog")} ${prop.markets.find((market) => market.book === "Underdog").line}</td><td class="${statusClass[player.status]}">${prop.projection}</td></tr>`).join("")}</tbody></table></section><aside class="panel"><div class="section-head"><h2>Last 10 Games</h2><p>Avg ${average(last10)} ${player.stat}</p></div><table class="table"><thead><tr><th>Opponent</th><th>${player.stat}</th><th>Result</th></tr></thead><tbody>${last10.map((stat, index) => `<tr><td>${opponents[index]}</td><td>${stat}</td><td class="${stat >= player.line ? "number-green" : "number-red"}">${stat >= player.line ? "Over" : "Under"}</td></tr>`).join("")}</tbody></table><div class="section-head"><h2>Oso Summary</h2></div><div class="summary-box">${player.summary}</div></aside></div>`;
}

function last10Stats(player) {
  const seed = player.last5;
  const older = seed.map((stat, index) => {
    const drift = player.status === "green" ? -2 : player.status === "red" ? 2 : index % 2 === 0 ? -1 : 1;
    return Math.max(0, +(stat + drift).toFixed(1));
  });
  return [...older, ...seed];
}

function last10Minutes(player) {
  if (!["NBA", "WNBA"].includes(player.sport)) return [];
  const base = player.status === "green" ? 34 : player.status === "red" ? 28 : 31;
  return Array.from({ length: 10 }, (_, index) => +(base + ((index % 4) - 1.5)).toFixed(1));
}

function last10Opponents(player) {
  const known = lastFiveOpponents[player.id] || [player.opponent, "Recent Opponent", "Recent Opponent", "Recent Opponent", "Recent Opponent"];
  const older = known.map((name, index) => index === 0 ? player.opponent : name);
  return [...older, ...known];
}

function average(values) {
  return +(values.reduce((sum, value) => sum + value, 0) / values.length).toFixed(1);
}

function livePlayersForGame(game) {
  const [left, right] = game.teams.split(" vs ");
  const gamePlayers = players.filter((player) => player.sport === game.sport && (game.teams.includes(player.team) || game.teams.includes(player.opponent) || game.teams.includes(player.name.split(" ")[0])));
  if (gamePlayers.length >= 2) return { left, right, leftPlayers: gamePlayers.filter((_, index) => index % 2 === 0), rightPlayers: gamePlayers.filter((_, index) => index % 2 === 1) };
  const sportPlayers = players.filter((player) => player.sport === game.sport).slice(0, 4);
  return { left, right, leftPlayers: sportPlayers.filter((_, index) => index % 2 === 0), rightPlayers: sportPlayers.filter((_, index) => index % 2 === 1) };
}

function liveStatSummary(player) {
  if (["NBA", "WNBA"].includes(player.sport)) return { labels: ["Pts", "Reb", "Ast"], values: [Math.round(player.projection * 0.55), Math.round(player.line * 0.35), Math.max(2, Math.round(player.line * 0.22))] };
  if (player.sport === "NFL" && playerRoles[player.id] === "QB") return { labels: ["Pass Yds", "Comp", "Rush Yds"], values: [Math.round(player.projection * 0.58), 18, 16] };
  if (player.sport === "NFL") return { labels: ["Rec", "Targets", "Rec Yds"], values: [6, 10, Math.round(player.projection * 0.62)] };
  if (["World Cup", "Soccer"].includes(player.sport)) return { labels: ["Shots", "SOT", "Passes"], values: [4, 2, 31] };
  if (["CDL", "Valorant", "CS2"].includes(player.sport)) return { labels: ["Map 1", "Map 2", "Map 3"], values: [Math.round(player.line), Math.round(player.line - 1), Math.round(player.line + 2)] };
  return { labels: [player.stat, "Pace", "Edge"], values: [Math.round(player.projection), Math.round(player.valueScore / 10), Math.round(player.line)] };
}

function liveSeriesForPlayer(player) {
  if (["NBA", "WNBA"].includes(player.sport)) return { labels: ["Q1", "Q2", "Q3", "Q4"], series: [{ label: "Points", color: "green", values: [3, 8, 15, Math.round(player.projection)] }, { label: "Rebounds", color: "blue", values: [1, 5, 9, 13] }, { label: "Assists", color: "yellow", values: [0, 2, 3, 5] }] };
  if (["World Cup", "Soccer"].includes(player.sport)) return { labels: ["Start", "Half", "Late"], series: [{ label: "Shots", color: "green", values: [0, 2, 4] }, { label: "SOT", color: "blue", values: [0, 1, 2] }, { label: "Passes", color: "yellow", values: [4, 18, 31] }] };
  if (player.sport === "NFL" && playerRoles[player.id] === "QB") return { labels: ["Q1", "Q2", "Q3", "Q4"], series: [{ label: "Pass Yds", color: "green", values: [65, 141, 203, Math.round(player.projection)] }, { label: "Completions", color: "blue", values: [6, 12, 18, 24] }, { label: "Rush Yds", color: "yellow", values: [2, 8, 12, 16] }] };
  if (player.sport === "NFL") return { labels: ["Q1", "Q2", "Q3", "Q4"], series: [{ label: "Targets", color: "green", values: [2, 5, 8, 11] }, { label: "Receptions", color: "blue", values: [1, 3, 5, 7] }, { label: "Rec Yds", color: "yellow", values: [18, 44, 72, Math.round(player.projection)] }] };
  return { labels: ["Early", "Middle", "Late"], series: [{ label: player.stat, color: "green", values: [Math.round(player.line * 0.25), Math.round(player.line * 0.6), Math.round(player.projection)] }] };
}

function heatTile(player) {
  const last10 = last10Stats(player);
  const avg = average(last10);
  return `<button class="heat-tile" data-player="${player.id}"><div class="card-row"><strong>${player.name}</strong><span class="${statusClass[player.status]}">${player.trend === "Dropping" ? "Down" : player.trend === "Neutral" ? "Flat" : "Up"}</span></div><span class="subtle">${player.stat}</span><div><span class="heat-label">Last 10 Avg</span><strong class="score ${statusClass[player.status]}">${avg}</strong></div><div class="last10-strip" aria-label="Last 10 ${player.stat}">${last10.map((stat) => `<span>${stat}</span>`).join("")}</div></button>`;
}

function heatSportSection(sport, items) {
  const key = `heat-${sport.replace(/\W+/g, "-").toLowerCase()}`;
  return `<section class="heat-sport-section"><div class="sport-strip-head"><h3>${sportLabel(sport)}</h3><div class="section-actions"><button class="mini-icon-button" data-collapse-section="${key}" aria-label="${state.collapsedSections.has(key) ? "Expand" : "Collapse"} ${sport}">${state.collapsedSections.has(key) ? "v" : "^"}</button></div></div>${state.collapsedSections.has(key) ? "" : `<div class="heat-grid">${items.map(heatTile).join("")}</div>`}</section>`;
}

function renderPulse() {
  const grouped = sports.map((sport) => [sport, players.filter((player) => player.sport === sport)]).filter(([, items]) => items.length);
  const infoOpen = state.infoSections.has("heat-map");
  qs("#view-pulse").innerHTML = `<section class="panel"><div class="section-head section-head-controls"><div><h2>Heat Map Grid</h2><p>Grouped by sport, last 10 averages</p></div><div class="section-actions"><button class="mini-icon-button" data-info-section="heat-map" aria-label="Show heat map information">i</button></div></div>${infoOpen ? `<div class="info-box">Each tile shows the player's current prop category, their last 10 game average, and the last 10 results underneath it. Green means the trend is heating up, red means it is cooling down, yellow means it is mostly flat, and blue means a live surge.</div>` : ""}<div class="heat-sports">${grouped.map(([sport, items]) => heatSportSection(sport, items)).join("")}</div></section>`;
}

function renderTrends() {
  const groups = [["Heating Up", "green", players.filter((player) => player.status === "green").slice(0, 4)], ["Cooling Down", "red", players.filter((player) => player.status === "red")], ["Line Rising Fast", "blue", players.filter((player) => player.status === "blue")], ["High Value Undervalued", "purple", players.filter((player) => player.valueScore > 85)], ["Injury Impact Changes", "yellow", players.filter((player) => player.injury !== "Clear")]];
  qs("#view-trends").innerHTML = `<div class="grid cards-3">${groups.map(([title, color, items]) => `<section class="panel"><div class="section-head"><h2 class="${statusClass[color]}">${title}</h2></div><div class="list">${items.length ? items.map(playerCard).join("") : emptyState("No active entries in this trend group.")}</div></section>`).join("")}</div>`;
}

function renderMovement() {
  const sportPlayers = players.filter((player) => player.sport === state.activeMovementSport);
  const selected = sportPlayers.find((player) => player.id === state.selectedMovementPlayerId);
  qs("#view-movement").innerHTML = `<section class="panel"><div class="section-head"><div><h2>Prop Line Changes</h2><p>Pick a sport, then a player</p></div></div><div class="tabs">${sports.map((sport) => `<button class="tab ${sport === state.activeMovementSport ? "active" : ""}" data-movement-sport="${sport}">${sportLabel(sport)}</button>`).join("")}</div><div class="movement-simple-layout"><div class="movement-player-list">${sportPlayers.length ? sportPlayers.map((player) => { const pp = lineMarketForPlayer(player, primaryMarkets[0]); const ud = lineMarketForPlayer(player, primaryMarkets[1]); const move = +(pp.move - ud.move).toFixed(1); const status = pp.move !== 0 || ud.move !== 0 ? "green" : "yellow"; return `<button class="movement-player-row ${selected && selected.id === player.id ? "active" : ""}" data-movement-player="${player.id}"><span><strong>${player.name}</strong><small>${player.stat}</small></span><span class="${statusClass[status]}">${move === 0 ? "Stable" : "Moved"}</span></button>`; }).join("") : emptyState("No tracked players for this sport yet.")}</div><div class="movement-detail">${selected ? renderMovementDetail(selected) : emptyState("Select one player to compare PrizePicks and Underdog.")}</div></div></section>`;
}

function renderMovementDetail(player) {
  const pp = lineMarketForPlayer(player, primaryMarkets[0]);
  const ud = lineMarketForPlayer(player, primaryMarkets[1]);
  return `<div class="movement-compare"><div class="section-head compact-head"><h2>${player.name}</h2><p>${player.stat}</p></div><div class="compare-grid">${[pp, ud].map((market) => `<div class="compare-card">${appIcon(market.book)}<span class="subtle">Open</span><strong>${market.open}</strong><span class="subtle">Live</span><strong class="${statusClass[market.status]}">${market.current}</strong><span class="${statusClass[market.status]}">${market.move > 0 ? "+" : ""}${market.move}</span></div>`).join("")}</div>${chartBlock(player.movement, player.status, "large")}</div>`;
}

function renderProfile() {
  const teamQuery = state.teamSearchQuery || "";
  const teamMatches = searchResults(teamQuery).filter((item) => item.type === "team" && state.selectedSports.has(item.meta) && !state.selectedTeams.has(item.id));
  qs("#view-profile").innerHTML = `<div class="profile-layout"><section class="panel"><div class="profile-editor-head"><button class="profile-photo-button" data-avatar-edit>${state.avatarUrl ? `<img src="${state.avatarUrl}" alt="Profile" />` : "JO"}</button><div><h2>Profile</h2><p class="subtle">Edit picture and bio</p></div></div><label class="field-label">Bio</label><textarea class="bio-input" data-profile-bio placeholder="Add a short bio">${state.bio}</textarea>${state.bioWarning ? `<div class="bio-warning">${state.bioWarning}</div>` : ""}</section><section class="panel"><div class="section-head section-head-controls"><div><h2>Sports Interested In</h2><p>Collapse or expand your sports</p></div><button class="mini-icon-button" data-collapse-section="profile-sports">${state.collapsedSections.has("profile-sports") ? "v" : "^"}</button></div>${state.collapsedSections.has("profile-sports") ? "" : `<div class="profile-sports">${sports.map((sport) => `<button class="sport-toggle ${state.selectedSports.has(sport) ? "active" : ""}" data-toggle-sport="${sport}"><span>${sportLabel(sport)}</span><span>${state.selectedSports.has(sport) ? "On" : "Off"}</span></button>`).join("")}</div>`}</section><section class="panel"><div class="section-head section-head-controls"><div><h2>Teams Following</h2><p>Search a team, then add it</p></div><button class="mini-icon-button" data-collapse-section="profile-teams">${state.collapsedSections.has("profile-teams") ? "v" : "^"}</button></div>${state.collapsedSections.has("profile-teams") ? "" : `<div class="team-search-row"><input class="global-search team-search-input" data-team-search type="search" placeholder="Search teams to add" value="${teamQuery}" /></div><div class="team-add-results">${teamMatches.map((item) => `<button data-add-team="${item.id}"><span><strong>${item.label}</strong><small>${item.meta}</small></span><span>+</span></button>`).join("") || `<span class="subtle">Search by team name to add.</span>`}</div><div class="followed-team-list">${[...state.selectedTeams].map((team) => `<div class="followed-team"><span><strong>${team}</strong><small>${teamSport(team)}</small></span><button data-remove-team="${team}">Remove</button></div>`).join("")}</div>`}</section></div>`;
}

function renderAll() {
  chartRegistry.clear();
  renderHome();
  renderLiveStats();
  renderSports();
  renderTeam();
  renderPlayer();
  renderPulse();
  renderTrends();
  renderMovement();
  renderProfile();
  bindDynamicEvents();
  renderCharts();
}

function refreshCurrentViewCharts() {
  bindDynamicEvents();
  renderCharts();
}

function showView(view) {
  state.currentView = view;
  qsa(".view").forEach((element) => element.classList.remove("active-view"));
  qs(`#view-${view}`).classList.add("active-view");
  qsa(".nav-item").forEach((button) => button.classList.toggle("active", button.dataset.view === view));
  qs("#view-title").textContent = view === "pulse" ? "Market Pulse" : view === "movement" ? "Prop Line Changes" : view === "live" ? "Live Player Stats" : view === "team" ? "Teams" : view[0].toUpperCase() + view.slice(1);
  renderCharts();
}

function bindDynamicEvents() {
  qsa("[data-player]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedPlayerId = button.dataset.player;
      chartRegistry.clear();
      renderPlayer();
      showView("player");
      refreshCurrentViewCharts();
    });
  });
  qsa("[data-sport]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeSport = button.dataset.sport;
      chartRegistry.clear();
      renderSports();
      showView("sports");
      refreshCurrentViewCharts();
    });
  });
  qsa("[data-tab-sport]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeSport = button.dataset.tabSport;
      chartRegistry.clear();
      renderSports();
      refreshCurrentViewCharts();
    });
  });
  qsa("[data-live-game]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedLiveGame = button.dataset.liveGame;
      state.selectedLivePlayerId = "";
      chartRegistry.clear();
      renderLiveStats();
      refreshCurrentViewCharts();
    });
  });
  qsa("[data-live-player]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedLivePlayerId = button.dataset.livePlayer;
      chartRegistry.clear();
      renderLiveStats();
      refreshCurrentViewCharts();
    });
  });
  qsa("[data-movement-sport]").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeMovementSport = button.dataset.movementSport;
      state.selectedMovementPlayerId = "";
      chartRegistry.clear();
      renderMovement();
      refreshCurrentViewCharts();
    });
  });
  qsa("[data-movement-player]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedMovementPlayerId = button.dataset.movementPlayer;
      chartRegistry.clear();
      renderMovement();
      refreshCurrentViewCharts();
    });
  });
  qsa("[data-toggle-sport]").forEach((button) => {
    button.addEventListener("click", () => {
      const sport = button.dataset.toggleSport;
      if (state.selectedSports.has(sport)) state.selectedSports.delete(sport);
      else state.selectedSports.add(sport);
      renderAll();
      showView("profile");
    });
  });
  qsa("[data-avatar-edit]").forEach((button) => {
    button.addEventListener("click", () => qs("#avatar-upload").click());
  });
  qsa("[data-profile-bio]").forEach((input) => {
    input.addEventListener("input", () => {
      const result = sanitizeBio(input.value);
      const warningChanged = Boolean(state.bioWarning) !== result.blocked;
      state.bio = result.clean;
      state.bioWarning = result.blocked ? "That word is not allowed in bios. Slurs and the F-bomb are blocked." : "";
      if (input.value !== result.clean) input.value = result.clean;
      if (result.blocked || warningChanged) {
        renderProfile();
        bindDynamicEvents();
      }
    });
  });
  qsa("[data-team-search]").forEach((input) => {
    input.addEventListener("input", () => {
      state.teamSearchQuery = input.value;
      renderProfile();
      bindDynamicEvents();
    });
  });
  qsa("[data-add-team]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedTeams.add(button.dataset.addTeam);
      state.teamSearchQuery = "";
      renderProfile();
      bindDynamicEvents();
    });
  });
  qsa("[data-remove-team]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedTeams.delete(button.dataset.removeTeam);
      renderProfile();
      bindDynamicEvents();
    });
  });
  qsa("[data-collapse-section]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.collapseSection;
      if (state.collapsedSections.has(id)) state.collapsedSections.delete(id);
      else state.collapsedSections.add(id);
      renderAll();
      showView(state.currentView);
    });
  });
  qsa("[data-info-section]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.infoSection;
      if (state.infoSections.has(id)) state.infoSections.delete(id);
      else state.infoSections.add(id);
      renderAll();
      showView(state.currentView);
    });
  });
}

qsa("[data-view]").forEach((button) => {
  button.addEventListener("click", () => showView(button.dataset.view));
});

qs("#global-search").addEventListener("input", (event) => {
  state.searchQuery = event.target.value;
  renderGlobalSearchResults();
});

qs("#global-search-results").addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  state.searchQuery = "";
  qs("#global-search").value = "";
  renderGlobalSearchResults();
  if (button.dataset.searchType === "player") {
    state.selectedPlayerId = button.dataset.searchId;
    chartRegistry.clear();
    renderPlayer();
    showView("player");
    refreshCurrentViewCharts();
    return;
  }
  const sport = teamSport(button.dataset.searchId);
  if (sport) {
    state.selectedTeam = button.dataset.searchId;
    chartRegistry.clear();
    renderTeam();
    showView("team");
    refreshCurrentViewCharts();
  }
});

qs("#accept-agreement").addEventListener("click", () => {
  qs("#welcome-modal").classList.remove("active");
});

qs("#profile-button").addEventListener("click", () => {
  state.profileMenuOpen = !state.profileMenuOpen;
  qs("#profile-menu").classList.toggle("active", state.profileMenuOpen);
});

qs("#avatar-upload").addEventListener("change", (event) => {
  const file = event.target.files && event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    state.avatarUrl = reader.result;
    qs("#profile-button").innerHTML = `<img src="${state.avatarUrl}" alt="Profile" />`;
    renderProfile();
  });
  reader.readAsDataURL(file);
});

qsa("[data-profile-action]").forEach((button) => {
  button.addEventListener("click", () => {
    state.profileMenuOpen = false;
    qs("#profile-menu").classList.remove("active");
    if (button.dataset.profileAction === "profile") showView("profile");
  });
});

renderAll();
