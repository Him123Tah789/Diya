/**
 * Tarunno's 11th Birthday World - Main Application Logic
 * Level 11 Adventure & Interactive Features
 */

// ==========================================================================
// TRANSLATIONS DICTIONARY (English & Norwegian)
// ==========================================================================
// ==========================================================================
// TRANSLATIONS DICTIONARY (English & Norwegian)
// ==========================================================================
const translations = {
    en: {
        musicPlay: "Play Music",
        musicPause: "Pause Music",
        adventureProgress: "Quest Progress:",
        heroSpecialDay: "A Special Day Just For You!",
        heroGreeting: "Hey",
        heroSubtitle: "Welcome to your",
        heroDesc: "A magical adventure crafted specially for you. Pop balloons, make a wish on your cake, unlock secret gifts, and explore cherished memories!",
        heroBtnStart: "Open Your Surprise & Start Adventure 🚀",
        gameMission: "Mission 1 of 4",
        gameTitle: "Pop 5 Birthday Balloons! 🎈",
        gameSubtitle: "Click or tap the floating balloons to collect Level 11 energy!",
        gameBalloonsLeft: "Balloons Popped:",
        gameSuccess: "Awesome Job, Tarunno!",
        gameSuccessDesc: "You popped all 5 balloons and unlocked your birthday cake!",
        btnGoCake: "Go to Birthday Cake 🎂",
        cakeMission: "Mission 2 of 4",
        cakeTitle: "Happy 11th Birthday, Tarunno! 🎂",
        cakeSubtitle: "There are 11 glowing candles for your 11 wonderful years! Make a secret wish and blow them out.",
        cakeBlowBtn: "Make a Wish & Blow All Candles 🌬️",
        wishSentTitle: "Your wish has been sent to the stars! ✨🌟",
        wishSentDesc: "May all your beautiful dreams come true this year and always!",
        btnGoGift: "Open Your Mystery Gift 🎁",
        giftMission: "Mission 3 of 4",
        giftTitle: "Mystery Gift Box 🎁",
        giftSubtitle: "Tap the gift box to unlock your special surprise!",
        giftUnlockedTitle: "Surprise Unlocked! 🎉",
        giftUnlockedDesc: "A special video message and a treasure chest of memories await you!",
        giftVideoCaption: "Special Birthday Video for Tarunno 🎥✨",
        btnGoMemories: "View Photo Memories 📸",
        btnGoBlessing: "Read মামা's Blessing 💌",
        memoriesBadge: "Photo Album 📸",
        memoriesTitle: "11 Years of Smiles & Sunshine 🌟",
        memoriesSubtitle: "Look at how awesome, joyful, and smart you are! Click any photo to enlarge.",
        btnReadBlessing: "Read Mama's Heartfelt Blessing ❤️",
        blessingHeaderBadge: "A Beautiful Blessing for Tarunno",
        presenterTag: "Special Dedication 🌟",
        presenterIntro: "Presented with all my love & prayers by your মামা",
        blessingSalutation: "Happy Birthday, my little superstar!",
        wishCloud1: "May Allah always keep you safe and happy.",
        wishCloud2: "May you always be healthy and full of energy.",
        wishCloud3: "May you learn new things, become smart, and always do your best!",
        wishCloud4: "May all your dreams come true and bring lots of happiness to you.",
        wishCloud5: "May you grow up to be a kind, brave, and wonderful person.",
        blessingPara3: "Always keep smiling, keep playing, and never stop dreaming big! 🌟",
        luckyText: "“I am so lucky to have you in my life.”",
        blessingSign: "Lots of love and blessings from your",
        blessingFinal: "Happy Birthday! 🎉🎂",
        btnGrandFinale: "Launch Grand Fireworks & Claim Certificate! 🏆",
        certTitle: "LEVEL 11 SUPERSTAR CERTIFICATE",
        certSubtitle: "Officially Awarded On This 22nd of August",
        certAwardTo: "This certificate is proudly awarded to:",
        certText: "For completing 11 incredible years filled with laughter, kindness, bright smiles, and super intelligence! You are loved beyond words.",
        certSignatureTitle: "Presented with All My Love & Prayers",
        finalQuote: "“Keep smiling, little superstar! 🌟”",
        finalSub: "“From your মামা / uncle Faishal ❤️”",
        tapAnywhere: "Tap anywhere on the screen to shoot colorful fireworks!",
        btnReplay: "Play Adventure Again 🔄"
    },
    no: {
        musicPlay: "Spill musikk",
        musicPause: "Pause musikk",
        adventureProgress: "Eventyrprogresjon:",
        heroSpecialDay: "En helt spesiell dag for deg!",
        heroGreeting: "Hei",
        heroSubtitle: "Velkommen til din",
        heroDesc: "Et magisk eventyr laget spesielt for deg. Sprekk ballonger, ønsk deg noe på kaken, lås opp hemmelige gaver og se flotte minner!",
        heroBtnStart: "Åpne overraskelsen og start eventyret 🚀",
        gameMission: "Oppdrag 1 av 4",
        gameTitle: "Sprekk 5 bursdagsballonger! 🎈",
        gameSubtitle: "Klikk eller trykk på de svevende ballongene for å samle Nivå 11-energi!",
        gameBalloonsLeft: "Ballonger sprukket:",
        gameSuccess: "Fantastisk jobba, Tarunno!",
        gameSuccessDesc: "Du sprakk alle 5 ballongene og låste opp bursdagskaken din!",
        btnGoCake: "Gå til bursdagskaken 🎂",
        cakeMission: "Oppdrag 2 av 4",
        cakeTitle: "Gratulerer med 11-årsdagen, Tarunno! 🎂",
        cakeSubtitle: "Det er 11 lysende kakelys for dine 11 fantastiske år! Ønsk deg noe og blås dem ut.",
        cakeBlowBtn: "Ønsk deg noe og blås ut lysene 🌬️",
        wishSentTitle: "Ønsket ditt er sendt til stjernene! ✨🌟",
        wishSentDesc: "Måtte alle dine vakre drømmer gå i oppfyllelse i år og for alltid!",
        btnGoGift: "Åpne din hemmelige gave 🎁",
        giftMission: "Oppdrag 3 av 4",
        giftTitle: "Hemmelig gaveeske 🎁",
        giftSubtitle: "Trykk på gaveesken for å låse opp overraskelsen din!",
        giftUnlockedTitle: "Overraskelse låst opp! 🎉",
        giftUnlockedDesc: "En spesiell videohilsen og en skattekiste av gode minner venter!",
        giftVideoCaption: "Spesiell bursdagsvideo for Tarunno 🎥✨",
        btnGoMemories: "Se bildeminner 📸",
        btnGoBlessing: "Les মামা sin velsignelse 💌",
        memoriesBadge: "Fotoalbum 📸",
        memoriesTitle: "11 år med smil og solskinn 🌟",
        memoriesSubtitle: "Se så fantastisk, blid og smart du er! Klikk på et bilde for å forstørre.",
        btnReadBlessing: "Les Mamas hjertelige velsignelse ❤️",
        blessingHeaderBadge: "En vakker velsignelse til Tarunno",
        presenterTag: "Spesiell dedikasjon 🌟",
        presenterIntro: "Presentert med all min kjærlighet og bønner av din মামা",
        blessingSalutation: "Gratulerer med dagen, min lille superstjerne!",
        wishCloud1: "Måtte Allah alltid holde deg trygg og lykkelig.",
        wishCloud2: "Måtte du alltid være frisk og full av energi.",
        wishCloud3: "Måtte du lære nye ting, bli smart, og alltid gjøre ditt beste!",
        wishCloud4: "Måtte alle dine drømmer gå i oppfyllelse og bringe deg masse lykke.",
        wishCloud5: "Måtte du vokse opp til å bli en snill, modig og fantastisk person.",
        blessingPara3: "Fortsett alltid å smile, fortsett å leke, og slutt aldri å drømme stort! 🌟",
        luckyText: "“Jeg er så heldig som har deg i livet mitt.”",
        blessingSign: "Masse kjærlighet og velsignelser fra din",
        blessingFinal: "Gratulerer med dagen! 🎉🎂",
        btnGrandFinale: "Fyr av storslått fyrverkeri og motta sertifikat! 🏆",
        certTitle: "NIVÅ 11 SUPERSTJERNE-SERTIFIKAT",
        certSubtitle: "Offisielt tildelt den 22. august",
        certAwardTo: "Dette sertifikatet tildeles stolt til:",
        certText: "For å ha fullført 11 fantastiske år fylt med latter, godhet, herlige smil og super intelligens! Du er elsket over alt på jord.",
        certSignatureTitle: "Presentert med all min kjærlighet og bønner",
        finalQuote: "“Fortsett å smile, lille superstjerne! 🌟”",
        finalSub: "“Fra din মামা / onkel Faishal ❤️”",
        tapAnywhere: "Trykk hvor som helst på skjermen for å skyte fargerikt fyrverkeri!",
        btnReplay: "Start eventyret på nytt 🔄"
    }
};

