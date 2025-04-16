"use client";

import { useState, useRef, useEffect, useCallback } from "react";
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

type MusicPlayerProps = {
  themeColor: string;
};

export default function MusicPlayer({ themeColor }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isLooping, setIsLooping] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      if (!isLooping) {
        setIsPlaying(false);
        setCurrentTime(0);
      }
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [isLooping]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = isLooping;
    }
  }, [isLooping]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((err) => {
        if (process.env.NODE_ENV !== "production") {
          console.error("Play error:", err);
        }
      });
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const toggleLoop = useCallback(() => {
    setIsLooping((prev) => !prev);
  }, []);

  const increaseVolume = () => {
    const newVolume = Math.min(1, volume + 0.1);
    setVolume(newVolume);
  };

  const decreaseVolume = () => {
    const newVolume = Math.max(0, volume - 0.1);
    setVolume(newVolume);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    const audio = audioRef.current;
    if (!audio) return;

    const doSeek = () => {
      audio.currentTime = newTime;
      if (isPlaying) {
        audio.play().catch((err) => {
          if (process.env.NODE_ENV !== "production") {
            console.error("Error al reanudar después de seek:", err);
          }
        });
      }
      setCurrentTime(newTime);
    };

    if (audio.readyState >= 1) {
      doSeek();
    } else {
      audio.addEventListener("loadedmetadata", doSeek, { once: true });
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        togglePlay();
      } else if (e.code === "ArrowRight") {
        setCurrentTime((prev) => Math.min(prev + 5, duration));
      } else if (e.code === "ArrowLeft") {
        setCurrentTime((prev) => Math.max(prev - 5, 0));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [togglePlay, duration]);

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
    <div className="w-full h-full flex flex-col">
      <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-3">
        <Image
          src="/lofi.jpg"
          alt="Portada del álbum Lofi Study Beats"
          fill
          sizes="(max-width: 768px) 100vw, 700px"
          className="object-cover"
          priority={false}
        />

        <div className="absolute bottom-2 left-2 text-white text-xs font-medium drop-shadow-md">
          Lofi Study Beats
        </div>
      </div>

      <audio
        ref={audioRef}
        src="/audio/imaseNIGHT DANCERMV.mp3"
        preload="none"
      />

      <div className="p-3 rounded-lg backdrop-blur-sm bg-[#5730E7]">
        <div className="flex items-center justify-center sm:justify-between sm:space-x-2 md:space-x-4">
          <button
            onClick={decreaseVolume}
            aria-label="Disminuir volumen"
            className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white hover:bg-gray-100/20 transition-colors"
          >
            <Volume size={16} />
          </button>

          <button
            onClick={togglePlay}
            aria-label={isPlaying ? "Pausar" : "Reproducir"}
            aria-pressed={isPlaying}
            className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-white hover:bg-gray-100/20 transition-colors"
          >
            {isPlaying ? (
              <Pause size={16} />
            ) : (
              <Play size={16} />
            )}
          </button>

          <button
            onClick={toggleLoop}
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
              onInput={handleProgressChange}
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
