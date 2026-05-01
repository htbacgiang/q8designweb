import Image from "next/image";
import Link from "next/link";
import { 
  FaRulerCombined, 
  FaCouch, 
  FaHammer, 
  FaHome, 
  FaArrowRight, 
  FaCheckCircle,
  FaStar,
  FaClock,
  FaShieldAlt
} from "react-icons/fa";
import CTABannerSection from './CTABannerSection';

export default function ServicesPage() {
  const mainServices = [
    {
      icon: FaRulerCombined,
      title: "Thiết kế Kiến trúc",
      description: "Chúng tôi kiến tạo những công trình kiến trúc độc đáo và bền vững. Từ nhà phố, biệt thự đến các công trình thương mại, Q8 Design mang đến giải pháp kiến trúc hiện đại, phù hợp với phong cách sống Việt Nam.",
      image: "/images/service-architecture.webp",
      services: [
        "Thiết kế kiến trúc nhà phố", 
        "Thiết kế kiến trúc biệt thự",
        "Thiết kế kiến trúc thương mại",
        "Thiết kế kiến trúc công nghiệp", 
        "Thiết kế quy hoạch khu đô thị",
        "Tư vấn cải tạo kiến trúc"
      ],
      color: "orange",
      featured: true
    },
    {
      icon: FaCouch,
      title: "Thiết kế Nội thất",
      description: "Biến không gian sống của bạn thành tác phẩm nghệ thuật với sự sáng tạo và tinh tế. Q8 Design chuyên thiết kế nội thất cao cấp, tối ưu công năng và thể hiện cá tính riêng của gia chủ.",
      image: "/images/service-interior-2.webp",
      services: [
        "Thiết kế nội thất nhà phố",
        "Thiết kế nội thất chung cư", 
        "Thiết kế nội thất biệt thự",
        "Thiết kế nội thất văn phòng",
        "Thiết kế nội thất cửa hàng"
      ],
      color: "orange",
      featured: true
    },
    {
      icon: FaHammer,
      title: "Thi công trọn gói", 
      description: "Đảm bảo công trình được hoàn thiện đúng tiến độ, chất lượng và thẩm mỹ theo thiết kế. Chúng tôi quản lý và giám sát chặt chẽ mọi công đoạn, từ xây dựng phần thô đến hoàn thiện nội thất, để bạn hoàn toàn an tâm.",
      image: "/images/service-construction.webp",
      services: [
        "Thi công trọn gói từ A-Z",
        "Thi công phần thô", 
        "Thi công đồ gỗ nội thất",
        "Thi công hoàn thiện theo bản vẽ",
        "Thi công kiến trúc", 
        "Giám sát chất lượng 24/7"
      ],
      color: "orange",
      featured: true
    },
    {
      icon: FaHome,
      title: "Cải tạo không gian",
      description: "Nâng cấp và làm mới không gian cũ của bạn, tối ưu công năng và mang lại phong cách sống mới. Dịch vụ cải tạo của chúng tôi phù hợp với cả nhà ở và các công trình thương mại.",
      image: "/images/service-renovation.webp", 
      services: [
        "Cải tạo nhà phố",
        "Cải tạo chung cư",
        "Cải tạo biệt thự",
        "Cải tạo cửa hàng", 
        "Cải tạo quán cà phê",
        "Nâng cấp nội thất"
      ],
      color: "orange",
      featured: true
    },

  ];

  const servicesByType = {
    architecture: {
      title: "Dịch vụ Thiết kế Kiến trúc",
      description: "Giải pháp thiết kế kiến trúc toàn diện từ ý tưởng đến hiện thực",
      services: [
        {
          name: "Thiết kế kiến trúc nhà phố",
          description: "Kiến trúc hiện đại, tối ưu diện tích cho nhà phố đô thị",
          image: "/images/service-architecture.webp"
        },
        {
          name: "Thiết kế kiến trúc biệt thự", 
          description: "Biệt thự đẳng cấp với phong cách kiến trúc độc đáo",
          image: "/images/thiet-ke-biet-thu-cao-cap-q8design.webp"
        },
        {
          name: "Tư vấn cải tạo kiến trúc",
          description: "Nâng cấp và cải tạo công trình hiện có",
          image: "/images/service-interior.webp"
        }
      ]
    },
    interior: {
      title: "Dịch vụ Thiết kế Nội thất",
      description: "Giải pháp thiết kế nội thất chuyên nghiệp cho mọi loại hình công trình",
      services: [
        {
          name: "Thiết kế nội thất nhà phố",
          description: "Tối ưu không gian sống cho nhà phố 3-5 tầng",
          image: "/images/thiet-ke-noi-that.jpg"
        },
        {
          name: "Thiết kế nội thất chung cư", 
          description: "Giải pháp thông minh cho căn hộ chung cư hiện đại",
          image: "/images/noi-that-2.jpg"
        },
        {
          name: "Thiết kế nội thất biệt thự/villa",
          description: "Thiết kế đẳng cấp cho không gian sống rộng lớn",
          image: "/images/thiet-ke-noi-that-biet-thu-q8design.jpg"
        },
        {
          name: "Thiết kế cửa hàng/showroom",
          description: "Không gian thương mại thu hút và chuyên nghiệp", 
          image: "/images/thiet-ke-resort-showroom-q8design.webp"
        },
        {
          name: "Thiết kế văn phòng/F&B",
          description: "Môi trường làm việc hiệu quả và sáng tạo",
          image: "/images/thiet-ke-van-phong-chuyen-nghiep-q8design.webp"
        }
      ]
    },
    construction: {
      title: "Dịch vụ Thi công Nội thất", 
      description: "Quy trình thi công chuyên nghiệp, đảm bảo chất lượng cao nhất",
      services: [
        {
          name: "Thi công trọn gói",
          description: "Giải pháp toàn diện từ thiết kế đến hoàn thiện",
          image: "/images/construction-turnkey.webp"
        },
        {
          name: "Thi công phần thô",
          description: "Xây dựng kết cấu và hạ tầng cơ bản",
          image: "/images/service-construction.webp"
        },
        {
          name: "Thi công đồ gỗ nội thất",
          description: "Sản xuất và lắp đặt nội thất gỗ cao cấp",
          image: "/images/construction-furniture.webp"
        },
        {
          name: "Thi công hoàn thiện theo bản vẽ có sẵn",
          description: "Thực hiện theo thiết kế của đơn vị khác",
          image: "/images/construction-finishing.webp"
        },
        {
          name: "Thi công kiến trúc",
          description: "Xây dựng và hoàn thiện công trình kiến trúc",
          image: "/images/construction-architecture.webp"
        }
      ]
    }
  };

  const workflowSteps = [
    {
      step: "01",
      title: "Tiếp nhận & Tư vấn",
      description: "Lắng nghe nhu cầu, tư vấn giải pháp phù hợp với ngân sách",
      icon: FaCouch
    },
    {
      step: "02", 
      title: "Khảo sát & Đề xuất",
      description: "Khảo sát thực địa, đo đạc và đề xuất ý tưởng thiết kế",
      icon: FaRulerCombined
    },
    {
      step: "03",
      title: "Thiết kế & Ký hợp đồng", 
      description: "Hoàn thiện bản vẽ, ký kết hợp đồng và lịch trình thi công",
      icon: FaCheckCircle
    },
    {
      step: "04",
      title: "Triển khai & Giám sát",
      description: "Thi công theo đúng thiết kế, giám sát chất lượng 24/7",
      icon: FaHammer
    },
    {
      step: "05",
      title: "Bàn giao & Hậu mãi", 
      description: "Nghiệm thu, bàn giao và bảo hành dài hạn",
      icon: FaShieldAlt
    }
  ];

  const benefits = [
    {
      icon: FaStar,
      title: "Chất lượng cam kết",
      description: "Sử dụng vật liệu cao cấp, thi công theo tiêu chuẩn quốc tế"
    },
    {
      icon: FaClock,
      title: "Đúng tiến độ", 
      description: "Cam kết hoàn thành đúng thời gian đã thỏa thuận"
    },
    {
      icon: FaShieldAlt,
      title: "Bảo hành dài hạn",
      description: "Chế độ bảo hành và hỗ trợ sau bàn giao tận tâm"
    },
    {
      icon: FaCheckCircle,
      title: "Minh bạch chi phí",
      description: "Báo giá chi tiết, không phát sinh chi phí ẩn"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="q8-hero-section relative h-[45vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/banner2.jpg"
            alt="Q8 Design Services"
            fill
            className="object-cover brightness-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40"></div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
         
          <h2 className="text-2xl md:text-5xl font-bold mb-4">
            Dịch vụ <span className="text-[#c4a77d]">Kiến tạo không gian sống</span>
          </h2>
          <p className="text-xl text-q8-primary-200 max-w-3xl mx-auto leading-relaxed">
            Tại Q8 Design, chúng tôi cung cấp giải pháp toàn diện, 
            biến mọi ý tưởng của bạn thành hiện thực một cách hoàn hảo
          </p>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-6 md:py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-xl md:text-4xl font-bold text-q8-primary-900 mt-6 mb-2">
              Các dịch vụ chính của Q8 Design
            </h2>
          </div>

          <div className="space-y-16">
            {mainServices.map((service, index) => {
              const Icon = service.icon;
              const dotClass = "bg-[#c4a77d]";
              const iconTextClass = "text-[#c4a77d]";
              const iconBgClass = "bg-gradient-to-br from-[#f9f4ec] to-[#efe2cf]";
              
              return (
                <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                  {/* Image */}
                  <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                    <div className="relative overflow-hidden shadow-2xl">
                      <Image
                        src={service.image}
                        alt={service.title}
                        width={600}
                        height={400}
                        className="object-cover w-full h-96"
                      />
                      <div className="absolute top-6 left-6">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                          <Icon className="text-2xl text-white" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-12 h-12 ${iconBgClass} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`text-xl ${iconTextClass}`} />
                      </div>
                      <h3 className="text-lg font-bold text-q8-primary-900">
                        {service.title}
                      </h3>
                    </div>
                    
                    <p className="text-q8-primary-700 leading-relaxed mb-6 pl-2">
                      {service.description}
                    </p>

                    {/* Services List */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8 pl-2">
                      {service.services.map((item, idx) => (
                        <div key={idx} className="flex items-center space-x-3">
                          <div className={`w-2 h-2 ${dotClass} rounded-full`}></div>
                          <span className="text-sm text-q8-primary-800">{item}</span>
                        </div>
                      ))}
                    </div>

                    <Link
                      href={`/dich-vu/${service.title === 'Thiết kế Kiến trúc' ? 'thiet-ke-kien-truc' 
                        : service.title === 'Thiết kế Nội thất' ? 'thiet-ke-noi-that'
                        : service.title === 'Thi công trọn gói' ? 'thi-cong-tron-goi'
                        : service.title === 'Cải tạo không gian' ? 'cai-tao-noi-that-chung-cu'
                        : 'tu-van-ho-tro'}`}
                      className="btn-default inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#c4a77d] to-[#a88963] hover:from-[#b99b71] hover:to-[#9f7f59] text-white font-semibold transition-colors"
                    >
                      Xem chi tiết
                      <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services by Type - Architecture Design */}
      <section className="py-6 md:py-8 ">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-xl md:text-4xl font-bold text-q8-primary-900 mb-2">
              {servicesByType.architecture.title}
            </h2>
            <p className="text-lg text-q8-primary-700 max-w-3xl mx-auto">
              {servicesByType.architecture.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesByType.architecture.services.map((service, index) => (
              <div key={index} className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-q8-primary-900 mb-3 group-hover:text-[#c4a77d] transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-q8-primary-700 leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <Link href="#" className="inline-flex items-center text-[#c4a77d] hover:text-[#a88963] font-medium transition-colors group/link">
                    Tìm hiểu thêm
                    <FaArrowRight className="ml-2 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services by Type - Interior Design */}
      <section className="py-6 md:py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-xl md:text-4xl font-bold text-q8-primary-900 mb-2">
              {servicesByType.interior.title}
            </h2>
            <p className="text-lg text-q8-primary-700 max-w-3xl mx-auto">
              {servicesByType.interior.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesByType.interior.services.slice(0, 5).map((service, index) => (
              <div key={index} className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-q8-primary-900 mb-3 group-hover:text-[#c4a77d] transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-q8-primary-700 leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <Link href="#" className="inline-flex items-center text-[#c4a77d] hover:text-[#a88963] font-medium transition-colors group/link">
                    Tìm hiểu thêm
                    <FaArrowRight className="ml-2 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services by Type - Construction */}
      <section className="py-6 md:py-8 ">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-xl md:text-4xl font-bold text-q8-primary-900 mb-2">
              {servicesByType.construction.title}
            </h2>
            <p className="text-lg text-q8-primary-700 max-w-3xl mx-auto">
              {servicesByType.construction.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesByType.construction.services.map((service, index) => (
              <div key={index} className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-q8-primary-900 mb-3 group-hover:text-[#c4a77d] transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-q8-primary-700 leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <Link href="#" className="inline-flex items-center text-[#c4a77d] hover:text-[#a88963] font-medium transition-colors group/link">
                    Tìm hiểu thêm
                    <FaArrowRight className="ml-2 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Process */}
      <section className="py-6 md:py-8 ">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-xl md:text-4xl font-bold text-q8-primary-900 mt-6 mb-4">
              Quy trình làm việc chuyên nghiệp
            </h2>
            <p className="text-lg text-q8-primary-700 max-w-4xl mx-auto">
              Quy trình 5 bước minh bạch và chuyên nghiệp, đảm bảo chất lượng 
              và sự hài lòng của khách hàng
            </p>
          </div>

          <div className=" mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {workflowSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="relative mb-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-[#c4a77d] to-[#a88963] rounded-full flex items-center justify-center mx-auto shadow-lg">
                        <Icon className="text-2xl text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#c4a77d] rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {step.step}
                      </div>
                      
                      {/* Connection Line */}
                      {index < workflowSteps.length - 1 && (
                        <div className="hidden md:block absolute top-10 left-full w-full h-1 bg-[#c4a77d]/30 -z-10"></div>
                      )}
                    </div>
                    
                    <h3 className="text-lg font-bold text-q8-primary-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-q8-primary-700 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-6 md:py-8 mb-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-xl md:text-4xl font-bold text-q8-primary-900 mb-4">
              Tại sao chọn Q8 Design?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8  mx-auto">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-[#f9f4ec] to-[#efe2cf] rounded-2xl flex items-center justify-center group-hover:from-[#c4a77d] group-hover:to-[#a88963] transition-all duration-300">
                      <Icon className="text-2xl text-[#c4a77d] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="text-lg font-bold text-q8-primary-900 flex-1 leading-tight">
                      {benefit.title}
                    </h3>
                  </div>
                  <p className="text-q8-primary-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTABannerSection />
    </div>
  );
}
