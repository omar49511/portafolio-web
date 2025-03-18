import React from "react";
import { FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaDribbble } from "react-icons/fa6";

export default function CardRedes() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
      <a
        href="#"
        className="flex items-center gap-3 bg-[#262626] p-4 rounded-md hover:bg-[#2F2F2F] transition-colors"
      >
        <FaLinkedinIn className="w-5 h-5" />
        <span>www.linkedinprofile.com</span>
      </a>
      <a
        href="#"
        className="flex items-center gap-3 bg-[#262626] p-4 rounded-md hover:bg-[#2F2F2F] transition-colors"
      >
        <span className="font-bold">Bē</span>
        <span>www.behanceprofile.com</span>
      </a>
      <a
        href="#"
        className="flex items-center gap-3 bg-[#262626] p-4 rounded-md hover:bg-[#2F2F2F] transition-colors"
      >
        <FaXTwitter className="w-5 h-5" />
        <span>www.twitterprofile.com</span>
      </a>
      <a
        href="#"
        className="flex items-center gap-3 bg-[#262626] p-4 rounded-md hover:bg-[#2F2F2F] transition-colors"
      >
        <FaDribbble className="w-5 h-5" />
        <span>www.dribbleprofile.com</span>
      </a>
    </section>
  );
}
