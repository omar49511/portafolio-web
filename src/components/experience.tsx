"use client";


import React from "react";
import MusicPlayer from "@/components/music-player";


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
      className="lg:flex lg:gap-10 lg:justify-between mt-12"
      aria-labelledby="experience-heading"
    >
      <div className="w-full lg:w-auto">
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

      <aside className="w-full lg:w-[50%] h-98 rounded-xl flex flex-col gap-4">
        <div className="rounded-md overflow-hidden backdrop-blur-sm">
          <MusicPlayer themeColor="#5731E7" />
        </div>
      </aside>
    </section>
  );
}
