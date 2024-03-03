"use client";
import { useState, useEffect } from "react";
import CardProject from "./cardproject";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";

import { FreeMode, Pagination, Navigation } from "swiper/modules";
// let cardDataList = [
//   {
//     id: 1,
//     image:
//       "https://i.pinimg.com/564x/5c/7e/39/5c7e393665b3643bc3e68975fb2ef335.jpg",
//     Cardtag: "Next Js",
//     title: "Cheat Sheet",
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//   },
//   {
//     id: 2,
//     image:
//       "https://i.pinimg.com/564x/79/61/e0/7961e093496d0b3940bed1ffa2e13523.jpg",
//     Cardtag: "Next Js",
//     title: "Cheat Sheet",
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//   },
//   {
//     id: 3,
//     image:
//       "https://i.pinimg.com/564x/cc/eb/dc/ccebdcfbf20712a20c22e04f23d9ff72.jpg",
//     Cardtag: "Next Js",
//     title: "Cheat Sheet",
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//   },
//   {
//     id: 4,
//     image:
//       "https://i.pinimg.com/564x/9d/cc/29/9dcc29cdcb1deb851939d9330657245b.jpg",
//     Cardtag: "Next Js",
//     title: "Cheat Sheet",
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//   },
//   {
//     id: 5,
//     image:
//       "https://i.pinimg.com/564x/03/95/f0/0395f09e89eabcbb89bc0b3e33a52ccd.jpg",
//     Cardtag: "Next Js",
//     title: "Cheat Sheet",
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//   },
//   {
//     id: 6,
//     image:
//       "https://i.pinimg.com/564x/fa/85/a7/fa85a7b7fdc7e912ffaaad8aecb9d9c4.jpg",
//     Cardtag: "Next Js",
//     title: "Cheat Sheet",
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//   },
// ];

export default function Carrousel() {
  const [cardDataList, setCardDataList] = useState([]);

  useEffect(() => {
    const fetchFromNotion = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/projects");
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