let currentLang = 'en';

// Photo dataset for all 13 images
const photos = [
    { src: 'Image (7).jfif', enCaption: 'Handsome little champion! 🌟', noCaption: 'Kjekk liten mester! 🌟', pos: 'center top' },
    { src: 'Image (8).jfif', enCaption: 'That bright contagious smile! 😊', noCaption: 'Det herlige, smittende smilet! 😊', pos: 'center top' },
    { src: 'Image (9).jfif', enCaption: 'Ready for new adventures! 🚀', noCaption: 'Klar for nye eventyr! 🚀', pos: 'center top' },
    { src: 'Image (10).jfif', enCaption: 'Coolest superstar around! ⚡', noCaption: 'Kuleste superstjernen! ⚡', pos: 'center top' },
    { src: 'Image (11).jfif', enCaption: 'Pure joy & happiness! ✨', noCaption: 'Ren glede og lykke! ✨', pos: 'center 5%' },
    { src: 'Image (12).jfif', enCaption: 'Making memories every day! 📸', noCaption: 'Skaper minner hver dag! 📸', pos: 'center top' },
    { src: 'Image (13).jfif', enCaption: 'Smart, curious & wonderful! 🧠', noCaption: 'Smart, nysgjerrig og flott! 🧠', pos: 'center top' },
    { src: 'Image (14).jfif', enCaption: 'Sunshine in human form! ☀️', noCaption: 'Solskinn i menneskeform! ☀️', pos: 'center top' },
    { src: 'Image (15).jfif', enCaption: 'Charming smile as always! ❤️', noCaption: 'Sjarmerende smil som alltid! ❤️', pos: 'center top' },
    { src: 'Image (16).jfif', enCaption: 'Growing so fast into a superstar! 🌈', noCaption: 'Vokser så fort til en superstjerne! 🌈', pos: 'center top' },
    { src: 'Image (17).jfif', enCaption: 'Moments of pure laughter! 🎈', noCaption: 'Øyeblikk med ren latter! 🎈', pos: 'center top' },
    { src: 'Image (18).jfif', enCaption: 'Loved by the whole family! 💖', noCaption: 'Elsket av hele familien! 💖', pos: 'center top' },
    { src: 'Image (19).jfif', enCaption: 'Level 11: Ready to conquer the world! 🏆', noCaption: 'Nivå 11: Klar til å erobre verden! 🏆', pos: 'center top' }
];

