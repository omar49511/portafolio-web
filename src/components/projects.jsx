import React from "react";
import Carrousel from "./carrousel";

export default function Projects() {
  return (
    <div className="w-full lg:w-auto mt-12">
      <h2 className="font-serif bg-[#5731E7] font-bold text-3xl">Projects</h2>
      <div className="my-12">
        <Carrousel />
      </div>
    </div>
  );
}
