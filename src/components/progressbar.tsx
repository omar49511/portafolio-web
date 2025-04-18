import React from "react";

// agregar la prop de tag
interface ProgressBarProps {
  title: string;
  icon: React.ReactNode;
  level: string;
  letter?: React.ReactNode; // Optional prop for the letter
}

const ProgressBar: React.FC<ProgressBarProps> = ({ title, icon, level, letter }) => {
  return (
    <div className="bg-[#262626] p-4 rounded-md border border-[#5c5c5c] shadow min-w-[fit-content]">
      <div className="flex items-center gap-2 mb-2">
        <span
          className="w-6 h-6 flex items-center justify-center"
        // style={{ backgroundColor: colorThemes[activeTheme].color }}
        >
          {icon}
        </span>
        <span>{title}</span>
      </div>
      <div className="text-xs text-gray-400 mb-2">{level}</div>
      {letter}
    </div>
  );
};

export default ProgressBar;
