"use client";
import { useState, useEffect } from "react";
import React from "react";
import Image from "next/image";
import MusicPlayer from "@/components/music-player";

const fetchFromNotion = async () => {
  const res = await fetch(`api/experience`);
  const data = await res.json();
  return data;
};

export default function Experience() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchFromNotion();
      setRows(data);
    };

    fetchData();
  }, []);

  if (!rows || rows.length === 0) {
    return <div>Loading...</div>; // Manejar el caso en el que rows aún no está definido o está vacío. Puedes mostrar un mensaje de carga o un componente de carga en su lugar.
  }

  return (
    <div className="lg:flex lg:gap-10 lg:justify-between mt-12">
      <div className="w-full lg:w-auto">
        {/* sacar los titulos en componentes y hacer que cambien de color dinamicamente*/}
        <h2 className="text-xl font-bold mb-6 p-2 rounded font-serif bg-[#5731E7]">
          Work Experience
        </h2>
        {rows.map((fila, index) => (
          <div key={index} className="my-12">
            <h3 className="text-xl font-bold mb-2">{fila.rol_experience}</h3>
            <p className="italic font-semibold mb-2">
              {fila.fecha_inicio_experience} - {fila.fecha_fin_experience}
            </p>
            <p className="text-gray-300">{fila.empresa_experience}</p>
            <p className="text-gray-300 mt-2">{fila.descripcion_experience}</p>
            {index !== rows.length - 1 && (
              <hr className="border-[#484948] border-b-1 mt-10" />
            )}
          </div>
        ))}
      </div>
      <div className="w-full lg:w-[50%] h-auto rounded-xl bg-black">
        {/* Widget 1: Imagen de perfil */}

        {/* Widget 3: Reproductor de música */}
        <div className="rounded-md overflow-hidden bg-gray-900/50 backdrop-blur-sm p-2">
          <MusicPlayer />
        </div>

      </div>
    </div>
  );
}
