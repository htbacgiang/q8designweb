"use client";

import { useState } from "react";
import Image from "next/image";

const faqItems = [
  {
    question: "Quy trình thông thường khi bắt đầu dự án thiết kế là gì?",
    answer:
      "Quy trình bắt đầu bằng buổi tư vấn để trao đổi ý tưởng, sau đó lên kế hoạch, trình bày phương án thiết kế và triển khai để hiện thực hóa không gian mong muốn.",
  },
  {
    question: "Dự án thiết kế nội thất thường mất bao lâu?",
    answer:
      "Tùy quy mô và độ phức tạp, mỗi dự án thường từ vài tuần đến vài tháng. Chúng tôi sẽ ước lượng cụ thể sau buổi tư vấn đầu tiên.",
  },
  {
    question: "Tôi có thể tận dụng đồ nội thất hiện có trong thiết kế mới không?",
    answer:
      "Có. Chúng tôi sẽ đánh giá đồ hiện có và đề xuất cách tích hợp hợp lý vào thiết kế mới để vừa tiết kiệm vừa giữ tính thẩm mỹ.",
  },
  {
    question: "Tôi sẽ được tư vấn những gì trong buổi gặp đầu tiên?",
    answer:
      "Trong buổi tư vấn, chúng tôi sẽ trao đổi về nhu cầu, phong cách, ngân sách và mặt bằng để đưa ra hướng thiết kế và bước tiếp theo phù hợp.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Text + FAQ accordion */}
          <div>
            <p className="text-q8-primary-500 text-sm font-medium mb-3 flex items-center gap-2">
              <span aria-hidden>→</span>
              Câu hỏi thường gặp
            </p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-q8-primary-900 leading-tight mb-6">
              Có thắc mắc? Tìm câu trả lời{" "}
              <span className="text-q8-primary-600 font-semibold">ngay tại đây</span>
            </h2>
            <p className="text-q8-primary-600 text-base leading-relaxed mb-10 max-w-xl">
              Đội ngũ chúng tôi luôn lắng nghe và làm việc chặt chẽ để hiểu ý tưởng của bạn và hiện thực hóa với sự chăm chút từng chi tiết.
            </p>

            <div className="space-y-4">
              {faqItems.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                  <div
                    key={index}
                    className="border border-q8-primary-200 rounded-lg overflow-hidden bg-white transition-colors hover:border-q8-primary-300"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? -1 : index)}
                      className="w-full flex items-start justify-between gap-4 text-left py-4 px-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 rounded-lg"
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${index}`}
                      id={`faq-question-${index}`}
                    >
                      <span className="font-bold text-q8-primary-900 text-sm md:text-base pr-2">
                        <span className="text-amber-600/90 font-semibold">{index + 1}.</span> {item.question}
                      </span>
                      <span
                        className="flex-shrink-0 w-8 h-8 rounded-full border border-q8-primary-300 flex items-center justify-center text-q8-primary-700 bg-q8-primary-50"
                        aria-hidden
                      >
                        {isOpen ? (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        )}
                      </span>
                    </button>
                    <div
                      id={`faq-answer-${index}`}
                      role="region"
                      aria-labelledby={`faq-question-${index}`}
                      className={isOpen ? "block" : "hidden"}
                    >
                      <div className="px-5 pb-4 pt-0 text-q8-primary-600 text-sm md:text-base leading-relaxed border-t border-q8-primary-100">
                        {item.answer}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Image */}
          <div className="relative w-full aspect-[4/5] max-h-[600px] rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/images/service-interior-2.webp"
              alt="Không gian nội thất cao cấp - Q8 Design"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
