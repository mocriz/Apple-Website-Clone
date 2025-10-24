import { useState, useEffect } from "react";
import { footerData } from "../data/footerData";

const Footer = () => {
  const [expanded, setExpanded] = useState([]);
  const [isWide, setIsWide] = useState(window.innerWidth >= 834);

  useEffect(() => {
    const handleResize = () => setIsWide(window.innerWidth >= 834);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSection = (title) => {
    setExpanded((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  const groupPattern = [2, 2, 1, 4, 2];
  let startIndex = 0;

  return (
    <footer className="bg-footer-background w-full border-t border-black/0 flex justify-center font-sfProDisplay relative z-10">
      <div className="large:mx-40 max-w-[980px] px-6">
        <section className="w-full mt-4 mb-3 border-b border-footer-border-color pb-3 text-footer-text-color text-xs ">
          <ul className="text-">
            <li className="pb-[9.6px]">
              <span>
                1. Trade‑in values will vary based on the condition, year, and
                configuration of your eligible trade‑in device. Not all devices
                are eligible for credit. You must be at least the age of
                majority to be eligible to trade in for credit or for an Apple
                Gift Card. Trade‑in value may be applied toward qualifying new
                device purchase, or added to an Apple Gift Card. Actual value
                awarded is based on receipt of a qualifying device matching the
                description provided when estimate was made. Sales tax may be
                assessed on full value of a new device purchase. In‑store
                trade‑in requires presentation of a valid photo ID (local law
                may require saving this information). Offer may not be available
                in all stores and may vary between in‑store and online trade‑in.
                Some stores may have additional requirements. Apple or its
                trade‑in partners reserve the right to refuse, cancel, or limit
                quantity of any trade‑in transaction for any reason. More
                details are available from Apple’s trade-in partner for trade‑in
                and recycling of eligible devices. Restrictions and limitations
                may apply.
              </span>
            </li>
            <li className="pb-[9.6px]">
              <span>
                To access and use all Apple Card features and products available
                only to Apple Card users, you must add Apple Card to Wallet on
                an iPhone or iPad that supports and has the latest version of
                iOS or iPadOS. Apple Card is subject to credit approval,
                available only for qualifying applicants in the United States,
                and issued by Goldman Sachs Bank USA, Salt Lake City Branch.
              </span>
            </li>
            <li className="pb-[9.6px]">
              <span>
                Apple Payments Services LLC, a subsidiary of Apple Inc., is a
                service provider of Goldman Sachs Bank USA for Apple Card and
                Savings accounts. Neither Apple Inc. nor Apple Payments Services
                LLC is a bank.
              </span>
            </li>
            <li className="pb-[9.6px]">
              <span>
                If you reside in the U.S. territories, please call Goldman Sachs
                at 877-255-5923 with questions about Apple Card.
              </span>
            </li>
            <li className="pb-[9.6px]">
              <span>
                Learn more about how Apple Card applications are evaluated at{" "}
                <a
                  className="underline text-footer-link-color hover:text-footer-link-color"
                  href="https://support.apple.com/kb/HT209218"
                >
                  support.apple.com/kb/HT209218
                </a>
                .
              </span>
            </li>
            <li className="pb-[9.6px]">
              <span>
                A subscription is required for Apple Arcade, Apple Fitness+,
                Apple Music, and Apple TV+.
              </span>
            </li>
            <li className="pb-[9.6px]">
              <span>
                Features are subject to change. Some features, applications, and
                services may not be available in all regions or all languages.
              </span>
            </li>
          </ul>
        </section>

        {/* Footer navigation */}
        <nav className="relative z-20 min-footer:flex min-footer:justify-between gap-x-6 gap-y-4">
          {/* kalau belum min-footer (mobile) → tampil 1 per 1 */}
          {!isWide
            ? footerData.sections.map((section) => {
                const isExpanded = expanded.includes(section.title);
                return (
                  <div
                    key={section.title}
                    className="relative border-b border-footer-border-color"
                  >
                    <div
                      className="flex items-center gap-2 text-footer-directory-title-color text-sm justify-between py-2 cursor-pointer select-none"
                      onClick={() => toggleSection(section.title)}
                    >
                      <span>{section.title}</span>
                      <span
                        className={`transform transition-transform duration-300 origin-center ${
                          isExpanded ? "scale-y-[-1]" : "scale-y-[1]"
                        }`}
                      >
                        <svg
                          className="footer-icon-svg"
                          width="11"
                          height="6"
                          viewBox="0 0 11 6"
                        >
                          <polyline
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                            points="10.075 0.675 5.5 5.323 0.925 0.675"
                          />
                        </svg>
                      </span>
                    </div>

                    <div
                      className={`pl-5 min-footer:pl-0 text-footer-link-color overflow-hidden transition-all duration-300 ${
                        isExpanded
                          ? "max-h-96 opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <ul className="py-2 space-y-1 text-sm">
                        {section.links.map((link) => (
                          <li key={link.label}>
                            <a
                              href={link.href}
                              className="block hover:underline"
                            >
                              {link.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })
            : // kalau min-footer (≥834px) → grouping
              groupPattern.map((count, groupIndex) => {
                const group = footerData.sections.slice(
                  startIndex,
                  startIndex + count
                );
                startIndex += count;

                return (
                  <div
                    key={groupIndex}
                    className="mb-6 border-b border-footer-border-color min-footer:border-b-0"
                  >
                    {group.map((section) => (
                      <div key={section.title} className="mb-4">
                        <h3 className="font-medium text-footer-directory-title-color text-sm mb-2">
                          {section.title}
                        </h3>
                        <ul className="space-y-1 text-footer-link-color text-sm pl-4 min-footer:pl-0">
                          {section.links.map((link) => (
                            <li key={link.label}>
                              <a href={link.href} className="hover:underline">
                                {link.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                );
              })}
        </nav>
        <section className="text-footer-text-color text-xs pb-2.5">
          <div className="min-footer:border-b border-b-footer-border-color pb-4">
            More ways to shop:{" "}
            <a
              className="text-footer-mini-shop-link-color underline"
              href="https://www.apple.com/retail/"
            >
              Find an Apple Store
            </a>{" "}
            or{" "}
            <a
              className="text-footer-mini-shop-link-color underline"
              href="https://locate.apple.com/"
            >
              other retailer
            </a>{" "}
            near you.{" "}
            <span>
              Or call{" "}
              <a
                href="tel:1-800-692-7753"
                className="text-footer-mini-shop-link-color underline"
              >
                1-800-MY-APPLE
              </a>{" "}
              (1-800-692-7753).
            </span>
          </div>
          <div className="pt-4 flex-col-reverse gap-2.5 min-footer:flex-row flex min-footer:justify-between">
            <div className="min-footer-large:flex min-footer-large:gap-6">
              <div>Copyright © 2025 Apple Inc. All rights reserved.</div>
              <div className="text-footer-link-color min-footer-large:mt-0 mt-1.5">
                <ul className="flex min-footer-large:gap-x-2.5">
                  <li className="footer-link-list hover:underline">
                    <a href="/legal/privacy/">Privacy Policy</a>
                  </li>
                  <li className="footer-link-list hover:underline">
                    <a href="/legal/internet-services/terms/site.html">
                      Terms of Use
                    </a>
                  </li>
                  <li className="footer-link-list hover:underline">
                    <a href="/us/shop/goto/help/sales_refunds">
                      Sales and Refunds
                    </a>
                  </li>
                  <li className="footer-link-list hover:underline">
                    <a href="/legal/">Legal</a>
                  </li>
                  <li className="hover:underline">
                    <a href="/sitemap/">Site Map</a>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <a
                href="https://www.apple.com/choose-country-region/"
                className="text-footer-link-color hover:underline"
              >
                United States
              </a>
            </div>
          </div>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
