import React from 'react'
import { Zap } from "lucide-react";
import { Project } from "@/types/project";

export default function TechContent({ project, themeColor = '#3498db' }: { project: Project; themeColor?: string }) {
    return (
        <div className="p-6">
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5" style={{ color: themeColor }} />
                Stack tecnológico
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {project.technologies.map((tech, index) => (
                    <div
                        key={index}
                        className="bg-[#262727] rounded-lg p-4 border-t-2"
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
                            <div className="flex-1 bg-[#2F2F2F] h-1.5 rounded-full overflow-hidden">
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
                <div className="bg-[#262727] rounded-lg p-4">
                    <h4 className="font-medium mb-3">
                        Arquitectura del proyecto
                    </h4>
                    <div className="aspect-[4/3] relative rounded-md overflow-hidden mb-4 bg-[#3d3c3c] p-4">
                        <div className="w-full h-full flex flex-col items-center justify-center">
                            {/* Simple architecture diagram */}
                            <div className="flex flex-col items-center gap-4 w-full max-w-xs">
                                <div
                                    className="w-full py-4 rounded-lg text-center font-medium"
                                    style={{ backgroundColor: themeColor }}
                                >
                                    Frontend (UI)
                                </div>
                                <div
                                    className="w-0.5 h-6"
                                    style={{ backgroundColor: themeColor }}
                                ></div>
                                <div
                                    className="w-full py-4 rounded-lg text-center font-medium"
                                    style={{ backgroundColor: `${themeColor}50` }}
                                >
                                    Lógica de negocio
                                </div>
                                <div
                                    className="w-0.5 h-6"
                                    style={{ backgroundColor: themeColor }}
                                ></div>
                                <div
                                    className="w-full py-4 rounded-lg text-center font-medium"
                                    style={{ backgroundColor: `${themeColor}30` }}
                                >
                                    Backend / API
                                </div>
                                <div
                                    className="w-0.5 h-6"
                                    style={{ backgroundColor: themeColor }}
                                ></div>
                                <div className="w-full py-4 rounded-lg text-center font-medium bg-[#2F2F2F]">
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

                <div className="bg-[#262727] rounded-lg p-4">
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
    )
}
