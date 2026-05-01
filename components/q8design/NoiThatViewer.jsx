"use client";
import { useState } from 'react';

export default function NoiThatViewer({ model3D, projectTitle = "Dự án" }) {
  const [isLoading, setIsLoading] = useState(true);
  
  // Nếu không có model3D thì không hiển thị gì cả
  if (!model3D) {
    return null;
  }
  
  return (
    <div className="w-full max-w-6xl mx-auto my-8">
      {/* Tiêu đề section */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Không Gian Nội Thất 3D
        </h2>
        <p className="text-gray-600">
          Khám phá thiết kế hiện đại với công nghệ 3D tương tác
        </p>
      </div>

      {/* Sketchfab Embed */}
      <div className="sketchfab-embed-wrapper rounded-lg overflow-hidden shadow-lg relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
              <p className="text-gray-600">Đang tải mô hình 3D...</p>
            </div>
          </div>
        )}
        <iframe 
          title={`Mô hình 3D - ${projectTitle}`}
          frameBorder="0" 
          allowFullScreen 
          mozAllowFullScreen={true}
          webkitallowfullscreen={true}
          allow="autoplay; fullscreen; xr-spatial-tracking" 
          xr-spatial-tracking="true"
          execution-while-out-of-viewport="true"
          execution-while-not-rendered="true"
          web-share="true"
          width="100%" 
          height="480" 
          src={model3D}
          className="w-full"
          onLoad={() => setIsLoading(false)}
        />
      </div>

      {/* Mô tả bổ sung */}
      <div className="mt-6 text-center">
        <p className="text-gray-600 max-w-2xl mx-auto">
          Mô hình 3D sẽ tự động tải. Sử dụng chuột để tương tác, xoay, phóng to/thu nhỏ và khám phá không gian 3D. 
          Thiết kế này thể hiện phong cách nội thất hiện đại với tông màu hồng pastel nhẹ nhàng.
        </p>
      </div>
    </div>
  );
}
