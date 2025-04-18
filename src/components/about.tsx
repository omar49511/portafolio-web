import React from "react";
import { FaPhone, FaEnvelope, FaDownload } from "react-icons/fa6";
import Title from "./ui/Title";
import HiddenLetter from "./HiddenLetter";

// Example colorThemes and activeTheme definition
const colorThemes = {
  light: { color: "#FFD700" },
  dark: { color: "#000000" },
};

const activeTheme = "light";

export default function About() {
  // poner animaciones a cosas
  return (
    <section className="flex flex-wrap justify-center lg:justify-evenly gap-10 mt-12">
      <div className="flex-shrink-0 w-full lg:w-auto">
        {/* sacar el h2 en componente para reutilizarlo donde ya sea por prop o content reciba el texto y asi poder cambiar los colores para todos*/}
        <Title
          title="Contact Me"
        />
        <div className="flex flex-col   mt-4">
          {/* Todo: encapsular esto en un un componente ContactInfo({ icon, info }) para evitar repetir el css */}
          <p className="flex items-center gap-2 hover:text">
            <FaPhone className="text-[#5731E7]" size={20} />
            44 123 456 789
          </p>
          <p className="flex items-center gap-2">
            <FaEnvelope className="text-[#5731E7]" size={20} />

            correo@exa<HiddenLetter
              letter="3"
              themeColor={colorThemes[activeTheme].color}
              className="text-yellow-300 font-bold"
            />mple.com
          </p>
        </div>
      </div>
      <div className="bg-[#252525] py-4 px-3 border-l-4 border-[#5731E7] flex-grow w-auto lg:w-[25%]  p-[max(3vh, 1rem)]">
        <p>Soy un apasionado del desarrollo de software y la programación, siempre en busca de nuevos desafíos y oportunidades para aprender y crecer en este emocionante campo.</p>
      </div>
    </section>
  );
}
