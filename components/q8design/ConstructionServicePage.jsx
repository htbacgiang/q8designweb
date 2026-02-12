import Image from "next/image";
import Link from "next/link";
import { 
  FaHammer, 
  FaArrowRight, 
  FaCheckCircle,
  FaStar,
  FaClock,
  FaShieldAlt,
  FaTools,
  FaHardHat,
  FaPaintRoller,
  FaDraftingCompass
} from "react-icons/fa";

export default function ConstructionServicePage() {
  const serviceDetails = [
    {
      icon: FaTools,
      title: "Thi công trọn gói A-Z",
      description: "Giải pháp toàn diện từ thiết kế, thi công xây dựng đến hoàn thiện nội thất. Bàn giao nhà hoàn chỉnh, sẵn sàng ở.",
      features: [
        "Thiết kế + Xây dựng + Nội thất",
        "Quản lý dự án chuyên nghiệp",
        "Đảm bảo tiến độ và chất lượng",
        "Bàn giao nhà hoàn chỉnh"
      ]
    },
    {
      icon: FaHardHat,
      title: "Thi công phần thô",
      description: "Thi công xây dựng kết cấu chính, móng, cột, dầm, sàn, tường theo đúng thiết kế kiến trúc.",
      features: [
        "Xây dựng kết cấu chính",
        "Móng, cột, dầm, sàn, tường",
        "Hệ thống điện nước cơ bản",
        "Đảm bảo kỹ thuật và an toàn"
      ]
    },
    {
      icon: FaDraftingCompass,
      title: "Thi công đồ gỗ nội thất",
      description: "Sản xuất và lắp đặt nội thất gỗ cao cấp theo thiết kế: tủ bếp, tủ quần áo, kệ tivi, giường ngủ...",
      features: [
        "Gỗ công nghiệp cao cấp",
        "Sản xuất tại xưởng riêng",
        "Lắp đặt chuyên nghiệp",
        "Bảo hành 24 tháng"
      ]
    },
    {
      icon: FaPaintRoller,
      title: "Thi công hoàn thiện",
      description: "Hoàn thiện công trình theo bản vẽ thiết kế có sẵn: sơn, ốp lát, trần thạch cao, hệ thống điện nước.",
      features: [
        "Sơn nội ngoại thất",
        "Ốp lát gạch, đá",
        "Trần thạch cao, vách ngăn",
        "Điện, nước, điều hòa"
      ]
    },
    {
      icon: FaShieldAlt,
      title: "Giám sát chất lượng",
      description: "Đội ngũ giám sát chuyên nghiệp kiểm tra từng công đoạn, đảm bảo chất lượng và tiến độ thi công.",
      features: [
        "Giám sát 24/7",
        "Báo cáo tiến độ định kỳ",
        "Kiểm tra chất lượng từng bước",
        "Xử lý vấn đề kịp thời"
      ]
    }
  ];

  const constructionProcess = [
    {
      step: "01",
      title: "Khảo sát & Báo giá",
      description: "Khảo sát mặt bằng, đo đạc chi tiết, lập bảng khối lượng và báo giá thi công."
    },
    {
      step: "02",
      title: "Ký hợp đồng & Lập kế hoạch",
      description: "Ký kết hợp đồng thi công, lập tiến độ chi tiết và bàn giao mặt bằng."
    },
    {
      step: "03",
      title: "Chuẩn bị & Khởi công",
      description: "Chuẩn bị vật liệu, nhân công, thiết bị và tổ chức khởi công."
    },
    {
      step: "04",
      title: "Thi công & Giám sát",
      description: "Triển khai thi công theo tiến độ, giám sát chặt chẽ chất lượng từng công đoạn."
    },
    {
      step: "05",
      title: "Nghiệm thu & Bàn giao",
      description: "Nghiệm thu hoàn công, vệ sinh bàn giao và hướng dẫn sử dụng."
    }
  ];

  const constructionStandards = [
    {
      title: "Vật liệu cao cấp",
      description: "Sử dụng vật liệu xây dựng và nội thất từ các thương hiệu uy tín",
      icon: FaStar
    },
    {
      title: "Thi công chuẩn kỹ thuật",
      description: "Quy trình thi công theo tiêu chuẩn TCVN, đảm bảo chất lượng",
      icon: FaCheckCircle
    },
    {
      title: "Đúng tiến độ",
      description: "Cam kết hoàn thành đúng thời gian đã ký kết trong hợp đồng",
      icon: FaClock
    },
    {
      title: "Bảo hành dài hạn",
      description: "Bảo hành toàn diện cho kết cấu và nội thất sau bàn giao",
      icon: FaShieldAlt
    }
  ];

  const constructionTypes = [
    {
      name: "Nhà phố 3-5 tầng",
      description: "Thi công trọn gói nhà phố hiện đại",
      image: "/images/service-construction.jpg"
    },
    {
      name: "Biệt thự, Villa",
      description: "Thi công biệt thự cao cấp đẳng cấp",
      image: "/images/service-architecture.jpg"
    },
    {
      name: "Văn phòng, Showroom",
      description: "Thi công không gian thương mại chuyên nghiệp",
      image: "/images/service-interior-2.webp"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative md:h-[70vh] h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/service-construction.jpg"
            alt="Thi công xây dựng Q8 Design"
            fill
            className="object-cover brightness-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-4">
          <div className="w-20 h-20 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FaHammer className="text-3xl text-white" />
          </div>
          <h1 className="text-3xl md:text-6xl font-bold mb-6">
            Dịch vụ <span className="text-orange-400">Thi công Trọn gói</span>
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed mb-8">
            Đảm bảo công trình được hoàn thiện đúng tiến độ, chất lượng và thẩm mỹ theo thiết kế. 
            Quản lý và giám sát chặt chẽ mọi công đoạn từ xây thô đến hoàn thiện nội thất.
          </p>
          <Link
            href="/lien-he"
            className="inline-flex items-center px-8 py-4 bg-orange-500 text-white font-bold rounded-full hover:bg-orange-600 transition-all duration-300 group"
          >
            Nhận báo giá thi công
            <FaArrowRight className="ml-3 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-medium uppercase tracking-wider">
              Dịch vụ thi công
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-6 mb-4">
              Các gói dịch vụ thi công
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Đa dạng gói thi công phù hợp với mọi nhu cầu và ngân sách
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceDetails.slice(0, 3).map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="bg-gray-50 rounded-3xl p-8 hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-orange-500">
                  <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6">
                    <Icon className="text-2xl text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <div className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <FaCheckCircle className="text-orange-500 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 max-w-4xl mx-auto">
            {serviceDetails.slice(3).map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="bg-gray-50 rounded-3xl p-8 hover:shadow-xl transition-all duration-300">
                  <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6">
                    <Icon className="text-2xl text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <div className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <FaCheckCircle className="text-orange-500 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Construction Types */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Loại hình thi công
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Chuyên thi công các loại hình công trình dân dụng và thương mại
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {constructionTypes.map((type, index) => (
              <div key={index} className="group rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={type.image}
                    alt={type.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{type.name}</h3>
                    <p className="text-gray-200">{type.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Construction Process */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Quy trình thi công
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Quy trình thi công chuyên nghiệp, minh bạch từng bước
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="space-y-6">
              {constructionProcess.map((step, index) => (
                <div key={index} className="bg-gray-50 rounded-2xl p-6 md:p-8 shadow-md hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        {step.step}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Construction Standards */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Cam kết chất lượng
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {constructionStandards.map((standard, index) => {
              const Icon = standard.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-500 group-hover:scale-110 transition-all duration-300">
                    <Icon className="text-2xl text-orange-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {standard.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {standard.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Bạn cần thi công công trình của mình?
            </h2>
            <p className="text-xl text-orange-100 mb-8 leading-relaxed">
              Liên hệ ngay để nhận báo giá chi tiết và tư vấn miễn phí về quy trình thi công.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/lien-he"
                className="inline-flex items-center px-8 py-4 bg-white text-orange-600 font-bold rounded-full hover:bg-gray-100 transition-colors duration-300"
              >
                Nhận báo giá ngay
                <FaArrowRight className="ml-3" />
              </Link>
              <Link
                href="/dich-vu"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-all duration-300"
              >
                Xem các dịch vụ khác
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

