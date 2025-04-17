import React from 'react'
import {
    Lightbulb,
    Zap,
    AlertTriangle,
} from "lucide-react";
import { Project } from "@/types/project";

export default function ChallengesContent({ project, themeColor = "#4CAF50" }: { project: Project; themeColor?: string }) {
    return (
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
                                className="bg-[#262727] rounded-lg p-4 border-l-4"
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

                                        <div className="mt-3 p-3 rounded-md bg-[#3d3c3c]">
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
                                className="bg-[#262727] rounded-lg p-4"
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
    )
}
