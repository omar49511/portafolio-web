import React from "react";

export default function Titles({ title }: { title: string }) {
  return (
    <h2 className="text-xl font-bold mb-6 p-2 rounded font-serif bg-[#5731E7]">
      {title}
    </h2>
  );
}
