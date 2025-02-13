import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "../../../node_modules/swiper/swiper-bundle.min.css";
import "../../../node_modules/swiper/swiper-bundle.min.css";
import img1 from "../../assets/images/Home/Mainslider/img1.jpg";
import img2 from "../../assets/images/Home/Mainslider/img2.jpg";
import img3 from "../../assets/images/Home/Mainslider/img3.jpg";
import img4 from "../../assets/images/Home/Mainslider/img4.jpg";
import img5 from "../../assets/images/Home/Mainslider/img5.jpg";
import img6 from "../../assets/images/Home/Mainslider/img6.png";

import img1Mobile from "../../assets/images/Home/responsiveMainSlider/resImg1.jpg";
import img2Mobile from "../../assets/images/Home/responsiveMainSlider/resImg2.jpg";
import img3Mobile from "../../assets/images/Home/responsiveMainSlider/resImg3.jpg";
import img4Mobile from "../../assets/images/Home/responsiveMainSlider/resImg4.jpg";
import img5Mobile from "../../assets/images/Home/responsiveMainSlider/resImg5.jpg";
import img6Mobile from "../../assets/images/Home/responsiveMainSlider/resImg6.png";

import { Avatar, Box, Button, useMediaQuery, useTheme } from "@mui/material";

const MainSlider = () => {
  const swiperRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const handlePrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const mainSliderDesktop = [img1, img2, img3, img4, img5, img6];
  const mainSliderMobile = [
    img1Mobile,
    img2Mobile,
    img3Mobile,
    img4Mobile,
    img5Mobile,
    img6Mobile,
  ];
  const mainSlider = isMobile ? mainSliderMobile : mainSliderDesktop;
  return (
    <>
      <Box className="mainSlider" sx={{ position: "relative" }}>
        <Swiper
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          modules={[Navigation, Pagination, Autoplay]}
          className="mySwiper"
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          pagination={{
            clickable: true,
            renderBullet: (bulletIndex, className) => {
              return `<span class="${className} custom-dot"><span class="dash"></span></span>`;
            },
          }}
        >
          {mainSlider.map((item, index) => (
            <SwiperSlide key={index}>
              <Box>
                <img
                  src={item}
                  alt={item}
                  style={{
                    width: "100%",
                    maxHeight: "1000px",
                    borderRadius: "0",
                  }}
                />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
        <Button
          className="swiper-button-prev"
          sx={{ fontSize: "25px" }}
          onClick={handlePrev}
        >
          <i className="fa-solid fa-chevron-left icon"></i>
        </Button>
        <Button
          className="swiper-button-next"
          sx={{ fontSize: "25px" }}
          onClick={handleNext}
        >
          <i className="fa-solid fa-chevron-right icon"></i>
        </Button>
      </Box>
    </>
  );
};

export default MainSlider;
