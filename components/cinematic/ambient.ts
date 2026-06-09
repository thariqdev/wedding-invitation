// Soft, romantic ambient score synthesised with the Web Audio API — no audio
// file required. A warm pad drifts through D · G · Bm · A with gentle bell
// sparkles on top. Created on a user gesture so autoplay policies are happy.

type Voice = { gain: GainNode; oscs: OscillatorNode[] };

// I – IV – vi – V in D major (romantic, uplifting)
const CHORDS: number[][] = [
  [146.83, 220.0, 293.66, 369.99], // D  (D3 A3 D4 F#4)
  [196.0, 246.94, 293.66, 392.0], // G  (G3 B3 D4 G4)
  [123.47, 185.0, 246.94, 293.66], // Bm (B2 F#3 B3 D4)
  [110.0, 164.81, 220.0, 277.18], // A  (A2 E3 A3 C#4)
];

export class AmbientMusic {
  private ac: AudioContext | null = null;
  private master: GainNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private current: Voice | null = null;
  private timers: number[] = [];
  private chordIdx = 0;
  private bellIdx = 0;
  private enabled = true;
  private started = false;
  private readonly level = 0.16;

  start() {
    if (this.started) return;
    if (typeof window === "undefined") return;
    const AC: typeof AudioContext | undefined =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return;

    this.started = true;
    this.ac = new AC();
    const ac = this.ac;

    this.filter = ac.createBiquadFilter();
    this.filter.type = "lowpass";
    this.filter.frequency.value = 1400;
    this.filter.Q.value = 0.6;

    this.master = ac.createGain();
    this.master.gain.value = 0;
    this.filter.connect(this.master);
    this.master.connect(ac.destination);

    // slow filter movement for life
    const lfo = ac.createOscillator();
    const lfoGain = ac.createGain();
    lfo.frequency.value = 0.05;
    lfoGain.gain.value = 450;
    lfo.connect(lfoGain);
    lfoGain.connect(this.filter.frequency);
    lfo.start();

    if (ac.state === "suspended") ac.resume().catch(() => {});

    // fade master in to the enabled target
    this.master.gain.setValueAtTime(0, ac.currentTime);
    this.master.gain.linearRampToValueAtTime(this.enabled ? this.level : 0, ac.currentTime + 3);

    this.nextChord();
    this.timers.push(window.setInterval(() => this.nextChord(), 7000));
    this.timers.push(window.setInterval(() => this.playBell(), 1700));
  }

  private nextChord() {
    const ac = this.ac;
    const filter = this.filter;
    if (!ac || !filter) return;
    const chord = CHORDS[this.chordIdx % CHORDS.length];
    this.chordIdx++;

    const gain = ac.createGain();
    gain.gain.value = 0;
    gain.connect(filter);
    const oscs: OscillatorNode[] = [];
    for (const f of chord) {
      const a = ac.createOscillator();
      a.type = "sine";
      a.frequency.value = f;
      const b = ac.createOscillator();
      b.type = "triangle";
      b.frequency.value = f * 1.004; // gentle detune for warmth
      a.connect(gain);
      b.connect(gain);
      a.start();
      b.start();
      oscs.push(a, b);
    }
    // crossfade in
    gain.gain.linearRampToValueAtTime(0.05, ac.currentTime + 3);

    // fade out the previous chord
    const prev = this.current;
    if (prev) {
      prev.gain.gain.cancelScheduledValues(ac.currentTime);
      prev.gain.gain.setValueAtTime(prev.gain.gain.value, ac.currentTime);
      prev.gain.gain.linearRampToValueAtTime(0.0001, ac.currentTime + 3);
      window.setTimeout(() => prev.oscs.forEach((o) => o.stop()), 3300);
    }
    this.current = { gain, oscs };
  }

  private playBell() {
    const ac = this.ac;
    const filter = this.filter;
    if (!ac || !filter) return;
    const chord = CHORDS[(this.chordIdx - 1 + CHORDS.length) % CHORDS.length];
    const note = chord[this.bellIdx % chord.length] * 2; // an octave up
    this.bellIdx += 1;

    const o = ac.createOscillator();
    o.type = "sine";
    o.frequency.value = note;
    const g = ac.createGain();
    const t = ac.currentTime;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.09, t + 0.04);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 2);
    o.connect(g);
    g.connect(filter);
    o.start(t);
    o.stop(t + 2.1);
  }

  setEnabled(on: boolean) {
    this.enabled = on;
    if (on && !this.started) {
      this.start();
      return;
    }
    const ac = this.ac;
    const master = this.master;
    if (!ac || !master) return;
    if (on && ac.state === "suspended") ac.resume().catch(() => {});
    master.gain.cancelScheduledValues(ac.currentTime);
    master.gain.setValueAtTime(master.gain.value, ac.currentTime);
    master.gain.linearRampToValueAtTime(on ? this.level : 0, ac.currentTime + 0.6);
  }

  dispose() {
    this.timers.forEach((t) => window.clearInterval(t));
    this.timers = [];
    try {
      this.current?.oscs.forEach((o) => o.stop());
    } catch {}
    this.current = null;
    if (this.ac) {
      this.ac.close().catch(() => {});
      this.ac = null;
    }
    this.started = false;
  }
}
