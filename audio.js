// Web Audio API Synthesizer for Birthday Music & SFX
class BirthdaySoundEngine {
    constructor() {
        this.ctx = null;
        this.isPlayingMusic = false;
        this.isMuted = false;
        this.musicTimeout = null;
        this.tempo = 120; // BPM
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContext();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        if (this.isMuted && this.isPlayingMusic) {
            this.stopMusic();
        }
        return this.isMuted;
    }

    // Play synthesized bell/chime note
    playChimeNote(freq, startTime, duration = 0.5, volume = 0.25) {
        if (this.isMuted || !this.ctx) return;

        const osc = this.ctx.createOscillator();
        const osc2 = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        // Music box / Celesta harmonic mix
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(freq * 2, startTime); // 1 octave overtone

        // Envelope
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(volume, startTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

        osc.connect(gain);
        osc2.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc2.start(startTime);
        osc.stop(startTime + duration);
        osc2.stop(startTime + duration);
    }

    // Classic "Happy Birthday to You" Notes (Key of C)
    getHappyBirthdayMelody() {
        const C4 = 261.63, D4 = 293.66, E4 = 329.63, F4 = 349.23, G4 = 392.00, A4 = 440.00, Bb4 = 466.16;
        const C5 = 523.25, D5 = 587.33, E5 = 659.25, F5 = 698.46;

        return [
            // Happy Birthday to You
            { freq: C4, duration: 0.75 },
            { freq: C4, duration: 0.25 },
            { freq: D4, duration: 1.0 },
            { freq: C4, duration: 1.0 },
            { freq: F4, duration: 1.0 },
            { freq: E4, duration: 2.0 },

            // Happy Birthday to You
            { freq: C4, duration: 0.75 },
            { freq: C4, duration: 0.25 },
            { freq: D4, duration: 1.0 },
            { freq: C4, duration: 1.0 },
            { freq: G4, duration: 1.0 },
            { freq: F4, duration: 2.0 },

            // Happy Birthday dear Tarunno
            { freq: C4, duration: 0.75 },
            { freq: C4, duration: 0.25 },
            { freq: C5, duration: 1.0 },
            { freq: A4, duration: 1.0 },
            { freq: F4, duration: 1.0 },
            { freq: E4, duration: 1.0 },
            { freq: D4, duration: 2.0 },

            // Happy Birthday to You
            { freq: Bb4, duration: 0.75 },
            { freq: Bb4, duration: 0.25 },
            { freq: A4, duration: 1.0 },
            { freq: F4, duration: 1.0 },
            { freq: G4, duration: 1.0 },
            { freq: F4, duration: 2.5 }
        ];
    }

    startMusic() {
        this.init();
        if (this.isPlayingMusic || this.isMuted) return;
        this.isPlayingMusic = true;

        const playSongLoop = () => {
            if (!this.isPlayingMusic || this.isMuted) return;
            const melody = this.getHappyBirthdayMelody();
            let currentTime = this.ctx.currentTime + 0.1;
            const beatSeconds = 60 / this.tempo;
            let totalDuration = 0;

            melody.forEach((note) => {
                const dur = note.duration * beatSeconds;
                this.playChimeNote(note.freq, currentTime, dur * 1.2, 0.22);
                currentTime += dur;
                totalDuration += dur;
            });

            // Loop after melody completes with a 2-second gentle pause
            this.musicTimeout = setTimeout(() => {
                if (this.isPlayingMusic) {
                    playSongLoop();
                }
            }, (totalDuration + 2) * 1000);
        };

        playSongLoop();
    }

    stopMusic() {
        this.isPlayingMusic = false;
        if (this.musicTimeout) {
            clearTimeout(this.musicTimeout);
            this.musicTimeout = null;
        }
    }

    toggleMusic() {
        this.init();
        if (this.isPlayingMusic) {
            this.stopMusic();
            return false;
        } else {
            this.startMusic();
            return true;
        }
    }

    // Sound FX: Balloon Pop
    playPop() {
        this.init();
        if (this.isMuted || !this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(450, now);
        osc.frequency.exponentialRampToValueAtTime(40, now + 0.08);

        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.08);

        this.playWhiteNoise(0.05, 0.15);
    }

    playWhiteNoise(duration = 0.1, volume = 0.1) {
        if (this.isMuted || !this.ctx) return;
        const bufferSize = this.ctx.sampleRate * duration;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const output = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
        }

        const whiteNoise = this.ctx.createBufferSource();
        whiteNoise.buffer = buffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 1000;

        const gain = this.ctx.createGain();
        const now = this.ctx.currentTime;
        gain.gain.setValueAtTime(volume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

        whiteNoise.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        whiteNoise.start(now);
    }

    // Sound FX: Blow Candle (soft wind whoosh)
    playBlowCandle() {
        this.init();
        if (this.isMuted || !this.ctx) return;

        const now = this.ctx.currentTime;
        const duration = 0.7;
        const bufferSize = this.ctx.sampleRate * duration;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, now);
        filter.frequency.linearRampToValueAtTime(200, now + duration);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.4, now + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.01, now + duration);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        noise.start(now);

        setTimeout(() => {
            this.playMagicSparkle();
        }, 500);
    }

    // Sound FX: Magic Sparkle / Wish chime
    playMagicSparkle() {
        this.init();
        if (this.isMuted || !this.ctx) return;

        const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
        let now = this.ctx.currentTime;

        notes.forEach((freq, idx) => {
            this.playChimeNote(freq, now + (idx * 0.08), 0.6, 0.2);
        });
    }

    // Sound FX: Gift Unbox Fanfare
    playGiftFanfare() {
        this.init();
        if (this.isMuted || !this.ctx) return;

        const notes = [
            { f: 392.00, t: 0.0, d: 0.15 },
            { f: 523.25, t: 0.15, d: 0.15 },
            { f: 659.25, t: 0.30, d: 0.15 },
            { f: 783.99, t: 0.45, d: 0.60 }
        ];

        let now = this.ctx.currentTime;
        notes.forEach(n => {
            this.playChimeNote(n.f, now + n.t, n.d, 0.3);
        });
    }

    // Sound FX: Firework Boom
    playFireworkBoom() {
        this.init();
        if (this.isMuted || !this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(160, now);
        osc.frequency.exponentialRampToValueAtTime(30, now + 0.5);

        gain.gain.setValueAtTime(0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.5);

        this.playWhiteNoise(0.4, 0.25);
    }
}

window.birthdayAudio = new BirthdaySoundEngine();
