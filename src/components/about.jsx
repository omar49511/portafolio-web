import Link from "next/link";
import React from "react";
import { FaPhone, FaEnvelope, FaDownload } from "react-icons/fa6";

export default function About({ rows }) {
  // poner animaciones a cosas
  return (
    <section className="flex flex-wrap justify-center lg:justify-evenly gap-10 mt-12">
      <div className="flex-shrink-0 w-full lg:w-auto">
        {/* sacar el h2 en componente para reutilizarlo donde ya sea por prop o content reciba el texto y asi poder cambiar los colores para todos*/}
        <h2 className="text-xl font-bold mb-6 p-2 rounded font-serif bg-[#5731E7] ">
          Contact Me
        </h2>
        <div className="flex flex-col   mt-4">
          {/* Todo: encapsular esto en un un componente ContactInfo({ icon, info }) para evitar repetir el css */}
          <p className="flex items-center gap-2 hover:text">
            <FaPhone className="text-[#5731E7]" size={20} />
            {rows[0].number_contact}
          </p>
          <p className="flex items-center gap-2">
            <FaEnvelope className="text-[#5731E7]" size={20} />
            {rows[0].email_contact}
          </p>
        </div>
      </div>
      <div className="bg-[#252525] py-4 px-3 border-l-4 border-[#5731E7] flex-grow w-auto lg:w-[25%]  p-[max(3vh, 1rem)]">
        <p className="">{rows[0].text_description}</p>
      </div>
    </section>
  );
}
