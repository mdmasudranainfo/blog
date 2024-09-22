"use client";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

const HomePageSlider = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 5000,
    cssEase: "linear",
  };
  return (
    <div className="">
      <Slider {...settings}>
        <div>
          <Image
            src={"/images/slider1.jpg"}
            width={400}
            height={300}
            layout="responsive"
            alt=""
          />
        </div>
        <div>
          <Image
            src={"/images/slider1.jpg"}
            width={400}
            height={300}
            layout="responsive"
            alt=""
          />
        </div>
        <div>
          <Image
            src={"/images/slider1.jpg"}
            width={400}
            height={300}
            layout="responsive"
            alt=""
          />
        </div>
        <div>
          <Image
            src={"/images/slider1.jpg"}
            width={400}
            height={300}
            layout="responsive"
            alt=""
          />
        </div>
      </Slider>
    </div>
  );
};

export default HomePageSlider;
