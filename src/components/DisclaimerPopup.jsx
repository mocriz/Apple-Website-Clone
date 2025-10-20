import { useEffect, useState } from "react";

const DisclaimerPopup = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("appleCloneDisclaimer");
    if (!dismissed) {
      const timer = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConfirm = () => {
    setVisible(false);
    localStorage.setItem("appleCloneDisclaimer", "true");
  };

  const handleCancel = () => {
    window.location.href = "https://www.apple.com";
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-ios-modal">
      <div className="w-[280px] rounded-xl bg-[#f8f8f8]/90 text-center font-[system-ui] shadow-xl dark:bg-[#2c2c2e]/90">
        <div className="px-4 pt-4 pb-3">
          <h3 className="text-lg font-bold text-black dark:text-white">
            Notice
          </h3>
          <p className="mt-1 text-[13px] leading-snug text-neutral-800 dark:text-neutral-200">
            This website is a <strong>recreation</strong> of Apple.com made for{" "}
            <strong>educational purposes</strong>. All trademarks, logos, and
            images are the property of <strong>Apple&nbsp;Inc.</strong>.
            <br />
            <br />
            By clicking <strong>OK</strong>, you acknowledge that this site is{" "}
            <strong>non-commercial</strong> and{" "}
            <strong>not affiliated with Apple&nbsp;Inc.</strong>. If you do not
            agree, click <strong>Cancel</strong>.
          </p>
        </div>
        <div className="flex border-t border-neutral-400/40">
          <button
            onClick={handleCancel}
            className="w-1/2 py-3 text-lg text-[#007aff] transition-colors duration-150 hover:bg-neutral-500/10 active:bg-neutral-500/20"
          >
            Cancel
          </button>

          <div className="w-px bg-neutral-400/40" />

          <button
            onClick={handleConfirm}
            className="w-1/2 py-3 text-lg font-semibold text-[#ff3b30] transition-colors duration-150 hover:bg-neutral-500/10 active:bg-neutral-500/20"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerPopup;
