"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutMaterialsSection() {
  return (
    <section className="py-6 md:py-8 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start lg:items-stretch">
          
          {/* Cột trái: Hình ảnh phối cảnh thấu cảm */}
          <div className="space-y-10">
            <motion.div
              className="relative w-full aspect-[16/9] lg:aspect-[16/8] max-h-[360px] md:max-h-[420px] rounded-sm overflow-hidden shadow-2xl"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Image
                src="/images/loi-ich-thiet-ke-noi-that.webp"
                alt="Q8 Design - Không gian sử dụng vật liệu tử tế"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/10"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-2xl"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 leading-tight">
                Vật liệu tử tế cho 
                <span className="text-[#c4a77d] italic"> không gian vẹn tròn</span>
              </h3>
              
              <div className="mt-3 space-y-4 text-neutral-600 leading-relaxed text-base md:text-lg">
                <p>
                  Tại Q8 Design, chúng tôi không chỉ chọn vật liệu vì thẩm mỹ. Chúng tôi chọn vì sức khỏe của gia đình bạn. 
                </p>
                <p className="italic border-l-2 border-[#c4a77d] pl-4">
                  &ldquo;Sử dụng 100% gỗ An Cường chuẩn E1, đá Vicostone và phụ kiện Blum/Hafele chính hãng – chúng tôi bảo chứng cho sự tử tế từ gốc vật liệu.&rdquo;
                </p>
                <p>
                  Mọi chi tiết đều được đo đạc bằng thước Laser khắt khe, đảm bảo sự chính xác tuyệt đối trong từng mối nối Noline đẳng cấp.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Cột phải: Hình ảnh đặc tả chất liệu (Texture) */}
          <motion.div
            className="relative w-full aspect-square overflow-hidden lg:aspect-auto lg:h-full lg:translate-y-12"
            initial={{ opacity: 0, scale: 0.95, x: 40 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="/images/chon-vat-lieu-2.webp"
              alt="Chi tiết bề mặt gỗ Noline cao cấp"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              sizes="(max-width: 1024px) 80vw, 420px"
            />
            {/* Tag nhỏ đè lên ảnh để khoe tính kỹ thuật */}
            <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md p-6 shadow-xl ">
              <p className="text-[10px] font-bold text-[#c4a77d] uppercase tracking-widest mb-1">Kỹ thuật</p>
              <p className="text-neutral-900  font-bold text-sm">KTS Q8 Desgin tư vấn chọn vật cho khách hàng</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
