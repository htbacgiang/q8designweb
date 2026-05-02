import { useState } from "react";

export default function SidebarCTAForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Vui lòng nhập họ tên";
    if (!formData.phone.trim()) newErrors.phone = "Vui lòng nhập số điện thoại";
    else if (!/^(0|\+84)[3|5|7|8|9][0-9]{8}$/.test(formData.phone))
      newErrors.phone = "Số điện thoại không hợp lệ";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, service: "tu-van" }),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", phone: "", message: "" });
        setTimeout(() => setStatus(""), 5000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.07)] sticky top-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#c4a77d] to-[#b3976e] p-5 pb-4 flex items-center gap-3 text-white">
        <div className="bg-white/20 rounded-[10px] p-2 shrink-0 flex items-center justify-center">
          <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-semibold tracking-wider uppercase opacity-90">
            Đăng ký nhận tư vấn miễn phí
          </p>
        </div>
      </div>

      {/* Decorative divider */}
      <div className="flex items-center gap-1.5 pt-3 px-5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#c4a77d] opacity-40 shrink-0" />
        <span className="flex-1 h-px bg-gradient-to-r from-[#c4a77d]/40 to-transparent" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#c4a77d] opacity-40 shrink-0" />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="px-5 pt-3.5 pb-4 flex flex-col gap-2.5" noValidate>
        {/* Name */}
        <div>
          <input
            id="sidebar-name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Họ và tên *"
            className={`w-full h-10 px-3.5 border-[1.5px] border-gray-300 rounded-lg text-[13.5px] outline-none transition-all duration-200 bg-gray-50 text-gray-800 focus:border-[#c4a77d] focus:ring-4 focus:ring-[#c4a77d]/10 focus:bg-white ${errors.name ? "!border-red-500" : ""
              }`}
          />
          {errors.name && <p className="text-[11.5px] text-red-500 mt-1">{errors.name}</p>}
        </div>

        {/* Phone */}
        <div>
          <input
            id="sidebar-phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Số điện thoại *"
            className={`w-full h-10 px-3.5 border-[1.5px] border-gray-300 rounded-lg text-[13.5px] outline-none transition-all duration-200 bg-gray-50 text-gray-800 focus:border-[#c4a77d] focus:ring-4 focus:ring-[#c4a77d]/10 focus:bg-white ${errors.phone ? "!border-red-500" : ""
              }`}
          />
          {errors.phone && <p className="text-[11.5px] text-red-500 mt-1">{errors.phone}</p>}
        </div>

        {/* Message */}
        <div>
          <textarea
            id="sidebar-message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Nội dung cần tư vấn (tuỳ chọn)"
            rows={3}
            className="w-full py-2.5 px-3.5 border-[1.5px] border-gray-300 rounded-lg text-[13.5px] outline-none transition-all duration-200 resize-none bg-gray-50 text-gray-800 focus:border-[#c4a77d] focus:ring-4 focus:ring-[#c4a77d]/10 focus:bg-white"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full h-11 bg-gradient-to-br from-[#c4a77d] to-[#b3976e] text-white text-[14px] font-semibold rounded-[10px] transition-all duration-200 mt-0.5 hover:opacity-90 hover:-translate-y-px disabled:opacity-65 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-1.5"
        >
          {status === "loading" ? (
            <span className="flex items-center justify-center gap-2">
              <span className="inline-block w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              Đang gửi...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-1.5">
              Gửi yêu cầu tư vấn
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          )}
        </button>

        {/* Status messages */}
        {status === "success" && (
          <div className="flex items-center gap-1.5 text-[12.5px] text-[#937b56] bg-[#fdfbf7] border border-[#eaddc7] rounded-lg py-2 px-3 font-medium">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            Gửi thành công! Chúng tôi sẽ liên hệ sớm.
          </div>
        )}
        {status === "error" && (
          <div className="text-[12.5px] text-red-600 bg-red-50 border border-red-200 rounded-lg py-2 px-3">
            Có lỗi xảy ra. Vui lòng thử lại!
          </div>
        )}
      </form>

      {/* Hotline badge */}
      <div className="flex items-center gap-1.5 text-[12.5px] text-gray-500 px-5 pt-2.5 pb-3.5 border-t border-gray-100">
        <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        Hotline: <a href="tel:0988116828" className="text-[#c4a77d] font-bold no-underline hover:underline">098 811 68 28</a>
      </div>
    </div>
  );
}
