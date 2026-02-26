import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import ContactForm from "../header/ContactForm";

const HERO_IMAGE = "/view-luxurious-hotel-interior-space.jpg";

export default function HeroSection() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const modalRef = useRef(null);

  const toggleForm = () => setIsFormOpen((prev) => !prev);

  useEffect(() => {
    if (!isFormOpen) return;
    const modal = modalRef.current;
    const focusables = modal?.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const first = focusables?.[0];
    const last = focusables?.[focusables.length - 1];

    const onEscape = (e) => e.key === "Escape" && toggleForm();
    const onTab = (e) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey && document.activeElement === first) e.preventDefault(), last?.focus();
      else if (!e.shiftKey && document.activeElement === last) e.preventDefault(), first?.focus();
    };

    first?.focus();
    window.addEventListener("keydown", onEscape);
    modal?.addEventListener("keydown", onTab);
    return () => {
      window.removeEventListener("keydown", onEscape);
      modal?.removeEventListener("keydown", onTab);
    };
  }, [isFormOpen]);

  return (
    <>
      <style jsx>{`
        .hero-headline-judson {
          font-family: var(--font-judson), 'Judson', Georgia, serif !important;
        }
        .hero-headline-with-underline {
          position: relative;
          display: inline-block;
          color: #EAD5B0;
        }
        .hero-underline-svg {
          display: block;
          width: 100%;
          height: 0.4em;
          margin-top: -0.2em;
          margin-bottom: 0.2em;
        }
        .hero-underline-svg path {
          fill: none;
          stroke: #EAD5B0;
          stroke-width: 8;
          stroke-linecap: round;
          stroke-dasharray: 500;
          stroke-dashoffset: 500;
          animation: hero-draw-line 1.2s ease-out 0.3s forwards;
        }
        @keyframes hero-draw-line {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>

      <section
        className="relative z-0 w-full overflow-hidden -mt-20 min-h-[100vh]"
        style={{ height: "100vh", maxHeight: "100vh", marginTop: "-80px" }}
      >
        <div className="absolute inset-0">
          <img
            src={HERO_IMAGE}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/80 z-10" aria-hidden />
        </div>

        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <h2 className="hero-headline-judson text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-4xl mb-6 text-white">
            <span className="hero-headline-with-underline">
              Q8 Desgin
              <svg className="hero-underline-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 150" preserveAspectRatio="none" aria-hidden>
                <path d="M7.7,145.6C109,125,299.9,116.2,401,121.3c42.1,2.2,87.6,11.8,87.3,25.7" />
              </svg>
            </span>{" "}
            của giấc mơ,
            <br />
            nhà thiết kế hiện thực.
          </h2>
          <p className="text-white/90 text-base sm:text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
            Biến điều bình thường thành những kiệt tác kiến trúc. Mọi hành trình lớn đều bắt đầu từ một bước chân. Hãy bắt đầu ngay.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/du-an"
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold uppercase tracking-wide text-sm text-white bg-[#c4a77d] hover:bg-[#b8956a] hover:-translate-y-px transition-all focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
            >
              Dự án của chúng tôi
            </Link>
            <Link
              href="/dich-vu"
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold uppercase tracking-wide text-sm text-white border-2 border-white/80 bg-transparent hover:bg-white/10 hover:border-white hover:-translate-y-px transition-all focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
            >
              Xem dịch vụ
              <FaChevronRight className="ml-2 w-4 h-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {isFormOpen && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60"
          onClick={(e) => e.target === e.currentTarget && toggleForm()}
        >
          <div ref={modalRef} className="rounded-lg w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-5xl relative bg-white">
            <button
              type="button"
              className="absolute top-2 right-2 p-1 text-gray-600 hover:text-gray-800"
              onClick={toggleForm}
              aria-label="Đóng form"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <ContactForm />
          </div>
        </div>
      )}
    </>
  );
}
