import { FaLightbulb, FaHandshake, FaCog, FaCheckCircle, FaArrowRight } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

export default function AboutSection() {
  const coreValues = [
    {
      icon: FaLightbulb,
      title: "Sáng tạo",
      subtitle: "Creativity",
      description: "Biến ý tưởng thành dấu ấn độc đáo. Chúng tôi luôn tìm tòi, khám phá những ý tưởng đột phá để tạo ra những công trình mang đậm dấu ấn cá nhân, không trùng lặp.",
      number: "01"
    },
    {
      icon: FaHandshake,
      title: "Đồng hành",
      subtitle: "Partnership", 
      description: "Sát cánh cùng bạn trên mọi chặng đường. Mỗi dự án là một hành trình hợp tác, nơi chúng tôi lắng nghe và thấu hiểu mọi mong muốn để mang đến sự hỗ trợ tận tâm nhất.",
      number: "02"
    },
    {
      icon: FaCog,
      title: "Linh hoạt", 
      subtitle: "Flexibility",
      description: "Luôn tìm kiếm giải pháp phù hợp nhất. Chúng tôi không ngừng điều chỉnh và tối ưu để đưa ra các giải pháp thiết kế - thi công phù hợp nhất với nhu cầu và ngân sách của khách hàng.",
      number: "03"
    },
    {
      icon: FaCheckCircle,
      title: "Vẹn tròn",
      subtitle: "Integrity",
      description: "Hoàn thiện từng chi tiết để bạn an tâm. Sự chỉn chu và tỉ mỉ trong từng chi tiết là cam kết của Q8 Design, đảm bảo công trình hoàn thiện với chất lượng tốt nhất.",
      number: "04"
    }
  ];

  return (
    <section className="q8-section q8-section-light relative overflow-hidden bg-q8-primary-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23121212' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-q8-primary-50/50 via-transparent to-q8-primary-100/30"></div>
      
      <div className="container mx-auto px-4 relative z-10">

        {/* Visual Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center md:px-0 px-2">
          {/* Left: Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl group">
              <Image
                src="/images/q8-desgin-team.webp"
                alt="Q8 Design team working"
                width={600}
                height={500}
                className="object-cover w-full h-[500px] transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
              
              {/* Floating Stats */}
              <div className="absolute -bottom-6 -right-5 bg-white rounded-3xl p-6 shadow-2xl border border-q8-primary-200 transform rotate-6 group-hover:rotate-0 transition-all duration-500 hover:scale-105">
                <div className="text-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-q8-primary-900 to-q8-primary-600 bg-clip-text text-transparent">500+</div>
                  <div className="text-sm text-q8-primary-600 font-medium">Dự án hoàn thành</div>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute top-8 -left-4 w-8 h-8 bg-white/20 rounded-full blur-sm"></div>
              <div className="absolute bottom-20 -left-8 w-12 h-12 bg-white/10 rounded-full blur-md"></div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="space-y-3 order-1 lg:order-2 md:px-0 px-2">
            <div>
              <h3 className="text-3xl md:text-3xl font-bold text-q8-primary-900 mb-3 leading-tight">
                Đội ngũ chuyên nghiệp với kinh nghiệm dày dặn
              </h3>
              <p className="text-lg text-q8-primary-700 leading-relaxed mb-4">
                Với hơn 10 năm kinh nghiệm trong lĩnh vực thiết kế và thi công nội thất, 
                đội ngũ Q8 Design luôn cam kết mang đến những giải pháp tối ưu nhất cho mọi không gian sống.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-6">
              {[
                "Đội ngũ kiến trúc sư giàu kinh nghiệm",
                "Quy trình làm việc chuyên nghiệp, minh bạch", 
                "Sử dụng vật liệu cao cấp, thân thiện môi trường",
                "Cam kết tiến độ và chất lượng công trình"
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-4 group">
                  <div className="w-8 h-8 bg-q8-primary-900 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <FaCheckCircle className="text-white text-sm" />
                  </div>
                  <span className="text-q8-primary-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-4">
              <Link href="/gioi-thieu" className="group inline-flex items-center px-8 py-4 bg-q8-primary-900 hover:bg-q8-primary-700 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
                <span>Tìm hiểu thêm về chúng tôi</span>
                <FaArrowRight className="ml-3 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
