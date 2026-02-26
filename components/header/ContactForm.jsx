"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    service: "thiet-ke-noi-that", // Default service for Q8 Design
  });
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({});
  const leftSectionRef = useRef(null);
  const rightSectionRef = useRef(null);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Vui lòng nhập họ và tên";
    if (!formData.phone.trim()) newErrors.phone = "Vui lòng nhập số điện thoại";
    else if (!/^(0|\+84)[3|5|7|8|9][0-9]{8}$/.test(formData.phone))
      newErrors.phone = "Số điện thoại không hợp lệ (VD: 0987654321)";
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Email không hợp lệ";
    if (formData.message && formData.message.length > 500)
      newErrors.message = "Tin nhắn không được vượt quá 500 ký tự";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("slide-up");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    const leftSection = leftSectionRef.current;
    const rightSection = rightSectionRef.current;

    if (rightSection) observer.observe(rightSection);
    if (leftSection && window.innerWidth >= 768) observer.observe(leftSection);

    return () => {
      if (rightSection) observer.unobserve(rightSection);
      if (leftSection) observer.unobserve(leftSection);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setStatus("Đang gửi...");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus("Đăng ký tư vấn thành công! Chúng tôi sẽ liên hệ lại sớm nhất.");
        setFormData({ name: "", phone: "", email: "", message: "", service: "thiet-ke-noi-that" });
        setTimeout(() => setStatus(""), 5000);
      } else {
        throw new Error(result.message || "Không thể gửi yêu cầu");
      }
    } catch (error) {
      setStatus("Lỗi: Vui lòng thử lại hoặc liên hệ qua hotline.");
    }
  };

  return (
    <div className="">
      <div className="max-w-5xl mx-auto bg-white  overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12">
          <div ref={leftSectionRef} className="relative hidden md:block md:col-span-5 h-64 md:h-auto opacity-0">
            <Image
              src="/images/tu-van.webp"
              alt="Q8 Design contact"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
              priority
            />
          </div>
          <div ref={rightSectionRef} className="md:col-span-7 px-4 md:px-8 py-6 md:py-10 opacity-0">
            <div className="flex items-center gap-2 text-[var(--q8-primary-600)] text-sm font-bold uppercase mb-2">
              <h2 className="inline-flex items-center gap-1">
                Form liên hệ
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </h2>
            </div>
            <p className="text-lg md:text-2xl font-bold text-[var(--q8-cod-gray)] tracking-tight mb-3">
              Đội ngũ Q8 rất mong <span className="text-q8-primary-700">nhận phản hồi từ bạn</span>
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5" role="form" aria-label="Form liên hệ">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                <div>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Họ và tên*"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={`w-full h-10 md:h-11 px-3 md:px-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-q8-primary-900 ${errors.name ? "border-red-500" : "border-q8-primary-500"
                      }`}
                  />
                  {errors.name && (
                    <p id="name-error" className="text-red-600 text-sm mt-1">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email*"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={`w-full h-10 md:h-11 px-3 md:px-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-q8-primary-900 ${errors.email ? "border-red-500" : "border-q8-primary-500"
                      }`}
                  />
                  {errors.email && (
                    <p id="email-error" className="text-red-600 text-sm mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Số điện thoại *"
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                  className={`w-full h-10 md:h-11 px-3 md:px-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-q8-primary-900 ${errors.phone ? "border-red-500" : "border-q8-primary-500"
                    }`}
                />
                {errors.phone && (
                  <p id="phone-error" className="text-red-600 text-sm mt-1">
                    {errors.phone}
                  </p>
                )}
              </div>
              <div>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Lời nhắn (tùy chọn)"
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className={`w-full min-h-[100px] md:min-h-[140px] px-3 md:px-4 py-2.5 md:py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-q8-primary-900 resize-none ${errors.message ? "border-red-500" : "border-q8-primary-500"
                    }`}
                />
                {errors.message && (
                  <p id="message-error" className="text-red-600 text-sm mt-1">
                    {errors.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={status === "Đang gửi..."}
                className="btn-default inline-flex items-center gap-2 px-5 md:px-6 py-2 md:py-3 bg-[#7c877f] hover:bg-q8-primary-700 text-white font-semibold  transition-colors"
                aria-disabled={status === "Đang gửi..."}
              >
                {status === "Đang gửi..." ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Đang gửi...
                  </>
                ) : (
                  <>
                    Gửi <span>→</span>
                  </>
                )}
              </button>
            </form>
            {status && (
              <p
                className={`mt-2 md:mt-3 ${status.includes("thành công") ? "text-q8-primary-600" : "text-red-600"
                  }`}
              >
                {status}
              </p>
            )}
          </div>
        </div>
      </div>
      <style jsx>{`
        .opacity-0 {
          opacity: 0;
        }
        .slide-up {
          animation: slideUp 0.6s ease-out forwards;
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
