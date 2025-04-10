import React from "react";
// import Carrousel from "./carrousel";
import ProjectGallery from "./project-gallery";
import { projects } from "@/data/proyects";

export default function Projects() {
  return (
    <div className="w-full lg:w-auto mt-12">
      <h2 className="text-xl font-bold mb-6 p-2 rounded font-serif bg-[#5731E7]">
        Projects
      </h2>
      <div className="my-12">
        {/* <Carrousel /> */}
        <ProjectGallery projects={projects} />
      </div>
    </div>
  );
}
