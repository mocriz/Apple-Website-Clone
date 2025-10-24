import { useEffect, useRef, useState } from "react";
import { navItems, bigText } from "../data/navData";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [triggerMenuButton, setTriggerMenuButton] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 833);
  const navRef = useRef(null);
  const prevMenu = useRef(null);

  const navItemsOne = navItems.slice(0, 11); // Store - Support only

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 833);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const el = navRef.current;
    if (!el) return;

    el.style.transition = "max-height 0.3s ease-in-out";

    // === MOBILE BEHAVIOR ===
    if (isMobile) {
      if (activeMenu === null) {
        el.style.maxHeight = "48px";
        setShowContent(false);
      } else {
        el.style.maxHeight = "100vh";
        setTimeout(() => setShowContent(true), 150);
      }
      return;
    }

    // === DESKTOP BEHAVIOR ===
    if (activeMenu === null) {
      setShowContent(false);
      const currentHeight = el.scrollHeight;
      el.style.maxHeight = currentHeight + "px";
      requestAnimationFrame(() => (el.style.maxHeight = "48px"));
    } else if (prevMenu.current === null) {
      setShowContent(false);
      el.style.maxHeight = "48px";
      requestAnimationFrame(() => {
        const fullHeight = el.scrollHeight;
        el.style.maxHeight = fullHeight + "px";
      });
      setTimeout(() => setShowContent(true), 250);
    } else if (prevMenu.current !== activeMenu) {
      setShowContent(false);
      requestAnimationFrame(() => {
        const fullHeight = el.scrollHeight;
        el.style.maxHeight = fullHeight + "px";
        setTimeout(() => setShowContent(true), 100);
      });
    }

    prevMenu.current = activeMenu;
  }, [activeMenu, isMobile]);

  const handleMenuToggle = (index) => {
    if (isMobile) {
      // Menu acts as master toggle on mobile
      if (triggerMenuButton) {
        setActiveMenu(null);
        setTriggerMenuButton(false);
      } else {
        setActiveMenu(index);
        setTriggerMenuButton(true);
      }
    } else {
      setActiveMenu(activeMenu === index ? null : index);
      setTriggerMenuButton(activeMenu !== index);
    }
  };

  return (
    <div
      className={`z-30 w-full h-full ${
        activeMenu !== null
          ? "backdrop-blur-2xl fixed transition-all duration-200"
          : ""
      }`}
    >
      <div
        className={`backdrop-blur-xl saturate-[1.8] w-full flex justify-center top-0 fixed z-40 ${
          activeMenu !== null ? "bg-nav-background-opened" : "bg-nav-bg"
        }`}
      >
        <nav
          ref={navRef}
          className={`px-4 w-[1000px] text-nav-text overflow-hidden ${
            isMobile ? "transition-all duration-300" : "max-h-[48px]"
          }`}
          onMouseLeave={() => !isMobile && setActiveMenu(null)}
        >
          {/* === HEADER === */}
          <div className="flex justify-between items-center text-nav-text">
            {/* LOGO */}
            <div>
              <a
                href="index.html"
                className={`group ${
                  triggerMenuButton
                    ? "max-[833px]:opacity-0 max-[833px]:cursor-default"
                    : "opacity-100"
                }`}
              >
                <svg
                  className="transition duration-500 ease-out fill-nav-text group-hover:fill-white"
                  height="48"
                  viewBox="0 0 17 48"
                  width="17"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m15.5752 19.0792a4.2055 4.2055 0 0 0 -2.01 3.5376 4.0931 4.0931 0 0 0 2.4908 3.7542 9.7779 9.7779 0 0 1 -1.2755 2.6351c-.7941 1.1431-1.6244 2.2862-2.8878 2.2862s-1.5883-.734-3.0443-.734c-1.42 0-1.9252.7581-3.08.7581s-1.9611-1.0589-2.8876-2.3584a11.3987 11.3987 0 0 1 -1.9373-6.1487c0-3.61 2.3464-5.523 4.6566-5.523 1.2274 0 2.25.8062 3.02.8062.734 0 1.8771-.8543 3.2729-.8543a4.3778 4.3778 0 0 1 3.6822 1.841zm-6.8586-2.0456a1.3865 1.3865 0 0 1 -.2527-.024 1.6557 1.6557 0 0 1 -.0361-.337 4.0341 4.0341 0 0 1 1.0228-2.5148 4.1571 4.1571 0 0 1 2.7314-1.4078 1.7815 1.7815 0 0 1 .0361.373 4.1487 4.1487 0 0 1 -.9867 2.587 3.6039 3.6039 0 0 1 -2.5148 1.3236z"></path>
                </svg>
              </a>
            </div>

            {/* MENU ITEMS (Desktop) */}
            <div className="hidden w-full text-nav-md-text min-[834px]:block">
              <ul className="flex items-center text-xs justify-evenly font-sfProText">
                {navItemsOne.map((item, index) => (
                  <li
                    key={index}
                    className="group text-nav-text"
                    onMouseEnter={() => !isMobile && setActiveMenu(index)}
                  >
                    <a href={item.link}>{item.text}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* ICONS */}
            <div className="flex items-center justify-center">
              {/* SEARCH */}
              <a
                onClick={() => handleMenuToggle(11)}
                onMouseEnter={() => {
                  if (!isMobile && activeMenu !== 11) setActiveMenu(null);
                }}
                className={`mr-[1.9rem] group cursor-pointer ${
                  triggerMenuButton
                    ? "max-[833px]:opacity-0 max-[833px]:cursor-default"
                    : "opacity-100"
                }`}
              >
                <svg
                  className="transition duration-500 ease-out fill-nav-text group-hover:fill-white"
                  height="48"
                  viewBox="0 0 17 48"
                  width="17"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m16.2294 29.9556-4.1755-4.0821a6.4711 6.4711 0 1 0 -1.2839 1.2625l4.2005 4.1066a.9.9 0 1 0 1.2588-1.287zm-14.5294-8.0017a5.2455 5.2455 0 1 1 5.2455 5.2527 5.2549 5.2549 0 0 1 -5.2455-5.2527z"></path>
                </svg>
              </a>

              {/* BAG */}
              <a
                onClick={() => handleMenuToggle(12)}
                onMouseEnter={() => {
                  if (!isMobile && activeMenu !== 12) setActiveMenu(null);
                }}
                className={`mr-[1.9rem] min-[834px]:mr-0 group cursor-pointer ${
                  triggerMenuButton
                    ? "max-[833px]:opacity-0 max-[833px]:cursor-default"
                    : "opacity-100"
                }`}
              >
                <svg
                  className="transition duration-500 ease-out fill-nav-text group-hover:fill-white"
                  height="48"
                  viewBox="0 0 17 48"
                  width="17"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m13.4575 16.9268h-1.1353a3.8394 3.8394 0 0 0 -7.6444 0h-1.1353a2.6032 2.6032 0 0 0 -2.6 2.6v8.9232a2.6032 2.6032 0 0 0 2.6 2.6h9.915a2.6032 2.6032 0 0 0 2.6-2.6v-8.9231a2.6032 2.6032 0 0 0 -2.6-2.6001zm-4.9575-2.2768a2.658 2.658 0 0 1 2.6221 2.2764h-5.2442a2.658 2.658 0 0 1 2.6221-2.2764zm6.3574 13.8a1.4014 1.4014 0 0 1 -1.4 1.4h-9.9149a1.4014 1.4014 0 0 1 -1.4-1.4v-8.9231a1.4014 1.4014 0 0 1 1.4-1.4h9.915a1.4014 1.4014 0 0 1 1.4 1.4z"></path>
                </svg>
              </a>

              {/* MENU (Hamburger) */}
              <div className="min-[834px]:hidden">
                <button
                  role="button"
                  type="menu"
                  aria-label="Menu"
                  className="flex items-center cursor-pointer"
                  onClick={() => handleMenuToggle(13)}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18">
                    <polyline
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points="2 12, 16 12"
                      style={
                        triggerMenuButton
                          ? {
                              transform: "translate(0px, -5px) rotate(45deg)",
                              transition: "all 0.5s ease-in-out",
                              transformOrigin: "6px 14px",
                            }
                          : {
                              transition: "all 0.5s ease-in-out",
                              transformOrigin: "center",
                            }
                      }
                    ></polyline>
                    <polyline
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points="2 5, 16 5"
                      style={
                        triggerMenuButton
                          ? {
                              transform: "translate(0px, 5px) rotate(-45deg)",
                              transition: "all 0.5s ease-in-out",
                              transformOrigin: "9px 4px",
                            }
                          : {
                              transition: "all 0.5s ease-in-out",
                              transformOrigin: "center",
                            }
                      }
                    ></polyline>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* === SUBMENU === */}
          {activeMenu !== null &&
            navItems[activeMenu] &&
            navItems[activeMenu].subMenu && (
              <div
                className={`w-full flex justify-center py-6 transition-opacity duration-300 ${
                  showContent ? "opacity-100" : "opacity-0"
                } ${isMobile ? "h-screen overflow-y-auto" : ""}`}
              >
                <div className="w-[1000px] text-white pb-10 flex flex-wrap gap-5 ">
                  {Object.keys(navItems[activeMenu].subMenu).map(
                    (section, index) => (
                      <div key={index} className="w-fit mr-10">
                        <h4 className="font-semibold mb-3 text-[#86868B] text-xs">
                          {section}
                        </h4>
                        <ul className="space-y-2 text-sm">
                          {navItems[activeMenu].subMenu[section].map(
                            (sub, subIndex) => {
                              const isFound = bigText.some((item) =>
                                item
                                  .toLowerCase()
                                  .includes(sub.text.toLowerCase())
                              );
                              return (
                                <li key={subIndex}>
                                  <a
                                    href={sub.link}
                                    className={`hover:text-gray-300 transition ${
                                      isFound
                                        ? "text-2xl font-semibold"
                                        : "text-xs"
                                    } text-[#E8E8ED]`}
                                  >
                                    {sub.text}
                                  </a>
                                </li>
                              );
                            }
                          )}
                        </ul>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
