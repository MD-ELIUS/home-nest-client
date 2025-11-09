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

    // Detect dark/light theme
    useEffect(() => {
        const observer = new MutationObserver(() => {
            setIsDark(document.documentElement.getAttribute("data-theme") === "dark");
        });
        observer.observe(document.documentElement, { attributes: true });
        setIsDark(document.documentElement.getAttribute("data-theme") === "dark");
        return () => observer.disconnect();
    }, []);

    return (
        <section className="w-full h-[35vh] sm:h-[50vh] md:h-[65vh] lg:h-[75vh] relative">
            <Swiper
                modules={[Pagination, Autoplay, EffectFade]}
                pagination={{ clickable: true }}
                effect="fade"
                autoplay={{
                    delay: 9500,
                    disableOnInteraction: false,
                }}
                loop
                className="h-full w-full relative"
                onSlideChange={() => {
                    const animatedEls = document.querySelectorAll(
                        ".animate-left-to-center, .animate-right-to-center, .animate-fade-in-center"
                    );
                    animatedEls.forEach((el) => {
                        el.classList.remove(
                            "animate-left-to-center",
                            "animate-right-to-center",
                            "animate-fade-in-center"
                        );
                        void el.offsetWidth; // force reflow
                        if (el.classList.contains("bg-white") && el.classList.contains("w-[80px]")) {
                            // left or right div
                            if (el.parentElement?.children[0] === el) {
                                el.classList.add("animate-left-to-center");
                            } else {
                                el.classList.add("animate-right-to-center");
                            }
                        } else if (el.classList.contains("w-2") || el.classList.contains("md:w-3")) {
                            el.classList.add("animate-fade-in-center");
                        }
                    });
                }}
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div
                            className="relative flex items-center justify-center h-full bg-cover bg-center transition-all duration-1000"
                            style={{ backgroundImage: `url(${slide.image})` }}
                        >
                            {/* Theme overlay */}
                            <div
                                className={`absolute inset-0 transition-colors duration-1000 ${isDark ? "bg-black/70" : "bg-secondary/70"
                                    }`}
                            ></div>

                            {/* Slide text */}
                            <div className="relative text-center text-white px-3 sm:px-4 max-w-4xl mx-auto animate__animated animate__fadeInUp">
                                <h2 className="text-xs sm:text-base md:text-lg lg:text-2xl font-light mb-2 sm:mb-3 animate__animated animate__fadeInDown ">
                                    {slide.subtitle}
                                </h2>
                                <div className="flex justify-center items-center gap-3 mb-2 sm:mb-3 relative">
                                    {/* Left div sliding from left */}
                                    <div className="py-[1px] md:py-[2px] rounded-2xl bg-white w-[80px] md:w-[100px] xl:w-[120px] animate-left-to-center"></div>

                                    {/* Center dot (fade in) */}
                                    <div className="w-2 h-2 md:w-3 md:h-3 bg-white rounded-full animate-fade-in-center"></div>

                                    {/* Right div sliding from right */}
                                    <div className="py-[1px] md:py-[2px] rounded-2xl bg-white w-[80px] md:w-[100px] xl:w-[120px] animate-right-to-center"></div>
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

                {/* Pagination dots inside bottom of image */}
                <div className="swiper-pagination absolute bottom-2 left-1/2 -translate-x-1/2 z-20"></div>
            </Swiper>
        </section>
    );
};

export default Banner;
