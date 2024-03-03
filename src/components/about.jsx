import React from "react";
import { FaPhone, FaEnvelope, FaDownload } from "react-icons/fa6";

export default function About({ rows }) {
  const handleDownload = () => {
    // URL del archivo CV
    const cvUrl = rows[0].curriculum;

    // Crea un elemento 'a' temporal para descargar el archivo
    const downloadLink = document.createElement("a");
    downloadLink.href = cvUrl;
    downloadLink.download = "mi_cv.pdf"; // Nombre del archivo descargado
    downloadLink.target = "_blank"; // Abre el enlace en una nueva pestaña

    // Añade el enlace al DOM y simula un clic
    document.body.appendChild(downloadLink);
    downloadLink.click();

    // Elimina el enlace del DOM después de la descarga
    document.body.removeChild(downloadLink);
  };

  // poner animaciones a cosas
  return (
    <section className="flex flex-wrap justify-center lg:justify-evenly gap-10 mt-12">
      <div className="flex-shrink-0 w-full lg:w-auto">
        {/* sacar el h2 en componente para reutilizarlo donde ya sea por prop o content reciba el texto y asi poder cambiar los colores para todos*/}
        <h2 className="font-serif bg-[#5731E7] font-bold text-3xl">
          Contact Me
        </h2>
        <div className="flex flex-col   mt-4">
          {/* Todo: encapsular esto en un un componente ContactInfo({ icon, info }) para evitar repetir el css */}
          <p className="flex items-center gap-2 hover:text">
            <FaPhone className="text-[#5731E7]" size={20} />
            +54 {rows[0].number_contact}
          </p>
          <p className="flex items-center gap-2">
            <FaEnvelope className="text-[#5731E7]" size={20} />
            {rows[0].email_contact}
          </p>
        </div>
      </div>
      <div className="bg-[#252525] py-4 px-3 border-l-4 border-[#5731E7] flex-grow w-auto lg:w-[25%]  ">
        <p className="">{rows[0].text_description}</p>
      </div>
      <div className="flex-shrink-0 w-full lg:w-auto">
        <button
          onClick={handleDownload}
          className="bg-[#5731E7] font-bold px-3 py-2 flex rounded items-center justify-center lg:justify-start hover:bg-[#5D40CE]"
        >
          <FaDownload className="mr-2" />
          Download CV
        </button>
      </div>
    </section>
  );
}
