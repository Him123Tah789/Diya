/* ================================================================
   BIRTHDAY WEBSITE FOR MEOW - Scene Flow Controller
   Scene 1: Violet Welcome -> Scene 2: Pokeball -> Scene 3: Video -> Main
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* --- Element References --- */
    const canvas         = document.getElementById('particles-canvas');
    const ctx            = canvas ? canvas.getContext('2d') : null;
    const confettiCanvas = document.getElementById('confetti-canvas');
    const confettiCtx    = confettiCanvas ? confettiCanvas.getContext('2d') : null;
    const sparkCanvas    = document.getElementById('spark-canvas');
    const sparkCtx       = sparkCanvas ? sparkCanvas.getContext('2d') : null;
    const mainContent    = document.getElementById('main-content');
    const lightbox       = document.getElementById('lightbox');
    const lightboxImg    = document.getElementById('lightbox-img');
    const lightboxClose  = document.getElementById('lightbox-close');

    // Scenes
    const sceneWelcome   = document.getElementById('scene-welcome');
    const scenePokeball  = document.getElementById('scene-pokeball');
    const sceneVideo     = document.getElementById('scene-video');
    const scenePoster    = document.getElementById('scene-poster');

    // Pokeball
    const pokeball       = document.getElementById('pokeball');
    const pokeballContainer = document.getElementById('pokeball-container');
    const flashOverlay   = document.getElementById('flash-overlay');
    const pikachuReveal  = document.getElementById('pikachu-reveal');

    // Video & Poster
    const birthdayVideo  = document.getElementById('pikachu-birthday-video');
    const videoPlayOverlay = document.getElementById('video-play-overlay');
    const skipBtn        = document.getElementById('skip-video-btn');
    const skipPosterBtn  = document.getElementById('skip-poster-btn');

    // Garden
    const gardenHint     = document.getElementById('garden-hint');
    const gardenBloomMsg = document.getElementById('garden-bloom-msg');

    // Ultimate Finale Elements
    const btnStartUltimate    = document.getElementById('btn-start-ultimate-surprise');
    const portalPokeballPrev  = document.getElementById('portal-pokeball-preview');
    const ultimateFinaleModal = document.getElementById('ultimate-finale');

    // Pokemon BG
    const pokemonImages  = document.querySelectorAll('.floating-pokemon');

    /* ================================================================
       PARTICLE SYSTEM - glowing stars
       ================================================================ */
    let particles = [];

    function resizeCanvas(c) {
        if (!c) return;
        c.width = window.innerWidth;
        c.height = window.innerHeight;
    }

    function initParticles() {
        resizeCanvas(canvas);
        resizeCanvas(confettiCanvas);
        resizeCanvas(sparkCanvas);
        particles = [];
        const count = Math.min(Math.floor(window.innerWidth * 0.12), 150);
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2 + 0.5,
                alpha: Math.random() * 0.6 + 0.2,
                dx: (Math.random() - 0.5) * 0.3,
                dy: (Math.random() - 0.5) * 0.2,
                pulse: Math.random() * Math.PI * 2,
                pulseSpeed: Math.random() * 0.02 + 0.005,
                color: Math.random() > 0.6
                    ? 'rgba(255, 215, 0, VAR_ALPHA)'
                    : 'rgba(212, 184, 255, VAR_ALPHA)'
            });
        }
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.x += p.dx; p.y += p.dy; p.pulse += p.pulseSpeed;
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;
            const alpha = p.alpha * (0.5 + 0.5 * Math.sin(p.pulse));
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color.replace('VAR_ALPHA', alpha.toFixed(3));
            ctx.fill();
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
            ctx.fillStyle = p.color.replace('VAR_ALPHA', (alpha * 0.15).toFixed(3));
            ctx.fill();
        });
        requestAnimationFrame(drawParticles);
    }

    window.addEventListener('resize', () => {
        resizeCanvas(canvas);
        resizeCanvas(confettiCanvas);
        resizeCanvas(sparkCanvas);
    });

    initParticles();
    drawParticles();

    /* ================================================================
       FLOATING PETALS
       ================================================================ */
    const petalsContainer = document.getElementById('floating-petals');
    if (petalsContainer) {
        for (let i = 0; i < 15; i++) {
            const petal = document.createElement('div');
            petal.className = 'floating-petal';
            petal.style.left = Math.random() * 100 + '%';
            petal.style.animationDuration = (8 + Math.random() * 12) + 's';
            petal.style.animationDelay = (Math.random() * 10) + 's';
            petal.style.width = (12 + Math.random() * 16) + 'px';
            petal.style.height = (20 + Math.random() * 20) + 'px';
            petal.style.opacity = (0.1 + Math.random() * 0.2).toFixed(2);
            petalsContainer.appendChild(petal);
        }
    }

    /* ================================================================
       SCENE TRANSITION SYSTEM
       ================================================================ */
    function showScene(scene) {
        // Hide all scenes
        document.querySelectorAll('.scene').forEach(s => s.classList.remove('active'));
        // Show target and ensure display is active
        if (scene) {
            scene.style.display = '';
            scene.classList.add('active');
        }
    }

    function hideAllScenes() {
        document.querySelectorAll('.scene').forEach(s => {
            s.classList.remove('active');
            setTimeout(() => { s.style.display = 'none'; }, 1200);
        });
    }

    /* ================================================================
       SCENE 1 - VIOLET WELCOME: Tap anywhere to begin
       ================================================================ */
    if (sceneWelcome) {
        sceneWelcome.addEventListener('click', () => {
            showScene(scenePokeball);
        });
    }

    /* ================================================================
       SCENE 2 - POKE BALL: Tap to open
       ================================================================ */
    let pokeballOpened = false;

    if (pokeballContainer) {
        pokeballContainer.addEventListener('click', () => {
            if (pokeballOpened) return;
            pokeballOpened = true;

            // Preload video during user gesture
            if (birthdayVideo) {
                birthdayVideo.load();
            }

            // 1. Shake the ball
            pokeball.classList.add('shaking');

        // 2. After shake, open the ball
        setTimeout(() => {
            pokeball.classList.remove('shaking');
            pokeball.classList.add('opened');

            // 3. Flash!
            flashOverlay.classList.add('flash');

            // 4. Electric sparks
            launchSparks();

            // 5. Burst of emojis
            const emojis = ['⚡', '🌻', '✨', '🎉', '💜', '⚡', '🌻', '✨'];
            emojis.forEach((e, i) => {
                setTimeout(() => {
                    spawnFloatingEmoji(e,
                        window.innerWidth / 2 + (Math.random() - 0.5) * 300,
                        window.innerHeight / 2 + (Math.random() - 0.5) * 200
                    );
                }, i * 100);
            });
        }, 600);

        // 6. Show Pikachu after flash
        setTimeout(() => {
            pokeball.style.opacity = '0';
            document.getElementById('pokeball-text').style.opacity = '0';
            document.getElementById('pokeball-hint').style.opacity = '0';
            pikachuReveal.classList.remove('hidden');
        }, 1200);

            // 7. Transition to video scene
            setTimeout(() => {
                showScene(sceneVideo);
                startVideoScene();
            }, 3500);
        });
    }

    /* ================================================================
       ELECTRIC SPARK SYSTEM
       ================================================================ */
    let sparks = [];

    function launchSparks() {
        sparks = [];
        const cx = sparkCanvas.width / 2;
        const cy = sparkCanvas.height / 2;
        const colors = ['#FFD700', '#FFC107', '#FFEB3B', '#fff', '#B388FF', '#FF4081'];

        for (let i = 0; i < 60; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 3 + Math.random() * 10;
            sparks.push({
                x: cx, y: cy,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1,
                decay: 0.015 + Math.random() * 0.02,
                size: 1 + Math.random() * 3,
                color: colors[Math.floor(Math.random() * colors.length)]
            });
        }
        animateSparks();
    }

    function animateSparks() {
        sparkCtx.clearRect(0, 0, sparkCanvas.width, sparkCanvas.height);
        let alive = false;

        sparks.forEach(s => {
            if (s.life <= 0) return;
            alive = true;
            s.x += s.vx;
            s.y += s.vy;
            s.vy += 0.15; // gravity
            s.vx *= 0.98;
            s.life -= s.decay;

            sparkCtx.save();
            sparkCtx.globalAlpha = s.life;
            sparkCtx.fillStyle = s.color;
            sparkCtx.shadowBlur = 10;
            sparkCtx.shadowColor = s.color;
            sparkCtx.beginPath();
            sparkCtx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
            sparkCtx.fill();
            sparkCtx.restore();
        });

        if (alive) requestAnimationFrame(animateSparks);
        else sparkCtx.clearRect(0, 0, sparkCanvas.width, sparkCanvas.height);
    }

    /* ================================================================
       SCENE 3 - PIKACHU VIDEO: Auto-play, text reveals, auto-continue
       ================================================================ */
    function startVideoScene() {
        if (!birthdayVideo) return;

        birthdayVideo.currentTime = 0;

        // Play attempt
        const playPromise = birthdayVideo.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                if (videoPlayOverlay) videoPlayOverlay.classList.add('hidden');
            }).catch(err => {
                console.log('Autoplay deferred for interaction:', err);
                birthdayVideo.controls = true;
                if (videoPlayOverlay) videoPlayOverlay.classList.remove('hidden');
            });
        }

        // Click overlay to trigger playback with audio
        if (videoPlayOverlay) {
            videoPlayOverlay.addEventListener('click', (e) => {
                e.stopPropagation();
                birthdayVideo.play().then(() => {
                    videoPlayOverlay.classList.add('hidden');
                }).catch(err => console.log('Play error:', err));
            });
        }

        // Subtitle messages synchronized with video playback
        const msgItems = [
            { el: document.querySelector('.video-msg-1'), time: 0.5 },
            { el: document.querySelector('.video-msg-2'), time: 2.2 },
            { el: document.querySelector('.video-msg-3'), time: 5.0 },
            { el: document.querySelector('.video-msg-4'), time: 8.5 }
        ];

        function onVideoTimeUpdate() {
            const cur = birthdayVideo.currentTime;
            msgItems.forEach(item => {
                if (item.el && cur >= item.time) {
                    item.el.classList.remove('hidden');
                    item.el.classList.add('show');
                }
            });

            // Smoothly auto-continue when video reaches the end
            if (birthdayVideo.duration && cur >= birthdayVideo.duration - 0.25) {
                transitionToPoster();
            }
        }

        birthdayVideo.addEventListener('timeupdate', onVideoTimeUpdate);
        birthdayVideo.addEventListener('ended', transitionToPoster);

        // Fallback or manual skip
        if (skipBtn) {
            skipBtn.addEventListener('click', transitionToPoster);
        }
    }

    let transitionedToPoster = false;
    function transitionToPoster() {
        if (transitionedToPoster) return;
        transitionedToPoster = true;

        birthdayVideo.pause();

        // Hide video scene, show poster scene
        showScene(scenePoster);

        // Allow skip from poster scene
        if (skipPosterBtn) {
            skipPosterBtn.addEventListener('click', transitionToMain);
        }
        if (scenePoster) {
            scenePoster.addEventListener('click', transitionToMain);
        }
    }

    let transitionedToMain = false;
    function transitionToMain() {
        if (transitionedToMain) return;
        transitionedToMain = true;

        // Fade out all scenes
        hideAllScenes();

        // Show Pokémon in background
        pokemonImages.forEach((img, i) => {
            setTimeout(() => { img.style.opacity = '0.18'; }, i * 200);
        });

        // Show main content
        setTimeout(() => {
            mainContent.classList.remove('hidden');
            window.scrollTo({ top: 0, behavior: 'instant' });
            checkScrollReveals();
        }, 1200);
    }

    /* ================================================================
       SCROLL REVEAL
       ================================================================ */
    function checkScrollReveals() {
        document.querySelectorAll('.scroll-reveal:not(.visible)').forEach(el => {
            const rect = el.getBoundingClientRect();
            const delay = parseInt(el.dataset.delay) || 0;
            if (rect.top < window.innerHeight * 0.88) {
                setTimeout(() => el.classList.add('visible'), delay);
            }
        });
    }
    window.addEventListener('scroll', checkScrollReveals, { passive: true });

    /* ================================================================
       PHOTO CAROUSEL
       ================================================================ */
    const carouselTrack = document.getElementById('carousel-track');
    const carouselPrev  = document.getElementById('carousel-prev');
    const carouselNext  = document.getElementById('carousel-next');
    const carouselDots  = document.getElementById('carousel-dots');

    if (carouselTrack) {
        const slides = carouselTrack.querySelectorAll('.carousel-slide');
        let currentSlide = 0;
        const totalSlides = slides.length;

        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('button');
            dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
            dot.addEventListener('click', () => goToSlide(i));
            carouselDots.appendChild(dot);
        }
        const dots = carouselDots.querySelectorAll('.carousel-dot');

        function goToSlide(index) {
            currentSlide = ((index % totalSlides) + totalSlides) % totalSlides;
            carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
            dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
        }

        carouselPrev.addEventListener('click', () => goToSlide(currentSlide - 1));
        carouselNext.addEventListener('click', () => goToSlide(currentSlide + 1));

        let autoPlay = setInterval(() => goToSlide(currentSlide + 1), 5000);
        const carouselEl = document.getElementById('photo-carousel');
        carouselEl.addEventListener('mouseenter', () => clearInterval(autoPlay));
        carouselEl.addEventListener('mouseleave', () => {
            autoPlay = setInterval(() => goToSlide(currentSlide + 1), 5000);
        });

        // Swipe
        let touchStartX = 0;
        carouselEl.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        carouselEl.addEventListener('touchend', e => {
            const diff = touchStartX - e.changedTouches[0].screenX;
            if (Math.abs(diff) > 50) goToSlide(currentSlide + (diff > 0 ? 1 : -1));
        }, { passive: true });
    }

    /* ================================================================
       LIGHTBOX
       ================================================================ */
    document.addEventListener('click', (e) => {
        const img = e.target.closest('.polaroid-image img, .poster-img, .carousel-slide img, .hero-poster img, .finale-poster img, .uf-final-poster-img');
        if (img) {
            lightboxImg.src = img.src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightbox) lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

    /* ================================================================
       SUNFLOWER GARDEN
       ================================================================ */
    const gardenFlowers = document.querySelectorAll('.garden-flower');
    let openedCount = 0;

    gardenFlowers.forEach(flower => {
        flower.addEventListener('click', () => {
            if (flower.classList.contains('opened')) return;
            flower.classList.add('opened');
            const svg = flower.querySelector('.mini-sunflower');
            svg.classList.remove('closed');
            svg.classList.add('bloomed');
            openedCount++;
            if (openedCount === gardenFlowers.length) {
                setTimeout(() => {
                    gardenHint.style.display = 'none';
                    gardenBloomMsg.classList.remove('hidden');
                    document.getElementById('garden').classList.add('golden');
                    for (let i = 0; i < 8; i++) {
                        setTimeout(() => spawnFloatingEmoji('🌻', Math.random() * window.innerWidth, window.innerHeight), i * 200);
                    }
                }, 600);
            }
        });
    });

    /* ================================================================
       MEOW'S ULTIMATE BIRTHDAY SURPRISE (7 SCENES ENGINE)
       ================================================================ */
    const ufCanvas        = document.getElementById('uf-canvas');
    const ufCtx           = ufCanvas ? ufCanvas.getContext('2d') : null;
    const ufFlash         = document.getElementById('uf-flash');

    // Scenes
    const ufScene1        = document.getElementById('uf-scene-1');
    const ufScene2        = document.getElementById('uf-scene-2');
    const ufScene3        = document.getElementById('uf-scene-3');
    const ufScene4        = document.getElementById('uf-scene-4');
    const ufScene5        = document.getElementById('uf-scene-5');
    const ufScene6        = document.getElementById('uf-scene-6');
    const ufScene7        = document.getElementById('uf-scene-7');

    // Scene 1 elements
    const ufTextSurprise  = document.getElementById('uf-text-surprise');
    const ufTextMeow      = document.getElementById('uf-text-meow');
    const ufTextReady     = document.getElementById('uf-text-ready');
    const ufTapHint       = document.getElementById('uf-tap-hint');
    const ufPokeball      = document.getElementById('uf-pokeball');

    // Scene 2 elements
    const ufCountdown     = document.getElementById('uf-countdown');

    // Scene 3 elements
    const ufCandlesRow    = document.getElementById('uf-candles-row');
    const ufWishCounter   = document.getElementById('uf-wish-counter');
    const ufWishMessage   = document.getElementById('uf-wish-message');
    const ufWishDots      = document.getElementById('uf-wish-dots');
    const ufWishPrevBtn   = document.getElementById('uf-wish-prev');
    const ufWishNextBtn   = document.getElementById('uf-wish-next');
    const ufWishAutoBtn   = document.getElementById('uf-wish-auto-btn');

    // Scene 4 elements
    const ufBtnStartGame  = document.getElementById('uf-btn-start-game');

    // Scene 5 elements (Game)
    const ufGameArena     = document.getElementById('uf-game-arena');
    const ufGameScore     = document.getElementById('uf-game-score');
    const ufGameBar       = document.getElementById('uf-game-bar');
    const ufGameRunner    = document.getElementById('uf-game-runner');
    const ufRunnerBubble  = document.getElementById('uf-runner-bubble');
    const ufGameWin       = document.getElementById('uf-game-win');
    const ufBtnToGift     = document.getElementById('uf-btn-to-gift');

    // Scene 6 elements
    const ufUltimateGift  = document.getElementById('uf-ultimate-gift');
    const ufGiftLid       = document.getElementById('uf-gift-lid');
    const ufTapGiftHint   = document.getElementById('uf-tap-gift-hint');

    // Scene 7 elements
    const ufBtnReplay     = document.getElementById('uf-btn-replay');
    const ufBtnExit       = document.getElementById('uf-btn-exit');

    // 19 Wishes for Meow
    const ultimateWishes = [
        "May you always be happy. ❤️",
        "May Allah always protect you. 🤍",
        "May your dreams come true. ✨",
        "May your smile never fade. 😊",
        "May you always be surrounded by love. 💜",
        "May you have good health and peace. 🌸",
        "May success follow your hard work. 🌟",
        "May you always believe in yourself. 💪",
        "May you find happiness in little things. 🌻",
        "May every year bring beautiful memories. 📸",
        "May you have courage on difficult days. ⚡",
        "May your heart always stay kind. ❤️",
        "May you experience wonderful adventures. 🌍",
        "May your biggest dreams become reality. ✨",
        "May your family always be close to you. 🫶",
        "May you always have reasons to laugh. 😂",
        "May your future be brighter than your past. 🌅",
        "May your 19th year bring infinite joy, blessings, and success. 🌟💜",
        "May this 19th birthday begin your most beautiful chapter yet. 🌻💜"
    ];

    // Web Audio Synthesizer (Zero External File Dependencies)
    let audioCtx = null;
    function playChime(freq = 587.33, duration = 0.25, type = 'sine', gainVal = 0.15) {
        try {
            if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            if (audioCtx.state === 'suspended') audioCtx.resume();
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
            gain.gain.setValueAtTime(gainVal, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start();
            osc.stop(audioCtx.currentTime + duration);
        } catch(e) {}
    }

    function playPikaSound() {
        playChime(659.25, 0.1, 'sine', 0.2);
        setTimeout(() => playChime(880, 0.18, 'triangle', 0.22), 90);
    }

    function playFanfare() {
        const notes = [523.25, 659.25, 783.99, 1046.5];
        notes.forEach((n, i) => {
            setTimeout(() => playChime(n, 0.22, 'triangle', 0.18), i * 130);
        });
    }

    // Canvas Fireworks & Particle Engine
    let ufCanvasRunning = false;
    let ufParticles = [];
    let fireworkTimer = null;

    function resizeUfCanvas() {
        if (!ufCanvas) return;
        ufCanvas.width = window.innerWidth;
        ufCanvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeUfCanvas);

    function triggerUfBurst() {
        if (!ufCanvas) return;
        const cx = ufCanvas.width / 2;
        const cy = ufCanvas.height / 2;
        const colors = ['#FFD700', '#FFC107', '#D4B8FF', '#B388FF', '#FF4081', '#FFFFFF', '#00E5FF', '#FF9800'];

        // Particles & Confetti
        for (let i = 0; i < 90; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 4 + Math.random() * 12;
            ufParticles.push({
                x: cx, y: cy,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                gravity: 0.2,
                alpha: 1,
                decay: 0.012 + Math.random() * 0.015,
                color: colors[Math.floor(Math.random() * colors.length)],
                size: 5 + Math.random() * 8,
                rotation: Math.random() * Math.PI,
                rotSpeed: (Math.random() - 0.5) * 0.2,
                shape: Math.random() > 0.4 ? 'rect' : 'circle'
            });
        }

        // Flying Sunflowers & Lightning
        for (let i = 0; i < 18; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 3 + Math.random() * 9;
            ufParticles.push({
                x: cx, y: cy,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 2,
                gravity: 0.12,
                alpha: 1,
                decay: 0.008 + Math.random() * 0.008,
                emoji: i % 2 === 0 ? '🌻' : (i % 3 === 0 ? '⚡' : '✨'),
                size: 22 + Math.random() * 14,
                shape: 'emoji'
            });
        }
    }

    function createFirework(x, y) {
        if (!ufCanvas) return;
        const colors = ['#FFD700', '#FFC107', '#D4B8FF', '#B388FF', '#FF4081', '#00E5FF', '#FF9100', '#FFFFFF'];
        const burstColor = colors[Math.floor(Math.random() * colors.length)];
        const count = 45 + Math.floor(Math.random() * 20);
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 / count) * i + (Math.random() - 0.5) * 0.2;
            const speed = 2 + Math.random() * 6.5;
            ufParticles.push({
                x: x, y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                gravity: 0.07,
                alpha: 1,
                decay: 0.014 + Math.random() * 0.014,
                color: burstColor,
                size: 3 + Math.random() * 4,
                shape: 'sparkle'
            });
        }
    }

    function startFireworksLoop() {
        stopFireworksLoop();
        fireworkTimer = setInterval(() => {
            const x = window.innerWidth * 0.15 + Math.random() * window.innerWidth * 0.7;
            const y = window.innerHeight * 0.12 + Math.random() * window.innerHeight * 0.45;
            createFirework(x, y);
            playChime(350 + Math.random() * 400, 0.14, 'triangle', 0.05);
        }, 850);
    }

    function stopFireworksLoop() {
        if (fireworkTimer) {
            clearInterval(fireworkTimer);
            fireworkTimer = null;
        }
    }

    function renderUfCanvas() {
        if (!ufCanvasRunning || !ufCtx) return;
        ufCtx.clearRect(0, 0, ufCanvas.width, ufCanvas.height);

        for (let i = ufParticles.length - 1; i >= 0; i--) {
            const p = ufParticles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += p.gravity || 0;
            p.alpha -= p.decay;

            if (p.alpha <= 0) {
                ufParticles.splice(i, 1);
                continue;
            }

            ufCtx.save();
            ufCtx.globalAlpha = Math.max(0, p.alpha);

            if (p.shape === 'emoji') {
                ufCtx.font = `${p.size}px sans-serif`;
                ufCtx.fillText(p.emoji, p.x, p.y);
            } else if (p.shape === 'sparkle') {
                ufCtx.fillStyle = p.color;
                ufCtx.shadowColor = p.color;
                ufCtx.shadowBlur = 8;
                ufCtx.beginPath();
                ufCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ufCtx.fill();
            } else if (p.shape === 'rect') {
                ufCtx.translate(p.x, p.y);
                p.rotation += p.rotSpeed;
                ufCtx.rotate(p.rotation);
                ufCtx.fillStyle = p.color;
                ufCtx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
            } else {
                ufCtx.fillStyle = p.color;
                ufCtx.beginPath();
                ufCtx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
                ufCtx.fill();
            }
            ufCtx.restore();
        }

        requestAnimationFrame(renderUfCanvas);
    }

    function switchUfScene(scene) {
        document.querySelectorAll('.uf-scene').forEach(s => s.classList.remove('active'));
        if (scene) scene.classList.add('active');
    }

    // --- SCENE 1 Controller ---
    let scene1Timeouts = [];
    let ufPokeballOpened = false;

    function startScene1() {
        switchUfScene(ufScene1);
        ufPokeballOpened = false;
        ufPokeball.classList.remove('shake', 'open');
        ufTextSurprise.classList.remove('show');
        ufTextMeow.classList.remove('show');
        ufTextReady.classList.remove('show');
        ufTapHint.classList.remove('show');

        scene1Timeouts.forEach(t => clearTimeout(t));
        scene1Timeouts = [];

        // 1. "✨ One final surprise..."
        scene1Timeouts.push(setTimeout(() => {
            ufTextSurprise.classList.add('show');
            playChime(600, 0.3, 'sine', 0.1);
        }, 500));

        // 2. "Meow..."
        scene1Timeouts.push(setTimeout(() => {
            ufTextMeow.classList.add('show');
            playChime(500, 0.4, 'sine', 0.12);
        }, 2200));

        // 3. "Are you ready?"
        scene1Timeouts.push(setTimeout(() => {
            ufTextReady.classList.add('show');
            playChime(700, 0.35, 'sine', 0.12);
        }, 3600));

        // 4. Poké Ball starts shaking
        scene1Timeouts.push(setTimeout(() => {
            ufPokeball.classList.add('shake');
            playChime(350, 0.2, 'triangle', 0.15);
        }, 4800));

        // 5. "TAP THE POKÉ BALL!"
        scene1Timeouts.push(setTimeout(() => {
            ufTapHint.classList.add('show');
            playPikaSound();
        }, 5300));
    }

    function handlePokeballClick() {
        if (ufPokeballOpened) return;
        ufPokeballOpened = true;

        ufPokeball.classList.remove('shake');
        ufPokeball.classList.add('open');
        playPikaSound();

        setTimeout(() => {
            startScene2();
        }, 600);
    }

    if (ufPokeball) {
        ufPokeball.addEventListener('click', handlePokeballClick);
    }
    if (ufTapHint) {
        ufTapHint.addEventListener('click', handlePokeballClick);
    }

    // --- SCENE 2 Controller (HUGE FLASH) ---
    function startScene2() {
        switchUfScene(ufScene2);

        // Countdown sequence
        ufCountdown.textContent = "3...";
        playChime(440, 0.25, 'triangle', 0.2);

        setTimeout(() => {
            ufCountdown.textContent = "2...";
            playChime(523.25, 0.25, 'triangle', 0.22);
        }, 500);

        setTimeout(() => {
            ufCountdown.textContent = "1...";
            playChime(659.25, 0.3, 'triangle', 0.25);
        }, 1000);

        setTimeout(() => {
            // 💥 HUGE WHITE/GOLDEN FLASH (0.3 - 0.5s)
            ufFlash.classList.add('flash');
            playChime(880, 0.6, 'sine', 0.3);

            // Sunflowers, violet particles, lightning, confetti, sparkles fly in!
            triggerUfBurst();

            setTimeout(() => {
                ufFlash.classList.remove('flash');
            }, 400);

            // Transition to Scene 3 (Cake + Wishes)
            setTimeout(() => {
                startScene3();
            }, 600);
        }, 1500);
    }

    // --- SCENE 3 Controller (19 Wishes for Meow) ---
    let currentWishIdx = 0;
    let wishAutoPlayTimer = null;
    let isWishAuto = true;

    function buildCakeCandlesAndDots() {
        if (ufCandlesRow.children.length === 0) {
            for (let i = 0; i < 19; i++) {
                const candle = document.createElement('div');
                candle.className = 'uf-candle';
                candle.dataset.idx = i;
                candle.innerHTML = '<div class="uf-flame"></div><div class="uf-wax"></div>';
                candle.addEventListener('click', () => {
                    pauseWishAuto();
                    showWish(i);
                });
                ufCandlesRow.appendChild(candle);
            }
        }

        if (ufWishDots.children.length === 0) {
            for (let i = 0; i < 19; i++) {
                const dot = document.createElement('div');
                dot.className = 'uf-wish-dot';
                dot.dataset.idx = i;
                dot.addEventListener('click', () => {
                    pauseWishAuto();
                    showWish(i);
                });
                ufWishDots.appendChild(dot);
            }
        }
    }

    function showWish(idx) {
        if (idx < 0) idx = 0;
        if (idx >= ultimateWishes.length) {
            // Finished wish 19 -> Advance to Scene 4!
            stopWishAuto();
            startScene4();
            return;
        }

        currentWishIdx = idx;
        ufWishCounter.textContent = `Wish ${idx + 1} of 19`;
        ufWishMessage.textContent = `🕯️ Wish ${idx + 1}: ${ultimateWishes[idx]}`;
        playChime(500 + idx * 25, 0.2, 'sine', 0.12);

        // Update active candle and flame
        const candles = ufCandlesRow.querySelectorAll('.uf-candle');
        candles.forEach((c, i) => {
            if (i <= idx) c.classList.add('active');
            else c.classList.remove('active');
        });

        // Update progress dots
        const dots = ufWishDots.querySelectorAll('.uf-wish-dot');
        dots.forEach((d, i) => {
            if (i === idx) d.classList.add('active');
            else d.classList.remove('active');
        });

        // Sparkle effect
        if (Math.random() > 0.4) {
            createFirework(window.innerWidth / 2 + (Math.random() - 0.5) * 300, window.innerHeight * 0.35);
        }
    }

    function startWishAuto() {
        stopWishAuto();
        isWishAuto = true;
        if (ufWishAutoBtn) ufWishAutoBtn.textContent = 'Auto Playing ⏸️';
        wishAutoPlayTimer = setInterval(() => {
            if (currentWishIdx < 18) {
                showWish(currentWishIdx + 1);
            } else {
                stopWishAuto();
                setTimeout(() => {
                    startScene4();
                }, 1800);
            }
        }, 3200);
    }

    function pauseWishAuto() {
        stopWishAuto();
        isWishAuto = false;
        if (ufWishAutoBtn) ufWishAutoBtn.textContent = 'Play Auto ▶️';
    }

    function stopWishAuto() {
        if (wishAutoPlayTimer) {
            clearInterval(wishAutoPlayTimer);
            wishAutoPlayTimer = null;
        }
    }

    function startScene3() {
        switchUfScene(ufScene3);
        buildCakeCandlesAndDots();
        currentWishIdx = 0;
        showWish(0);
        startWishAuto();
    }

    if (ufWishPrevBtn) {
        ufWishPrevBtn.addEventListener('click', () => {
            pauseWishAuto();
            showWish(currentWishIdx - 1);
        });
    }
    if (ufWishNextBtn) {
        ufWishNextBtn.addEventListener('click', () => {
            pauseWishAuto();
            showWish(currentWishIdx + 1);
        });
    }
    if (ufWishAutoBtn) {
        ufWishAutoBtn.addEventListener('click', () => {
            if (isWishAuto) pauseWishAuto();
            else startWishAuto();
        });
    }

    // --- SCENE 4 Controller (Pikachu Interrupts 😂) ---
    function startScene4() {
        stopWishAuto();
        switchUfScene(ufScene4);
        playPikaSound();
    }

    if (ufBtnStartGame) {
        ufBtnStartGame.addEventListener('click', () => {
            startScene5();
        });
    }

    // --- SCENE 5 Controller (Game: Help Pikachu Collect 19 Hearts) ---
    let heartsCollected = 0;
    const totalHearts = 19;

    function startScene5() {
        switchUfScene(ufScene5);
        heartsCollected = 0;
        ufGameScore.textContent = `0 / ${totalHearts}`;
        ufGameBar.style.width = '0%';
        ufGameWin.classList.add('hidden');

        // Clear previous hearts
        const existingHearts = ufGameArena.querySelectorAll('.uf-heart, .uf-plus-one');
        existingHearts.forEach(h => h.remove());

        // Spawn 18 interactive hearts scattered playfully
        const rect = ufGameArena.getBoundingClientRect();
        const arenaW = rect.width > 200 ? rect.width : window.innerWidth * 0.8;
        const arenaH = rect.height > 250 ? rect.height : 360;

        for (let i = 0; i < totalHearts; i++) {
            const heart = document.createElement('div');
            heart.className = 'uf-heart';
            heart.textContent = '❤️';

            // Random positions avoiding edges
            const paddingX = 40;
            const paddingY = 40;
            const posX = paddingX + Math.random() * (arenaW - paddingX * 2 - 40);
            const posY = paddingY + Math.random() * (arenaH - paddingY * 2 - 80);

            heart.style.left = `${posX}px`;
            heart.style.top = `${posY}px`;
            heart.style.animationDelay = `${(Math.random() * 2).toFixed(2)}s`;

            heart.addEventListener('click', (e) => {
                e.stopPropagation();
                collectHeart(heart, posX, posY);
            });

            ufGameArena.appendChild(heart);
        }
    }

    function collectHeart(heartEl, x, y) {
        if (heartEl.dataset.collected) return;
        heartEl.dataset.collected = 'true';
        heartsCollected++;

        // Sound & Sparkle
        playChime(600 + heartsCollected * 28, 0.15, 'sine', 0.18);

        // Float +1 Text
        const plusOne = document.createElement('div');
        plusOne.className = 'uf-plus-one';
        plusOne.textContent = '+1 ✨';
        plusOne.style.left = `${x}px`;
        plusOne.style.top = `${y}px`;
        ufGameArena.appendChild(plusOne);
        setTimeout(() => plusOne.remove(), 800);

        // Move Pikachu runner toward heart
        ufGameRunner.style.left = `${Math.min(Math.max(x - 30, 20), ufGameArena.clientWidth - 110)}px`;
        ufRunnerBubble.textContent = 'Pika! ⚡';

        // Animate heart removal
        heartEl.style.transform = 'scale(1.5)';
        heartEl.style.opacity = '0';
        setTimeout(() => heartEl.remove(), 200);

        // Update score & meter
        ufGameScore.textContent = `${heartsCollected} / ${totalHearts}`;
        const pct = (heartsCollected / totalHearts) * 100;
        ufGameBar.style.width = `${pct}%`;

        // Check Win Condition (18/18)
        if (heartsCollected >= totalHearts) {
            setTimeout(() => {
                playFanfare();
                triggerUfBurst();
                ufGameWin.classList.remove('hidden');
            }, 500);
        }
    }

    if (ufBtnToGift) {
        ufBtnToGift.addEventListener('click', () => {
            startScene6();
        });
    }

    // --- SCENE 6 Controller (The Final Gift) ---
    function startScene6() {
        switchUfScene(ufScene6);
        ufGiftLid.style.transform = '';
    }

    function handleFinalGiftOpen() {
        ufGiftLid.style.transform = 'translateY(-60px) rotate(-25deg)';
        playFanfare();
        triggerUfBurst();
        ufFlash.classList.add('flash');
        setTimeout(() => ufFlash.classList.remove('flash'), 350);

        setTimeout(() => {
            startScene7();
        }, 750);
    }

    if (ufUltimateGift) {
        ufUltimateGift.addEventListener('click', handleFinalGiftOpen);
    }
    if (ufTapGiftHint) {
        ufTapGiftHint.addEventListener('click', handleFinalGiftOpen);
    }

    // --- SCENE 7 Controller (Final Reveal) ---
    function startScene7() {
        switchUfScene(ufScene7);
        playFanfare();
        startFireworksLoop();
    }

    if (ufBtnReplay) {
        ufBtnReplay.addEventListener('click', () => {
            stopFireworksLoop();
            startScene1();
        });
    }

    if (ufBtnExit) {
        ufBtnExit.addEventListener('click', () => {
            stopFireworksLoop();
            ultimateFinaleModal.classList.add('hidden');
            document.body.style.overflow = '';
            const finaleSec = document.getElementById('finale');
            if (finaleSec) {
                finaleSec.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Launch Ultimate Finale from Section 8
    function openUltimateSurprise() {
        if (!ultimateFinaleModal) return;
        document.querySelectorAll('.scene').forEach(s => s.classList.remove('active'));
        ultimateFinaleModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        resizeUfCanvas();
        ufCanvasRunning = true;
        renderUfCanvas();
        startScene1();
    }

    if (btnStartUltimate) {
        btnStartUltimate.addEventListener('click', openUltimateSurprise);
    }
    if (portalPokeballPrev) {
        portalPokeballPrev.addEventListener('click', openUltimateSurprise);
    }

    /* ================================================================
       CONFETTI
       ================================================================ */
    let confettiPieces = [];
    let confettiRunning = false;

    function launchConfetti() {
        confettiPieces = [];
        confettiRunning = true;
        const colors = ['#FFD700','#FFC107','#FFEB3B','#9C27B0','#7B1FA2','#BA68C8','#FF4081','#E91E63','#D4B8FF','#B388FF','#FF9800','#FF5722'];
        for (let i = 0; i < 200; i++) {
            confettiPieces.push({
                x: confettiCanvas.width/2 + (Math.random()-0.5)*200,
                y: confettiCanvas.height/2,
                w: Math.random()*10+5, h: Math.random()*6+3,
                color: colors[Math.floor(Math.random()*colors.length)],
                vx: (Math.random()-0.5)*15, vy: -(Math.random()*18+5),
                rotation: Math.random()*360, rotSpeed: (Math.random()-0.5)*12,
                gravity: 0.25+Math.random()*0.15, friction: 0.99,
                alpha: 1, shape: Math.random()>0.5?'rect':'circle'
            });
        }
        animateConfetti();
    }

    function animateConfetti() {
        if (!confettiRunning) return;
        confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        let alive = false;
        confettiPieces.forEach(p => {
            if (p.alpha <= 0) return;
            alive = true;
            p.vy += p.gravity; p.vx *= p.friction;
            p.x += p.vx; p.y += p.vy; p.rotation += p.rotSpeed;
            if (p.y > confettiCanvas.height * 0.8) p.alpha -= 0.02;
            confettiCtx.save();
            confettiCtx.translate(p.x, p.y);
            confettiCtx.rotate(p.rotation * Math.PI / 180);
            confettiCtx.globalAlpha = Math.max(0, p.alpha);
            confettiCtx.fillStyle = p.color;
            if (p.shape === 'rect') confettiCtx.fillRect(-p.w/2, -p.h/2, p.w, p.h);
            else { confettiCtx.beginPath(); confettiCtx.arc(0, 0, p.w/2, 0, Math.PI*2); confettiCtx.fill(); }
            confettiCtx.restore();
        });
        if (alive) requestAnimationFrame(animateConfetti);
        else { confettiRunning = false; confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height); }
    }

    /* ================================================================
       FLOATING EMOJIS
       ================================================================ */
    function spawnFloatingEmoji(emoji, x, y) {
        const el = document.createElement('div');
        el.className = 'floating-emoji';
        el.textContent = emoji;
        el.style.left = x + 'px';
        el.style.top = y + 'px';
        el.style.fontSize = (1 + Math.random() * 1.5) + 'rem';
        el.style.animationDuration = (3 + Math.random() * 3) + 's';
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 6000);
    }

    function launchFloatingEmojis() {
        const emojis = ['💜','🌻','❤️','🎉','💜','🌻','✨','💛','⚡','🌻'];
        let delay = 0;
        emojis.forEach(emoji => {
            for (let i = 0; i < 3; i++) {
                setTimeout(() => spawnFloatingEmoji(emoji, Math.random()*window.innerWidth, window.innerHeight+50), delay);
                delay += 150;
            }
        });
    }

    /* ================================================================
       BACKGROUND SCROLL TRANSITION
       ================================================================ */
    window.addEventListener('scroll', () => {
        const progress = Math.min(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight), 1);
        document.body.style.backgroundColor = `rgb(${Math.round(26+progress*20)}, ${Math.round(10+progress*10)}, ${Math.round(46-progress*10)})`;
        const opacity = (0.12 + progress * 0.12).toFixed(2);
        pokemonImages.forEach(img => { img.style.opacity = opacity; });
    }, { passive: true });

    /* ================================================================
       INITIAL STATE
       ================================================================ */
    mainContent.classList.add('hidden');
});