// App State
let currentSceneIndex = 1;
const totalScenes = 7;
let poppedBalloons = 0;
const targetBalloons = 5;
let currentLightboxIndex = 0;

// ==========================================================================
// INITIALIZATION
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    initLanguage();
    initAudioControls();
    initMagicalAmbientBackground();
    initCursorMagic();
    initFireworks();
    initBalloonsGame();
    initCakeCandles();
    initGiftBox();
    initPolaroidGallery();
    initWishPosterZoom();
    initNavigationFlow();
    initGlobalClickCelebration();
});

// ==========================================================================
// LANGUAGE SWITCHER
// ==========================================================================
function initLanguage() {
    const langEnBtn = document.getElementById('langEnBtn');
    const langNoBtn = document.getElementById('langNoBtn');

    langEnBtn.addEventListener('click', () => setLanguage('en'));
    langNoBtn.addEventListener('click', () => setLanguage('no'));
}

function setLanguage(lang) {
    currentLang = lang;
    document.body.className = `lang-${lang}`;

    document.getElementById('langEnBtn').classList.toggle('active', lang === 'en');
    document.getElementById('langNoBtn').classList.toggle('active', lang === 'no');

    // Update all text nodes with data-key
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });

    // Update music button label based on playback state
    updateMusicButtonLabel();

    // Update polaroid captions
    document.querySelectorAll('.polaroid-card').forEach((card, idx) => {
        const captionEl = card.querySelector('.polaroid-caption');
        if (captionEl && photos[idx]) {
            captionEl.textContent = lang === 'en' ? photos[idx].enCaption : photos[idx].noCaption;
        }
    });

    // Update Lightbox if open
    updateLightboxContent();
}

function updateMusicButtonLabel() {
    const musicText = document.querySelector('.music-text');
    if (!musicText) return;
    if (window.birthdayAudio && window.birthdayAudio.isPlayingMusic) {
        musicText.textContent = translations[currentLang].musicPause;
    } else {
        musicText.textContent = translations[currentLang].musicPlay;
    }
}

// ==========================================================================
// AUDIO CONTROLS
// ==========================================================================
function initAudioControls() {
    const musicBtn = document.getElementById('musicToggleBtn');
    musicBtn.addEventListener('click', () => {
        const isPlaying = window.birthdayAudio.toggleMusic();
        musicBtn.classList.toggle('playing', isPlaying);
        updateMusicButtonLabel();
    });
}

