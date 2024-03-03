"use client";
import { useState, useEffect } from "react";
import Hero from "@/components/hero";
import About from "@/components/about";
import Experience from "@/components/experience";
import Skills from "@/components/skills";
import Projects from "@/components/projects";
import ProfileWithImage from "@/components/ProfileWithImage";

const fetchFromNotion = async () => {
  const res = await fetch(`api`);
  const data = await res.json();
  return data;
};

export default function Home() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchFromNotion();
      setRows(data);
    };

    fetchData();
  }, []);

  if (!rows || rows.length === 0) {
    // Manejar el caso en el que rows aún no está definido
    return (
      <div className="absolute inset-0 flex items-center justify-center ">
        <div className="flex flex-row gap-2">
          <div className="w-4 h-4 rounded-full bg-purple-700 animate-bounce [animation-delay:.7s]"></div>
          <div className="w-4 h-4 rounded-full bg-purple-700 animate-bounce [animation-delay:.3s]"></div>
          <div className="w-4 h-4 rounded-full bg-purple-700 animate-bounce [animation-delay:.7s]"></div>
        </div>
      </div>
    );
  }
  return (
    <>
      <Hero />
      <div className="my-0 mx-[20px] md:mx-auto md:max-w-[60%] p-5">
        <ProfileWithImage />
        <About rows={rows} /> {/* Pasar los datos como props */}
        <Experience />
        <Skills />
        <Projects />
      </div>
    </>
  );
}
