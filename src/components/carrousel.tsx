"use client";
import { useState, useEffect } from "react";
import CardProject from "./cardproject";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { projects } from "@/data/proyects";
import ProjectDocumentationModal from "./projectDocumentationModal";

import { FreeMode, Pagination, Navigation } from "swiper/modules";

export default function Carrousel() {
  // const [cardDataList, setCardDataList] = useState([]);
  // useEffect(() => {
  //   const fetchFromNotion = async () => {
  //     try {
  //       const res = await fetch(`api/projects`);
  //       if (res.ok) {
  //         const data = await res.json();
  //         setCardDataList(data);
  //       } else {
  //         throw new Error("Failed to fetch data from Notion.");
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchFromNotion();
  // }, []);

  // if (!cardDataList.length) {
  //   return <div>Loading...</div>;
  // }

  const [activeProject, setActiveProject] = useState<number | null>(null);
  return (
    <div className="max-w-[90%] mx-auto">
      <Swiper
        className="mySwiper"
        loop={true}
        freeMode={true}
        grabCursor={true}
        pagination={{
          clickable: true,
        }}
        navigation={{
          nextEl: ".swiper-button-next", // Customize next button element selector
          prevEl: ".swiper-button-prev", // Customize previous button element selector
        }}
        modules={[FreeMode, Pagination, Navigation]}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 1,
            spaceBetween: 40,
          },
          1440: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
        }}
      >
        {projects.map((data, index) => (
          <SwiperSlide key={index}>
            <CardProject
              id={data.id}
              title={data.title}
              description={data.description}
              liveUrl={data.liveUrl}
              githubUrl={data.githubUrl}
              technologies={data.technologies}
              process={data.process}
              challenges={data.challenges}
              learnings={data.learnings}
              featured={data.featured}
              imageHeight={data.imageHeight}
              setActiveProject={setActiveProject}
            />
          </SwiperSlide>
        ))}

        <div className="swiper-button-next !text-[#5f3ceb]"></div>
        <div className="swiper-button-prev  !text-[#5f3ceb]"></div>
      </Swiper>

      {activeProject !== null && (
        <ProjectDocumentationModal
          project={projects.find((p) => p.id === activeProject)!}
          onClose={() => setActiveProject(null)}
          // themeColor={colorThemes[activeTheme].color}
        />
      )}
    </div>
  );
}
