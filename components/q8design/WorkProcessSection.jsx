import Image from "next/image";

export default function WorkProcessSection() {
  const accentColor = "var(--q8-primary-700)";
  const steps = [
    { step: 1, label: "BƯỚC 1", title: "Khám phá & Xác định", iconSrc: "/icons/step-1.png" },
    { step: 2, label: "BƯỚC 2", title: "Phát triển Thiết kế", iconSrc: "/icons/step-2.png" },
    { step: 3, label: "BƯỚC 3", title: "Tài liệu & Duyệt", iconSrc: "/icons/step-3.png" },
    { step: 4, label: "BƯỚC 4", title: "Thi công & Hoàn thiện", iconSrc: "/icons/step-4.png" },
  ];

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header - centered */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-wider mb-3" style={{ color: accentColor }}>
            <span className="inline-block w-2 h-2 bg-current rounded-sm" aria-hidden />
            <span>Quy trình làm việc</span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--q8-cod-gray)] leading-tight tracking-tight mb-4">
            Các bước liền mạch, không gian đẳng cấp.
          </h2>
          <p className="text-[var(--q8-primary-600)] text-base md:text-lg leading-relaxed">
            Chúng tôi làm việc theo quy trình rõ ràng từ tiếp nhận nhu cầu đến bàn giao công trình, đảm bảo tiến độ và chất lượng từng giai đoạn.
          </p>
        </div>

        {/* Four steps with arrows */}
        <div className="flex flex-col md:flex-row items-stretch justify-center gap-6 md:gap-4 lg:gap-6">
          {steps.map((item, index) => (
            <div key={item.step} className="flex flex-col md:flex-row items-center flex-1">
              {/* Step card */}
              <div className="flex-1 w-full max-w-[280px] md:max-w-none text-center py-6 px-4">
                <div className="mb-4 flex justify-center">
                  <Image
                    src={item.iconSrc}
                    alt=""
                    width={56}
                    height={56}
                    className="w-12 h-12 md:w-14 md:h-14 object-contain"
                  />
                </div>
                <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: accentColor }}>
                  {item.label}
                </p>
                <h3 className="text-lg md:text-xl font-bold text-[var(--q8-cod-gray)] leading-tight">
                  {item.title}
                </h3>
              </div>
              {/* Arrow between steps - hidden after last */}
              {index < steps.length - 1 && (
                <div className="hidden md:flex items-center justify-center flex-shrink-0 px-1 lg:px-2" style={{ color: accentColor }} aria-hidden>
                  <svg className="w-6 h-6 lg:w-8 lg:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
