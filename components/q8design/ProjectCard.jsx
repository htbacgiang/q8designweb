"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import SafeImage from "../common/SafeImage";
import { FaCube, FaMapMarkerAlt, FaRuler } from "react-icons/fa";

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.08,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function ProjectCard({ project, index, isVisible, filterCategories, priority, layout }) {
  const isMobile = layout === "mobile";

  const badge3d = project.has3D ? (
    <motion.div
      className={isMobile ? "absolute top-2 right-2 z-20" : "absolute top-4 right-4 z-20"}
      variants={{ hover: { opacity: 0 } }}
      transition={{ duration: 0.25 }}
    >
      <div className={`${isMobile ? "w-8 h-8" : "w-12 h-12"} flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full shadow-lg`}>
        <FaCube className={`text-q8-primary-900 ${isMobile ? "text-sm" : "text-lg"}`} />
      </div>
    </motion.div>
  ) : null;

  return (
    <motion.div
      custom={index}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={cardVariants}
    >
      <Link href={`/du-an/${project.slug}`} className="block">
        <motion.div
          className={"relative w-full aspect-[5/3] overflow-hidden rounded-lg cursor-pointer"}
          initial={false}
          whileHover="hover"
          variants={{
            hover: {
              y: -8,
              boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
              transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
            },
          }}
          style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
        >
          <motion.div
            className="absolute inset-0"
            variants={{
              hover: {
                scale: 1.08,
                transition: {
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
          >
            <SafeImage
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              priority={priority}
            />
          </motion.div>
          <motion.div
            className={"absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/30"}
            variants={{ hover: { opacity: 1 } }}
            transition={{ duration: 0.35 }}
            style={{ opacity: 0.4 }}
          />
          <motion.div
            className={isMobile ? "absolute top-2 left-2 z-20" : "absolute top-4 left-4 z-20"}
            variants={{ hover: { opacity: 0 } }}
            transition={{ duration: 0.25 }}
          >
            <span className={`${isMobile ? "px-2 py-1 text-xs" : "px-4 py-2 text-sm"} bg-white/90 backdrop-blur-sm text-q8-primary-900 rounded-full font-semibold shadow-lg`}>
              {filterCategories.find((c) => c.id === project.category)?.name || project.category}
            </span>
          </motion.div>
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-20"
            variants={{ hover: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ opacity: 0, y: 12 }}
          >
            <div className={isMobile ? "text-center px-4 max-w-sm" : "text-center px-6 max-w-sm"}>
              <h3 className={`${isMobile ? "text-lg" : "text-2xl"} font-bold text-white mb-2 drop-shadow-2xl`}>{project.title}</h3>
              <div className="space-y-3">
                <div className={isMobile ? "flex flex-col items-center justify-center text-white/90 text-xs space-y-1" : "flex items-center justify-center text-white/90 text-sm space-x-4"}>
                  <span className="flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-q8-primary-400" />
                    {project.location}
                  </span>
                  <span className="flex items-center">
                    <FaRuler className="mr-2 text-q8-primary-400" />
                    {project.area}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
          {badge3d}
        </motion.div>
      </Link>
    </motion.div>
  );
}
