"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    image: "/auth2.png", // Đổi thành đường dẫn ảnh của bạn
    title: "Sign Up",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ipsa eligendi expedita aliquam quaerat nulla voluptas facilis.",
  },
  {
    image: "/auth2.png",
    title: "Manage Tasks",
    description:
      "Porro rem voluptates possimus, ad, autem quae culpa architecto, quam labore blanditiis at ratione.",
  },
  {
    image: "/auth3.png",
    title: "Complete Projects",
    description:
      "Architecto, quam labore blanditiis at ratione. Porro rem voluptates possimus, ad, autem quae culpa.",
  },
];

export default function Carousel() {
  return (
    <div className="w-full px-5 h-full flex items-center justify-center">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        loop
        className="relative w-full"
        autoplay={{ delay: 2000 }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide
            key={index}
            className="!flex !flex-col !items-center !justify-center gap-2 w-full py-5 !h-[400px] overflow-hidden"
          >
            <Image
              src={slide.image}
              alt={slide.title}
              className="w-[200px] h-[200px] object-contain text-center"
              width={200}
              height={200}
            />
            <h2 className="text-xl font-semibold mt-4 text-white text-center">
              {slide.title}
            </h2>
            <p className="text-center text-gray-400 mt-2">
              {slide.description}
            </p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
