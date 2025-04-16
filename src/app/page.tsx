"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import NavBar from "@/components/NavBar";
import MainContent from "@/components/MainContent";

const TerminalModal = dynamic(() => import("@/components/terminal-modal"), { ssr: false });

const colorThemes = [
  { name: "blue", color: "#0F6FBE" },
  { name: "green", color: "#5CBE0F" },
  { name: "purple", color: "#BE0F8D" },
];

export default function Home() {
  const [activeTheme, setActiveTheme] = useState(0);
  const [terminalOpen, setTerminalOpen] = useState(false);

  const toggleTheme = () => {
    setActiveTheme((prev) => (prev + 1) % colorThemes.length);
  };

  return (
    <>
      <NavBar
        onTerminalOpen={() => setTerminalOpen(true)}
        onThemeToggle={toggleTheme}
        activeColor={colorThemes[activeTheme].color}
      />
      <MainContent />
      {terminalOpen && (
        <TerminalModal
          onClose={() => setTerminalOpen(false)}
          themeColor={colorThemes[activeTheme].color}
        />
      )}
    </>
  );
}
