/**
 * SKETCHBOOK RUNNER — Interactive Scrapbook Mini-Game for Visitors
 * Controls: Spacebar / Up Arrow / Click / Tap to Jump (Double Jump supported!)
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const start = () => initSketchbookGame();
    if ('requestIdleCallback' in window) {
      requestIdleCallback(start, { timeout: 2500 });
    } else {
      setTimeout(start, 1);
    }
  });

  function initSketchbookGame() {
    const canvas = document.getElementById('sketch-game-canvas');
    if (!canvas) return;

    const modal = document.getElementById('secret-game-modal');
    const modalClose = document.getElementById('secret-game-close');
    const triggerIcon = document.getElementById('secret-walker-trigger');

    const ctx = canvas.getContext('2d');
    const scoreEl = document.getElementById('game-score');
    const highScoreEl = document.getElementById('game-high-score');
    const overlay = document.getElementById('game-overlay');
    const overlayTitle = document.getElementById('game-overlay-title');
    const overlaySub = document.getElementById('game-overlay-sub');
    const startBtn = document.getElementById('game-start-btn');
    const jumpBtn = document.getElementById('game-jump-btn');
    const soundBtn = document.getElementById('game-sound-btn');

    const HIGH_SCORE_KEY = 'rizal_sketch_game_high_score';
    let highScore = parseInt(localStorage.getItem(HIGH_SCORE_KEY) || '0', 10) || 0;
    if (highScoreEl) highScoreEl.textContent = highScore;

    let soundOn = true;
    let gameRunning = false;
    let gameOver = false;
    let score = 0;
    let frameCount = 0;
    let speed = 5.2;
    let animId = null;

    const groundY = 230;

    // Player (Cartoon Artist Character)
    const player = {
      x: 78,
      y: groundY - 52,
      w: 38,
      h: 52,
      vy: 0,
      gravity: 0.68,
      jumpPower: -12.6,
      jumpsLeft: 2,
      legPhase: 0
    };

    let obstacles = [];
    let collectibles = [];
    let particles = [];
    let clouds = [
      { x: 140, y: 45, s: 1 },
      { x: 420, y: 65, s: 0.8 },
      { x: 680, y: 38, s: 1.1 }
    ];

    // Gentle Web Audio Retro Arcade Sounds
    function playTone(freq, duration = 0.09, type = 'sine', vol = 0.05) {
      if (!soundOn) return;
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ac = new AudioCtx();
        const osc = ac.createOscillator();
        const gain = ac.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, ac.currentTime);
        gain.gain.setValueAtTime(vol, ac.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + duration);
        osc.connect(gain);
        gain.connect(ac.destination);
        osc.start();
        osc.stop(ac.currentTime + duration);
      } catch (e) {}
    }

    if (soundBtn) {
      soundBtn.addEventListener('click', () => {
        soundOn = !soundOn;
        soundBtn.textContent = soundOn ? '🔊 Sound On' : '🔇 Muted';
      });
    }

    function resetGame() {
      score = 0;
      frameCount = 0;
      speed = 5.2;
      obstacles = [];
      collectibles = [];
      particles = [];
      player.y = groundY - player.h;
      player.vy = 0;
      player.jumpsLeft = 2;
      gameOver = false;
      gameRunning = true;
      if (scoreEl) scoreEl.textContent = '0';
      if (overlay) overlay.style.display = 'none';
      if (animId) cancelAnimationFrame(animId);
      loop();
    }

    function triggerJump() {
      if (!gameRunning) {
        resetGame();
        return;
      }
      if (player.jumpsLeft > 0) {
        player.vy = player.jumpPower;
        player.jumpsLeft--;
        playTone(player.jumpsLeft === 1 ? 520 : 680, 0.1, 'triangle', 0.06);
        // Dust puff particles
        for (let i = 0; i < 5; i++) {
          particles.push({
            x: player.x + 14,
            y: groundY - 4,
            vx: -Math.random() * 2.5 - 0.5,
            vy: -Math.random() * 1.8,
            life: 18,
            color: '#94A3B8',
            size: 3 + Math.random() * 2
          });
        }
      }
    }

    const openGameModal = () => {
      if (!modal) return;
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      drawNotebookBackground();
      drawPlayer();
    };

    const closeGameModal = () => {
      if (!modal) return;
      gameRunning = false;
      if (animId) cancelAnimationFrame(animId);
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    if (triggerIcon) triggerIcon.addEventListener('click', openGameModal);
    if (modalClose) modalClose.addEventListener('click', closeGameModal);
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeGameModal();
      });
    }

    if (startBtn) startBtn.addEventListener('click', (e) => { e.stopPropagation(); resetGame(); });
    if (jumpBtn) jumpBtn.addEventListener('click', (e) => { e.stopPropagation(); triggerJump(); });

    canvas.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      triggerJump();
    });

    window.addEventListener('keydown', (e) => {
      const isModalOpen = modal && modal.classList.contains('open');
      if (e.key === 'Escape' && isModalOpen) {
        closeGameModal();
        return;
      }
      if (isModalOpen && (e.code === 'Space' || e.code === 'ArrowUp')) {
        e.preventDefault();
        triggerJump();
      }
    });

    function spawnEntities() {
      // Spawn obstacle (Coffee Spill or Crumpled Paper)
      if (frameCount % Math.max(58, Math.floor(96 - speed * 3)) === 0) {
        const types = ['paper', 'coffee', 'clock'];
        const type = types[Math.floor(Math.random() * types.length)];
        obstacles.push({
          x: canvas.width + 20,
          y: groundY - (type === 'clock' ? 38 : 30),
          w: type === 'coffee' ? 34 : 28,
          h: type === 'clock' ? 38 : 30,
          type
        });
      }

      // Spawn collectible Star
      if (frameCount % 75 === 25) {
        collectibles.push({
          x: canvas.width + 20,
          y: groundY - (75 + Math.random() * 75),
          r: 13,
          collected: false,
          bobOffset: Math.random() * Math.PI * 2
        });
      }
    }

    function update() {
      frameCount++;
      speed = Math.min(10.5, 5.2 + score * 0.004);

      if (frameCount % 6 === 0) {
        score++;
        if (scoreEl) scoreEl.textContent = score;
      }

      // Player physics
      player.vy += player.gravity;
      player.y += player.vy;
      if (player.y >= groundY - player.h) {
        player.y = groundY - player.h;
        player.vy = 0;
        player.jumpsLeft = 2;
        player.legPhase += 0.35;
      }

      // Clouds
      clouds.forEach(c => {
        c.x -= speed * 0.25;
        if (c.x < -80) c.x = canvas.width + 60;
      });

      spawnEntities();

      // Obstacles
      for (let i = obstacles.length - 1; i >= 0; i--) {
        const ob = obstacles[i];
        ob.x -= speed;

        // Forgiving hitbox
        const pad = 7;
        if (
          player.x + pad < ob.x + ob.w - pad &&
          player.x + player.w - pad > ob.x + pad &&
          player.y + pad < ob.y + ob.h - 4 &&
          player.y + player.h - 4 > ob.y + pad
        ) {
          endGame();
          return;
        }

        if (ob.x + ob.w < -20) obstacles.splice(i, 1);
      }

      // Collectibles
      for (let i = collectibles.length - 1; i >= 0; i--) {
        const star = collectibles[i];
        star.x -= speed;
        const bobY = star.y + Math.sin(frameCount * 0.1 + star.bobOffset) * 5;

        const dx = (player.x + player.w / 2) - star.x;
        const dy = (player.y + player.h / 2) - bobY;
        if (!star.collected && Math.hypot(dx, dy) < 28) {
          star.collected = true;
          score += 20;
          if (scoreEl) scoreEl.textContent = score;
          playTone(880, 0.12, 'sine', 0.06);
          for (let p = 0; p < 8; p++) {
            particles.push({
              x: star.x,
              y: bobY,
              vx: (Math.random() - 0.5) * 5,
              vy: (Math.random() - 0.5) * 5,
              life: 22,
              color: p % 2 === 0 ? '#FBBF24' : '#3B82F6',
              size: 3.5
            });
          }
          collectibles.splice(i, 1);
          continue;
        }

        if (star.x < -20) collectibles.splice(i, 1);
      }

      // Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const pt = particles[i];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.life--;
        if (pt.life <= 0) particles.splice(i, 1);
      }
    }

    function endGame() {
      gameRunning = false;
      gameOver = true;
      playTone(210, 0.22, 'sawtooth', 0.05);

      if (score > highScore) {
        highScore = score;
        localStorage.setItem(HIGH_SCORE_KEY, String(highScore));
        if (highScoreEl) highScoreEl.textContent = highScore;
      }

      if (overlay) {
        overlay.style.display = 'flex';
        if (overlayTitle) overlayTitle.textContent = `Sketch Break! Score: ${score} ★`;
        if (overlaySub) overlaySub.textContent = `Best Score: ${highScore} • Tap or press Space to run again!`;
        if (startBtn) startBtn.textContent = 'Play Again ↻';
      }
    }

    function drawNotebookBackground() {
      ctx.fillStyle = '#FDFBF7';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Subtle ruled graph grid
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.18)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 24) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 24) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Sketchy clouds
      clouds.forEach(c => {
        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.scale(c.s, c.s);
        ctx.fillStyle = '#FFFFFF';
        ctx.strokeStyle = '#94A3B8';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, 14, Math.PI * 0.5, Math.PI * 1.5);
        ctx.arc(16, -6, 16, Math.PI * 1, Math.PI * 2);
        ctx.arc(34, 0, 13, Math.PI * 1.5, Math.PI * 0.5);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      });

      // Dotted pencil ground line
      ctx.strokeStyle = '#18181B';
      ctx.lineWidth = 2.5;
      ctx.setLineDash([8, 6]);
      ctx.lineDashOffset = -(frameCount * speed) % 14;
      ctx.beginPath();
      ctx.moveTo(0, groundY);
      ctx.lineTo(canvas.width, groundY);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    function drawPlayer() {
      ctx.save();
      ctx.translate(player.x, player.y);

      const onGround = player.y >= groundY - player.h - 1;
      const swing = onGround ? Math.sin(player.legPhase) * 7 : 6;

      // Shadow
      ctx.fillStyle = 'rgba(24, 24, 27, 0.12)';
      ctx.beginPath();
      ctx.ellipse(19, groundY - player.y, 14, 3.5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Legs
      ctx.strokeStyle = '#18181B';
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(14, 38);
      ctx.lineTo(14 - swing, 49);
      ctx.moveTo(24, 38);
      ctx.lineTo(24 + swing, 49);
      ctx.stroke();

      // Red Sneakers
      ctx.fillStyle = '#F43F5E';
      ctx.beginPath();
      ctx.ellipse(14 - swing + 2, 50, 5.5, 3, 0, 0, Math.PI * 2);
      ctx.ellipse(24 + swing + 2, 50, 5.5, 3, 0, 0, Math.PI * 2);
      ctx.fill();

      // Blue Hoodie Torso
      ctx.fillStyle = '#3B82F6';
      ctx.strokeStyle = '#18181B';
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      ctx.roundRect(8, 22, 22, 18, 7);
      ctx.fill();
      ctx.stroke();

      // Head
      ctx.fillStyle = '#FDE68A';
      ctx.beginPath();
      ctx.arc(19, 13, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Yellow Cap
      ctx.fillStyle = '#FBBF24';
      ctx.beginPath();
      ctx.arc(19, 10, 12, Math.PI, 0);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(28, 10);
      ctx.lineTo(35, 11);
      ctx.stroke();

      // Eye & Smile
      ctx.fillStyle = '#18181B';
      ctx.beginPath();
      ctx.arc(24, 13, 2, 0, Math.PI * 2);
      ctx.fill();

      // Mini Pencil in hand
      ctx.save();
      ctx.translate(30, 29);
      ctx.rotate(0.45);
      ctx.fillStyle = '#FBBF24';
      ctx.fillRect(-2, -10, 5, 16);
      ctx.strokeRect(-2, -10, 5, 16);
      ctx.restore();

      ctx.restore();
    }

    function drawObstacles() {
      obstacles.forEach(ob => {
        ctx.save();
        ctx.translate(ob.x, ob.y);
        if (ob.type === 'coffee') {
          // Cartoon Coffee Cup Spill
          ctx.fillStyle = '#FBBF24';
          ctx.strokeStyle = '#18181B';
          ctx.lineWidth = 2.2;
          ctx.beginPath();
          ctx.roundRect(4, 4, 24, 26, 4);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = '#78350F';
          ctx.fillRect(6, 4, 20, 5);
        } else if (ob.type === 'clock') {
          // Deadline Alarm Clock
          ctx.fillStyle = '#F43F5E';
          ctx.strokeStyle = '#18181B';
          ctx.lineWidth = 2.2;
          ctx.beginPath();
          ctx.arc(14, 20, 13, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = '#FFFFFF';
          ctx.beginPath();
          ctx.arc(14, 20, 9, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.moveTo(14, 20);
          ctx.lineTo(14, 14);
          ctx.moveTo(14, 20);
          ctx.lineTo(19, 20);
          ctx.stroke();
        } else {
          // Crumpled Sketch Paper Ball
          ctx.fillStyle = '#E2E8F0';
          ctx.strokeStyle = '#18181B';
          ctx.lineWidth = 2.2;
          ctx.beginPath();
          ctx.arc(14, 16, 13, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(8, 12);
          ctx.lineTo(16, 16);
          ctx.lineTo(12, 22);
          ctx.stroke();
        }
        ctx.restore();
      });
    }

    function drawCollectibles() {
      collectibles.forEach(star => {
        const bobY = star.y + Math.sin(frameCount * 0.1 + star.bobOffset) * 5;
        ctx.save();
        ctx.translate(star.x, bobY);
        ctx.rotate(Math.sin(frameCount * 0.05) * 0.2);
        ctx.fillStyle = '#FACC15';
        ctx.strokeStyle = '#18181B';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
          const outerAngle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
          const innerAngle = outerAngle + Math.PI / 5;
          const ox = Math.cos(outerAngle) * 12;
          const oy = Math.sin(outerAngle) * 12;
          const ix = Math.cos(innerAngle) * 5;
          const iy = Math.sin(innerAngle) * 5;
          if (i === 0) ctx.moveTo(ox, oy);
          else ctx.lineTo(ox, oy);
          ctx.lineTo(ix, iy);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      });
    }

    function drawParticles() {
      particles.forEach(pt => {
        ctx.fillStyle = pt.color;
        ctx.globalAlpha = Math.max(0, pt.life / 22);
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
    }

    function loop() {
      if (!gameRunning) return;
      update();
      drawNotebookBackground();
      drawCollectibles();
      drawObstacles();
      drawPlayer();
      drawParticles();
      animId = requestAnimationFrame(loop);
    }

    // Initial idle render
    drawNotebookBackground();
    drawPlayer();

    /* ======================================================================
       4-GAME ARCADE TAB SWITCHER
       ====================================================================== */
    const tabBtns = document.querySelectorAll('#arcade-game-tabs [data-game-tab]');
    const panes = document.querySelectorAll('.arcade-game-pane');
    let activePane = 'pane-runner';

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-game-tab');
        activePane = target;
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        panes.forEach(p => {
          p.style.display = p.id === target ? 'block' : 'none';
        });
        if (target !== 'pane-runner') {
          gameRunning = false;
          if (animId) cancelAnimationFrame(animId);
        }
        if (target === 'pane-snl') drawSnlBoard();
        if (target === 'pane-snake') drawClassicSnake();
      });
    });

    /* ======================================================================
       GAME 2: SNAKE & LADDER (6x6 = 36 TILES, YOU VS RIZZ BOT)
       ====================================================================== */
    const snlCanvas = document.getElementById('snl-canvas');
    if (snlCanvas) {
      const sctx = snlCanvas.getContext('2d');
      const snlP1El = document.getElementById('snl-p1-pos');
      const snlP2El = document.getElementById('snl-p2-pos');
      const snlStatusEl = document.getElementById('snl-status-bar');
      const snlRollBtn = document.getElementById('snl-roll-btn');
      const snlResetBtn = document.getElementById('snl-reset-btn');

      const ladders = { 4: 14, 9: 21, 17: 29, 23: 34 };
      const snakes = { 16: 6, 25: 11, 31: 19, 35: 22 };
      const tileSize = 70; // 6 * 70 = 420
      let p1 = 1;
      let p2 = 1;
      let snlBusy = false;
      let snlOver = false;

      function getTileCenter(tile) {
        const idx = tile - 1;
        const rowFromBottom = Math.floor(idx / 6);
        const colInRow = idx % 6;
        const col = rowFromBottom % 2 === 0 ? colInRow : 5 - colInRow;
        const row = 5 - rowFromBottom;
        return { x: col * tileSize + tileSize / 2, y: row * tileSize + tileSize / 2 };
      }

      function drawSnlBoard() {
        const colors = ['#FEF9C3', '#DBEAFE', '#FCE7F3', '#DCFCE7', '#FFFFFF'];
        for (let t = 1; t <= 36; t++) {
          const idx = t - 1;
          const rBot = Math.floor(idx / 6);
          const cInRow = idx % 6;
          const col = rBot % 2 === 0 ? cInRow : 5 - cInRow;
          const row = 5 - rBot;
          const x = col * tileSize;
          const y = row * tileSize;

          sctx.fillStyle = colors[(t + rBot) % colors.length];
          sctx.fillRect(x, y, tileSize, tileSize);
          sctx.strokeStyle = '#CBD5E1';
          sctx.lineWidth = 1.2;
          sctx.strokeRect(x, y, tileSize, tileSize);

          sctx.fillStyle = t === 36 ? '#D97706' : '#475569';
          sctx.font = t === 36 ? 'bold 14px "Space Mono", monospace' : 'bold 11px "Space Mono", monospace';
          sctx.fillText(t === 36 ? '36★' : String(t), x + 6, y + 16);
        }

        // Draw Ladders (Green)
        Object.entries(ladders).forEach(([from, to]) => {
          const a = getTileCenter(Number(from));
          const b = getTileCenter(Number(to));
          const angle = Math.atan2(b.y - a.y, b.x - a.x);
          const px = Math.cos(angle + Math.PI / 2) * 7;
          const py = Math.sin(angle + Math.PI / 2) * 7;

          sctx.strokeStyle = '#10B981';
          sctx.lineWidth = 3.5;
          sctx.beginPath();
          sctx.moveTo(a.x - px, a.y - py);
          sctx.lineTo(b.x - px, b.y - py);
          sctx.moveTo(a.x + px, a.y + py);
          sctx.lineTo(b.x + px, b.y + py);
          sctx.stroke();

          for (let s = 0.2; s <= 0.85; s += 0.2) {
            const rx = a.x + (b.x - a.x) * s;
            const ry = a.y + (b.y - a.y) * s;
            sctx.beginPath();
            sctx.moveTo(rx - px, ry - py);
            sctx.lineTo(rx + px, ry + py);
            sctx.stroke();
          }
        });

        // Draw Snakes (Coral Red Wavy Lines)
        Object.entries(snakes).forEach(([from, to]) => {
          const a = getTileCenter(Number(from));
          const b = getTileCenter(Number(to));
          const mx = (a.x + b.x) / 2 + 18;
          const my = (a.y + b.y) / 2 - 12;

          sctx.strokeStyle = '#F43F5E';
          sctx.lineWidth = 5;
          sctx.lineCap = 'round';
          sctx.beginPath();
          sctx.moveTo(a.x, a.y);
          sctx.quadraticCurveTo(mx, my, b.x, b.y);
          sctx.stroke();

          // Snake head dot
          sctx.fillStyle = '#E11D48';
          sctx.beginPath();
          sctx.arc(a.x, a.y, 7, 0, Math.PI * 2);
          sctx.fill();
        });

        // Draw Player 1 (Blue) & Rizz Bot (Pink) Tokens
        const c1 = getTileCenter(p1);
        const c2 = getTileCenter(p2);
        const offset = p1 === p2 ? -9 : 0;

        sctx.fillStyle = '#2563EB';
        sctx.strokeStyle = '#FFFFFF';
        sctx.lineWidth = 2.5;
        sctx.beginPath();
        sctx.arc(c1.x + offset, c1.y + 6, 11, 0, Math.PI * 2);
        sctx.fill();
        sctx.stroke();

        sctx.fillStyle = '#EC4899';
        sctx.beginPath();
        sctx.arc(c2.x - offset, c2.y + 6, 11, 0, Math.PI * 2);
        sctx.fill();
        sctx.stroke();
      }

      function takeSnlTurn() {
        if (snlBusy || snlOver) return;
        snlBusy = true;
        const roll = Math.floor(Math.random() * 6) + 1;
        playTone(540, 0.08, 'triangle', 0.05);

        let next = p1 + roll;
        let note = `🎲 You rolled a <strong>${roll}</strong>! `;
        if (next > 36) {
          next = p1;
          note += `Need exact roll to land on 36!`;
        } else if (ladders[next]) {
          note += `🪜 Yay! Climbed ladder from ${next} → <strong>${ladders[next]}</strong>!`;
          next = ladders[next];
          playTone(780, 0.14, 'sine', 0.06);
        } else if (snakes[next]) {
          note += `🐍 Oops! Slid down snake ${next} → <strong>${snakes[next]}</strong>!`;
          next = snakes[next];
          playTone(260, 0.16, 'sawtooth', 0.04);
        } else {
          note += `Moved to tile <strong>${next}</strong>.`;
        }

        p1 = next;
        if (snlP1El) snlP1El.textContent = p1;
        if (snlStatusEl) snlStatusEl.innerHTML = note;
        drawSnlBoard();

        if (p1 === 36) {
          snlOver = true;
          snlBusy = false;
          if (snlStatusEl) snlStatusEl.innerHTML = `🎉 <strong>YOU WIN!</strong> Reached Tile 36 first!`;
          playTone(960, 0.2, 'sine', 0.07);
          return;
        }

        // Bot Turn
        setTimeout(() => {
          const botRoll = Math.floor(Math.random() * 6) + 1;
          let bNext = p2 + botRoll;
          let bNote = `🤖 Rizz Bot rolled <strong>${botRoll}</strong> `;
          if (bNext > 36) {
            bNext = p2;
            bNote += `(needs exact roll). Your turn!`;
          } else if (ladders[bNext]) {
            bNote += `&amp; climbed ladder to <strong>${ladders[bNext]}</strong>! Your turn!`;
            bNext = ladders[bNext];
          } else if (snakes[bNext]) {
            bNote += `&amp; slid down snake to <strong>${snakes[bNext]}</strong>! Your turn!`;
            bNext = snakes[bNext];
          } else {
            bNote += `→ Tile <strong>${bNext}</strong>. Your turn!`;
          }
          p2 = bNext;
          if (snlP2El) snlP2El.textContent = p2;
          drawSnlBoard();

          if (p2 === 36) {
            snlOver = true;
            if (snlStatusEl) snlStatusEl.innerHTML = `🤖 <strong>Rizz Bot wins!</strong> Hit Reset to rematch!`;
          } else {
            if (snlStatusEl) snlStatusEl.innerHTML = bNote;
          }
          snlBusy = false;
        }, 650);
      }

      if (snlRollBtn) snlRollBtn.addEventListener('click', takeSnlTurn);
      if (snlResetBtn) {
        snlResetBtn.addEventListener('click', () => {
          p1 = 1;
          p2 = 1;
          snlBusy = false;
          snlOver = false;
          if (snlP1El) snlP1El.textContent = '1';
          if (snlP2El) snlP2El.textContent = '1';
          if (snlStatusEl) snlStatusEl.innerHTML = `🎲 Your turn! Click <strong>Roll Dice</strong> to start climbing!`;
          drawSnlBoard();
        });
      }
      drawSnlBoard();
    }

    /* ======================================================================
       GAME 3: CLASSIC SNAKE
       ====================================================================== */
    const snakeCanvas = document.getElementById('classic-snake-canvas');
    let drawClassicSnake = () => {};
    if (snakeCanvas) {
      const kctx = snakeCanvas.getContext('2d');
      const snakeScoreEl = document.getElementById('snake-score');
      const snakeBestEl = document.getElementById('snake-best');
      const snakeStartBtn = document.getElementById('snake-start-btn');
      const snakeOverlay = document.getElementById('snake-overlay');
      const snakeOverlayTitle = document.getElementById('snake-overlay-title');

      const SNAKE_BEST_KEY = 'rizal_classic_snake_best';
      let snakeBest = parseInt(localStorage.getItem(SNAKE_BEST_KEY) || '0', 10) || 0;
      if (snakeBestEl) snakeBestEl.textContent = snakeBest;

      const cell = 20; // 18x18 grid = 360px
      const cells = 18;
      let snakeBody = [{ x: 9, y: 9 }, { x: 8, y: 9 }, { x: 7, y: 9 }];
      let dir = { x: 1, y: 0 };
      let nextDir = { x: 1, y: 0 };
      let food = { x: 13, y: 9 };
      let kScore = 0;
      let snakeTimer = null;
      let snakeActive = false;

      function spawnFood() {
        food = {
          x: Math.floor(Math.random() * cells),
          y: Math.floor(Math.random() * cells)
        };
      }

      drawClassicSnake = function () {
        kctx.fillStyle = '#FDFBF7';
        kctx.fillRect(0, 0, snakeCanvas.width, snakeCanvas.height);

        kctx.strokeStyle = 'rgba(148, 163, 184, 0.2)';
        kctx.lineWidth = 1;
        for (let i = 0; i <= cells; i++) {
          kctx.beginPath();
          kctx.moveTo(i * cell, 0);
          kctx.lineTo(i * cell, 360);
          kctx.stroke();
          kctx.beginPath();
          kctx.moveTo(0, i * cell);
          kctx.lineTo(360, i * cell);
          kctx.stroke();
        }

        // Food star
        kctx.fillStyle = '#FBBF24';
        kctx.strokeStyle = '#18181B';
        kctx.lineWidth = 2;
        kctx.beginPath();
        kctx.arc(food.x * cell + cell / 2, food.y * cell + cell / 2, 7, 0, Math.PI * 2);
        kctx.fill();
        kctx.stroke();

        // Snake segments
        snakeBody.forEach((seg, idx) => {
          kctx.fillStyle = idx === 0 ? '#059669' : '#10B981';
          kctx.strokeStyle = '#18181B';
          kctx.lineWidth = 1.6;
          kctx.beginPath();
          kctx.roundRect(seg.x * cell + 2, seg.y * cell + 2, cell - 4, cell - 4, 5);
          kctx.fill();
          kctx.stroke();
        });
      };

      function stepSnake() {
        if (!snakeActive) return;
        dir = nextDir;
        const head = { x: snakeBody[0].x + dir.x, y: snakeBody[0].y + dir.y };

        if (
          head.x < 0 || head.x >= cells ||
          head.y < 0 || head.y >= cells ||
          snakeBody.some(s => s.x === head.x && s.y === head.y)
        ) {
          snakeActive = false;
          clearInterval(snakeTimer);
          playTone(200, 0.2, 'sawtooth', 0.05);
          if (kScore > snakeBest) {
            snakeBest = kScore;
            localStorage.setItem(SNAKE_BEST_KEY, String(snakeBest));
            if (snakeBestEl) snakeBestEl.textContent = snakeBest;
          }
          if (snakeOverlay) snakeOverlay.style.display = 'flex';
          if (snakeOverlayTitle) snakeOverlayTitle.textContent = `Game Over! Score: ${kScore} 🐍`;
          return;
        }

        snakeBody.unshift(head);
        if (head.x === food.x && head.y === food.y) {
          kScore += 10;
          if (snakeScoreEl) snakeScoreEl.textContent = kScore;
          playTone(760, 0.1, 'sine', 0.05);
          spawnFood();
        } else {
          snakeBody.pop();
        }
        drawClassicSnake();
      }

      function setSnakeDirection(d) {
        if (d === 'UP' && dir.y !== 1) nextDir = { x: 0, y: -1 };
        if (d === 'DOWN' && dir.y !== -1) nextDir = { x: 0, y: 1 };
        if (d === 'LEFT' && dir.x !== 1) nextDir = { x: -1, y: 0 };
        if (d === 'RIGHT' && dir.x !== -1) nextDir = { x: 1, y: 0 };
      }

      if (snakeStartBtn) {
        snakeStartBtn.addEventListener('click', () => {
          snakeBody = [{ x: 9, y: 9 }, { x: 8, y: 9 }, { x: 7, y: 9 }];
          dir = { x: 1, y: 0 };
          nextDir = { x: 1, y: 0 };
          kScore = 0;
          if (snakeScoreEl) snakeScoreEl.textContent = '0';
          spawnFood();
          snakeActive = true;
          if (snakeOverlay) snakeOverlay.style.display = 'none';
          if (snakeTimer) clearInterval(snakeTimer);
          snakeTimer = setInterval(stepSnake, 130);
          drawClassicSnake();
        });
      }

      document.querySelectorAll('.snake-dir-btn').forEach(b => {
        b.addEventListener('click', () => setSnakeDirection(b.getAttribute('data-dir')));
      });

      window.addEventListener('keydown', (e) => {
        if (activePane !== 'pane-snake' || !modal || !modal.classList.contains('open')) return;
        if (e.key === 'ArrowUp' || e.key === 'w') { e.preventDefault(); setSnakeDirection('UP'); }
        if (e.key === 'ArrowDown' || e.key === 's') { e.preventDefault(); setSnakeDirection('DOWN'); }
        if (e.key === 'ArrowLeft' || e.key === 'a') { e.preventDefault(); setSnakeDirection('LEFT'); }
        if (e.key === 'ArrowRight' || e.key === 'd') { e.preventDefault(); setSnakeDirection('RIGHT'); }
      });

      drawClassicSnake();
    }

    /* ======================================================================
       GAME 4: TIC-TAC-TOE (YOU VS RIZZ BOT)
       ====================================================================== */
    const tttCells = document.querySelectorAll('.ttt-cell');
    if (tttCells.length) {
      const tttStatus = document.getElementById('ttt-status');
      const tttWinsEl = document.getElementById('ttt-wins');
      const tttLossesEl = document.getElementById('ttt-losses');
      const tttResetBtn = document.getElementById('ttt-reset-btn');

      let board = Array(9).fill('');
      let tttOver = false;
      let wins = 0;
      let losses = 0;
      const winLines = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
      ];

      function checkWinner(b) {
        for (const [a, c, d] of winLines) {
          if (b[a] && b[a] === b[c] && b[a] === b[d]) return b[a];
        }
        return b.includes('') ? null : 'DRAW';
      }

      function renderTtt() {
        tttCells.forEach((cell, idx) => {
          cell.textContent = board[idx];
          cell.style.color = board[idx] === 'X' ? '#2563EB' : '#EC4899';
        });
      }

      function botMove() {
        if (tttOver) return;
        const empty = board.map((v, i) => (v === '' ? i : -1)).filter(i => i !== -1);
        if (!empty.length) return;

        // Smart bot: win if possible, else block X, else pick center/random
        let pick = -1;
        for (const i of empty) {
          const copy = [...board]; copy[i] = 'O';
          if (checkWinner(copy) === 'O') { pick = i; break; }
        }
        if (pick === -1) {
          for (const i of empty) {
            const copy = [...board]; copy[i] = 'X';
            if (checkWinner(copy) === 'X') { pick = i; break; }
          }
        }
        if (pick === -1 && board[4] === '') pick = 4;
        if (pick === -1) pick = empty[Math.floor(Math.random() * empty.length)];

        board[pick] = 'O';
        renderTtt();
        const res = checkWinner(board);
        if (res === 'O') {
          tttOver = true;
          losses++;
          if (tttLossesEl) tttLossesEl.textContent = losses;
          if (tttStatus) tttStatus.innerHTML = `🤖 <span style="color:#EC4899;">Rizz Bot Wins!</span>`;
        } else if (res === 'DRAW') {
          tttOver = true;
          if (tttStatus) tttStatus.textContent = `🤝 It's a Draw!`;
        } else {
          if (tttStatus) tttStatus.innerHTML = `Your Turn! Place an <span style="color:#2563EB;">X</span>`;
        }
      }

      tttCells.forEach(cell => {
        cell.addEventListener('click', () => {
          const idx = Number(cell.getAttribute('data-idx'));
          if (tttOver || board[idx] !== '') return;
          board[idx] = 'X';
          playTone(620, 0.07, 'sine', 0.04);
          renderTtt();

          const res = checkWinner(board);
          if (res === 'X') {
            tttOver = true;
            wins++;
            if (tttWinsEl) tttWinsEl.textContent = wins;
            if (tttStatus) tttStatus.innerHTML = `🎉 <span style="color:#2563EB;">You Win!</span>`;
            playTone(900, 0.16, 'sine', 0.06);
          } else if (res === 'DRAW') {
            tttOver = true;
            if (tttStatus) tttStatus.textContent = `🤝 It's a Draw!`;
          } else {
            if (tttStatus) tttStatus.textContent = `🤖 Rizz Bot is thinking...`;
            setTimeout(botMove, 320);
          }
        });
      });

      if (tttResetBtn) {
        tttResetBtn.addEventListener('click', () => {
          board = Array(9).fill('');
          tttOver = false;
          renderTtt();
          if (tttStatus) tttStatus.innerHTML = `Your Turn! Place an <span style="color:#2563EB;">X</span>`;
        });
      }
    }
  }
})();
