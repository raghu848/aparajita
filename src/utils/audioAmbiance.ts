// Web Audio API ambient drone synthesizer for luxury Indian couture experience
class AtelierAmbiance {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private masterGain: GainNode | null = null;
  private oscillators: OscillatorNode[] = [];
  private filter: BiquadFilterNode | null = null;
  private lfo: OscillatorNode | null = null;

  public init() {
    if (this.ctx) return;
    const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new AudioCtxClass();
  }

  public toggle(): boolean {
    if (!this.ctx) {
      this.init();
    }

    if (this.ctx?.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  private start() {
    if (!this.ctx) return;

    // Master gain with smooth fade in
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
    this.masterGain.gain.exponentialRampToValueAtTime(0.18, this.ctx.currentTime + 3.0);
    this.masterGain.connect(this.ctx.destination);

    // Warm Low-pass filter for smooth analog warmth
    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.filter.frequency.setValueAtTime(320, this.ctx.currentTime);
    this.filter.Q.setValueAtTime(3.5, this.ctx.currentTime);
    this.filter.connect(this.masterGain);

    // LFO for breathing filter sweep
    this.lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    this.lfo.frequency.setValueAtTime(0.12, this.ctx.currentTime); // very slow 8-second breathing cycle
    lfoGain.gain.setValueAtTime(140, this.ctx.currentTime);
    this.lfo.connect(lfoGain);
    lfoGain.connect(this.filter.frequency);
    this.lfo.start();

    // Harmonics: Root Sa (C#3 ~138.59Hz), Fifth Pa (G#3 ~207.65Hz), Octave (C#4 ~277.18Hz), Shimmer (554.37Hz)
    const tones = [
      { freq: 138.59, type: 'sawtooth' as OscillatorType, gain: 0.12 },
      { freq: 207.65, type: 'triangle' as OscillatorType, gain: 0.09 },
      { freq: 277.18, type: 'sine' as OscillatorType, gain: 0.06 },
      { freq: 554.37, type: 'sine' as OscillatorType, gain: 0.02 },
      { freq: 139.1, type: 'sawtooth' as OscillatorType, gain: 0.08 } // subtle detuned chorus
    ];

    this.oscillators = tones.map(t => {
      const osc = this.ctx!.createOscillator();
      const oscGain = this.ctx!.createGain();
      osc.type = t.type;
      osc.frequency.setValueAtTime(t.freq, this.ctx!.currentTime);
      oscGain.gain.setValueAtTime(t.gain, this.ctx!.currentTime);

      osc.connect(oscGain);
      oscGain.connect(this.filter!);
      osc.start();
      return osc;
    });

    this.isPlaying = true;
  }

  private stop() {
    if (!this.ctx || !this.masterGain) return;

    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
    this.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);

    setTimeout(() => {
      this.oscillators.forEach(osc => {
        try {
          osc.stop();
          osc.disconnect();
        } catch (_) {}
      });
      this.oscillators = [];

      try {
        if (this.lfo) {
          this.lfo.stop();
          this.lfo.disconnect();
          this.lfo = null;
        }
      } catch (_) {}

      this.isPlaying = false;
    }, 1250);
  }
}

export const atelierAmbiance = new AtelierAmbiance();
