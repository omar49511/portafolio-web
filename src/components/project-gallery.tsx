"use client";

import { useState } from "react";
import Image from "next/image";
import { Grid, List } from "lucide-react";
import { projects } from "@/data/proyects";
import { Project } from "@/types/project";
import ProjectDocumentationModal from "./project-documentation-modal";

// type Project = {
//   id: number;
//   title: string;
//   description: string;
//   liveUrl?: string;
//   githubUrl?: string;
//   technologies: string[];
//   process: {
//     title: string;
//     description: string;
//     image?: string;
//   }[];
//   challenges: string[];
//   learnings: string[];
//   featured?: boolean;
//   imageUrl: string;
//   category: string;
// };

type ProjectGalleryProps = {
  projects: Project[];
  themeColor?: string;
};

export default function ProjectGallery({
  projects,
  themeColor,
}: ProjectGalleryProps) {
  const [viewType, setViewType] = useState<"gallery" | "table">("gallery");
  const [activeProject, setActiveProject] = useState<number | null>(null);

  return (
    <div className="mb-12">
      {/* Tabs de navegación estilo Notion */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex border border-gray-700 rounded-md overflow-hidden">
          <button
            onClick={() => setViewType("gallery")}
            className={`px-3 py-1.5 flex items-center gap-2 transition-colors ${
              viewType === "gallery"
                ? "bg-gray-800 text-white"
                : "bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-white"
            }`}
          >
            <Grid size={16} />
            Gallerivisning
          </button>
          <button
            onClick={() => setViewType("table")}
            className={`px-3 py-1.5 flex items-center gap-2 transition-colors ${
              viewType === "table"
                ? "bg-gray-800 text-white"
                : "bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-white"
            }`}
          >
            <List size={16} />
            Tabla
          </button>
        </div>
      </div>

      {viewType === "gallery" ? (
        /* Vista de galería estilo Notion */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-purple-400/50 rounded-lg overflow-hidden border border-gray-800 hover:border-gray-700 transition-colors cursor-pointer group"
              onClick={() => setActiveProject(project.id)}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={
                    project.imageUrl ||
                    `/placeholder.svg?height=300&width=400&text=${project.title.replace(
                      /\s+/g,
                      "+"
                    )}`
                  }
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-3 border-t ">
                <h3 className="text-sm font-medium truncate">
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Vista de tabla estilo Notion */
        <div className="border border-gray-800 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-800">
                <th className="text-left p-3 text-sm font-medium">Nombre</th>
                <th className="text-left p-3 text-sm font-medium">Categoría</th>
                <th className="text-left p-3 text-sm font-medium">
                  Tecnologías
                </th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, index) => (
                <tr
                  key={project.id}
                  className={`border-t border-gray-800 hover:bg-gray-800/50 cursor-pointer transition-colors ${
                    index % 2 === 0 ? "bg-gray-900" : "bg-gray-900/70"
                  }`}
                  onClick={() => setActiveProject(project.id)}
                >
                  <td className="p-3 text-sm">
                    <div className="flex items-center gap-3">
                      <div className="relative w-8 h-8 rounded overflow-hidden flex-shrink-0">
                        <Image
                          src={
                            project.imageUrl ||
                            `/placeholder.svg?height=32&width=32&text=${project.title.charAt(
                              0
                            )}`
                          }
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      {project.title}
                    </div>
                  </td>
                  <td className="p-3 text-sm text-gray-400">
                    {project.category}
                  </td>
                  <td className="p-3 text-sm">
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 2).map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-1.5 py-0.5 text-xs rounded bg-gray-800 text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 2 && (
                        <span className="px-1.5 py-0.5 text-xs rounded bg-gray-800 text-gray-300">
                          +{project.technologies.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeProject !== null && (
        <ProjectDocumentationModal
          project={projects.find((p) => p.id === activeProject)!}
          onClose={() => setActiveProject(null)}
          // themeColor={colorThemes[activeTheme].color}
        />
      )}
    </div>
  );
}