// ==========================================================================
// SCENE / QUEST PROGRESSION
// ==========================================================================
function showScene(sceneId, stepNum) {
    document.querySelectorAll('.section').forEach(sec => {
        sec.classList.remove('active-scene');
    });

    const targetSection = document.getElementById(sceneId);
    if (targetSection) {
        targetSection.classList.add('active-scene');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Update progress tracker
    const progressPercent = Math.min(100, Math.round((stepNum / 6) * 100));
    document.getElementById('adventureProgressBar').style.width = `${progressPercent}%`;

    document.querySelectorAll('.step-badge').forEach(badge => {
        const badgeStep = parseInt(badge.getAttribute('data-step'), 10);
        badge.classList.toggle('active', badgeStep <= stepNum);
    });

    // Pause gift video if leaving gift scene
    const giftVideo = document.getElementById('giftVideo');
    if (giftVideo && sceneId !== 'giftSection') {
        giftVideo.pause();
    }

    // Play sparkle sound
    if (window.birthdayAudio) {
        window.birthdayAudio.playMagicSparkle();
    }
}

function initNavigationFlow() {
    // Step 1 -> Step 2
    document.getElementById('startAdventureBtn').addEventListener('click', () => {
        // Auto-start music upon first user interaction
        if (window.birthdayAudio && !window.birthdayAudio.isPlayingMusic) {
            window.birthdayAudio.startMusic();
            document.getElementById('musicToggleBtn').classList.add('playing');
            updateMusicButtonLabel();
        }
        showScene('gameSection', 2);
    });

    // Step 2 -> Step 3
    document.getElementById('toCakeBtn').addEventListener('click', () => {
        showScene('cakeSection', 3);
    });

    // Step 3 -> Step 4
    document.getElementById('toGiftBtn').addEventListener('click', () => {
        showScene('giftSection', 4);
    });

    // Step 4 -> Step 5 or 6
    document.getElementById('toMemoriesBtn').addEventListener('click', () => {
        showScene('memoriesSection', 5);
    });

    document.getElementById('toBlessingDirectBtn').addEventListener('click', () => {
        showScene('blessingSection', 6);
    });

    // Step 5 -> Step 6
    document.getElementById('toBlessingBtn').addEventListener('click', () => {
        showScene('blessingSection', 6);
    });

    // Step 6 -> Step 7 (Grand Finale)
    document.getElementById('launchCelebrationBtn').addEventListener('click', () => {
        showScene('finaleSection', 6);
        triggerBigCelebrationBurst();
    });

    // Replay Button
    document.getElementById('restartAdventureBtn').addEventListener('click', () => {
        resetGame();
        showScene('heroSection', 1);
    });

    // Step badge clicks
    document.querySelectorAll('.step-badge').forEach(badge => {
        badge.addEventListener('click', () => {
            const step = parseInt(badge.getAttribute('data-step'), 10);
            const sceneMap = {
                1: 'heroSection',
                2: 'gameSection',
                3: 'cakeSection',
                4: 'giftSection',
                5: 'memoriesSection',
                6: 'blessingSection'
            };
            if (sceneMap[step]) {
                showScene(sceneMap[step], step);
            }
        });
    });
}

function resetGame() {
    poppedBalloons = 0;
    document.getElementById('poppedCount').textContent = `0 / ${targetBalloons}`;
    document.getElementById('gameCompleteBanner').classList.add('hidden');
    spawnGameBalloons();

    // Reset candles
    document.querySelectorAll('.candle').forEach(c => c.classList.remove('blown'));
    document.getElementById('starWishBox').classList.add('hidden');

    // Reset gift
    const giftBox = document.getElementById('giftBoxElement');
    giftBox.classList.remove('hidden');
    giftBox.classList.remove('opened');
    giftBox.classList.add('bounce-box');
    document.getElementById('giftRevealedCard').classList.add('hidden');

    // Reset and pause video
    const giftVideo = document.getElementById('giftVideo');
    if (giftVideo) {
        giftVideo.pause();
        giftVideo.currentTime = 0;
    }
}

// ==========================================================================
// MISSION 1: BALLOON POPPING MINI-GAME
// ==========================================================================
function initBalloonsGame() {
    spawnGameBalloons();
}

function spawnGameBalloons() {
    const arena = document.getElementById('balloonArena');
    arena.innerHTML = '';

    const colors = [
        'radial-gradient(circle at 35% 35%, #ff5e7e, #d90429)',
        'radial-gradient(circle at 35% 35%, #ffd166, #ff9e00)',
        'radial-gradient(circle at 35% 35%, #06d6a0, #0096c7)',
        'radial-gradient(circle at 35% 35%, #8338ec, #3a0ca3)',
        'radial-gradient(circle at 35% 35%, #ff70a6, #c77dff)',
        'radial-gradient(circle at 35% 35%, #4cc9f0, #4361ee)',
        'radial-gradient(circle at 35% 35%, #ffd166, #ff70a6)'
    ];

    const emojis = ['🎈', '⭐', '🎂', '⚡', '🎉', '🌟', '🎁'];

    for (let i = 0; i < 7; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'pop-balloon';
        balloon.style.background = colors[i % colors.length];
        balloon.textContent = emojis[i % emojis.length];

        // Random positions inside arena
        const posX = 8 + Math.random() * 75; // percent
        const posY = 15 + Math.random() * 60; // percent
        balloon.style.left = `${posX}%`;
        balloon.style.top = `${posY}%`;

        // Gentle floating animation offset
        balloon.style.animation = `floatDecor ${3 + Math.random() * 3}s infinite ease-in-out alternate`;
        balloon.style.animationDelay = `${Math.random() * 2}s`;

        balloon.addEventListener('click', (e) => {
            e.stopPropagation();
            popBalloon(balloon, e.clientX, e.clientY);
        });

        arena.appendChild(balloon);
    }
}

function popBalloon(balloonEl, x, y) {
    if (balloonEl.classList.contains('popping')) return;
    balloonEl.classList.add('popping');

    // SFX
    if (window.birthdayAudio) {
        window.birthdayAudio.playPop();
    }

    // Spawn tiny particle bursts at click point
    spawnConfettiParticles(x, y, 18);

    // Fade out and remove
    balloonEl.style.transform = 'scale(1.4)';
    balloonEl.style.opacity = '0';
    balloonEl.style.transition = 'all 0.15s ease-out';

    setTimeout(() => {
        balloonEl.remove();
    }, 150);

    poppedBalloons++;
    document.getElementById('poppedCount').textContent = `${Math.min(poppedBalloons, targetBalloons)} / ${targetBalloons}`;

    if (poppedBalloons >= targetBalloons) {
        document.getElementById('gameCompleteBanner').classList.remove('hidden');
        if (window.birthdayAudio) {
            window.birthdayAudio.playMagicSparkle();
        }
        triggerCelebrationParticles();
    }
}

// ==========================================================================
// MISSION 2: BIRTHDAY CAKE & 11 CANDLES
// ==========================================================================
function initCakeCandles() {
    const candlesRow = document.getElementById('candlesRow');
    candlesRow.innerHTML = '';

    // Create 11 candles
    for (let i = 1; i <= 11; i++) {
        const candle = document.createElement('div');
        candle.className = 'candle';
        candle.title = `Candle #${i} for Year ${i}`;

        const flame = document.createElement('div');
        flame.className = 'candle-flame';
        candle.appendChild(flame);

        const smoke = document.createElement('div');
        smoke.className = 'candle-smoke';
        candle.appendChild(smoke);

        candle.addEventListener('click', () => {
            if (!candle.classList.contains('blown')) {
                candle.classList.add('blown');
                if (window.birthdayAudio) {
                    window.birthdayAudio.playBlowCandle();
                }
                checkAllCandlesBlown();
            }
        });

        candlesRow.appendChild(candle);
    }

    // Button to blow all candles at once
    document.getElementById('blowCandlesBtn').addEventListener('click', () => {
        blowAllCandles();
    });
}

function blowAllCandles() {
    const candles = document.querySelectorAll('.candle');
    candles.forEach((c, idx) => {
        setTimeout(() => {
            c.classList.add('blown');
        }, idx * 60);
    });

    if (window.birthdayAudio) {
        window.birthdayAudio.playBlowCandle();
    }

    setTimeout(() => {
        document.getElementById('starWishBox').classList.remove('hidden');
        triggerCelebrationParticles();
    }, 700);
}

function checkAllCandlesBlown() {
    const totalBlown = document.querySelectorAll('.candle.blown').length;
    if (totalBlown >= 11) {
        setTimeout(() => {
            document.getElementById('starWishBox').classList.remove('hidden');
            triggerCelebrationParticles();
        }, 500);
    }
}

// ==========================================================================
// MISSION 3: MYSTERY GIFT BOX
// ==========================================================================
function initGiftBox() {
    const giftBox = document.getElementById('giftBoxElement');
    const giftVideo = document.getElementById('giftVideo');

    let wasMusicPlayingBeforeVideo = false;

    if (giftVideo) {
        giftVideo.addEventListener('play', () => {
            // If background birthday chime is active, pause it so video audio is clear
            if (window.birthdayAudio && window.birthdayAudio.isPlayingMusic) {
                wasMusicPlayingBeforeVideo = true;
                window.birthdayAudio.stopMusic();
                const musicBtn = document.getElementById('musicToggleBtn');
                if (musicBtn) musicBtn.classList.remove('playing');
                updateMusicButtonLabel();
            }
        });

        giftVideo.addEventListener('ended', () => {
            // Resume music after video finishes
            if (wasMusicPlayingBeforeVideo && window.birthdayAudio) {
                window.birthdayAudio.startMusic();
                const musicBtn = document.getElementById('musicToggleBtn');
                if (musicBtn) musicBtn.classList.add('playing');
                updateMusicButtonLabel();
            }
        });
    }

    giftBox.addEventListener('click', () => {
        if (!giftBox.classList.contains('opened')) {
            giftBox.classList.add('opened');
            giftBox.classList.remove('bounce-box');

            if (window.birthdayAudio) {
                window.birthdayAudio.playGiftFanfare();
            }

            // Confetti and reveal
            const rect = giftBox.getBoundingClientRect();
            spawnConfettiParticles(rect.left + rect.width / 2, rect.top + rect.height / 2, 45);

            setTimeout(() => {
                giftBox.classList.add('hidden');
                document.getElementById('giftRevealedCard').classList.remove('hidden');

                // Autoplay video
                if (giftVideo) {
                    giftVideo.play().catch(() => {
                        // In case browser policy requires muted initial autoplay
                        giftVideo.muted = false;
                    });
                }
            }, 550);
        }
    });
}

// ==========================================================================
// POLAROID PHOTO GALLERY (13 Images)
// ==========================================================================
function initPolaroidGallery() {
    const grid = document.getElementById('polaroidGrid');
    grid.innerHTML = '';

    photos.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'polaroid-card';

        // Add slight random tilt between -3.5 and +3.5 deg
        const randomRot = ((index % 5) - 2) * 1.8;
        card.style.setProperty('--rot', `${randomRot}deg`);

        const pin = document.createElement('div');
        pin.className = 'polaroid-pin';

        const imgBox = document.createElement('div');
        imgBox.className = 'polaroid-img-box';

        const img = document.createElement('img');
        img.src = item.src;
        img.alt = `Tarunno memory ${index + 1}`;
        img.loading = 'lazy';
        if (item.pos) {
            img.style.objectPosition = item.pos;
        }

        imgBox.appendChild(img);

        const caption = document.createElement('div');
        caption.className = 'polaroid-caption';
        caption.textContent = currentLang === 'en' ? item.enCaption : item.noCaption;

        card.appendChild(pin);
        card.appendChild(imgBox);
        card.appendChild(caption);

        card.addEventListener('click', () => {
            openLightbox(index);
        });

        grid.appendChild(card);
    });

    initLightboxModal();
}

