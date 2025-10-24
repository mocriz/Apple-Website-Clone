import React, { useState, useEffect, useRef } from "react";
import { tvPlusImg } from "../data/tvPlusImg";
import CarouselButtonLinks from "./CarouselButtonLinks";
import MarqueeImage from "./MarqueeImage";

const CarouselAppleTV = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [isPlaying, setIsPlaying] = useState(true); // ✅ UBAH INI: true = autoplay ON
  const timerRef = useRef(null);

  let CARD_WIDTH = 289;
  let CARD_HEIGHT = 495;

  if (viewportWidth >= 1441) {
    CARD_WIDTH = 1265;
    CARD_HEIGHT = 667.25;
  } else if (viewportWidth >= 1069) {
    CARD_WIDTH = 995;
    CARD_HEIGHT = 523.13;
  } else if (viewportWidth >= 735) {
    CARD_WIDTH = 704;
    CARD_HEIGHT = 367.78;
  }

  const length = tvPlusImg.length;

  const TRANSITION_DURATION = 900;

  const extendedSlides = [tvPlusImg[length - 1], ...tvPlusImg, tvPlusImg[0]];

  const translateValue =
    currentIndex * CARD_WIDTH - (viewportWidth / 2 - CARD_WIDTH / 2);

  const handleSlide = (newIndex) => {
    setCurrentIndex(newIndex);

    if (newIndex === 0 || newIndex === length + 1) {
      const timer = setTimeout(() => {
        setTransitionEnabled(false);
        setCurrentIndex(newIndex === 0 ? length : 1);
      }, TRANSITION_DURATION);
      return () => clearTimeout(timer);
    }
  };

  const nextSlide = () => {
    handleSlide(currentIndex + 1);
  };

  const prevSlide = () => {
    handleSlide(currentIndex - 1);
  };

  useEffect(() => {
    if (!transitionEnabled) {
      requestAnimationFrame(() => {
        setTransitionEnabled(true);
      });
    }
  }, [transitionEnabled]);

  // ✅ FIX INI: Tambahin isPlaying di logic
  useEffect(() => {
    clearInterval(timerRef.current);
    
    // Cuma bikin interval kalau isPlaying === true
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        handleSlide(currentIndex + 1);
      }, 5000);
    }
    
    return () => clearInterval(timerRef.current);
  }, [currentIndex, isPlaying]); // ✅ Tambahin isPlaying di dependency

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let activeDotIndex = currentIndex;
  if (currentIndex === 0) {
    activeDotIndex = length;
  } else if (currentIndex > length) {
    activeDotIndex = 1;
  }

  // ==========================================
  // ANIMATION CONTROLS - EDIT DI SINI BRO!
  // ==========================================

  // 1. SLIDE ANIMATION (carousel bergerak kiri-kanan)
  const SLIDE_EASING = "cubic-bezier(.71,.2,.49,.76)";
  // ^ Cubic bezier explained:
  // - (0.4, 0, 0.2, 1) = ease-out: start cepat, slow down di akhir
  // - (0.25, 0.1, 0.25, 1) = ease (default): smooth all around
  // - (0.42, 0, 0.58, 1) = ease-in-out: slow-fast-slow
  // - (0.65, 0, 0.35, 1) = lebih aggressive ease-in-out
  // - (0.23, 1, 0.32, 1) = swift out (Material Design)
  // - Custom: https://cubic-bezier.com untuk experiment

  // 2. OVERLAY PUTIH ANIMATION
  const OVERLAY_DURATION = TRANSITION_DURATION; // ms
  const OVERLAY_EASING = "cubic-bezier(0.4, 0, 0.2, 1)";
  // ^ Timing untuk fade in/out overlay putih

  // 3. BOTTOM SECTION ANIMATION (text & button muncul dari bawah)
  const BOTTOM_SLIDE_DURATION = TRANSITION_DURATION + 300; // ms
  const BOTTOM_OPACITY_DURATION = TRANSITION_DURATION * 0.3; // ms (80% dari slide)
  const BOTTOM_EASING = "cubic-bezier(0.4, 0, 0.2, 1)";
  const BOTTOM_DELAY = 250; // ms - delay sebelum animasi mulai
  // ^ Settings untuk animasi bottom section:
  // - Transform: berapa lama slide up nya
  // - Opacity: berapa lama fade in nya
  // - Delay: mau ada jeda gak sebelum muncul

  let GALLERY_IMAGE = "";

  return (
    <React.Fragment>
      <div className="bg-white w-full h-3"></div>
      <div className="relative w-full overflow-hidden">
        <div
          className="flex"
          style={{
            transform: `translateX(-${translateValue}px)`,
            width: `${extendedSlides.length * CARD_WIDTH}px`,
            transition: transitionEnabled
              ? `transform ${TRANSITION_DURATION}ms ${SLIDE_EASING}`
              : "none",
          }}
        >
          {extendedSlides.map((item, index) => {
            {
              if (viewportWidth >= 1441) {
                GALLERY_IMAGE = item.xlargeImg;
              } else if (viewportWidth >= 1069) {
                GALLERY_IMAGE = item.largeImg;
              } else if (viewportWidth >= 735) {
                GALLERY_IMAGE = item.tabImg;
              } else {
                GALLERY_IMAGE = item.mobileImg;
              }
            }
            const isActive = index === currentIndex;

            return (
              <div
                key={index}
                className="flex-shrink-0 relative justify-center z-0"
                style={{
                  width: `${CARD_WIDTH}px`,
                  height: `${CARD_HEIGHT}px`,
                }}
              >
                {/* Container untuk gambar dan overlay */}
                <div className="image mx-auto relative">
                  {/* Layer 1: Gambar dengan link */}
                  <a
                    href={item.link || "#"}
                    className="block w-full h-full"
                    onClick={(e) => {
                      if (!isActive) {
                        e.preventDefault();
                        handleSlide(index);
                      }
                    }}
                  >
                    <img
                      src={GALLERY_IMAGE}
                      alt={item.title}
                      className="block"
                      draggable="false"
                    />
                  </a>

                  {/* Layer 2: Overlay putih dengan animasi fade */}
                  <div
                    className={`absolute inset-0 pointer-events-none ${
                      isActive ? "bg-white" : "bg-white"
                    }`}
                    style={{
                      opacity: isActive ? 0 : 0.65,
                      transition: `opacity ${OVERLAY_DURATION}ms ${OVERLAY_EASING}`,
                    }}
                  />
                  <div className="absolute inset-0 bg-black opacity-20 pointer-events-none"></div>
                  {/* Layer 3: Konten overlay */}
                  <div className="flex flex-col justify-between h-full absolute inset-0 z-10 w-full py-5 pointer-events-none overlay">
                    {/* Top section - tetap sama seperti original */}
                    <div className="flex flex-col justify-center items-center gap-1.5 pointer-events-auto top-section">
                      <figure className="atv-icon"></figure>
                      <figure
                        className="atv-icon w-fit"
                        style={{
                          backgroundImage: `url(${item.titleLogo})`,
                          backgroundPosition: "center",
                          width: "100%",
                        }}
                      ></figure>
                    </div>

                    {/* Bottom section dengan animasi slide up */}
                    {/* 
                        ANIMASI BOTTOM SECTION:
                        - translateY(30%) = posisi awal 
                        - translateY(0) = posisi akhir
                        - opacity 0->1 = fade in effect
                     */}
                    <div
                      className="pointer-events-auto w-full"
                      style={{
                        transform: isActive
                          ? "translateY(0)"
                          : "translateY(30%)",
                        opacity: isActive ? 1 : 0,
                        transition: `
                          transform ${BOTTOM_SLIDE_DURATION}ms ${BOTTOM_EASING} ${BOTTOM_DELAY}ms, 
                          opacity ${BOTTOM_OPACITY_DURATION}ms ${BOTTOM_EASING} ${BOTTOM_DELAY}ms
                        `,
                      }}
                    >
                      <div className="flex flex-col justify-center items-center gap-1.5 medium:flex-row-reverse medium:justify-end medium:w-full medium:h-[42px] medium:ml-[70px] mb-[55px] medium:mb-6">
                        <p
                          className="flex flex-col justify-center items-center text-center text-white font-sfProDisplay 
                                    medium:flex-row medium:items-center medium:text-xl medium:ml-5"
                        >
                          {item.genre && (
                            <>
                              <span className="max-[734px]:w-[244px] font-semibold  genre">
                                {item.genre}
                              </span>
                            </>
                          )}
                          <span className="max-[734px]:w-[198px]">
                            {item.details}
                          </span>
                        </p>

                        <CarouselButtonLinks
                          link={item.link}
                          text="Stream Now"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tombol kiri-kanan - tetap sama seperti original */}
        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 rounded-full w-8 h-8 flex items-center justify-center sm:flex md:hidden"
        >
          ‹
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 rounded-full w-8 h-8 flex items-center justify-center sm:flex md:hidden"
        >
          ›
        </button>
      </div>
      <div className="flex gap-3 justify-center mt-3">
        {tvPlusImg.map((_, i) => (
          <button
            key={i}
            onClick={() => handleSlide(i + 1)}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              i + 1 === activeDotIndex ? "bg-gray-800" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
      <MarqueeImage />
      <div className="h-14 flex justify-end items-center">
        <div className="w-6 h-6 m-4 bg-[#d2d2d7] rounded-full ">
          <button
            className=" flex items-center justify-center w-full h-full cursor-pointer"
            onClick={() => [setIsPlaying(!isPlaying), isPlaying == false? handleSlide( currentIndex + 1) : null]}
          >
            <img
              src={isPlaying ? "/icons/pause.svg" : "/icons/start.svg"}
              alt=""
              className="w-3 h-3 "
            />
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export { CarouselAppleTV };