"use client";
import { FaFileAlt, FaTerminal, FaSun } from "react-icons/fa";
import { useState, useEffect } from "react";

interface NavBarProps {
    onTerminalOpen: () => void;
    onThemeToggle: () => void;
    activeColor: string;
}

export default function NavBar({
    onTerminalOpen,
    onThemeToggle,
    activeColor,
}: NavBarProps) {
    const [showSecretCollector, setShowSecretCollector] = useState(false)

    // Resetear el código secreto al cargar la página (opcional, para pruebas)
    useEffect(() => {
        // Descomentar para resetear el código al recargar
        // localStorage.removeItem("secretCodeChars")

        // Verificar si hay letras guardadas
        const savedChars = localStorage.getItem("secretCodeChars")
        if (savedChars) {
            try {
                const parsed = JSON.parse(savedChars)
                if (Array.isArray(parsed) && parsed.length > 0) {
                    setShowSecretCollector(true)
                    console.log("Loaded secret chars on init:", parsed) // Debugging
                }
            } catch (e) {
                console.error("Error parsing saved secret code")
            }
        }
    }, [])

    // Verificar si debemos mostrar el colector de código secreto
    useEffect(() => {
        // Escuchar el evento personalizado para cuando se encuentra una letra
        const handleSecretFound = () => {
            console.log("Secret letter found, showing collector") // Debugging
            setShowSecretCollector(true)
        }

        window.addEventListener("secretLetterFound", handleSecretFound)

        return () => {
            window.removeEventListener("secretLetterFound", handleSecretFound)
        }
    }, [])

    const baseBtnClass =
        "w-10 h-10 flex items-center justify-center rounded-full relative transition-colors";

    const IconButton = ({
        icon: Icon,
        label,
        onClick,
        bg = "#252525",
        hover = "#2F2F2F",
        color = "white",
    }: {
        icon: React.ElementType;
        label: string;
        onClick?: () => void;
        bg?: string;
        hover?: string;
        color?: string;
    }) => (
        <div className="relative group">
            <button
                onClick={onClick}
                aria-label={label}
                className={`${baseBtnClass}`}
                style={{ backgroundColor: bg }}
                onMouseOver={(e) =>
                    (e.currentTarget.style.backgroundColor = hover)
                }
                onMouseOut={(e) =>
                    (e.currentTarget.style.backgroundColor = bg)
                }
            >
                <Icon className="w-5 h-5" style={{ color }} />
            </button>
            <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-800 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                {label}
            </span>
        </div>
    );



    // Define colorThemes and activeTheme
    const colorThemes = {
        light: { color: "#FFD700" },
        dark: { color: "#1E1E1E" },
    };
    const activeTheme = "light"; // Set the active theme (e.g., "light" or "dark")

    return (
        <nav className="fixed top-0 left-0 right-0 z-50">
            <div className="container mx-auto px-6 py-3 flex justify-center">
                <div className="flex items-center gap-4 p-2 bg-[#191919] rounded-full">
                    <IconButton icon={FaFileAlt} label="Ver CV" onClick={() => window.open("./cv/CVOmar_Reyes_Zamudio.pdf", "_blank")} />
                    <IconButton
                        icon={FaTerminal}
                        label="Abrir terminal"
                        onClick={onTerminalOpen}
                    />
                    <IconButton
                        icon={FaSun}
                        label="Cambiar tema"
                        onClick={onThemeToggle}
                        bg={activeColor}
                        hover={activeColor}
                    />
                </div>
            </div>
        </nav>
    );
}