function initLightboxModal() {
    const lightbox = document.getElementById('photoLightbox');
    const closeBtn = document.getElementById('closeLightboxBtn');
    const backdrop = document.querySelector('.lightbox-backdrop');
    const prevBtn = document.getElementById('prevPhotoBtn');
    const nextBtn = document.getElementById('nextPhotoBtn');

    closeBtn.addEventListener('click', closeLightbox);
    backdrop.addEventListener('click', closeLightbox);

    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentLightboxIndex = (currentLightboxIndex - 1 + photos.length) % photos.length;
        updateLightboxContent();
    });

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentLightboxIndex = (currentLightboxIndex + 1) % photos.length;
        updateLightboxContent();
    });

    window.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('hidden')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') {
            currentLightboxIndex = (currentLightboxIndex - 1 + photos.length) % photos.length;
            updateLightboxContent();
        }
        if (e.key === 'ArrowRight') {
            currentLightboxIndex = (currentLightboxIndex + 1) % photos.length;
            updateLightboxContent();
        }
    });
}

function initWishPosterZoom() {
    const posterFrame = document.querySelector('.wish-poster-frame');
    if (!posterFrame) return;

    posterFrame.addEventListener('click', () => {
        document.getElementById('lightboxImg').src = 'mamas_wish_poster.png';
        document.getElementById('lightboxTitle').textContent = 'A Special Wish for Tarunno from Mama';
        document.getElementById('lightboxDesc').textContent = currentLang === 'en' ? 'Presented with love & prayers by Faishal ❤️' : 'Presentert med kjærlighet og bønner av Faishal ❤️';
        document.getElementById('photoIndexCounter').textContent = '⭐ Special Wish Poster';
        document.getElementById('photoLightbox').classList.remove('hidden');
        if (window.birthdayAudio) {
            window.birthdayAudio.playMagicSparkle();
        }
    });
}

