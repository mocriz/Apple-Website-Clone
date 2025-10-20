import React from "react";
import { heroData, heroGridData } from "../data/heroData";

const Hero = () => {
  return (
    <>
      <div className="w-full bg-black/85 h-[48px]"></div>
      <section>
        {heroData.map((item, index) => (
          <React.Fragment key={index}>
            <a href={item.link}>
              <div className={`w-full ${item.bg} XBxCmF`}>
                <div className="flex items-center flex-col">
                  <div
                    className={`text-center ${
                      item.dark ? "text-white" : "text-black"
                    }`}
                  >
                    <h2 className="headline mt-9">{item.headline}</h2>
                    <p className="subhead">{item.subhead}</p>
                  </div>
                  <div className="cta-links">
                    <a href={item.cta1} className="cta cta-fill">
                      Learn More
                    </a>
                    <a href={item.cta2} className="cta cta-bordered">
                      Buy
                    </a>
                  </div>
                </div>
              </div>
            </a>
            <div className="bg-white w-full h-3" key={index + 12}></div>
          </React.Fragment>
        ))}
      </section>
    </>
  );
};
const HeroGrid = () => {
  return (
    <section className="grid w-full grid-cols-1 md:grid-cols-2 gap-3 md:px-3">
      {heroGridData.map((item, index) => (
        <div
          key={index}
          className="grid-sizes h-[500px] min-[735px]:h-[490px] min-[1069px]:h-[580px]"
        >
          <a href={item.link} className="block w-full h-full">
            <div
              className={`w-full h-full ${item.bg} relative bg-cover bg-center`}
            >
              <div
                className={`flex items-center h-full flex-col ${
                  item.headline === "Education" ? "justify-end" : ""
                }`}
              >
                <div
                  className={`${
                    item.dark ? "text-white" : "text-black"
                  } flex flex-col items-center text-center pt-9`}
                >
                  {item.headlineImage ? (
                    <div
                      className={`h-[37px] w-full ${item.headlineImageClass} bg-no-repeat bg-center`}
                    ></div>
                  ) : (
                    <h2 className="headline">{item.headline}</h2>
                  )}
                  <p
                    className="subhead"
                    dangerouslySetInnerHTML={{ __html: item.subhead }}
                  />
                </div>

                <div className="cta-links mb-9">
                  <a href={item.cta1} className="cta cta-fill">
                    Learn More
                  </a>
                  <a
                    href={item.cta2}
                    className={`cta cta-bordered ${
                      item.ctaButton > 1 ? "inline" : "hidden"
                    }`}
                  >
                    Buy
                  </a>
                </div>
              </div>
            </div>
          </a>
        </div>
      ))}
    </section>
  );
};

export { Hero, HeroGrid };
