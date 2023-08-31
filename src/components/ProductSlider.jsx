import React, {  useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs,Autoplay } from "swiper/modules";

export default function ProductSlider({ data }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <>
      <Swiper
        key={Math.random()}
        style={{
          "--swiper-navigation-color": "#e74821",
          "--swiper-pagination-color": "#e74821",
        }}
        spaceBetween={10}
        // navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        loop={true}
        autoplay={{
          delay: 1500,
          disableOnInteraction: true,
        }}
        modules={[FreeMode, Thumbs,Autoplay]}
        className="mySwiper2"
      >
        {data &&
          data.map((item, idx) => {
            return (
              <SwiperSlide key={item.public_id}>
                <img 
                  loading="lazy"
                  className="card-img-top mb-5 mb-md-0"
                  src={item.url}
                  key={idx}
                  style={{objectFit:"contain",minHeight:"400px"}}
                />
              </SwiperSlide>
            );
          })}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {data &&
          data.map((item, idx) => {
            return (
              <SwiperSlide key={Math.random()}>
                <img
                  loading="lazy"
                  className="card-img-top mb-5 mb-md-0"
                  src={item.url}
                  alt=""
                  key={idx}
                  height={100}
                  style={{objectFit:"contain"}}
                />
              </SwiperSlide>
            );
          })}
      </Swiper>
    </>
  );
}
