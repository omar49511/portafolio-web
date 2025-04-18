"use client";


import React from "react";
import MusicPlayer from "@/components/music-player";
import HiddenLetter from "@/components/HiddenLetter"; // Ensure this path is correct

// Define colorThemes and activeTheme
const colorThemes = {
  light: { color: "#FFFFFF" },
  dark: { color: "#000000" },
};
const activeTheme = "light";


export default function Experience() {


  const experiences = [
    {
      rol_experience: "Software Engineer",
      fecha_inicio_experience: "Jan 2020",
      fecha_fin_experience: "Dec 2022",
      empresa_experience: "TechCorp",
      descripcion_experience: "Developed scalable web applications and APIs.",
    },
    {
      rol_experience: "Frontend Developer",
      fecha_inicio_experience: "Mar 2018",
      fecha_fin_experience: "Dec 2019",
      empresa_experience: "Webify",
      descripcion_experience: "Designed and implemented user interfaces.",
    },
  ];

  return (
    <section
      className="md:flex gap-10 mt-12"
      aria-labelledby="experience-heading"
    >
      <div className="w-full  md:w-[70%] ">
        <h2
          id="experience-heading"
          className="text-xl font-bold mb-6 p-2 rounded font-serif bg-[#5731E7] text-white"
        >
          Work Experience
        </h2>
        {experiences.map((fila, index) => (
          <article
            key={index}
            className="my-12"
            aria-label={`Experience at ${fila.empresa_experience}`}
          >
            <h3 className="text-xl font-bold mb-2">{fila.rol_experience}</h3>
            <p className="italic font-semibold mb-2">
              {fila.fecha_inicio_experience} - {fila.fecha_fin_experience}
            </p>
            <p className="text-gray-300">{fila.empresa_experience}</p>
            <p className="text-gray-300 mt-2">{fila.descripcion_experience}</p>
            {index !== experiences.length - 1 && (
              <hr className="border-[#484948] border-b-1 mt-10" />
            )}
          </article>
        ))}
      </div>

      <aside className="w-full md:w-[30%] h-98 rounded-xl flex flex-col gap-4">
        <div className="rounded-md overflow-hidden backdrop-blur-sm">
          <MusicPlayer themeColor="#5731E7" />
        </div>
        <HiddenLetter
          letter="#"
          themeColor={colorThemes[activeTheme].color}
          className="text-yellow-300 font-bold"
          style={{ display: "inline-block", maxWidth: "fit-content", }}
        />
      </aside>
    </section>
  );
}
