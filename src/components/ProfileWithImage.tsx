import React from "react";
import Image from "next/image";
import HiddenLetter from "./HiddenLetter";

// Example colorThemes and activeTheme definition
const colorThemes = {
  light: { color: "#FFD700" },
  dark: { color: "#000000" },
};

const activeTheme = "light";

export default function ProfileWithImage() {
  return (
    <>
      <div className="h-28 w-28 rounded relative z-[1] ml-3 mb-0 -mt-20">
        <Image
          priority
          width={300}
          height={300}
          className="w-full h-full object-cover "
          src="/omar.png"
          alt="Foto de perfil de Omar Reyes Zamudio"
        />
      </div>
      <h1 className="mt-5 font-serif font-extrabold text-4xl lg:text-5xl text-wrap">
        Omar <HiddenLetter
          letter="d"
          themeColor={colorThemes[activeTheme].color}
          className="text-yellow-300 font-bold"
        />{" "}Reyes Zamudio
      </h1>
    </>
  );
}