function openLightbox(index) {
    currentLightboxIndex = index;
    updateLightboxContent();
    document.getElementById('photoLightbox').classList.remove('hidden');
    if (window.birthdayAudio) {
        window.birthdayAudio.playMagicSparkle();
    }
}

function closeLightbox() {
    document.getElementById('photoLightbox').classList.add('hidden');
}

function updateLightboxContent() {
    const item = photos[currentLightboxIndex];
    if (!item) return;

    document.getElementById('lightboxImg').src = item.src;
    document.getElementById('lightboxTitle').textContent = `Tarunno Memory #${currentLightboxIndex + 1}`;
    document.getElementById('lightboxDesc').textContent = currentLang === 'en' ? item.enCaption : item.noCaption;
    document.getElementById('photoIndexCounter').textContent = `${currentLightboxIndex + 1} / ${photos.length}`;
}

// ==========================================================================
// CELEBRATION EFFECTS & GLOBAL CLICK FIREWORKS
// ==========================================================================
function initGlobalClickCelebration() {
    window.addEventListener('click', (e) => {
        // Don't trigger if clicked on buttons or interactive inputs
        if (e.target.closest('button') || e.target.closest('.pop-balloon') || e.target.closest('.candle') || e.target.closest('.polaroid-card') || e.target.closest('.lightbox-content')) {
            return;
        }
        createFireworkExplosion(e.clientX, e.clientY);
        if (window.birthdayAudio) {
            window.birthdayAudio.playFireworkBoom();
        }
    });
}

function triggerBigCelebrationBurst() {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const rx = window.innerWidth * (0.2 + Math.random() * 0.6);
            const ry = window.innerHeight * (0.2 + Math.random() * 0.5);
            createFireworkExplosion(rx, ry);
            if (window.birthdayAudio) {
                window.birthdayAudio.playFireworkBoom();
            }
        }, i * 350);
    }
}

function triggerCelebrationParticles() {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 3;
    createFireworkExplosion(cx, cy);
}

// ==========================================================================
// CANVAS FIREWORKS ENGINE
// ==========================================================================
let fwCanvas, fwCtx;
let fireworksParticles = [];

function initFireworks() {
    fwCanvas = document.getElementById('fireworksCanvas');
    fwCtx = fwCanvas.getContext('2d');

    const resize = () => {
        fwCanvas.width = window.innerWidth;
        fwCanvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    requestAnimationFrame(renderFireworks);
}

function createFireworkExplosion(x, y, count = 35) {
    const colors = ['#ffd166', '#ff5e7e', '#06d6a0', '#118ab2', '#ff70a6', '#ffffff', '#e0aaff'];
    for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 6;
        fireworksParticles.push({
            x: x,
            y: y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            radius: 2 + Math.random() * 3,
            color: colors[Math.floor(Math.random() * colors.length)],
            alpha: 1,
            decay: 0.015 + Math.random() * 0.02,
            gravity: 0.12
        });
    }
}

function spawnConfettiParticles(x, y, count = 25) {
    createFireworkExplosion(x, y, count);
}

function renderFireworks() {
    fwCtx.clearRect(0, 0, fwCanvas.width, fwCanvas.height);

    for (let i = fireworksParticles.length - 1; i >= 0; i--) {
        const p = fireworksParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
            fireworksParticles.splice(i, 1);
            continue;
        }

        fwCtx.save();
        fwCtx.globalAlpha = p.alpha;
        fwCtx.fillStyle = p.color;
        fwCtx.beginPath();
        fwCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        fwCtx.fill();
        fwCtx.restore();
    }

    requestAnimationFrame(renderFireworks);
}

