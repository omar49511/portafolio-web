"use client";
import { useState, useEffect } from "react";
import React from "react";
import Image from "next/image";

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

  return (
    <div className="lg:flex lg:gap-10 lg:justify-between mt-12">
      <div className="w-full lg:w-auto">
        {/* sacar los titulos en componentes y hacer que cambien de color dinamicamente*/}
        <h2 className="font-serif bg-[#5731E7] font-bold text-3xl">
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
              <hr className="border-violet-600 border-b-2 mt-10" />
            )}
          </div>
        ))}
      </div>
      <div className="w-full lg:w-[50%] h-auto rounded-xl bg-black">
        <Image
          priority
          width={300}
          height={300}
          className="w-full h-full object-cover rounded-xl"
          src="/ezgif-5-177ad6c427.webp"
          alt="img aside"
        />
      </div>
    </div>
  );
}
