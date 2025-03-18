"use client";
import { useState, useEffect, useRef } from "react";
import Hero from "@/components/hero";
import About from "@/components/about";
import Experience from "@/components/experience";
import Skills from "@/components/skills";
import Projects from "@/components/projects";
import ProfileWithImage from "@/components/ProfileWithImage";
import { FaHome } from "react-icons/fa";
import { FaCode } from "react-icons/fa";
import { FaFileAlt } from "react-icons/fa";
import { FaWrench } from "react-icons/fa";
import { FaTerminal } from "react-icons/fa";
import { FaSun } from "react-icons/fa";
import TerminalModal from "@/components/terminal-modal";
import CardRedes from "@/components/cardredes";

const fetchFromNotion = async () => {
  const res = await fetch(`api`);
  const data = await res.json();
  return data;
};
// Definición de los temas de colores
const colorThemes = [
  { name: "blue", color: "#0F6FBE" },
  { name: "green", color: "#5CBE0F" },
  { name: "purple", color: "#BE0F8D" },
];

export default function Home() {
  const [activeTheme, setActiveTheme] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef(null);
  const timelineRef = useRef(null);
  const [terminalOpen, setTerminalOpen] = useState(false);

  // Cambiar el tema de color
  const toggleTheme = () => {
    setActiveTheme((prev) => (prev + 1) % colorThemes.length);
  };

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
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-6 py-3 flex justify-center">
          <div className="flex items-center gap-4 p-2 bg-[#191919] rounded-full">
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#252525] hover:bg-[#2F2F2F] transition-colors">
              <FaHome className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#252525] hover:bg-[#2F2F2F] transition-colors">
              <FaCode className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#252525] hover:bg-[#2F2F2F] transition-colors">
              <FaFileAlt className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#252525] hover:bg-[#2F2F2F] transition-colors">
              <FaWrench className="w-5 h-5" />
            </button>
            <button
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#252525] hover:bg-[#2F2F2F] transition-colors"
              onClick={() => setTerminalOpen(true)}
            >
              <FaTerminal className="w-5 h-5" />
            </button>
            <button
              onClick={toggleTheme}
              className="w-10 h-10 flex items-center justify-center rounded-full transition-colors"
              style={{ backgroundColor: colorThemes[activeTheme].color }}
            >
              <FaSun className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </nav>
      <Hero />
      <div className="my-0 mx-auto  md:max-w-[80%] lg:max-w-[70%] max-w-[90%] p-5">
        <ProfileWithImage />
        <About rows={rows} /> {/* Pasar los datos como props */}
        <Experience />
        <Skills />
        <Projects />
        <CardRedes />
      </div>

      {terminalOpen && (
        <TerminalModal
          onClose={() => setTerminalOpen(false)}
          themeColor={colorThemes[activeTheme].color}
        />
      )}
    </>
  );
}
