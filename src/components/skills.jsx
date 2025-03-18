import React from "react";
import ProgressBar from "@/components/progressbar";
import {
  SiCsharp,
  SiJavascript,
  SiNextdotjs,
  SiPhp,
  SiReact,
  SiCss3,
} from "react-icons/si";

export default function Skills() {
  return (
    <div className="w-full lg:w-auto mt-12">
      {/* sacar los titulos en componentes y hacer que cambien de color dinamicamente*/}
      <h2 className="text-xl font-bold mb-6 p-2 rounded font-serif bg-[#5731E7]">
        Skills
      </h2>
      {/* todo: mapear un json para llenar los datos*/}
      {/* que funcione como un filtro para que te lleve a una pagina donde te muestre unicamente los proyectos con esa tecnologia */}
      <div className="mt-12 grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        <ProgressBar
          title="React Js"
          percentage="90"
          icon={<SiReact />}
          level="height"
        />
        <ProgressBar
          title="Next Js"
          percentage="10"
          icon={<SiNextdotjs />}
          level="height"
        />
        <ProgressBar
          title="CSS"
          percentage="70"
          icon={<SiCss3 />}
          level="height"
        />
        <ProgressBar
          title="PHP"
          percentage="90"
          icon={<SiPhp />}
          level="medium"
        />
        <ProgressBar
          title="C#"
          percentage="80"
          icon={<SiCsharp />}
          level="medium"
        />
        <ProgressBar
          title="JavaScript"
          percentage="70"
          icon={<SiJavascript />}
          level="height"
        />
      </div>
    </div>
  );
}
