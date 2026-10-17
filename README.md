from pathlib import Path
import zipfile, textwrap, os

base = Path("/mnt/data/nexus-gaming-upgrade")
(base / "css").mkdir(parents=True, exist_ok=True)
(base / "js").mkdir(parents=True, exist_ok=True)

index_html = r'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="theme-color" content="#090a12">
  <meta name="description" content="NEXUS GAMING — discover games, explore genres, and join the arena.">
  <title>NEXUS GAMING — Enter the Arena</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Orbitron:wght@500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
  <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
  <script src="js/script.js" defer></script>
</head>
<body>
  <div class="ambient ambient-one"></div><div class="ambient ambient-two"></div>
  <header class="site-header">
    <a class="brand" href="#home" aria-label="NEXUS GAMING home"><span class="brand-mark">N</span><span>NEXUS<span class="brand-light"> GAMING</span></span></a>
    <button class="menu-toggle" id="menuToggle" aria-label="Toggle navigation" aria-expanded="false">☰</button>
    <nav class="nav-links" id="navLinks">
      <a href="#home" class="active">Home</a><a href="#games">Games</a><a href="#arcade">Mini Game</a><a href="#community">Community</a>
    </nav>
    <a class="header-cta" href="#games">Explore games <span>↗</span></a>
  </header>

  <main>
    <section class="hero section-wrap" id="home">
      <div class="hero-copy">
        <div class="eyebrow"><span class="status-dot"></span> YOUR NEXT LEVEL STARTS HERE</div>
        <h1>ENTER THE<br><span class="gradient-text">ARENA.</span></h1>
        <p class="hero-description">Discover your next obsession. Explore worlds, find your squad, and play beyond limits.</p>
        <div class="hero-actions"><a class="button button-primary" href="#games">Explore games <span>↗</span></a><a class="button button-ghost" href="#community"><span class="play-icon">▶</span> Join the community</a></div>
        <div class="hero-proof"><div class="avatar-stack"><span>G</span><span>N</span><span>X</span></div><p><strong>Game on, your way.</strong><br><span>Find something worth playing.</span></p></div>
      </div>
      <div class="hero-art" aria-label="Decorative futuristic gaming illustration">
        <div class="orbit orbit-outer"></div><div class="orbit orbit-inner"></div>
        <div class="hero-core"><div class="core-symbol">N<span>✦</span></div><div class="core-caption">NEXUS / SYSTEM ONLINE</div></div>
        <div class="float-card float-card-top"><span class="tiny-icon purple">✦</span><div><strong>PLAY YOUR WAY</strong><small>Discover new worlds</small></div></div>
        <div class="float-card float-card-bottom"><span class="tiny-icon mint">◉</span><div><strong>THE ARENA IS OPEN</strong><small>Find your next game</small></div></div>
        <div class="art-spark spark-one">✧</div><div class="art-spark spark-two">✦</div>
      </div>
    </section>

    <section class="stats-grid section-wrap" aria-label="Website statistics">
      <article class="stat-card"><div class="stat-top"><span class="stat-icon live-icon">◉</span><span class="live-label"><i></i> LIVE</span></div><p class="stat-value" id="liveVisitors">—</p><p class="stat-name">Visitors online</p><p class="stat-note" id="liveStatus">Connecting to live presence…</p></article>
      <article class="stat-card"><div class="stat-top"><span class="stat-icon total-icon">↗</span><span class="stat-tag">ALL TIME</span></div><p class="stat-value" id="totalVisits">—</p><p class="stat-name">Total visits</p><p class="stat-note" id="totalStatus">Loading shared visit count…</p></article>
      <article class="stat-card"><div class="stat-top"><span class="stat-icon game-icon">⌘</span><span class="stat-tag">DISCOVER</span></div><p class="stat-value">06</p><p class="stat-name">Featured games</p><p class="stat-note">Your next adventure awaits</p></article>
    </section>

    <section class="section-wrap games-section" id="games">
      <div class="section-heading"><div><div class="eyebrow">PICK YOUR NEXT ADVENTURE</div><h2>Explore the <span class="gradient-text">collection.</span></h2><p>From tactical battles to unexplored galaxies, there’s a world waiting for you.</p></div><span class="section-count">06 <span>GAMES</span></span></div>
      <div class="game-tools"><label class="search-box"><span>⌕</span><input id="gameSearch" type="search" placeholder="Search games..." aria-label="Search games"></label><div class="filter-list" id="filterList"><button class="filter-btn active" data-filter="all">All games</button><button class="filter-btn" data-filter="action">Action</button><button class="filter-btn" data-filter="adventure">Adventure</button><button class="filter-btn" data-filter="strategy">Strategy</button><button class="filter-btn" data-filter="favorites">♥ Favorites</button></div><select id="sortGames" class="sort-select" aria-label="Sort games"><option value="featured">Featured</option><option value="az">Name: A–Z</option><option value="za">Name: Z–A</option></select></div>
      <div class="games-grid" id="gamesGrid">
        <article class="game-card" data-name="Cyber Strike" data-genre="action" data-rating="4.9" data-description="Dive into a neon-soaked future where every decision matters. Master fast movement, sharp aim, and high-tech gear in the ultimate cyber arena."><div class="game-art art-cyber"><span class="art-label">NEXUS ORIGINAL</span><span class="game-symbol">⌁</span><span class="art-word">CYBER<br>STRIKE</span><span class="art-orb"></span></div><div class="game-info"><div class="game-meta"><span class="genre-pill">ACTION</span><span class="rating">★ 4.9</span></div><h3>Cyber Strike</h3><p>Fast-paced futuristic combat.</p><div class="card-bottom"><button class="details-btn" data-details>Game details <span>↗</span></button><button class="favorite-btn" aria-label="Add Cyber Strike to favorites" aria-pressed="false">♡</button></div></div></article>
        <article class="game-card" data-name="Mystic Realms" data-genre="adventure" data-rating="4.8" data-description="Travel through enchanted forests, ancient ruins, and mysterious lands. Discover hidden lore and shape your own fantasy adventure."><div class="game-art art-mystic"><span class="art-label">FANTASY / RPG</span><span class="game-symbol">✧</span><span class="art-word">MYSTIC<br>REALMS</span><span class="art-orb"></span></div><div class="game-info"><div class="game-meta"><span class="genre-pill">ADVENTURE</span><span class="rating">★ 4.8</span></div><h3>Mystic Realms</h3><p>A world full of hidden magic.</p><div class="card-bottom"><button class="details-btn" data-details>Game details <span>↗</span></button><button class="favorite-btn" aria-label="Add Mystic Realms to favorites" aria-pressed="false">♡</button></div></div></article>
        <article class="game-card" data-name="Shadow Ops" data-genre="strategy" data-rating="4.7" data-description="Plan the mission, coordinate your squad, and outsmart your opponents. Every move counts in this tactical strategy experience."><div class="game-art art-shadow"><span class="art-label">TACTICAL / ELITE</span><span class="game-symbol">⌖</span><span class="art-word">SHADOW<br>OPS</span><span class="art-orb"></span></div><div class="game-info"><div class="game-meta"><span class="genre-pill">STRATEGY</span><span class="rating">★ 4.7</span></div><h3>Shadow Ops</h3><p>Think ahead. Strike precisely.</p><div class="card-bottom"><button class="details-btn" data-details>Game details <span>↗</span></button><button class="favorite-btn" aria-label="Add Shadow Ops to favorites" aria-pressed="false">♡</button></div></div></article>
        <article class="game-card" data-name="Galaxy Drift" data-genre="action" data-rating="4.8" data-description="Race through distant star systems, dodge cosmic hazards, and push your ship to the edge in a high-speed space adventure."><div class="game-art art-galaxy"><span class="art-label">COSMIC / RACING</span><span class="game-symbol">✦</span><span class="art-word">GALAXY<br>DRIFT</span><span class="art-orb"></span></div><div class="game-info"><div class="game-meta"><span class="genre-pill">ACTION</span><span class="rating">★ 4.8</span></div><h3>Galaxy Drift</h3><p>Race beyond the stars.</p><div class="card-bottom"><button class="details-btn" data-details>Game details <span>↗</span></button><button class="favorite-btn" aria-label="Add Galaxy Drift to favorites" aria-pressed="false">♡</button></div></div></article>
        <article class="game-card" data-name="Kingdom Rise" data-genre="strategy" data-rating="4.6" data-description="Build a kingdom from the ground up, manage resources, forge alliances, and lead your people to victory."><div class="game-art art-kingdom"><span class="art-label">BUILD / CONQUER</span><span class="game-symbol">♜</span><span class="art-word">KINGDOM<br>RISE</span><span class="art-orb"></span></div><div class="game-info"><div class="game-meta"><span class="genre-pill">STRATEGY</span><span class="rating">★ 4.6</span></div><h3>Kingdom Rise</h3><p>Build your legacy.</p><div class="card-bottom"><button class="details-btn" data-details>Game details <span>↗</span></button><button class="favorite-btn" aria-label="Add Kingdom Rise to favorites" aria-pressed="false">♡</button></div></div></article>
        <article class="game-card" data-name="Lost Horizon" data-genre="adventure" data-rating="4.9" data-description="Explore an abandoned world filled with forgotten secrets. Follow the clues, solve ancient puzzles, and uncover the story behind the horizon."><div class="game-art art-horizon"><span class="art-label">EXPLORE / DISCOVER</span><span class="game-symbol">⌁</span><span class="art-word">LOST<br>HORIZON</span><span class="art-orb"></span></div><div class="game-info"><div class="game-meta"><span class="genre-pill">ADVENTURE</span><span class="rating">★ 4.9</span></div><h3>Lost Horizon</h3><p>Every mystery has a beginning.</p><div class="card-bottom"><button class="details-btn" data-details>Game details <span>↗</span></button><button class="favorite-btn" aria-label="Add Lost Horizon to favorites" aria-pressed="false">♡</button></div></div></article>
      </div>
      <p class="empty-state" id="emptyState" hidden>No games match that search. Try another name or category.</p>
    </section>

    <section class="section-wrap arcade-section" id="arcade"><div class="arcade-panel"><div class="arcade-copy"><div class="eyebrow">A QUICK CHALLENGE</div><h2>Test your <span class="gradient-text">instinct.</span></h2><p>Guess the secret number between 1 and 20. Can you find it in six tries?</p><div class="arcade-tip"><span>✦</span> A little brain training between battles.</div></div><form class="guess-panel" id="guessForm"><label for="guessInput">YOUR GUESS <span>01 — 20</span></label><div class="guess-row"><input id="guessInput" type="number" min="1" max="20" placeholder="?" required><button class="button button-primary" type="submit">Guess <span>↗</span></button></div><p id="guessMessage" aria-live="polite">Ready when you are.</p><button class="reset-game" type="button" id="resetGuess">↻ New round</button></form></div></section>

    <section class="section-wrap community-section" id="community"><div class="community-panel"><div><div class="eyebrow">YOUR NEXT PARTY STARTS HERE</div><h2>Good games.<br><span class="gradient-text">Great company.</span></h2><p>Bring your curiosity, discover new favorites, and make the arena yours.</p></div><a class="button button-primary" href="#games">Find your next game <span>↗</span></a></div></section>
  </main>

  <footer class="site-footer"><a class="brand" href="#home"><span class="brand-mark">N</span><span>NEXUS<span class="brand-light"> GAMING</span></span></a><p>Made for the love of the game.</p><span>© <span id="year"></span> NEXUS GAMING</span></footer>

  <dialog class="game-dialog" id="gameDialog"><button class="dialog-close" id="closeDialog" aria-label="Close dialog">×</button><div class="eyebrow">GAME INTEL</div><h2 id="dialogTitle">Game title</h2><p id="dialogDescription"></p><div class="dialog-meta"><span id="dialogGenre"></span><span id="dialogRating"></span></div><button class="button button-primary" id="dialogDone">Back to collection</button></dialog>
