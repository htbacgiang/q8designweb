import Image from "next/image";
import Link from "next/link";
import { FaLightbulb, FaHandshake, FaCog, FaCheckCircle, FaQuoteLeft, FaAward, FaUsers, FaRocket, FaFacebook, FaLinkedin, FaInstagram, FaTwitter, FaYoutube, FaTiktok } from "react-icons/fa";

export default function AboutPage() {
  const coreValues = [
    {
      icon: FaLightbulb,
      title: "Sáng tạo",
      subtitle: "Creativity",
      description: "Biến ý tưởng thành dấu ấn độc đáo. Chúng tôi luôn tìm tòi, khám phá những ý tưởng đột phá để tạo ra những công trình mang đậm dấu ấn cá nhân, không trùng lặp.",
      color: "gray"
    },
    {
      icon: FaHandshake,
      title: "Đồng hành",
      subtitle: "Partnership", 
      description: "Sát cánh cùng bạn trên mọi chặng đường. Mỗi dự án là một hành trình hợp tác, nơi chúng tôi lắng nghe và thấu hiểu mọi mong muốn để mang đến sự hỗ trợ tận tâm nhất.",
      color: "gray"
    },
    {
      icon: FaCog,
      title: "Linh hoạt", 
      subtitle: "Flexibility",
      description: "Luôn tìm kiếm giải pháp phù hợp nhất. Chúng tôi không ngừng điều chỉnh và tối ưu để đưa ra các giải pháp thiết kế - thi công phù hợp nhất với nhu cầu và ngân sách của khách hàng.",
      color: "gray"
    },
    {
      icon: FaCheckCircle,
      title: "Vẹn tròn",
      subtitle: "Integrity",
      description: "Hoàn thiện từng chi tiết để bạn an tâm. Sự chỉn chu và tỉ mỉ trong từng chi tiết là cam kết của Q8 Design, đảm bảo công trình hoàn thiện với chất lượng tốt nhất.",
      color: "gray"
    }
  ];


  const teamMembers = [
    {
      name: "Hoàng Quốc Hữu",
      position: "Giám đốc",
      experience: "10 năm kinh nghiệm",
      education: "Kỹ sư Xây dựng - Đại học Kiến trúc Hà Nội",
      image: "/images/hoang-quoc-huu.jpg",
      description: "Chuyên gia hàng đầu về thiết kế kiến trúc và nội thất, tốt nghiệp loại xuất sắc Đại học Kiến trúc Hà Nội.",
      social: {
        facebook: "https://facebook.com/huuhoangq8",
        linkedin: "https://www.linkedin.com",

      }
    },
    {
      name: "Hương Nguyễn ", 
      position: "Trưởng phòng Nội thất",
      experience: "8 năm kinh nghiệm",
      education: "Đại học Kiến trúc Hà Nội",
      image: "/images/huong-nguyen.png",
      description: "Chuyên sâu về thiết kế nội thất cao cấp, từng tham gia nhiều dự án biệt thự và penthouse.",
      social: {
        facebook: "https://facebook.com/huonghen2402",
        linkedin: "https://www.linkedin.com//",

      }
    },
    {
      name: "Mạnh Cường",
      position: "Trưởng phòng Thiết kế", 
      experience: "5 năm kinh nghiệm",
      education: "Đại học Kiến trúc Hà Nội",
      image: "/images/manh-cuong.png",
      description: "Chuyên gia thiết kế nội thất, từng tham gia nhiều dự án biệt thự và penthouse.",
      social: {
        facebook: "https://facebook.com/manhcuong1309",
        linkedin: "https://www.linkedin.com//",

      }
    },
    {
      name: "Ngô Quang Trường",
      position: "Trưởng phòng Marketing",
      experience: "8 năm kinh nghiệm",
      education: "Thạc sĩ QTKD - Học viện Công nghệ Bưu chính Viễn thông",
      image: "/images/ngo-quang-truong.jpg",
      description: "Chuyên gia tư vấn và chăm sóc khách hàng, hiểu rõ nhu cầu và mong muốn của từng gia đình.",
      social: {
        facebook: "https://www.facebook.com/www.truongnq.vn/",
        linkedin: "https://www.linkedin.com/in/truongnq-vn/",
      }
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      gray: "bg-gray-800 text-gray-700 bg-gray-50",
      blue: "bg-blue-500 text-blue-600 bg-blue-50",
      green: "bg-green-500 text-green-600 bg-green-50", 
      purple: "bg-purple-500 text-purple-600 bg-purple-50"
    };
    return colors[color];
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="q8-hero-section relative h-[45vh] flex items-center justify-center overflow-hidden">
        
        <div className="absolute inset-0">
          <Image
            src="/images/doi-ngu-thiet-ke-noi-that-q8design.webp"
            alt="Q8 Design Office"
            fill
            className="object-cover brightness-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40"></div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-4">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-q8-primary-900/20 backdrop-blur-sm rounded-full border border-q8-primary-600/30 text-q8-primary-100 font-bold">
              Câu chuyện thương hiệu
            </span>
          </div>
          <span className="text-4xl md:text-6xl font-bold mb-6">
            Câu chuyện thương hiệu {""}
            <span className="text-q8-primary-100">Q8 Design</span>
          </span>
          <p className="text-xl text-q8-primary-50 max-w-5xl mx-auto leading-relaxed">
            Tại Q8 Design, chúng tôi không chỉ thiết kế và thi công các công trình. 
            Chúng tôi kiến tạo nên những không gian sống đầy cảm hứng, nơi mỗi chi tiết 
            đều phản ánh dấu ấn cá nhân và câu chuyện của gia chủ.
          </p>
        </div>
      </section>
    
      {/* Vision & Mission */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Content */}
            <div>
              <div className="mb-8">
                <span className="px-4 py-2 bg-q8-primary-100 text-q8-primary-700 rounded-full text-sm font-medium uppercase tracking-wider">
                  Tầm nhìn & Sứ mệnh
                </span>
              </div>
              
              <div className="space-y-8">
                {/* Vision */}
                <div className="border-l-4 border-q8-primary-900 pl-6">
                  <h3 className="text-2xl font-bold text-q8-primary-900 mb-4">Tầm nhìn</h3>
                  <p className="text-q8-primary-700 leading-relaxed">
                    Tại Q8 Design, chúng tôi không chỉ thiết kế và thi công các công trình. 
                    Chúng tôi kiến tạo nên những không gian sống đầy cảm hứng, nơi mỗi chi tiết 
                    đều phản ánh dấu ấn cá nhân và câu chuyện của gia chủ.
                  </p>
                </div>

                {/* Mission */}
                <div className="border-l-4 border-q8-primary-900 pl-6">
                  <h3 className="text-2xl font-bold text-q8-primary-900 mb-4">Sứ mệnh</h3>
                  <p className="text-q8-primary-700 leading-relaxed">
                    Sứ mệnh của chúng tôi là đồng hành cùng bạn để biến ý tưởng thành hiện thực, 
                    mang đến một hành trình trọn vẹn và an tâm tuyệt đối từ những bản vẽ đầu tiên 
                    đến khi công trình được hoàn thiện.
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href="/lien-he"
                  className="inline-flex items-center px-6 py-3 bg-q8-primary-900 hover:bg-q8-primary-700 text-white font-bold rounded-full transition-colors duration-300"
                >
                  Tìm hiểu thêm
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Right: Image */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <Image
                  src="/images/tam-nhin-q8.jpg"
                  alt="Q8 Design Vision"
                  width={600}
                  height={500}
                  className="object-cover w-full h-[500px]"
                />
              </div>
              
              {/* Quote */}
              <div className="absolute -bottom-8 -left-8 bg-white rounded-2xl p-6 shadow-xl max-w-sm">
                <FaQuoteLeft className="text-q8-primary-600 text-2xl mb-3" />
                <p className="text-q8-primary-700 italic leading-relaxed">
                  &ldquo;Mỗi dự án là một câu chuyện, mỗi không gian là một tác phẩm nghệ thuật&rdquo;
                </p>
                <p className="text-q8-primary-700 font-bold mt-2">- Đội ngũ Q8 Design</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-8 bg-q8-primary-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="px-4 py-2 bg-q8-primary-100 text-q8-primary-700 rounded-full text-base font-medium uppercase tracking-wider">
            Giá trị cốt lõi của Q8 Design
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-q8-primary-900 mt-6 mb-4 visually-hidden">
              Giá trị cốt lõi của Q8 Design
            </h2>
            <p className="text-lg text-q8-primary-600 max-w-3xl mx-auto mt-4">
              Bốn giá trị cốt lõi định hình nên phong cách làm việc và cam kết chất lượng của Q8 Design
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, index) => {
              const Icon = value.icon;
              
              return (
                <div 
                  key={index}
                  className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                >
                  <div className="flex items-center mb-6 group">
                    <div className="w-16 h-16 bg-q8-primary-50 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="text-2xl text-q8-primary-700" />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-q8-primary-900">
                        {value.title}
                      </p>
                      <p className="text-sm font-medium text-q8-primary-600 uppercase tracking-wider">
                        {value.subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="text-q8-primary-600 leading-relaxed text-sm">
                    {value.description}
                  </p>

                  <div className="h-1 w-0 bg-q8-primary-900 rounded-full mt-6 group-hover:w-full transition-all duration-500"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* Team */}
      <section className="py-20 bg-q8-primary-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="px-4 py-2 bg-q8-primary-100 text-q8-primary-700 rounded-full text-sm font-medium uppercase tracking-wider">
              Đội ngũ chuyên gia
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-q8-primary-900 mt-6 mb-4">
              Đội ngũ sáng tạo và tận tâm
            </h2>
            <p className="text-lg text-q8-primary-600 max-w-5xl mx-auto">
              Gặp gỡ những chuyên gia tài năng, những người sẽ đồng hành cùng bạn 
              trong hành trình kiến tạo không gian sống mơ ước
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-q8-primary-900 mb-2">{member.name}</h3>
                  <p className="text-q8-primary-700 font-medium mb-1">{member.position}</p>
                  <p className="text-sm text-q8-primary-500 mb-2">{member.experience}</p>
                  <p className="text-sm text-q8-primary-600 font-medium mb-3">{member.education}</p>
                  <p className="text-q8-primary-600 text-sm leading-relaxed mb-4">{member.description}</p>
                  
                  {/* Social Links */}
                  {member.social && Object.keys(member.social).length > 0 && (
                    <div className="flex items-center space-x-3 pt-4 border-t border-gray-200">
                      {member.social.facebook && (
                        <a
                          href={member.social.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-blue-600 transition-colors"
                          title="Facebook"
                        >
                          <FaFacebook className="w-5 h-5" />
                        </a>
                      )}
                      {member.social.linkedin && (
                        <a
                          href={member.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-blue-700 transition-colors"
                          title="LinkedIn"
                        >
                          <FaLinkedin className="w-5 h-5" />
                        </a>
                      )}
                      {member.social.instagram && (
                        <a
                          href={member.social.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-pink-600 transition-colors"
                          title="Instagram"
                        >
                          <FaInstagram className="w-5 h-5" />
                        </a>
                      )}
                      {member.social.twitter && (
                        <a
                          href={member.social.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-blue-400 transition-colors"
                          title="Twitter"
                        >
                          <FaTwitter className="w-5 h-5" />
                        </a>
                      )}
                      {member.social.youtube && (
                        <a
                          href={member.social.youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-red-600 transition-colors"
                          title="YouTube"
                        >
                          <FaYoutube className="w-5 h-5" />
                        </a>
                      )}
                      {member.social.tiktok && (
                        <a
                          href={member.social.tiktok}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-black transition-colors"
                          title="TikTok"
                        >
                          <FaTiktok className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Office & Process */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <span className="px-4 py-2 bg-q8-primary-100 text-q8-primary-700 rounded-full text-sm font-medium uppercase tracking-wider">
              Văn phòng & Quy trình
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-q8-primary-900 mt-6">
              Một ngày tại Q8 Design
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <Image
                src="/images/q8-desgin.webp"
                alt="Q8 Design Office"
                width={600}
                height={400}
                className="object-cover w-full h-96 rounded-3xl shadow-2xl"
              />
            </div>
            
            <div className="space-y-6">
              <p className="text-lg text-q8-primary-700 leading-relaxed italic">
                &ldquo;Chúng tôi tin rằng, một không gian làm việc truyền cảm hứng sẽ tạo ra những tác phẩm đột phá.&rdquo;
              </p>
              
              <div className="space-y-4">
                {[
                  "Không gian thiết kế mở, khuyến khích sự sáng tạo",
                  "Phòng họp hiện đại với công nghệ 3D visualization",
                  "Khu vực trưng bày vật liệu và mẫu thiết kế",
                  "Văn hóa làm việc tích cực, đề cao tinh thần đồng đội"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-q8-primary-900 rounded-full flex items-center justify-center flex-shrink-0">
                      <FaCheckCircle className="text-white text-sm" />
                    </div>
                    <span className="text-q8-primary-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
