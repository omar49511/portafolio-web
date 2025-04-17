import React from "react";
import Image from "next/image";

export default function Hero() {
  return (
    <header
      className="relative w-full h-[30vh] overflow-hidden object-cover"
      aria-label="Imagen de portada principal del sitio"
    >
      <Image
        src="/portada.webp"
        alt="Portada optimizada"
        width={750}
        height={500}
        quality={75}
        sizes="full"
        className="object-cover w-full h-full inset-0"
        priority
        loading="eager"
        placeholder="blur"
        blurDataURL="/portada.webp"
        style={{ filter: "blur(0.5px)" }} // Apply a slight blur effect
      />
    </header>
  );
}