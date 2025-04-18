"use client"

import { useState, useEffect } from "react"
import { Eye, RefreshCw } from "lucide-react"

type SecretCodeCollectorProps = {
    themeColor: string
}

// Código secreto en orden específico
const SECRET_CODE = "d3#hg5"

export default function SecretCodeCollector({ themeColor }: SecretCodeCollectorProps) {
    // Mapa para rastrear qué caracteres se han encontrado
    const [foundChars, setFoundChars] = useState<Record<string, boolean>>({})
    const [showAnimation, setShowAnimation] = useState<number | null>(null)

    // Cargar caracteres encontrados desde localStorage
    useEffect(() => {
        const loadSavedChars = () => {
            const savedChars = localStorage.getItem("secretCodeChars")
            if (savedChars) {
                try {
                    const parsed = JSON.parse(savedChars)
                    if (Array.isArray(parsed)) {
                        // Convertir el array a un objeto de mapa
                        const charMap: Record<string, boolean> = {}
                        parsed.forEach((char) => {
                            charMap[char] = true
                        })
                        setFoundChars(charMap)
                        console.log("Loaded chars from localStorage:", parsed, "Map:", charMap) // Debugging
                    }
                } catch (e) {
                    console.error("Error parsing saved secret code")
                }
            }
        }

        loadSavedChars()

        // Escuchar el evento personalizado para cuando se encuentra una letra
        const handleSecretFound = (event: Event) => {
            console.log("Secret letter found event received") // Debugging
            loadSavedChars()
        }

        // Escuchar cambios en localStorage
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === "secretCodeChars") {
                console.log("localStorage changed for secretCodeChars") // Debugging
                loadSavedChars()
            }
        }

        window.addEventListener("secretLetterFound", handleSecretFound)
        window.addEventListener("storage", handleStorageChange)

        return () => {
            window.removeEventListener("secretLetterFound", handleSecretFound)
            window.removeEventListener("storage", handleStorageChange)
        }
    }, [])

    // Exponer la función para añadir caracteres globalmente
    useEffect(() => {
        window.addSecretChar = (char: string) => {
            console.log(`Adding char via global function: ${char}`) // Debugging
            setFoundChars((prev) => {
                if (!prev[char]) {
                    const newChars = { ...prev, [char]: true }

                    // Actualizar localStorage con el array de caracteres
                    const charArray = Object.keys(newChars).filter((k) => newChars[k])
                    localStorage.setItem("secretCodeChars", JSON.stringify(charArray))

                    // Mostrar animación para el carácter recién añadido
                    const index = SECRET_CODE.indexOf(char)
                    if (index !== -1) {
                        setShowAnimation(index)
                        setTimeout(() => setShowAnimation(null), 2000)
                    }

                    return newChars
                }
                return prev
            })
        }

        window.resetSecretCode = () => {
            setFoundChars({})
            localStorage.removeItem("secretCodeChars")
        }

        return () => {
            delete window.addSecretChar
            delete window.resetSecretCode
        }
    }, [])



    const resetCode = () => {
        setFoundChars({})
        localStorage.removeItem("secretCodeChars")
        // Disparar un evento personalizado para notificar que se ha reseteado el código
        const resetEvent = new CustomEvent("secretCodeReset")
        window.dispatchEvent(resetEvent)
    }

    // Verificar si el código está completo (todas las letras de SECRET_CODE están en foundChars)
    const isCodeComplete = () => {
        return SECRET_CODE.split("").every((char) => foundChars[char])
    }

    // Contar cuántas letras se han encontrado
    const countFoundChars = () => {
        return SECRET_CODE.split("").filter((char) => foundChars[char]).length
    }

    return (
        <div className="flex items-center gap-2 px-3 py-1.5">
            <div className="flex items-center">
                <div className="text-xs text-gray-400 mr-2">
                    {countFoundChars()} de {SECRET_CODE.length}
                </div>
                <div className="flex">
                    <div className="flex">
                        {/* Mostrar las letras en el orden específico del código */}
                        {SECRET_CODE.split("").map((char, index) => (
                            <div
                                key={index}
                                className={`w-5 h-5 flex items-center justify-center rounded-md mx-0.5 transition-all duration-300 ${showAnimation === index ? "scale-125" : ""
                                    }`}
                                style={{
                                    backgroundColor: foundChars[char] ? `${themeColor}30` : "rgba(255,255,255,0.1)",
                                    border: foundChars[char] ? `1px solid ${themeColor}` : "1px solid rgba(255,255,255,0.2)",
                                    transform: showAnimation === index ? "scale(1.2)" : "scale(1)",
                                }}
                            >
                                {foundChars[char] ? (
                                    <span className="text-xs">{char}</span>
                                ) : (
                                    <span className="text-xs text-gray-600">•</span>
                                )}
                            </div>
                        ))}
                    </div>

                </div>
            </div>

            <div className="relative group">
                {/* Botón para reiniciar el código */}
                <button
                    onClick={resetCode}
                    className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-800 transition-colors"
                >
                    <RefreshCw className="w-3 h-3" />
                </button>
                <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-800 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                    Resetear código
                </span>
            </div>

            {/* Mostrar indicador cuando el código está completo */}
            {isCodeComplete() && (
                <div className="text-xs text-green-400 flex items-center gap-1">
                    <span>¡Completo!</span>
                </div>
            )}
        </div>
    )
}

// Extender la interfaz Window para incluir nuestras funciones globales
declare global {
    interface Window {
        addSecretChar?: (char: string) => void
        resetSecretCode?: () => void
    }
}