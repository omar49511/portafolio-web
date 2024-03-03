"use client";
import { useState, useEffect } from "react";
import CardProject from "./cardproject";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";

import { FreeMode, Pagination, Navigation } from "swiper/modules";

export default function Carrousel() {
  const [cardDataList, setCardDataList] = useState([]);
  useEffect(() => {
    const fetchFromNotion = async () => {
      try {
        const res = await fetch(`api/projects`);
        if (res.ok) {
          const data = await res.json();
          setCardDataList(data);
        } else {
          throw new Error("Failed to fetch data from Notion.");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchFromNotion();
  }, []);

  if (!cardDataList.length) {
    return <div>Loading...</div>;
  }

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
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1440: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
        }}
      >
        {cardDataList.map((data, index) => (
          <SwiperSlide key={index}>
            <CardProject
              image={data.imagen_projects}
              Cardtag={data.etiqueta_projects}
              Colortag={data.etiqueta_projects_color}
              title={data.titulo_projects}
              description={data.descripcion_projects}
              url={data.url_projects}
            />
          </SwiperSlide>
        ))}

        <div className="swiper-button-next !text-[#5f3ceb]"></div>
        <div className="swiper-button-prev  !text-[#5f3ceb]"></div>
      </Swiper>
    </div>
  );
}
