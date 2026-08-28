/**
 * Romantic Birthday Sound Engine
 * Synthesized music & sound effects using Web Audio API
 * Plays a gentle, romantic melody
 */
class RomanticSoundEngine {
    constructor() {
        this.ctx = null;
        this.isPlayingMusic = false;
        this.musicTimeout = null;
        this.tempo = 72; // Slow, romantic tempo
        this.masterGain = null;
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContext();
            this.masterGain = this.ctx.createGain();
            this.masterGain.gain.value = 0.6;
            this.masterGain.connect(this.ctx.destination);
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    // Play a soft, warm bell/chime note
    playNote(freq, startTime, duration = 0.8, volume = 0.15) {
        if (!this.ctx) return;

        const osc = this.ctx.createOscillator();
        const osc2 = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        // Warm sine + soft triangle overtone
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(freq * 2, startTime);

        // Soft attack, gentle decay envelope
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(volume, startTime + 0.04);
        gain.gain.exponentialRampToValueAtTime(volume * 0.6, startTime + duration * 0.3);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

        osc.connect(gain);
        osc2.connect(gain);
        gain.connect(this.masterGain);

        osc.start(startTime);
        osc2.start(startTime);
        osc.stop(startTime + duration);
        osc2.stop(startTime + duration);
    }

    // Pad/ambient background chord
    playPad(frequencies, startTime, duration = 4, volume = 0.06) {
        if (!this.ctx) return;

        frequencies.forEach(freq => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, startTime);

            gain.gain.setValueAtTime(0, startTime);
            gain.gain.linearRampToValueAtTime(volume, startTime + 0.5);
            gain.gain.setValueAtTime(volume, startTime + duration - 1);
            gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

            osc.connect(gain);
            gain.connect(this.masterGain);

            osc.start(startTime);
            osc.stop(startTime + duration);
        });
    }

    // Romantic melody — "Canon in D" inspired progression
    getRomanticMelody() {
        // Notes
        const D4 = 293.66, E4 = 329.63, Fs4 = 369.99, G4 = 392.00, A4 = 440.00, B4 = 493.88;
        const D5 = 587.33, Cs5 = 554.37, E5 = 659.25, Fs5 = 739.99, A5 = 880.00;

        // Melody notes with durations (in beats)
        return {
            melody: [
                // Phrase 1 — ascending hope
                { freq: Fs4, dur: 1.5 },
                { freq: E4, dur: 0.5 },
                { freq: D4, dur: 1 },
                { freq: Cs5, dur: 0.5 },
                { freq: D5, dur: 1.5 },

                // Phrase 2 — tender descent
                { freq: A4, dur: 1 },
                { freq: B4, dur: 1 },
                { freq: Fs4, dur: 1 },
                { freq: G4, dur: 0.5 },
                { freq: A4, dur: 1.5 },

                // Phrase 3 — emotional peak
                { freq: D5, dur: 1 },
                { freq: Cs5, dur: 0.5 },
                { freq: B4, dur: 0.5 },
                { freq: A4, dur: 1 },
                { freq: Fs5, dur: 1.5 },
                { freq: E5, dur: 0.5 },
                { freq: D5, dur: 2 },

                // Phrase 4 — gentle resolve
                { freq: B4, dur: 1 },
                { freq: A4, dur: 1 },
                { freq: G4, dur: 0.5 },
                { freq: Fs4, dur: 0.5 },
                { freq: E4, dur: 1 },
                { freq: D4, dur: 2 },

                // Rest
                { freq: 0, dur: 1 },
            ],
            chords: [
                // Background pads (D major progression)
                { notes: [146.83, 220.00, 293.66], dur: 4 }, // D
                { notes: [164.81, 246.94, 329.63], dur: 4 }, // A/E
                { notes: [174.61, 261.63, 329.63], dur: 4 }, // Bm/F#
                { notes: [146.83, 220.00, 293.66], dur: 4 }, // D
                { notes: [196.00, 293.66, 392.00], dur: 4 }, // G
                { notes: [146.83, 220.00, 293.66], dur: 4 }, // D
            ]
        };
    }

    startMusic() {
        this.init();
        if (this.isPlayingMusic) return;
        this.isPlayingMusic = true;

        const playLoop = () => {
            if (!this.isPlayingMusic) return;

            const { melody, chords } = this.getRomanticMelody();
            const beatSec = 60 / this.tempo;
            let now = this.ctx.currentTime + 0.1;
            let melodyTime = now;
            let totalDuration = 0;

            // Play chords as ambient pads
            let chordTime = now;
            chords.forEach(chord => {
                const dur = chord.dur * beatSec;
                this.playPad(chord.notes, chordTime, dur, 0.05);
                chordTime += dur;
            });

            // Play melody
            melody.forEach(note => {
                const dur = note.dur * beatSec;
                if (note.freq > 0) {
                    this.playNote(note.freq, melodyTime, dur * 1.3, 0.14);
                }
                melodyTime += dur;
                totalDuration += dur;
            });

            // Loop with pause
            this.musicTimeout = setTimeout(() => {
                if (this.isPlayingMusic) playLoop();
            }, (totalDuration + 2.5) * 1000);
        };

        playLoop();
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

    // SFX: Soft magical sparkle
    playSparkle() {
        this.init();
        if (!this.ctx) return;

        const notes = [659.25, 783.99, 987.77, 1318.51, 1567.98];
        let now = this.ctx.currentTime;

        notes.forEach((freq, idx) => {
            this.playNote(freq, now + (idx * 0.06), 0.5, 0.12);
        });
    }

    // SFX: Heart pop (gentle)
    playHeartPop() {
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(200, now + 0.15);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + 0.15);
    }

    // SFX: Envelope open
    playEnvelopeOpen() {
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        // Ascending warm chime
        [440, 554.37, 659.25, 880].forEach((freq, i) => {
            this.playNote(freq, now + i * 0.12, 0.6, 0.18);
        });
    }

    // SFX: Candle blow (wind)
    playBlowCandle() {
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const duration = 0.6;
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
        filter.frequency.setValueAtTime(600, now);
        filter.frequency.linearRampToValueAtTime(150, now + duration);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.3, now + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        noise.start(now);

        // Follow with sparkle
        setTimeout(() => this.playSparkle(), 400);
    }

    // SFX: Celebration burst
    playCelebration() {
        this.init();
        if (!this.ctx) return;

        // Rising fanfare
        const notes = [392, 493.88, 587.33, 659.25, 783.99];
        let now = this.ctx.currentTime;

        notes.forEach((freq, i) => {
            this.playNote(freq, now + i * 0.1, 0.8, 0.2);
        });
    }

    // SFX: Gift open fanfare
    playGiftOpen() {
        this.init();
        if (!this.ctx) return;

        const notes = [
            { f: 329.63, t: 0, d: 0.15 },
            { f: 440.00, t: 0.12, d: 0.15 },
            { f: 554.37, t: 0.24, d: 0.15 },
            { f: 659.25, t: 0.36, d: 0.6 }
        ];

        let now = this.ctx.currentTime;
        notes.forEach(n => {
            this.playNote(n.f, now + n.t, n.d, 0.22);
        });
    }
}

window.birthdayAudio = new RomanticSoundEngine();
