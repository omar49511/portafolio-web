import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types/project";
import { ExternalLink, Github, Code, Layers, Calendar } from "lucide-react";

interface CardProjectProps extends Project {
  setActiveProject: (id: number) => void;
}

export default function CardProject({
  id,
  title,
  description,
  liveUrl,
  githubUrl,
  technologies,
  process,
  challenges,
  learnings,
  featured,
  imageHeight,
  setActiveProject,
}: CardProjectProps) {
  return (
    <div
      key={id}
      className={`bg-[#272627] rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-[1.02] ${
        featured && "md:col-span-2 lg:col-span-2"
      }`}
    >
      <div className="relative" style={{ height: `${imageHeight}px` }}>
        <Image
          src={`/ezgif-5-a7b2e8e0da.webp?height=${imageHeight}&width=600`}
          alt={title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex flex-wrap gap-2 mb-2">
            {technologies.slice(0, 3).map((tech, idx) => (
              <span
                key={idx}
                className="text-xs px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm"
              >
                {tech}
              </span>
            ))}
            {technologies.length > 3 && (
              <span className="text-xs px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm">
                +{technologies.length - 3}
              </span>
            )}
          </div>
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2 mb-3 text-sm text-gray-400">
          <Layers className="w-4 h-4" />
          <span>
            {technologies[0]}, {technologies[1]}
          </span>
          <span className="mx-1">•</span>
          <Calendar className="w-4 h-4" />
          <span>2023</span>
        </div>

        <p className="text-gray-300 mb-4">{description}</p>

        <div className="flex flex-wrap gap-2">
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-3 py-2 rounded font-medium bg-[#191919] hover:bg-[#3d3d3d] transition-colors text-sm"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Ver proyecto
          </a>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-3 py-2 rounded font-medium bg-[#191919] hover:bg-[#3d3d3d] transition-colors text-sm"
          >
            <Github className="w-3.5 h-3.5" />
            Código fuente
          </a>
          <button
            onClick={() => setActiveProject(id)}
            className="flex items-center gap-1 px-3 py-2 rounded font-medium text-sm"
            // style={{ backgroundColor: colorThemes[activeTheme].color }}
          >
            <Code className="w-3.5 h-3.5" />
            Ver detrás del proyecto
          </button>
        </div>
      </div>
    </div>
  );
}