// ==========================================================================
// MAGICAL AMBIENT CANVAS (Blooming Stars, Floating Balloons, Cakes & Meteors)
// ==========================================================================
function initMagicalAmbientBackground() {
    const canvas = document.getElementById('ambientCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    // 1. Blooming Stars System
    const stars = [];
    const starColors = [
        { r: 255, g: 209, b: 102 }, // Gold
        { r: 255, g: 112, b: 166 }, // Pink
        { r: 6, g: 214, b: 160 },   // Cyan
        { r: 199, g: 125, b: 255 }, // Violet
        { r: 255, g: 255, b: 255 }  // Pure White
    ];

    for (let i = 0; i < 70; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            baseRadius: 1 + Math.random() * 2.2,
            bloomIntensity: 0,
            bloomSpeed: 0.015 + Math.random() * 0.03,
            bloomOffset: Math.random() * Math.PI * 2,
            color: starColors[Math.floor(Math.random() * starColors.length)],
            points: Math.random() > 0.4 ? 4 : 5,
            rotation: Math.random() * Math.PI,
            rotSpeed: (Math.random() - 0.5) * 0.01
        });
    }

    // 2. Shooting Stars (Meteors)
    const shootingStars = [];
    function spawnShootingStar() {
        if (shootingStars.length < 2 && Math.random() < 0.02) {
            shootingStars.push({
                x: Math.random() * width * 0.8,
                y: Math.random() * height * 0.4,
                length: 80 + Math.random() * 90,
                speed: 8 + Math.random() * 7,
                angle: (Math.PI / 4) + (Math.random() - 0.5) * 0.3,
                alpha: 1,
                decay: 0.015 + Math.random() * 0.015,
                color: starColors[Math.floor(Math.random() * starColors.length)]
            });
        }
    }

    // 3. Floating Ambient Balloons
    const ambientBalloons = [];
    const balloonColors = [
        { main: '#ff5e7e', highlight: '#ff99ac' },
        { main: '#ffd166', highlight: '#ffe8a3' },
        { main: '#06d6a0', highlight: '#80ffdb' },
        { main: '#8338ec', highlight: '#c77dff' },
        { main: '#4cc9f0', highlight: '#b5e2fa' },
        { main: '#ff70a6', highlight: '#ffb3c6' }
    ];

    for (let i = 0; i < 12; i++) {
        ambientBalloons.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radiusX: 16 + Math.random() * 12,
            radiusY: 21 + Math.random() * 15,
            speedY: 0.4 + Math.random() * 0.6,
            swaySpeed: 0.015 + Math.random() * 0.02,
            swayAmp: 15 + Math.random() * 25,
            swayOffset: Math.random() * Math.PI * 2,
            color: balloonColors[Math.floor(Math.random() * balloonColors.length)],
            opacity: 0.45 + Math.random() * 0.35
        });
    }

    // 4. Floating Birthday Items (Cakes, Cupcakes, Gifts, Party Stars)
    const floatingItems = [];
    const itemIcons = ['🎂', '🧁', '🎁', '🎈', '⭐', '✨', '🎉'];

    for (let i = 0; i < 10; i++) {
        floatingItems.push({
            icon: itemIcons[Math.floor(Math.random() * itemIcons.length)],
            x: Math.random() * width,
            y: Math.random() * height,
            size: 20 + Math.random() * 16,
            speedY: 0.3 + Math.random() * 0.5,
            rot: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.02,
            swaySpeed: 0.01 + Math.random() * 0.02,
            swayAmp: 20 + Math.random() * 30,
            swayOffset: Math.random() * Math.PI * 2,
            opacity: 0.5 + Math.random() * 0.35
        });
    }

    let time = 0;

    // Draw Blooming Star Helper
    function drawBloomingStar(star, timeVal) {
        const bloom = (Math.sin(timeVal * star.bloomSpeed + star.bloomOffset) + 1) / 2; // 0 to 1
        const currentRadius = star.baseRadius * (1 + bloom * 1.8);
        const glowRadius = currentRadius * (3 + bloom * 4);

        ctx.save();
        ctx.translate(star.x, star.y);
        ctx.rotate(star.rotation);

        // Blooming Radial Halo
        const glowGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, glowRadius);
        glowGrad.addColorStop(0, `rgba(${star.color.r}, ${star.color.g}, ${star.color.b}, ${0.7 * (0.4 + 0.6 * bloom)})`);
        glowGrad.addColorStop(0.4, `rgba(${star.color.r}, ${star.color.g}, ${star.color.b}, ${0.3 * bloom})`);
        glowGrad.addColorStop(1, `rgba(${star.color.r}, ${star.color.g}, ${star.color.b}, 0)`);

        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(0, 0, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // 4 or 5 pointed blooming star shape
        ctx.fillStyle = `rgba(255, 255, 255, ${0.85 + 0.15 * bloom})`;
        ctx.beginPath();
        const spikes = star.points;
        const outerRadius = currentRadius * 1.6;
        const innerRadius = outerRadius * 0.4;
        let rot = (Math.PI / 2) * 3;
        let step = Math.PI / spikes;

        ctx.moveTo(0, -outerRadius);
        for (let i = 0; i < spikes; i++) {
            let x = Math.cos(rot) * outerRadius;
            let y = Math.sin(rot) * outerRadius;
            ctx.lineTo(x, y);
            rot += step;

            x = Math.cos(rot) * innerRadius;
            y = Math.sin(rot) * innerRadius;
            ctx.lineTo(x, y);
            rot += step;
        }
        ctx.lineTo(0, -outerRadius);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
    }

    // Draw Floating Balloon
    function drawBalloon(b, timeVal) {
        const currentX = b.x + Math.sin(timeVal * b.swaySpeed + b.swayOffset) * b.swayAmp;
        const currentY = b.y;

        ctx.save();
        ctx.globalAlpha = b.opacity;

        // Balloon body
        ctx.beginPath();
        ctx.ellipse(currentX, currentY, b.radiusX, b.radiusY, 0, 0, Math.PI * 2);
        const grad = ctx.createRadialGradient(
            currentX - b.radiusX * 0.3,
            currentY - b.radiusY * 0.3,
            2,
            currentX,
            currentY,
            b.radiusY
        );
        grad.addColorStop(0, b.color.highlight);
        grad.addColorStop(1, b.color.main);
        ctx.fillStyle = grad;
        ctx.fill();

        // Knot
        ctx.beginPath();
        ctx.moveTo(currentX - 3, currentY + b.radiusY);
        ctx.lineTo(currentX + 3, currentY + b.radiusY);
        ctx.lineTo(currentX, currentY + b.radiusY + 4);
        ctx.closePath();
        ctx.fillStyle = b.color.main;
        ctx.fill();

        // String
        ctx.beginPath();
        ctx.moveTo(currentX, currentY + b.radiusY + 4);
        const stringWave = Math.sin(timeVal * 0.05 + b.swayOffset) * 6;
        ctx.bezierCurveTo(
            currentX + stringWave, currentY + b.radiusY + 14,
            currentX - stringWave, currentY + b.radiusY + 28,
            currentX, currentY + b.radiusY + 38
        );
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.restore();
    }

    // Animation Loop
    function animate() {
        ctx.clearRect(0, 0, width, height);
        time++;

        // 1. Render Blooming Stars
        stars.forEach(star => {
            star.rotation += star.rotSpeed;
            drawBloomingStar(star, time);
        });

        // 2. Render & Update Shooting Stars
        spawnShootingStar();
        for (let i = shootingStars.length - 1; i >= 0; i--) {
            const ms = shootingStars[i];
            ms.x += Math.cos(ms.angle) * ms.speed;
            ms.y += Math.sin(ms.angle) * ms.speed;
            ms.alpha -= ms.decay;

            if (ms.alpha <= 0 || ms.x > width || ms.y > height) {
                shootingStars.splice(i, 1);
                continue;
            }

            ctx.save();
            ctx.globalAlpha = ms.alpha;
            const grad = ctx.createLinearGradient(
                ms.x, ms.y,
                ms.x - Math.cos(ms.angle) * ms.length,
                ms.y - Math.sin(ms.angle) * ms.length
            );
            grad.addColorStop(0, '#ffffff');
            grad.addColorStop(0.3, `rgba(${ms.color.r}, ${ms.color.g}, ${ms.color.b}, 0.8)`);
            grad.addColorStop(1, `rgba(${ms.color.r}, ${ms.color.g}, ${ms.color.b}, 0)`);

            ctx.strokeStyle = grad;
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.moveTo(ms.x, ms.y);
            ctx.lineTo(
                ms.x - Math.cos(ms.angle) * ms.length,
                ms.y - Math.sin(ms.angle) * ms.length
            );
            ctx.stroke();
            ctx.restore();
        }

        // 3. Render & Update Floating Balloons
        ambientBalloons.forEach(b => {
            b.y -= b.speedY;
            if (b.y < -b.radiusY * 3) {
                b.y = height + b.radiusY * 2;
                b.x = Math.random() * width;
            }
            drawBalloon(b, time);
        });

        // 4. Render & Update Floating Cakes, Cupcakes & Gifts
        floatingItems.forEach(item => {
            item.y -= item.speedY;
            item.rot += item.rotSpeed;
            if (item.y < -50) {
                item.y = height + 40;
                item.x = Math.random() * width;
            }

            const currentX = item.x + Math.sin(time * item.swaySpeed + item.swayOffset) * item.swayAmp;

            ctx.save();
            ctx.globalAlpha = item.opacity;
            ctx.font = `${item.size}px sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.translate(currentX, item.y);
            ctx.rotate(Math.sin(time * 0.02 + item.swayOffset) * 0.25);
            ctx.fillText(item.icon, 0, 0);
            ctx.restore();
        });

        requestAnimationFrame(animate);
    }

    animate();
}

// ==========================================================================
// INTERACTIVE SPARKLE & CURSOR MAGIC TRAIL
// ==========================================================================
function initCursorMagic() {
    const canvas = document.getElementById('cursorTrailCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    const trailParticles = [];
    const trailColors = ['#ffd166', '#ff5e7e', '#06d6a0', '#c77dff', '#ffffff', '#ffb703'];

    function addParticles(x, y, count = 3) {
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 0.5 + Math.random() * 2.5;
            trailParticles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 0.5,
                size: 2 + Math.random() * 4,
                color: trailColors[Math.floor(Math.random() * trailColors.length)],
                alpha: 1,
                decay: 0.02 + Math.random() * 0.02,
                rotation: Math.random() * Math.PI * 2,
                rotSpeed: (Math.random() - 0.5) * 0.1,
                isStar: Math.random() > 0.4
            });
        }
    }

    window.addEventListener('mousemove', (e) => {
        addParticles(e.clientX, e.clientY, 2);
    });

    window.addEventListener('touchmove', (e) => {
        if (e.touches && e.touches[0]) {
            addParticles(e.touches[0].clientX, e.touches[0].clientY, 3);
        }
    }, { passive: true });

    function renderTrail() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = trailParticles.length - 1; i >= 0; i--) {
            const p = trailParticles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.rotation += p.rotSpeed;
            p.alpha -= p.decay;

            if (p.alpha <= 0) {
                trailParticles.splice(i, 1);
                continue;
            }

            ctx.save();
            ctx.globalAlpha = p.alpha;
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation);
            ctx.fillStyle = p.color;
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 8;

            if (p.isStar) {
                // Draw 4-point star sparkle
                ctx.beginPath();
                const s = p.size;
                ctx.moveTo(0, -s);
                ctx.lineTo(s * 0.25, -s * 0.25);
                ctx.lineTo(s, 0);
                ctx.lineTo(s * 0.25, s * 0.25);
                ctx.lineTo(0, s);
                ctx.lineTo(-s * 0.25, s * 0.25);
                ctx.lineTo(-s, 0);
                ctx.lineTo(-s * 0.25, -s * 0.25);
                ctx.closePath();
                ctx.fill();
            } else {
                // Circle sparkle
                ctx.beginPath();
                ctx.arc(0, 0, p.size * 0.6, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.restore();
        }

        requestAnimationFrame(renderTrail);
    }

    renderTrail();
}

