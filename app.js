/**
 * For Diya — Romantic Birthday Website
 * Main Application Logic
 * Sequential section unlocking, interactive elements, canvas effects
 */

// ==========================================================================
// TOTAL PHOTOS
// ==========================================================================
const TOTAL_PHOTOS = 44;

// ==========================================================================
// STATE
// ==========================================================================
let currentSection = 0;
const totalSections = 9;
let currentLoveCard = 0;
let currentLightboxPhoto = 0;
let candlesBlown = false;

// ==========================================================================
// INITIALIZATION
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    initStarsCanvas();
    initFloatingHearts();
    initAmbientCanvas();
    initFireworksCanvas();
    initMusicToggle();
    initProgressDots();
    initNavigation();
    initLoveCards();
    initEnvelope();
    initGiftBox();
    initCakeCandles();
    initPhotoLightbox();
});

// ==========================================================================
// STARS CANVAS — Twinkling stars in deep navy sky
// ==========================================================================
function initStarsCanvas() {
    const canvas = document.getElementById('starsCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    });

    const stars = [];
    for (let i = 0; i < 100; i++) {
        stars.push({
            x: Math.random() * w,
            y: Math.random() * h,
            radius: 0.5 + Math.random() * 1.8,
            alpha: 0.3 + Math.random() * 0.7,
            twinkleSpeed: 0.005 + Math.random() * 0.02,
            twinkleOffset: Math.random() * Math.PI * 2
        });
    }

    let time = 0;

    function animate() {
        ctx.clearRect(0, 0, w, h);
        time += 0.016;

        stars.forEach(star => {
            const alpha = star.alpha * (0.5 + 0.5 * Math.sin(time * star.twinkleSpeed * 60 + star.twinkleOffset));
            ctx.save();
            ctx.globalAlpha = alpha;
            ctx.fillStyle = '#ffffff';
            ctx.shadowColor = '#ffffff';
            ctx.shadowBlur = star.radius * 3;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });

        requestAnimationFrame(animate);
    }

    animate();
}

// ==========================================================================
// FLOATING HEARTS CANVAS — Subtle hearts drifting upward
// ==========================================================================
function initFloatingHearts() {
    const canvas = document.getElementById('heartsCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    });

    const hearts = [];

    function createHeart() {
        return {
            x: Math.random() * w,
            y: h + 20,
            size: 8 + Math.random() * 14,
            speedY: 0.3 + Math.random() * 0.6,
            swaySpeed: 0.008 + Math.random() * 0.015,
            swayAmp: 20 + Math.random() * 40,
            swayOffset: Math.random() * Math.PI * 2,
            alpha: 0.08 + Math.random() * 0.15,
            rotation: Math.random() * 0.3 - 0.15,
            color: Math.random() > 0.5 ? 'rgba(232, 96, 124,' : 'rgba(242, 160, 176,'
        };
    }

    // Start with a few
    for (let i = 0; i < 8; i++) {
        const heart = createHeart();
        heart.y = Math.random() * h;
        hearts.push(heart);
    }

    let time = 0;
    let lastSpawn = 0;

    function drawHeart(ctx, x, y, size) {
        ctx.beginPath();
        const topCurveHeight = size * 0.3;
        ctx.moveTo(x, y + topCurveHeight);
        // Left curve
        ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
        ctx.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + (size + topCurveHeight) / 1.25, x, y + size);
        // Right curve
        ctx.bezierCurveTo(x, y + (size + topCurveHeight) / 1.25, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
        ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
        ctx.closePath();
    }

    function animate() {
        ctx.clearRect(0, 0, w, h);
        time++;

        // Spawn new hearts occasionally
        if (time - lastSpawn > 120 + Math.random() * 200) {
            hearts.push(createHeart());
            lastSpawn = time;
        }

        for (let i = hearts.length - 1; i >= 0; i--) {
            const ht = hearts[i];
            ht.y -= ht.speedY;
            const sx = ht.x + Math.sin(time * ht.swaySpeed + ht.swayOffset) * ht.swayAmp;

            if (ht.y < -30) {
                hearts.splice(i, 1);
                continue;
            }

            ctx.save();
            ctx.globalAlpha = ht.alpha;
            ctx.translate(sx, ht.y);
            ctx.rotate(ht.rotation + Math.sin(time * 0.02) * 0.1);
            ctx.fillStyle = ht.color + ht.alpha + ')';
            drawHeart(ctx, 0, -ht.size / 2, ht.size);
            ctx.fill();
            ctx.restore();
        }

        requestAnimationFrame(animate);
    }

    animate();
}

// ==========================================================================
// AMBIENT CANVAS — Floating Flowers, Love, Cakes & Stars
// ==========================================================================
function initAmbientCanvas() {
    const canvas = document.getElementById('ambientCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    });

    // Define all floating item categories
    const itemPool = [
        // Flowers 🌸
        { emoji: '🌸', weight: 3 },
        { emoji: '🌹', weight: 2 },
        { emoji: '🌷', weight: 2 },
        { emoji: '💐', weight: 1 },
        { emoji: '🌺', weight: 2 },
        { emoji: '🪷', weight: 1 },
        // Love ❤️
        { emoji: '❤️', weight: 2 },
        { emoji: '💕', weight: 2 },
        { emoji: '💗', weight: 1 },
        { emoji: '💖', weight: 1 },
        { emoji: '🫶', weight: 1 },
        // Cakes 🎂
        { emoji: '🎂', weight: 2 },
        { emoji: '🧁', weight: 2 },
        { emoji: '🍰', weight: 1 },
        { emoji: '🎁', weight: 1 },
        // Stars ⭐
        { emoji: '⭐', weight: 2 },
        { emoji: '✨', weight: 3 },
        { emoji: '🌟', weight: 2 },
        { emoji: '💫', weight: 1 },
    ];

    // Build weighted pool
    const weightedPool = [];
    itemPool.forEach(item => {
        for (let i = 0; i < item.weight; i++) {
            weightedPool.push(item.emoji);
        }
    });

    function pickRandom() {
        return weightedPool[Math.floor(Math.random() * weightedPool.length)];
    }

    // Create floating items
    const items = [];
    const ITEM_COUNT = 28;

    function createItem(startRandom) {
        const size = 18 + Math.random() * 22;
        return {
            emoji: pickRandom(),
            x: Math.random() * w,
            y: startRandom ? Math.random() * h : h + 30 + Math.random() * 100,
            size: size,
            speedY: 0.25 + Math.random() * 0.55,
            speedX: (Math.random() - 0.5) * 0.3,
            rotation: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.015,
            swaySpeed: 0.006 + Math.random() * 0.012,
            swayAmp: 25 + Math.random() * 50,
            swayOffset: Math.random() * Math.PI * 2,
            opacity: 0.15 + Math.random() * 0.3,
            pulseSpeed: 0.01 + Math.random() * 0.02,
            pulseOffset: Math.random() * Math.PI * 2,
        };
    }

    // Initialize with items spread across screen
    for (let i = 0; i < ITEM_COUNT; i++) {
        items.push(createItem(true));
    }

    let time = 0;

    function animate() {
        ctx.clearRect(0, 0, w, h);
        time++;

        for (let i = items.length - 1; i >= 0; i--) {
            const item = items[i];

            // Move upward and drift
            item.y -= item.speedY;
            item.x += item.speedX;
            item.rotation += item.rotSpeed;

            // Horizontal sway
            const swayX = Math.sin(time * item.swaySpeed + item.swayOffset) * item.swayAmp;
            const drawX = item.x + swayX;

            // Gentle pulse (size breathing)
            const pulse = 1 + Math.sin(time * item.pulseSpeed + item.pulseOffset) * 0.12;
            const drawSize = item.size * pulse;

            // Recycle when off-screen
            if (item.y < -50 || drawX < -60 || drawX > w + 60) {
                items[i] = createItem(false);
                continue;
            }

            // Draw the emoji
            ctx.save();
            ctx.globalAlpha = item.opacity;
            ctx.translate(drawX, item.y);
            ctx.rotate(Math.sin(time * 0.008 + item.swayOffset) * 0.25);
            ctx.font = `${drawSize}px sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(item.emoji, 0, 0);
            ctx.restore();
        }

        requestAnimationFrame(animate);
    }

    animate();
}

// ==========================================================================
// FIREWORKS CANVAS
// ==========================================================================
let fwCanvas, fwCtx;
let fwParticles = [];

function initFireworksCanvas() {
    fwCanvas = document.getElementById('fireworksCanvas');
    if (!fwCanvas) return;
    fwCtx = fwCanvas.getContext('2d');

    const resize = () => {
        fwCanvas.width = window.innerWidth;
        fwCanvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    requestAnimationFrame(renderFireworks);
}

function createFireworks(x, y, count = 40) {
    const colors = ['#e8607c', '#f2a0b0', '#f7c5cc', '#d4a574', '#ffffff', '#ffd166', '#ff9ecd'];
    for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 5;
        fwParticles.push({
            x, y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            radius: 1.5 + Math.random() * 2.5,
            color: colors[Math.floor(Math.random() * colors.length)],
            alpha: 1,
            decay: 0.012 + Math.random() * 0.018,
            gravity: 0.08
        });
    }
}

function renderFireworks() {
    if (!fwCtx) return;
    fwCtx.clearRect(0, 0, fwCanvas.width, fwCanvas.height);

    for (let i = fwParticles.length - 1; i >= 0; i--) {
        const p = fwParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
            fwParticles.splice(i, 1);
            continue;
        }

        fwCtx.save();
        fwCtx.globalAlpha = p.alpha;
        fwCtx.fillStyle = p.color;
        fwCtx.shadowColor = p.color;
        fwCtx.shadowBlur = 6;
        fwCtx.beginPath();
        fwCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        fwCtx.fill();
        fwCtx.restore();
    }

    requestAnimationFrame(renderFireworks);
}

function triggerCelebration() {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const x = window.innerWidth * (0.2 + Math.random() * 0.6);
            const y = window.innerHeight * (0.2 + Math.random() * 0.4);
            createFireworks(x, y, 35);
        }, i * 300);
    }
}

// ==========================================================================
// MUSIC TOGGLE
// ==========================================================================
function initMusicToggle() {
    const btn = document.getElementById('musicToggleBtn');
    btn.addEventListener('click', () => {
        const isPlaying = window.birthdayAudio.toggleMusic();
        btn.classList.toggle('playing', isPlaying);
    });
}

// ==========================================================================
// PROGRESS DOTS
// ==========================================================================
function initProgressDots() {
    document.querySelectorAll('.dot').forEach(dot => {
        dot.addEventListener('click', () => {
            const sectionNum = parseInt(dot.dataset.section, 10);
            // Only allow going to visited sections
            if (dot.classList.contains('visited') || dot.classList.contains('active')) {
                goToSection(sectionNum);
            }
        });
    });
}

function updateProgressDots(sectionIndex) {
    document.querySelectorAll('.dot').forEach((dot, idx) => {
        dot.classList.remove('active');
        if (idx < sectionIndex) {
            dot.classList.add('visited');
        }
        if (idx === sectionIndex) {
            dot.classList.add('active');
        }
    });
}

// ==========================================================================
// SECTION NAVIGATION
// ==========================================================================
function goToSection(index) {
    if (index < 0 || index >= totalSections) return;

    // Hide current
    document.querySelectorAll('.section').forEach(sec => {
        sec.classList.remove('active-section');
    });

    // Show target
    const target = document.getElementById(`section-${index}`);
    if (target) {
        target.classList.add('active-section');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    currentSection = index;
    updateProgressDots(index);

    // Sound
    if (window.birthdayAudio && window.birthdayAudio.ctx) {
        window.birthdayAudio.playSparkle();
    }

    // Special effects for certain sections
    if (index === 1) {
        // Birthday section — confetti
        setTimeout(() => {
            createFireworks(window.innerWidth / 2, window.innerHeight / 3, 45);
        }, 600);
    }

    if (index === 8) {
        // Finale — big celebration
        setTimeout(() => triggerCelebration(), 500);
    }
}

function initNavigation() {
    // Section 0 → 1
    document.getElementById('openSurpriseBtn').addEventListener('click', () => {
        // Auto-start music
        if (window.birthdayAudio && !window.birthdayAudio.isPlayingMusic) {
            window.birthdayAudio.startMusic();
            document.getElementById('musicToggleBtn').classList.add('playing');
        }
        goToSection(1);
    });

    // Section 1 → 2
    document.getElementById('toStoryBtn').addEventListener('click', () => goToSection(2));

    // Section 2 → 3
    document.getElementById('toLoveBtn').addEventListener('click', () => goToSection(3));

    // Section 3 → 4 (handled after love cards complete)
    document.getElementById('toLetterBtn').addEventListener('click', () => goToSection(4));

    // Section 4 → 5 (handled after letter)
    document.getElementById('toSurpriseBtn').addEventListener('click', () => goToSection(5));

    // Section 5 → 6
    document.getElementById('toFutureBtn').addEventListener('click', () => goToSection(6));

    // Section 6 → 7
    document.getElementById('toWishBtn').addEventListener('click', () => goToSection(7));

    // Section 7 → 8 (after candles)
    document.getElementById('toFinaleBtn').addEventListener('click', () => goToSection(8));
}

// ==========================================================================
// LOVE CARDS (Interactive)
// ==========================================================================
function initLoveCards() {
    const stack = document.getElementById('loveCardStack');
    const cards = stack.querySelectorAll('.love-card');
    const finalText = document.getElementById('loveFinal');
    const nextBtn = document.getElementById('toLetterBtn');

    stack.addEventListener('click', () => {
        if (window.birthdayAudio && window.birthdayAudio.ctx) {
            window.birthdayAudio.playHeartPop();
        }

        // Hide current card
        cards[currentLoveCard].classList.remove('active-card');
        currentLoveCard++;

        if (currentLoveCard < cards.length) {
            // Show next card
            cards[currentLoveCard].classList.add('active-card');

            // Small confetti
            const rect = stack.getBoundingClientRect();
            createFireworks(rect.left + rect.width / 2, rect.top + rect.height / 2, 15);
        } else {
            // All cards done — show final message
            stack.style.display = 'none';
            finalText.classList.remove('hidden');
            nextBtn.classList.remove('hidden');

            createFireworks(window.innerWidth / 2, window.innerHeight / 2, 30);
        }
    });
}

// ==========================================================================
// ENVELOPE / LETTER
// ==========================================================================
function initEnvelope() {
    const envelope = document.getElementById('envelope');
    const openBtn = document.getElementById('openLetterBtn');
    const envelopeContainer = document.getElementById('envelopeContainer');
    const letterContent = document.getElementById('letterContent');

    openBtn.addEventListener('click', () => {
        envelope.classList.add('opened');

        if (window.birthdayAudio && window.birthdayAudio.ctx) {
            window.birthdayAudio.playEnvelopeOpen();
        }

        setTimeout(() => {
            envelopeContainer.classList.add('hidden');
            letterContent.classList.remove('hidden');
        }, 800);
    });
}

// ==========================================================================
// GIFT BOX
// ==========================================================================
function initGiftBox() {
    const giftBox = document.getElementById('giftBox');
    const openBtn = document.getElementById('openGiftBtn');
    const wrapper = document.getElementById('giftBoxWrapper');
    const reveal = document.getElementById('giftReveal');

    openBtn.addEventListener('click', () => {
        giftBox.classList.add('opened');

        if (window.birthdayAudio && window.birthdayAudio.ctx) {
            window.birthdayAudio.playGiftOpen();
        }

        // Confetti burst
        const rect = giftBox.getBoundingClientRect();
        createFireworks(rect.left + rect.width / 2, rect.top + rect.height / 2, 50);

        setTimeout(() => {
            wrapper.classList.add('hidden');
            reveal.classList.remove('hidden');
        }, 700);
    });
}

// ==========================================================================
// CAKE & CANDLES
// ==========================================================================
function initCakeCandles() {
    const candlesRow = document.getElementById('candlesRow');
    const blowBtn = document.getElementById('blowCandlesBtn');
    const wishResult = document.getElementById('wishResult');

    // Create candles
    for (let i = 0; i < 7; i++) {
        const candle = document.createElement('div');
        candle.className = 'candle';

        const flame = document.createElement('div');
        flame.className = 'candle-flame';
        candle.appendChild(flame);

        const smoke = document.createElement('div');
        smoke.className = 'candle-smoke';
        candle.appendChild(smoke);

        // Click individual candle
        candle.addEventListener('click', () => {
            if (!candle.classList.contains('blown')) {
                candle.classList.add('blown');
                checkAllCandles();
            }
        });

        candlesRow.appendChild(candle);
    }

    // Blow all button
    blowBtn.addEventListener('click', () => {
        if (candlesBlown) return;

        if (window.birthdayAudio && window.birthdayAudio.ctx) {
            window.birthdayAudio.playBlowCandle();
        }

        const candles = document.querySelectorAll('.candle');
        candles.forEach((c, idx) => {
            setTimeout(() => c.classList.add('blown'), idx * 80);
        });

        setTimeout(() => {
            candlesBlown = true;
            blowBtn.classList.add('hidden');
            wishResult.classList.remove('hidden');
            triggerCelebration();

            if (window.birthdayAudio && window.birthdayAudio.ctx) {
                window.birthdayAudio.playCelebration();
            }
        }, 700);
    });
}

function checkAllCandles() {
    const allBlown = document.querySelectorAll('.candle.blown').length;
    if (allBlown >= 7 && !candlesBlown) {
        candlesBlown = true;

        setTimeout(() => {
            document.getElementById('blowCandlesBtn').classList.add('hidden');
            document.getElementById('wishResult').classList.remove('hidden');
            triggerCelebration();

            if (window.birthdayAudio && window.birthdayAudio.ctx) {
                window.birthdayAudio.playCelebration();
            }
        }, 500);
    }
}

// ==========================================================================
// PHOTO LIGHTBOX
// ==========================================================================
function initPhotoLightbox() {
    const lightbox = document.getElementById('photoLightbox');
    const img = document.getElementById('lightboxImg');
    const counter = document.getElementById('lightboxCounter');
    const closeBtn = document.getElementById('closeLightbox');
    const backdrop = lightbox.querySelector('.lightbox-backdrop');
    const prevBtn = document.getElementById('lightboxPrev');
    const nextBtn = document.getElementById('lightboxNext');

    // Click any polaroid to open lightbox
    document.querySelectorAll('.polaroid').forEach(polaroid => {
        polaroid.addEventListener('click', () => {
            const photoIndex = parseInt(polaroid.dataset.photo, 10);
            openLightbox(photoIndex);
        });
    });

    function openLightbox(index) {
        currentLightboxPhoto = index;
        updateLightbox();
        lightbox.classList.remove('hidden');
    }

    function updateLightbox() {
        const photoNum = currentLightboxPhoto + 1;
        img.src = `photos/photo_${String(photoNum).padStart(2, '0')}.jpg`;
        counter.textContent = `${photoNum} / ${TOTAL_PHOTOS}`;
    }

    function closeLightbox() {
        lightbox.classList.add('hidden');
    }

    closeBtn.addEventListener('click', closeLightbox);
    backdrop.addEventListener('click', closeLightbox);

    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentLightboxPhoto = (currentLightboxPhoto - 1 + TOTAL_PHOTOS) % TOTAL_PHOTOS;
        updateLightbox();
    });

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentLightboxPhoto = (currentLightboxPhoto + 1) % TOTAL_PHOTOS;
        updateLightbox();
    });

    // Keyboard navigation
    window.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('hidden')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') {
            currentLightboxPhoto = (currentLightboxPhoto - 1 + TOTAL_PHOTOS) % TOTAL_PHOTOS;
            updateLightbox();
        }
        if (e.key === 'ArrowRight') {
            currentLightboxPhoto = (currentLightboxPhoto + 1) % TOTAL_PHOTOS;
            updateLightbox();
        }
    });
}
