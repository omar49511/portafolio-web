import React from "react";
import Image from "next/image";

export default function ProfileWithImage() {
  return (
    <>
      <div className="h-28 w-28 bg-rose-500 rounded relative z-[1] ml-3 mb-0 -mt-20">
        <Image
          priority
          width={300}
          height={300}
          className="w-full h-full object-cover "
          src="https://avatars.githubusercontent.com/u/72781778?s=400&u=213bb5672e4c9941b48b77cb71c0016312fdf66c&v=4"
          alt="img perfil"
        />
      </div>
      <h1 className="mt-5 font-serif font-extrabold text-4xl lg:text-5xl text-wrap">
        Omar Reyes Zamudio
      </h1>
    </>
  );
}
