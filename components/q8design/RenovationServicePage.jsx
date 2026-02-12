import Image from "next/image";
import Link from "next/link";
import { 
  FaHome, 
  FaArrowRight, 
  FaCheckCircle,
  FaStar,
  FaClock,
  FaShieldAlt,
  FaBuilding,
  FaStore,
  FaCoffee,
  FaWrench
} from "react-icons/fa";

export default function RenovationServicePage() {
  const serviceDetails = [
    {
      icon: FaHome,
      title: "Cải tạo nhà phố",
      description: "Cải tạo và nâng cấp nhà phố cũ, tối ưu không gian, cải thiện ánh sáng và thông gió tự nhiên.",
      features: [
        "Cải tạo kết cấu, mở rộng không gian",
        "Nâng cấp hệ thống điện nước",
        "Thiết kế lại nội thất hiện đại",
        "Tối ưu công năng từng tầng"
      ]
    },
    {
      icon: FaBuilding,
      title: "Cải tạo chung cư",
      description: "Cải tạo căn hộ chung cư, thay đổi bố cục, nâng cấp nội thất để phù hợp với nhu cầu sử dụng mới.",
      features: [
        "Đập bỏ tường ngăn, mở rộng không gian",
        "Thiết kế lại phòng khách, bếp",
        "Nâng cấp nội thất đa năng",
        "Cải thiện hệ thống ánh sáng"
      ]
    },
    {
      icon: FaHome,
      title: "Cải tạo biệt thự",
      description: "Cải tạo và nâng cấp biệt thự cũ thành không gian hiện đại, sang trọng và tiện nghi hơn.",
      features: [
        "Cải tạo kiến trúc mặt tiền",
        "Nâng cấp nội thất cao cấp",
        "Tích hợp smarthome",
        "Cải tạo sân vườn, hồ bơi"
      ]
    },
    {
      icon: FaStore,
      title: "Cải tạo cửa hàng",
      description: "Cải tạo không gian kinh doanh, showroom, cửa hàng để thu hút khách hàng và tăng doanh thu.",
      features: [
        "Thiết kế lại mặt tiền nổi bật",
        "Tối ưu không gian trưng bày",
        "Hệ thống ánh sáng chuyên nghiệp",
        "Tạo điểm nhấn thương hiệu"
      ]
    },
    {
      icon: FaCoffee,
      title: "Cải tạo quán cà phê",
      description: "Cải tạo quán cà phê, nhà hàng với concept mới, tạo không gian thu hút và khác biệt.",
      features: [
        "Concept độc đáo, Instagram-able",
        "Tối ưu động tuyến phục vụ",
        "Nâng cấp khu vực bar, bếp",
        "Tạo không gian ngoài trời"
      ]
    },
    {
      icon: FaWrench,
      title: "Nâng cấp nội thất",
      description: "Nâng cấp từng hạng mục nội thất: tủ bếp, tủ quần áo, sàn gỗ, trần thạch cao...",
      features: [
        "Thay thế nội thất cũ",
        "Nâng cấp tủ bếp, tủ quần áo",
        "Sơn lại, thay sàn gỗ",
        "Nâng cấp hệ thống điện, đèn"
      ]
    }
  ];

  const renovationProcess = [
    {
      step: "01",
      title: "Khảo sát hiện trạng",
      description: "Khảo sát chi tiết công trình hiện tại, đánh giá kết cấu và xác định phạm vi cải tạo."
    },
    {
      step: "02",
      title: "Thiết kế cải tạo",
      description: "Đề xuất giải pháp thiết kế mới, phối cảnh 3D và bản vẽ thi công chi tiết."
    },
    {
      step: "03",
      title: "Lập kế hoạch & Báo giá",
      description: "Lập tiến độ thi công, báo giá chi tiết và ký kết hợp đồng."
    },
    {
      step: "04",
      title: "Tháo dỡ & Cải tạo",
      description: "Tháo dỡ hạng mục cũ cẩn thận, thi công cải tạo theo thiết kế mới."
    },
    {
      step: "05",
      title: "Hoàn thiện & Bàn giao",
      description: "Hoàn thiện nội thất, vệ sinh và bàn giao công trình đã được làm mới."
    }
  ];

  const renovationBenefits = [
    {
      title: "Tiết kiệm chi phí",
      description: "Chi phí cải tạo thường thấp hơn 30-50% so với xây mới",
      icon: FaStar
    },
    {
      title: "Thời gian nhanh",
      description: "Hoàn thành nhanh hơn so với xây dựng mới từ đầu",
      icon: FaClock
    },
    {
      title: "Tận dụng kết cấu cũ",
      description: "Giữ lại những phần còn tốt, chỉ cải tạo phần cần thiết",
      icon: FaCheckCircle
    },
    {
      title: "Bảo hành chất lượng",
      description: "Bảo hành toàn bộ hạng mục được cải tạo",
      icon: FaShieldAlt
    }
  ];

  const beforeAfterProjects = [
    {
      name: "Nhà phố 3 tầng Tân Bình",
      before: "/images/service-renovation.jpg",
      after: "/images/service-architecture.jpg",
      description: "Cải tạo từ nhà cũ 20 năm thành không gian hiện đại"
    },
    {
      name: "Căn hộ chung cư 80m²",
      before: "/images/service-interior.jpg",
      after: "/images/service-interior-2.webp",
      description: "Mở rộng không gian, tối ưu công năng sử dụng"
    },
    {
      name: "Quán cà phê vintage",
      before: "/images/service-construction.jpg",
      after: "/images/service-interior-2.webp",
      description: "Cải tạo thành concept mới thu hút giới trẻ"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative md:h-[70vh] h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/service-renovation.jpg"
            alt="Cải tạo không gian Q8 Design"
            fill
            className="object-cover brightness-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-4">
          <div className="w-20 h-20 bg-q8-primary-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FaHome className="text-3xl text-white" />
          </div>
          <h1 className="text-3xl md:text-6xl font-bold mb-6">
            Dịch vụ <span className="text-q8-primary-700">Cải tạo Không gian</span>
          </h1>
          <p className="text-xl text-q8-primary-100 max-w-3xl mx-auto leading-relaxed mb-8">
            Nâng cấp và làm mới không gian cũ của bạn, tối ưu công năng và mang lại phong cách sống mới. 
            Giải pháp cải tạo thông minh, tiết kiệm chi phí cho cả nhà ở và công trình thương mại.
          </p>
          <Link
            href="/lien-he"
            className="inline-flex items-center px-8 py-4 bg-q8-primary-900 text-white font-bold rounded-full hover:bg-q8-primary-700 transition-all duration-300 group"
          >
            Tư vấn cải tạo miễn phí
            <FaArrowRight className="ml-3 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="px-4 py-2 bg-q8-primary-100 text-q8-primary-900 rounded-full text-sm font-medium uppercase tracking-wider">
              Dịch vụ cải tạo
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-q8-primary-900 mt-6 mb-4">
              Các dịch vụ cải tạo không gian
            </h2>
            <p className="text-lg text-q8-primary-600 max-w-3xl mx-auto">
              Cải tạo toàn diện cho mọi loại hình công trình
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceDetails.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="bg-q8-primary-50 rounded-3xl p-8 hover:shadow-xl transition-all duration-300">
                  <div className="w-16 h-16 bg-q8-primary-100 rounded-2xl flex items-center justify-center mb-6">
                    <Icon className="text-2xl text-q8-primary-900" />
                  </div>
                  <h3 className="text-xl font-bold text-q8-primary-900 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-q8-primary-600 leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <div className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <FaCheckCircle className="text-q8-primary-900 flex-shrink-0" />
                        <span className="text-sm text-q8-primary-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Before/After Projects */}
      <section className="py-20 bg-q8-primary-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-q8-primary-900 mb-4">
              Dự án cải tạo tiêu biểu
            </h2>
            <p className="text-lg text-q8-primary-600 max-w-3xl mx-auto">
              Sự khác biệt trước và sau khi cải tạo
            </p>
          </div>

          <div className="space-y-12">
            {beforeAfterProjects.map((project, index) => (
              <div key={index} className="bg-white rounded-3xl overflow-hidden shadow-xl">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="relative h-80">
                    <Image
                      src={project.before}
                      alt={`${project.name} - Trước cải tạo`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-q8-primary-900 text-white px-4 py-2 rounded-full font-semibold">
                      Trước cải tạo
                    </div>
                  </div>
                  <div className="relative h-80">
                    <Image
                      src={project.after}
                      alt={`${project.name} - Sau cải tạo`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-q8-primary-900 text-white px-4 py-2 rounded-full font-semibold">
                      Sau cải tạo
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-q8-primary-900 mb-2">
                    {project.name}
                  </h3>
                  <p className="text-q8-primary-600">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Renovation Process */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-q8-primary-900 mb-4">
              Quy trình cải tạo
            </h2>
            <p className="text-lg text-q8-primary-600 max-w-3xl mx-auto">
              Quy trình làm việc chuyên nghiệp, đảm bảo an toàn và chất lượng
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="space-y-6">
              {renovationProcess.map((step, index) => (
                <div key={index} className="bg-q8-primary-50 rounded-2xl p-6 md:p-8 shadow-md hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-q8-primary-900 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        {step.step}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-bold text-q8-primary-900 mb-3">
                        {step.title}
                      </h3>
                      <p className="text-q8-primary-600 leading-relaxed">
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

      {/* Renovation Benefits */}
      <section className="py-20 bg-q8-primary-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-q8-primary-900 mb-4">
              Lợi ích khi cải tạo
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {renovationBenefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-q8-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-q8-primary-900 group-hover:scale-110 transition-all duration-300">
                    <Icon className="text-2xl text-q8-primary-900 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-q8-primary-900 mb-3">
                    {benefit.title}
                  </h3>
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
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-q8-primary-900">
              Bạn muốn cải tạo không gian của mình?
            </h2>
            <p className="text-xl text-q8-primary-600 mb-8 leading-relaxed">
              Liên hệ ngay để được khảo sát miễn phí và nhận tư vấn giải pháp cải tạo phù hợp nhất.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/lien-he"
                className="inline-flex items-center px-8 py-4 bg-q8-primary-900 text-white font-bold rounded-full hover:bg-q8-primary-700 transition-colors duration-300"
              >
                Khảo sát miễn phí
                <FaArrowRight className="ml-3" />
              </Link>
              <Link
                href="/dich-vu"
                className="inline-flex items-center px-8 py-4 border-2 border-q8-primary-900 text-q8-primary-900 font-bold rounded-full hover:bg-q8-primary-900 hover:text-white transition-all duration-300"
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

