"use client"

import type React from "react"

import { useState, useEffect } from "react"

type HiddenLetterProps = {
    letter: string
    className?: string
    style?: React.CSSProperties
    themeColor: string
}

export default function HiddenLetter({ letter, className = "", style = {}, themeColor }: HiddenLetterProps) {
    const [found, setFound] = useState(false)
    const [showAnimation, setShowAnimation] = useState(false)
    const [isVisible, setIsVisible] = useState(true)
    const [isHovering, setIsHovering] = useState(false)

    // Verificar si la letra ya ha sido encontrada
    useEffect(() => {
        const checkIfFound = () => {
            const savedChars = localStorage.getItem("secretCodeChars")
            if (savedChars) {
                try {
                    const parsed = JSON.parse(savedChars)
                    if (Array.isArray(parsed) && parsed.includes(letter)) {
                        setFound(true)
                        setIsVisible(false)
                    } else {
                        // Si no hay datos en localStorage, asegurarse de que la letra sea visible
                        setFound(false)
                        setIsVisible(true)
                    }
                } catch (e) {
                    console.error("Error parsing saved secret code")
                }
            } else {
                // Si no hay datos en localStorage, asegurarse de que la letra sea visible
                setFound(false)
                setIsVisible(true)
            }
        }

        checkIfFound()


        // Escuchar el evento de reseteo del código
        const handleReset = () => {
            console.log(`Letter ${letter} reset`) // Debugging
            setFound(false)
            setIsVisible(true)
            setShowAnimation(false)
            setIsHovering(false)
        }

        // También verificar cuando cambia el localStorage
        window.addEventListener("storage", checkIfFound)
        window.addEventListener("secretLetterFound", checkIfFound)
        window.addEventListener("secretCodeReset", handleReset)

        return () => {
            window.removeEventListener("storage", checkIfFound)
            window.removeEventListener("secretLetterFound", checkIfFound)
            window.removeEventListener("secretCodeReset", handleReset)
        }
    }, [letter])

    const handleClick = () => {
        if (!found && isVisible) {
            console.log(`Letter ${letter} clicked!`) // Debugging
            setShowAnimation(true)

            // Método directo para guardar en localStorage
            const savedChars = localStorage.getItem("secretCodeChars")
            let chars = []
            if (savedChars) {
                try {
                    chars = JSON.parse(savedChars)
                    if (!Array.isArray(chars)) chars = []
                } catch (e) {
                    chars = []
                }
            }

            if (!chars.includes(letter)) {
                chars.push(letter)
                localStorage.setItem("secretCodeChars", JSON.stringify(chars))
                console.log(`Saved letters: ${JSON.stringify(chars)}`) // Debugging
            }

            // También intentar usar la función global si está disponible
            if (window.addSecretChar) {
                window.addSecretChar(letter)
            }

            // Disparar un evento personalizado para notificar que se encontró una letra
            const event = new CustomEvent("secretLetterFound", { detail: { letter } })
            window.dispatchEvent(event)

            // Mostrar animación y luego ocultar la letra
            setTimeout(() => {
                setShowAnimation(false)
                setIsVisible(false)
                setFound(true)
            }, 1000)
        }
    }

    if (!isVisible) {
        return null
    }

    return (
        <span
            onClick={handleClick}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className={`cursor-pointer inline-block transition-all duration-300 ${showAnimation ? "scale-150 font-bold" : isHovering ? "scale-125" : ""
                } ${className}`}
            style={{
                color: showAnimation ? themeColor : isHovering ? themeColor : "#FFD700", // Siempre amarillo para mayor visibilidad
                textShadow: "0 0 8px rgba(255, 215, 0, 0.8)", // Brillo permanente
                fontWeight: "bold",
                border: isHovering ? `2px dashed ${themeColor}` : "1px dashed #FFD700",
                padding: "0 3px",
                borderRadius: "3px",
                backgroundColor: isHovering ? "rgba(0,0,0,0.3)" : "",
                ...style,
            }}
        >
            {letter}
        </span>
    )
}
