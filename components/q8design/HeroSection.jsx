import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { FaArrowRight, FaArrowLeft, FaPlay, FaChevronLeft, FaChevronRight, FaHome, FaTools, FaUserTie } from "react-icons/fa";
import ContactForm from "../header/ContactForm";

export default function HeroSection() {
  const router = useRouter();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const modalRef = useRef(null);

  // Slide data
  const slides = [
    {
      id: 1,
      title: "Thiết kế nội thất cao cấp",
      subtitle: "Biệt thự & chung cư cao cấp",
      description: "Kiến tạo không gian sống sang trọng với thiết kế hiện đại, tận dụng tối đa ánh sáng và view đẹp",
      icon: FaHome,
      image: "/images/banner-q8-01.webp",
      features: ["Thiết kế 3D chuyên nghiệp", "Nội thất nhập khẩu cao cấp", "Tối ưu không gian sống"],
      cta: "Xem dự án",
      link: "/du-an"
    },
    {
      id: 2,
      title: "Thi công trọn gói",
      subtitle: "Cải tạo & Xây dựng hoàn thiện",
      description: "Dịch vụ thi công trọn gói từ A-Z, đảm bảo chất lượng và tiến độ, mang đến không gian sống hoàn hảo",
      icon: FaTools,
      image: "/images/banner-q8-02.webp",
      features: ["Thi công chuyên nghiệp", "Vật liệu chất lượng cao", "Bảo hành dài hạn"],
      cta: "Tìm hiểu dịch vụ",
      link: "/dich-vu"
    },
    {
      id: 3,
      title: "Tư vấn chuyên nghiệp",
      subtitle: "Hỗ trợ khách hàng 24/7",
      description: "Đội ngũ kiến trúc sư giàu kinh nghiệm tư vấn miễn phí, hỗ trợ khách hàng từ ý tưởng đến hoàn thiện",
      icon: FaUserTie,
      image: "/images/banner-q8-03.webp",
      features: ["Tư vấn miễn phí", "Đội ngũ chuyên nghiệp", "Hỗ trợ 24/7"],
      cta: "Đặt lịch tư vấn",
      link: null // No link, opens form instead
    }
  ];

  // Auto-play slides
  useEffect(() => {
    if (isPaused || isFormOpen) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length, isPaused, isFormOpen]);

  // Navigation functions
  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Handle CTA button click
  const handleCTAClick = (slide) => {
    if (slide.link) {
      router.push(slide.link);
    } else {
      toggleForm();
    }
  };

  // Toggle form visibility
  const toggleForm = useCallback(() => {
    setIsFormOpen((prev) => !prev);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isFormOpen) return;
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFormOpen, prevSlide, nextSlide]);

  // Close form with Escape key and focus trap
  useEffect(() => {
    if (!isFormOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") toggleForm();
    };

    const modal = modalRef.current;
    const elems = modal?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = elems?.[0];
    const last = elems?.[elems.length - 1];

    const trapTab = (e) => {
      if (e.key === "Tab") {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    first?.focus();
    modal?.addEventListener("keydown", trapTab);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      modal?.removeEventListener("keydown", trapTab);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFormOpen, toggleForm]);

  return (
    <>
      <style jsx>{`
        .nav-arrow-btn {
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(8px);
          border: 2px solid rgba(255, 255, 255, 0.3);
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }
        
        .nav-arrow-btn:hover {
          background: rgba(0, 0, 0, 0.6);
          border-color: rgba(255, 255, 255, 0.6);
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
        }
        
        .nav-arrow-btn:active {
          transform: scale(0.95);
        }
        
        @media (max-width: 768px) {
          .nav-arrow-btn {
            width: 40px;
            height: 40px;
          }
          
          .hero-content {
            transform: translateY(-40px);
          }
          
          .nav-arrows-container {
            transform: translateY(-40px);
          }
        }
        
        .hero-section {
          height: calc(100vh - 80px) !important;
          max-height: calc(100vh - 80px) !important;
          overflow: hidden !important;
        }
        
        @media (max-width: 768px) {
          .hero-section {
            height: calc(100vh - 80px) !important;
            max-height: calc(100vh - 80px) !important;
          }
        }
        
        .slide-dot {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .slide-dot:hover {
          transform: scale(1.2);
        }
        
        /* Glass effect animation from left to right */
        @keyframes glassSweep {
          0% {
            transform: translateX(-100%) skewX(-15deg);
          }
          100% {
            transform: translateX(200%) skewX(-15deg);
          }
        }
        
        /* Glass effect for text */
        .hero-text-glass {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          padding: 8px 16px;
          border-radius: 12px;
          position: relative;
          overflow: hidden;
        }
        
        .hero-text-glass::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 30%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          transform: translateX(-100%) skewX(-15deg);
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .hero-text-glass:hover::before {
          animation: glassSweep 1.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .hero-text-glass:hover {
          /* Only glass sweep effect, no background or border */
        }
        
        /* Glass effect for CTA button */
        .hero-cta-glass {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        
        .hero-cta-glass::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 30%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
          );
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          transform: translateX(-100%) skewX(-15deg);
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .hero-cta-glass:hover::before {
          animation: glassSweep 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .hero-cta-glass:hover {
          background: rgba(17, 24, 39, 0.7);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          transform: translateY(-2px);
        }
        
        .hero-cta-glass span,
        .hero-cta-glass svg {
          position: relative;
          z-index: 1;
        }
      `}</style>
      <section
        className="hero-section relative w-full overflow-hidden"
        style={{ 
          height: 'calc(100vh - 80px)',
          maxHeight: 'calc(100vh - 80px)',
          marginTop: 0, 
          paddingTop: 0, 
          top: 0,
          position: 'relative',
          margin: 0,
          padding: 0
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Background Image */}
        <div className="absolute inset-0" style={{ top: 0, height: '100%', maxHeight: '100%', overflow: 'hidden' }}>
          <Image
            key={currentSlide}
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            layout="fill"
            quality={100}
            objectFit="cover"
            className="brightness-90 transition-opacity duration-1000"
            priority={currentSlide === 0}
            onError={(e) => (e.target.src = "/images/fallback.png")}
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>

        {/* Content */}
        <div className="hero-content relative z-20 flex mb-10 flex-col items-center justify-center h-full text-center text-white">
          <div
            key={`content-${currentSlide}`}
            className="flex flex-col items-center text-center"
          >
            <h2 className="text-xl md:text-4xl font-bold">
              <span className="uppercase">Q8 Design {slides[currentSlide].title}</span>
            </h2>
            <p className="text-gray-100 text-xl md:text-2xl mb-4 uppercase">
              {slides[currentSlide].subtitle}
            </p>
         
            <button
              onClick={() => handleCTAClick(slides[currentSlide])}
              className="hero-cta-glass flex items-center bg-gray-900 text-white px-6 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400"
              aria-label={slides[currentSlide].cta}
            >
              <span>{slides[currentSlide].cta}</span>
              <FaArrowRight className="ml-2" />
            </button>
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="nav-arrows-container hidden  absolute inset-y-0 left-4 md:left-6 md:flex items-center z-30">
          <button
            onClick={prevSlide}
            aria-label="Slide trước"
            className="nav-arrow-btn group focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent rounded-full"
          >
            <FaArrowLeft className="text-white text-xl md:text-2xl transition-transform group-hover:scale-110" />
          </button>
        </div>
        <div className="nav-arrows-container hidden md:flex absolute inset-y-0 right-4 md:right-6 items-center z-30">
          <button
            onClick={nextSlide}
            aria-label="Slide tiếp theo"
            className="nav-arrow-btn group focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent rounded-full"
          >
            <FaArrowRight className="text-white text-xl md:text-2xl transition-transform group-hover:scale-110" />
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 md:bottom-8 left-0 right-0 flex justify-center space-x-2 z-30">
          {slides.map((_, idx) => (
            <button
              key={idx}
              className={`slide-dot transition-all duration-300 ${
                currentSlide === idx 
                  ? "w-8 h-3 bg-white opacity-100" 
                  : "w-3 h-3 bg-white opacity-50 hover:opacity-75"
              } rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent`}
              onClick={() => goToSlide(idx)}
              aria-label={`Chuyển đến slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Registration Form Modal */}
      {isFormOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) toggleForm();
          }}
        >
          <div
            ref={modalRef}
            className="rounded-lg w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-5xl relative bg-white"
          >
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              onClick={toggleForm}
              aria-label="Close form"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            {/* Registration Form */}
            <ContactForm />
          </div>
        </div>
      )}
    </>
  );
}