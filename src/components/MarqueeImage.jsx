import React, { useEffect, useRef, useState } from "react";
import { marqueeItems } from "../data/marqueeImg";
import {
  AppleArcadeLogo,
  AppleFitnessLogo,
  AppleMusicLogo,
} from "../data/appleAppsLogo";

/**
 * MarqueeImage
 * - Infinite marquee tanpa jeda (tripled array trick)
 * - GPU-accelerated smooth animation (translate3d)
 * - Animasi overlay tetap sama seperti versi asli
 */
const MarqueeImage = () => {
  // =========================================
  // STATE & REFS
  // =========================================
  const [xPos, setXPos] = useState(0); // posisi horizontal (translateX)
  const [speed, setSpeed] = useState(0.05); // kecepatan geser
  const [isActive, setIsActive] = useState(false); // hover status overlay
  const requestRef = useRef(); // untuk cancelAnimationFrame

  const viewportWidth = window.innerWidth;
  // Lebar satu item + jarak antar item (gap-3.5 = 14px)
  const cardWidth = () => {
    if (viewportWidth < 735) {
      return 238;
    } else if (viewportWidth < 1069) {
      return 286;
    } else {
      return 417;
    }
  };
  const CARD_WIDTH = cardWidth() + 14;
  const totalWidth = marqueeItems.length * CARD_WIDTH;

  // =========================================
  // ANIMASI LOOPING TAK TERBATAS
  // =========================================
  useEffect(() => {
    let lastTime = performance.now();

    const animate = (time) => {
      const delta = time - lastTime;
      lastTime = time;

      setXPos((prev) => {
        let next = prev - speed * delta;

        // Reset posisi pas sudah melewati satu set konten
        // (pake tripled array, jadi reset ke tengah biar gak flick)
        if (next <= -totalWidth) {
          next += totalWidth;
        }
        return next;
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [speed, totalWidth]);

  // =========================================
  // PARAMETER ANIMASI OVERLAY
  // =========================================
  const TRANSITION_DURATION = 300; // durasi dasar (ms)
  const BOTTOM_SLIDE_DURATION = TRANSITION_DURATION + 300;
  const BOTTOM_OPACITY_DURATION = TRANSITION_DURATION * 0.5;
  const BOTTOM_EASING = "cubic-bezier(0.4, 0, 0.2, 1)";
  const BOTTOM_DELAY = 10;

  // =========================================
  // RENDER
  // =========================================
  return (
    <div className="relative w-full overflow-hidden">
      {/* Track utama */}
      <div
        className="flex justify-center items-center mt-3 gap-3.5"
        style={{
          willChange: "transform",
          transform: `translate3d(${xPos}px, 0, 0)`,
        }}
      >
        {/* Tripled array untuk loop seamless */}
        {[...marqueeItems, ...marqueeItems, ...marqueeItems].map(
          (item, index) => (
            <a
              href={item.link}
              key={index}
              className="block relative marquee-wrap flex-shrink-0 group"
              onMouseEnter={() => setSpeed(0.017)} // melambat saat hover
              onMouseLeave={() => setSpeed(0.05)} // kembali normal
            >
              {/* Gambar utama */}
              <div className="absolute inset-0">
                <div
                  className={`marquee-image-wrap ${
                    item.fullImage !== true
                      ? `flex justify-center items-center flex-shrink-0 ${item.bgColor} min-large:justify-between p-2.5`
                      : ""
                  }`}
                >
                  <img
                    src={item.smallImage}
                    alt={item.title}
                    className={`${
                      item.fullImage !== true ? "album-image rounded-md" : ""
                    }`}
                  />
                  <p
                    className={`font-sfProText font-bold w-[185px] ${
                      item.isSVGDark ? "text-black" : "text-white"
                    } text-sm hidden large:inline-block`}
                  >
                    {item.title}
                  </p>
                  <div className="logo w-full h-full absolute flex z-30 top-0 justify-end items-end ">
                    <div
                      className={`flex justify-between w-full items-center flex-row-reverse  absolute top-[70%] min-large:static min-large:pb-3.5 ${
                        item.fullImage !== true
                          ? "large:px-5 medium:px-4"
                          : "px-3"
                      }`}
                    >
                      <div
                        className={`w-1/5 ${
                          item.isSVGDark ? "fill-black" : "fill-white"
                        }`}
                      >
                        {item.svgLogo === "appleArcadeLogo" ? (
                          <AppleArcadeLogo />
                        ) : null}
                        {item.svgLogo === "appleFitnessLogo" ? (
                          <AppleFitnessLogo />
                        ) : null}
                        {item.svgLogo === "appleMusicLogo" ? (
                          <AppleMusicLogo />
                        ) : null}
                      </div>
                      <p
                        className={`font-sfProText font-bold text-white text-sm hidden large:block ${
                          item.fullImage !== true ? "large:hidden" : ""
                        }`}
                      >
                        {item.title}
                      </p>
                    </div>
                  </div>
                  {/* Overlay tombol dengan animasi */}
                  <div
                    className="hidden group-hover:flex marquee-image-wrap justify-center items-center absolute z-30 top-0 left-0 bg-black/40"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transition: `
                        transform ${BOTTOM_SLIDE_DURATION}ms ${BOTTOM_EASING} ${BOTTOM_DELAY}ms, 
                        opacity ${BOTTOM_OPACITY_DURATION}ms ${BOTTOM_EASING} ${BOTTOM_DELAY}ms
                      `,
                    }}
                    onMouseEnter={() => setIsActive(true)}
                    onMouseLeave={() => setIsActive(false)}
                  >
                    <button
                      className="bg-[#f0f0f0] py-1.5 px-4 rounded-full font-sfProDisplay cursor-pointer hover:bg-white"
                      style={{
                        transform: isActive
                          ? "translateY(0)"
                          : "translateY(30%)",
                        opacity: isActive ? 1 : 0,
                        transition: `
      background-color 0.1s ease-in-out,
      transform ${BOTTOM_SLIDE_DURATION}ms ${BOTTOM_EASING} ${BOTTOM_DELAY}ms,
      opacity ${BOTTOM_OPACITY_DURATION}ms ${BOTTOM_EASING} ${BOTTOM_DELAY}ms
    `,
                      }}
                    >
                      {item.overlay}
                    </button>
                  </div>
                </div>
              </div>

              {/* Judul di bawah gambar */}
              <p className="font-sfProText font-bold text-xs bottom-0 z-10 absolute min-large:hidden">
                {item.title}
              </p>
            </a>
          )
        )}
      </div>
    </div>
  );
};

export default MarqueeImage;
