"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
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

  // Initialize audio element
  useEffect(() => {
    // Create audio element with a sample lofi track
    const audio = new Audio(
      "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3"
    );
    audioRef.current = audio;

    // Set initial volume
    audio.volume = volume;

    // Set up event listeners
    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", () => {
      setDuration(audio.duration);
    });
    audio.addEventListener("ended", handleEnded);

    return () => {
      // Clean up
      audio.pause();
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", () => {});
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  // Update loop setting when isLooping changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = isLooping;
    }
  }, [isLooping]);

  // Update volume when it changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Update progress function
  const updateProgress = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  // Handle end of track
  const handleEnded = () => {
    if (!isLooping) {
      setIsPlaying(false);
      setCurrentTime(0);
    }
  };

  // Toggle play/pause
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Toggle loop
  const toggleLoop = () => {
    setIsLooping(!isLooping);
  };

  // Decrease volume
  const decreaseVolume = () => {
    setVolume((prev) => Math.max(0, prev - 0.1));
  };

  // Increase volume
  const increaseVolume = () => {
    setVolume((prev) => Math.min(1, prev + 0.1));
  };

  // Handle progress bar click
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current) {
      const progressBar = e.currentTarget;
      const rect = progressBar.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = x / rect.width;
      const newTime = percentage * duration;

      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  // Format time as mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Get volume icon based on current volume
  const getVolumeIcon = () => {
    if (volume === 0) return <VolumeX size={16} />;
    if (volume < 0.4) return <Volume size={16} />;
    if (volume < 0.7) return <Volume1 size={16} />;
    return <Volume2 size={16} />;
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Cover image */}
      <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-3">
        <Image
          src="/lofi.jpg"
          alt="Album cover"
          fill
          className="object-cover"
        />
        <div className="absolute bottom-2 left-2 text-white text-xs font-medium drop-shadow-md">
          Lofi Study Beats
        </div>
      </div>

      {/* Controls container with transparent background */}
      <div className="rounded-lg p-3 flex items-center justify-between backdrop-blur-sm">
        <button
          className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-800 hover:bg-gray-100 transition-colors"
          onClick={decreaseVolume}
        >
          <Volume size={16} />
        </button>

        <button
          className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-800 hover:bg-gray-100 transition-colors"
          onClick={togglePlay}
        >
          {isPlaying ? (
            <Pause size={16} />
          ) : (
            <Play size={16} className="ml-0.5" />
          )}
        </button>

        <button
          className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-800 hover:bg-gray-100 transition-colors"
          onClick={toggleLoop}
          style={{
            backgroundColor: isLooping ? `${themeColor}` : "white",
            color: isLooping ? "white" : "black",
          }}
        >
          <Repeat size={16} />
        </button>

        <button
          className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-800 hover:bg-gray-100 transition-colors"
          onClick={increaseVolume}
        >
          {getVolumeIcon()}
        </button>
      </div>

      {/* Progress bar */}
      <div className="mt-2 px-1">
        <div
          className="w-full h-1.5 bg-white/30 rounded-full cursor-pointer"
          onClick={handleProgressClick}
        >
          <div
            className="h-full rounded-full transition-all duration-100"
            style={{
              width: `${duration ? (currentTime / duration) * 100 : 0}%`,
              backgroundColor: "white",
            }}
          ></div>
        </div>

        {/* Time display */}
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}
