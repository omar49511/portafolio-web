import React from "react";
import { FaLinkedinIn, FaCodepen } from "react-icons/fa";
import { FaXTwitter, FaDribbble, FaBehance } from "react-icons/fa6";
import FaUIverse from "./ui/FaUIverse";

// SocialLink optimizado con accesibilidad y estructura semántica correcta
interface SocialLinkProps {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

const SocialLink = React.memo(function SocialLink({ href, icon: Icon, label }: SocialLinkProps) {
  return (
    <li role="listitem">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 bg-[#262626] p-4 rounded-md hover:bg-[#2F2F2F] transition-colors focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-white"
      >
        {Icon && <Icon className="w-5 h-5" aria-hidden="true" />}
        <span className="text-sm text-white">{label}</span>
      </a>
    </li>
  );
});

export default function CardRedes() {
  const socialLinks = [
    { href: "https://www.linkedin.com/in/username", icon: FaLinkedinIn, label: "LinkedIn" },
    { href: "https://codepen.io/omar49511", icon: FaCodepen, label: "Codepen" },
    { href: "https://twitter.com/username", icon: FaXTwitter, label: "Twitter" },
    { href: "https://uiverse.io/profile/omar49511", icon: FaUIverse, label: "UIverse" },
  ];

  return (
    <section aria-label="Enlaces a redes sociales" className="mb-12">
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4" role="list">
        {socialLinks.map((link, index) => (
          <SocialLink
            key={index}
            href={link.href}
            icon={link.icon}
            label={link.label}
          />
        ))}
      </ul>
    </section>
  );
}