</body>
</html>
'''

style_css = r'''*{box-sizing:border-box} :root{--bg:#090a12;--panel:rgba(22,24,39,.72);--panel2:rgba(255,255,255,.035);--line:rgba(255,255,255,.09);--text:#f4f3ff;--muted:#999bb2;--purple:#a08bff;--mint:#6cebd1;--radius:22px}html{scroll-behavior:smooth;scroll-padding-top:90px}body{margin:0;background:radial-gradient(ellipse at 15% 5%,rgba(103,71,190,.15),transparent 38%),radial-gradient(ellipse at 92% 40%,rgba(28,145,147,.08),transparent 30%),var(--bg);color:var(--text);font-family:"DM Sans",sans-serif;line-height:1.6;overflow-x:hidden}body:before{content:"";position:fixed;inset:0;pointer-events:none;opacity:.16;background-image:linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px);background-size:56px 56px;mask-image:linear-gradient(to bottom,black,transparent 85%);z-index:-1}.ambient{position:absolute;filter:blur(90px);border-radius:50%;pointer-events:none;z-index:-1}.ambient-one{width:250px;height:250px;background:#4c2b9b;opacity:.18;top:360px;left:-150px}.ambient-two{width:240px;height:240px;background:#087c77;opacity:.12;top:1200px;right:-160px}a{color:inherit;text-decoration:none}button,input,select{font:inherit}button,a{ -webkit-tap-highlight-color:transparent}.section-wrap{width:min(1120px,calc(100% - 48px));margin-inline:auto}.site-header{height:78px;display:flex;align-items:center;justify-content:space-between;width:min(1200px,calc(100% - 48px));margin:auto;border-bottom:1px solid rgba(255,255,255,.07);position:relative;z-index:5}.brand{display:flex;align-items:center;gap:10px;font-family:Orbitron,sans-serif;font-size:14px;font-weight:800;letter-spacing:.04em;white-space:nowrap}.brand-mark{display:grid;place-items:center;width:34px;height:34px;border:1px solid rgba(160,139,255,.65);border-radius:10px;color:#c5b7ff;background:linear-gradient(135deg,rgba(160,139,255,.22),rgba(108,235,209,.08));box-shadow:0 0 24px rgba(160,139,255,.13);font-size:20px}.brand-light{font-weight:500;color:#a5a5bc}.nav-links{display:flex;align-items:center;gap:30px;color:#a6a6bc;font-size:13px}.nav-links a{transition:color .2s}.nav-links a:hover,.nav-links a.active{color:white}.header-cta{border:1px solid var(--line);padding:10px 15px;border-radius:11px;font-size:12px;font-weight:700;background:rgba(255,255,255,.035)}.header-cta span{color:var(--mint);margin-left:8px}.menu-toggle{display:none;background:transparent;border:0;color:white;font-size:24px}.hero{min-height:495px;display:grid;grid-template-columns:1fr 1fr;align-items:center;gap:30px;padding-top:52px;padding-bottom:48px}.eyebrow{font-size:10px;letter-spacing:.19em;font-weight:700;color:#a8a1ca;display:flex;align-items:center;gap:9px}.status-dot,.live-label i{width:7px;height:7px;border-radius:50%;background:var(--mint);box-shadow:0 0 12px rgba(108,235,209,.9);display:inline-block}.hero h1{font:800 clamp(45px,6vw,76px)/1.07 Orbitron,sans-serif;letter-spacing:-.055em;margin:22px 0 18px}.gradient-text{background:linear-gradient(100deg,#b4a2ff 5%,#8bceef 52%,#6cebd1 100%);color:transparent;background-clip:text;-webkit-background-clip:text}.hero-description{max-width:440px;color:var(--muted);font-size:15px;line-height:1.85}.hero-actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:28px}.button{display:inline-flex;align-items:center;justify-content:center;gap:15px;border:0;border-radius:12px;padding:13px 18px;font-size:12px;font-weight:700;cursor:pointer;transition:transform .2s,box-shadow .2s}.button:hover{transform:translateY(-2px)}.button-primary{color:#11121b;background:linear-gradient(105deg,#b7a7ff,#7ce8d8);box-shadow:0 8px 28px rgba(137,178,239,.16)}.button-primary span{font-size:16px}.button-ghost{background:rgba(255,255,255,.035);border:1px solid var(--line);color:#e8e7f4}.play-icon{font-size:10px;color:var(--mint)}.hero-proof{display:flex;align-items:center;gap:13px;margin-top:34px}.avatar-stack{display:flex;padding-left:3px}.avatar-stack span{display:grid;place-items:center;width:29px;height:29px;margin-left:-4px;border-radius:50%;border:2px solid var(--bg);background:linear-gradient(135deg,#4d437e,#202e49);font-size:10px;font-weight:800}.avatar-stack span:nth-child(2){background:linear-gradient(135deg,#276e75,#2e3d5c)}.avatar-stack span:nth-child(3){background:linear-gradient(135deg,#8e5b79,#42365f)}.hero-proof p{margin:0;font-size:11px;line-height:1.6}.hero-proof p span{color:var(--muted)}.hero-art{height:370px;position:relative;display:grid;place-items:center;isolation:isolate}.hero-art:before{content:"";position:absolute;width:250px;height:250px;border-radius:50%;background:radial-gradient(circle,rgba(122,96,239,.25),rgba(60,205,191,.06) 54%,transparent 72%);filter:blur(8px)}.orbit{position:absolute;border:1px solid rgba(175,161,255,.18);border-radius:50%;transform:rotate(-28deg)}.orbit-outer{width:345px;height:160px}.orbit-inner{width:280px;height:125px;transform:rotate(48deg);border-color:rgba(108,235,209,.19)}.hero-core{width:210px;height:210px;border:1px solid rgba(187,173,255,.28);border-radius:42px;display:flex;align-items:center;justify-content:center;flex-direction:column;background:linear-gradient(145deg,rgba(255,255,255,.105),rgba(255,255,255,.018));backdrop-filter:blur(18px);box-shadow:inset 0 1px rgba(255,255,255,.16),0 28px 90px rgba(0,0,0,.25),0 0 65px rgba(139,111,255,.12);transform:rotate(-7deg)}.core-symbol{font:800 105px/.95 Orbitron,sans-serif;color:#d7ceff;text-shadow:0 0 40px rgba(160,139,255,.5);position:relative}.core-symbol span{font-size:25px;position:absolute;right:-13px;top:0;color:var(--mint)}.core-caption{font:500 7px Orbitron,sans-serif;letter-spacing:.17em;color:#b4b2d1;margin-top:17px}.float-card{position:absolute;display:flex;align-items:center;gap:10px;padding:12px 14px;border:1px solid var(--line);border-radius:14px;background:rgba(18,20,34,.8);backdrop-filter:blur(16px);box-shadow:0 12px 32px rgba(0,0,0,.22)}.float-card strong,.float-card small{display:block}.float-card strong{font-size:9px;letter-spacing:.08em}.float-card small{font-size:10px;color:var(--muted);margin-top:2px}.float-card-top{top:45px;right:0}.float-card-bottom{bottom:45px;left:0}.tiny-icon{display:grid;place-items:center;width:31px;height:31px;border-radius:9px;background:rgba(160,139,255,.12);font-size:16px}.tiny-icon.purple{color:#c2b2ff}.tiny-icon.mint{color:var(--mint);background:rgba(108,235,209,.1)}.art-spark{position:absolute;color:var(--mint);opacity:.75}.spark-one{right:13%;top:22%;font-size:27px}.spark-two{left:14%;bottom:23%;font-size:20px;color:#b4a2ff}.stats-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:15px;margin-top:4px}.stat-card,.game-card,.arcade-panel,.community-panel{background:linear-gradient(145deg,rgba(255,255,255,.055),rgba(255,255,255,.018));border:1px solid var(--line);box-shadow:0 18px 55px rgba(0,0,0,.12);backdrop-filter:blur(14px)}.stat-card{padding:20px 22px;border-radius:18px;min-height:152px}.stat-top{display:flex;justify-content:space-between;align-items:center}.stat-icon{display:grid;place-items:center;width:33px;height:33px;border-radius:10px;font-size:17px}.live-icon{color:var(--mint);background:rgba(108,235,209,.1)}.total-icon{color:#b8a7ff;background:rgba(160,139,255,.12)}.game-icon{color:#9ad8ff;background:rgba(110,185,255,.1)}.live-label,.stat-tag{font-size:8px;letter-spacing:.1em;font-weight:700;color:#9d9db2}.live-label{color:var(--mint);display:flex;align-items:center;gap:6px}.live-label i{width:5px;height:5px}.stat-value{font:700 30px/1.2 Orbitron,sans-serif;margin:14px 0 3px;letter-spacing:-.04em}.stat-name{font-size:12px;font-weight:700;margin:0}.stat-note{font-size:10px;color:var(--muted);margin:5px 0 0}.games-section{padding-top:100px}.section-heading{display:flex;justify-content:space-between;align-items:flex-end;gap:24px}.section-heading h2,.arcade-copy h2,.community-panel h2{font:700 clamp(26px,3.6vw,39px)/1.2 Orbitron,sans-serif;letter-spacing:-.045em;margin:12px 0}.section-heading p,.arcade-copy>p,.community-panel p{font-size:13px;color:var(--muted);margin:0;max-width:560px}.section-count{font:700 23px Orbitron,sans-serif;color:#d3caff;white-space:nowrap}.section-count span{display:block;font:700 8px "DM Sans",sans-serif;letter-spacing:.16em;color:var(--muted);text-align:right}.game-tools{display:flex;gap:13px;align-items:center;flex-wrap:wrap;margin:29px 0 20px}.search-box{height:42px;display:flex;align-items:center;gap:10px;padding:0 13px;border:1px solid var(--line);background:rgba(255,255,255,.025);border-radius:11px;min-width:190px;flex:1;max-width:270px}.search-box span{font-size:22px;color:#a9a0d9}.search-box input{width:100%;border:0;outline:0;background:transparent;color:white;font-size:11px}.search-box input::placeholder{color:#797b91}.filter-list{display:flex;flex-wrap:wrap;gap:6px}.filter-btn,.sort-select{border:1px solid var(--line);background:rgba(255,255,255,.025);border-radius:10px;color:#a8a8bc;font-size:10px;padding:10px 12px;cursor:pointer}.filter-btn.active{background:rgba(160,139,255,.15);border-color:rgba(160,139,255,.45);color:#d9d0ff}.sort-select{margin-left:auto;outline:none}.sort-select option{background:#171827;color:white}.games-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:17px}.game-card{border-radius:17px;overflow:hidden;transition:transform .22s,border-color .22s;min-width:0}.game-card:hover{transform:translateY(-5px);border-color:rgba(160,139,255,.35)}.game-art{height:185px;position:relative;overflow:hidden;isolation:isolate;padding:15px;background:#151727}.game-art:before,.game-art:after{content:"";position:absolute;z-index:-1;inset:0}.game-art:before{background:radial-gradient(ellipse at 70% 50%,var(--glow),transparent 55%),linear-gradient(135deg,var(--shade),#0b0d17)}.game-art:after{opacity:.25;background-image:linear-gradient(transparent 95%,rgba(255,255,255,.14) 96%),linear-gradient(90deg,transparent 95%,rgba(255,255,255,.14) 96%);background-size:25px 25px;mask-image:linear-gradient(to bottom,black,transparent)}.art-cyber{--glow:rgba(0,231,255,.45);--shade:#182c4a}.art-mystic{--glow:rgba(190,93,255,.42);--shade:#382049}.art-shadow{--glow:rgba(255,89,113,.36);--shade:#3d202d}.art-galaxy{--glow:rgba(89,110,255,.48);--shade:#202047}.art-kingdom{--glow:rgba(255,192,91,.34);--shade:#3c2d1c}.art-horizon{--glow:rgba(74,223,184,.35);--shade:#163c3b}.art-label{font:700 7px Orbitron,sans-serif;letter-spacing:.16em;color:rgba(255,255,255,.62);position:relative;z-index:2}.game-symbol{position:absolute;right:23px;top:25px;font:700 70px/1 Orbitron,sans-serif;color:rgba(255,255,255,.82);text-shadow:0 0 32px var(--glow);transform:rotate(-9deg)}.art-word{position:absolute;bottom:15px;left:17px;font:800 24px/.98 Orbitron,sans-serif;letter-spacing:-.06em;color:#fff;text-shadow:0 2px 20px rgba(0,0,0,.4)}.art-orb{position:absolute;width:130px;height:130px;border-radius:50%;right:-24px;bottom:-55px;border:1px solid rgba(255,255,255,.28);box-shadow:inset 0 0 25px var(--glow),0 0 50px var(--glow)}.game-info{padding:15px 16px 14px}.game-meta{display:flex;justify-content:space-between;align-items:center}.genre-pill{font-size:8px;font-weight:700;letter-spacing:.1em;color:#bfb1ff;background:rgba(160,139,255,.1);padding:5px 8px;border-radius:6px}.rating{font-size:10px;color:#f2d89a}.game-info h3{font-size:15px;margin:12px 0 3px;letter-spacing:-.02em}.game-info>p{font-size:11px;color:var(--muted);margin:0;min-height:18px}.card-bottom{display:flex;align-items:center;justify-content:space-between;border-top:1px solid rgba(255,255,255,.07);padding-top:12px;margin-top:15px}.details-btn{padding:0;background:none;border:0;color:#d0c7ff;font-size:10px;font-weight:700;cursor:pointer}.details-btn span{color:var(--mint);margin-left:5px}.favorite-btn{width:30px;height:30px;border-radius:9px;border:1px solid var(--line);background:rgba(255,255,255,.03);color:#a6a6ba;font-size:18px;cursor:pointer}.favorite-btn.is-favorite{color:#ff86b7;border-color:rgba(255,134,183,.4);background:rgba(255,134,183,.1)}.empty-state{color:var(--muted);text-align:center;padding:36px}.arcade-section{padding-top:95px}.arcade-panel{border-radius:22px;padding:32px;display:grid;grid-template-columns:1.1fr .9fr;gap:40px;align-items:center;position:relative;overflow:hidden}.arcade-panel:after{content:"";position:absolute;right:-100px;top:-120px;width:300px;height:300px;border-radius:50%;background:rgba(137,103,255,.1);filter:blur(60px);pointer-events:none}.arcade-copy h2{margin-top:13px}.arcade-tip{font-size:10px;color:#aaa9c0;margin-top:24px}.arcade-tip span{color:var(--mint);margin-right:8px}.guess-panel{padding:22px;border:1px solid var(--line);border-radius:16px;background:rgba(7,8,15,.35);position:relative;z-index:1}.guess-panel label{display:flex;justify-content:space-between;font-size:9px;font-weight:700;letter-spacing:.1em;color:#c4bfdc}.guess-panel label span{color:#77798e}.guess-row{display:flex;gap:9px;margin-top:11px}.guess-row input{min-width:0;width:80px;flex:1;background:rgba(255,255,255,.045);border:1px solid var(--line);border-radius:10px;color:white;padding:10px 13px;outline:none}.guess-row input:focus{border-color:rgba(160,139,255,.6)}.guess-panel #guessMessage{font-size:11px;color:var(--mint);min-height:18px;margin:12px 0 0}.reset-game{background:none;border:0;color:#a8a0ce;font-size:10px;padding:0;cursor:pointer;margin-top:7px}.community-section{padding-top:65px;padding-bottom:80px}.community-panel{border-radius:22px;padding:31px;display:flex;align-items:center;justify-content:space-between;gap:25px;background:linear-gradient(110deg,rgba(139,111,255,.09),rgba(108,235,209,.035)),rgba(255,255,255,.02)}.community-panel h2{margin-bottom:12px}.community-panel .button{flex-shrink:0}.site-footer{width:min(1200px,calc(100% - 48px));margin:auto;border-top:1px solid rgba(255,255,255,.07);padding:23px 0 28px;display:flex;align-items:center;justify-content:space-between;gap:18px}.site-footer .brand{font-size:11px}.site-footer .brand-mark{width:28px;height:28px;font-size:16px}.site-footer p,.site-footer>span{font-size:10px;color:var(--muted);margin:0}.game-dialog{width:min(450px,calc(100% - 30px));border:1px solid rgba(175,161,255,.3);border-radius:20px;padding:30px;color:var(--text);background:#111320;box-shadow:0 30px 100px rgba(0,0,0,.65)}.game-dialog::backdrop{background:rgba(3,4,10,.75);backdrop-filter:blur(6px)}.dialog-close{position:absolute;right:15px;top:10px;border:0;background:none;color:#aaa;font-size:27px;cursor:pointer}.game-dialog h2{font:700 25px Orbitron,sans-serif;margin:13px 0}.game-dialog p{color:var(--muted);font-size:13px}.dialog-meta{display:flex;gap:15px;color:#c4b7ff;font-size:11px;margin:18px 0 22px}.game-dialog .button{width:100%}
@media(max-width:850px){.nav-links{gap:17px}.hero{gap:5px}.hero-art{transform:scale(.9)}.games-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.game-tools{align-items:stretch}.search-box{max-width:none;flex-basis:100%}.sort-select{margin-left:0}.arcade-panel{gap:24px;padding:25px}.stat-card{padding:17px}.stat-value{font-size:26px}}
@media(max-width:620px){.section-wrap,.site-header,.site-footer{width:calc(100% - 32px)}.site-header{height:68px}.header-cta{display:none}.menu-toggle{display:block;order:3}.nav-links{display:none;position:absolute;top:60px;left:0;right:0;flex-direction:column;align-items:stretch;gap:0;padding:8px;border:1px solid var(--line);border-radius:14px;background:#111320;box-shadow:0 20px 50px rgba(0,0,0,.4)}.nav-links.open{display:flex}.nav-links a{padding:12px;border-radius:8px}.nav-links a:hover{background:rgba(255,255,255,.05)}.hero{grid-template-columns:1fr;padding-top:50px;gap:0}.hero h1{font-size:clamp(42px,13vw,64px)}.hero-description{font-size:13px}.hero-art{height:290px;transform:scale(.85);margin-top:5px}.hero-core{width:175px;height:175px}.core-symbol{font-size:82px}.orbit-outer{width:290px;height:135px}.orbit-inner{width:235px;height:110px}.float-card-top{right:-2px;top:25px}.float-card-bottom{left:-4px;bottom:20px}.stats-grid{grid-template-columns:1fr;gap:10px}.stat-card{min-height:0;padding:15px 17px;display:grid;grid-template-columns:1fr auto;align-items:center}.stat-top{grid-column:1/-1}.stat-value{font-size:25px;margin:9px 0 0}.stat-name{align-self:end;margin:0 0 2px}.stat-note{grid-column:1/-1;margin-top:3px}.games-section{padding-top:70px}.section-heading{align-items:flex-start}.section-heading h2,.arcade-copy h2,.community-panel h2{font-size:26px}.section-heading p{font-size:12px}.section-count{font-size:18px}.game-tools{margin-top:22px}.filter-list{width:100%}.filter-btn{flex:1}.sort-select{flex:1}.games-grid{grid-template-columns:1fr;gap:13px}.game-art{height:200px}.arcade-section{padding-top:65px}.arcade-panel{grid-template-columns:1fr;padding:21px;gap:24px}.guess-panel{padding:17px}.community-section{padding-top:45px;padding-bottom:55px}.community-panel{align-items:flex-start;flex-direction:column;padding:23px}.site-footer{flex-wrap:wrap}.site-footer p{order:3;width:100%}}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{scroll-behavior:auto!important;transition:none!important;animation:none!important}}
'''

script_js = r'''/* NEXUS GAMING
   Supabase URL + publishable key go below. Never put a secret/service_role key in browser code. */
const SUPABASE_URL = "YOUR_SUPABASE_PROJECT_URL";
const SUPABASE_PUBLISHABLE_KEY = "YOUR_SUPABASE_PUBLISHABLE_KEY";

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const menuToggle = $("#menuToggle");
const navLinks = $("#navLinks");
menuToggle?.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
$$(".nav-links a").forEach(link => link.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuToggle?.setAttribute("aria-expanded", "false");
}));

$("#year").textContent = new Date().getFullYear();

const cards = $$(".game-card");
const searchInput = $("#gameSearch");
const filterButtons = $$(".filter-btn");
const sortSelect = $("#sortGames");
const emptyState = $("#emptyState");
let activeFilter = "all";
const favorites = new Set(JSON.parse(localStorage.getItem("nexus-favorites") || "[]"));

function paintFavorites() {
  cards.forEach(card => {
    const isFavorite = favorites.has(card.dataset.name);
    const button = $("[data-details]", card)?.parentElement?.querySelector(".favorite-btn");
    if (!button) return;
    button.classList.toggle("is-favorite", isFavorite);
    button.textContent = isFavorite ? "♥" : "♡";
    button.setAttribute("aria-pressed", String(isFavorite));
    button.setAttribute("aria-label", `${isFavorite ? "Remove" : "Add"} ${card.dataset.name} ${isFavorite ? "from" : "to"} favorites`);
  });
}

function filterAndSortGames() {
  const query = searchInput.value.trim().toLowerCase();
  const ordered = [...cards].sort((a, b) => {
    if (sortSelect.value === "az") return a.dataset.name.localeCompare(b.dataset.name);
    if (sortSelect.value === "za") return b.dataset.name.localeCompare(a.dataset.name);
    return cards.indexOf(a) - cards.indexOf(b);
  });
  ordered.forEach(card => {
    const matchesText = card.dataset.name.toLowerCase().includes(query) ||
      card.dataset.genre.toLowerCase().includes(query) ||
      card.querySelector(".game-info > p").textContent.toLowerCase().includes(query);
    const matchesFilter = activeFilter === "all" ||
      (activeFilter === "favorites" ? favorites.has(card.dataset.name) : card.dataset.genre === activeFilter);
    card.hidden = !(matchesText && matchesFilter);
    $("#gamesGrid").appendChild(card);
  });
  emptyState.hidden = cards.some(card => !card.hidden);
}
filterButtons.forEach(button => button.addEventListener("click", () => {
  activeFilter = button.dataset.filter;
  filterButtons.forEach(item => item.classList.toggle("active", item === button));
  filterAndSortGames();
}));
searchInput.addEventListener("input", filterAndSortGames);
sortSelect.addEventListener("change", filterAndSortGames);
cards.forEach(card => {
  $(".favorite-btn", card).addEventListener("click", () => {
    const name = card.dataset.name;
    favorites.has(name) ? favorites.delete(name) : favorites.add(name);
    localStorage.setItem("nexus-favorites", JSON.stringify([...favorites]));
    paintFavorites();
    filterAndSortGames();
  });
});
paintFavorites();

const gameDialog = $("#gameDialog");
cards.forEach(card => $("[data-details]", card).addEventListener("click", () => {
  $("#dialogTitle").textContent = card.dataset.name;
  $("#dialogDescription").textContent = card.dataset.description;
  $("#dialogGenre").textContent = card.dataset.genre.toUpperCase();
  $("#dialogRating").textContent = `★ ${card.dataset.rating}`;
  gameDialog.showModal();
}));
$("#closeDialog").addEventListener("click", () => gameDialog.close());
$("#dialogDone").addEventListener("click", () => gameDialog.close());
gameDialog.addEventListener("click", event => {
  if (event.target === gameDialog) gameDialog.close();
});

/* Number guessing mini-game */
let secretNumber, attempts;
function newRound() {
  secretNumber = Math.floor(Math.random() * 20) + 1;
  attempts = 0;
  $("#guessInput").value = "";
  $("#guessInput").disabled = false;
  $("#guessInput").focus({ preventScroll: true });
  $("#guessMessage").textContent = "Ready when you are.";
}
$("#guessForm").addEventListener("submit", event => {
  event.preventDefault();
  const input = $("#guessInput");
  const guess = Number(input.value);
  if (!Number.isInteger(guess) || guess < 1 || guess > 20) {
    $("#guessMessage").textContent = "Enter a whole number from 1 to 20.";
    return;
  }
  attempts++;
  if (guess === secretNumber) {
    $("#guessMessage").textContent = `You got it in ${attempts} ${attempts === 1 ? "try" : "tries"}! Nice work.`;
    input.disabled = true;
  } else if (attempts >= 6) {
    $("#guessMessage").textContent = `Round over — the number was ${secretNumber}. Try again!`;
    input.disabled = true;
  } else {
    $("#guessMessage").textContent = `${guess < secretNumber ? "Go higher" : "Go lower"} — ${6 - attempts} ${6 - attempts === 1 ? "try" : "tries"} left.`;
    input.select();
  }
});
$("#resetGuess").addEventListener("click", newRound);
newRound();

/* Real shared visitor stats: Supabase database RPC + Realtime Presence. */
const liveEl = $("#liveVisitors");
const totalEl = $("#totalVisits");
const liveStatus = $("#liveStatus");
const totalStatus = $("#totalStatus");
const configured = SUPABASE_URL.startsWith("https://") &&
  !SUPABASE_URL.includes("YOUR_SUPABASE") &&
  SUPABASE_PUBLISHABLE_KEY &&
  !SUPABASE_PUBLISHABLE_KEY.includes("YOUR_SUPABASE");

function showCounterError(which, message) {
  if (which === "live") {
    liveEl.textContent = "—";
    liveStatus.textContent = message;
  } else {
    totalEl.textContent = "—";
    totalStatus.textContent = message;
  }
}

async function setupVisitorCounters() {
  if (!configured || !window.supabase) {
    showCounterError("live", "Add your Supabase project settings in js/script.js");
    showCounterError("total", "Counter not configured yet");
    return;
  }
  const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
  const visitSessionKey = "nexus-visit-counted-v1";

  // Increment at most once per tab session. The database holds the shared count.
  if (!sessionStorage.getItem(visitSessionKey)) {
    const { error } = await client.rpc("increment_site_visits");
    if (error) {
      showCounterError("total", "Could not load shared counter — check Supabase setup");
      console.error("Visit counter error:", error.message);
    } else {
      sessionStorage.setItem(visitSessionKey, "1");
    }
  }
  const { data: total, error: totalError } = await client.rpc("get_site_visits");
  if (totalError) {
    showCounterError("total", "Could not load shared counter — check Supabase setup");
    console.error("Read counter error:", totalError.message);
  } else {
    totalEl.textContent = Number(total).toLocaleString();
    totalStatus.textContent = "Shared count from the database";
  }

  // Presence is ephemeral: it counts connected browser tabs, not unique humans.
  const sessionId = (window.crypto?.randomUUID?.() ||
    `${Date.now()}-${Math.random().toString(36).slice(2)}`);
  const channel = client.channel("nexus-gaming-live-visitors", {
    config: { presence: { key: sessionId } }
  });

  const updateLiveCount = () => {
    const state = channel.presenceState();
    const sessionKeys = new Set();
    Object.values(state).flat().forEach(payload => {
      if (payload && payload.session_id) sessionKeys.add(payload.session_id);
    });
    liveEl.textContent = sessionKeys.size.toLocaleString();
    liveStatus.textContent = "Connected browser sessions right now";
  };
  channel.on("presence", { event: "sync" }, updateLiveCount);
  channel.on("presence", { event: "join" }, updateLiveCount);
  channel.on("presence", { event: "leave" }, updateLiveCount);
  channel.subscribe(async status => {
    if (status === "SUBSCRIBED") {
      await channel.track({ session_id: sessionId, connected_at: new Date().toISOString() });
      updateLiveCount();
    } else if (status === "CHANNEL_ERROR" || status === "TIMED_OUT" || status === "CLOSED") {
      showCounterError("live", "Live presence unavailable — check Realtime settings");
      console.error("Presence channel status:", status);
    }
  });
  window.addEventListener("pagehide", () => { client.removeChannel(channel); }, { once: true });
}
setupVisitorCounters();
'''

setup_sql = r'''-- NEXUS GAMING visitor counter setup for Supabase SQL Editor.
-- The table is not directly readable/writable by anonymous browser users.
-- The two small RPC functions expose only the intended counter operations.

create table if not exists public.nexus_site_stats (
  id text primary key,
  total_visits bigint not null default 0 check (total_visits >= 0)
);

insert into public.nexus_site_stats (id, total_visits)
values ('nexus-gaming', 0)
on conflict (id) do nothing;

alter table public.nexus_site_stats enable row level security;
revoke all on table public.nexus_site_stats from anon, authenticated;
revoke all on table public.nexus_site_stats from public;

create or replace function public.increment_site_visits()
returns bigint
language plpgsql
security definer
set search_path = ''
as $$
declare
  new_total bigint;
begin
  update public.nexus_site_stats
  set total_visits = total_visits + 1
  where id = 'nexus-gaming'
  returning total_visits into new_total;

  if new_total is null then
    raise exception 'NEXUS GAMING counter row is missing';
  end if;

  return new_total;
end;
$$;

create or replace function public.get_site_visits()
returns bigint
language sql
security definer
set search_path = ''
as $$
  select total_visits
  from public.nexus_site_stats
  where id = 'nexus-gaming';
$$;

revoke all on function public.increment_site_visits() from public;
revoke all on function public.get_site_visits() from public;
grant execute on function public.increment_site_visits() to anon, authenticated;
grant execute on function public.get_site_visits() to anon, authenticated;
'''

readme = r'''# NEXUS GAMING — Premium Dark Glass Upgrade

Responsive gaming landing page with game search, genre filters, favorites, sorting, a number guessing mini-game, a Supabase-backed cumulative visit counter, and Supabase Realtime Presence for live connected sessions.

## Files
- `index.html` — site structure
- `css/style.css` — responsive premium dark-glass design
- `js/script.js` — UI interactions and Supabase counters
- `supabase-setup.sql` — SQL to create a shared visit counter

## Configure real visitor stats
1. Create a Supabase project at https://supabase.com/.
2. Open **SQL Editor**, create a query, paste `supabase-setup.sql`, and run it.
3. In the Supabase project dashboard, open **Project Settings / API** (or the Connect dialog) and copy the Project URL and the browser-safe **publishable key** (`sb_publishable_...`). A legacy `anon` key is also intended for browser use if your project still uses it.
4. Open `js/script.js` and replace:
   - `YOUR_SUPABASE_PROJECT_URL`
   - `YOUR_SUPABASE_PUBLISHABLE_KEY`
5. In Supabase Realtime settings, allow public access to channels if your project restricts public channels. This page uses a public Presence channel named `nexus-gaming-live-visitors`.
6. Test the page in two separate browser sessions. The live count should change as sessions connect/disconnect. The total count is shared in the database and increments once per tab session (sessionStorage).
7. Commit all files to the root of the `Gaming` GitHub repository and enable GitHub Pages from `main` / `(root)`.

## Security and accuracy notes
- Never put a Supabase secret key or `service_role` key in browser JavaScript.
- The live count represents connected browser sessions, not verified unique people. It can briefly lag while network disconnects time out.
- The total counter is persistent and shared, but the anonymous RPC can be spammed by a determined user. For a high-traffic or production site, put visit recording behind a rate-limited Edge Function or other server-side abuse controls.
- The cumulative counter counts a tab session once, not every page reload in that same tab session. Clearing session storage or opening another tab can create another counted visit.
- If the configuration is missing, the UI shows a setup message/dash instead of inventing a number.

## Publish
Expected URL after GitHub Pages is enabled and deployment completes:
https://Raja-kumar-1996.github.io/Gaming/
'''

files = {
    base / "index.html": index_html,
    base / "css" / "style.css": style_css,
    base / "js" / "script.js": script_js,
    base / "supabase-setup.sql": setup_sql,
    base / "README.md": readme,
}
for path, content in files.items():
    path.write_text(content, encoding="utf-8")

zip_path = Path("/mnt/data/NEXUS-GAMING-premium-upgrade.zip")
with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zf:
    for path in files:
        zf.write(path, path.relative_to(base.parent))

print("Created the ready-to-upload NEXUS GAMING project bundle:")
print(zip_path)
print("Included:", ", ".join(str(p.relative_to(base)) for p in files))
