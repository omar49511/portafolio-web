import React from 'react'
import {
    ChevronLeft,
    ChevronRight,
    Clock,
} from "lucide-react";
import Image from 'next/image';
import type { Project } from "@/types/project";

type ProjectDocumentationModalProps = {
    project: Project;
    themeColor?: string;
};

export default function ProcessContent({
    project,
    themeColor,
}: ProjectDocumentationModalProps) {
    const [activeProcessStep, setActiveProcessStep] = React.useState(0); // Define activeProcessStep state
    const nextProcessStep = () => {
        setActiveProcessStep((prev) => (prev + 1) % project.process.length);
    };

    const prevProcessStep = () => {
        setActiveProcessStep(
            (prev) => (prev - 1 + project.process.length) % project.process.length
        );
    };
    return (
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
                        <div className="relative pl-8 mb-4">

                            {project.process.map((step, index) => (
                                <div key={index} className="mb-4 relative">
                                    <div
                                        className={`absolute left-[-9px] top-0 w-4 h-4 rounded-full z-20 ${index <= activeProcessStep ? "" : "bg-[#2F2F2F]"
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
                                        className={`w-full text-left p-3 rounded-md transition-colors ${activeProcessStep === index
                                            ? "bg-opacity-20"
                                            : "bg-[#262727] hover:bg-[#2F2F2F]"
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

                    <div className="bg-[#262727] rounded-lg p-4 relative">
                        <div className="absolute top-2 right-2 flex gap-1">
                            <button
                                onClick={prevProcessStep}
                                className="w-8 h-8 rounded-full flex items-center justify-center bg-[#2F2F2F] hover:bg-gray-600 transition-colors"
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

                        <div className="aspect-video relative rounded-md overflow-hidden mb-4 border-2 border-[#2F2F2F]">
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

                        <div className="bg-[#3d3c3c] p-4 rounded-md">
                            <p className="text-gray-300">
                                {project.process[activeProcessStep].description}
                            </p>

                            <div className="mt-4 pt-4 border-t border-[#2F2F2F]">
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
    )
}
