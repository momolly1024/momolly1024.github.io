(() => {
  "use strict";
  const T = 16; // tile size in the Kenney sheets
  const W = 40, H = 28; // map size in tiles

  // ---------- language ----------
  const PDF = { zh: "assets/Molly_Chi_Resume_ZH.pdf", en: "assets/Molly_Chi_Resume_EN.pdf" };
  const HOME_TITLE = { zh: "嗨，我是 Molly 👋", en: "Hi, I'm Molly 👋" };
  let lang = new URLSearchParams(location.search).get("lang");
  if (!window.RESUME[lang]) { try { lang = localStorage.getItem("town-lang"); } catch (e) {} }
  if (!window.RESUME[lang]) lang = ((navigator.languages && navigator.languages[0]) || navigator.language || "").toLowerCase().startsWith("zh") ? "zh" : "en";
  const D = () => window.RESUME[lang];
  const U = () => D().ui;

  // ---------- assets ----------
  const img = (src) => { const i = new Image(); i.src = src; return i; };
  const SHEETS = { town: img("assets/img/town.png"), chars: img("assets/img/dungeon.png") };
  const SFX_FILES = {
    door: "doorOpen_1", close: "doorClose_2", step0: "footstep00", step1: "footstep01",
    talk: "select_001", coin: "confirmation_002", click: "click_002", done: "maximize_006",
  };
  const sfx = {};
  let muted = false;
  try { muted = localStorage.getItem("town-muted") === "1"; } catch (e) {}
  for (const [k, f] of Object.entries(SFX_FILES)) { const a = new Audio(`assets/sfx/${f}.mp3`); a.preload = "auto"; sfx[k] = a; }
  function play(name, vol = 0.5) {
    if (muted || !sfx[name]) return;
    const a = sfx[name].cloneNode();
    a.volume = vol;
    a.play().catch(() => {});
  }

  // ---------- tile ids (Kenney Tiny Town, 12 columns) ----------
  const TILE = {
    grass: [0, 0, 0, 0, 0, 1], flower: 2, stones: 43,
    dirt: [[12, 13, 14], [24, 25, 26], [36, 37, 38]],
    trees: [16, 28, 16, 28, 16, 27, 15], bush: 5, sprout: 17, shroom: 29,
    fence: [80, 81, 82], hive: 94, well: 104, target: 95,
    roof: { blue: { top: [48, 49, 50], bot: [60, 61, 62], gable: 63, chimney: 51 }, red: { top: [52, 53, 54], bot: [64, 65, 66], gable: 67, chimney: 55 } },
    wall: { wood: { l: 72, m: 73, r: 75, door: 86, win: 84 }, stone: { l: 76, m: 77, r: 79, door: 90, win: 88 } },
  };

  // ---------- buildings (names come from data.js `places`) ----------
  const BUILDINGS = [
    { id: "home", x: 4, y: 4, w: 4, roof: "red", wall: "wood" },
    { id: "asus", x: 17, y: 3, w: 6, roof: "red", wall: "stone", tall: true },
    { id: "cognito", x: 30, y: 4, w: 4, roof: "blue", wall: "wood" },
    { id: "koo", x: 31, y: 14, w: 5, roof: "blue", wall: "stone" },
    { id: "school", x: 4, y: 14, w: 5, roof: "blue", wall: "stone" },
    { id: "skills", x: 11, y: 21, w: 4, roof: "blue", wall: "wood" },
    { id: "studio", x: 24, y: 21, w: 4, roof: "red", wall: "wood" },
  ];
  for (const b of BUILDINGS) {
    b.h = b.tall ? 4 : 3;
    b.doorX = b.x + Math.floor(b.w / 2);
    b.doorY = b.y + b.h - 1;
  }
  const placeName = (b) => D().places[b.id][0];
  const placeSub = (b) => D().places[b.id][1];
  const PLAZA = { x: 16, y: 10, w: 8, h: 6 };
  const WELL = { x: 19, y: 12 };

  const NPCS = [
    { id: "guide", sprite: 85, x: 17, y: 11 },
    { id: "knight", sprite: 96, x: 23, y: 7 },
    { id: "wizard", sprite: 84, x: 16, y: 22 },
    { id: "friend", sprite: 100, x: 21, y: 13 },
  ];

  // ---------- map generation ----------
  const N = W * H;
  const ground = new Int16Array(N);
  const objs = new Int16Array(N).fill(-1);
  const solid = new Uint8Array(N);
  const reserved = new Uint8Array(N); // keep free of random decoration
  const owner = new Array(N).fill(null); // building at cell
  const idx = (x, y) => y * W + x;
  const inMap = (x, y) => x >= 0 && y >= 0 && x < W && y < H;

  let seed = 20201024;
  const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);

  for (let i = 0; i < N; i++) ground[i] = TILE.grass[Math.floor(rnd() * TILE.grass.length)];

  // plaza (dirt 9-slice)
  for (let y = PLAZA.y; y < PLAZA.y + PLAZA.h; y++) {
    for (let x = PLAZA.x; x < PLAZA.x + PLAZA.w; x++) {
      const r = y === PLAZA.y ? 0 : y === PLAZA.y + PLAZA.h - 1 ? 2 : 1;
      const c = x === PLAZA.x ? 0 : x === PLAZA.x + PLAZA.w - 1 ? 2 : 1;
      ground[idx(x, y)] = TILE.dirt[r][c];
      reserved[idx(x, y)] = 1;
    }
  }
  const inPlaza = (x, y) => x >= PLAZA.x && x < PLAZA.x + PLAZA.w && y >= PLAZA.y && y < PLAZA.y + PLAZA.h;

  // buildings
  for (const b of BUILDINGS) {
    const roof = TILE.roof[b.roof], wall = TILE.wall[b.wall];
    for (let r = 0; r < b.h; r++) {
      for (let c = 0; c < b.w; c++) {
        const x = b.x + c, y = b.y + r, edge = c === 0 ? 0 : c === b.w - 1 ? 2 : 1;
        let t;
        if (r === 0) t = b.tall && c === b.w - 2 ? roof.chimney : roof.top[edge];
        else if (r === 1) t = x === b.doorX ? roof.gable : roof.bot[edge];
        else if (r === b.h - 1) t = x === b.doorX ? wall.door : edge === 0 ? wall.l : edge === 2 ? wall.r : (b.w >= 5 && c === 1) || (b.w >= 5 && c === b.w - 2) ? wall.win : wall.m;
        else t = edge === 0 ? wall.l : edge === 2 ? wall.r : c % 2 ? wall.win : wall.m;
        objs[idx(x, y)] = t;
        solid[idx(x, y)] = 1;
        owner[idx(x, y)] = b;
      }
    }
    // keep a ring around the house clear
    for (let y = b.y - 1; y <= b.y + b.h; y++) for (let x = b.x - 1; x <= b.x + b.w; x++) if (inMap(x, y)) reserved[idx(x, y)] = 1;
  }

  // home garden: fence + beehives
  [[9, 6, TILE.hive], [11, 6, TILE.hive], [10, 4, TILE.sprout], [12, 5, TILE.flower]].forEach(([x, y, t]) => {
    if (t === TILE.flower) ground[idx(x, y)] = t; else { objs[idx(x, y)] = t; solid[idx(x, y)] = t === TILE.hive ? 1 : 0; }
  });
  for (let x = 9; x <= 12; x++) { const t = x === 9 ? TILE.fence[0] : x === 12 ? TILE.fence[2] : TILE.fence[1]; objs[idx(x, 8)] = t; solid[idx(x, 8)] = 1; }
  for (let y = 3; y <= 8; y++) for (let x = 8; x <= 13; x++) reserved[idx(x, y)] = 1;

  // well + NPC spots
  objs[idx(WELL.x, WELL.y)] = TILE.well; solid[idx(WELL.x, WELL.y)] = 1;
  for (const n of NPCS) { solid[idx(n.x, n.y)] = 1; reserved[idx(n.x, n.y)] = 1; }
  // archery target next to the school, just for fun
  objs[idx(10, 17)] = TILE.target; solid[idx(10, 17)] = 1; reserved[idx(10, 17)] = 1;

  // border forest
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    if (x < 2 || y < 2 || x >= W - 2 || y >= H - 2) {
      objs[idx(x, y)] = TILE.trees[Math.floor(rnd() * TILE.trees.length)];
      solid[idx(x, y)] = 1;
    }
  }

  // stepping-stone paths: cheapest route (with a turn penalty) from each door to the plaza
  function carvePath(sx, sy) {
    const dist = new Float64Array(N * 4).fill(Infinity), prev = new Int32Array(N * 4).fill(-1);
    const DIRS = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    const open = [];
    for (let d = 0; d < 4; d++) { dist[idx(sx, sy) * 4 + d] = 0; open.push([0, idx(sx, sy) * 4 + d]); }
    let goal = -1;
    while (open.length) {
      open.sort((a, b) => a[0] - b[0]);
      const [cost, s] = open.shift();
      if (cost > dist[s]) continue;
      const cell = s >> 2, d = s & 3, x = cell % W, y = (cell / W) | 0;
      if (inPlaza(x, y)) { goal = s; break; }
      for (let nd = 0; nd < 4; nd++) {
        const nx = x + DIRS[nd][0], ny = y + DIRS[nd][1];
        if (!inMap(nx, ny) || solid[idx(nx, ny)]) continue;
        const ns = idx(nx, ny) * 4 + nd, nc = cost + 1 + (nd === d ? 0 : 2);
        if (nc < dist[ns]) { dist[ns] = nc; prev[ns] = s; open.push([nc, ns]); }
      }
    }
    for (let s = goal; s !== -1; s = prev[s]) {
      const cell = s >> 2, x = cell % W, y = (cell / W) | 0;
      if (!inPlaza(x, y)) ground[cell] = TILE.stones;
      reserved[cell] = 1;
      // keep the path's sides walkable too
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) if (inMap(x + dx, y + dy)) reserved[idx(x + dx, y + dy)] = 1;
    }
  }
  for (const b of BUILDINGS) carvePath(b.doorX, b.doorY + 1);

  // random decoration on the free grass
  for (let y = 2; y < H - 2; y++) for (let x = 2; x < W - 2; x++) {
    const i = idx(x, y);
    if (reserved[i] || objs[i] !== -1 || ground[i] === TILE.stones) continue;
    const r = rnd();
    if (r < 0.10) { objs[i] = TILE.trees[Math.floor(rnd() * TILE.trees.length)]; solid[i] = 1; }
    else if (r < 0.13) { objs[i] = TILE.bush; solid[i] = 1; }
    else if (r < 0.15) objs[i] = rnd() < 0.5 ? TILE.shroom : TILE.sprout;
    else if (r < 0.26) ground[i] = TILE.flower;
  }

  // ---------- prerender the static map ----------
  const mapCanvas = document.createElement("canvas");
  mapCanvas.width = W * T; mapCanvas.height = H * T;
  function drawTile(c, sheet, t, x, y) {
    c.drawImage(sheet, (t % 12) * T, Math.floor(t / 12) * T, T, T, x, y, T, T);
  }
  function prerender() {
    const c = mapCanvas.getContext("2d");
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const i = idx(x, y);
      // stones and flowers sit on top of plain grass
      if (ground[i] === TILE.stones || ground[i] === TILE.flower) drawTile(c, SHEETS.town, 0, x * T, y * T);
      drawTile(c, SHEETS.town, ground[i], x * T, y * T);
      if (objs[i] !== -1) drawTile(c, SHEETS.town, objs[i], x * T, y * T);
    }
  }

  // ---------- player ----------
  const player = { x: (WELL.x + 0.5) * T, y: (PLAZA.y + PLAZA.h - 1) * T + 10, face: 1, moving: false, walkT: 0, path: null, then: null };
  const SPEED = 72; // world px / second
  const HB = { w: 10, h: 6 }; // feet hitbox

  function blockedAt(px, py) {
    const x0 = Math.floor((px - HB.w / 2) / T), x1 = Math.floor((px + HB.w / 2 - 0.01) / T);
    const y0 = Math.floor((py - HB.h) / T), y1 = Math.floor((py - 0.01) / T);
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if (!inMap(x, y) || solid[idx(x, y)]) return true;
    return false;
  }
  function tryMove(dx, dy) {
    let moved = false;
    if (dx && !blockedAt(player.x + dx, player.y)) { player.x += dx; moved = true; }
    if (dy && !blockedAt(player.x, player.y + dy)) { player.y += dy; moved = true; }
    return moved;
  }
  const tileOf = (px, py) => [Math.floor(px / T), Math.floor((py - 1) / T)];

  // grid path for tap-to-move
  function findPath(sx, sy, tx, ty) {
    if (!inMap(tx, ty) || solid[idx(tx, ty)]) return null;
    const prev = new Int32Array(N).fill(-2), q = [idx(sx, sy)];
    prev[idx(sx, sy)] = -1;
    while (q.length) {
      const c = q.shift(), x = c % W, y = (c / W) | 0;
      if (x === tx && y === ty) {
        const out = [];
        for (let s = c; s !== -1; s = prev[s]) out.unshift([s % W, (s / W) | 0]);
        return out.slice(1);
      }
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nx = x + dx, ny = y + dy;
        if (inMap(nx, ny) && !solid[idx(nx, ny)] && prev[idx(nx, ny)] === -2) { prev[idx(nx, ny)] = c; q.push(idx(nx, ny)); }
      }
    }
    return null;
  }

  // ---------- input ----------
  const keys = new Set();
  const KEYMAP = { ArrowUp: "up", KeyW: "up", ArrowDown: "down", KeyS: "down", ArrowLeft: "left", KeyA: "left", ArrowRight: "right", KeyD: "right" };
  const isTouch = matchMedia("(pointer: coarse)").matches;
  let uiOpen = true; // intro is showing

  addEventListener("keydown", (e) => {
    if (e.key === "Escape") { if (!panelOverlay.hidden) closePanel(); return; }
    if (uiOpen) return;
    const dir = KEYMAP[e.code];
    if (dir) { keys.add(dir); player.path = null; e.preventDefault(); fadeHint(); }
    if (e.code === "KeyE" || e.code === "Space" || e.code === "Enter") { e.preventDefault(); interact(); }
  });
  addEventListener("keyup", (e) => { const dir = KEYMAP[e.code]; if (dir) keys.delete(dir); });
  addEventListener("blur", () => keys.clear());

  document.querySelectorAll(".dpad button").forEach((btn) => {
    const dir = btn.dataset.dir;
    const on = (e) => { e.preventDefault(); if (uiOpen) return; keys.add(dir); player.path = null; btn.classList.add("held"); };
    const off = (e) => { e.preventDefault(); keys.delete(dir); btn.classList.remove("held"); };
    btn.addEventListener("pointerdown", on);
    btn.addEventListener("pointerup", off);
    btn.addEventListener("pointerleave", off);
    btn.addEventListener("pointercancel", off);
  });
  const aBtn = document.getElementById("aBtn");
  aBtn.addEventListener("pointerdown", (e) => { e.preventDefault(); aBtn.classList.add("held"); if (!uiOpen) interact(); });
  aBtn.addEventListener("pointerup", () => aBtn.classList.remove("held"));

  // ---------- canvas & camera ----------
  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");
  let S = 4, camX = 0, camY = 0, dpr = 1;
  function resize() {
    dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(innerWidth * dpr);
    canvas.height = Math.round(innerHeight * dpr);
    const tilesW = innerWidth < 700 ? 13 : 24, tilesH = innerWidth < 700 ? 16 : 14;
    S = Math.max(2, Math.floor(Math.min(canvas.width / (T * tilesW), canvas.height / (T * tilesH))));
    ctx.imageSmoothingEnabled = false;
  }
  addEventListener("resize", resize);
  resize();

  function updateCamera(snap) {
    const vw = canvas.width / S, vh = canvas.height / S;
    const tx = W * T <= vw ? (W * T - vw) / 2 : Math.min(Math.max(player.x - vw / 2, 0), W * T - vw);
    const ty = H * T <= vh ? (H * T - vh) / 2 : Math.min(Math.max(player.y - 8 - vh / 2, 0), H * T - vh);
    const k = snap ? 1 : 0.15;
    camX += (tx - camX) * k; camY += (ty - camY) * k;
  }

  canvas.addEventListener("pointerdown", (e) => {
    if (uiOpen) return;
    fadeHint();
    const wx = (e.clientX * dpr) / S + camX, wy = (e.clientY * dpr) / S + camY;
    const tx = Math.floor(wx / T), ty = Math.floor(wy / T);
    if (!inMap(tx, ty)) return;
    const [px, py] = tileOf(player.x, player.y);
    const b = owner[idx(tx, ty)] || labelHit(e.clientX * dpr, e.clientY * dpr);
    const npc = NPCS.find((n) => n.x === tx && n.y === ty);
    let goal = [tx, ty], then = null;
    if (b) { goal = [b.doorX, b.doorY + 1]; then = { type: "building", b }; }
    else if (npc || (tx === WELL.x && ty === WELL.y)) {
      const target = npc || WELL;
      const options = [[0, 1], [0, -1], [-1, 0], [1, 0]].map(([dx, dy]) => [target.x + dx, target.y + dy]).filter(([x, y]) => inMap(x, y) && !solid[idx(x, y)]);
      options.sort((a, c) => Math.hypot(a[0] - px, a[1] - py) - Math.hypot(c[0] - px, c[1] - py));
      if (!options.length) return;
      goal = options[0]; then = { type: npc ? "npc" : "well", npc };
    }
    if (px === goal[0] && py === goal[1]) { if (then) runThen(then); return; }
    const p = findPath(px, py, goal[0], goal[1]);
    if (p) { player.path = p; player.then = then; play("click", 0.25); }
  });

  // ---------- interaction ----------
  const promptEl = document.getElementById("prompt");
  const bubbleEl = document.createElement("div");
  bubbleEl.className = "bubble"; bubbleEl.hidden = true;
  document.body.appendChild(bubbleEl);
  let bubble = null; // { anchor:{x,y}, lines, i }

  function focusTarget() {
    const [px, py] = tileOf(player.x, player.y);
    const b = BUILDINGS.find((b) => b.doorX === px && b.doorY + 1 === py);
    if (b) return { type: "building", b };
    for (const n of NPCS) if (Math.abs(n.x - px) + Math.abs(n.y - py) === 1) return { type: "npc", npc: n };
    if (Math.abs(WELL.x - px) + Math.abs(WELL.y - py) === 1) return { type: "well" };
    return null;
  }
  function interact() {
    if (bubble) { advanceBubble(); return; }
    const f = focusTarget();
    if (f) runThen(f);
  }
  function runThen(f) {
    if (f.type === "building") openBuilding(f.b);
    else if (f.type === "npc") { player.face = f.npc.x < player.x / T ? -1 : 1; showBubble(f.npc, D().npcs[f.npc.id]); play("talk", 0.4); }
    else if (f.type === "well") { showBubble(WELL, D().npcs.well); play("coin", 0.5); }
  }
  function showBubble(anchor, lines) { bubble = { anchor, lines, i: 0 }; renderBubble(); }
  function hideBubble() { bubble = null; bubbleEl.hidden = true; }
  function advanceBubble() {
    bubble.i++;
    if (bubble.i >= bubble.lines.length) { hideBubble(); return; }
    play("talk", 0.3); renderBubble();
  }
  function renderBubble() {
    bubbleEl.hidden = false;
    const more = bubble.i < bubble.lines.length - 1;
    bubbleEl.innerHTML = `${esc(bubble.lines[bubble.i])}<span class="more">${more ? "▼" : "✕"}</span>`;
  }
  bubbleEl.addEventListener("pointerdown", (e) => { e.stopPropagation(); if (bubble) advanceBubble(); });

  function updatePrompt() {
    if (uiOpen || bubble) { promptEl.hidden = true; return; }
    const f = focusTarget();
    if (!f) { promptEl.hidden = true; return; }
    const u = U(), key = isTouch ? "A" : "E";
    const what = f.type === "building" ? u.enter(placeName(f.b)) : f.type === "npc" ? u.talk : u.wish;
    const html = `${u.press} <kbd>${key}</kbd> ${esc(what)}`;
    if (promptEl.innerHTML !== html) promptEl.innerHTML = html;
    promptEl.hidden = false;
  }

  // ---------- panels ----------
  const panelOverlay = document.getElementById("panelOverlay");
  const panelBody = document.getElementById("panelBody");
  const visited = new Set();
  try { JSON.parse(localStorage.getItem("town-visited") || "[]").forEach((id) => { if (BUILDINGS.some((b) => b.id === id)) visited.add(id); }); } catch (e) {}
  let celebrated = visited.size >= BUILDINGS.length;
  let lastFocus = null;
  let caseIdx = 0; // which UX case is open in the design studio

  function esc(s) { return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }
  const chips = (list, cls = "") => list && list.length ? `<ul class="chips ${cls}">${list.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>` : "";
  const link = (url, text) => `<a href="${esc(url)}" target="_blank" rel="noopener">${esc(text)}</a>`;
  const contactButtons = () => `<div class="links">
      <a class="btn btn-primary" href="${PDF[lang]}" download>${esc(U().download)}</a>
      <a class="btn" href="mailto:${esc(D().email)}">✉ Email</a>
      ${D().links.map((l) => `<a class="btn" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}</a>`).join("")}</div>`;
  function projectCard(p) {
    return `<div class="card"><h3>${p.url ? link(p.url, p.title) + " ↗" : esc(p.title)}</h3>
      <ul>${p.points.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>${chips(p.tech)}</div>`;
  }
  function jobPanel(id) {
    const j = D().jobs.find((j) => j.id === id);
    return `<h2 id="panelTitle">${esc(j.company)}</h2><p class="sub"><b>${esc(j.role)}</b> · ${esc(j.period)}</p>
      ${j.lead ? `<p class="lead-note">✨ ${esc(j.lead)}</p>` : ""}${j.projects.map(projectCard).join("")}`;
  }
  const PANELS = {
    home: () => {
      const R = D(), u = U();
      return `<h2 id="panelTitle">${esc(HOME_TITLE[lang])}</h2><p class="sub"><b>${esc(R.title)}</b> · ${esc(R.headline)}</p>
        <p>${esc(R.summary)}</p>
        <h3>${esc(u.focus)}</h3>${R.strengths.map((s) => `<div class="card"><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></div>`).join("")}
        <h3>${esc(u.storyTitle)}</h3><ul class="timeline">${R.story.map((s) => `<li><b>${esc(s.year)}</b><span>${esc(s.text)}</span></li>`).join("")}</ul>
        <h3>${esc(u.contact)}</h3>${contactButtons()}`;
    },
    asus: () => jobPanel("asus"),
    cognito: () => jobPanel("cognito"),
    koo: () => jobPanel("koo"),
    school: () => {
      const R = D(), u = U();
      return `<h2 id="panelTitle">${esc(u.eduTitle)}</h2><p class="sub">${esc(u.eduSub)}</p>
        ${R.education.map((e) => `<div class="card"><h3>${esc(e.school)}</h3><p>${esc(e.program)}<br><small>${esc(e.period)}</small></p></div>`).join("")}
        <h3>${esc(u.certs)}</h3>${chips(R.certs)}<h3>${esc(u.langs)}</h3>${chips(R.languages)}`;
    },
    skills: () => {
      const R = D(), u = U();
      return `<h2 id="panelTitle">${esc(u.skillsTitle)}</h2><p class="sub">${esc(u.skillsSub)}</p>
        ${R.skills.map((g, i) => `<h3>${esc(g.group)}</h3>${chips(g.list, i < 2 ? "strong" : "")}`).join("")}`;
    },
    studio: () => {
      const all = [Object.assign({ id: "ehs-roi" }, D().caseStudy), ...((window.UX_CASE_STUDIES || {})[lang] || [])];
      if (caseIdx >= all.length) caseIdx = 0;
      const C = all[caseIdx], L = C.labels, colon = lang === "zh" ? "：" : ": ";
      const short = (t) => t.replace(/^(案例研究：|Case study: )/, "");
      const scene = (fit) => `<svg viewBox="0 0 220 140" role="img" aria-label="${esc(fit ? C.figure.after : C.figure.before)}">
        <rect width="220" height="140" rx="6" fill="#33424d"/><rect y="70" width="220" height="70" fill="#3d4f5b"/>
        <rect x="18" y="40" width="34" height="46" rx="3" fill="#5c6b75"/><rect x="178" y="30" width="28" height="60" rx="3" fill="#5c6b75"/>
        ${fit ? "" : `<rect x="60" y="20" width="115" height="115" fill="#e4654f" fill-opacity=".28" stroke="#e4654f" stroke-width="2.5" stroke-dasharray="6 4"/>`}
        <polygon points="60,135 110,135 175,20 140,20" fill="#9aa3aa"/>
        ${fit ? `<polygon points="60,135 110,135 175,20 140,20" fill="#8fc65a" fill-opacity=".45" stroke="#8fc65a" stroke-width="2.5"/>
          ${[[60, 135], [110, 135], [175, 20], [140, 20]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="#fff" stroke="#3f2832" stroke-width="2"/>`).join("")}` : ""}
      </svg>`;
      // only the ROI case has a drawn illustration; the others show before/after as text cards
      const figure = C.id === "ehs-roi"
        ? `<div class="figure"><figure>${scene(false)}<figcaption>✕ ${esc(C.figure.before)}</figcaption></figure><figure>${scene(true)}<figcaption>✓ ${esc(C.figure.after)}</figcaption></figure></div>`
        : `<div class="figure text"><div class="ba before"><b>✕</b>${esc(C.figure.before)}</div><div class="ba after"><b>✓</b>${esc(C.figure.after)}</div></div>`;
      return `<p class="eyebrow-sm">${lang === "zh" ? "UX 案例集" : "UX case studies"} · ${caseIdx + 1}/${all.length}</p>
        <ol class="case-tabs">${all.map((c, i) => `<li><button type="button" data-case="${i}" class="${i === caseIdx ? "on" : ""}">${i + 1}. ${esc(short(c.title))}</button></li>`).join("")}</ol>
        <h2 id="panelTitle">${esc(C.title)}</h2><p class="sub"><b>${esc(C.sub)}</b></p>
        <h3>${esc(L.context)}</h3><p>${esc(C.context)}</p>
        <h3>${esc(L.challenges)}</h3><ul>${C.challenges.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
        ${figure}
        <h3>${esc(L.decisions)}</h3>
        ${C.decisions.map((d, i) => `<div class="card decision"><h3><span class="num">${i + 1}</span>${esc(d.title)}</h3>
          <p><b>${esc(L.how)}${colon}</b>${esc(d.how)}</p><p class="why"><b>${esc(L.why)}${colon}</b>${esc(d.why)}</p></div>`).join("")}
        <h3>${esc(L.flow)}</h3><ol class="flow">${C.flow.map((x) => `<li>${esc(x)}</li>`).join("")}</ol>
        ${C.tech ? `<h3>${esc(L.tech)}</h3><p>${esc(C.tech)}</p>` : ""}
        ${C.results && C.results.length ? `<h3>${esc(L.results)}</h3><ul>${C.results.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>` : ""}
        <p class="lead-note">💡 ${esc(C.takeaway)}</p>
        ${caseIdx < all.length - 1 ? `<p class="next-case"><button type="button" class="btn" data-case="${caseIdx + 1}">${lang === "zh" ? "下一個案例" : "Next case"} →</button></p>` : ""}`;
    },
    done: () => `<h2 id="panelTitle">${esc(U().doneTitle)}</h2><p class="sub">${esc(U().doneSub)}</p><p>${esc(U().doneText)}</p>${contactButtons()}`,
  };

  function openPanel(html, sound = "door") {
    panelBody.innerHTML = html;
    panelOverlay.hidden = false;
    uiOpen = true; keys.clear(); player.path = null; hideBubble();
    lastFocus = document.activeElement;
    document.getElementById("panelClose").focus({ preventScroll: true });
    panelOverlay.querySelector(".panel").scrollTop = 0;
    play(sound, 0.45);
  }
  function openBuilding(b) {
    const u = U(), isNew = !visited.has(b.id);
    if (isNew) {
      visited.add(b.id);
      try { localStorage.setItem("town-visited", JSON.stringify([...visited])); } catch (e) {}
      renderProgress();
    }
    if (b.id === "studio") caseIdx = 0;
    openPanel(PANELS[b.id]() + panelFoot(b, isNew));
  }
  function panelFoot(b, isNew = false) {
    const u = U();
    return `<div class="panel-foot"><span>${isNew ? u.visitedNew : u.visitedOld} · ${visited.size}/${BUILDINGS.length}</span><button class="btn" data-close>${esc(u.leave)}</button></div>`;
  }
  function closePanel() {
    panelOverlay.hidden = true;
    uiOpen = false;
    play("close", 0.35);
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
    if (!celebrated && visited.size >= BUILDINGS.length) {
      celebrated = true;
      setTimeout(() => openPanel(PANELS.done(), "done"), 350);
    }
  }
  document.getElementById("panelClose").addEventListener("click", closePanel);
  panelOverlay.addEventListener("click", (e) => {
    const pick = e.target.closest("[data-case]");
    if (pick) {
      caseIdx = Number(pick.dataset.case);
      panelBody.innerHTML = PANELS.studio() + panelFoot(BUILDINGS.find((b) => b.id === "studio"));
      panelOverlay.querySelector(".panel").scrollTop = 0;
      play("click", 0.3);
      return;
    }
    if (e.target === panelOverlay || e.target.closest("[data-close]")) closePanel();
  });

  const progressEl = document.getElementById("progress");
  function renderProgress() {
    progressEl.innerHTML = BUILDINGS.map((b) => `<span class="dot ${visited.has(b.id) ? "on" : ""}" title="${esc(placeName(b))}"></span>`).join("") +
      `<span class="label">${visited.size}/${BUILDINGS.length}</span>`;
    progressEl.setAttribute("aria-label", U().progressLabel(visited.size, BUILDINGS.length));
  }

  // ---------- static UI text & language switch ----------
  const intro = document.getElementById("intro");
  function applyLang() {
    const u = U(), R = D();
    document.documentElement.lang = lang === "zh" ? "zh-Hant" : "en";
    document.querySelectorAll("[data-t]").forEach((el) => { el.textContent = u[el.dataset.t]; });
    document.querySelectorAll("[data-t-html]").forEach((el) => { el.innerHTML = u[el.dataset.tHtml]; });
    for (const id of ["classicBtn", "introClassicBtn"]) document.getElementById(id).href = `resume.html?lang=${lang}`;
    document.getElementById("introContact").innerHTML = `
      <a class="contact-mail" href="mailto:${esc(R.email)}">✉ ${esc(R.email)}</a>
      <div class="contact-row">${R.links.map((l) => `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}</a>`).join("")}
        <a class="dl" href="${PDF[lang]}" download>${esc(u.download)}</a></div>`;
    renderProgress();
    if (bubble) hideBubble();
  }
  function toggleLang() {
    lang = lang === "zh" ? "en" : "zh";
    try { localStorage.setItem("town-lang", lang); } catch (e) {}
    history.replaceState(null, "", `?lang=${lang}`);
    applyLang();
    play("click", 0.3);
  }
  document.getElementById("langBtn").addEventListener("click", toggleLang);
  document.getElementById("introLangBtn").addEventListener("click", toggleLang);
  applyLang();

  function start() {
    intro.hidden = true; uiOpen = false;
    play("talk", 0.4);
  }
  document.getElementById("startBtn").addEventListener("click", start);
  if (location.hash === "#resume") location.replace(`resume.html?lang=${lang}`);

  const muteBtn = document.getElementById("muteBtn");
  const renderMute = () => { muteBtn.textContent = muted ? "🔇" : "🔊"; muteBtn.setAttribute("aria-pressed", String(muted)); };
  muteBtn.addEventListener("click", () => {
    muted = !muted; renderMute();
    try { localStorage.setItem("town-muted", muted ? "1" : "0"); } catch (e) {}
  });
  renderMute();

  const hintEl = document.getElementById("hint");
  let hintFaded = false;
  function fadeHint() { if (!hintFaded) { hintFaded = true; setTimeout(() => hintEl.classList.add("fade"), 4000); } }

  // ---------- update ----------
  let stepTimer = 0, stepAlt = 0, bumpCooldown = 0;
  function update(dt) {
    let dx = 0, dy = 0;
    if (!uiOpen) {
      if (keys.has("left")) dx -= 1;
      if (keys.has("right")) dx += 1;
      if (keys.has("up")) dy -= 1;
      if (keys.has("down")) dy += 1;
      if (!dx && !dy && player.path && player.path.length) {
        const [tx, ty] = player.path[0];
        const gx = (tx + 0.5) * T, gy = (ty + 1) * T - 4;
        const ex = gx - player.x, ey = gy - player.y, d = Math.hypot(ex, ey);
        if (d < 1.5) { player.x = gx; player.y = gy; player.path.shift(); }
        else { dx = ex / d; dy = ey / d; }
        if (!player.path.length) { player.path = null; const t = player.then; player.then = null; if (t) runThen(t); }
      }
    }
    if (dx && dy && !player.path) { dx *= Math.SQRT1_2; dy *= Math.SQRT1_2; }
    player.moving = !!(dx || dy);
    if (player.moving) {
      if (bubble) hideBubble();
      if (dx) player.face = dx < 0 ? -1 : 1;
      const moved = tryMove(dx * SPEED * dt, dy * SPEED * dt);
      player.walkT += dt;
      stepTimer -= dt;
      if (moved && stepTimer <= 0) { play(stepAlt++ % 2 ? "step1" : "step0", 0.18); stepTimer = 0.32; }
      // walking up into a door opens it
      bumpCooldown -= dt;
      if (!moved && dy < 0 && bumpCooldown <= 0) {
        const f = focusTarget();
        if (f && f.type === "building") { bumpCooldown = 0.6; openBuilding(f.b); }
      }
    } else player.walkT = 0;
  }

  // ---------- render ----------
  const labelBoxes = [];
  function labelHit(sx, sy) {
    const hit = labelBoxes.find((l) => sx >= l.x && sx <= l.x + l.w && sy >= l.y && sy <= l.y + l.h);
    return hit ? hit.b : null;
  }
  function drawChar(t, wx, wy, flip, bob) {
    const sx = Math.round((wx - camX) * S), sy = Math.round((wy - camY) * S);
    ctx.fillStyle = "rgba(40,30,30,.25)";
    ctx.beginPath(); ctx.ellipse(sx, sy - S, 5 * S, 2 * S, 0, 0, Math.PI * 2); ctx.fill();
    ctx.save();
    ctx.translate(sx, sy - Math.round(bob * S));
    if (flip) ctx.scale(-1, 1);
    ctx.drawImage(SHEETS.chars, (t % 12) * T, Math.floor(t / 12) * T, T, T, -8 * S, -16 * S, T * S, T * S);
    ctx.restore();
  }
  function roundRect(x, y, w, h, r) { ctx.beginPath(); ctx.roundRect ? ctx.roundRect(x, y, w, h, r) : ctx.rect(x, y, w, h); }

  function render(time) {
    ctx.imageSmoothingEnabled = false;
    ctx.fillStyle = "#6aa84f";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const cx = Math.round(camX * S) / S, cy = Math.round(camY * S) / S;
    ctx.drawImage(mapCanvas, -cx * S, -cy * S, W * T * S, H * T * S);

    // characters, sorted by y
    const ents = NPCS.map((n) => ({ y: (n.y + 1) * T - 3, draw: () => drawChar(n.sprite, (n.x + 0.5) * T, (n.y + 1) * T - 3, n.x * T > player.x, Math.sin(time / 400 + n.x) > 0.6 ? 1 : 0) }));
    const bob = player.moving ? Math.abs(Math.sin(player.walkT * 14)) * 1.5 : 0;
    ents.push({ y: player.y, draw: () => drawChar(99, player.x, player.y, player.face < 0, bob) });
    ents.sort((a, b) => a.y - b.y).forEach((e) => e.draw());

    // building signs
    const fs = Math.max(14 * dpr, Math.round(4.2 * S));
    const fontMain = `700 ${fs}px "Noto Sans TC", sans-serif`, fontSub = `400 ${Math.round(fs * 0.72)}px "Silkscreen", "Noto Sans TC", sans-serif`;
    labelBoxes.length = 0;
    for (const b of BUILDINGS) {
      const sx = ((b.x + b.w / 2) * T - camX) * S, sy = (b.y * T - camY) * S - fs * 0.6;
      const t1 = placeName(b), t2 = placeSub(b), seen = visited.has(b.id);
      ctx.font = fontMain; const w1 = ctx.measureText(t1).width;
      ctx.font = fontSub; const w2 = ctx.measureText(t2).width;
      const pad = fs * 0.5, bw = Math.max(w1, w2) + pad * 2 + (seen ? fs * 1.1 : 0), bh = fs * 2.2;
      const bx = sx - bw / 2, by = sy - bh;
      ctx.fillStyle = "#3f2832"; roundRect(bx, by + dpr * 2, bw, bh, fs * 0.3); ctx.fill();
      ctx.fillStyle = "#fbf1dc"; roundRect(bx, by, bw, bh, fs * 0.3); ctx.fill();
      ctx.lineWidth = Math.max(2, dpr * 2); ctx.strokeStyle = "#3f2832"; ctx.stroke();
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      const shift = seen ? fs * 0.55 : 0;
      ctx.fillStyle = "#3f2832"; ctx.font = fontMain;
      ctx.fillText(t1, sx + shift, by + bh * 0.36);
      ctx.fillStyle = "#8a5a4a"; ctx.font = fontSub;
      ctx.fillText(t2, sx + shift, by + bh * 0.72);
      if (seen) {
        ctx.fillStyle = "#e4a72b"; ctx.font = `700 ${fs}px sans-serif`;
        ctx.fillText("★", bx + pad + fs * 0.45, by + bh / 2);
      }
      labelBoxes.push({ b, x: bx, y: by, w: bw, h: bh });
    }

    // bouncing arrow over the focused door / npc
    const f = !uiOpen && focusTarget();
    if (f) {
      const ax = f.type === "building" ? f.b.doorX : f.type === "npc" ? f.npc.x : WELL.x;
      const ay = f.type === "building" ? f.b.doorY : f.type === "npc" ? f.npc.y - 1 : WELL.y - 1;
      const px = ((ax + 0.5) * T - camX) * S, py = ((ay + 0.15) * T - camY) * S + Math.sin(time / 160) * 2 * S;
      ctx.fillStyle = "#ffd35c"; ctx.strokeStyle = "#3f2832"; ctx.lineWidth = Math.max(2, S / 2);
      ctx.beginPath(); ctx.moveTo(px - 3.5 * S, py - 4 * S); ctx.lineTo(px + 3.5 * S, py - 4 * S); ctx.lineTo(px, py); ctx.closePath(); ctx.fill(); ctx.stroke();
    }

    // tap-to-move target marker
    if (player.path && player.path.length) {
      const [tx, ty] = player.path[player.path.length - 1];
      const mx = ((tx + 0.5) * T - camX) * S, my = ((ty + 0.75) * T - camY) * S;
      ctx.strokeStyle = "rgba(255,255,255,.85)"; ctx.lineWidth = Math.max(2, S / 2);
      ctx.beginPath(); ctx.ellipse(mx, my, 5 * S, 2.5 * S, 0, 0, Math.PI * 2); ctx.stroke();
    }

    // speech bubble follows its anchor
    if (bubble) {
      const a = bubble.anchor;
      const bx = ((a.x + 0.5) * T - camX) * S / dpr, by = (a.y * T - camY) * S / dpr - 6;
      bubbleEl.style.left = `${Math.min(Math.max(bx, 150), innerWidth - 150)}px`;
      bubbleEl.style.top = `${Math.max(by, 120)}px`;
    }
  }

  // ---------- loop ----------
  let last = performance.now();
  function frame(now) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    update(dt);
    updateCamera(false);
    render(now);
    updatePrompt();
    requestAnimationFrame(frame);
  }
  Promise.all(Object.values(SHEETS).map((i) => i.decode ? i.decode().catch(() => {}) : null)).then(() => {
    prerender();
    window.__town = { mapCanvas, player, BUILDINGS }; // handy for debugging in devtools
    updateCamera(true);
    requestAnimationFrame(frame);
  });
})();
