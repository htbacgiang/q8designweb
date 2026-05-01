import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function WorkProcessSection() {
  const accentColor = "var(--q8-primary-700)";
  const steps = [
    { step: 1, label: "BƯỚC 1", title: "Lắng nghe & Thấu hiểu", iconSrc: "/icons/step-1.png" },
    { step: 2, label: "BƯỚC 2", title: "Bản vẽ Sơ bộ", iconSrc: "/icons/step-2.png" },
    { step: 3, label: "BƯỚC 3", title: "Hoàn thiện Hồ sơ Kỹ thuật", iconSrc: "/icons/step-3.png" },
    { step: 4, label: "BƯỚC 4", title: "Thi công & Bàn giao", iconSrc: "/icons/step-4.png" },
  ];
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });
  const stepVariants = {
    hidden: { opacity: 0, y: 16, scale: 0.98 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <section ref={sectionRef} className="py-6 md:py-12 bg-white"
         style={{
        backgroundImage: "url('/images/section-bg-shape-1.svg')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "contain",
      }}
    >

      <div className="container mx-auto px-4">
        {/* Section Header - centered */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-wider mb-3" style={{ color: accentColor }}>
            <span>Quy trình làm việc</span>
          </div>
         
          <p className="text-[var(--q8-primary-600)] text-base md:text-lg leading-relaxed">
            Chúng tôi làm việc theo quy trình rõ ràng từ tiếp nhận nhu cầu đến bàn giao công trình, đảm bảo tiến độ và chất lượng từng giai đoạn.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 md:hidden">
          {steps.map((item, index) => (
            <motion.div
              key={item.step}
              className="w-full text-center py-6 px-4"
              custom={index}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={stepVariants}
            >
              <div className="mb-4 flex justify-center">
                <Image
                  src={item.iconSrc}
                  alt=""
                  width={56}
                  height={56}
                  className="w-12 h-12 object-contain"
                />
              </div>
              <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: accentColor }}>
                {item.label}
              </p>
              <h3 className="text-lg font-bold text-[var(--q8-cod-gray)] leading-tight">
                {item.title}
              </h3>
            </motion.div>
          ))}
        </div>

        <div className="hidden md:flex items-stretch justify-center gap-4 lg:gap-6">
          {steps.map((item, index) => (
            <motion.div
              key={item.step}
              className="flex flex-row items-center flex-1"
              custom={index}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={stepVariants}
            >
              <div className="flex-1 w-full text-center py-6 px-4">
                <div className="mb-4 flex justify-center">
                  <Image
                    src={item.iconSrc}
                    alt=""
                    width={56}
                    height={56}
                    className="w-14 h-14 object-contain"
                  />
                </div>
                <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: accentColor }}>
                  {item.label}
                </p>
                <h3 className="text-xl font-bold text-[var(--q8-cod-gray)] leading-tight">
                  {item.title}
                </h3>
              </div>
              {index < steps.length - 1 && (
                <motion.div
                  className="flex items-center justify-center flex-shrink-0 px-2"
                  style={{ color: accentColor }}
                  aria-hidden
                  initial={{ opacity: 0 }}
                  animate={{ opacity: inView ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: (index + 0.5) * 0.12 }}
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
