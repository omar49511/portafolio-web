import { useSyncExternalStore } from "react";
import { MusicPlayerAudioProps } from "./types/music-player-audio.type";
import { PlayerListener } from "./types/player-listener.type";
import { MusicSnapshot } from "./types/music-snapshot";

export class MusicPlayerAudio {
  audio: HTMLAudioElement | null = null;
  private _isPlaying: boolean = false;
  private _currentTime: number = 0;
  private _duration: number = 0;
  private _volume: number;
  private _isLooping: boolean;
  private _listeners = new Set<PlayerListener>();
  private _lastGetSnapshot: MusicSnapshot | {} = {};

  constructor({ isLooping, volume }: MusicPlayerAudioProps) {
    this._volume = volume;
    this._isLooping = isLooping;

    // Initialize the audio element
    if (typeof window !== "undefined") {
      this.audio = new Audio();
      this.audio.volume = this._volume;
      this.audio.loop = this._isLooping;
    }
  }

  // * Volume
  set volume(newVolume: number) {
    if (!this.audio) return;
    this.audio.volume = newVolume;
    this._volume = newVolume;
    this.notifyListeners();
  }

  get volume() {
    return this._volume;
  }

  // * Is Looping

  set isLooping(isLooping: boolean) {
    if (!this.audio) return;
    this.audio.loop = isLooping;
    this.notifyListeners();
  }

  get isLooping() {
    return this._isLooping;
  }

  toggleLoop = () => {
    if (this.audio) {
      this._isLooping = !this._isLooping;
      this.isLooping = this._isLooping;
    }
  };

  // * Current time
  set currentTime(currentTime: number) {
    if (!this.audio) return;
    this.audio.currentTime = currentTime;
    this.notifyListeners();
  }

  get currentTime() {
    return this._currentTime;
  }

  // * Play state
  get isPlaying() {
    return this._isPlaying;
  }

  pause = () => {
    if (!this.audio) return;
    this.audio.pause();
    this._isPlaying = false;
    this.notifyListeners();
  };

  play = () => {
    if (!this.audio) return;
    this.audio.play();
    this._isPlaying = true;
    this.notifyListeners();
  };

  togglePlay = () => {
    if (!this.audio) return;
    if (this._isPlaying) return this.pause();
    this.play();
  };

  //* Duration
  get duration() {
    return this._duration;
  }

  // * Handlers
  private handleLoadedMetadata = () => {
    if (!this.audio) return;
    this._duration = this.audio.duration;
    this.notifyListeners();
  };

  private handleTimeUpdate = () => {
    if (!this.audio) return;
    this._currentTime = this.audio.currentTime;
    this.notifyListeners();
  };

  private handleEnded = () => {
    if (!this.audio) return;
    if (this._isLooping) return;

    this._isPlaying = false;
    this._currentTime = 0;
    this.notifyListeners();
  };

  private notifyListeners = () => {
    this._listeners.forEach((listener) => listener(this.getSnapshot()));
  };

  // * Methods
  init = (src: string) => {
    if (!this.audio) return;
    this.audio.src = src;
    this.audio.addEventListener("loadedmetadata", this.handleLoadedMetadata);
    this.audio.addEventListener("timeupdate", this.handleTimeUpdate);
    this.audio.addEventListener("ended", this.handleEnded);
  };

  destroy = () => {
    if (!this.audio) return;
    this.audio.removeEventListener("loadedmetadata", this.handleLoadedMetadata);
    this.audio.removeEventListener("timeupdate", this.handleTimeUpdate);
    this.audio.removeEventListener("ended", this.handleEnded);
  };

  // * Reactivity
  subscribe = (listener: PlayerListener) => {
    this._listeners.add(listener);
    return () => {
      this._listeners.delete(listener);
    };
  };

  getSnapshot = (): MusicSnapshot => {
    const snapshot = {
      isPlaying: this.isPlaying,
      currentTime: this.currentTime,
      duration: this.duration,
      volume: this.volume,
      isLooping: this.isLooping,
    };

    const snapshotString = JSON.stringify(snapshot);
    const lastSnapshotString = JSON.stringify(this._lastGetSnapshot);
    if (snapshotString === lastSnapshotString) {
      return this._lastGetSnapshot as MusicSnapshot;
    }
    this._lastGetSnapshot = snapshot;
    return this._lastGetSnapshot as MusicSnapshot;
  };

  useAudio = () => {
    return useSyncExternalStore(
      this.subscribe,
      this.getSnapshot,
      this.getSnapshot
    );
  };
}
