"use client";

import { FaCheck, FaArrowRight, FaPhone } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";

export default function AboutSection() {
  const sectionRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsInView(true);
          setHasAnimated(true);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section
      ref={sectionRef}
      className="about-us relative overflow-hidden bg-white py-[100px] h-100vh"
      style={{
        backgroundImage: "url('/images/section-bg-shape-1.svg')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left center",
        backgroundSize: "contain",
      }}
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: About Us Images - trượt từ trái */}
          <div
            className={`about-us-images relative order-1 pr-0 lg:pr-[100px] pb-0 lg:pb-[180px] mr-0 lg:mr-[30px] transition-all duration-1000 ease-out ${
              isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
            style={{
              backgroundImage: "url('/images/about-us-bg-shape.svg')",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "left 60px bottom 40px",
              backgroundSize: "auto",
              transitionDelay: isInView ? "0ms" : "0ms",
            }}
          >
            {/* About Image 1 - normal flow, top left */}
            <div className="about-img-1 block">
              <figure className="about-img-figure group relative overflow-hidden ">
                <Image
                  src="/images/q8-desgin-team.webp"
                  alt="Interior design - living and dining area"
                  width={650}
                  height={456}
                  className="w-full object-cover"
                />
                <span className="about-img-glass absolute inset-0  pointer-events-none transition-transform duration-500 ease-out origin-left scale-x-0 group-hover:scale-x-100" aria-hidden />
              </figure>
            </div>

            {/* About Image 2 - absolute bottom right + Experience counter inside */}
            <div className="about-img-2 absolute w-full max-w-[260px] top-1/2 -translate-y-3/5 right-0 z-[1]">
              <figure className="about-img-figure group relative overflow-hidden ">
                <Image
                  src="/images/service-interior-2.webp"
                  alt="Interior design - living room"
                  width={350}
                  height={293}
                  className="w-full object-cover"
                />
                <span className="about-img-glass absolute inset-0  pointer-events-none transition-transform duration-500 ease-out origin-left scale-x-0 group-hover:scale-x-100" aria-hidden />
              </figure>
              {/* Experience Counter - 15+ Years */}
              <div className="experience-counter absolute -left-8 top-10 -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 rounded-full bg-[#7c877f] flex flex-col items-center justify-center text-white shadow-xl z-10 ring-4 ring-white">
                <h3 className="text-2xl md:text-3xl font-bold leading-none">
                  <span>10</span>+
                </h3>
                <p className="text-[10px] md:text-xs font-bold mt-0.5 text-center uppercase leading-tight">Năm kinh nghiệm</p>
              </div>
            </div>

            {/* Feedback Counter - Positive Feedback (vertical) above circle 95% (vertical) */}
            <div className="feedback-counter absolute right-3 md:right-0 top-[25%] -translate-y-1/2 flex flex-col items-center gap-3 py-4 px-2 z-10">
              <h3
                className="feedback-counter-label text-q8-primary-900 text-xs font-bold uppercase tracking-widest"
                style={{ writingMode: "vertical-rl" }}
              >
                Phản hồi tích cực
              </h3>
              <div className="feedback-counter-circle w-14 h-14 rounded-full bg-[#7c877f] flex items-center justify-center flex-shrink-0">
                <span
                  className="text-white text-sm font-bold"
                  style={{ writingMode: "vertical-rl" }}
                >
                  95%
                </span>
              </div>
            </div>
          </div>

          {/* Right: About Us Content - từng khối trượt từ phải, delay so le */}
          <div className="relative order-2 about-us-content space-y-6">
            <div
              className={`section-title space-y-4 transition-all duration-1000 ease-out ${
                isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
              style={{ transitionDelay: isInView ? "80ms" : "0ms" }}
            >
              <h3 className="text-q8-primary-600 text-sm font-medium uppercase tracking-wide">Giới thiệu về Q8 Design</h3>
              <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-q8-primary-900 leading-tight">
              Đội ngũ chuyên nghiệp với kinh nghiệm dày dặn
              </h2>
              <p className="text-q8-primary-700 text-base leading-relaxed">
              Với hơn 10 năm kinh nghiệm trong lĩnh vực thiết kế và thi công nội thất, đội ngũ Q8 Design luôn cam kết mang đến những giải pháp tối ưu nhất cho mọi không gian sống.

          </p>
            </div>
            <div className="about-us-content-body space-y-6">
              <div
                className={`about-us-content-info space-y-5 transition-all duration-1000 ease-out ${
                  isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                }`}
                style={{ transitionDelay: isInView ? "160ms" : "0ms" }}
              >
                <div className="about-us-content-list">
                  <ul className="space-y-3">
                    {["Đội ngũ kiến trúc sư giàu kinh nghiệm", "Quy trình làm việc chuyên nghiệp, minh bạch","Cam kết tiến độ và chất lượng công trình"].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-q8-primary-700 font-medium">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#7c877f] flex items-center justify-center">
                          <FaCheck className="text-white text-[10px]" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="about-us-content-btn">
                  <Link
                    href="/gioi-thieu"
                    className="btn-default inline-flex items-center gap-2 px-6 py-3 bg-[#7c877f] hover:bg-q8-primary-700 text-white font-semibold  transition-colors"
                  >
                    Xem thêm
                    <FaArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
              <div
                className={`about-us-contact-list flex flex-wrap gap-6 pt-4 border-t border-q8-primary-500/30 transition-all duration-1000 ease-out ${
                  isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: isInView ? "240ms" : "0ms" }}
              >
                <div
                  className={`about-contact-item flex items-start gap-4 transition-all duration-800 ease-out ${
                    isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"
                  }`}
                  style={{ transitionDelay: isInView ? "320ms" : "0ms" }}
                >
                  <div className="icon-box flex-shrink-0 w-12 h-12 rounded-full bg-[#7c877f] flex items-center justify-center">
                    <FaPhone className="text-white w-5 h-5" />
                  </div>
                  <div className="about-contact-content">
                    <p className="text-q8-primary-700 text-sm font-medium uppercase">Hotline</p>
                    <a href="tel:+1235800999" className="text-q8-primary-900 text-xl font-bold hover:underline block">
                    098 811 68 28
                    </a>
                  </div>
                </div>
                <div
                  className={`about-contact-item flex items-start gap-4 transition-all duration-800 ease-out ${
                    isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"
                  }`}
                  style={{ transitionDelay: isInView ? "400ms" : "0ms" }}
                >
                  <div className="icon-box flex-shrink-0 w-14 h-14 rounded-full overflow-hidden bg-q8-primary-500">
                    <Image
                      src="/images/hoang-quoc-huu.jpg"
                      alt="Hoàng Quốc Hữu"
                      width={56}
                      height={56}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="about-contact-content">
                    <h3 className="text-q8-primary-900 font-semibold">Hoàng Quốc Hữu</h3>
                    <p className="text-q8-primary-600 text-sm">CEO Q8 Design</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
