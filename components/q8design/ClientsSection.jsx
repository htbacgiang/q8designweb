import Image from "next/image";

export default function ClientsSection() {
  // 5 Đối tác chiến lược hàng đầu từ hình ảnh anh cung cấp
  const clients = [
    {
      name: "AN CƯỜNG",
      logo: "/images/4.jpg"
    },
    {
      name: "VICOSTONE",
      logo: "/images/2.jpg"
    },
    {
      name: "BLUM",
      logo: "/images/3.jpg"
    },
    {
      name: "HÄFELE",
      logo: "/images/5.jpg"
    },
    {
      name: "MINH LONG",
      logo: "/images/1.jpg"
    },
  ];

  return (
    <section className="py-6 md:py-12 ">
      <div className="container mx-auto px-4">
        {/* Nhãn Section dựa trên triết lý Q8 */}

        <div className="flex items-center gap-2 text-[var(--q8-primary-600)] text-sm font-bold uppercase mb-2">
          <h2 className="inline-flex items-center gap-1">
            Đối tác của Q8
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </h2>
        </div>
        {/* Mô tả từ giá trị cốt lõi của Q8 */}
        <p className="text-xl font-bold text-[var(--q8-cod-gray)] leading-tight tracking-tight">
          Q8 Việt Nam cam kết đồng hành cùng các
          <span className="text-[#c4a77d]"> thương hiệu hàng đầu</span> để mang lại sự an tâm tuyệt đối và trải nghiệm vẹn tròn cho gia chủ.
        </p>

        {/* Grid hiển thị 5 đối tác tập trung */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-stretch">
          {clients.map((client, index) => (
            <div
              key={index}
              className="group flex flex-col items-center justify-center p-4  bg-white hover:border-[#c4a77d]  transition-all duration-500"
            >
              <div className="relative w-full h-32 mb-6 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-500">
                <Image
                  src={client.logo}
                  alt={`Đối tác Q8 Việt Nam - ${client.name}`}
                  fill
                  className="object-contain p-2"
                />
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}