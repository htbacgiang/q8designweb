"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

export default function ServicesSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handler = (e) => setIsDesktop(e.matches);
    setIsDesktop(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const xTransform = useTransform(
    scrollYProgress,
    [0, 0.35, 0.7],
    isDesktop ? [800, 0, -800] : [200, 0, -200]
  );

  const services = [
    {
      overline: "Thiết kế. Sáng tạo.",
      title: "Thiết kế Kiến trúc",
      description:
        "Chuyên biến ý tưởng thành công trình độc đáo, tối ưu công năng và bền vững.",
      slug: "thiet-ke-kien-truc",
      icon: "/icons/blueprint.png",

    },
    {
      overline: "Không gian. Cảm xúc.",
      title: "Thiết kế Nội thất",
      description:
        "Tạo không gian sống cá nhân hóa, phù hợp phong cách và nhu cầu của bạn.",
      icon: "/icons/livingroom.png",
      slug: "thiet-ke-noi-that",
    },
    {
      overline: "Chuyên nghiệp. Chuẩn chỉ.",
      title: "Thi công trọn gói",
      description:
        "Thi công đúng tiến độ, đảm bảo chất lượng và thẩm mỹ theo thiết kế.",
      icon: "/icons/architect.png",
      slug: "thi-cong-tron-goi",
    },
    {
      overline: "Tái tạo. Nâng tầm.",
      title: "Cải tạo không gian",
      description:
        "Hồi sinh không gian cũ, tối ưu công năng và thẩm mỹ cho ngôi nhà bạn.",
      icon: "/icons/house.png",
      slug: "cai-tao-noi-that-chung-cu",
    },
  ];

  const gridRef = useRef(null);
  const isGridInView = useInView(gridRef, { once: true, amount: 0.15 });

  const itemVariants = (i) => ({
    hidden: { opacity: 0, x: i % 2 === 0 ? -24 : 24, y: 12 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 },
    },
  });


  const cardVariants = (fromLeft) => ({
    hidden: {
      opacity: 0,
      x: fromLeft ? -32 : 32,
    },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.9,
        delay: (fromLeft ? i : i - 2) * 0.2,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  });

  return (
    <section ref={containerRef} className="relative py-12 bg-white overflow-hidden">
      {/* Background Decor Text */}
      <div className="absolute top-5 md:top-[40%] left-0 w-full flex justify-center pointer-events-none opacity-[0.06] select-none overflow-hidden">
        <h2 className="text-3xl md:text-[10vw] font-black uppercase text-gray-900 leading-none whitespace-nowrap text-center">
          Q8 Design & Build
        </h2>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Top 3D Image Section */}
        <div className="flex justify-center">
          <motion.div
            style={{ x: xTransform }}
            className="relative w-full max-w-6xl aspect-[16/9] z-20"
          >
            <Image
              src="/images/counter-img-1.png"
              alt="3D Floor Plan Architecture"
              fill
              className="object-contain"
              priority
            />
          </motion.div>
        </div>
        <div className="mb-10">
          <h2 className="flex items-center gap-2 text-[var(--q8-primary-600)] text-sm font-bold uppercase mb-2">
            Dịch vụ của Q8 Design
          </h2>
          <p className="text-[#7a6a5e] mt-2">
            Giải pháp trọn gói cho kiến trúc và nội thất cao cấp
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => {
            const isDark = i % 2 === 1;
            const bg = isDark ? "bg-[#2b201a]" : "bg-[#d8c7b5]";
            const text = isDark ? "text-white" : "text-[#2b201a]";
            const subText = isDark ? "text-white/80" : "text-[#6b5a4d]";
            return (
              <motion.div
                key={s.slug}
                variants={itemVariants(i)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className={`${bg} p-8 flex flex-col items-center text-center group`}
              >
                <p className={`text-xs tracking-widest font-semibold uppercase ${subText}`}>
                  {s.overline}
                </p>
                <h3 className={`mt-3 text-xl md:text-2xl font-bold ${text}`}>
                  {s.title}
                </h3>
                <motion.div
                  className="mt-6 h-20 w-20 relative"
                  whileHover={{ y: -4, transition: { duration: 0.25 } }}
                >
                  <Image
                    src={s.icon}
                    alt={s.title}
                    fill
                    className="object-contain"
                    style={{ filter: "brightness(0) invert(1)" }}
                  />
                </motion.div>
                <motion.span
                  className={`mt-3 h-[2px] ${isDark ? "bg-white/60" : "bg-[#2b201a]/60"}`}
                  initial={{ width: 24, opacity: 0.7 }}
                  whileHover={{ width: 64, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <p className={`mt-6 text-sm leading-relaxed max-w-xs ${subText}`}>
                  {s.description}
                </p>
                <Link
                  href={`/dich-vu/${s.slug}`}
                  className={`mt-8 inline-flex items-center gap-2 text-sm font-semibold ${text}`}
                >
                  Chi tiết dịch vụ
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
