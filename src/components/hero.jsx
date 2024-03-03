import React from "react";
import Image from "next/image";

export default function Hero() {
  return (
    <>
      <div className="w-full h-[30vh] bg-pink-300">
        <Image
          priority
          className="w-full h-full object-cover "
          width="300"
          height="300"
          src="/ezgif-5-a7b2e8e0da.webp"
          alt="img portada"
        />
      </div>

      {/* todo: separar esto en un componente */}
      {/* <div className="my-0 mx-[20px] md:mx-[96px]  p-5">
        <div className="h-28 w-28 bg-rose-500 rounded relative z-[1] ml-3 mb-0 -mt-20">
          <Image
            priority
            width={300}
            height={300}
            className="w-full h-full object-cover "
            src="/perfil.jpg"
            alt="img perfil"
          />
        </div>
        <h1 className="mt-5 font-serif font-extrabold text-4xl lg:text-5xl text-wrap">
          Omar reyes zamudio
        </h1>
      </div> */}
    </>
  );
}
