"use client";
import { useState, useEffect, useRef } from "react";

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
    if (!formData.message.trim()) newErrors.message = "Vui lòng nhập yêu cầu tư vấn";
    else if (formData.message.length > 500)
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
      <div className="max-w-8xl mx-auto">
        <div className="bg-q8-primary-50 borde rounded-3xl p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div ref={leftSectionRef} className="opacity-0 md:block hidden">
              <h2 className="text-xl font-bold text-q8-primary-600 uppercase tracking-wide mb-2">
                Đăng ký tư vấn
              </h2>
              <h3 className="text-xl font-bold text-q8-primary-900 mb-4">
                Tư vấn thiết kế không gian sống của Q8 Design
              </h3>
              <p className="text-lg text-q8-primary-700">
                Q8 Design chuyên cung cấp dịch vụ thiết kế kiến trúc và nội thất toàn diện. Từ thiết kế nhà phố, biệt thự đến nội thất chung cư, văn phòng. Chúng tôi cam kết mang đến những không gian sống độc đáo, hiện đại và phù hợp với phong cách riêng của bạn.
              </p>
              <p>
                Liên hệ ngay để nhận tư vấn miễn phí và báo giá chi tiết cho dự án của bạn!
              </p>
            </div>

            <div ref={rightSectionRef} className="opacity-0">
              <form
                onSubmit={handleSubmit}
                className="space-y-4"
                role="form"
                aria-label="Form đăng ký tư vấn thiết kế Q8 Design"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Họ và tên"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-q8-primary-600 ${
                        errors.name ? "border-red-500" : "border-q8-primary-300"
                      }`}
                    />
                    {errors.name && (
                      <p id="name-error" className="text-red-500 text-sm mt-1">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Số điện thoại"
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? "phone-error" : undefined}
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-q8-primary-600 ${
                        errors.phone ? "border-red-500" : "border-q8-primary-300"
                      }`}
                    />
                    {errors.phone && (
                      <p id="phone-error" className="text-red-500 text-sm mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email của bạn (tùy chọn)"
                                          aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-q8-primary-600 ${
                        errors.email ? "border-red-500" : "border-q8-primary-300"
                      }`}
                  />
                  {errors.email && (
                    <p id="email-error" className="text-red-500 text-sm mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Mô tả chi tiết dự án của bạn (loại nhà, diện tích, phong cách, ngân sách dự kiến...)"
                      aria-describedby={errors.message ? "message-error" : undefined}
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-q8-primary-600 h-32 resize-none ${
                        errors.message ? "border-red-500" : "border-q8-primary-300"
                      }`}
                    />
                    <div className="absolute bottom-2 right-2 text-xs text-q8-primary-400">
                      {formData.message.length}/500
                    </div>
                  </div>
                  {errors.message && (
                    <p id="message-error" className="text-red-500 text-sm mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={status === "Đang gửi..."}
                  className="w-full bg-q8-primary-900 text-white font-bold py-3 rounded-full hover:bg-q8-primary-700 transition-colors disabled:bg-q8-primary-300 flex items-center justify-center gap-2"
                  aria-disabled={status === "Đang gửi..."}
                >
                  {status === "Đang gửi..." ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Đang gửi...
                    </>
                  ) : (
                    <>
                      Đăng ký tư vấn <span>→</span>
                    </>
                  )}
                </button>
              </form>
              {status && (
                <p
                  className={`mt-2 text-center ${
                    status.includes("thành công") ? "text-q8-primary-600" : "text-red-600"
                  }`}
                >
                  {status}
                </p>
              )}
            </div>
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
