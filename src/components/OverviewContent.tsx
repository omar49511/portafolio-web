import React from 'react'
import Image from 'next/image'
import { FaExternalLinkAlt as ExternalLink, FaGithub as Github, FaLightbulb as Lightbulb, FaCheckCircle as CheckCircle, FaCode as Code } from 'react-icons/fa' // Example: Importing from react-icons
import { Project } from '@/types/project'

export default function OverviewContent({ project, themeColor = '#4CAF50' }: { project: Project; themeColor?: string }) {
    return (
        <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <div className="aspect-video relative rounded-md overflow-hidden mb-4 border-2 border-gray-800">
                        <Image
                            src={project.imageUrl}
                            alt={project.title}
                            width={500}
                            height={300}
                            className="object-cover w-full h-full"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                            <div className="text-sm font-medium">Vista final del proyecto</div>
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
                            <Lightbulb className="w-4 h-4" style={{ color: themeColor }} />
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
                        style={{ backgroundColor: `${themeColor}15`, borderLeft: `4px solid ${themeColor}` }}
                    >
                        <h3 className="text-lg font-medium mb-3">Resumen del proyecto</h3>
                        <p className="text-gray-300 mb-4">{project.description}</p>
                    </div>

                    <div className="bg-gray-800 rounded-lg p-4 mb-4">
                        <h4 className="font-medium mb-3 flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" style={{ color: themeColor }} />
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
                                <span>Diseño responsivo adaptado a todos los dispositivos</span>
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
                                <span>Experiencia de usuario intuitiva y atractiva</span>
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
                                    style={{ backgroundColor: `${themeColor}30`, border: `1px solid ${themeColor}50` }}
                                >
                                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: themeColor }}></span>
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
