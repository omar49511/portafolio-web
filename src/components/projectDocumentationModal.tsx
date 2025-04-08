"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  Code,
  Lightbulb,
  Zap,
  Clock,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import type { Project } from "@/types/project";

type ProjectDocumentationModalProps = {
  project: Project;
  onClose: () => void;
  themeColor?: string;
};

export default function ProjectDocumentationModal({
  project,
  onClose,
  themeColor,
}: ProjectDocumentationModalProps) {
  const [activeTab, setActiveTab] = useState<
    "overview" | "process" | "tech" | "challenges"
  >("overview");
  const [activeProcessStep, setActiveProcessStep] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const nextProcessStep = () => {
    setActiveProcessStep((prev) => (prev + 1) % project.process.length);
  };

  const prevProcessStep = () => {
    setActiveProcessStep(
      (prev) => (prev - 1 + project.process.length) % project.process.length
    );
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-hidden">
      <div
        ref={modalRef}
        className="bg-gray-900 rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden border border-gray-800 shadow-xl"
        style={{ boxShadow: `0 0 30px ${themeColor}30` }}
      >
        {/* Modal header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gray-800 border-b border-gray-700">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: themeColor }}
            ></span>
            Detrás del proyecto: {project.title}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation tabs */}
        <div className="flex border-b border-gray-700 overflow-x-auto hide-scrollbar">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-3 font-medium text-sm transition-colors whitespace-nowrap ${
              activeTab === "overview"
                ? "border-b-2 text-white"
                : "text-gray-400 hover:text-white"
            }`}
            style={{
              borderColor:
                activeTab === "overview" ? themeColor : "transparent",
            }}
          >
            Visión general
          </button>
          <button
            onClick={() => setActiveTab("process")}
            className={`px-4 py-3 font-medium text-sm transition-colors whitespace-nowrap ${
              activeTab === "process"
                ? "border-b-2 text-white"
                : "text-gray-400 hover:text-white"
            }`}
            style={{
              borderColor: activeTab === "process" ? themeColor : "transparent",
            }}
          >
            Proceso de desarrollo
          </button>
          <button
            onClick={() => setActiveTab("tech")}
            className={`px-4 py-3 font-medium text-sm transition-colors whitespace-nowrap ${
              activeTab === "tech"
                ? "border-b-2 text-white"
                : "text-gray-400 hover:text-white"
            }`}
            style={{
              borderColor: activeTab === "tech" ? themeColor : "transparent",
            }}
          >
            Stack tecnológico
          </button>
          <button
            onClick={() => setActiveTab("challenges")}
            className={`px-4 py-3 font-medium text-sm transition-colors whitespace-nowrap ${
              activeTab === "challenges"
                ? "border-b-2 text-white"
                : "text-gray-400 hover:text-white"
            }`}
            style={{
              borderColor:
                activeTab === "challenges" ? themeColor : "transparent",
            }}
          >
            Desafíos y aprendizajes
          </button>
        </div>

        {/* Modal content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {activeTab === "overview" && (
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="aspect-video relative rounded-md overflow-hidden mb-4 border-2 border-gray-800">
                    <Image
                      src="/placeholder.svg?height=300&width=500"
                      alt={project.title}
                      width={500}
                      height={300}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                      <div className="text-sm font-medium">
                        Vista final del proyecto
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3 mb-4">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded text-white font-medium flex-1 justify-center"
                        style={{ backgroundColor: themeColor }}
                      >
                        <ExternalLink className="w-4 h-4" />
                        Ver proyecto
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded bg-gray-800 text-white font-medium hover:bg-gray-700 transition-colors flex-1 justify-center"
                      >
                        <Github className="w-4 h-4" />
                        Código fuente
                      </a>
                    )}
                  </div>

                  <div className="bg-gray-800 rounded-lg p-4 mb-4">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Lightbulb
                        className="w-4 h-4"
                        style={{ color: themeColor }}
                      />
                      Inspiración del proyecto
                    </h4>
                    <p className="text-gray-300 text-sm">
                      Este proyecto nació de la necesidad de crear una solución{" "}
                      {project.id % 2 === 0 ? "innovadora" : "eficiente"} para
                      {project.id % 3 === 0
                        ? " gestionar datos complejos"
                        : project.id % 3 === 1
                        ? " mejorar la experiencia de usuario"
                        : " optimizar procesos de negocio"}
                      . La inspiración vino de{" "}
                      {project.id % 2 === 0
                        ? "tendencias actuales en diseño de interfaces"
                        : "soluciones existentes que necesitaban mejoras"}
                      .
                    </p>
                  </div>
                </div>
                <div>
                  <div
                    className="p-4 rounded-lg mb-4"
                    style={{
                      backgroundColor: `${themeColor}15`,
                      borderLeft: `4px solid ${themeColor}`,
                    }}
                  >
                    <h3 className="text-lg font-medium mb-3">
                      Resumen del proyecto
                    </h3>
                    <p className="text-gray-300 mb-4">{project.description}</p>
                  </div>

                  <div className="bg-gray-800 rounded-lg p-4 mb-4">
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <CheckCircle
                        className="w-4 h-4"
                        style={{ color: themeColor }}
                      />
                      Características principales
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span
                          className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ backgroundColor: themeColor }}
                        >
                          1
                        </span>
                        <span>
                          Diseño responsivo adaptado a todos los dispositivos
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span
                          className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ backgroundColor: themeColor }}
                        >
                          2
                        </span>
                        <span>Interfaz moderna con animaciones fluidas</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span
                          className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ backgroundColor: themeColor }}
                        >
                          3
                        </span>
                        <span>Rendimiento optimizado y alta accesibilidad</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span
                          className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ backgroundColor: themeColor }}
                        >
                          4
                        </span>
                        <span>
                          Experiencia de usuario intuitiva y atractiva
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gray-800 rounded-lg p-4">
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <Code className="w-4 h-4" style={{ color: themeColor }} />
                      Tecnologías utilizadas
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 text-sm rounded-full flex items-center gap-1"
                          style={{
                            backgroundColor: `${themeColor}30`,
                            border: `1px solid ${themeColor}50`,
                          }}
                        >
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: themeColor }}
                          ></span>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "process" && (
            <div className="p-6">
              <div className="relative">
                <div className="grid md:grid-cols-[1fr_2fr] gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                      <Clock
                        className="w-5 h-5"
                        style={{ color: themeColor }}
                      />
                      Proceso de desarrollo
                    </h3>

                    {/* Timeline visualization */}
                    <div className="relative pl-8 border-l-2 border-gray-700 mb-4">
                      <div
                        className="absolute left-0 top-0 w-0.5 h-full z-10"
                        style={{
                          backgroundColor: themeColor,
                          height: `${
                            ((activeProcessStep + 1) * 100) /
                            project.process.length
                          }%`,
                        }}
                      ></div>

                      {project.process.map((step, index) => (
                        <div key={index} className="mb-4 relative">
                          <div
                            className={`absolute left-[-9px] top-0 w-4 h-4 rounded-full z-20 ${
                              index <= activeProcessStep ? "" : "bg-gray-700"
                            }`}
                            style={{
                              backgroundColor:
                                index <= activeProcessStep ? themeColor : "",
                              border:
                                index <= activeProcessStep
                                  ? "none"
                                  : `2px solid ${themeColor}`,
                            }}
                          ></div>

                          <button
                            onClick={() => setActiveProcessStep(index)}
                            className={`w-full text-left p-3 rounded-md transition-colors ${
                              activeProcessStep === index
                                ? "bg-opacity-20"
                                : "bg-gray-800 hover:bg-gray-700"
                            }`}
                            style={{
                              backgroundColor:
                                activeProcessStep === index
                                  ? `${themeColor}20`
                                  : "",
                              borderLeft:
                                activeProcessStep === index
                                  ? `4px solid ${themeColor}`
                                  : "none",
                            }}
                          >
                            <div className="font-medium">{step.title}</div>
                            <div className="text-xs text-gray-400">
                              Fase {index + 1}
                            </div>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-800 rounded-lg p-4 relative">
                    <div className="absolute top-2 right-2 flex gap-1">
                      <button
                        onClick={prevProcessStep}
                        className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-700 hover:bg-gray-600 transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={nextProcessStep}
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: themeColor }}
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="mb-3 flex items-center gap-2">
                      <span
                        className="w-6 h-6 rounded-full flex items-center justify-center text-sm"
                        style={{ backgroundColor: themeColor }}
                      >
                        {activeProcessStep + 1}
                      </span>
                      <h4 className="font-medium">
                        {project.process[activeProcessStep].title}
                      </h4>
                    </div>

                    <div className="aspect-video relative rounded-md overflow-hidden mb-4 border-2 border-gray-700">
                      <Image
                        src={
                          project.process[activeProcessStep].image ||
                          "/placeholder.svg?height=300&width=500"
                        }
                        alt={project.process[activeProcessStep].title}
                        width={500}
                        height={300}
                        className="object-cover w-full h-full"
                      />
                    </div>

                    <div className="bg-gray-900 p-4 rounded-md">
                      <p className="text-gray-300">
                        {project.process[activeProcessStep].description}
                      </p>

                      <div className="mt-4 pt-4 border-t border-gray-700">
                        <h5 className="font-medium mb-2 text-sm">
                          Herramientas utilizadas en esta fase:
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies
                            .slice(0, 3)
                            .map((tech, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 text-xs rounded-full"
                                style={{ backgroundColor: `${themeColor}30` }}
                              >
                                {tech}
                              </span>
                            ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between mt-4 text-sm">
                      <div>
                        <span className="text-gray-400">Fase:</span>{" "}
                        {activeProcessStep + 1} de {project.process.length}
                      </div>
                      <div>
                        <span className="text-gray-400">Tiempo estimado:</span>{" "}
                        {activeProcessStep + 2} semanas
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "tech" && (
            <div className="p-6">
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5" style={{ color: themeColor }} />
                Stack tecnológico
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {project.technologies.map((tech, index) => (
                  <div
                    key={index}
                    className="bg-gray-800 rounded-lg p-4 border-t-2"
                    style={{ borderColor: themeColor }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{
                          backgroundColor: `${themeColor}30`,
                          border: `2px solid ${themeColor}`,
                        }}
                      >
                        {tech.charAt(0).toUpperCase()}
                      </div>
                      <h4 className="font-medium">{tech}</h4>
                    </div>
                    <p className="text-sm text-gray-300">
                      {index % 3 === 0
                        ? `Utilizado para el desarrollo frontend y la creación de componentes interactivos.`
                        : index % 3 === 1
                        ? `Implementado para el diseño, estilizado y animaciones de la interfaz.`
                        : `Aplicado en la lógica de negocio y funcionalidades del backend.`}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-xs text-gray-400">
                        Nivel de dominio:
                      </span>
                      <div className="flex-1 bg-gray-700 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${70 + ((index * 5) % 30)}%`,
                            backgroundColor: themeColor,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-800 rounded-lg p-4">
                  <h4 className="font-medium mb-3">
                    Arquitectura del proyecto
                  </h4>
                  <div className="aspect-[4/3] relative rounded-md overflow-hidden mb-4 bg-gray-900 p-4">
                    <div className="w-full h-full flex flex-col items-center justify-center">
                      {/* Simple architecture diagram */}
                      <div className="flex flex-col items-center gap-4 w-full max-w-xs">
                        <div
                          className="w-full py-3 rounded-lg text-center font-medium"
                          style={{ backgroundColor: themeColor }}
                        >
                          Frontend (UI)
                        </div>
                        <div
                          className="w-0.5 h-6"
                          style={{ backgroundColor: themeColor }}
                        ></div>
                        <div
                          className="w-full py-3 rounded-lg text-center font-medium"
                          style={{ backgroundColor: `${themeColor}50` }}
                        >
                          Lógica de negocio
                        </div>
                        <div
                          className="w-0.5 h-6"
                          style={{ backgroundColor: themeColor }}
                        ></div>
                        <div
                          className="w-full py-3 rounded-lg text-center font-medium"
                          style={{ backgroundColor: `${themeColor}30` }}
                        >
                          Backend / API
                        </div>
                        <div
                          className="w-0.5 h-6"
                          style={{ backgroundColor: themeColor }}
                        ></div>
                        <div className="w-full py-3 rounded-lg text-center font-medium bg-gray-700">
                          Base de datos
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm">
                    El proyecto sigue una arquitectura de componentes con clara
                    separación de responsabilidades. Los datos fluyen desde los
                    componentes padres a los hijos, con la gestión de estado
                    manejada al nivel apropiado.
                  </p>
                </div>

                <div className="bg-gray-800 rounded-lg p-4">
                  <h4 className="font-medium mb-3">
                    Patrones y prácticas implementadas
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: themeColor }}
                      >
                        1
                      </div>
                      <div>
                        <span className="font-medium">
                          Arquitectura de componentes
                        </span>
                        <p className="text-sm text-gray-300">
                          Organización modular para facilitar mantenimiento y
                          reutilización.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: themeColor }}
                      >
                        2
                      </div>
                      <div>
                        <span className="font-medium">Diseño responsivo</span>
                        <p className="text-sm text-gray-300">
                          Adaptación fluida a diferentes tamaños de pantalla y
                          dispositivos.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: themeColor }}
                      >
                        3
                      </div>
                      <div>
                        <span className="font-medium">
                          Optimización de rendimiento
                        </span>
                        <p className="text-sm text-gray-300">
                          Técnicas de lazy loading, code splitting y renderizado
                          eficiente.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: themeColor }}
                      >
                        4
                      </div>
                      <div>
                        <span className="font-medium">
                          Accesibilidad (A11Y)
                        </span>
                        <p className="text-sm text-gray-300">
                          Implementación de estándares WCAG para garantizar
                          usabilidad universal.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === "challenges" && (
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                    <AlertTriangle
                      className="w-5 h-5"
                      style={{ color: themeColor }}
                    />
                    Desafíos enfrentados
                  </h3>
                  <div className="space-y-4">
                    {project.challenges.map((challenge, index) => (
                      <div
                        key={index}
                        className="bg-gray-800 rounded-lg p-4 border-l-4"
                        style={{
                          borderColor: index % 2 === 0 ? themeColor : "#ff6b6b",
                        }}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                            style={{
                              backgroundColor:
                                index % 2 === 0 ? themeColor : "#ff6b6b",
                            }}
                          >
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="font-medium mb-2">
                              Desafío {index + 1}
                            </h4>
                            <p className="text-gray-300">{challenge}</p>

                            <div className="mt-3 p-3 rounded-md bg-gray-900">
                              <h5 className="text-sm font-medium mb-1">
                                Solución implementada:
                              </h5>
                              <p className="text-sm text-gray-300">
                                {index % 3 === 0
                                  ? "Implementamos técnicas de optimización y caching para mejorar el rendimiento."
                                  : index % 3 === 1
                                  ? "Desarrollamos un sistema modular que permite adaptarse a diferentes requisitos."
                                  : "Utilizamos pruebas exhaustivas y refactorización para garantizar la calidad."}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                    <Lightbulb
                      className="w-5 h-5"
                      style={{ color: themeColor }}
                    />
                    Aprendizajes clave
                  </h3>
                  <div className="space-y-4">
                    {project.learnings.map((learning, index) => (
                      <div
                        key={index}
                        className="bg-gray-800 rounded-lg p-4"
                        style={{
                          background: `linear-gradient(to right, ${themeColor}20, transparent)`,
                          borderLeft: `4px solid ${themeColor}`,
                        }}
                      >
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          <span
                            className="w-5 h-5 rounded-full flex items-center justify-center text-xs"
                            style={{ backgroundColor: themeColor }}
                          >
                            {index + 1}
                          </span>
                          Aprendizaje {index + 1}
                        </h4>
                        <p className="text-gray-300">{learning}</p>
                      </div>
                    ))}
                  </div>

                  <div
                    className="mt-6 p-5 rounded-lg"
                    style={{ backgroundColor: `${themeColor}15` }}
                  >
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <span
                        className="w-6 h-6 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: themeColor }}
                      >
                        <Zap className="w-4 h-4" />
                      </span>
                      Mejoras futuras
                    </h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span
                          className="w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5"
                          style={{ backgroundColor: `${themeColor}40` }}
                        >
                          1
                        </span>
                        <span>
                          Añadir más características interactivas y animaciones
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span
                          className="w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5"
                          style={{ backgroundColor: `${themeColor}40` }}
                        >
                          2
                        </span>
                        <span>
                          Implementar filtrado avanzado y funcionalidad de
                          búsqueda
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span
                          className="w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5"
                          style={{ backgroundColor: `${themeColor}40` }}
                        >
                          3
                        </span>
                        <span>
                          Optimizar el rendimiento para conjuntos de datos más
                          grandes
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span
                          className="w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5"
                          style={{ backgroundColor: `${themeColor}40` }}
                        >
                          4
                        </span>
                        <span>
                          Añadir cobertura completa de pruebas automatizadas
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
