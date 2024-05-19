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
      <h2 className="font-serif bg-[#5731E7] font-bold text-3xl">Skills</h2>
      {/* todo: mapear un json para llenar los datos*/}
      {/* que funcione como un filtro para que te lleve a una pagina donde te muestre unicamente los proyectos con esa tecnologia */}
      <div className="mt-12 grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        <ProgressBar title="React Js" percentage="90" icon={<SiReact />} />
        <ProgressBar title="Next Js" percentage="10" icon={<SiNextdotjs />} />
        <ProgressBar title="CSS" percentage="70" icon={<SiCss3 />} />
        <ProgressBar title="PHP" percentage="90" icon={<SiPhp />} />
        <ProgressBar title="C#" percentage="80" icon={<SiCsharp />} />
        <ProgressBar
          title="JavaScript"
          percentage="70"
          icon={<SiJavascript />}
        />
      </div>
    </div>
  );
}
