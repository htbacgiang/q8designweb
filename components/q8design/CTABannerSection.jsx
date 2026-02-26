"use client";

import Link from "next/link";
import { FaPhone, FaEnvelope } from "react-icons/fa";

export default function CTABannerSection() {
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
              Hiện thực hóa giấc mơ kiến trúc cùng Q8 Design Việt Nam!
            </h2>
            <p className="text-[#D3D3D3] text-base md:text-lg leading-relaxed max-w-xl">
              Mở ra thế giới nơi thiết kế gặp định mệnh. Không gian mơ ước của bạn chỉ cách một cú nhấp. Hãy biến nó thành hiện thực.
            </p>
          </div>

          {/* Phải: Nút CTA + Liên hệ */}
          <div className="lg:col-span-4 md:col-span-6 flex flex-col items-start lg:items-start">
            <Link
              href="/lien-he"
              className="inline-block w-full px-8 py-4 rounded-md bg-[#D5C1AE] text-[#333] font-semibold uppercase tracking-wider text-sm hover:bg-[#c9b39d] transition-colors mb-10"
            >
              Đặt lịch tư vấn
            </Link>

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
    </section>
  );
}
