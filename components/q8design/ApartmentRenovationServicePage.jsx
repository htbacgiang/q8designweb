import { useState } from "react";
import Image from "next/image";
import SafeImage from "../common/SafeImage";
import Link from "next/link";
import { 
  FaArrowRight, 
  FaCheckCircle,
  FaStar,
  FaClock,
  FaShieldAlt,
  FaHome,
  FaMoneyBillWave,
  FaUsers,
  FaHandshake,
  FaChartLine,
  FaAward,
  FaLightbulb,
  FaQuestionCircle,
  FaPhoneAlt,
  FaTimes,
  FaTools,
  FaHardHat,
  FaPaintRoller,
  FaClipboardCheck,
  FaRecycle,
  FaCouch,
  FaLeaf
} from "react-icons/fa";
import ContactForm from "../header/ContactForm";

export default function ApartmentRenovationServicePage() {
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);
  
  // Tại sao cần cải tạo nội thất chung cư
  const whyRenovate = [
    {
      icon: FaShieldAlt,
      title: "Đảm bảo an toàn & Nâng cao chất lượng sống",
      description: "Sau một thời gian sử dụng, các hệ thống điện nước trong căn hộ có thể xuống cấp, tiềm ẩn rủi ro chập cháy hoặc rò rỉ. Việc cải tạo sẽ là cơ hội để bạn kiểm tra, thay thế các đường dây cũ, xử lý triệt để các vấn đề chống thấm, giúp ngôi nhà trở nên an toàn hơn. Đồng thời, các kiến trúc sư của Q8 Design sẽ tối ưu lại bố cục không gian, tận dụng ánh sáng và thông gió tự nhiên, mang lại một môi trường sống trong lành và tốt cho sức khỏe."
    },
    {
      icon: FaTools,
      title: "Tối ưu công năng sử dụng",
      description: "Nhu cầu của một gia đình sẽ thay đổi theo thời gian. Một căn hộ cũ có thể không còn phù hợp khi có thêm thành viên mới, hoặc khi bạn cần một không gian làm việc tại nhà. Cải tạo nội thất cho phép bạn thay đổi bố cục linh hoạt, thêm các khu vực chức năng mới như phòng làm việc, phòng đọc sách hay khu vui chơi cho trẻ em, đảm bảo không gian sống luôn đáp ứng mọi nhu cầu ở từng giai đoạn."
    },
    {
      icon: FaMoneyBillWave,
      title: "Tiết kiệm chi phí so với mua nhà mới",
      description: "Trong bối cảnh giá bất động sản ngày càng tăng, việc chuyển đến một căn hộ mới thường là một khoản đầu tư rất lớn. Cải tạo nội thất là một giải pháp kinh tế hơn rất nhiều, giúp bạn có một không gian sống hoàn toàn mới, tiện nghi và hiện đại ngay trên chính nền móng cũ của mình."
    },
    {
      icon: FaPaintRoller,
      title: "Cập nhật phong cách thiết kế",
      description: "Nếu căn hộ của bạn đã lỗi thời, việc cải tạo sẽ mang đến một làn gió mới. Q8 Design sẽ giúp bạn biến một không gian cũ, đơn điệu trở thành một không gian hiện đại, sang trọng, hay bất kỳ phong cách nào bạn yêu thích. Từ màu sắc, vật liệu cho đến đồ nội thất, mọi thứ sẽ được thay đổi để ngôi nhà phản ánh đúng gu thẩm mỹ và cá tính riêng của bạn."
    }
  ];

  // Quy trình Cải tạo
  const renovationProcess = [
    {
      step: "01",
      title: "Tiếp nhận Yêu cầu & Tư vấn Sâu sắc",
      description: "Đây là giai đoạn cốt lõi. Chúng tôi sẽ lắng nghe chi tiết mọi mong muốn, sở thích, và ngân sách của bạn. Đội ngũ kiến trúc sư sẽ tiến hành khảo sát hiện trạng căn hộ một cách tỉ mỉ, đo đạc chính xác, đánh giá kết cấu và các yếu tố kỹ thuật khác. Giai đoạn này đảm bảo chúng tôi có đủ thông tin để đưa ra giải pháp phù hợp nhất."
    },
    {
      step: "02",
      title: "Phác thảo Ý tưởng & Lập Dự toán Chi tiết",
      description: "Dựa trên những thông tin đã thu thập, các kiến trúc sư của chúng tôi sẽ bắt đầu phác thảo ý tưởng thiết kế, bố trí mặt bằng công năng và lựa chọn phong cách chủ đạo. Sau đó, chúng tôi sẽ lập một bản dự toán chi tiết, bao gồm chi phí vật liệu, nhân công và thời gian thi công dự kiến. Điều này giúp bạn dễ dàng hình dung và chủ động trong việc quản lý ngân sách."
    },
    {
      step: "03",
      title: "Thi công & Giám sát Chặt chẽ",
      description: "Khi mọi phương án đã được thống nhất, Q8 Design sẽ tiến hành thi công. Quy trình này bao gồm việc tháo dỡ các hạng mục cũ, xây dựng mới và hoàn thiện nội thất. Toàn bộ quá trình đều được đội ngũ kỹ sư của chúng tôi giám sát chặt chẽ, đảm bảo tuân thủ đúng bản vẽ, tiêu chuẩn kỹ thuật và sử dụng vật liệu đã cam kết."
    },
    {
      step: "04",
      title: "Nghiệm thu, Bàn giao & Bảo hành",
      description: "Khi công trình hoàn thành, chúng tôi sẽ cùng bạn tiến hành nghiệm thu từng hạng mục. Q8 Design cam kết bàn giao một không gian hoàn hảo, giống như trên bản vẽ. Sau khi bàn giao, chúng tôi vẫn tiếp tục đồng hành bằng chính sách bảo hành, bảo trì chuyên nghiệp, đảm bảo bạn luôn an tâm và hài lòng với tổ ấm mới của mình."
    }
  ];

  // Yếu tố ảnh hưởng chi phí
  const costFactors = [
    {
      icon: FaHome,
      title: "Diện tích căn hộ",
      description: "Đây là yếu tố cơ bản nhất. Diện tích càng lớn thì chi phí cải tạo sẽ càng cao."
    },
    {
      icon: FaTools,
      title: "Mức độ cải tạo",
      description: "Bạn muốn thay đổi hoàn toàn không gian hay chỉ sửa chữa một vài hạng mục nhỏ? Mức độ cải tạo sẽ ảnh hưởng trực tiếp đến chi phí."
    },
    {
      icon: FaPaintRoller,
      title: "Phong cách thiết kế",
      description: "Các phong cách thiết kế phức tạp, đòi hỏi nhiều chi tiết và vật liệu đặc biệt như tân cổ điển, cổ điển sẽ có chi phí cao hơn so với phong cách hiện đại, tối giản."
    },
    {
      icon: FaCouch,
      title: "Vật liệu sử dụng",
      description: "Chi phí sẽ phụ thuộc vào chất liệu bạn lựa chọn, từ vật liệu cơ bản đến vật liệu cao cấp, nhập khẩu."
    }
  ];

  // FAQ
  const faqs = [
    {
      icon: FaQuestionCircle,
      question: "Cải tạo nội thất chung cư mất bao lâu?",
      answer: "Thời gian cải tạo phụ thuộc vào mức độ và khối lượng công việc. Đối với các căn hộ có diện tích từ 70 - 100m², thời gian thi công thường dao động từ 2 đến 4 tháng. Q8 Design sẽ cung cấp một lịch trình chi tiết và cam kết bàn giao đúng tiến độ."
    },
    {
      icon: FaQuestionCircle,
      question: "Có cần xin phép ban quản lý tòa nhà không?",
      answer: "Có. Đây là bước bắt buộc để đảm bảo an toàn và tuân thủ các quy định của tòa nhà. Q8 Design sẽ hỗ trợ bạn trong việc chuẩn bị các hồ sơ và thủ tục cần thiết để xin phép ban quản lý, giúp quá trình cải tạo diễn ra thuận lợi."
    },
    {
      icon: FaQuestionCircle,
      question: "Q8 Design có cam kết về chi phí phát sinh không?",
      answer: "Có. Với quy trình làm việc minh bạch, Q8 Design cam kết không phát sinh chi phí một cách không hợp lý. Mọi khoản mục đều được liệt kê chi tiết trong hợp đồng và được sự đồng ý của khách hàng trước khi thi công."
    },
    {
      icon: FaQuestionCircle,
      question: "Cải tạo có ảnh hưởng đến kết cấu công trình không?",
      answer: "Không. Q8 Design luôn có đội ngũ kỹ sư chuyên môn cao, sẽ khảo sát và đánh giá kỹ lưỡng trước khi thi công. Mọi thay đổi đều được tính toán cẩn thận để đảm bảo không làm ảnh hưởng đến kết cấu chịu lực của công trình, mang lại sự an toàn tuyệt đối."
    }
  ];

  // Dự án tiêu biểu
  const featuredProjects = [
    {
      image: "/images/cai-tao-nha-cu.webp",
      title: "Cải tạo Căn hộ 70m² tại Hà Nội",
      subtitle: "Từ không gian cũ kỹ đến hiện đại, thoáng đãng",
      location: "Times City, Hà Nội",
      area: "70m²",
      type: "Cải tạo toàn diện",
      slug: "cai-tao-can-ho-70m2-times-city",
      tags: ["Hiện đại", "Tối ưu", "Trước & Sau"],
      challenge: "Căn hộ đã xuống cấp, hệ thống điện nước cũ kỹ, không gian bị chia nhỏ gây cảm giác bí bách. Gia đình trẻ mong muốn một không gian mở, hiện đại và an toàn hơn.",
      solution: "Chúng tôi đã thay đổi toàn bộ hệ thống điện nước, xử lý chống thấm triệt để. Bằng cách phá bỏ các bức tường không chịu lực, chúng tôi tạo ra một không gian mở, kết nối phòng khách và bếp. Sử dụng gam màu sáng và nội thất thông minh, chúng tôi đã biến căn hộ cũ thành một không gian sống tiện nghi, thoáng đãng và đầy cảm hứng."
    },

  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative md:h-[70vh] h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/service-renovation.webp"
            alt="Dịch vụ Cải tạo Nội thất Chung cư Chuyên nghiệp | Q8 Design"
            fill
            className="object-cover brightness-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-4">
          <span className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8">
            Cải tạo Nội thất Chung cư 
          </span>
          <p className="text-lg md:text-xl text-q8-primary-100 max-w-5xl mx-auto leading-relaxed mb-8">
            Q8 Design chuyên cải tạo nội thất chung cư cũ tại Hà Nội. Đội ngũ KTS giàu kinh nghiệm, quy trình minh bạch, cam kết không phát sinh chi phí, mang lại không gian sống tiện nghi, hiện đại cho gia đình bạn.
          </p>
          <button
            onClick={() => setIsContactPopupOpen(true)}
            className="inline-flex items-center px-8 py-4 bg-q8-primary-900 text-white font-bold rounded-full hover:bg-q8-primary-700 transition-all duration-300 group"
          >
            Tư vấn miễn phí
            <FaArrowRight className="ml-3 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </section>

      {/* I. Giới thiệu */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className=" ">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-4xl font-bold text-q8-primary-900 mb-6">
                Biến không gian cũ thành tổ ấm trong mơ
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center mb-8">
              <div className="prose prose-lg max-w-none">
                <p className="text-q8-primary-700 leading-relaxed mb-6 text-lg">
                  Thời gian trôi qua, không gian sống cũng dần thay đổi. Căn hộ chung cư mà bạn từng yêu thích có thể đã không còn phù hợp với nhu cầu hiện tại, những món đồ nội thất đã cũ kỹ, hay một vài góc nhỏ đã xuống cấp. Điều này không chỉ ảnh hưởng đến thẩm mỹ mà còn làm giảm đi sự thoải mái và chất lượng cuộc sống của gia đình bạn. Liệu có giải pháp nào để thổi luồng sinh khí mới, biến không gian cũ thành một tổ ấm tràn đầy cảm hứng mà không cần phải chuyển đi nơi khác?
                </p>
                <p className="text-q8-primary-700 leading-relaxed mb-6 text-lg">
                  Đó chính là lúc dịch vụ cải tạo nội thất chung cư của <Link href="/" className="text-q8-primary-900">Q8 Design</Link> phát huy giá trị. Chúng tôi không chỉ đơn thuần là sửa chữa hay thay thế, mà là tái tạo lại toàn bộ không gian, từ bố cục, công năng cho đến phong cách thiết kế. Mỗi dự án cải tạo đều là một hành trình đầy sáng tạo, nơi chúng tôi cùng bạn lắng nghe câu chuyện của tổ ấm, thấu hiểu từng mong muốn và biến những ý tưởng ấy thành hiện thực một cách hoàn hảo nhất.
                </p>
                <p className="text-q8-primary-700 leading-relaxed text-lg">
                  Tại Q8 Design, chúng tôi tin rằng một không gian sống lý tưởng không phải là một căn hộ mới, mà là một không gian được thiết kế và &quot;đo ni đóng giày&quot; riêng cho bạn. Với đội ngũ kiến trúc sư và kỹ sư dày dặn kinh nghiệm, cùng quy trình làm việc chuyên nghiệp, chúng tôi cam kết sẽ mang đến một giải pháp toàn diện, giúp bạn kiến tạo nên một không gian sống không chỉ đẹp mà còn tiện nghi và phản ánh trọn vẹn cá tính của mình.
                </p>
              </div>
              
              <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden">
                <Image
                  src="/images/xu-huong-vat-lieu-ben-vung-2025.webp"
                  alt="Q8 Design - Chuyên cải tạo nội thất chung cư"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* II. Tại sao cần cải tạo nội thất chung cư */}
      <section className="py-12 bg-q8-primary-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-xl md:text-4xl font-bold text-q8-primary-900 mb-2">
              Tại sao cần cải tạo nội thất chung cư?
            </h2>
            <p className="text-lg text-q8-primary-600 max-w-3xl mx-auto">
              Nhiều người thường e ngại việc sửa chữa nhà cửa vì cho rằng tốn kém và phiền phức. Tuy nhiên, việc cải tạo nội thất chung cư mang lại những lợi ích thiết thực, giúp bạn nâng cao chất lượng cuộc sống và gia tăng giá trị cho tổ ấm.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8  mb-12">
            {whyRenovate.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex-shrink-0 w-16 h-16 bg-q8-primary-100 rounded-2xl flex items-center justify-center">
                      <Icon className="text-2xl text-q8-primary-900" />
                    </div>
                    <h3 className="text-lg font-bold text-q8-primary-900 flex-1 leading-tight">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-q8-primary-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* III. Quy trình Cải tạo Nội thất Chung cư */}
      <section className="py-12 bg-q8-primary-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-xl md:text-4xl font-bold text-q8-primary-900 mt-6 mb-4">
              Quy trình Cải tạo Nội thất Chung cư Chuyên nghiệp tại Q8 Design
            </h2>
            <p className="text-lg text-q8-primary-600 max-w-3xl mx-auto">
              Tại Q8 Design, mỗi dự án cải tạo đều là một hành trình chuyên nghiệp, được xây dựng trên sự thấu hiểu và cam kết về chất lượng. Quy trình của chúng tôi được tối ưu hóa để giúp bạn có một không gian sống hoàn hảo, không còn nỗi lo về phát sinh chi phí hay chậm trễ tiến độ.
            </p>
          </div>

          <div className="max-w-5xl mx-auto mb-12">
            <div className="space-y-6">
              {renovationProcess.map((step, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 md:p-8 shadow-md hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-q8-primary-900 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                        {step.step}
                      </div>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-q8-primary-900 flex-1 leading-tight">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-q8-primary-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* IV. Chi phí Cải tạo Chung cư */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className=" ">
            <div className="text-center mb-12">
              <h2 className="text-xl md:text-4xl font-bold text-q8-primary-900 mt-6 mb-4">
                Chi phí Cải tạo Chung cư: Minh bạch & Hợp lý
              </h2>
              <p className="text-lg text-q8-primary-600 max-w-5xl mx-auto">
                Một trong những nỗi lo lớn nhất của khách hàng khi quyết định cải tạo căn hộ là chi phí. Tại Q8 Design, chúng tôi cam kết mang lại sự minh bạch tuyệt đối trong báo giá, giúp bạn dễ dàng lập kế hoạch tài chính và tránh mọi chi phí phát sinh không đáng có.
              </p>
            </div>

            <div className="mb-12">
              <h3 className="text-2xl font-bold text-q8-primary-900 mb-6 text-center">
                Các yếu tố ảnh hưởng đến Chi phí Cải tạo
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {costFactors.map((factor, index) => {
                  const Icon = factor.icon;
                  return (
                    <div key={index} className="bg-q8-primary-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                      <div className="w-12 h-12 bg-q8-primary-900 rounded-xl flex items-center justify-center mb-4">
                        <Icon className="text-xl text-white" />
                      </div>
                      <h4 className="text-lg font-bold text-q8-primary-900 mb-2">
                        {factor.title}
                      </h4>
                      <p className="text-q8-primary-600 text-sm leading-relaxed">
                        {factor.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 md:p-12 border-2 border-q8-primary-200">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-q8-primary-900 text-center">Ưu đãi đặc biệt từ Q8 Design</h3>
              <p className="text-lg text-q8-primary-600 mb-4 text-center">
                Chúng tôi hiểu rằng một khoản đầu tư lớn cần được cân nhắc kỹ lưỡng. Vì vậy, Q8 Design luôn có các chương trình khuyến mãi đặc biệt cho khách hàng sử dụng dịch vụ trọn gói (thiết kế & thi công).
              </p>
              <div className="flex justify-center">
                <button
                  onClick={() => setIsContactPopupOpen(true)}
                  className="inline-flex items-center justify-center px-8 py-4 bg-q8-primary-900 text-white font-bold rounded-full hover:bg-q8-primary-700 transition-all duration-300"
                >
                  Liên hệ nhận báo giá chi tiết miễn phí
                  <FaArrowRight className="ml-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* V. Dự án Cải tạo Nội thất Tiêu biểu */}
      <section className="py-12 bg-q8-primary-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-xl md:text-4xl font-bold text-q8-primary-900 mb-2">
              Dự án Cải tạo Nội thất Tiêu biểu của Q8 Design
            </h2>
            <p className="text-lg text-q8-primary-600 max-w-4xl mx-auto">
              Không có gì thuyết phục hơn những minh chứng thực tế. Q8 Design tự hào về những dự án cải tạo nội thất thành công, nơi chúng tôi đã biến những không gian cũ kỹ, thiếu hiệu quả thành những tổ ấm hiện đại, tiện nghi.
            </p>
          </div>

          <div className=" space-y-12">
            {featuredProjects.slice(0, 2).map((project, index) => (
              <div key={index} className={`bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ${index % 2 === 0 ? '' : 'md:flex-row-reverse'} flex flex-col md:flex-row`}>
                <div className="md:w-1/2 relative h-64 md:h-auto min-h-[400px]">
                  <SafeImage
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {project.tags.map((tag, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 bg-q8-primary-900 text-white rounded-full text-xs font-bold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-q8-primary-900 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-q8-primary-900 font-bold mb-4">{project.subtitle}</p>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center text-q8-primary-600">
                      <FaHome className="text-q8-primary-900 mr-3" />
                      <span><strong>Vị trí:</strong> {project.location}</span>
                    </div>
                    <div className="flex items-center text-q8-primary-600">
                      <FaChartLine className="text-q8-primary-900 mr-3" />
                      <span><strong>Diện tích:</strong> {project.area}</span>
                    </div>
                  </div>

                  {project.challenge && (
                    <div className="mb-4">
                      <h4 className="font-bold text-q8-primary-900 mb-2">Thách thức:</h4>
                      <p className="text-q8-primary-600 leading-relaxed text-sm">{project.challenge}</p>
                    </div>
                  )}

                  {project.solution && (
                    <div className="mb-6">
                      <h4 className="font-bold text-q8-primary-900 mb-2">Giải pháp của Q8 Design:</h4>
                      <p className="text-q8-primary-600 leading-relaxed text-sm">{project.solution}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/du-an"
              className="inline-flex items-center px-8 py-4 border-2 border-q8-primary-900 text-q8-primary-900 font-bold rounded-full hover:bg-q8-primary-900 hover:text-white transition-all duration-300 group"
            >
              Xem tất cả dự án
              <FaArrowRight className="ml-3 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* VI. Câu hỏi thường gặp (FAQ) */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-xl md:text-4xl font-bold text-q8-primary-900 mb-4">
                Câu hỏi thường gặp về Cải tạo Nội thất Chung cư
              </h2>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, index) => {
                const Icon = faq.icon;
                return (
                  <div key={index} className="bg-q8-primary-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start space-x-4 mb-4">
                      <Icon className="text-2xl text-q8-primary-900 flex-shrink-0 mt-1" />
                      <h3 className="text-lg font-bold text-q8-primary-900">
                        {faq.question}
                      </h3>
                    </div>
                    <p className="text-q8-primary-600 leading-relaxed pl-12">
                      {faq.answer}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* VII. Kêu gọi Hành động (CTA) */}
      <section className="py-8 bg-gradient-to-r from-q8-primary-900 to-q8-primary-700">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-6xl mx-auto text-white">
            <p className="text-xl md:text-4xl font-bold mb-3">
              Bạn đã sẵn sàng bắt đầu dự án của mình?
            </p>
            <p className="text-base text-q8-primary-100 leading-relaxed mb-6">
              Nếu bạn đã sẵn sàng biến không gian cũ thành tổ ấm trong mơ, hãy để Q8 Design đồng hành cùng bạn. Chúng tôi cam kết mang lại một quy trình chuyên nghiệp, minh bạch và tận tâm, đảm bảo mọi chi tiết đều phản ánh trọn vẹn phong cách và cá tính riêng của bạn.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setIsContactPopupOpen(true)}
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-q8-primary-900 font-bold rounded-full hover:bg-q8-primary-50 transition-colors duration-300"
              >
                <FaPhoneAlt className="mr-3" />
                Liên hệ tư vấn miễn phí
                <FaArrowRight className="ml-3" />
              </button>
              <Link
                href="/dich-vu"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-all duration-300"
              >
                Xem các dịch vụ khác
              </Link>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-3xl mx-auto border-2 border-white/20 mt-8">
              <div className="grid md:grid-cols-2 gap-4 text-left">
                <div>
                  <p className="text-q8-primary-100 text-sm mb-1">Địa chỉ:</p>
                  <p className="font-bold text-white">Đ. Nam An Khánh - KĐT Nam An Khánh, Hà Nội</p>
                </div>
                <div>
                  <p className="text-q8-primary-100 text-sm mb-1">Hotline / Zalo:</p>
                  <p className="font-bold text-2xl text-white">098 811 68 28</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Popup Modal */}
      {isContactPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl">
            <button
              onClick={() => setIsContactPopupOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-q8-primary-100 hover:bg-q8-primary-200 rounded-full transition-colors duration-200"
              aria-label="Đóng popup"
            >
              <FaTimes className="text-q8-primary-900 text-xl" />
            </button>
            
            <div className="p-6 md:p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-q8-primary-900 mb-2">
                  Đăng ký tư vấn miễn phí
                </h2>
                <p className="text-q8-primary-600">
                  Để lại thông tin, chúng tôi sẽ liên hệ tư vấn trong 24h
                </p>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
