"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

export default function ServicesSection() {
  const services = [
    {
      title: "Thiết kế Kiến trúc",
      description: "Chuyên biến ý tưởng thành những công trình kiến trúc độc đáo, tối ưu công năng cho nhà phố và biệt thự.",
      image: "/images/service-architecture.webp",
      slug: "thiet-ke-kien-truc"
    },
    {
      title: "Thiết kế Nội thất",
      description: "Tạo ra không gian sống cá nhân hóa, phù hợp với phong cách và nhu cầu của bạn.",
      image: "/images/service-interior-2.webp",
      slug: "thiet-ke-noi-that"
    },
    {
      title: "Thi công trọn gói",
      description: "Hoàn thiện công trình đúng tiến độ, đảm bảo chất lượng và tính thẩm mỹ theo thiết kế.",
      image: "/images/service-construction.webp",
      slug: "thi-cong-tron-goi"
    },
    {
      title: "Cải tạo không gian",
      description: "Hồi sinh không gian cũ, mang lại vẻ đẹp và công năng mới cho ngôi nhà của bạn.",
      image: "/images/service-renovation.webp",
      slug: "cai-tao-noi-that-chung-cu"
    }
  ];

  const gridRef = useRef(null);
  const isGridInView = useInView(gridRef, { once: true, amount: 0.15 });

  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handler = (e) => setIsDesktop(e.matches);
    setIsDesktop(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

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
    <section className="py-6 md:py-12 bg-white">
      <div className="container mx-auto px-4 ">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 mb-12">
          <div className="lg:col-span-6">
            <div className="flex items-center gap-2 text-[var(--q8-primary-600)] text-sm font-bold uppercase mb-2">
              <h2 className="inline-flex items-center gap-1">
                Dịch vụ của Q8 Design
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </h2>
            </div>
            <p className="text-xl font-bold text-[var(--q8-cod-gray)] leading-tight tracking-tight">
              Giải pháp vẹn tròn cho
              <span className="text-[#c4a77d]"> hành trình xây tổ ấm</span>
            </p>
          </div>

        </div>

        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
          {services.map((service, index) => {
            const fromLeft = index < 2;
            return (
              <motion.div
                key={index}
                custom={fromLeft ? index : index - 2}
                initial="hidden"
                animate={isGridInView ? "visible" : "hidden"}
                variants={cardVariants(fromLeft)}
                className="h-full"
              >
                <Link href={`/dich-vu/${service.slug}`} className="block h-full">
                  <motion.div
                    className="relative aspect-[3/4] sm:aspect-[4/5] min-h-[260px] sm:min-h-[320px] overflow-hidden"
                    initial={false}
                    whileHover={
                      isDesktop
                        ? {
                          y: -10,
                          boxShadow: "0 24px 48px rgba(0,0,0,0.2)",
                          transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                        }
                        : undefined
                    }
                    whileTap={
                      !isDesktop
                        ? {
                          scale: 0.98,
                          boxShadow: "0 16px 32px rgba(0,0,0,0.15)",
                          transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
                        }
                        : undefined
                    }
                    style={{
                      boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                    }}
                  >
                    <motion.div
                      className="absolute inset-0"
                      initial={false}
                      whileHover={
                        isDesktop
                          ? {
                            scale: 1.08,
                            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                          }
                          : undefined
                      }
                      whileTap={
                        !isDesktop
                          ? {
                            scale: 1.03,
                            transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
                          }
                          : undefined
                      }
                    >
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                    </motion.div>

                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"
                      aria-hidden
                      initial={false}
                      whileHover={
                        isDesktop
                          ? {
                            background:
                              "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.1) 100%)",
                            transition: { duration: 0.35 },
                          }
                          : undefined
                      }
                      whileTap={
                        !isDesktop
                          ? {
                            background:
                              "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.15) 100%)",
                            transition: { duration: 0.2 },
                          }
                          : undefined
                      }
                    />

                    <motion.div
                      className="absolute top-3 right-3 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/90 flex items-center justify-center text-[var(--q8-primary-700)] z-20"
                      initial={false}
                      whileHover={
                        isDesktop
                          ? {
                            scale: 1.15,
                            x: 4,
                            y: -4,
                            transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                          }
                          : undefined
                      }
                      whileTap={
                        !isDesktop
                          ? {
                            scale: 1.05,
                            x: 2,
                            y: -2,
                            transition: { duration: 0.2 },
                          }
                          : undefined
                      }
                    >
                      <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 17L17 7M17 7H7M17 7v10" />
                      </svg>
                    </motion.div>

                    <motion.div
                      className="absolute bottom-0 left-0 right-0 p-4 md:p-6 z-20"
                      initial={false}
                      whileHover={
                        isDesktop
                          ? {
                            y: -6,
                            transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                          }
                          : undefined
                      }
                      whileTap={
                        !isDesktop
                          ? {
                            y: -3,
                            transition: { duration: 0.2 },
                          }
                          : undefined
                      }
                    >
                      <h3 className="text-base md:text-xl font-bold text-white mb-1 md:mb-2 leading-tight"
                        style={{
                          overflow: "hidden",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {service.title}
                      </h3>
                      <motion.p
                        className="text-white/90 text-xs md:text-sm leading-relaxed"
                        initial={false}
                        whileHover={
                          isDesktop
                            ? {
                              opacity: 1,
                              transition: { duration: 0.25 },
                            }
                            : undefined
                        }
                        whileTap={
                          !isDesktop
                            ? {
                              opacity: 1,
                              transition: { duration: 0.2 },
                            }
                            : undefined
                        }
                        style={{
                          overflow: "hidden",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {service.description}
                      </motion.p>
                    </motion.div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* CTA - See All Services */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/dich-vu"
              className="btn-default inline-flex items-center gap-2 px-6 py-3 bg-[#7c877f] hover:bg-q8-primary-700 text-white font-semibold  transition-colors"
            >
              Tất cả dịch vụ
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
