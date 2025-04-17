"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { createPortal } from "react-dom"

type TooltipProps = {
    text: string
    children: React.ReactNode
    position?: "top" | "bottom" | "left" | "right"
}

export default function Tooltip({ text, children, position = "bottom" }: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false)
    const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 })
    const triggerRef = useRef<HTMLDivElement>(null)
    const tooltipRef = useRef<HTMLDivElement>(null)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        return () => setMounted(false)
    }, [])

    const calculatePosition = () => {
        if (!triggerRef.current || !tooltipRef.current) return

        const triggerRect = triggerRef.current.getBoundingClientRect()
        const tooltipRect = tooltipRef.current.getBoundingClientRect()

        let top = 0
        let left = 0

        switch (position) {
            case "top":
                top = triggerRect.top - tooltipRect.height - 8
                left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2
                break
            case "bottom":
                top = triggerRect.bottom + 8
                left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2
                break
            case "left":
                top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2
                left = triggerRect.left - tooltipRect.width - 8
                break
            case "right":
                top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2
                left = triggerRect.right + 8
                break
        }

        // Adjust if tooltip goes out of viewport
        if (left < 10) left = 10
        if (left + tooltipRect.width > window.innerWidth - 10) {
            left = window.innerWidth - tooltipRect.width - 10
        }

        setTooltipPosition({ top, left })
    }

    const handleMouseEnter = () => {
        setIsVisible(true)
        setTimeout(calculatePosition, 0)
    }

    const handleMouseLeave = () => {
        setIsVisible(false)
    }

    return (
        <div ref={triggerRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="inline-block">
            {children}
            {mounted &&
                isVisible &&
                createPortal(
                    <div
                        ref={tooltipRef}
                        className="fixed z-[9999] bg-gray-900 text-white text-xs py-1 px-2 rounded shadow-lg pointer-events-none transition-opacity duration-200"
                        style={{
                            top: `${tooltipPosition.top}px`,
                            left: `${tooltipPosition.left}px`,
                            opacity: isVisible ? 1 : 0,
                        }}
                    >
                        {text}
                        <div
                            className={`absolute w-2 h-2 bg-gray-900 transform rotate-45 ${position === "top"
                                    ? "bottom-[-4px] left-1/2 -translate-x-1/2"
                                    : position === "bottom"
                                        ? "top-[-4px] left-1/2 -translate-x-1/2"
                                        : position === "left"
                                            ? "right-[-4px] top-1/2 -translate-y-1/2"
                                            : "left-[-4px] top-1/2 -translate-y-1/2"
                                }`}
                        />
                    </div>,
                    document.body,
                )}
        </div>
    )
}
