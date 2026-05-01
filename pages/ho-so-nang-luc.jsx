import Head from "next/head";
import dynamic from "next/dynamic";
import DefaultLayout from "../components/layout/DefaultLayout";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaFileAlt, FaImages, FaDownload } from "react-icons/fa";

const PdfViewer = dynamic(() => import("../components/pdf/PdfViewer"), { ssr: false });

export default function HoSoNangLucPage() {
  const [active, setActive] = useState("hsnl");
  const files = {
    hsnl: "/_HSNL-Q8.pdf",
    portfolio: "/PORTFOLIO-NOI-THAT-Q8.pdf",
  };
  const currentFile = active === "portfolio" ? files.portfolio : files.hsnl;

  return (
    <>
      <Head>
        <title>Hồ sơ năng lực - Q8 Design</title>
        <meta name="description" content="Xem Hồ sơ năng lực và Portfolio nội thất của Q8 Design." />
        <link rel="canonical" href="https://q8design.vn/ho-so-nang-luc" />
      </Head>
      <DefaultLayout>
        <section className="q8-hero-section relative h-[40vh] md:h-[45vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/banner2.jpg"
              alt="Hồ sơ năng lực Q8 Design"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
          </div>
          <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight">Hồ sơ năng lực</h1>
            <p className="text-base md:text-xl text-q8-primary-200 leading-relaxed">Giới thiệu năng lực và portfolio của Q8 Design</p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-6 md:py-8">
          <div className="flex items-center justify-between gap-4 mb-8 flex-col md:flex-row">
            <div
              role="tablist"
              aria-label="Chọn tài liệu"
              className="inline-flex items-center bg-gray-100 p-1 rounded-full shadow-sm ring-1 ring-gray-200"
            >
              <button
                onClick={() => setActive("hsnl")}
                role="tab"
                aria-selected={active === "hsnl"}
                className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 transition-all ${
                  active === "hsnl"
                    ? "bg-gradient-to-r from-[#c4a77d] to-[#a88963] text-white shadow"
                    : "text-gray-700 hover:bg-white"
                }`}
              >
                <FaFileAlt className="text-current" />
                <span>Hồ sơ năng lực</span>
              </button>
              <button
                onClick={() => setActive("portfolio")}
                role="tab"
                aria-selected={active === "portfolio"}
                className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 transition-all ${
                  active === "portfolio"
                    ? "bg-gradient-to-r from-[#c4a77d] to-[#a88963] text-white shadow"
                    : "text-gray-700 hover:bg-white"
                }`}
              >
                <FaImages className="text-current" />
                <span>Portfolio nội thất</span>
              </button>
            </div>
            <a
              href={currentFile}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#c4a77d] to-[#a88963] hover:from-[#b99b71] hover:to-[#9f7f59] text-white text-sm font-semibold shadow"
            >
              <FaDownload className="text-base" />
              <span>Tải PDF</span>
            </a>
          </div>

          <div className="bg-white shadow-lg ring-1 ring-black/5">
            <PdfViewer fileUrl={currentFile} />
          </div>
        </div>
      </DefaultLayout>
    </>
  );
}
