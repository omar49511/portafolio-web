"use client";
import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import NavBar from "@/components/NavBar";
import MainContent from "@/components/MainContent";

// Carga diferida con estado de carga
const TerminalModal = dynamic(
  () => import("@/components/terminal-modal").then(mod => {
    // Prefetch para cargar en segundo plano
    if (typeof window !== 'undefined') {
      import("@/components/terminal-modal");
    }
    return mod;
  }),
  {
    ssr: false,
    loading: () => <div className="loading-indicator" />
  }
);

// Memoizar temas para evitar recreación en cada render
const useColorThemes = () => useMemo(() => [
  { name: "blue", color: "#0F6FBE" },
  { name: "green", color: "#5CBE0F" },
  { name: "purple", color: "#BE0F8D" },
], []);

export default function Home() {
  const colorThemes = useColorThemes();
  const [activeTheme, setActiveTheme] = useState(0);
  const [terminalOpen, setTerminalOpen] = useState(false);

  // Memoizar la función de toggle
  const toggleTheme = useMemo(() => () => {
    setActiveTheme(prev => (prev + 1) % colorThemes.length);
  }, [colorThemes.length]);

  return (
    <LightweightLayout>
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
    </LightweightLayout>
  );
}

// Componente layout ligero
import { ReactNode } from "react";

const LightweightLayout = ({ children }: { children: ReactNode }) => <>{children}</>;