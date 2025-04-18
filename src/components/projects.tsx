import React from "react";
// import Carrousel from "./carrousel";
import ProjectGallery from "./project-gallery";
import { projects } from "@/data/proyects";
import HiddenLetter from "@/components/HiddenLetter"; // Adjust the path as necessary

// Example colorThemes object and activeTheme definition
const colorThemes = {
  light: { color: "#FFFFFF" },
  dark: { color: "#000000" },
};
const activeTheme = "light"; // Replace with your logic to determine the active theme

export default function Projects() {
  return (
    <section className="w-full lg:w-auto mt-12">
      <h2 className="text-xl font-bold mb-6 p-2 rounded font-serif bg-[#5731E7]">
        <HiddenLetter
          letter="g"
          themeColor={colorThemes[activeTheme].color}
          className="text-yellow-300 font-bold"
        />Projects
      </h2>
      <div className="my-12">
        <ProjectGallery projects={projects} />
      </div>
    </section>
  );
}
