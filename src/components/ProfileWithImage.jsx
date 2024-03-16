import React from "react";
import Image from "next/image";

export default function ProfileWithImage() {
  return (
    <>
      <div className="h-28 w-28 rounded relative z-[1] ml-3 mb-0 -mt-20">
        <Image
          priority
          width={300}
          height={300}
          className="w-full h-full object-cover "
          src="/perfil.png"
          alt="img perfil"
        />
      </div>
      <h1 className="mt-5 font-serif font-extrabold text-4xl lg:text-5xl text-wrap">
        Omar Reyes Zamudio
      </h1>
    </>
  );
}
