"use client";

import { useEffect, useMemo } from "react";
import {
  Play,
  Pause,
  Volume,
  Volume1,
  Volume2,
  VolumeX,
  Repeat,
} from "lucide-react";
import Image from "next/image";
import { MusicPlayerAudio } from "./utils";
import { musicPlayerAudioConfig } from "./configs/music-player-audio";


const audioSrc = "/audio/imaseNIGHT DANCERMV.mp3";
export default function MusicPlayer() {
  const player = useMemo(
    () => new MusicPlayerAudio(musicPlayerAudioConfig),
    []
  );
  const { currentTime, duration, isLooping, isPlaying, volume } =
    player.useAudio();

  const increaseVolume = () => {
    player.volume = Math.min(1, volume + 0.1);
  };

  const decreaseVolume = () => {
    player.volume = Math.max(0, volume - 0.1);
  };

  const handleProgressBarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    player.currentTime = newTime;
  };

  useEffect(() => {
    const handleKeyDown = (ev: KeyboardEvent) => {
      const duration = player.duration;
      const prevTime = player.currentTime;
      if (ev.code === "Space") {
        ev.preventDefault();
        player.togglePlay();
      }
      let newTime = prevTime;
      if (ev.code === "ArrowRight") newTime = Math.min(prevTime + 5, duration);
      if (ev.code === "ArrowLeft") newTime = Math.max(prevTime - 5, 0);
      if (newTime !== prevTime) player.currentTime = newTime;
    };
    player.init(audioSrc);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      player.destroy();
    };
  }, [player]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const getVolumeIcon = () => {
    if (volume === 0) return <VolumeX size={16} />;
    if (volume < 0.4) return <Volume size={16} />;
    if (volume < 0.7) return <Volume1 size={16} />;
    return <Volume2 size={16} />;
  };

  return (
    <div className="max-w-[18.75rem] h-full flex flex-col">
      <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-3">
        <Image
          src="/lofi.webp"
          alt="Portada del álbum Lofi Study Beats"
          width={700} // Tamaño máximo necesario
          height={394} // Relación 16:9 (700/1.777)
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 700px"
          className="object-cover"
          quality={80}
        />

        <div className="absolute bottom-2 left-2 text-white text-xs font-medium drop-shadow-md">
          Lofi Study Beats
        </div>
      </div>

      <div className="p-3 rounded-lg backdrop-blur-sm bg-[#5730E7]">
        <div className="flex items-center justify-around">
          <button
            onClick={decreaseVolume}
            aria-label="Disminuir volumen"
            className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white hover:bg-gray-100/20 transition-colors"
          >
            <Volume size={16} />
          </button>

          <button
            onClick={player.togglePlay}
            aria-label={isPlaying ? "Pausar" : "Reproducir"}
            aria-pressed={isPlaying}
            className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white hover:bg-gray-100/20 transition-colors"
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>

          <button
            onClick={player.toggleLoop}
            aria-label="Repetir"
            className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white hover:bg-gray-100/20 transition-colors"
            style={{ backgroundColor: isLooping ? "#4D2B89" : "" }}
          >
            <Repeat size={16} />
          </button>

          <button
            onClick={increaseVolume}
            aria-label="Aumentar volumen"
            className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white hover:bg-gray-100/20 transition-colors"
          >
            {getVolumeIcon()}
          </button>
        </div>

        <div className="mt-2 px-1">
          <label htmlFor="progress" className="sr-only">
            Progreso de la canción
          </label>
          <div className="relative h-2 w-full bg-purple-300 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 rounded-full"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            ></div>
            <input
              id="progress"
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onInput={handleProgressBarChange}
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
          <div className="flex justify-between text-xs text-gray-50 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <p className="text-sm text-white/80 mt-2 text-center">
          NIGHT DANCER – imase
        </p>
      </div>
    </div>
  );
}
