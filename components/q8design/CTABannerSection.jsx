"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FaPhone, FaEnvelope } from "react-icons/fa";
import ContactForm from "../header/ContactForm";

export default function CTABannerSection() {
  const [open, setOpen] = useState(false);
  const modalRef = useRef(null);
  const prevFocusRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const modal = modalRef.current;
    const focusables = modal?.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const first = focusables?.[0];
    const last = focusables?.[focusables.length - 1];

    const onEscape = (e) => e.key === "Escape" && setOpen(false);
    const onTab = (e) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey && document.activeElement === first) e.preventDefault(), last?.focus();
      else if (!e.shiftKey && document.activeElement === last) e.preventDefault(), first?.focus();
    };

    prevFocusRef.current = document.activeElement;
    if (first && typeof first.focus === "function") {
      try {
        first.focus({ preventScroll: true });
      } catch {
        first.focus();
      }
    }
    window.addEventListener("keydown", onEscape);
    modal?.addEventListener("keydown", onTab);
    return () => {
      window.removeEventListener("keydown", onEscape);
      modal?.removeEventListener("keydown", onTab);
    };
  }, [open]);

  useEffect(() => {
    const html = document.documentElement;
    if (open) {
      html.style.overflow = "hidden";
      html.style.overscrollBehavior = "contain";
      document.body.style.overflow = "hidden";
      document.body.style.overscrollBehavior = "contain";
      document.body.style.touchAction = "none";
    } else {
      html.style.overflow = "";
      html.style.overscrollBehavior = "";
      document.body.style.overflow = "";
      document.body.style.overscrollBehavior = "";
      document.body.style.touchAction = "";
      const prev = prevFocusRef.current;
      if (prev && typeof prev.focus === "function") {
        try {
          prev.focus({ preventScroll: true });
        } catch {
          prev.focus();
        }
      }
    }
  }, [open]);

  return (
    <section
      className="relative min-h-[30vh] flex items-center overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/images/banner2.jpg')",
        backgroundAttachment: "fixed",
      }}
      aria-label="Kêu gọi hành động - Đặt lịch tư vấn"
    >
      {/* Overlay nhẹ để chữ trắng dễ đọc; nội dung bên dưới vẫn trong suốt */}
      <div className="absolute inset-0 z-[1] bg-black/70" aria-hidden />

      {/* Nội dung - nền trong suốt, scroll theo trang */}
      <div className="container mx-auto px-4 relative z-10 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Trái: Tiêu đề + mô tả */}
          <div className="lg:col-span-7">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              Hiện thực hóa ngôi nhà mơ ước cùng Q8 Design Việt Nam!
            </h2>
            <p className="text-[#D3D3D3] text-base md:text-lg leading-relaxed max-w-2xl">
              Đừng để nỗi lo về kỹ thuật hay vật liệu ngăn cản bạn sở hữu không gian sống thấu cảm. Hãy để Q8 Design cùng bạn viết tiếp chương mới của tổ ấm, bằng sự tử tế và khắt khe nhất.</p>
          </div>

          {/* Phải: Nút CTA + Liên hệ */}
          <div className="lg:col-span-4 md:col-span-6 flex flex-col items-start lg:items-start">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-block w-full px-8 py-4  bg-[#D5C1AE] text-[#333] font-semibold uppercase tracking-wider text-sm hover:bg-[#c9b39d] transition-colors mb-10"
              aria-haspopup="dialog"
              aria-expanded={open}
            >
              Đặt lịch tư vấn
            </button>

            <div className="flex flex-wrap gap-8 md:gap-8 lg:gap-12">
              <a
                href="tel:0988116828"
                className="flex items-start gap-4 group"
              >
                <span className="flex-shrink-0 w-11 h-11 rounded bg-[#D5C1AE] border border-[#c4ad9a] flex items-center justify-center text-[#333] group-hover:bg-[#c9b39d] transition-colors">
                  <FaPhone className="w-4 h-4" />
                </span>
                <span className="block">
                  <span className="block text-white font-semibold">098 811 68 28</span>
                  <span className="block text-[#C0C0C0] text-sm mt-0.5">Gọi tư vấn</span>
                </span>
              </a>
              <a
                href="mailto:info@q8design.vn"
                className="flex items-start gap-4 group"
              >
                <span className="flex-shrink-0 w-11 h-11 rounded bg-[#D5C1AE] border border-[#c4ad9a] flex items-center justify-center text-[#333] group-hover:bg-[#c9b39d] transition-colors">
                  <FaEnvelope className="w-4 h-4" />
                </span>
                <span className="block">
                  <span className="block text-white font-semibold">info@q8design.vn</span>
                  <span className="block text-[#C0C0C0] text-sm mt-0.5">Liên hệ email</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            ref={modalRef}
            className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-xl"
          >
            <div className="sticky top-0 z-50 flex justify-end p-2 bg-white/95 backdrop-blur border-b">
              <button
                type="button"
                className="inline-flex items-center gap-2 px-2 py-2 rounded-full bg-gray-200 text-gray-700 hover:bg-red-500 text-white focus:outline-none"
                onClick={() => setOpen(false)}
                aria-label="Đóng popup"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 md:p-6">
              <ContactForm />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
