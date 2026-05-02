// pages/404.js
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { FaArrowLeft, FaHome, FaPhone, FaSearch } from "react-icons/fa";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 - Trang Không Tìm Thấy | Q8 Design</title>
        <meta name="description" content="Trang bạn tìm kiếm không tồn tại. Quay về trang chủ Q8 Design để khám phá các dịch vụ thiết kế nội thất và kiến trúc chuyên nghiệp." />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      
      <div className="relative min-h-screen bg-[#fcfbf9] overflow-hidden">
        {/* Simple Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#c4a77d]/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/3 -left-32 w-80 h-80 bg-[#c4a77d]/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#c4a77d]/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#c4a77d]/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '0.5s'}}></div>
        </div>

        {/* Floating Shapes */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-[#c4a77d] rounded-full opacity-40 animate-ping"></div>
        <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-[#c4a77d] rounded-full opacity-40 animate-ping" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute top-2/3 right-1/4 w-5 h-5 bg-[#c4a77d] rounded-full opacity-40 animate-ping" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-[#c4a77d] rounded-full opacity-40 animate-ping" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute bottom-1/4 left-1/2 w-4 h-4 bg-[#c4a77d] rounded-full opacity-40 animate-ping" style={{animationDelay: '0.75s'}}></div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4 py-16">
          {/* 404 Illustration */}
          <div className="mb-8 relative">
            <div className="text-9xl md:text-[12rem] font-bold text-[#c4a77d] mb-4 animate-pulse">
              404
            </div>
            {/* Decorative elements around 404 */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-[#c4a77d] rounded-full animate-bounce"></div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-[#c4a77d] rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
            <div className="absolute -top-2 right-1/3 w-5 h-5 bg-[#c4a77d] rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
            <div className="absolute -bottom-4 right-1/4 w-7 h-7 bg-[#c4a77d] rounded-full animate-bounce" style={{animationDelay: '1.5s'}}></div>
          </div>

          {/* Error Message */}
          <div className="space-y-4 mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-[#c4a77d] mb-4">
              Oops! Trang Không Tìm Thấy
            </h1>
            <p className="text-base text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Rất tiếc, trang bạn đang tìm kiếm không tồn tại. Có thể trang đã được di chuyển hoặc URL không chính xác. 
              Hãy quay về trang chủ để khám phá các dự án thiết kế nội thất và kiến trúc tuyệt đẹp của Q8 Design.
            </p>
          </div>

          {/* Simple Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12 max-w-4xl mx-auto">
            <Link href="/">
              <button className="bg-[#c4a77d] hover:bg-[#b09670] text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors duration-200 flex items-center justify-center w-full sm:w-auto">
                <FaHome className="mr-3" />
                <span>Về Trang Chủ</span>
              </button>
            </Link>
            
            <Link href="/du-an">
              <button className="border-2 border-[#c4a77d] hover:bg-[#c4a77d]/10 text-[#c4a77d] px-8 py-4 rounded-lg font-bold text-lg transition-colors duration-200 flex items-center justify-center w-full sm:w-auto">
                <FaSearch className="mr-3" />
                <span>Xem Dự Án</span>
              </button>
            </Link>
            
            <Link href="/lien-he">
              <button className="border-2 border-[#c4a77d] hover:bg-[#c4a77d]/10 text-[#c4a77d] px-8 py-4 rounded-lg font-bold text-lg transition-colors duration-200 flex items-center justify-center w-full sm:w-auto">
                <FaPhone className="mr-3" />
                <span>Liên Hệ Tư Vấn</span>
              </button>
            </Link>
          </div>

          {/* Back Button */}
          <div className="mt-4">
            <button 
              onClick={() => window.history.back()}
              className="flex items-center text-gray-500 hover:text-[#c4a77d] transition-colors duration-200 group mx-auto"
            >
              <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
              <span>Quay Lại Trang Trước</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
