'use client';
import { useEffect, useRef, useState } from "react";

export default function PdfViewer({ fileUrl }) {
  const containerRef = useRef(null);
  const [height, setHeight] = useState(800);

  useEffect(() => {
    const handleResize = () => {
      const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
      setHeight(Math.max(500, Math.floor(vh * 0.8)));
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div ref={containerRef} className="w-full">
      <div className="w-full bg-white shadow overflow-hidden" style={{ height }}>
        <object data={fileUrl} type="application/pdf" width="100%" height="100%">
          <iframe src={fileUrl} width="100%" height="100%"></iframe>
        </object>
      </div>
    </div>
  );
}
