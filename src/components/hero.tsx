import React from "react";
import Image from "next/image";

export default function Hero() {
  return (
    <header
      className="relative w-full aspect-[3/1]"
      aria-label="Imagen de portada principal del sitio"
    >
      <Image
        src="/portada.png" // ✅ usa la ruta de la imagen
        alt="Portada del sitio mostrando el estilo visual principal"
        fill // ✅ usa "fill" en lugar de width/height para imágenes que llenan el contenedor
        priority// ✅ carga la imagen cuando está a 200px del viewport
        quality={75} // ✅ reduce ligeramente la calidad para mejorar tiempos sin perder apariencia
        className="w-full h-full object-cover object-center"
        sizes="100%" // ✅ le dice al navegador que use el 100% del viewport
      />
    </header>
  );
}