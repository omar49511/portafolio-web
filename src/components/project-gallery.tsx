"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Grid, List } from "lucide-react";
import { Project } from "@/types/project";
import dynamic from "next/dynamic";

const ProjectDocumentationModal = dynamic(
  () => import("./project-documentation-modal"),
  { ssr: false }
);

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

  useEffect(() => {
    const savedViewType = localStorage.getItem("projectViewType");
    if (savedViewType === "gallery" || savedViewType === "table") {
      setViewType(savedViewType);
    }
  }, []);

  const handleViewTypeChange = (type: "gallery" | "table") => {
    setViewType(type);
    localStorage.setItem("projectViewType", type);
  };

  return (
    <section className="mb-12" aria-label="Galería de proyectos">
      {/* Vista tipo tabs */}
      <div className="flex items-center gap-4 mb-6" role="tablist" aria-label="Vista de proyectos">
        <div className="flex border border-[#5c5c5c] rounded-md overflow-hidden">
          <button
            type="button"
            role="tab"
            aria-selected={viewType === "gallery"}
            aria-label="Vista en galería"
            onClick={() => handleViewTypeChange("gallery")}
            className={`px-3 py-1.5 flex items-center gap-2  ${viewType === "gallery"
              ? "bg-[#262727] text-white"
              : "bg-[#222020] text-gray-400 hover:bg-[#2F2F2F] hover:text-white"
              }`}
          >
            <Grid size={16} />
            Galería
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={viewType === "table"}
            aria-label="Vista en tabla"
            onClick={() => handleViewTypeChange("table")}
            className={`px-3 py-1.5 flex items-center gap-2  ${viewType === "table"
              ? "bg-[#262727] text-white"
              : "bg-[#222020] text-gray-400 hover:bg-[#262727] hover:text-white"
              }`}
          >
            <List size={16} />
            Tabla
          </button>
        </div>
      </div>

      {viewType === "gallery" ? (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4"
          role="list"
          aria-label="Proyectos en galería"
        >
          {projects.map((project) => (
            <button
              key={project.id}
              role="listitem"
              aria-label={`Ver detalles del proyecto ${project.title}`}
              onClick={() => setActiveProject(project.id)}
              className="bg-[#191819] rounded-lg overflow-hidden border border-[#5c5c5c] transition-colors cursor-pointer group text-left"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={
                    project.imageUrl
                  }
                  alt={`Imagen del proyecto ${project.title}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={false}
                />
              </div>
              <div className="p-3 border-t border-[#5c5c5c]">
                <h3 className="text-sm font-medium truncate">{project.title}</h3>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="border border-[#5c5c5c] rounded-lg overflow-hidden overflow-x-auto">
          <table
            className="w-full min-w-[600px]"
            aria-label="Tabla de proyectos"
          >
            <thead>
              <tr className="bg-[#191819] text-gray-400">
                <th scope="col" className="text-left p-3 text-sm font-medium">Nombre</th>
                <th scope="col" className="text-left p-3 text-sm font-medium">Categoría</th>
                <th scope="col" className="text-left p-3 text-sm font-medium">Tecnologías</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, index) => (
                <tr
                  key={project.id}
                  onClick={() => setActiveProject(project.id)}
                  className={`border-t border-[#5c5c5c] hover:bg-[#2F2F2F] cursor-pointer transition-colors ${index % 2 === 0 ? "bg-[#262727]" : "bg-[#222020]"
                    }`}
                  role="button"
                  aria-label={`Ver detalles del proyecto ${project.title}`}
                >
                  <td className="p-3 text-sm">
                    <div className="flex items-center gap-3">
                      <div className="relative w-8 h-8 rounded overflow-hidden flex-shrink-0">
                        <Image
                          src={
                            project.imageUrl ||
                            `/placeholder.svg?height=32&width=32&text=${project.title.charAt(0)}`
                          }
                          alt={`Miniatura de ${project.title}`}
                          fill
                          className="object-cover"
                          sizes="32px"
                          priority={false}
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
                          className="px-1.5 py-0.5 text-xs rounded bg-[#3A3A3A] text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 2 && (
                        <span className="px-1.5 py-0.5 text-xs rounded bg-[#3A3A3A] text-gray-300">
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
          themeColor={themeColor || "#000000"} // Default to black if undefined
        />
      )}
    </section>
  );
}
