"use client";
import React, { useState } from "react";

const FurnitureViewer = () => {
  // Link video 360 cho toàn bộ tour
  const videoUrl = "https://www.jegaai.com/720/S121212782";
  
  // Trạng thái để xử lý lỗi video
  const [videoError, setVideoError] = useState(false);

  return (
    <div 
      className="min-h-screen text-white bg-gray-50"
    
    >
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 50%)'
        }}
      ></div>
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 lg:p-8">
        {/* Header Section */}
        <div className="w-full max-w-6xl mb-4 lg:mb-4">
          <div className="text-center mb-3">
            <h2 
              className="text-2xl md:text-3xl font-bold mb-2 leading-tight text-gray-900"
            >
              THIẾT KẾ 3D HIỆN ĐẠI -  CÔNG NGHỆ VR THỰC TẾ ẢO
            </h2>
            <div 
              className="w-24 h-1 mx-auto bg-gray-800"
            ></div>
          </div>
          
        
        </div>

        {/* Main Content - Single Video Viewer */}
        <div className="w-full max-w-6xl">
          <div className="backdrop-blur-sm rounded-3xl border overflow-hidden shadow-2xl transform hover:scale-[1.01] transition-all duration-500"
            style={{
              backgroundColor: 'rgba(30, 41, 59, 0.6)',
              borderColor: 'rgba(51, 65, 85, 0.6)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05)'
            }}
          >
            <div 
              className="p-8 border-b"
              style={{
                background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(51, 65, 85, 0.9) 100%)',
                borderBottomColor: 'rgba(71, 85, 105, 0.6)'
              }}
            >
              <div className="flex items-center justify-center gap-3 mb-2">
                <div className="w-3 h-3 bg-gray-600 rounded-full animate-pulse"></div>
                <p className="text-slate-200 text-xl font-bold">
                  Trải nghiệm thực tế ảo 360°
                </p>
                <div className="w-3 h-3 bg-gray-500 rounded-full animate-pulse"></div>
              </div>
              <p className="text-slate-400 text-base text-center">
                Sử dụng chuột hoặc chạm để khám phá không gian thiết kế • Có thể xoay toàn màn hình
              </p>
            </div>
            
            {videoError ? (
              <div 
                className="w-full h-[450px] md:h-[550px] lg:h-[650px] flex items-center justify-center"
                style={{
                  backgroundColor: 'rgba(15, 23, 42, 0.7)'
                }}
              >
                <div className="text-center">
                  <div className="w-20 h-20 border-4 border-red-500/30 border-t-red-500 rounded-full animate-spin mx-auto mb-6"></div>
                  <p className="text-red-400 text-xl font-medium mb-2">
                    Không thể tải video
                  </p>
                  <p className="text-slate-400">
                    Vui lòng kiểm tra kết nối internet và thử lại
                  </p>
                </div>
              </div>
            ) : (
              <div className="relative">
                <iframe
                  src={videoUrl}
                  className="w-full h-[450px] md:h-[550px] lg:h-[650px] transition-opacity duration-300"
                  frameBorder="0"
                  allowFullScreen
                  title="Thiết kế 360 - Nội Thất Green La Home"
                  onError={() => setVideoError(true)}
                ></iframe>
                
                {/* Overlay instructions for first-time users */}
                <div className="absolute top-2 left-1 bg-black backdrop-blur-sm rounded-lg p-3 text-white text-sm  hover:opacity-100 transition-opacity">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                    <span>Kéo để xoay • Cuộn để zoom</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-16 text-center">
          <div 
            className="w-24 h-1 mx-auto mb-6 bg-gray-800"
          ></div>
          
        </div>
      </div>
    </div>
  );
};

export default FurnitureViewer;
