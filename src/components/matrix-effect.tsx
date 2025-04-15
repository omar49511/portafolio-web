"use client";

import { useEffect, useRef } from "react";

export default function MatrixEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Configurar el canvas para que ocupe todo el contenedor
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Caracteres para el efecto Matrix (letras, números y símbolos japoneses)
    const chars =
      "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789";
    const charArray = chars.split("");

    // Columnas (basadas en el ancho del canvas)
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);

    // Array para rastrear la posición Y de cada columna
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -canvas.height);
    }

    // Función para dibujar el efecto Matrix
    const draw = () => {
      // Fondo negro semi-transparente para crear el efecto de desvanecimiento
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Color verde para los caracteres
      ctx.fillStyle = "#F5F";
      ctx.font = `${fontSize}px monospace`;

      // Dibujar los caracteres
      for (let i = 0; i < drops.length; i++) {
        // Seleccionar un caracter aleatorio
        const char = charArray[Math.floor(Math.random() * charArray.length)];

        // Dibujar el caracter
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        // Reiniciar la posición si llega al final o aleatoriamente
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Mover la gota hacia abajo
        drops[i]++;
      }
    };

    // Iniciar la animación
    const interval = setInterval(draw, 33); // ~30 FPS

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-10 pointer-events-none"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
