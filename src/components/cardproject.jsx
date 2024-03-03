import React from "react";
import Image from "next/image";

export default function CardProject({
  image,
  Cardtag,
  title,
  description,
  url,
}) {
  return (
    <a
      href={url}
      className="relative group duration-500 cursor-pointer group overflow-hidden relative  h-72 w-56 rounded hover:duration-700 duration-700 "
    >
      <div className="w-full h-72  text-white">
        <Image
          className="w-full h-full object-cover"
          width={300}
          height={300}
          src={image}
          alt={title}
        />
      </div>
      <div className="absolute bg-[#262626ff] -bottom-[100%] w-full p-3 flex flex-col gap-1 group-hover:-bottom-0 group-hover:duration-600 duration-500">
        <div>
          <span className="bg-[#5f3ceb] px-2 py-1 rounded font-bold text-xs">
            {Cardtag}
          </span>
        </div>
        <span className=" font-bold text-3xl">{title}</span>
        <p className="">{description}</p>
      </div>
    </a>
  );
}
