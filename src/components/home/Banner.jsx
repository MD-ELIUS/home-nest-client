import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "animate.css";

const slides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1600&q=80",
    title: "Find Your Dream Home Effortlessly",
    subtitle: "Discover properties that match your lifestyle and budget",
    desc: "Explore verified listings, stunning homes, and trusted agents—all in one place with HomeNest.",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1600&q=80",
    title: "Smart, Simple & Secure Property Search",
    subtitle: "Your perfect home is just a few clicks away",
    desc: "From cozy apartments to luxury villas, find your ideal space with powerful filters and real-time updates.",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    title: "Buy, Rent, or Sell With Confidence",
    subtitle: "Empowering you to make the right real estate decisions",
    desc: "HomeNest connects buyers, renters, and sellers through a reliable and user-friendly platform.",
  },
];

const Banner = () => {
  const [isDark, setIsDark] = useState(false);

  // Detect theme
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.getAttribute("data-theme") === "dark");
    });
    observer.observe(document.documentElement, { attributes: true });
    setIsDark(document.documentElement.getAttribute("data-theme") === "dark");
    return () => observer.disconnect();
  }, []);

  // ✅ Zoom + text animation trigger
 const handleSlideChange = (swiper) => {
  const activeSlide = swiper
    ? swiper.slides[swiper.activeIndex]
    : document.querySelector(".swiper-slide-active");
  if (!activeSlide) return;

  // ✅ remove zoom-animate from all slides first
  swiper?.slides.forEach((slide) => {
    const bg = slide.querySelector(".zoom-bg");
    if (bg) {
      bg.classList.remove("zoom-animate");
    }
  });

  // ✅ add zoom-animate to active slide
  const bgDiv = activeSlide.querySelector(".zoom-bg");
  if (bgDiv) {
    void bgDiv.offsetWidth; // reset reflow
    bgDiv.classList.add("zoom-animate");
  }

  // retrigger text animations
  const retrigger = (selector, classes) => {
    const el = activeSlide.querySelector(selector);
    if (!el) return;
    el.classList.remove(...classes);
    void el.offsetWidth;
    el.classList.add(...classes);
  };

  retrigger("h2.animate__fadeInDown", ["animate__animated", "animate__fadeInDown"]);
  retrigger("h1.animate__fadeInUp", ["animate__animated", "animate__fadeInUp"]);
  retrigger("p.animate__fadeInUp", ["animate__animated", "animate__fadeInUp"]);
};


  return (
    <section className="w-full h-[35vh] sm:h-[50vh] md:h-[65vh] lg:h-[75vh] relative overflow-hidden">
 <Swiper
  modules={[Pagination, Autoplay, EffectFade]}
  pagination={{ clickable: true }}
  effect="fade"
  autoplay={{
    delay: 6500,
    disableOnInteraction: false,
  }}
  loop
  onInit={(swiper) => {
    // ✅ first slide zoom after DOM ready
    setTimeout(() => handleSlideChange(swiper), 50);
  }}
  onSlideChangeTransitionStart={(swiper) => {
    handleSlideChange(swiper);

    // ✅ if loop restarted (swiper.activeIndex === 0 after last slide)
    if (swiper.realIndex === 0) {
      const firstSlide = swiper.slides[swiper.activeIndex];
      const bgDiv = firstSlide.querySelector(".zoom-bg");
      if (bgDiv) {
        bgDiv.classList.remove("zoom-animate");
        void bgDiv.offsetWidth;
        bgDiv.classList.add("zoom-animate");
      }
    }
  }}
  className="h-full w-full"
>

        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative flex items-center justify-center h-full overflow-hidden">
              {/* ✅ Background image with zoom class */}
              <div
                className="absolute inset-0 bg-cover bg-center zoom-bg"
                style={{ backgroundImage: `url(${slide.image})` }}
              ></div>

              {/* Theme overlay */}
              <div
                className={`absolute inset-0 transition-colors duration-1000 ${
                  isDark ? "bg-black/70" : "bg-secondary/70"
                }`}
              ></div>

              {/* Slide text */}
              <div className="relative text-center text-white px-3 sm:px-4 max-w-4xl mx-auto">
                <h2 className="text-xs sm:text-base md:text-lg lg:text-2xl font-light mb-2 sm:mb-3 animate__animated animate__fadeInDown">
                  {slide.subtitle}
                </h2>

                <div className="flex justify-center items-center gap-3 mb-2 sm:mb-3">
                  <div className="py-[1px] md:py-[2px] bg-white w-[80px] md:w-[100px] xl:w-[120px] rounded-2xl animate-left-to-center"></div>
                  <div className="w-2 h-2 md:w-3 md:h-3 bg-white rounded-full animate-fade-in-center"></div>
                  <div className="py-[1px] md:py-[2px] bg-white w-[80px] md:w-[100px] xl:w-[120px] rounded-2xl animate-right-to-center"></div>
                </div>

                <h1 className="text-lg sm:text-3xl md:text-4xl font-bold leading-tight mb-2 sm:mb-4 animate__animated animate__fadeInUp">
                  {slide.title}
                </h1>
                <p className="text-[11px] sm:text-base md:text-lg max-w-2xl mx-auto animate__animated animate__fadeInUp">
                  {slide.desc}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div className="swiper-pagination absolute bottom-2 left-1/2 -translate-x-1/2 z-20"></div>
      </Swiper>

      {/* ✅ Zoom effect CSS */}
      <style jsx>{`
        .zoom-bg {
          transform: scale(1);
          transition: transform 9.5s ease-out;
        }
        .zoom-animate {
          transform: scale(1.12);
        }
      `}</style>
    </section>
  );
};

export default Banner;
