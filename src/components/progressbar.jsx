import React from "react";

// agregar la prop de tag
const ProgressBar = ({ title, percentage, icon, level }) => {
  const progressWidth = `${percentage}%`;
  return (
    //hacer colores dinamicos,
    // <div className="bg-[#262626] p-4 rounded-lg  hover:bg-[#2F2F2F] shadow min-w-[fit-content]">
    //   <div className="flex flex-col gap-4">
    //     <div>
    //       <h2 className="text-xl font-semibold flex items-center gap-2">
    //         {icon} {title}
    //       </h2>
    //     </div>

    //     <div className="flex">
    //       <span className="bg-[#5A5A5A] rounded px-2">intermediate</span>
    //     </div>
    //     <div className="flex justify-around items-center gap-4">
    //       {percentage}%
    //       <div className="w-full bg-[#D9D9D9] rounded-lg h-[4px] ">
    //         <div
    //           className="bg-[#5731E7] text-xs text-white font-bold text-center p-0.5 leading-none rounded-lg"
    //           style={{ width: progressWidth }}
    //         ></div>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className="bg-[#262626] p-4 rounded-md">
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
      <div className="w-full bg-[#D9D9f5] h-1.5 rounded-full overflow-hidden border border-gray-800">
        <div
          className="h-full rounded-full bg-purple-700"
          style={{
            width: progressWidth,
            // backgroundColor: colorThemes[activeTheme].color,
          }}
        ></div>
      </div>
      <div className="text-xs text-gray-400 mt-1">{percentage}%</div>
    </div>
  );
};

export default ProgressBar;
