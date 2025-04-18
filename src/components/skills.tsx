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
import HiddenLetter from "@/components/HiddenLetter"; // Adjust the path as needed

const colorThemes = {
  light: { color: "#FFFFFF" },
  dark: { color: "#000000" },
};

const activeTheme = "light";

const skillsData = [
  { title: "React Js", icon: <SiReact />, level: "height" },
  { title: "Next Js", icon: <SiNextdotjs />, level: "height" },
  { title: "CSS", icon: <SiCss3 />, level: "height" },
  { title: "PHP", icon: <SiPhp />, level: "medium" },
  { title: "C#", icon: <SiCsharp />, level: "medium" },
  {
    title: "JavaScript", icon: <SiJavascript />, level: "height", letter: <HiddenLetter
      letter="h"
      themeColor={colorThemes[activeTheme].color}
      className="text-yellow-300 font-bold"
      style={{ display: "inline-block", maxWidth: "fit-content", }}
    />
  },
];

export default function Skills() {
  return (
    <section className="w-full lg:w-auto mt-12">
      {/* sacar los titulos en componentes y hacer que cambien de color dinamicamente*/}
      <h2 className="text-xl font-bold mb-6 p-2 rounded font-serif bg-[#5731E7]">
        Skills
      </h2>
      {/* todo: mapear un json para llenar los datos*/}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {skillsData.map((skill, index) => (
          <ProgressBar
            key={index}
            title={skill.title}
            icon={skill.icon}
            level={skill.level}
            letter={skill.letter}
          />
        ))}
      </div>
    </section>
  );
}
