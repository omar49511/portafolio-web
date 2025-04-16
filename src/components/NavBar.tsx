// components/NavBar.jsx
"use client";
import { FaFileAlt, FaTerminal, FaSun } from "react-icons/fa";

interface NavBarProps {
    onTerminalOpen: () => void;
    onThemeToggle: () => void;
    activeColor: string;
}

export default function NavBar({ onTerminalOpen, onThemeToggle, activeColor }: NavBarProps) {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50">
            <div className="container mx-auto px-6 py-3 flex justify-center">
                <div className="flex items-center gap-4 p-2 bg-[#191919] rounded-full">
                    <button
                        aria-label="Ver documentos"
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-[#252525] hover:bg-[#2F2F2F] transition-colors"
                    >
                        <FaFileAlt className="w-5 h-5" />
                    </button>
                    <button
                        onClick={onTerminalOpen}
                        aria-label="Abrir terminal"
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-[#252525] hover:bg-[#2F2F2F] transition-colors"
                    >
                        <FaTerminal className="w-5 h-5" />
                    </button>
                    <button
                        onClick={onThemeToggle}
                        aria-label="Cambiar tema"
                        className="w-10 h-10 flex items-center justify-center rounded-full transition-colors"
                        style={{ backgroundColor: activeColor }}
                    >
                        <FaSun className="w-5 h-5 text-white" />
                    </button>
                </div>
            </div>
        </nav>
    );
}
